import { GoogleGenAI } from '@google/genai'
import { QuestionEssay } from '../types'

export interface EssayEvaluationResult {
  score: number
  verdict: string
  strengths: string[]
  improvements: string[]
  feedback: string
  suggestedRevision: string
}

const serverModelName = 'gemini-3.1-flash-lite-preview'
const fallbackClientModelName = import.meta.env.VITE_GEMINI_MODEL || serverModelName
const fallbackClientApiKey = import.meta.env.VITE_GEMINI_API_KEY

let aiClient: GoogleGenAI | null = null

function getClient() {
  if (!fallbackClientApiKey) {
    throw new Error('VITE_GEMINI_API_KEY belum diset untuk fallback lokal.')
  }

  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: fallbackClientApiKey })
  }

  return aiClient
}

function extractJsonObject(text: string) {
  const trimmed = text.trim()
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return trimmed
  }

  const match = trimmed.match(/\{[\s\S]*\}/)
  if (!match) {
    throw new Error('Respons AI tidak mengandung JSON yang valid.')
  }

  return match[0]
}

function buildEvaluationPrompt(essay: QuestionEssay, userAnswer: string) {
  return `
Anda adalah dosen penguji Technopreneurship.
Nilai jawaban essay mahasiswa secara adil, ringkas, dan ketat berdasarkan prompt, kata kunci, dan rubrik.

Kembalikan HANYA JSON valid tanpa markdown, tanpa backticks, tanpa penjelasan tambahan.

Skema JSON:
{
  "score": number,
  "verdict": string,
  "strengths": string[],
  "improvements": string[],
  "feedback": string,
  "suggestedRevision": string
}

Aturan:
- score harus integer 0-100
- verdict satu kalimat singkat dalam Bahasa Indonesia
- strengths minimal 2 poin jika memungkinkan
- improvements minimal 2 poin jika memungkinkan
- feedback 1 paragraf singkat dalam Bahasa Indonesia
- suggestedRevision berisi saran konkret bagaimana jawaban diperbaiki
- Gunakan konteks akademik BMC dan materi Technopreneurship
- Jangan mengarang isi jawaban mahasiswa yang tidak ada

Judul soal:
${essay.title}

Skenario:
${essay.scenario}

Tugas:
${essay.task}

Kata kunci penting:
${essay.keywords.join(', ')}

Rubrik:
${essay.gradingRubric.map((item, index) => `${index + 1}. ${item.point}: ${item.description}`).join('\n')}

Kunci jawaban ringkas:
${essay.suggestedAnswer}

Jawaban mahasiswa:
${userAnswer}
`
}

function normalizeEvaluationResult(parsed: Partial<EssayEvaluationResult>): EssayEvaluationResult {
  return {
    score: Number.isFinite(parsed.score) ? Math.max(0, Math.min(100, Math.round(parsed.score as number))) : 0,
    verdict: parsed.verdict || 'Penilaian selesai.',
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
    improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
    feedback: parsed.feedback || '',
    suggestedRevision: parsed.suggestedRevision || ''
  }
}

async function evaluateViaServer(essay: QuestionEssay, userAnswer: string): Promise<EssayEvaluationResult> {
  const response = await fetch('/api/evaluate-essay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      essay,
      userAnswer
    })
  })

  if (!response.ok) {
    const fallbackMessage = `Server evaluator gagal dengan status ${response.status}.`
    let detail = fallbackMessage

    try {
      const data = await response.json()
      detail = data?.error || fallbackMessage
    } catch {
      detail = fallbackMessage
    }

    throw new Error(detail)
  }

  const data = (await response.json()) as EssayEvaluationResult
  return normalizeEvaluationResult(data)
}

async function evaluateViaClientFallback(
  essay: QuestionEssay,
  userAnswer: string
): Promise<EssayEvaluationResult> {
  const ai = getClient()
  const prompt = buildEvaluationPrompt(essay, userAnswer)

  const response = await ai.models.generateContent({
    model: fallbackClientModelName,
    contents: prompt,
    config: {
      temperature: 0.2,
      responseMimeType: 'application/json'
    }
  })

  const jsonText = extractJsonObject(response.text || '')
  return normalizeEvaluationResult(JSON.parse(jsonText) as EssayEvaluationResult)
}

export async function evaluateEssayWithGemini(
  essay: QuestionEssay,
  userAnswer: string
): Promise<EssayEvaluationResult> {
  try {
    return await evaluateViaServer(essay, userAnswer)
  } catch (error) {
    if (!fallbackClientApiKey) {
      throw error
    }

    return evaluateViaClientFallback(essay, userAnswer)
  }
}

export function isGeminiEssayEvaluationEnabled() {
  return true
}

export function getGeminiEssayModelName() {
  return serverModelName
}

export { buildEvaluationPrompt, normalizeEvaluationResult, extractJsonObject }
