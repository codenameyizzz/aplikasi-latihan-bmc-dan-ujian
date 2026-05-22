import { bmcElements } from '../data/bmcData'
import { studyMaterials } from '../data/materialStudyData'
import { getMultipleChoiceQuestionsForMaterial } from '../data/docxMultipleChoiceQuestionBank'
import { getTrueFalseQuestionsForMaterial } from '../data/trueFalseQuestionBank'
import {
  BmcBlockId,
  BmcCaseEvaluationResult,
  BmcCaseStudy,
  StudyHistoryEntry,
  StudyStats
} from '../types'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatDate(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value)

  try {
    return new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'full',
      timeStyle: 'short'
    }).format(date)
  } catch {
    return date.toLocaleString()
  }
}

function openPrintWindow(title: string, body: string) {
  const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=1120,height=900')

  if (!printWindow) {
    throw new Error('Browser memblokir jendela export. Izinkan pop-up lalu coba lagi.')
  }

  const html = `
<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(title)}</title>
    <style>
      :root {
        --ink: #2f3625;
        --muted: #676f58;
        --line: #d8d5c9;
        --soft: #f5f1e6;
        --soft-2: #fbf9f4;
        --accent: #5f6948;
        --accent-2: #e6eedf;
        --danger: #9a5b50;
      }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; font-family: Georgia, "Times New Roman", serif; color: var(--ink); background: white; }
      body { padding: 32px; }
      .page { max-width: 1020px; margin: 0 auto; }
      .cover {
        background: linear-gradient(135deg, #5f6948, #7b8463);
        color: white;
        padding: 36px;
        border-radius: 24px;
        margin-bottom: 28px;
      }
      .eyebrow {
        display: inline-block;
        padding: 6px 10px;
        border-radius: 999px;
        background: rgba(255,255,255,0.12);
        font: 700 11px/1.2 Consolas, monospace;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      h1 { margin: 14px 0 8px; font-size: 34px; line-height: 1.1; }
      h2 { margin: 0 0 14px; font-size: 22px; line-height: 1.2; }
      h3 { margin: 0 0 10px; font-size: 16px; line-height: 1.3; }
      p { margin: 0; line-height: 1.6; }
      .meta { margin-top: 14px; color: rgba(255,255,255,0.86); font-size: 13px; }
      .section {
        margin-bottom: 24px;
        border: 1px solid var(--line);
        border-radius: 20px;
        padding: 22px;
        background: var(--soft-2);
        page-break-inside: avoid;
      }
      .stats-grid,
      .mini-grid,
      .triple-grid {
        display: grid;
        gap: 14px;
      }
      .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .mini-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .triple-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .card {
        border: 1px solid var(--line);
        border-radius: 16px;
        background: white;
        padding: 16px;
      }
      .metric-label {
        font: 700 10px/1.2 Consolas, monospace;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--muted);
      }
      .metric-value {
        margin-top: 8px;
        font-size: 28px;
        font-weight: 700;
        line-height: 1;
        color: var(--accent);
      }
      .metric-sub {
        margin-top: 10px;
        font-size: 12px;
        color: var(--muted);
      }
      .list, .compact-list {
        margin: 0;
        padding-left: 18px;
      }
      .list li, .compact-list li {
        margin: 6px 0;
        line-height: 1.5;
      }
      .compact-list li { margin: 4px 0; font-size: 13px; }
      .history-item, .block-card, .answer-card {
        border: 1px solid var(--line);
        border-radius: 16px;
        background: white;
        padding: 14px;
      }
      .history-item + .history-item { margin-top: 10px; }
      .history-head {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 8px;
      }
      .history-title {
        font-weight: 700;
        font-size: 14px;
      }
      .history-date {
        font-size: 11px;
        color: var(--muted);
        white-space: nowrap;
      }
      .muted { color: var(--muted); }
      .answer-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
      }
      .answer-card h4, .block-card h4 {
        margin: 0 0 10px;
        font-size: 14px;
      }
      .tag {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 999px;
        background: var(--accent-2);
        color: var(--accent);
        border: 1px solid #c8d4bd;
        font: 700 10px/1.2 Consolas, monospace;
      }
      .divider {
        height: 1px;
        background: var(--line);
        margin: 12px 0;
      }
      .score-box {
        border: 1px solid #c8d4bd;
        border-radius: 18px;
        background: linear-gradient(180deg, #edf4e8, #f9fbf6);
        padding: 18px;
        text-align: center;
      }
      .score-big {
        margin-top: 8px;
        font-size: 42px;
        font-weight: 700;
        color: var(--accent);
      }
      .footer-note {
        margin-top: 20px;
        font-size: 11px;
        color: var(--muted);
        text-align: center;
      }
      .danger { color: var(--danger); }
      @media print {
        body { padding: 0; }
        .page { max-width: none; }
        .cover, .section, .card, .history-item, .block-card, .answer-card, .score-box { break-inside: avoid; }
      }
    </style>
  </head>
  <body>
    <div class="page">${body}</div>
    <script>
      window.addEventListener('load', function () {
        setTimeout(function () {
          window.focus();
          window.print();
        }, 350);
      });
    </script>
  </body>
</html>
`

  printWindow.document.open()
  printWindow.document.write(html)
  printWindow.document.close()
}

