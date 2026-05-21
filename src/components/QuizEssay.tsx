import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { studyMaterials } from '../data/materialStudyData'
import { QuestionEssay } from '../types'
import { Icon } from './Icon'
import {
  EssayEvaluationResult,
  evaluateEssayWithGemini,
  getGeminiEssayModelName,
  isGeminiEssayEvaluationEnabled
} from '../lib/geminiEssayEvaluator'

interface QuizEssayProps {
  onEssayCompleted: (essayTitle: string, materialTitle: string) => void
}

export function QuizEssay({ onEssayCompleted }: QuizEssayProps) {
  const [selectedMaterialId, setSelectedMaterialId] = useState(studyMaterials[0].id)
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [isEvaluating, setIsEvaluating] = useState<Record<string, boolean>>({})
  const [checkedPoints, setCheckedPoints] = useState<Record<string, string[]>>({})
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([])
  const [aiLoading, setAiLoading] = useState<Record<string, boolean>>({})
  const [aiError, setAiError] = useState<Record<string, string>>({})
  const [aiEvaluations, setAiEvaluations] = useState<Record<string, EssayEvaluationResult>>({})

  const selectedMaterial =
    studyMaterials.find((material) => material.id === selectedMaterialId) || studyMaterials[0]
  const currentEssayList = selectedMaterial.essayQuestions
  const [selectedCaseId, setSelectedCaseId] = useState<string>(currentEssayList[0].id)

  useEffect(() => {
    setSelectedCaseId(currentEssayList[0].id)
  }, [selectedMaterialId, currentEssayList])

  const currentCase: QuestionEssay =
    currentEssayList.find((question) => question.id === selectedCaseId) || currentEssayList[0]
  const currentAnswerText = userAnswers[currentCase.id] || ''
  const hasSubmitted = isEvaluating[currentCase.id] || false

  useEffect(() => {
    if (!currentAnswerText) {
      setMatchedKeywords([])
      return
    }

    const txt = currentAnswerText.toLowerCase()
    const matches = currentCase.keywords.filter((keyword) => txt.includes(keyword.toLowerCase()))
    setMatchedKeywords(matches)
  }, [currentAnswerText, currentCase])

  const currentCheckedList = checkedPoints[currentCase.id] || []
  const rubricTotal = currentCase.gradingRubric.length
  const matchPercentage = Math.round((currentCheckedList.length / rubricTotal) * 100)
  const aiEvaluation = aiEvaluations[currentCase.id]
  const aiEvaluationEnabled = isGeminiEssayEvaluationEnabled()
  const currentAiError = aiError[currentCase.id]
  const currentAiLoading = aiLoading[currentCase.id] || false

  const essayProgressCount = useMemo(
    () => Object.values(isEvaluating).filter(Boolean).length,
    [isEvaluating]
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setUserAnswers((prev) => ({
      ...prev,
      [currentCase.id]: val
    }))
  }

  const handleSubmitEvaluation = async () => {
    if (!currentAnswerText.trim() || hasSubmitted) return

    setIsEvaluating((prev) => ({
      ...prev,
      [currentCase.id]: true
    }))
    onEssayCompleted(currentCase.title, selectedMaterial.title)

    if (!aiEvaluationEnabled) {
      setAiError((prev) => ({
        ...prev,
        [currentCase.id]: 'Gemini API key belum tersedia, jadi penilaian AI belum aktif.'
      }))
      return
    }

    setAiLoading((prev) => ({
      ...prev,
      [currentCase.id]: true
    }))
    setAiError((prev) => ({
      ...prev,
      [currentCase.id]: ''
    }))

    try {
      const evaluation = await evaluateEssayWithGemini(currentCase, currentAnswerText)
      setAiEvaluations((prev) => ({
        ...prev,
        [currentCase.id]: evaluation
      }))
    } catch (error) {
      setAiError((prev) => ({
        ...prev,
        [currentCase.id]: error instanceof Error ? error.message : 'Gagal menilai jawaban dengan Gemini.'
      }))
    } finally {
      setAiLoading((prev) => ({
        ...prev,
        [currentCase.id]: false
      }))
    }
  }

  const handleToggleRubricPoint = (point: string) => {
    const list = checkedPoints[currentCase.id] || []
    const updated = list.includes(point) ? list.filter((item) => item !== point) : [...list, point]

    setCheckedPoints((prev) => ({
      ...prev,
      [currentCase.id]: updated
    }))
  }

  const handleResetCaseAnswer = () => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentCase.id]: ''
    }))
    setIsEvaluating((prev) => ({
      ...prev,
      [currentCase.id]: false
    }))
    setCheckedPoints((prev) => ({
      ...prev,
      [currentCase.id]: []
    }))
    setMatchedKeywords([])
    setAiError((prev) => ({
      ...prev,
      [currentCase.id]: ''
    }))
    setAiLoading((prev) => ({
      ...prev,
      [currentCase.id]: false
    }))
    setAiEvaluations((prev) => {
      const next = { ...prev }
      delete next[currentCase.id]
      return next
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      id="essay-practice-view"
    >
      <div className="space-y-4 pb-2 border-b border-brand-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-extrabold text-brand-charcoal flex items-center gap-2">
              <Icon name="FileText" className="text-brand-sage" size={26} />
              <span>Latihan Essay Per Materi</span>
            </h2>
            <p className="text-brand-stone text-xs mt-1">
              Setiap file materi memiliki prompt essay sendiri beserta kata kunci, rubrik, dan kunci jawaban ringkas.
            </p>
          </div>

          <div className="bg-brand-sand border border-brand-border rounded-xl px-3 py-2 text-[11px] text-brand-charcoal flex items-center gap-1.5 max-w-sm shadow-xs">
            <Icon name="ClipboardList" className="text-brand-sage shrink-0" size={16} />
            <span>
              Progress evaluasi essay: <strong>{essayProgressCount}</strong> kasus tersimpan
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {studyMaterials.map((material) => (
            <button
              key={material.id}
              onClick={() => setSelectedMaterialId(material.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
                material.id === selectedMaterialId
                  ? 'bg-brand-sage text-brand-cream border-brand-sage shadow-sm'
                  : 'bg-[#FAF9F6] text-brand-charcoal border-brand-border hover:bg-brand-darksand'
              }`}
            >
              {material.shortTitle}
            </button>
          ))}
        </div>

        <div className="bg-brand-sand rounded-2xl border border-brand-border p-4 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-brand-olive bg-brand-palesage border border-brand-sageborder/50 rounded-lg px-2.5 py-1">
              {selectedMaterial.title}
            </span>
            <span className="text-[10px] font-mono font-bold text-brand-stone bg-[#FAF9F6] border border-brand-border rounded-lg px-2.5 py-1">
              {selectedMaterial.sourceFile}
            </span>
          </div>
          <p className="text-sm text-brand-charcoal leading-relaxed">{selectedMaterial.summary}</p>
          <div>
            <a
              href={selectedMaterial.sourceHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-brand-sage hover:bg-brand-olive text-brand-cream px-3.5 py-2 rounded-xl text-xs font-bold transition"
            >
              <Icon name="ExternalLink" size={14} />
              <span>Buka Materi Asli</span>
            </a>
          </div>
        </div>

        <div className="flex bg-brand-darksand p-1 rounded-xl self-start text-xs font-bold leading-normal w-fit">
          {currentEssayList.map((essay, index) => (
            <button
              key={essay.id}
              onClick={() => setSelectedCaseId(essay.id)}
              className={`px-3 py-1.5 rounded-lg transition duration-150 cursor-pointer ${
                selectedCaseId === essay.id
                  ? 'bg-[#FAF9F6] text-brand-olive shadow-sm font-black'
                  : 'text-brand-stone hover:text-brand-charcoal'
              }`}
            >
              Essay {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-brand-sand rounded-3xl border border-brand-border shadow-sm overflow-hidden">
            <div className="bg-brand-olive text-brand-cream p-5 space-y-1">
              <span className="text-[10px] font-mono bg-[#FAF9F6]/20 px-2 py-0.5 rounded-md font-bold uppercase tracking-wide">
                Active Essay Prompt
              </span>
              <h3 className="text-base sm:text-lg font-display font-extrabold">{currentCase.title}</h3>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div className="space-y-1">
                <h4 className="text-[10.5px] font-mono font-bold text-brand-stone uppercase tracking-wider">
                  Scenario:
                </h4>
                <p className="text-brand-charcoal text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                  {currentCase.scenario}
                </p>
              </div>

              <div className="border-t border-brand-border/40 pt-4 space-y-1.5 bg-brand-palesage/40 -mx-5 -mb-6 p-5 sm:-mx-6 sm:-mb-6">
                <h4 className="text-xs font-bold text-brand-olive uppercase tracking-widest flex items-center gap-1">
                  <Icon name="Target" size={14} className="text-brand-sage" />
                  <span>Tugas Essay</span>
                </h4>
                <p className="text-xs text-brand-charcoal font-extrabold leading-relaxed">{currentCase.task}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor="essay-answer-box" className="font-bold text-brand-charcoal flex items-center gap-1">
                <Icon name="Edit3" size={14} className="text-brand-sage" />
                <span>Lembar Jawaban</span>
              </label>

              <span className="text-[10px] font-mono font-bold text-brand-stone">
                {currentAnswerText.length} karakter
              </span>
            </div>

            <textarea
              id="essay-answer-box"
              disabled={hasSubmitted}
              value={currentAnswerText}
              onChange={handleInputChange}
              placeholder="Tulis analisis Anda di sini. Bandingkan dengan kata kunci dan kunci jawaban setelah evaluasi."
              className="w-full h-48 p-4 bg-[#FAF9F6] disabled:bg-[#FAF9F6]/50 disabled:text-brand-stone/60 border border-brand-border focus:border-brand-sage focus:ring-1 focus:ring-brand-sage rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs outline-none transition duration-150 resize-y font-medium text-brand-charcoal"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            {hasSubmitted ? (
              <button
                onClick={handleResetCaseAnswer}
                className="w-full sm:w-auto text-xs text-[#9A5B50] hover:text-[#7A453C] font-bold bg-[#FAF0ED] hover:bg-[#FAF0ED]/85 px-4 py-2 rounded-xl border border-[#EAD3CE] transition duration-150 cursor-pointer"
              >
                Tulis Ulang Jawaban Ini
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleSubmitEvaluation}
              disabled={!currentAnswerText.trim() || hasSubmitted}
              className="w-full sm:w-auto bg-brand-sage hover:bg-brand-olive disabled:bg-brand-darksand disabled:text-brand-stone/50 text-brand-cream px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1.5 transition shadow-sm hover:shadow active:scale-95 cursor-pointer"
            >
              <Icon name="SearchCode" size={14} />
              <span>Evaluasi Jawaban</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-brand-sand border border-brand-border rounded-3xl p-5 space-y-4 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Cpu" className="text-brand-sage" size={18} />
                <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-widest leading-none">
                  Pemeriksa Kata Kunci
                </h4>
              </div>
              <p className="text-[10.5px] text-brand-stone leading-normal">
                Sistem memeriksa kata kunci penting dari prompt essay aktif ini.
              </p>
              <div className="text-[10px] text-brand-stone">
                AI evaluator: <span className="font-bold text-brand-olive">{getGeminiEssayModelName()}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {currentCase.keywords.map((keyword) => {
                const isMatched = matchedKeywords.includes(keyword)
                return (
                  <span
                    key={keyword}
                    className={`text-[10px] font-mono px-2.5 py-1 rounded-md border font-medium flex items-center space-x-1 transition-all duration-300 ${
                      isMatched
                        ? 'bg-[#EEF4F2] text-brand-olive border-brand-sageborder font-semibold shadow-2xs'
                        : 'bg-[#FAF9F6] text-brand-stone/50 border-brand-border/40 opacity-70'
                    }`}
                  >
                    {isMatched && <Icon name="Check" size={10} className="text-brand-olive shrink-0" />}
                    <span>{keyword}</span>
                  </span>
                )
              })}
            </div>

            {currentAnswerText ? (
              <p className="text-[10px] text-brand-olive font-bold">
                Kata kunci terdeteksi: {matchedKeywords.length} dari {currentCase.keywords.length}
              </p>
            ) : (
              <p className="text-[10px] text-brand-stone/70 italic">Mulai mengetik untuk melihat pencocokan kata kunci.</p>
            )}
          </div>

          <AnimatePresence>
            {hasSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="bg-brand-sand rounded-3xl border border-brand-border p-5 space-y-3 shadow-sm">
                  <div className="flex items-center space-x-2 border-b border-brand-border/40 pb-2">
                    <Icon name="Award" className="text-brand-sage" size={18} />
                    <h3 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                      Kunci Jawaban Ringkas
                    </h3>
                  </div>

                  <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                    <p className="text-[11px] text-brand-charcoal/90 leading-relaxed whitespace-pre-line font-sans">
                      {currentCase.suggestedAnswer}
                    </p>
                  </div>
                </div>

                <div className="bg-brand-sand rounded-3xl border border-brand-sageborder p-5 space-y-4 shadow-sm">
                  <div className="flex items-center space-x-2 border-b border-brand-border/40 pb-2">
                    <Icon name="Sparkles" className="text-brand-sage" size={18} />
                    <h3 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                      Penilaian AI Gemini
                    </h3>
                  </div>

                  {currentAiLoading && (
                    <div className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-4 text-xs text-brand-stone">
                      Gemini sedang menilai jawaban Anda...
                    </div>
                  )}

                  {!currentAiLoading && currentAiError && (
                    <div className="bg-[#FAF0ED] border border-[#EAD3CE] rounded-2xl p-4 text-xs text-[#9A5B50]">
                      {currentAiError}
                    </div>
                  )}

                  {!currentAiLoading && aiEvaluation && (
                    <div className="space-y-4">
                      <div className="bg-brand-palesage border border-brand-sageborder rounded-2xl p-4 text-center">
                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-stone">
                          Skor AI
                        </p>
                        <div className="text-4xl font-display font-black text-brand-olive">{aiEvaluation.score}</div>
                        <p className="text-xs font-semibold text-brand-charcoal mt-1">{aiEvaluation.verdict}</p>
                      </div>

                      <div className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-4 space-y-2">
                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-stone">
                          Feedback
                        </p>
                        <p className="text-xs text-brand-charcoal leading-relaxed">{aiEvaluation.feedback}</p>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <div className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-4 space-y-2">
                          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-stone">
                            Kekuatan Jawaban
                          </p>
                          <ul className="space-y-2">
                            {aiEvaluation.strengths.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-xs text-brand-charcoal leading-relaxed">
                                <span className="text-brand-olive mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-4 space-y-2">
                          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-stone">
                            Yang Perlu Diperbaiki
                          </p>
                          <ul className="space-y-2">
                            {aiEvaluation.improvements.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-xs text-brand-charcoal leading-relaxed">
                                <span className="text-[#9A5B50] mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-4 space-y-2">
                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-stone">
                          Saran Revisi
                        </p>
                        <p className="text-xs text-brand-charcoal leading-relaxed">{aiEvaluation.suggestedRevision}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-brand-sand rounded-3xl border border-brand-sageborder p-5 space-y-4 shadow-md bg-gradient-to-br from-brand-sand to-[#FAF9F6]/20">
                  <div className="space-y-1">
                    <h3 className="text-xs font-extrabold text-brand-charcoal uppercase tracking-widest flex items-center gap-1">
                      <Icon name="GraduationCap" className="text-brand-sage" size={16} />
                      <span>Rubrik Penilaian Mandiri</span>
                    </h3>
                    <p className="text-[10.5px] text-brand-stone leading-snug">
                      Centang butir rubrik yang menurut Anda sudah tercakup di jawaban.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {currentCase.gradingRubric.map((rubric) => {
                      const isChecked = currentCheckedList.includes(rubric.point)
                      return (
                        <button
                          key={rubric.point}
                          onClick={() => handleToggleRubricPoint(rubric.point)}
                          className={`w-full text-left p-2.5 rounded-xl border flex items-start space-x-2.5 transition cursor-pointer select-none ${
                            isChecked
                              ? 'bg-brand-palesage/60 border-brand-sageborder text-brand-olive shadow-xs font-bold'
                              : 'bg-[#FAF9F6] hover:bg-brand-sand border-brand-border/80 text-brand-charcoal/80'
                          }`}
                        >
                          <span
                            className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition ${
                              isChecked
                                ? 'bg-brand-olive border-brand-sageborder text-brand-cream'
                                : 'bg-brand-sand border-brand-border/65 text-transparent'
                            }`}
                          >
                            <Icon name="Check" size={12} />
                          </span>
                          <div className="space-y-0.5">
                            <p className="text-[11px] font-bold text-brand-charcoal">{rubric.point}</p>
                            <p className="text-[10px] text-brand-stone leading-relaxed font-sans">
                              {rubric.description}
                            </p>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <div className="bg-brand-palesage border border-brand-sageborder p-3.5 rounded-xl text-center space-y-1">
                    <p className="text-[9px] text-brand-stone font-mono font-bold uppercase tracking-wider">
                      Estimasi Cakupan Jawaban
                    </p>
                    <div className="text-3xl font-display font-black text-brand-olive">{matchPercentage}%</div>
                    <p className="text-[10px] text-brand-olive font-bold leading-none">
                      {currentCheckedList.length} dari {rubricTotal} poin rubrik tercakup
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
