import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { studyMaterials } from '../data/materialStudyData'
import { CustomFlashcard } from '../types'
import { Icon } from './Icon'

interface FlashcardsProps {
  masteredIds: string[]
  customFlashcards: CustomFlashcard[]
  totalFlashcards: number
  onMarkMastered: (id: string, mastered: boolean, label: string) => void
  onAddCustomFlashcard: (input: {
    materialId: string
    front: string
    back: string
    bullets: string[]
  }) => void
  onDeleteCustomFlashcard: (id: string) => void
}

interface RenderableFlashcard {
  id: string
  front: string
  back: string
  bullets: string[]
  isCustom: boolean
}

export function Flashcards({
  masteredIds,
  customFlashcards,
  totalFlashcards,
  onMarkMastered,
  onAddCustomFlashcard,
  onDeleteCustomFlashcard
}: FlashcardsProps) {
  const [selectedMaterialId, setSelectedMaterialId] = useState(studyMaterials[0].id)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [newFront, setNewFront] = useState('')
  const [newBack, setNewBack] = useState('')
  const [newBullets, setNewBullets] = useState('')

  const selectedMaterial =
    studyMaterials.find((material) => material.id === selectedMaterialId) || studyMaterials[0]

  const currentCards = useMemo<RenderableFlashcard[]>(() => {
    const builtInCards = selectedMaterial.flashcards.map((card) => ({
      ...card,
      isCustom: false
    }))
    const userCards = customFlashcards
      .filter((card) => card.materialId === selectedMaterialId)
      .map((card) => ({
        id: card.id,
        front: card.front,
        back: card.back,
        bullets: card.bullets,
        isCustom: true
      }))

    return [...builtInCards, ...userCards]
  }, [customFlashcards, selectedMaterial, selectedMaterialId])

  useEffect(() => {
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [selectedMaterialId])

  useEffect(() => {
    if (currentIndex >= currentCards.length) {
      setCurrentIndex(0)
      setIsFlipped(false)
    }
  }, [currentCards.length, currentIndex])

  const currentCard = currentCards[currentIndex]
  const masteredCount = masteredIds.length
  const isMastered = currentCard ? masteredIds.includes(currentCard.id) : false
  const selectedCustomCount = customFlashcards.filter((card) => card.materialId === selectedMaterialId).length

  const handleNext = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % currentCards.length)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + currentCards.length) % currentCards.length)
  }

  const handleAddCard = () => {
    const front = newFront.trim()
    const back = newBack.trim()
    const bullets = newBullets
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)

    if (!front || !back) return

    onAddCustomFlashcard({
      materialId: selectedMaterialId,
      front,
      back,
      bullets
    })

    setNewFront('')
    setNewBack('')
    setNewBullets('')
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
            Pilih materi, pelajari kartu bawaan, lalu tambahkan kartu versi Anda sendiri untuk istilah yang perlu diulang.
          </p>
        </div>

        <div className="bg-[#EEF4F2] border border-brand-sageborder rounded-2xl p-3 flex items-center space-x-3 select-none self-start shrink-0">
          <div className="h-10 w-10 rounded-full bg-[#FAF9F6] border border-brand-sageborder flex items-center justify-center font-display font-black text-brand-olive text-sm">
            {masteredCount}
          </div>
          <div>
            <div className="text-[10px] text-brand-stone font-mono leading-none font-bold uppercase">PROGRES HAFALAN</div>
            <p className="text-xs font-bold text-brand-olive">
              {masteredCount} dari {totalFlashcards} kartu
            </p>
          </div>
        </div>
      </div>

      <div className="bg-brand-sand rounded-3xl border border-brand-border p-4 sm:p-5 space-y-4">
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
          <div className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-4 space-y-3 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase bg-brand-palesage text-brand-olive px-2.5 py-1 rounded-full border border-brand-sageborder">
                {selectedMaterial.title}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase bg-brand-sand text-brand-stone px-2.5 py-1 rounded-full border border-brand-border break-all">
                {selectedMaterial.sourceFile}
              </span>
            </div>
            <p className="text-sm text-brand-charcoal leading-relaxed">{selectedMaterial.summary}</p>
            <div className="flex flex-wrap gap-2">
              <a
                href={selectedMaterial.sourceHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-brand-sage hover:bg-brand-olive text-brand-cream px-3.5 py-2 rounded-xl text-xs font-bold transition"
              >
                <Icon name="ExternalLink" size={14} />
                <span>Buka Materi Asli</span>
              </a>
              <span className="inline-flex items-center gap-2 bg-brand-sand border border-brand-border text-brand-charcoal px-3.5 py-2 rounded-xl text-xs font-bold">
                <Icon name="PlusCircle" size={14} />
                <span>{selectedCustomCount} kartu tambahan</span>
              </span>
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

      <div className="bg-brand-sand rounded-3xl border border-brand-border p-4 sm:p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Icon name="NotebookPen" className="text-brand-sage" size={18} />
          <h3 className="text-sm font-display font-bold text-brand-charcoal">Tambah Flashcard Anda Sendiri</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-charcoal">Sisi Pertanyaan</label>
              <textarea
                value={newFront}
                onChange={(e) => setNewFront(e.target.value)}
                placeholder="Contoh: Apa perbedaan fixed pricing dan dynamic pricing?"
                className="w-full min-h-24 p-3 bg-[#FAF9F6] border border-brand-border focus:border-brand-sage focus:ring-1 focus:ring-brand-sage rounded-2xl text-xs leading-relaxed outline-none transition resize-y"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-charcoal">Sisi Jawaban</label>
              <textarea
                value={newBack}
                onChange={(e) => setNewBack(e.target.value)}
                placeholder="Tuliskan jawaban ringkas yang ingin Anda hafalkan."
                className="w-full min-h-24 p-3 bg-[#FAF9F6] border border-brand-border focus:border-brand-sage focus:ring-1 focus:ring-brand-sage rounded-2xl text-xs leading-relaxed outline-none transition resize-y"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-charcoal">Poin Pengingat</label>
              <textarea
                value={newBullets}
                onChange={(e) => setNewBullets(e.target.value)}
                placeholder={'Satu poin per baris\nContoh:\n- fixed pricing konsisten\n- dynamic pricing berubah sesuai kondisi'}
                className="w-full min-h-[11.5rem] p-3 bg-[#FAF9F6] border border-brand-border focus:border-brand-sage focus:ring-1 focus:ring-brand-sage rounded-2xl text-xs leading-relaxed outline-none transition resize-y"
              />
            </div>
            <button
              onClick={handleAddCard}
              disabled={!newFront.trim() || !newBack.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-sage hover:bg-brand-olive disabled:bg-brand-darksand disabled:text-brand-stone/50 text-brand-cream px-4 py-2.5 rounded-xl text-xs font-bold transition"
            >
              <Icon name="Plus" size={14} />
              <span>Simpan Flashcard Kustom</span>
            </button>
          </div>
        </div>
      </div>

      {currentCards.length > 0 && currentCard && (
        <div className="flex flex-col items-center justify-center space-y-6 my-4">
          <div className="w-full max-w-3xl h-[28rem] sm:h-[26rem] perspective-1000">
            <div
              onClick={() => setIsFlipped((prev) => !prev)}
              className={`w-full h-full position-relative rounded-3xl transition-transform duration-550 transform-style-3d cursor-pointer shadow-xl border border-brand-border/60 ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-brand-palesage via-[#F6F4EA] to-brand-sand rounded-3xl p-5 sm:p-8 flex flex-col justify-between backface-hidden">
                <div className="flex justify-between items-center gap-3">
                  <span className="text-xs font-mono font-black text-brand-stone bg-[#FAF9F6]/90 px-2.5 py-1 rounded-full border border-brand-border/60">
                    {selectedMaterial.shortTitle}
                  </span>
                  <div className="flex items-center gap-2">
                    {currentCard.isCustom && (
                      <span className="text-[10px] font-bold text-brand-olive bg-brand-palesage px-2 py-1 rounded-full border border-brand-sageborder">
                        Kustom
                      </span>
                    )}
                    <span className="text-[10px] font-bold text-brand-stone tracking-wider uppercase">Sisi Pertanyaan</span>
                  </div>
                </div>

                <div className="space-y-5 text-center overflow-y-auto px-1">
                  <div className="inline-flex bg-[#FAF9F6]/90 p-4 rounded-2xl shadow-sm text-brand-charcoal border border-brand-border/40">
                    <Icon name="HelpCircle" className="text-brand-sage" size={42} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-stone">
                      Kartu {currentIndex + 1} dari {currentCards.length}
                    </p>
                    <h3 className="text-xl sm:text-3xl font-display font-black text-brand-charcoal tracking-tight leading-snug">
                      {currentCard.front}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center text-center space-y-1">
                  <span className="text-xs text-brand-charcoal font-semibold bg-[#FAF9F6]/90 px-3 py-1.5 rounded-full flex items-center space-x-1 border border-brand-border/40">
                    <Icon name="RefreshCw" size={12} className="text-brand-sage" />
                    <span>Tap untuk lihat jawaban</span>
                  </span>
                  <span className="text-[10px] text-brand-stone">
                    Coba jawab dulu sebelum kartu dibalik
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#5A6344] to-[#424A30] text-white rounded-3xl p-5 sm:p-8 flex flex-col justify-between backface-hidden rotate-y-180 overflow-hidden relative border border-brand-sageborder/20">
                <div className="flex justify-between items-center relative z-10 gap-3">
                  <span className="text-xs font-mono font-medium text-white/60 bg-white/10 px-2.5 py-1 rounded-full">
                    {selectedMaterial.shortTitle}
                  </span>
                  <span className="text-[10px] font-bold text-white/50 tracking-wider uppercase">Sisi Jawaban</span>
                </div>

                <div className="space-y-4 relative z-10 overflow-y-auto max-h-[18rem] pr-1 my-2">
                  <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Inti Jawaban</p>
                    <p className="text-white text-sm leading-relaxed">{currentCard.back}</p>
                  </div>

                  {currentCard.bullets.length > 0 && (
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
                  )}
                </div>

                <div className="text-center relative z-10 pt-1 border-t border-white/10 flex justify-center items-center text-[10px] text-white/50">
                  <span>Tap lagi untuk kembali ke pertanyaan</span>
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

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto justify-center">
              {isMastered ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onMarkMastered(currentCard.id, false, currentCard.front)
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
                    onMarkMastered(currentCard.id, true, currentCard.front)
                  }}
                  className="w-full sm:w-auto bg-brand-sand hover:bg-brand-darksand border border-brand-border text-brand-charcoal px-4 py-2.5 rounded-xl text-xs font-bold leading-normal flex items-center justify-center space-x-1 cursor-pointer transition duration-150"
                >
                  <Icon name="Plus" size={14} className="text-brand-stone" />
                  <span>Tandai Sudah Hafal</span>
                </button>
              )}

              {currentCard.isCustom && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteCustomFlashcard(currentCard.id)
                  }}
                  className="w-full sm:w-auto bg-[#FAF0ED] hover:bg-[#F6E2DD] border border-[#EAD3CE] text-[#9A5B50] px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition"
                >
                  <Icon name="Trash2" size={14} />
                  <span>Hapus Kartu</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-brand-sand rounded-2xl p-4 border border-brand-border flex items-start space-x-3 text-brand-charcoal">
        <Icon name="Info" className="text-brand-sage shrink-0 mt-0.5" size={16} />
        <div className="space-y-1">
          <p className="text-xs font-bold text-brand-olive leading-snug">Cara Pakai yang Disarankan</p>
          <p className="text-[11px] text-brand-stone leading-relaxed">
            Selesaikan deck materi bawaan dulu, lalu tambahkan kartu kustom untuk bagian yang paling sering Anda lupa.
            Semua kartu tambahan disimpan lokal di browser user.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
