import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { bmcElements } from '../data/bmcData'
import { bmcCaseStudies, orderedBmcBlockIds } from '../data/bmcCaseStudies'
import { BmcBlockId, BmcCaseEvaluationResult } from '../types'
import { exportBmcCaseReportToPdf } from '../lib/pdfExport'
import { Icon } from './Icon'
import { evaluateBmcCaseWithGemini, getGeminiBmcModelName } from '../lib/geminiBmcEvaluator'

interface BmcCasePracticeProps {
  onCaseCompleted?: (caseTitle: string, score: number) => void
}

const LOCAL_STORAGE_BMC_CASE_PRACTICE_KEY = 'bmc_case_practice_progress_v1'

const emptyAnswers = (): Record<BmcBlockId, string> => ({
  KP: '',
  KA: '',
  KR: '',
  VP: '',
  CR: '',
  CH: '',
  CS: '',
  'C$': '',
  'R$': ''
})

export function BmcCasePractice({ onCaseCompleted }: BmcCasePracticeProps) {
  const [selectedCaseId, setSelectedCaseId] = useState(bmcCaseStudies[0].id)
  const [answersByCase, setAnswersByCase] = useState<Record<string, Record<BmcBlockId, string>>>({})
  const [evaluations, setEvaluations] = useState<Record<string, BmcCaseEvaluationResult>>({})
  const [isEvaluating, setIsEvaluating] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submittedCases, setSubmittedCases] = useState<Record<string, boolean>>({})

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_BMC_CASE_PRACTICE_KEY)
      if (!stored) return

      const parsed = JSON.parse(stored) as {
        selectedCaseId?: string
        answersByCase?: Record<string, Record<BmcBlockId, string>>
        evaluations?: Record<string, BmcCaseEvaluationResult>
        submittedCases?: Record<string, boolean>
      }

      if (parsed.selectedCaseId && bmcCaseStudies.some((item) => item.id === parsed.selectedCaseId)) {
        setSelectedCaseId(parsed.selectedCaseId)
      }

      if (parsed.answersByCase) {
        setAnswersByCase(parsed.answersByCase)
      }

      if (parsed.evaluations) {
        setEvaluations(parsed.evaluations)
      }

      if (parsed.submittedCases) {
        setSubmittedCases(parsed.submittedCases)
      }
    } catch (error) {
      console.error('Failed loading BMC case practice data:', error)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_BMC_CASE_PRACTICE_KEY,
        JSON.stringify({
          selectedCaseId,
          answersByCase,
          evaluations,
          submittedCases
        })
      )
    } catch (error) {
      console.error('Failed saving BMC case practice data:', error)
    }
  }, [answersByCase, evaluations, selectedCaseId, submittedCases])

  const selectedCase = bmcCaseStudies.find((item) => item.id === selectedCaseId) || bmcCaseStudies[0]
  const currentAnswers = answersByCase[selectedCaseId] || emptyAnswers()
  const answeredBlockCount = orderedBmcBlockIds.filter((blockId) => currentAnswers[blockId].trim()).length
  const currentEvaluation = evaluations[selectedCaseId]
  const currentError = errors[selectedCaseId]
  const currentLoading = isEvaluating[selectedCaseId] || false
  const hasSubmitted = submittedCases[selectedCaseId] || false

  const totalCompletedCases = useMemo(
    () => Object.values(submittedCases).filter(Boolean).length,
    [submittedCases]
  )

  const handleAnswerChange = (blockId: BmcBlockId, value: string) => {
    setAnswersByCase((prev) => ({
      ...prev,
      [selectedCaseId]: {
        ...(prev[selectedCaseId] || emptyAnswers()),
        [blockId]: value
      }
    }))
  }

  const handleResetCase = () => {
    setAnswersByCase((prev) => ({
      ...prev,
      [selectedCaseId]: emptyAnswers()
    }))
    setSubmittedCases((prev) => ({
      ...prev,
      [selectedCaseId]: false
    }))
    setErrors((prev) => ({
      ...prev,
      [selectedCaseId]: ''
    }))
    setIsEvaluating((prev) => ({
      ...prev,
      [selectedCaseId]: false
    }))
    setEvaluations((prev) => {
      const next = { ...prev }
      delete next[selectedCaseId]
      return next
    })
  }

  const handleEvaluate = async () => {
    if (answeredBlockCount === 0 || currentLoading) return

    setSubmittedCases((prev) => ({
      ...prev,
      [selectedCaseId]: true
    }))
    setIsEvaluating((prev) => ({
      ...prev,
      [selectedCaseId]: true
    }))
    setErrors((prev) => ({
      ...prev,
      [selectedCaseId]: ''
    }))

    try {
      const result = await evaluateBmcCaseWithGemini(selectedCase, currentAnswers)
      setEvaluations((prev) => ({
        ...prev,
        [selectedCaseId]: result
      }))
      onCaseCompleted?.(selectedCase.title, result.score)
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [selectedCaseId]: error instanceof Error ? error.message : 'Gagal mengevaluasi latihan BMC.'
      }))
    } finally {
      setIsEvaluating((prev) => ({
        ...prev,
        [selectedCaseId]: false
      }))
    }
  }

  return (
    <div className="space-y-6" id="bmc-case-practice-view">
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-display font-extrabold text-brand-charcoal flex items-center gap-2">
            <Icon name="ClipboardPenLine" className="text-brand-sage" size={26} />
            <span>Latihan Studi Kasus BMC</span>
          </h3>
          <p className="text-brand-stone text-xs sm:text-sm max-w-3xl">
            Pilih studi kasus, isi kanvas kosong dengan sembilan blok Business Model Canvas, lalu minta Gemini menilai
            kecocokan jawaban Anda terhadap kunci acuan.
          </p>
        </div>

        <div className="bg-brand-sand border border-brand-border rounded-2xl px-4 py-3 text-xs text-brand-charcoal shadow-xs space-y-1.5 self-start">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" size={15} className="text-brand-sage" />
            <span>
              Evaluator AI: <strong className="text-brand-olive">{getGeminiBmcModelName()}</strong>
            </span>
          </div>
          <div className="text-brand-stone">
            Kasus yang pernah dievaluasi: <strong className="text-brand-olive">{totalCompletedCases}</strong> dari{' '}
            <strong className="text-brand-olive">{bmcCaseStudies.length}</strong>
          </div>
          <div className="text-brand-stone">
            Jawaban dan hasil evaluasi latihan ini tersimpan otomatis di browser.
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {bmcCaseStudies.map((caseStudy, index) => (
          <button
            key={caseStudy.id}
            onClick={() => setSelectedCaseId(caseStudy.id)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
              caseStudy.id === selectedCaseId
                ? 'bg-brand-sage text-brand-cream border-brand-sage shadow-sm'
                : 'bg-[#FAF9F6] text-brand-charcoal border-brand-border hover:bg-brand-darksand'
            }`}
          >
            Kasus {index + 1}: {caseStudy.shortTitle}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-4">
        <div className="bg-brand-sand rounded-3xl border border-brand-border p-5 sm:p-6 space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-palesage text-brand-olive px-2.5 py-1 rounded-full border border-brand-sageborder">
              {selectedCase.title}
            </span>
            <p className="text-sm text-brand-charcoal leading-relaxed">{selectedCase.scenario}</p>
          </div>

          <div className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-brand-olive">
              <Icon name="Target" size={16} />
              <p className="text-xs font-bold uppercase tracking-wider">Tugas</p>
            </div>
            <p className="text-xs text-brand-charcoal leading-relaxed">{selectedCase.task}</p>
          </div>
        </div>

        <div className="bg-brand-sand rounded-3xl border border-brand-border p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-brand-charcoal">
            <Icon name="NotebookTabs" size={18} className="text-brand-sage" />
            <h4 className="text-xs font-bold uppercase tracking-widest">Petunjuk Pengisian</h4>
          </div>

          <div className="space-y-2 text-xs text-brand-stone leading-relaxed">
            <p>Gunakan nama blok BMC asli dalam English: `Key Partners`, `Key Activities`, `Key Resources`, dan seterusnya.</p>
            <p>Isi tiap blok dengan poin yang spesifik terhadap studi kasus, bukan definisi umum.</p>
            <p>Jika satu blok punya lebih dari satu isi, pisahkan dengan koma, titik koma, atau baris baru.</p>
            <p>
              Khusus `Channels`, susun jawaban berdasarkan 5 fase materi Channel: `Awareness`, `Evaluation`, `Purchase`,
              `Delivery`, dan `After Sales`.
            </p>
          </div>

          <div className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-4">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="font-bold text-brand-charcoal">Blok terisi</span>
              <span className="font-mono font-bold text-brand-olive">
                {answeredBlockCount} / {orderedBmcBlockIds.length}
              </span>
            </div>
            <div className="w-full bg-brand-sand border border-brand-border rounded-full h-2 mt-3 overflow-hidden">
              <div
                className="bg-brand-sage h-2 rounded-full transition-all duration-300"
                style={{ width: `${(answeredBlockCount / orderedBmcBlockIds.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:grid lg:grid-cols-10 lg:grid-rows-3 gap-3">
        {orderedBmcBlockIds.map((blockId) => {
          const block = bmcElements.find((item) => item.id === blockId)!
          const spanClass =
            blockId === 'KP' || blockId === 'VP' || blockId === 'CS'
              ? 'lg:col-span-2 lg:row-span-2'
              : blockId === 'C$' || blockId === 'R$'
                ? 'lg:col-span-5'
                : 'h-full'

          if (blockId === 'KA') {
            return (
              <div key={blockId} className="lg:col-span-2 lg:row-span-2 grid grid-rows-2 gap-3">
                {renderAnswerBlock(blockId, block, currentAnswers[blockId], handleAnswerChange)}
                {renderAnswerBlock('KR', bmcElements.find((item) => item.id === 'KR')!, currentAnswers.KR, handleAnswerChange)}
              </div>
            )
          }

          if (blockId === 'KR') return null

          if (blockId === 'CR') {
            return (
              <div key={blockId} className="lg:col-span-2 lg:row-span-2 grid grid-rows-2 gap-3">
                {renderAnswerBlock(blockId, block, currentAnswers[blockId], handleAnswerChange)}
                {renderAnswerBlock('CH', bmcElements.find((item) => item.id === 'CH')!, currentAnswers.CH, handleAnswerChange)}
              </div>
            )
          }

          if (blockId === 'CH') return null

          return renderAnswerBlock(blockId, block, currentAnswers[blockId], handleAnswerChange, spanClass)
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
        {orderedBmcBlockIds.map((blockId) => {
          const block = bmcElements.find((item) => item.id === blockId)!
          return renderAnswerBlock(blockId, block, currentAnswers[blockId], handleAnswerChange)
        })}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={handleResetCase}
            className="w-full sm:w-auto bg-[#FAF0ED] hover:bg-[#F6E2DD] border border-[#EAD3CE] text-[#9A5B50] px-4 py-2.5 rounded-xl text-xs font-bold transition"
          >
            Reset Jawaban Kasus Ini
          </button>

          {currentEvaluation && (
            <button
              onClick={() =>
                exportBmcCaseReportToPdf({
                  caseStudy: selectedCase,
                  answers: currentAnswers,
                  evaluation: currentEvaluation
                })
              }
              className="w-full sm:w-auto bg-[#FAF9F6] hover:bg-brand-sand border border-brand-border text-brand-charcoal px-4 py-2.5 rounded-xl text-xs font-bold transition inline-flex items-center justify-center gap-2"
            >
              <Icon name="FileDown" size={14} />
              <span>Export Hasil BMC PDF</span>
            </button>
          )}
        </div>

        <button
          onClick={handleEvaluate}
          disabled={answeredBlockCount === 0 || currentLoading}
          className="w-full sm:w-auto bg-brand-sage hover:bg-brand-olive disabled:bg-brand-darksand disabled:text-brand-stone/50 text-brand-cream px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition"
        >
          <Icon name="SearchCode" size={14} />
          <span>{currentLoading ? 'Gemini sedang menilai...' : 'Evaluasi Kanvas Ini'}</span>
        </button>
      </div>

      <AnimatePresence>
        {(hasSubmitted || currentError || currentEvaluation) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {currentError && (
              <div className="bg-[#FAF0ED] border border-[#EAD3CE] rounded-2xl p-4 text-sm text-[#9A5B50]">
                {currentError}
              </div>
            )}

            {currentEvaluation && (
              <>
                <div className="grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-4">
                  <div className="bg-brand-sand rounded-3xl border border-brand-sageborder p-5 shadow-sm text-center space-y-2">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-stone">
                      Skor Latihan BMC
                    </p>
                    <div className="text-5xl font-display font-black text-brand-olive">{currentEvaluation.score}</div>
                    <p className="text-xs font-semibold text-brand-charcoal">{currentEvaluation.verdict}</p>
                  </div>

                  <div className="bg-brand-sand rounded-3xl border border-brand-border p-5 shadow-sm space-y-3">
                    <div className="flex items-center gap-2 text-brand-charcoal">
                      <Icon name="Sparkles" size={18} className="text-brand-sage" />
                      <h4 className="text-xs font-bold uppercase tracking-widest">Feedback Gemini</h4>
                    </div>
                    <p className="text-sm text-brand-charcoal leading-relaxed">{currentEvaluation.feedback}</p>
                    <div className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-4 space-y-2">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-stone">
                        Saran Revisi
                      </p>
                      <p className="text-xs text-brand-charcoal leading-relaxed">{currentEvaluation.suggestedRevision}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-brand-sand rounded-3xl border border-brand-border p-5 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">Kekuatan Jawaban</h4>
                    <ul className="space-y-2">
                      {currentEvaluation.strengths.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-brand-charcoal leading-relaxed">
                          <span className="text-brand-olive mt-0.5">-</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-brand-sand rounded-3xl border border-brand-border p-5 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">Yang Perlu Diperbaiki</h4>
                    <ul className="space-y-2">
                      {currentEvaluation.improvements.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-brand-charcoal leading-relaxed">
                          <span className="text-[#9A5B50] mt-0.5">-</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-brand-sand rounded-3xl border border-brand-border p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2 text-brand-charcoal">
                    <Icon name="LayoutPanelTop" size={18} className="text-brand-sage" />
                    <h4 className="text-xs font-bold uppercase tracking-widest">Ulasan Per Blok</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {currentEvaluation.blockFeedback.map((item) => (
                      <div key={item.blockId} className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-4 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-brand-charcoal">
                            {item.blockId} - {item.blockName}
                          </span>
                          <span className="text-[10px] font-mono font-bold bg-brand-palesage text-brand-olive px-2 py-1 rounded-full border border-brand-sageborder">
                            {item.score}/10
                          </span>
                        </div>
                        <p className="text-xs text-brand-stone leading-relaxed">{item.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-brand-sand rounded-3xl border border-brand-border p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2 text-brand-charcoal">
                    <Icon name="BookCheck" size={18} className="text-brand-sage" />
                    <h4 className="text-xs font-bold uppercase tracking-widest">Kunci Jawaban Acuan</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {orderedBmcBlockIds.map((blockId) => {
                      const block = bmcElements.find((item) => item.id === blockId)!
                      return (
                        <div key={blockId} className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold bg-brand-palesage text-brand-olive px-2 py-1 rounded-full border border-brand-sageborder">
                              {blockId}
                            </span>
                            <h5 className="text-xs font-bold text-brand-charcoal">{block.name}</h5>
                          </div>
                          <ul className="space-y-1.5">
                            {selectedCase.answerKey[blockId].map((item) => (
                              <li key={item} className="flex items-start gap-2 text-xs text-brand-stone leading-relaxed">
                                <span className="text-brand-olive mt-0.5">-</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function renderAnswerBlock(
  blockId: BmcBlockId,
  block: (typeof bmcElements)[number],
  value: string,
  onChange: (blockId: BmcBlockId, value: string) => void,
  className = ''
) {
  const placeholder =
    blockId === 'CH'
      ? 'Awareness: ...\nEvaluation: ...\nPurchase: ...\nDelivery: ...\nAfter Sales: ...'
      : block.keyQuestions[0]

  return (
    <div
      key={blockId}
      className={`bg-brand-sand border border-brand-border rounded-2xl p-4 shadow-xs flex flex-col min-h-[230px] ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-brand-olive bg-brand-palesage border border-brand-sageborder rounded-full px-2 py-0.5">
              {blockId}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-stone">BMC Block</span>
          </div>
          <h5 className="text-sm font-display font-extrabold text-brand-charcoal">{block.name}</h5>
        </div>
        <div className="bg-[#FAF9F6] border border-brand-border rounded-xl p-2 shrink-0">
          <Icon name={block.iconName} size={16} className="text-brand-sage" />
        </div>
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(blockId, event.target.value)}
        placeholder={placeholder}
        className="mt-4 w-full flex-1 min-h-[120px] p-3 bg-[#FAF9F6] border border-brand-border focus:border-brand-sage focus:ring-1 focus:ring-brand-sage rounded-2xl text-xs leading-relaxed outline-none transition resize-none text-brand-charcoal"
      />

      <p className="mt-2 text-[10px] text-brand-stone leading-relaxed">
        {blockId === 'CH' ? (
          <>
            Gunakan format fase untuk blok <strong className="text-brand-charcoal">{block.name}</strong>:
            {' '}Awareness, Evaluation, Purchase, Delivery, After Sales.
          </>
        ) : (
          <>
            Gunakan poin spesifik untuk blok <strong className="text-brand-charcoal">{block.name}</strong>.
          </>
        )}
      </p>
    </div>
  )
}
