import { GoogleGenAI } from '@google/genai'
import { orderedBmcBlockIds } from '../data/bmcCaseStudies'
import { BmcCaseEvaluationResult, BmcCaseStudy, BmcBlockId } from '../types'

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

function buildBmcCasePrompt(caseStudy: BmcCaseStudy, userAnswers: Record<BmcBlockId, string>) {
  const officialKey = orderedBmcBlockIds
    .map((blockId) => `${blockId}: ${caseStudy.answerKey[blockId].join('; ')}`)
    .join('\n')

  const studentAnswers = orderedBmcBlockIds
    .map((blockId) => `${blockId}: ${userAnswers[blockId]?.trim() || '(kosong)'}`)
    .join('\n')

  return `
Anda adalah dosen penguji mata kuliah Technopreneurship yang sedang menilai latihan Business Model Canvas.
Bandingkan jawaban mahasiswa terhadap studi kasus dan kunci acuan.
Terima sinonim atau redaksi yang setara, tetapi kurangi nilai jika blok kosong, terlalu umum, salah blok, atau tidak cocok dengan studi kasus.

Kembalikan HANYA JSON valid tanpa markdown, tanpa backticks, tanpa penjelasan tambahan.

Skema JSON:
{
  "score": number,
  "verdict": string,
  "strengths": string[],
  "improvements": string[],
  "feedback": string,
  "suggestedRevision": string,
  "blockFeedback": [
    {
      "blockId": "KP",
      "blockName": "Key Partners",
      "score": number,
      "notes": string
    }
  ]
}

Aturan:
- score harus integer 0-100
- verdict satu kalimat singkat dalam Bahasa Indonesia
- strengths minimal 2 poin jika memungkinkan
- improvements minimal 2 poin jika memungkinkan
- feedback 1 paragraf singkat dalam Bahasa Indonesia
- suggestedRevision berisi saran revisi konkret
- blockFeedback harus berisi tepat 9 item dengan urutan KP, KA, KR, VP, CR, CH, CS, C$, R$
- score tiap blockFeedback integer 0-10
- notes tiap blok ringkas dan spesifik
- Jangan mengarang jawaban mahasiswa yang tidak ditulis

Judul studi kasus:
${caseStudy.title}

Skenario:
${caseStudy.scenario}

Tugas:
${caseStudy.task}

Rubrik:
${caseStudy.gradingRubric.map((item, index) => `${index + 1}. ${item.point}: ${item.description}`).join('\n')}

Kunci acuan per blok:
${officialKey}

Jawaban mahasiswa per blok:
${studentAnswers}
`
}

function normalizeResult(parsed: Partial<BmcCaseEvaluationResult>): BmcCaseEvaluationResult {
  const normalizedBlockFeedback = Array.isArray(parsed.blockFeedback)
    ? parsed.blockFeedback
        .filter((item): item is NonNullable<BmcCaseEvaluationResult['blockFeedback']>[number] => Boolean(item?.blockId))
        .map((item) => ({
          blockId: item.blockId,
          blockName: item.blockName || item.blockId,
          score: Number.isFinite(item.score) ? Math.max(0, Math.min(10, Math.round(item.score))) : 0,
          notes: item.notes || ''
        }))
    : []

  return {
    score: Number.isFinite(parsed.score) ? Math.max(0, Math.min(100, Math.round(parsed.score as number))) : 0,
    verdict: parsed.verdict || 'Penilaian selesai.',
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
    improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
    feedback: parsed.feedback || '',
    suggestedRevision: parsed.suggestedRevision || '',
    blockFeedback: normalizedBlockFeedback
  }
}

async function evaluateViaServer(
  caseStudy: BmcCaseStudy,
  userAnswers: Record<BmcBlockId, string>
): Promise<BmcCaseEvaluationResult> {
  const response = await fetch('/api/evaluate-bmc-case', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      caseStudy,
      userAnswers
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

  const data = (await response.json()) as BmcCaseEvaluationResult
  return normalizeResult(data)
}

async function evaluateViaClientFallback(
  caseStudy: BmcCaseStudy,
  userAnswers: Record<BmcBlockId, string>
): Promise<BmcCaseEvaluationResult> {
  const ai = getClient()
  const prompt = buildBmcCasePrompt(caseStudy, userAnswers)

  const response = await ai.models.generateContent({
    model: fallbackClientModelName,
    contents: prompt,
    config: {
      temperature: 0.2,
      responseMimeType: 'application/json'
    }
  })

  const jsonText = extractJsonObject(response.text || '')
  return normalizeResult(JSON.parse(jsonText) as BmcCaseEvaluationResult)
}

export async function evaluateBmcCaseWithGemini(
  caseStudy: BmcCaseStudy,
  userAnswers: Record<BmcBlockId, string>
): Promise<BmcCaseEvaluationResult> {
  try {
    return await evaluateViaServer(caseStudy, userAnswers)
  } catch (error) {
    if (!fallbackClientApiKey) {
      throw error
    }

    return evaluateViaClientFallback(caseStudy, userAnswers)
  }
}

export function getGeminiBmcModelName() {
  return serverModelName
}
