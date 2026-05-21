import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { studyMaterials } from '../data/materialStudyData'
import { getMultipleChoiceQuestionsForMaterial } from '../data/docxMultipleChoiceQuestionBank'
import { Icon } from './Icon'

interface QuizMultipleChoiceProps {
  onQuizCompleted: (scorePercentage: number, materialTitle: string) => void
}

type OptionKey = 'A' | 'B' | 'C' | 'D'

export function QuizMultipleChoice({ onQuizCompleted }: QuizMultipleChoiceProps) {
  const [selectedMaterialId, setSelectedMaterialId] = useState(studyMaterials[0].id)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedKey, setSelectedKey] = useState<OptionKey | null>(null)
  const [quizFinished, setQuizFinished] = useState(false)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [resultsLog, setResultsLog] = useState<
    {
      questionId: string
      chosenKey: OptionKey
      isCorrect: boolean
    }[]
  >([])

  const selectedMaterial =
    studyMaterials.find((material) => material.id === selectedMaterialId) || studyMaterials[0]
  const questions = getMultipleChoiceQuestionsForMaterial(selectedMaterialId)
  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length

  useEffect(() => {
    setCurrentIndex(0)
    setSelectedKey(null)
    setQuizFinished(false)
    setCorrectAnswersCount(0)
    setResultsLog([])
  }, [selectedMaterialId])

  const handleSelectOption = (key: OptionKey) => {
    if (!currentQuestion) return
    if (selectedKey !== null) return

    setSelectedKey(key)
    const isCorrect = key === currentQuestion.correctAnswer

    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1)
    }

    setResultsLog((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        chosenKey: key,
        isCorrect
      }
    ])
  }

  const handleNext = () => {
    if (!currentQuestion) return

    if (currentIndex + 1 < totalQuestions) {
      setSelectedKey(null)
      setCurrentIndex((prev) => prev + 1)
      return
    }

    const finalCorrectCount =
      selectedKey === currentQuestion.correctAnswer ? correctAnswersCount : correctAnswersCount
    const scorePercentage = Math.round((finalCorrectCount / totalQuestions) * 100)
    setQuizFinished(true)
    onQuizCompleted(scorePercentage, selectedMaterial.title)
  }

  const handleResetQuiz = () => {
    setCurrentIndex(0)
    setSelectedKey(null)
    setQuizFinished(false)
    setCorrectAnswersCount(0)
    setResultsLog([])
  }

  const scorePercentage = totalQuestions > 0 ? Math.round((correctAnswersCount / totalQuestions) * 100) : 0
  const hasAnswered = selectedKey !== null
  const isSelectedCorrect = currentQuestion ? selectedKey === currentQuestion.correctAnswer : false

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-6"
      id="mc-quiz-view"
    >
      <div className="space-y-4 pb-2 border-b border-brand-border">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-brand-charcoal flex items-center gap-2">
            <Icon name="CheckSquare" className="text-brand-sage" size={26} />
            <span>Pilihan Ganda Per Materi</span>
          </h2>
          <p className="text-brand-stone text-xs mt-1">
            Pilih file materi lalu kerjakan semua soal pilihan ganda yang diambil dari dokumen sumber.
          </p>
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
      </div>

      {totalQuestions === 0 ? (
        <div className="bg-brand-sand rounded-2xl border border-brand-border p-6 text-sm text-brand-stone">
          Belum ada soal pilihan ganda yang terhubung untuk materi ini.
        </div>
      ) : !quizFinished ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-[10px] font-bold text-brand-olive bg-brand-palesage border border-brand-sageborder/50 rounded-lg px-2.5 py-1">
              Topik: {currentQuestion.category}
            </span>
            <span className="text-xs font-mono font-bold text-brand-stone">
              Pertanyaan {currentIndex + 1} dari {totalQuestions}
            </span>
          </div>

          <div className="w-full bg-[#FAF9F6]/80 border border-brand-border/30 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-brand-sage h-1.5 rounded-full transition-all duration-350"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          <div className="bg-brand-sand rounded-2xl p-5 border border-brand-border shadow-2xs">
            <h3 className="text-base sm:text-lg font-display font-extrabold text-brand-charcoal leading-snug">
              {currentQuestion.question}
            </h3>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const itemKey = option.key
              const isSelected = selectedKey === itemKey
              const isCorrectAnswer = itemKey === currentQuestion.correctAnswer

              let btnClass = 'bg-[#FAF9F6] hover:bg-brand-sand border-brand-border text-brand-charcoal/90'
              let badgeClass = 'bg-brand-sand text-brand-stone border-brand-border/60'

              if (hasAnswered) {
                if (isCorrectAnswer) {
                  btnClass = 'bg-brand-palesage/60 border-brand-sageborder text-brand-olive font-bold ring-1 ring-brand-sageborder'
                  badgeClass = 'bg-brand-olive text-brand-cream border-brand-sageborder'
                } else if (isSelected) {
                  btnClass = 'bg-[#FAF0ED] border-[#EAD3CE] text-[#9A5B50] font-bold ring-1 ring-[#FAF0ED]'
                  badgeClass = 'bg-[#9A5B50] text-[#FAF9F6] border-[#DAB0A9]'
                } else {
                  btnClass = 'bg-[#FAF9F6] border-brand-border/40 text-brand-stone/40 opacity-50 font-normal shadow-none'
                  badgeClass = 'bg-brand-sand text-brand-stone/30 border-brand-border/20'
                }
              } else if (isSelected) {
                btnClass = 'bg-brand-sand border-brand-sage text-brand-charcoal ring-2 ring-brand-palesage/70'
                badgeClass = 'bg-brand-sage text-brand-cream border-brand-sage'
              }

              return (
                <button
                  key={itemKey}
                  onClick={() => handleSelectOption(itemKey)}
                  disabled={hasAnswered}
                  className={`${btnClass} w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center space-x-3 text-xs sm:text-sm font-semibold ${
                    !hasAnswered ? 'cursor-pointer hover:scale-[1.005] hover:shadow-2xs active:scale-100' : 'cursor-default'
                  }`}
                >
                  <span
                    className={`${badgeClass} h-8 w-8 rounded-lg font-display font-black text-sm border flex items-center justify-center shrink-0`}
                  >
                    {itemKey}
                  </span>
                  <span className="leading-snug flex-1 pr-2">{option.text}</span>

                  {hasAnswered && isCorrectAnswer && (
                    <Icon name="Check" className="text-brand-olive" size={18} />
                  )}
                  {hasAnswered && isSelected && !isCorrectAnswer && (
                    <Icon name="XCircle" className="text-[#9A5B50]" size={18} />
                  )}
                </button>
              )
            })}
          </div>

          <AnimatePresence>
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`p-5 rounded-2xl border ${
                  isSelectedCorrect
                    ? 'bg-[#EEF4F2]/50 border-brand-sageborder text-brand-charcoal'
                    : 'bg-[#FAF6EC]/50 border-brand-border/80 text-brand-charcoal'
                } space-y-2`}
              >
                <div className="flex items-center space-x-2 text-xs font-bold leading-none">
                  {isSelectedCorrect ? (
                    <span className="text-brand-olive flex items-center gap-1">
                      <Icon name="Check" size={14} />
                      <span>Jawaban Anda benar</span>
                    </span>
                  ) : (
                    <span className="text-brand-stone flex items-center gap-1">
                      <Icon name="Info" size={14} />
                      <span>Kurang tepat. Kunci: {currentQuestion.correctAnswer}</span>
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-brand-stone font-mono font-bold uppercase">
                    Ulasan Materi
                  </span>
                  <p className="text-xs text-brand-charcoal/90 leading-relaxed font-sans">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {hasAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="w-full sm:w-auto bg-brand-sage hover:bg-brand-olive text-brand-cream px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 cursor-pointer shadow-sm hover:shadow-md transition active:scale-95"
              >
                <span>{currentIndex + 1 === totalQuestions ? 'Selesaikan Set Soal' : 'Soal Berikutnya'}</span>
                <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-brand-sand rounded-3xl border border-brand-border p-6 sm:p-8 shadow-md text-center space-y-6"
        >
          <div className="space-y-2">
            <div className="inline-flex bg-[#FAF9F6] border border-brand-border text-brand-olive p-4 rounded-full">
              <Icon name="Award" size={48} className="text-brand-sage" />
            </div>
            <h3 className="text-2xl font-display font-black text-brand-charcoal">
              Set Soal Selesai
            </h3>
            <p className="text-brand-stone text-xs sm:text-sm">
              Ringkasan hasil Anda untuk materi {selectedMaterial.shortTitle}.
            </p>
          </div>

          <div className="max-w-xs mx-auto bg-[#FAF9F6] border border-brand-border rounded-2xl p-5 space-y-2">
            <div className="text-[10px] font-mono text-brand-stone font-bold uppercase">Nilai Akhir</div>
            <div className="text-6xl font-display font-black tracking-tight text-brand-olive">
              {scorePercentage}%
            </div>
            <p className="text-xs text-brand-stone leading-none">
              Menjawab benar <strong className="text-brand-charcoal">{correctAnswersCount}</strong> dari{' '}
              <strong className="text-brand-charcoal">{totalQuestions}</strong> pertanyaan.
            </p>
          </div>

          <div className="text-xs leading-relaxed max-w-md mx-auto text-brand-charcoal">
            {scorePercentage >= 80 ? (
                <span className="text-brand-olive font-medium flex items-start justify-center gap-1.5 bg-[#EEF4F2] px-4 py-2 rounded-xl border border-brand-sageborder">
                <Icon name="Check" size={16} />
                <span>Pemahaman untuk materi ini sudah kuat. Lanjut ke file berikutnya.</span>
              </span>
            ) : scorePercentage >= 50 ? (
                <span className="text-brand-stone font-semibold flex items-start justify-center gap-1.5 bg-[#FAF6EC] px-4 py-2 rounded-xl border border-brand-border">
                <Icon name="Info" size={16} />
                <span>Dasarnya sudah ada, tetapi beberapa konsep masih perlu diulang dari deck materi ini.</span>
              </span>
            ) : (
                <span className="text-[#9A5B50] font-semibold flex items-start justify-center gap-1.5 bg-[#FAF0ED] px-4 py-2 rounded-xl border border-[#EAD3CE]">
                <Icon name="XCircle" size={16} />
                <span>Ulangi ringkasan dan flashcard materi ini sebelum lanjut ke materi lain.</span>
              </span>
            )}
          </div>

          <div className="text-left space-y-2 max-w-xl mx-auto">
            <p className="text-[10px] text-brand-stone font-mono font-bold uppercase tracking-wider">
              Hasil Tiap Soal
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {questions.map((question, idx) => {
                const log = resultsLog.find((item) => item.questionId === question.id)
                const isCorrect = log?.isCorrect
                return (
                  <div
                    key={question.id}
                    className="bg-[#FAF9F6] border border-brand-border/60 rounded-xl p-2.5 flex items-center space-x-2"
                  >
                    <span
                      className={`h-5 w-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold leading-none shrink-0 ${
                        isCorrect
                          ? 'bg-brand-palesage text-brand-olive border border-brand-sageborder/20'
                          : 'bg-[#FAF0ED] text-[#9A5B50] border border-[#EAD3CE]/40'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-brand-charcoal truncate">{question.category}</p>
                      <p className="text-[9px] text-brand-stone capitalize">
                        Pilihan: {log?.chosenKey} ({isCorrect ? 'Benar' : 'Salah'})
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="pt-3 flex justify-center">
            <button
              onClick={handleResetQuiz}
              className="bg-brand-sage hover:bg-brand-olive text-brand-cream px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow hover:shadow-md transition active:scale-95"
            >
              <Icon name="RotateCcw" size={14} />
              <span>Ulangi Materi Ini</span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
