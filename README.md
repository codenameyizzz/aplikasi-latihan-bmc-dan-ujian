# Aplikasi Latihan BMC dan Ujian Technopreneurship

Project ini adalah aplikasi `Vite + React + TypeScript` untuk belajar Business Model Canvas dan latihan persiapan ujian mata kuliah Technopreneurship.

Fitur utama:

- `Interactive Business Model Canvas` dengan nama blok English
- Penjelasan konsep BMC dalam Bahasa Indonesia
- `Flashcards` per file materi
- `Pilihan Ganda` per file materi
- `Essay` per file materi
- Penilaian essay dengan `Gemini`
- Akses file `PDF` dan `PPTX` dari folder `materials` langsung di web app

## Sumber Materi

Konten belajar dibangun dari file:

- `materials/10_TEKNO_Customer_Relationship_Riyanthi.pdf`
- `materials/11_TEKNO_Revenue_Stream_Riyanthi.pdf`
- `materials/12_TEKNO_Key_Partners_Riyanthi.pdf`
- `materials/13_TEKNO_KeyAct_KeyResources_Cost_Riyanthi.pdf`
- `materials/Cost_Structure_Financial_Management.pptx`

## Menjalankan Secara Lokal

Prasyarat:

- `Node.js` 20+ atau 22+ disarankan

Langkah:

1. Install dependency

```bash
npm install
```

2. Siapkan environment variable

Gunakan `.env.local`:

```bash
VITE_GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
VITE_GEMINI_MODEL="gemini-3.1-flash-lite-preview"
```

3. Jalankan development server

```bash
npm run dev
```

4. Buka:

```text
http://localhost:3000
```

## Script

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Lokasi Data dan Integrasi

- Dataset materi: [src/data/materialStudyData.ts](/C:/project-gabut/aplikasi-latihan-bmc-dan-ujian/src/data/materialStudyData.ts)
- Data BMC: [src/data/bmcData.ts](/C:/project-gabut/aplikasi-latihan-bmc-dan-ujian/src/data/bmcData.ts)
- Penilai essay Gemini: [src/lib/geminiEssayEvaluator.ts](/C:/project-gabut/aplikasi-latihan-bmc-dan-ujian/src/lib/geminiEssayEvaluator.ts)

## Catatan

- PDF bisa dipreview langsung di dalam web app.
- PPTX disediakan sebagai file buka/unduh karena preview native browser tidak konsisten.
- Progress belajar tetap disimpan di `localStorage`.
