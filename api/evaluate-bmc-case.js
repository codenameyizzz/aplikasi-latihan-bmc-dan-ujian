import { GoogleGenAI } from '@google/genai'

const modelName = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite-preview'
const orderedBmcBlockIds = ['KP', 'KA', 'KR', 'VP', 'CR', 'CH', 'CS', 'C$', 'R$']

function extractJsonObject(text) {
  const trimmed = String(text || '').trim()

  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return trimmed
  }

  const match = trimmed.match(/\{[\s\S]*\}/)
  if (!match) {
    throw new Error('Respons Gemini tidak berisi JSON valid.')
  }

  return match[0]
}

function buildBmcCasePrompt(caseStudy, userAnswers) {
  const officialKey = orderedBmcBlockIds
    .map((blockId) => `${blockId}: ${(caseStudy?.answerKey?.[blockId] || []).join('; ')}`)
    .join('\n')

  const studentAnswers = orderedBmcBlockIds
    .map((blockId) => `${blockId}: ${String(userAnswers?.[blockId] || '').trim() || '(kosong)'}`)
    .join('\n')

  return `
Anda adalah dosen penguji mata kuliah Technopreneurship yang sedang menilai latihan Business Model Canvas.
Bandingkan jawaban mahasiswa terhadap studi kasus dan kunci acuan.
Terima sinonim atau redaksi yang setara, tetapi kurangi nilai jika blok kosong, terlalu umum, salah blok, atau tidak cocok dengan studi kasus.

Aturan khusus untuk blok Channels:
Terdapat lima fase pada Channel dalam proses menjangkau Customer Segment dan membawa Value Proposition ke pasar, yaitu:
Awareness
Evaluation
Purchase
Delivery
After Sales
Untuk blok CH, nilai tinggi hanya diberikan jika jawaban mengikuti atau setidaknya secara jelas mencakup lima fase tersebut.
Jika jawaban CH tidak terstruktur menurut fase atau ada fase penting yang hilang, turunkan nilai CH dan jelaskan fase yang lemah atau tidak ada.

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
- Untuk blockFeedback pada CH, notes harus menyebut apakah Awareness, Evaluation, Purchase, Delivery, dan After Sales sudah tercakup atau belum

Judul studi kasus:
${caseStudy?.title || ''}

Skenario:
${caseStudy?.scenario || ''}

Tugas:
${caseStudy?.task || ''}

Rubrik:
${(caseStudy?.gradingRubric || []).map((item, index) => `${index + 1}. ${item.point}: ${item.description}`).join('\n')}

Kunci acuan per blok:
${officialKey}

Jawaban mahasiswa per blok:
${studentAnswers}
`
}

function normalizeEvaluationResult(parsed) {
  const blockFeedback = Array.isArray(parsed?.blockFeedback)
    ? parsed.blockFeedback
        .filter((item) => item?.blockId)
        .map((item) => ({
          blockId: item.blockId,
          blockName: item.blockName || item.blockId,
          score: Number.isFinite(item.score) ? Math.max(0, Math.min(10, Math.round(item.score))) : 0,
          notes: item.notes || ''
        }))
    : []

  return {
    score: Number.isFinite(parsed?.score) ? Math.max(0, Math.min(100, Math.round(parsed.score))) : 0,
    verdict: parsed?.verdict || 'Penilaian selesai.',
    strengths: Array.isArray(parsed?.strengths) ? parsed.strengths : [],
    improvements: Array.isArray(parsed?.improvements) ? parsed.improvements : [],
    feedback: parsed?.feedback || '',
    suggestedRevision: parsed?.suggestedRevision || '',
    blockFeedback
  }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed.' })
    return
  }

  if (!process.env.GEMINI_API_KEY) {
    response.status(500).json({ error: 'GEMINI_API_KEY belum dikonfigurasi di server.' })
    return
  }

  try {
    const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body
    const { caseStudy, userAnswers } = body || {}

    if (!caseStudy || !userAnswers) {
      response.status(400).json({ error: 'caseStudy dan userAnswers wajib dikirim.' })
      return
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    const prompt = buildBmcCasePrompt(caseStudy, userAnswers)

    const result = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType: 'application/json'
      }
    })

    const parsed = JSON.parse(extractJsonObject(result.text || ''))
    response.status(200).json(normalizeEvaluationResult(parsed))
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Terjadi kesalahan saat menilai BMC dengan Gemini.'
    })
  }
}
