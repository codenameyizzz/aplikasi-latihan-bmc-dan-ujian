/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BmcBlockId =
  | 'KP' // Key Partners
  | 'KA' // Key Activities
  | 'KR' // Key Resources
  | 'VP' // Value Propositions
  | 'CR' // Customer Relationships
  | 'CH' // Channels
  | 'CS' // Customer Segments
  | 'C$' // Cost Structure
  | 'R$' // Revenue Streams

export interface BmcBusinessExample {
  businessName: string
  items: string[]
}

export interface BmcElement {
  id: BmcBlockId
  name: string
  nameEn: string
  iconName: string // Lucide icon reference
  color: string // Tailwind color class scheme (e.g., bg-emerald-50 text-emerald-700)
  definition: string
  keyQuestions: string[]
  examples: BmcBusinessExample[]
}

export interface QuestionMC {
  id: string
  question: string
  options: {
    key: 'A' | 'B' | 'C' | 'D'
    text: string
  }[]
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation: string
  category: string
}

export interface QuestionTF {
  id: string
  statement: string
  correctAnswer: boolean
  explanation: string
  category: string
}

export interface QuestionEssay {
  id: string
  title: string
  scenario: string
  task: string
  suggestedAnswer: string
  keywords: string[] // Essential keywords for evaluation
  gradingRubric: {
    point: string
    description: string
  }[]
}

export interface BmcCaseStudy {
  id: string
  title: string
  shortTitle: string
  scenario: string
  task: string
  answerKey: Record<BmcBlockId, string[]>
  gradingRubric: {
    point: string
    description: string
  }[]
}

export interface BmcCaseBlockFeedback {
  blockId: BmcBlockId
  blockName: string
  score: number
  notes: string
}

export interface BmcCaseEvaluationResult {
  score: number
  verdict: string
  strengths: string[]
  improvements: string[]
  feedback: string
  suggestedRevision: string
  blockFeedback: BmcCaseBlockFeedback[]
}

export interface CustomFlashcard {
  id: string
  materialId: string
  front: string
  back: string
  bullets: string[]
  createdAt: string
}

export interface StudyHistoryEntry {
  id: string
  type:
    | 'flashcard_mastered'
    | 'flashcard_unmastered'
    | 'flashcard_created'
    | 'quiz_completed'
    | 'truefalse_completed'
    | 'essay_completed'
    | 'bmc_case_completed'
    | 'stats_reset'
  title: string
  detail: string
  createdAt: string
}

export interface StudyStats {
  masteredCards: string[] // List of mastered BmcBlockId
  reviewNeededCards: string[] // List of review-needed BmcBlockId
  highScoreMC: number // Highest score in Multiple Choice (percentage)
  highScoreTF: number
  totalQuizzesTaken: number
  totalTrueFalseTaken: number
  essaysCompletedCount: number
  bmcCasesCompletedCount: number
}
