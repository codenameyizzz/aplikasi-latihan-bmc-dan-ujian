import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Dashboard } from './components/Dashboard'
import { BmcCanvas } from './components/BmcCanvas'
import { Flashcards } from './components/Flashcards'
import { QuizMultipleChoice } from './components/QuizMultipleChoice'
import { QuizEssay } from './components/QuizEssay'
import { Icon } from './components/Icon'
import { totalMaterialFlashcards } from './data/materialStudyData'
import { StudyStats } from './types'

const LOCAL_STORAGE_KEY = 'bmc_study_stats_progress_v1'

const defaultStats: StudyStats = {
  masteredCards: [],
  reviewNeededCards: [],
  highScoreMC: 0,
  totalQuizzesTaken: 0,
  essaysCompletedCount: 0
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'canvas' | 'flashcards' | 'mc' | 'essay'>('dashboard')
  const [stats, setStats] = useState<StudyStats>(defaultStats)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (stored) {
        setStats(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Failed loading study statistics progress:', error)
    }
  }, [])

  const triggerToast = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
  }

  useEffect(() => {
    if (!showToast) return

    const timer = setTimeout(() => setShowToast(false), 3500)
    return () => clearTimeout(timer)
  }, [showToast])

  const saveStats = (updated: StudyStats) => {
    setStats(updated)
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error('Failed saving stats:', error)
    }
  }

  const handleMarkMastered = (id: string, mastered: boolean) => {
    const list = [...stats.masteredCards]
    let updatedMastered: string[] = []

    if (mastered) {
      updatedMastered = list.includes(id) ? list : [...list, id]
      if (!list.includes(id)) {
        triggerToast('Kartu ditandai sebagai sudah hafal.')
      }
    } else {
      updatedMastered = list.filter((item) => item !== id)
      triggerToast('Kartu dikembalikan ke daftar belajar.')
    }

    saveStats({
      ...stats,
      masteredCards: updatedMastered
    })
  }

  const handleQuizMCCompleted = (scorePercentage: number) => {
    const previousHighScore = stats.highScoreMC
    const isNewHigh = scorePercentage > previousHighScore

    saveStats({
      ...stats,
      totalQuizzesTaken: stats.totalQuizzesTaken + 1,
      highScoreMC: isNewHigh ? scorePercentage : previousHighScore
    })

    if (isNewHigh) {
      triggerToast(`Skor terbaik baru tercapai: ${scorePercentage}%.`)
      return
    }

    triggerToast(`Hasil kuis tersimpan: ${scorePercentage}%.`)
  }

  const handleEssayCompleted = () => {
    saveStats({
      ...stats,
      essaysCompletedCount: stats.essaysCompletedCount + 1
    })
    triggerToast('Jawaban esai berhasil dievaluasi.')
  }

  const handleResetStats = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus seluruh progres flashcard, kuis, dan evaluasi esai?')) {
      saveStats(defaultStats)
      triggerToast('Semua statistik hasil belajar telah dibersihkan.')
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} onNavigate={(tab) => setActiveTab(tab)} onResetStats={handleResetStats} />
      case 'canvas':
        return <BmcCanvas />
      case 'flashcards':
        return <Flashcards masteredIds={stats.masteredCards} onMarkMastered={handleMarkMastered} />
      case 'mc':
        return <QuizMultipleChoice onQuizCompleted={handleQuizMCCompleted} />
      case 'essay':
        return <QuizEssay onEssayCompleted={handleEssayCompleted} />
      default:
        return <Dashboard stats={stats} onNavigate={(tab) => setActiveTab(tab)} onResetStats={handleResetStats} />
    }
  }

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal font-sans antialiased pb-16 relative">
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-brand-border shadow-[0_2px_4px_rgba(142,151,117,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center space-x-2.5 cursor-pointer select-none group"
            >
              <div className="bg-brand-sage text-brand-cream p-2 sm:p-2.5 rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-200">
                <Icon name="GraduationCap" size={22} className="text-[#FAF9F6]" />
              </div>
              <div className="leading-none">
                <span className="text-[10px] font-mono font-bold text-brand-olive uppercase tracking-widest leading-none">
                  STUDY PLATFORM
                </span>
                <h1 className="text-sm sm:text-base font-display font-black text-brand-charcoal leading-normal tracking-tight">
                  TechnoPrep
                </h1>
              </div>
            </div>

            <div className="hidden sm:flex items-center space-x-4 text-xs font-semibold">
              <span className="text-brand-stone/40">|</span>
              <div className="flex items-center space-x-1 text-brand-olive bg-brand-palesage px-2.5 py-1 rounded-lg border border-brand-sageborder">
                <Icon name="Brain" size={14} className="text-brand-olive" />
                <span>
                  Hafal: {stats.masteredCards.length}/{totalMaterialFlashcards} Kartu
                </span>
              </div>
              <div className="flex items-center space-x-1 text-brand-charcoal bg-brand-sand px-2.5 py-1 rounded-lg border border-brand-border">
                <Icon name="Award" size={14} className="text-brand-sage" />
                <span>Skor PG: {stats.highScoreMC}%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-brand-sand border-b border-brand-border sticky top-16 sm:top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <nav className="flex space-x-1 sm:space-x-3 py-3 shrink-0">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold leading-none cursor-pointer whitespace-nowrap transition-all duration-150 ${
                activeTab === 'dashboard'
                  ? 'bg-brand-sage text-brand-cream font-black shadow-sm'
                  : 'text-brand-charcoal/80 hover:text-brand-charcoal bg-transparent hover:bg-brand-darksand'
              }`}
            >
              <Icon name="Home" size={14} />
              <span>Beranda</span>
            </button>

            <button
              onClick={() => setActiveTab('canvas')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold leading-none cursor-pointer whitespace-nowrap transition-all duration-150 ${
                activeTab === 'canvas'
                  ? 'bg-brand-sage text-brand-cream font-black shadow-sm'
                  : 'text-brand-charcoal/80 hover:text-brand-charcoal bg-transparent hover:bg-brand-darksand'
              }`}
            >
              <Icon name="Layout" size={14} />
              <span>Canvas Interaktif</span>
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold leading-none cursor-pointer whitespace-nowrap transition-all duration-150 ${
                activeTab === 'flashcards'
                  ? 'bg-brand-sage text-brand-cream font-black shadow-sm'
                  : 'text-brand-charcoal/80 hover:text-brand-charcoal bg-transparent hover:bg-brand-darksand'
              }`}
            >
              <Icon name="Brain" size={14} />
              <span>Flashcards</span>
            </button>

            <button
              onClick={() => setActiveTab('mc')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold leading-none cursor-pointer whitespace-nowrap transition-all duration-150 ${
                activeTab === 'mc'
                  ? 'bg-brand-sage text-brand-cream font-black shadow-sm'
                  : 'text-brand-charcoal/80 hover:text-brand-charcoal bg-transparent hover:bg-brand-darksand'
              }`}
            >
              <Icon name="CheckSquare" size={14} />
              <span>Pilihan Ganda</span>
            </button>

            <button
              onClick={() => setActiveTab('essay')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold leading-none cursor-pointer whitespace-nowrap transition-all duration-150 ${
                activeTab === 'essay'
                  ? 'bg-brand-sage text-brand-cream font-black shadow-sm'
                  : 'text-brand-charcoal/80 hover:text-brand-charcoal bg-transparent hover:bg-brand-darksand'
              }`}
            >
              <Icon name="FileText" size={14} />
              <span>Ujian Esai</span>
            </button>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="min-h-[400px]"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="border-t border-brand-border/80 py-6 text-center text-xs text-brand-stone">
          Copyright Yizreel Schwartz 2026
        </div>
      </footer>

      <AnimatePresence>
        {showToast && (
          <motion.div
            id="toast-notification"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-brand-olive text-brand-cream px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-3 border border-brand-sageborder"
          >
            <div className="bg-brand-palesage p-1 rounded-lg text-brand-olive">
              <Icon name="Check" size={16} />
            </div>
            <p className="text-xs font-bold font-display tracking-tight text-[#FAF9F6] pr-1">
              {toastMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
