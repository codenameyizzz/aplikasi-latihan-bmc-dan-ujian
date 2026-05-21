import React, { useState } from 'react'
import { motion } from 'motion/react'
import { studyMaterials, totalMaterialEssayQuestions, totalMaterialFlashcards, totalMaterialQuestions } from '../data/materialStudyData'
import { StudyStats } from '../types'
import { Icon } from './Icon'

interface DashboardProps {
  stats: StudyStats
  onNavigate: (tab: 'canvas' | 'flashcards' | 'mc' | 'essay') => void
  onResetStats: () => void
}

export function Dashboard({ stats, onNavigate, onResetStats }: DashboardProps) {
  const masteredCount = stats.masteredCards.length
  const masteryPercentage = Math.round((masteredCount / totalMaterialFlashcards) * 100)
  const [selectedMaterialId, setSelectedMaterialId] = useState(studyMaterials[0].id)
  const selectedMaterial =
    studyMaterials.find((material) => material.id === selectedMaterialId) || studyMaterials[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
      id="dashboard-view"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-olive via-brand-sage to-[#6D7555] text-[#FAF9F6] p-6 sm:p-8 shadow-[0_4px_20px_rgba(90,99,68,0.15)] animate-fade-in">
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 opacity-10">
          <Icon name="GraduationCap" size={240} />
        </div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wide text-[#FAF9F6] uppercase">
            Belajar dari file materi asli
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-[#FAF9F6]">
            Persiapan Ujian Technopreneurship
          </h1>
          <p className="text-[#FAF9F6]/90 text-sm sm:text-base leading-relaxed">
            Project ini sekarang memadukan canvas BMC, flashcard, dan kuis pilihan ganda yang diturunkan langsung
            dari {studyMaterials.length} file pada folder `materials`, sehingga alur belajarnya mengikuti bahan
            kuliah yang Anda miliki.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-sand rounded-2xl p-6 border border-brand-border shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div className="bg-brand-palesage text-brand-olive p-3 rounded-xl border border-brand-sageborder/40">
              <Icon name="Brain" size={24} />
            </div>
            <span className="text-[10px] font-mono font-bold text-brand-stone uppercase bg-[#FAF9F6] px-2 py-1 rounded-md border border-brand-border/40">
              Flashcard
            </span>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-display font-black text-brand-charcoal">{masteredCount}</span>
              <span className="text-sm text-brand-stone">/ {totalMaterialFlashcards} Kartu</span>
            </div>
            <div className="w-full bg-[#FAF9F6] h-2 rounded-full mt-3 overflow-hidden border border-brand-border/60">
              <div
                className="bg-brand-sage h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${masteryPercentage}%` }}
              />
            </div>
            <p className="text-xs text-brand-stone mt-2">
              {masteryPercentage === 100
                ? 'Semua deck materi sudah selesai dihafal.'
                : `${masteryPercentage}% dari seluruh kartu materi telah ditandai hafal.`}
            </p>
          </div>
        </div>

        <div className="bg-brand-sand rounded-2xl p-6 border border-brand-border shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div className="bg-brand-palesage text-brand-sage p-3 rounded-xl border border-brand-sageborder/40">
              <Icon name="Award" size={24} />
            </div>
            <span className="text-[10px] font-mono font-bold text-brand-stone uppercase bg-[#FAF9F6] px-2 py-1 rounded-md border border-brand-border/40">
              Skor PG
            </span>
          </div>
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl font-display font-black text-brand-charcoal">{stats.highScoreMC}%</span>
            </div>
            <p className="text-xs text-brand-stone mt-5">
              Total percobaan kuis: <strong className="text-brand-olive">{stats.totalQuizzesTaken}</strong> sesi
              dari {totalMaterialQuestions} butir soal yang tersedia.
            </p>
          </div>
        </div>

        <div className="bg-brand-sand rounded-2xl p-6 border border-brand-border shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div className="bg-brand-palesage text-brand-stone p-3 rounded-xl border border-brand-sageborder/50">
              <Icon name="FileText" size={24} />
            </div>
            <span className="text-[10px] font-mono font-bold text-brand-stone uppercase bg-[#FAF9F6] px-2 py-1 rounded-md border border-brand-border/40">
              Materi Aktif
            </span>
          </div>
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl font-display font-black text-brand-charcoal">{studyMaterials.length}</span>
              <span className="text-sm text-brand-stone">File</span>
            </div>
            <p className="text-xs text-brand-stone mt-5">
              Evaluasi esai selesai: <strong className="text-brand-olive">{stats.essaysCompletedCount}</strong> dari{' '}
              {totalMaterialEssayQuestions} prompt essay.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-display font-bold text-brand-charcoal">Pilih Mode Latihan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('canvas')}
            className="group text-left p-6 bg-[#FAF9F6] hover:bg-brand-sand border border-brand-border rounded-2xl transition duration-200 shadow-xs hover:shadow-md flex items-start space-x-4 cursor-pointer"
          >
            <div className="bg-brand-palesage text-brand-sage p-3 rounded-xl group-hover:scale-105 transition-transform border border-brand-sageborder/40">
              <Icon name="Layout" size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-brand-charcoal group-hover:text-brand-olive transition-colors">
                1. Canvas BMC Interaktif
              </h3>
              <p className="text-xs text-brand-stone leading-relaxed">
                Pakai mode ini untuk mengulang konsep inti 9 blok Business Model Canvas sebelum masuk ke latihan
                berbasis file materi.
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('flashcards')}
            className="group text-left p-6 bg-[#FAF9F6] hover:bg-brand-sand border border-brand-border rounded-2xl transition duration-200 shadow-xs hover:shadow-md flex items-start space-x-4 cursor-pointer"
          >
            <div className="bg-brand-palesage text-brand-olive p-3 rounded-xl group-hover:scale-105 transition-transform border border-brand-sageborder/40">
              <Icon name="Brain" size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-brand-charcoal group-hover:text-brand-olive transition-colors">
                2. Flashcards Per File
              </h3>
              <p className="text-xs text-brand-stone leading-relaxed">
                Pilih salah satu dari {studyMaterials.length} file materi, lalu hafalkan inti konsep per topik dengan
                mode active recall.
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('mc')}
            className="group text-left p-6 bg-[#FAF9F6] hover:bg-brand-sand border border-brand-border rounded-2xl transition duration-200 shadow-xs hover:shadow-md flex items-start space-x-4 cursor-pointer"
          >
            <div className="bg-brand-palesage text-brand-stone p-3 rounded-xl group-hover:scale-105 transition-transform border border-brand-sageborder/30">
              <Icon name="CheckSquare" size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-brand-charcoal group-hover:text-brand-olive transition-colors">
                3. Pilihan Ganda Per File
              </h3>
              <p className="text-xs text-brand-stone leading-relaxed">
                Kerjakan set soal khusus untuk tiap file materi. Total tersedia {totalMaterialQuestions} butir soal
                yang tersebar ke beberapa topik utama.
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('essay')}
            className="group text-left p-6 bg-[#FAF9F6] hover:bg-brand-sand border border-brand-border rounded-2xl transition duration-200 shadow-xs hover:shadow-md flex items-start space-x-4 cursor-pointer"
          >
            <div className="bg-brand-palesage text-brand-olive p-3 rounded-xl group-hover:scale-105 transition-transform border border-brand-sageborder/40">
              <Icon name="FileText" size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-brand-charcoal group-hover:text-brand-olive transition-colors">
                4. Analisis Kasus Esai
              </h3>
              <p className="text-xs text-brand-stone leading-relaxed">
                Gunakan studi kasus untuk menguji sintesis antarblok BMC setelah hafalan dan kuis materi selesai.
              </p>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-brand-sand rounded-2xl p-6 border border-brand-border space-y-4">
        <div className="flex items-center space-x-2 text-brand-charcoal">
          <Icon name="BookOpen" className="text-brand-sage" size={20} />
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-olive">
            Ringkasan File Materi
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {studyMaterials.map((material) => (
            <div key={material.id} className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-4 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <h5 className="text-sm font-bold text-brand-charcoal">{material.title}</h5>
                <span className="text-[10px] font-mono bg-brand-palesage text-brand-olive px-2 py-1 rounded-full border border-brand-sageborder">
                  {material.flashcards.length} kartu / {material.quizQuestions.length} soal
                </span>
              </div>
              <p className="text-xs text-brand-stone leading-relaxed">{material.summary}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-brand-sand rounded-2xl p-6 border border-brand-border space-y-4">
        <div className="flex items-center space-x-2 text-brand-charcoal">
          <Icon name="FolderOpen" className="text-brand-sage" size={20} />
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-olive">
            Akses File Materials
          </h4>
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

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.4fr] gap-4">
          <div className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-4 space-y-3">
            <div className="space-y-1">
              <h5 className="text-sm font-bold text-brand-charcoal">{selectedMaterial.title}</h5>
              <p className="text-xs text-brand-stone leading-relaxed">{selectedMaterial.sourceFile}</p>
              <p className="text-xs text-brand-charcoal leading-relaxed">{selectedMaterial.summary}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={selectedMaterial.sourceHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-brand-sage hover:bg-brand-olive text-brand-cream px-3.5 py-2 rounded-xl text-xs font-bold transition"
              >
                <Icon name="ExternalLink" size={14} />
                <span>Buka File</span>
              </a>
              <a
                href={selectedMaterial.sourceHref}
                download
                className="inline-flex items-center gap-2 bg-brand-sand hover:bg-brand-darksand border border-brand-border text-brand-charcoal px-3.5 py-2 rounded-xl text-xs font-bold transition"
              >
                <Icon name="Download" size={14} />
                <span>Unduh File</span>
              </a>
            </div>

            <div className="text-[11px] text-brand-stone leading-relaxed">
              {selectedMaterial.sourceType === 'pdf'
                ? 'PDF dapat dipreview langsung di panel kanan dan juga dibuka di tab baru.'
                : 'PPTX belum memiliki preview native yang konsisten di browser, jadi disediakan tombol buka dan unduh file.'}
            </div>
          </div>

          <div className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-3 min-h-[420px]">
            {selectedMaterial.sourceType === 'pdf' ? (
              <iframe
                title={selectedMaterial.title}
                src={selectedMaterial.sourceHref}
                className="w-full h-[420px] rounded-xl border border-brand-border bg-white"
              />
            ) : (
              <div className="h-[420px] rounded-xl border border-dashed border-brand-border flex flex-col items-center justify-center text-center p-6 bg-brand-sand">
                <Icon name="Presentation" size={40} className="text-brand-sage" />
                <p className="mt-4 text-sm font-bold text-brand-charcoal">Preview PPTX belum tersedia langsung di browser.</p>
                <p className="mt-2 text-xs text-brand-stone max-w-md leading-relaxed">
                  Anda tetap bisa membuka atau mengunduh file presentasi ini dari tombol di kiri. Untuk PDF, preview inline sudah tersedia langsung di web app.
                </p>
              </div>
            )}
          </div>
        </div>

        {(stats.masteredCards.length > 0 || stats.totalQuizzesTaken > 0 || stats.essaysCompletedCount > 0) && (
          <div className="pt-4 border-t border-brand-border flex justify-end">
            <button
              onClick={onResetStats}
              className="text-xs text-rose-700 hover:text-rose-800 flex items-center space-x-1 font-bold bg-[#FAF2F2] hover:bg-[#FEDDDD] border border-red-200/50 px-3 py-1.5 rounded-lg transition"
            >
              <Icon name="RotateCcw" size={14} />
              <span>Reset Statistik Belajar</span>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
