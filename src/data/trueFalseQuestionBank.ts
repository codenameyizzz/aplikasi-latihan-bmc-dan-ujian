import { QuestionTF } from '../types'

function buildQuestions(materialId: string, category: string, rows: Array<{
  number: number
  statement: string
  correctAnswer: boolean
  explanation: string
}>): QuestionTF[] {
  return rows.map((row) => ({
    id: `${materialId}_tf_${row.number}`,
    statement: row.statement,
    correctAnswer: row.correctAnswer,
    explanation: row.explanation,
    category
  }))
}

export const trueFalseQuestionBank: Record<string, QuestionTF[]> = {
  'customer-relationships': buildQuestions('customer-relationships', 'Customer Relationships', [
    {
      number: 1,
      statement: 'Dedicated personal assistance berarti perusahaan menyediakan staf atau contact person khusus untuk klien penting.',
      correctAnswer: true,
      explanation: 'Ini sesuai dengan konsep dedicated personal assistance, yaitu hubungan personal yang sangat spesifik untuk pelanggan tertentu.'
    },
    {
      number: 2,
      statement: 'AARRR terdiri dari Acquisition, Activation, Retention, Referral, dan Revenue.',
      correctAnswer: true,
      explanation: 'Urutan lima metrik dalam AARRR memang acquisition, activation, retention, referral, lalu revenue.'
    },
    {
      number: 3,
      statement: 'Self-service berarti perusahaan selalu menugaskan account manager khusus untuk setiap pelanggan.',
      correctAnswer: false,
      explanation: 'Self-service justru membuat pelanggan melayani dirinya sendiri dengan sistem yang sudah disiapkan, bukan dengan pendamping khusus.'
    },
    {
      number: 4,
      statement: 'Dalam kerangka get, keep, grow, tahap grow berfokus meningkatkan nilai pelanggan melalui upselling, cross-selling, atau referral.',
      correctAnswer: true,
      explanation: 'Grow customers memang terkait peningkatan nilai pelanggan yang sudah ada.'
    },
    {
      number: 5,
      statement: 'Co-creation hanya berarti pelanggan membaca FAQ tanpa ikut berkontribusi pada nilai layanan.',
      correctAnswer: false,
      explanation: 'Co-creation melibatkan pelanggan berkontribusi pada ulasan, ide, konten, atau pembentukan nilai bersama.'
    }
  ]),
  'revenue-streams': buildQuestions('revenue-streams', 'Revenue Streams', [
    {
      number: 1,
      statement: 'Subscription fee termasuk recurring revenue karena pelanggan membayar secara berulang untuk terus mengakses layanan.',
      correctAnswer: true,
      explanation: 'Subscription adalah contoh jelas recurring revenue.'
    },
    {
      number: 2,
      statement: 'Usage fee membuat pelanggan membayar berdasarkan frekuensi atau intensitas pemakaian layanan.',
      correctAnswer: true,
      explanation: 'Usage fee memang dihitung dari penggunaan aktual layanan.'
    },
    {
      number: 3,
      statement: 'Licensing berarti perusahaan menjual aset fisik putus kepada pelanggan akhir.',
      correctAnswer: false,
      explanation: 'Licensing adalah pemberian izin penggunaan hak kekayaan intelektual, bukan penjualan aset fisik.'
    },
    {
      number: 4,
      statement: 'Dynamic pricing dapat melibatkan negosiasi harga atau yield management sesuai kondisi pasar dan waktu.',
      correctAnswer: true,
      explanation: 'Ini salah satu ciri utama dynamic pricing.'
    },
    {
      number: 5,
      statement: 'Penetapan harga yang hanya menambahkan markup di atas biaya tanpa melihat nilai pelanggan selalu merupakan strategi terbaik.',
      correctAnswer: false,
      explanation: 'Materi justru menekankan bahwa cost-based pricing murni bisa keliru bila mengabaikan persepsi nilai pelanggan.'
    }
  ]),
  'key-partners': buildQuestions('key-partners', 'Key Partners', [
    {
      number: 1,
      statement: 'Blok Key Partners menggambarkan supplier dan mitra utama yang membantu model bisnis berjalan.',
      correctAnswer: true,
      explanation: 'Fungsi inti Key Partners memang menjelaskan jaringan mitra eksternal penting.'
    },
    {
      number: 2,
      statement: 'Coopetition berarti perusahaan memutus semua hubungan dengan pesaing agar pasar lebih aman.',
      correctAnswer: false,
      explanation: 'Coopetition justru berarti kolaborasi strategis antarpesaing pada area tertentu.'
    },
    {
      number: 3,
      statement: 'Joint venture biasanya dilakukan ketika dua atau lebih pihak ingin membangun entitas bisnis baru bersama.',
      correctAnswer: true,
      explanation: 'Ini adalah definisi umum joint venture di konteks kemitraan.'
    },
    {
      number: 4,
      statement: 'Dalam bisnis web/mobile, traffic partners dapat membantu mengarahkan user ke website atau aplikasi perusahaan.',
      correctAnswer: true,
      explanation: 'Traffic partners relevan untuk cross-referral, distribusi traffic, atau akuisisi user.'
    },
    {
      number: 5,
      statement: 'Key Partners hanya membahas sumber pendanaan dan tidak terkait aktivitas operasional eksternal.',
      correctAnswer: false,
      explanation: 'Key Partners sangat terkait dengan pasokan, distribusi, kapabilitas, dan aktivitas eksternal yang membantu operasi bisnis.'
    }
  ]),
  'key-activities-resources-cost': buildQuestions('key-activities-resources-cost', 'Key Activities, Resources, Cost', [
    {
      number: 1,
      statement: 'Pada bisnis platform digital, pengembangan dan pemeliharaan platform dapat menjadi key activity utama.',
      correctAnswer: true,
      explanation: 'Untuk bisnis platform, aktivitas pengembangan dan maintenance platform memang sangat sentral.'
    },
    {
      number: 2,
      statement: 'Patent, copyright, source code, dan database pelanggan termasuk physical resources.',
      correctAnswer: false,
      explanation: 'Semua itu termasuk intellectual resources, bukan physical resources.'
    },
    {
      number: 3,
      statement: 'Cost-driven model berusaha menekan biaya operasi serendah mungkin sebagai fokus utama desain bisnis.',
      correctAnswer: true,
      explanation: 'Ini membedakan cost-driven dari value-driven.'
    },
    {
      number: 4,
      statement: 'Economies of scope berarti biaya per unit turun semata-mata karena volume produksi satu produk meningkat sangat besar.',
      correctAnswer: false,
      explanation: 'Itu lebih dekat ke economies of scale. Economies of scope terkait penggunaan sumber daya bersama untuk banyak produk atau lini.'
    },
    {
      number: 5,
      statement: 'Human resources sering menjadi sangat penting pada bisnis kreatif atau berbasis pengetahuan.',
      correctAnswer: true,
      explanation: 'Bisnis seperti ini sangat bergantung pada kemampuan orang-orang kuncinya.'
    }
  ]),
  'financial-management': buildQuestions('financial-management', 'Financial Management', [
    {
      number: 1,
      statement: 'Biaya variabel berubah mengikuti perubahan volume produksi atau aktivitas bisnis.',
      correctAnswer: true,
      explanation: 'Ini ciri utama biaya variabel.'
    },
    {
      number: 2,
      statement: 'Biaya administrasi kantor umum selalu merupakan direct cost untuk setiap produk.',
      correctAnswer: false,
      explanation: 'Biaya administrasi umum lebih tepat disebut indirect cost karena tidak mudah ditelusuri langsung ke satu produk.'
    },
    {
      number: 3,
      statement: 'Pencatatan semua transaksi adalah fondasi dasar administrasi keuangan yang baik.',
      correctAnswer: true,
      explanation: 'Tanpa pencatatan transaksi yang rapi, laporan keuangan menjadi lemah.'
    },
    {
      number: 4,
      statement: 'Laporan arus kas hanya mencatat aktivitas pendanaan dan tidak mencakup operasi atau investasi.',
      correctAnswer: false,
      explanation: 'Arus kas dibagi ke aktivitas operasi, investasi, dan pendanaan.'
    },
    {
      number: 5,
      statement: 'Penghindaran risiko, pengurangan risiko, berbagi risiko, dan retensi risiko adalah bentuk perlakuan risiko.',
      correctAnswer: true,
      explanation: 'Keempatnya memang termasuk alternatif perlakuan risiko dalam materi.'
    }
  ])
}

export function getTrueFalseQuestionsForMaterial(materialId: string): QuestionTF[] {
  return trueFalseQuestionBank[materialId] ?? []
}

export const totalTrueFalseQuestionCount = Object.values(trueFalseQuestionBank).reduce(
  (total, questions) => total + questions.length,
  0
)