export function exportStudyReportToPdf(input: {
  stats: StudyStats
  totalFlashcards: number
  customFlashcardCount: number
  studyHistory: StudyHistoryEntry[]
}) {
  const { stats, totalFlashcards, customFlashcardCount, studyHistory } = input
  const masteryPercentage = totalFlashcards > 0 ? Math.round((stats.masteredCards.length / totalFlashcards) * 100) : 0
  const recentHistory = studyHistory.slice(0, 12)

  const materialsHtml = studyMaterials
    .map((material) => {
      const mcCount = getMultipleChoiceQuestionsForMaterial(material.id).length
      const tfCount = getTrueFalseQuestionsForMaterial(material.id).length
      return `
        <div class="card">
          <h3>${escapeHtml(material.title)}</h3>
          <p class="muted">${escapeHtml(material.sourceFile)}</p>
          <div class="divider"></div>
          <p>${escapeHtml(material.summary)}</p>
          <div class="divider"></div>
          <p class="metric-sub">${material.flashcards.length} flashcard • ${mcCount} PG • ${tfCount} TF • ${material.essayQuestions.length} essay</p>
        </div>
      `
    })
    .join('')

  const historyHtml =
    recentHistory.length > 0
      ? recentHistory
          .map(
            (entry) => `
            <div class="history-item">
              <div class="history-head">
                <div class="history-title">${escapeHtml(entry.title)}</div>
                <div class="history-date">${escapeHtml(formatDate(entry.createdAt))}</div>
              </div>
              <p>${escapeHtml(entry.detail)}</p>
            </div>
          `
          )
          .join('')
      : '<p class="muted">Belum ada riwayat belajar tersimpan.</p>'

  openPrintWindow(
    'Laporan Hasil Belajar Technopreneurship',
    `
      <section class="cover">
        <span class="eyebrow">Study Report</span>
        <h1>Laporan Hasil Belajar</h1>
        <p>Ringkasan progres belajar Technopreneurship, performa latihan, dan jejak aktivitas yang tersimpan di browser pengguna.</p>
        <p class="meta">Dibuat pada ${escapeHtml(formatDate(new Date()))}</p>
      </section>

      <section class="section">
        <h2>Ringkasan Progres</h2>
        <div class="stats-grid">
          <div class="card">
            <div class="metric-label">Flashcard Mastery</div>
            <div class="metric-value">${stats.masteredCards.length}/${totalFlashcards}</div>
            <div class="metric-sub">${masteryPercentage}% kartu ditandai hafal. Kartu kustom: ${customFlashcardCount}.</div>
          </div>
          <div class="card">
            <div class="metric-label">Pilihan Ganda</div>
            <div class="metric-value">${stats.highScoreMC}%</div>
            <div class="metric-sub">Percobaan PG: ${stats.totalQuizzesTaken} sesi.</div>
          </div>
          <div class="card">
            <div class="metric-label">True / False</div>
            <div class="metric-value">${stats.highScoreTF}%</div>
            <div class="metric-sub">Percobaan TF: ${stats.totalTrueFalseTaken} sesi.</div>
          </div>
          <div class="card">
            <div class="metric-label">Essay & BMC</div>
            <div class="metric-value">${stats.essaysCompletedCount} / ${stats.bmcCasesCompletedCount}</div>
            <div class="metric-sub">Essay selesai: ${stats.essaysCompletedCount}. Latihan BMC dinilai: ${stats.bmcCasesCompletedCount}.</div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>Ringkasan Materi</h2>
        <div class="mini-grid">${materialsHtml}</div>
      </section>

      <section class="section">
        <h2>Riwayat Belajar Terbaru</h2>
        ${historyHtml}
      </section>

      <p class="footer-note">Copyright Yizreel Schwartz 2026</p>
    `
  )
}

