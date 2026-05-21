import { GoogleGenAI } from '@google/genai'

const modelName = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite-preview'

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

function normalizeEvaluationResult(parsed) {
  return {
    score: Number.isFinite(parsed?.score) ? Math.max(0, Math.min(100, Math.round(parsed.score))) : 0,
    verdict: parsed?.verdict || 'Penilaian selesai.',
    strengths: Array.isArray(parsed?.strengths) ? parsed.strengths : [],
    improvements: Array.isArray(parsed?.improvements) ? parsed.improvements : [],
    feedback: parsed?.feedback || '',
    suggestedRevision: parsed?.suggestedRevision || ''
  }
}

function buildEvaluationPrompt(essay, userAnswer) {
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
    const { essay, userAnswer } = body || {}

    if (!essay || !userAnswer) {
      response.status(400).json({ error: 'essay dan userAnswer wajib dikirim.' })
      return
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    const prompt = buildEvaluationPrompt(essay, userAnswer)

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
      error: error instanceof Error ? error.message : 'Terjadi kesalahan saat menilai jawaban dengan Gemini.'
    })
  }
}
