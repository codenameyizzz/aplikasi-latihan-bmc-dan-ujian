import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Dashboard } from './components/Dashboard'
import { BmcCanvas } from './components/BmcCanvas'
import { Flashcards } from './components/Flashcards'
import { QuizMultipleChoice } from './components/QuizMultipleChoice'
import { QuizTrueFalse } from './components/QuizTrueFalse'
import { QuizEssay } from './components/QuizEssay'
import { Icon } from './components/Icon'
import { totalMaterialFlashcards } from './data/materialStudyData'
import { CustomFlashcard, StudyHistoryEntry, StudyStats } from './types'

const LOCAL_STORAGE_STATS_KEY = 'bmc_study_stats_progress_v1'
const LOCAL_STORAGE_HISTORY_KEY = 'bmc_study_history_v1'
const LOCAL_STORAGE_CUSTOM_FLASHCARDS_KEY = 'bmc_custom_flashcards_v1'
const LOCAL_STORAGE_BMC_CASE_PRACTICE_KEY = 'bmc_case_practice_progress_v1'

const defaultStats: StudyStats = {
  masteredCards: [],
  reviewNeededCards: [],
  highScoreMC: 0,
  highScoreTF: 0,
  totalQuizzesTaken: 0,
  totalTrueFalseTaken: 0,
  essaysCompletedCount: 0,
  bmcCasesCompletedCount: 0
}

type ActiveTab = 'dashboard' | 'canvas' | 'flashcards' | 'mc' | 'tf' | 'essay'

