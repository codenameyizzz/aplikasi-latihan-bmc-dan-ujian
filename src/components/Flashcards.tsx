import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { studyMaterials, totalMaterialFlashcards } from '../data/materialStudyData'
import { Icon } from './Icon'

interface FlashcardsProps {
  masteredIds: string[]
  onMarkMastered: (id: string, mastered: boolean) => void
}

export function Flashcards({ masteredIds, onMarkMastered }: FlashcardsProps) {
  const [selectedMaterialId, setSelectedMaterialId] = useState(studyMaterials[0].id)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const selectedMaterial =
    studyMaterials.find((material) => material.id === selectedMaterialId) || studyMaterials[0]
  const currentCards = selectedMaterial.flashcards
  const currentCard = currentCards[currentIndex]
  const masteredCount = masteredIds.length
  const isMastered = masteredIds.includes(currentCard.id)

  useEffect(() => {
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [selectedMaterialId])

  const handleNext = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % currentCards.length)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + currentCards.length) % currentCards.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-5xl mx-auto"
      id="flashcards-view"
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-display font-extrabold text-brand-charcoal flex items-center gap-2">
            <Icon name="Brain" className="text-brand-sage" size={26} />
            <span>Flashcards Per Materi</span>
          </h2>
          <p className="text-brand-stone text-xs sm:text-sm max-w-3xl">
            Kartu latihan sekarang disusun langsung dari file di folder `materials`. Pilih materi,
            tebak jawabannya, lalu balik kartu untuk active recall.
          </p>
        </div>

        <div className="bg-[#EEF4F2] border border-brand-sageborder rounded-2xl p-3 flex items-center space-x-3 select-none self-start shrink-0">
          <div className="h-10 w-10 rounded-full bg-[#FAF9F6] border border-brand-sageborder flex items-center justify-center font-display font-black text-brand-olive text-sm">
            {masteredCount}
          </div>
          <div>
            <div className="text-[10px] text-brand-stone font-mono leading-none font-bold uppercase">PROGRES HAFALAN</div>
            <p className="text-xs font-bold text-brand-olive">
              {masteredCount} dari {totalMaterialFlashcards} kartu
            </p>
          </div>
        </div>
      </div>

      <div className="bg-brand-sand rounded-3xl border border-brand-border p-5 space-y-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4">
          <div className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase bg-brand-palesage text-brand-olive px-2.5 py-1 rounded-full border border-brand-sageborder">
                {selectedMaterial.title}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase bg-brand-sand text-brand-stone px-2.5 py-1 rounded-full border border-brand-border">
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

          <div className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-4">
            <p className="text-[10px] font-mono font-bold uppercase text-brand-stone mb-2">Fokus Materi</p>
            <div className="flex flex-wrap gap-2">
              {selectedMaterial.focusAreas.map((area) => (
                <span
                  key={area}
                  className="text-[11px] font-semibold text-brand-charcoal bg-brand-sand px-2.5 py-1.5 rounded-lg border border-brand-border"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6 my-4">
        <div className="w-full max-w-3xl h-[420px] perspective-1000">
          <div
            onClick={() => setIsFlipped((prev) => !prev)}
            className={`w-full h-full position-relative rounded-3xl transition-transform duration-550 transform-style-3d cursor-pointer shadow-xl border border-brand-border/60 ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-brand-palesage via-[#F6F4EA] to-brand-sand rounded-3xl p-8 flex flex-col justify-between backface-hidden">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-black text-brand-stone bg-[#FAF9F6]/90 px-2.5 py-1 rounded-full border border-brand-border/60">
                  {selectedMaterial.shortTitle}
                </span>
                <span className="text-[10px] font-bold text-brand-stone tracking-wider uppercase">
                  Sisi Pertanyaan
                </span>
              </div>

              <div className="space-y-5 text-center">
                <div className="inline-flex bg-[#FAF9F6]/90 p-4 rounded-2xl shadow-sm text-brand-charcoal border border-brand-border/40">
                  <Icon name="HelpCircle" className="text-brand-sage" size={42} />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-stone">
                    Kartu {currentIndex + 1} dari {currentCards.length}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-brand-charcoal tracking-tight leading-snug">
                    {currentCard.front}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center text-center space-y-1">
                <span className="text-xs text-brand-charcoal font-semibold bg-[#FAF9F6]/90 px-3 py-1.5 rounded-full flex items-center space-x-1 border border-brand-border/40">
                  <Icon name="RefreshCw" size={12} className="text-brand-sage" />
                  <span>Klik untuk lihat jawaban</span>
                </span>
                <span className="text-[10px] text-brand-stone">
                  Ucapkan inti konsepnya sebelum membalik kartu
                </span>
              </div>
            </div>

            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#5A6344] to-[#424A30] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between backface-hidden rotate-y-180 overflow-hidden relative border border-brand-sageborder/20">
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-medium text-white/60 bg-white/10 px-2.5 py-1 rounded-full">
                    {selectedMaterial.shortTitle}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-white/50 tracking-wider uppercase">
                  Sisi Jawaban
                </span>
              </div>

              <div className="space-y-4 relative z-10 overflow-y-auto max-h-[250px] pr-1 my-2">
                <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Inti Jawaban</p>
                  <p className="text-white text-sm leading-relaxed">{currentCard.back}</p>
                </div>

                <div className="space-y-2 bg-black/20 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-[#FAF9F6]/70 font-bold uppercase tracking-wider">
                    Poin Pengingat
                  </p>
                  <ul className="space-y-2">
                    {currentCard.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="text-white/50 mt-0.5">•</span>
                        <span className="text-[12px] text-[#FAF9F6]/95 leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-center relative z-10 pt-1 border-t border-white/10 flex justify-center items-center text-[10px] text-white/50">
                <span>Klik lagi untuk kembali ke pertanyaan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-3xl gap-4 select-none">
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-center">
            <button
              onClick={handlePrev}
              className="p-3 bg-brand-sand hover:bg-brand-darksand border border-brand-border text-brand-charcoal rounded-xl transition hover:border-brand-stone cursor-pointer"
              title="Kembali"
            >
              <Icon name="ArrowLeft" size={16} />
            </button>

            <span className="text-xs font-mono text-brand-stone font-semibold px-4 py-2 bg-[#FAF9F6] border border-brand-border rounded-xl">
              {currentIndex + 1} / {currentCards.length}
            </span>

            <button
              onClick={handleNext}
              className="p-3 bg-brand-sand hover:bg-brand-darksand border border-brand-border text-brand-charcoal rounded-xl transition hover:border-brand-stone cursor-pointer"
              title="Selanjutnya"
            >
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-center">
            {isMastered ? (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onMarkMastered(currentCard.id, false)
                }}
                className="w-full sm:w-auto bg-brand-palesage hover:bg-brand-sage/20 text-brand-olive px-4 py-2.5 rounded-xl border border-brand-sageborder text-xs font-bold leading-normal flex items-center justify-center space-x-1 cursor-pointer transition duration-150"
              >
                <Icon name="Check" className="text-brand-olive" size={14} />
                <span>Sudah Hafal</span>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onMarkMastered(currentCard.id, true)
                }}
                className="w-full sm:w-auto bg-brand-sand hover:bg-brand-darksand border border-brand-border text-brand-charcoal px-4 py-2.5 rounded-xl text-xs font-bold leading-normal flex items-center justify-center space-x-1 cursor-pointer transition duration-150"
              >
                <Icon name="Plus" size={14} className="text-brand-stone" />
                <span>Tandai Sudah Hafal</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-brand-sand rounded-2xl p-4 border border-brand-border flex items-start space-x-3 text-brand-charcoal">
        <Icon name="Info" className="text-brand-sage shrink-0 mt-0.5" size={16} />
        <div className="space-y-1">
          <p className="text-xs font-bold text-brand-olive leading-snug">Cara Pakai yang Disarankan</p>
          <p className="text-[11px] text-brand-stone leading-relaxed">
            Selesaikan satu deck materi dulu sampai lancar, lalu pindah ke deck berikutnya. Pendekatan per file
            lebih cocok untuk latihan menjelang ujian karena urutannya mengikuti bahan kuliah asli.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