export function exportBmcCaseReportToPdf(input: {
  caseStudy: BmcCaseStudy
  answers: Record<BmcBlockId, string>
  evaluation: BmcCaseEvaluationResult
}) {
  const { caseStudy, answers, evaluation } = input

  const answerBlocksHtml = orderedBlockIds()
    .map((blockId) => {
      const block = bmcElements.find((item) => item.id === blockId)!
      const userAnswer = answers[blockId]?.trim() || '(Kosong)'
      const answerKeyItems = caseStudy.answerKey[blockId]
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join('')

      return `
        <div class="answer-card">
          <div class="tag">${escapeHtml(blockId)} • ${escapeHtml(block.name)}</div>
          <div class="divider"></div>
          <h4>Jawaban Pengguna</h4>
          <p>${escapeHtml(userAnswer).replace(/\n/g, '<br />')}</p>
          <div class="divider"></div>
          <h4>Kunci Acuan</h4>
          <ul class="compact-list">${answerKeyItems}</ul>
        </div>
      `
    })
    .join('')

  const blockFeedbackHtml = evaluation.blockFeedback
    .map(
      (item) => `
        <div class="block-card">
          <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start;">
            <h4>${escapeHtml(item.blockId)} - ${escapeHtml(item.blockName)}</h4>
            <span class="tag">${item.score}/10</span>
          </div>
          <p>${escapeHtml(item.notes)}</p>
        </div>
      `
    )
    .join('')

  const strengthsHtml = evaluation.strengths.map((item) => `<li>${escapeHtml(item)}</li>`).join('')
  const improvementsHtml = evaluation.improvements.map((item) => `<li>${escapeHtml(item)}</li>`).join('')

  openPrintWindow(
    `Laporan Latihan BMC - ${caseStudy.shortTitle}`,
    `
      <section class="cover">
        <span class="eyebrow">BMC Case Report</span>
        <h1>${escapeHtml(caseStudy.title)}</h1>
        <p>Laporan ini memuat studi kasus, jawaban pengguna per blok BMC, feedback evaluasi, skor, dan kunci jawaban acuan.</p>
        <p class="meta">Dibuat pada ${escapeHtml(formatDate(new Date()))}</p>
      </section>

      <section class="section">
        <h2>Skor dan Evaluasi</h2>
        <div class="stats-grid">
          <div class="score-box">
            <div class="metric-label">Nilai Akhir</div>
            <div class="score-big">${evaluation.score}</div>
            <p>${escapeHtml(evaluation.verdict)}</p>
          </div>
          <div class="card">
            <h3>Feedback Ringkas</h3>
            <p>${escapeHtml(evaluation.feedback)}</p>
            <div class="divider"></div>
            <h3>Saran Revisi</h3>
            <p>${escapeHtml(evaluation.suggestedRevision)}</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>Studi Kasus</h2>
        <div class="card">
          <h3>Skenario</h3>
          <p>${escapeHtml(caseStudy.scenario)}</p>
          <div class="divider"></div>
          <h3>Tugas</h3>
          <p>${escapeHtml(caseStudy.task)}</p>
        </div>
      </section>

      <section class="section">
        <h2>Kekuatan dan Perbaikan</h2>
        <div class="mini-grid">
          <div class="card">
            <h3>Kekuatan Jawaban</h3>
            <ul class="list">${strengthsHtml || '<li>Tidak ada catatan.</li>'}</ul>
          </div>
          <div class="card">
            <h3>Yang Perlu Diperbaiki</h3>
            <ul class="list">${improvementsHtml || '<li>Tidak ada catatan.</li>'}</ul>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>Ulasan Per Blok</h2>
        <div class="triple-grid">${blockFeedbackHtml}</div>
      </section>

      <section class="section">
        <h2>Jawaban Pengguna dan Kunci Acuan</h2>
        <div class="answer-grid">${answerBlocksHtml}</div>
      </section>

      <p class="footer-note">Copyright Yizreel Schwartz 2026</p>
    `
  )
}

function orderedBlockIds(): BmcBlockId[] {
  return ['KP', 'KA', 'KR', 'VP', 'CR', 'CH', 'CS', 'C$', 'R$']
}
