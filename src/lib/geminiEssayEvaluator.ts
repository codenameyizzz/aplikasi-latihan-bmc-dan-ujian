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

const modelName = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.1-flash-lite-preview'
const apiKey = import.meta.env.VITE_GEMINI_API_KEY

let aiClient: GoogleGenAI | null = null

function getClient() {
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY belum diset.')
  }

  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey })
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

export async function evaluateEssayWithGemini(
  essay: QuestionEssay,
  userAnswer: string
): Promise<EssayEvaluationResult> {
  const ai = getClient()

  const prompt = `
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

  const response = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
    config: {
      temperature: 0.2,
      responseMimeType: 'application/json'
    }
  })

  const jsonText = extractJsonObject(response.text || '')
  const parsed = JSON.parse(jsonText) as EssayEvaluationResult

  return {
    score: Number.isFinite(parsed.score) ? Math.max(0, Math.min(100, Math.round(parsed.score))) : 0,
    verdict: parsed.verdict || 'Penilaian selesai.',
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
    improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
    feedback: parsed.feedback || '',
    suggestedRevision: parsed.suggestedRevision || ''
  }
}

export function isGeminiEssayEvaluationEnabled() {
  return Boolean(apiKey)
}

export function getGeminiEssayModelName() {
  return modelName
}