function createLocalId(prefix: string) {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}_${crypto.randomUUID()}`
  }

  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard')
  const [stats, setStats] = useState<StudyStats>(defaultStats)
  const [customFlashcards, setCustomFlashcards] = useState<CustomFlashcard[]>([])
  const [studyHistory, setStudyHistory] = useState<StudyHistoryEntry[]>([])
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    try {
      const storedStats = localStorage.getItem(LOCAL_STORAGE_STATS_KEY)
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY)
      const storedCustomFlashcards = localStorage.getItem(LOCAL_STORAGE_CUSTOM_FLASHCARDS_KEY)

      if (storedStats) {
        setStats({
          ...defaultStats,
          ...JSON.parse(storedStats)
        })
      }

      if (storedHistory) {
        setStudyHistory(JSON.parse(storedHistory))
      }

      if (storedCustomFlashcards) {
        setCustomFlashcards(JSON.parse(storedCustomFlashcards))
      }
    } catch (error) {
      console.error('Failed loading local study data:', error)
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
      localStorage.setItem(LOCAL_STORAGE_STATS_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error('Failed saving stats:', error)
    }
  }

  const saveStudyHistory = (updated: StudyHistoryEntry[]) => {
    setStudyHistory(updated)
    try {
      localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error('Failed saving study history:', error)
    }
  }

  const saveCustomFlashcards = (updated: CustomFlashcard[]) => {
    setCustomFlashcards(updated)
    try {
      localStorage.setItem(LOCAL_STORAGE_CUSTOM_FLASHCARDS_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error('Failed saving custom flashcards:', error)
    }
  }

  const appendHistory = (entry: Omit<StudyHistoryEntry, 'id' | 'createdAt'>) => {
    const nextEntry: StudyHistoryEntry = {
      id: createLocalId('history'),
      createdAt: new Date().toISOString(),
      ...entry
    }
    const updated = [nextEntry, ...studyHistory].slice(0, 30)
    saveStudyHistory(updated)
  }

  const handleMarkMastered = (id: string, mastered: boolean, label: string) => {
    const list = [...stats.masteredCards]
    let updatedMastered: string[] = []

    if (mastered) {
      updatedMastered = list.includes(id) ? list : [...list, id]
      if (!list.includes(id)) {
        triggerToast('Kartu ditandai sebagai sudah hafal.')
        appendHistory({
          type: 'flashcard_mastered',
          title: 'Flashcard dikuasai',
          detail: label
        })
      }
    } else {
      updatedMastered = list.filter((item) => item !== id)
      triggerToast('Kartu dikembalikan ke daftar belajar.')
      appendHistory({
        type: 'flashcard_unmastered',
        title: 'Flashcard dikembalikan',
        detail: label
      })
    }

    saveStats({
      ...stats,
      masteredCards: updatedMastered
    })
  }

  const handleAddCustomFlashcard = (input: {
    materialId: string
    front: string
    back: string
    bullets: string[]
  }) => {
    const newCard: CustomFlashcard = {
      id: createLocalId('custom_flashcard'),
      createdAt: new Date().toISOString(),
      ...input
    }

    saveCustomFlashcards([...customFlashcards, newCard])
    triggerToast('Flashcard kustom berhasil disimpan.')
    appendHistory({
      type: 'flashcard_created',
      title: 'Flashcard baru ditambahkan',
      detail: newCard.front
    })
  }

  const handleDeleteCustomFlashcard = (id: string) => {
    const card = customFlashcards.find((item) => item.id === id)
    if (!card) return

    saveCustomFlashcards(customFlashcards.filter((item) => item.id !== id))

    if (stats.masteredCards.includes(id)) {
      saveStats({
        ...stats,
        masteredCards: stats.masteredCards.filter((item) => item !== id)
      })
    }

    triggerToast('Flashcard kustom dihapus.')
    appendHistory({
      type: 'flashcard_unmastered',
      title: 'Flashcard kustom dihapus',
      detail: card.front
    })
  }

  const handleQuizMCCompleted = (scorePercentage: number, materialTitle: string) => {
    const previousHighScore = stats.highScoreMC
    const isNewHigh = scorePercentage > previousHighScore

    saveStats({
      ...stats,
      totalQuizzesTaken: stats.totalQuizzesTaken + 1,
      highScoreMC: isNewHigh ? scorePercentage : previousHighScore
    })

    appendHistory({
      type: 'quiz_completed',
      title: 'Kuis pilihan ganda selesai',
      detail: `${materialTitle} - skor ${scorePercentage}%`
    })

    if (isNewHigh) {
      triggerToast(`Skor terbaik baru tercapai: ${scorePercentage}%.`)
      return
    }

    triggerToast(`Hasil kuis tersimpan: ${scorePercentage}%.`)
  }

  const handleEssayCompleted = (essayTitle: string, materialTitle: string) => {
    saveStats({
      ...stats,
      essaysCompletedCount: stats.essaysCompletedCount + 1
    })
    appendHistory({
      type: 'essay_completed',
      title: 'Evaluasi essay selesai',
      detail: `${materialTitle} - ${essayTitle}`
    })
    triggerToast('Jawaban esai berhasil dievaluasi.')
  }

  const handleQuizTFCompleted = (scorePercentage: number, materialTitle: string) => {
    const previousHighScore = stats.highScoreTF
    const isNewHigh = scorePercentage > previousHighScore

    saveStats({
      ...stats,
      totalTrueFalseTaken: stats.totalTrueFalseTaken + 1,
      highScoreTF: isNewHigh ? scorePercentage : previousHighScore
    })

    appendHistory({
      type: 'truefalse_completed',
      title: 'Kuis True / False selesai',
      detail: `${materialTitle} - skor ${scorePercentage}%`
    })

    if (isNewHigh) {
      triggerToast(`Skor terbaik True / False baru tercapai: ${scorePercentage}%.`)
      return
    }

    triggerToast(`Hasil True / False tersimpan: ${scorePercentage}%.`)
  }

  const handleBmcCaseCompleted = (caseTitle: string, score: number) => {
    saveStats({
      ...stats,
      bmcCasesCompletedCount: stats.bmcCasesCompletedCount + 1
    })
    appendHistory({
      type: 'bmc_case_completed',
      title: 'Latihan BMC dinilai',
      detail: `${caseTitle} - skor ${score}`
    })
    triggerToast(`Latihan BMC selesai dinilai: ${score}.`)
  }

  const handleResetStats = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus seluruh progres flashcard, kuis, true / false, evaluasi esai, latihan BMC, dan riwayat belajar?')) {
      saveStats(defaultStats)
      try {
        localStorage.removeItem(LOCAL_STORAGE_BMC_CASE_PRACTICE_KEY)
      } catch (error) {
        console.error('Failed clearing BMC case practice data:', error)
      }
      saveStudyHistory([
        {
          id: createLocalId('history'),
          createdAt: new Date().toISOString(),
          type: 'stats_reset',
          title: 'Statistik direset',
          detail: 'Progress belajar dibersihkan oleh user.'
        }
      ])
      triggerToast('Statistik dan riwayat belajar telah dibersihkan.')
    }
  }

  const totalFlashcards = totalMaterialFlashcards + customFlashcards.length

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            stats={stats}
            totalFlashcards={totalFlashcards}
            customFlashcardCount={customFlashcardCount}
            studyHistory={studyHistory}
            onNavigate={(tab) => setActiveTab(tab)}
            onResetStats={handleResetStats}
          />
        )
      case 'canvas':
        return <BmcCanvas onBmcCaseCompleted={handleBmcCaseCompleted} />
      case 'flashcards':
        return (
          <Flashcards
            masteredIds={stats.masteredCards}
            customFlashcards={customFlashcards}
            totalFlashcards={totalFlashcards}
            onMarkMastered={handleMarkMastered}
            onAddCustomFlashcard={handleAddCustomFlashcard}
            onDeleteCustomFlashcard={handleDeleteCustomFlashcard}
          />
        )
      case 'mc':
        return <QuizMultipleChoice onQuizCompleted={handleQuizMCCompleted} />
      case 'tf':
        return <QuizTrueFalse onQuizCompleted={handleQuizTFCompleted} />
      case 'essay':
        return <QuizEssay onEssayCompleted={handleEssayCompleted} />
      default:
        return (
          <Dashboard
            stats={stats}
            totalFlashcards={totalFlashcards}
            customFlashcardCount={customFlashcardCount}
            studyHistory={studyHistory}
            onNavigate={(tab) => setActiveTab(tab)}
            onResetStats={handleResetStats}
          />
        )
    }
  }

  const customFlashcardCount = customFlashcards.length

  const navItems: { id: ActiveTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Beranda', icon: 'Home' },
    { id: 'canvas', label: 'Canvas', icon: 'Layout' },
    { id: 'flashcards', label: 'Cards', icon: 'Brain' },
    { id: 'mc', label: 'PG', icon: 'CheckSquare' },
    { id: 'tf', label: 'TF', icon: 'ToggleLeft' },
    { id: 'essay', label: 'Essay', icon: 'FileText' }
  ]

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal font-sans antialiased pb-28 sm:pb-16 relative">
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-brand-border shadow-[0_2px_4px_rgba(142,151,117,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 gap-3">
            <div
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center space-x-2.5 cursor-pointer select-none group min-w-0"
            >
              <div className="bg-brand-sage text-brand-cream p-2 sm:p-2.5 rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0">
                <Icon name="GraduationCap" size={22} className="text-[#FAF9F6]" />
              </div>
              <div className="leading-none min-w-0">
                <span className="text-[10px] font-mono font-bold text-brand-olive uppercase tracking-widest leading-none">
                  STUDY PLATFORM
                </span>
                <h1 className="text-sm sm:text-base font-display font-black text-brand-charcoal leading-normal tracking-tight truncate">
                  TechnoPrep
                </h1>
              </div>
            </div>

            <div className="hidden sm:flex items-center space-x-4 text-xs font-semibold">
              <span className="text-brand-stone/40">|</span>
              <div className="flex items-center space-x-1 text-brand-olive bg-brand-palesage px-2.5 py-1 rounded-lg border border-brand-sageborder">
                <Icon name="Brain" size={14} className="text-brand-olive" />
                <span>
                  Hafal: {stats.masteredCards.length}/{totalFlashcards} Kartu
                </span>
              </div>
              <div className="flex items-center space-x-1 text-brand-charcoal bg-brand-sand px-2.5 py-1 rounded-lg border border-brand-border">
                <Icon name="Award" size={14} className="text-brand-sage" />
                <span>Skor PG: {stats.highScoreMC}%</span>
              </div>
              <div className="flex items-center space-x-1 text-brand-charcoal bg-brand-sand px-2.5 py-1 rounded-lg border border-brand-border">
                <Icon name="ToggleLeft" size={14} className="text-brand-sage" />
                <span>Skor TF: {stats.highScoreTF}%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="hidden sm:block bg-brand-sand border-b border-brand-border sticky top-16 sm:top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <nav className="flex space-x-1 sm:space-x-3 py-3 shrink-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold leading-none cursor-pointer whitespace-nowrap transition-all duration-150 ${
                  activeTab === item.id
                    ? 'bg-brand-sage text-brand-cream font-black shadow-sm'
                    : 'text-brand-charcoal/80 hover:text-brand-charcoal bg-transparent hover:bg-brand-darksand'
                }`}
              >
                <Icon name={item.icon} size={14} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
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

      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-brand-border bg-[#FAF9F6]/95 backdrop-blur-md px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2">
        <div className="grid grid-cols-6 gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-bold transition ${
                activeTab === item.id
                  ? 'bg-brand-sage text-brand-cream shadow-sm'
                  : 'text-brand-stone hover:bg-brand-sand'
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <AnimatePresence>
        {showToast && (
          <motion.div
            id="toast-notification"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-24 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 bg-brand-olive text-brand-cream px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-3 border border-brand-sageborder sm:max-w-md"
          >
            <div className="bg-brand-palesage p-1 rounded-lg text-brand-olive shrink-0">
              <Icon name="Check" size={16} />
            </div>
            <p className="text-xs font-bold font-display tracking-tight text-[#FAF9F6] pr-1">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
