import { QuestionMC } from '../types'

type OptionKey = 'A' | 'B' | 'C' | 'D'
type RawQuestion = [
  number,
  string,
  string,
  string,
  string,
  string,
  OptionKey
]

const materialCategoryById = {
  'customer-relationships': 'Customer Relationships',
  'financial-management': 'Cost Structure & Financial Management',
  'key-activities-resources-cost': 'Key Activities, Key Resources, & Cost Structure',
  'key-partners': 'Key Partners',
  'revenue-streams': 'Revenue Streams'
} satisfies Record<string, string>

function buildQuestions(materialId: keyof typeof materialCategoryById, rows: RawQuestion[]): QuestionMC[] {
  const category = materialCategoryById[materialId]

  return rows.map(([number, question, optionA, optionB, optionC, optionD, correctAnswer]) => {
    const options: QuestionMC['options'] = [
      { key: 'A', text: optionA },
      { key: 'B', text: optionB },
      { key: 'C', text: optionC },
      { key: 'D', text: optionD }
    ]
    const correctOption = options.find((option) => option.key === correctAnswer)

    return {
      id: `${materialId}_docx_q_${number}`,
      question,
      options,
      correctAnswer,
      explanation: correctOption
        ? `Kunci jawaban pada dokumen sumber adalah ${correctAnswer}. ${correctOption.text}`
        : `Kunci jawaban pada dokumen sumber adalah ${correctAnswer}.`,
      category
    }
  })
}

export const docxMultipleChoiceQuestionBank: Record<string, QuestionMC[]> = {
  'customer-relationships': buildQuestions('customer-relationships', [
    [
      1,
      'Hubungan pelanggan yang eksklusif, di mana perusahaan mendedikasikan satu staf spesifik secara pribadi untuk seorang klien penting (seperti nasabah prioritas Bank) dinamakan...',
      'Self-service',
      'Dedicated Personal Assistance',
      'Automated Services',
      'Co-creation',
      'B'
    ],
    [
      2,
      'Kala perusahaan tidak menyediakan layanan Customer Service khusus karena semua instruksi pembelian sudah disiapkan otomatis di web agar pembeli bisa belanja sendiri (seperti di iTunes), ini merupakan bentuk...',
      'Co-creation',
      'Komunitas',
      'Self-Service (Swalayan)',
      'Bantuan Personal',
      'C'
    ],
    [
      3,
      'Spotify dan Netflix merekomendasikan konten dengan mengenali preferensi individu penggunanya melalui algoritma cerdas, seolah melayani secara personal. Hubungan ini disebut...',
      'Automated Services',
      'Dedicated personal assistance',
      'Direct marketing',
      'Co-creation',
      'A'
    ],
    [
      4,
      'Strategi memisahkan produk atau layanan menjadi bagian-bagian terpisah dengan harga berbeda-beda (karena pengguna mungkin hanya butuh fungsi dasarnya saja) dikenal sebagai taktik...',
      'Up-selling',
      'Cross-selling',
      'Next-selling',
      'Unbundling',
      'D'
    ],
    [
      5,
      "Tindakan kasir restoran cepat saji yang menanyakan 'Apakah mau di-upgrade menjadi paket besar (Double Size)?' kepada pembeli burger adalah contoh penerapan taktik...",
      'Up-Selling',
      'Cross-Selling',
      'Unbundling',
      'Referral',
      'A'
    ],
    [
      6,
      'Jika pelanggan membeli laptop, lalu staf penjualan menyarankan pelanggan untuk juga membeli tas laptop dan anti-gores, tindakan tersebut disebut...',
      'Up-Selling',
      'Cross-Selling',
      'Down-Selling',
      'Co-Creation',
      'B'
    ],
    [
      7,
      'Konsep strategi Customer Relationships dapat dirangkum menjadi tiga tahap utama (Funnel), yaitu...',
      'Read, Write, Speak',
      'Build, Measure, Learn',
      'Get, Keep, Grow Customers',
      'Awareness, Interest, Design',
      'C'
    ],
    [
      8,
      'Mengajak pelanggan menuliskan review produk (seperti di Amazon) atau membuat video (seperti di YouTube) demi menambah nilai bagi pelanggan lainnya dinamakan jenis hubungan...',
      'Personal assistance',
      'Automated services',
      'Co-Creation',
      'Retention',
      'C'
    ],
    [
      9,
      'Framework metrik perilaku pengguna yang dirancang untuk mengevaluasi bisnis produk digital (Web/App) dinamakan AARRR, yang merupakan singkatan dari...',
      'Acquisition, Activation, Retention, Referral, Revenue',
      'Attention, Action, Reward, Return, Revenue',
      'Analysis, Action, Retention, Review, Risk',
      'Awareness, Automation, Response, Referral, Reward',
      'A'
    ],
    [
      10,
      'Di dalam metrik AARRR, tahapan yang mengukur apakah pengguna (user) kembali masuk untuk menggunakan aplikasi di kunjungan berikutnya disebut tahapan...',
      'Acquisition',
      'Activation',
      'Retention',
      'Referral',
      'C'
    ]
  ]),
  'financial-management': buildQuestions('financial-management', [
    [
      1,
      'Biaya yang jumlah totalnya berubah-ubah secara proporsional sesuai dengan perubahan volume produksi disebut...',
      'Biaya Variabel (Variable Cost)',
      'Biaya Tetap (Fixed Cost)',
      'Biaya Semi-Variabel',
      'Biaya Tak Terduga',
      'A'
    ],
    [
      2,
      'Manakah dari komponen di bawah ini yang merupakan contoh dari biaya tetap (fixed cost)?',
      'Biaya bahan baku',
      'Biaya sewa bangunan dan gaji pegawai tetap',
      'Biaya lembur harian',
      'Biaya kemasan produk',
      'B'
    ],
    [
      3,
      'Jika volume produksi suatu pabrik meningkat secara drastis, bagaimana pengaruhnya terhadap Biaya Tetap?',
      'Jumlah total biaya tetap ikut meningkat secara proporsional',
      'Jumlah total biaya tetap akan menurun drastis',
      'Jumlah total biaya tetap berfluktuasi',
      'Jumlah total biaya tetap relatif tidak berubah',
      'D'
    ],
    [
      4,
      'Laporan keuangan yang menyajikan rincian total pendapatan dan pengeluaran suatu bisnis dalam periode tertentu dinamakan...',
      'Laporan Neraca (Posisi Keuangan)',
      'Laporan Arus Kas',
      'Laporan Laba Rugi',
      'Laporan Perubahan Modal',
      'C'
    ],
    [
      5,
      'Dalam Laporan Arus Kas, arus kas yang berasal dari penjualan barang/jasa dan pembayaran pajak diklasifikasikan sebagai aktivitas...',
      'Operasional',
      'Investasi',
      'Pendanaan',
      'Spekulasi',
      'A'
    ],
    [
      6,
      "Menurut prinsip keuangan, yang diklasifikasikan sebagai 'Setara Kas' adalah...",
      'Kendaraan operasional pabrik',
      'Investasi jangka pendek yang sangat likuid (jatuh tempo < 3 bulan)',
      'Mesin produksi',
      'Piutang macet yang belum tertagih',
      'B'
    ],
    [
      7,
      'Pentingnya mengalokasikan Dana Darurat (Emergency Fund) dalam keuangan UMKM adalah untuk...',
      'Dipakai untuk liburan pemilik bisnis',
      'Berjaga-jaga melindungi arus kas jika terjadi krisis tak terduga',
      'Menghindari keharusan membayar pajak',
      'Membayar dividen ganda kepada pemegang saham',
      'B'
    ],
    [
      8,
      'Proses manajemen risiko yang baik melibatkan berbagai tahapan. Di bawah ini yang bukan merupakan bagian perlakuan risiko adalah...',
      'Penghindaran risiko',
      'Pengurangan risiko',
      'Berbagi risiko',
      'Penggandaan risiko (Risk Multiplication)',
      'D'
    ],
    [
      9,
      'Salah satu variabel penting dalam strategi penentuan harga jual adalah memastikan harga dapat...',
      'Selalu lebih murah dari kompetitor tak peduli rugi',
      'Menutup segala biaya yang dikeluarkan dan mendapatkan laba yang diinginkan',
      'Terus berubah setiap hari',
      'Memberatkan konsumen',
      'B'
    ],
    [
      10,
      "Fungsi utama dari kegiatan pencatatan 'Stok Opname' adalah...",
      'Menghitung jumlah hutang perusahaan',
      'Mencocokkan selisih antara stok barang awal, stok akhir, dan catatan fisiknya',
      'Mencatat biodata karyawan',
      'Mendaftar mitra bisnis',
      'B'
    ]
  ]),
  'key-activities-resources-cost': buildQuestions('key-activities-resources-cost', [
    [
      1,
      'Aktivitas utama perusahaan konsultan dan rumah sakit yang berfokus pada penawaran solusi baru bagi klien termasuk dalam Key Activities kategori...',
      'Produksi',
      'Pemecahan Masalah (Problem Solving)',
      'Platform/Jaringan',
      'Manufaktur Fisik',
      'B'
    ],
    [
      2,
      'Amazon dan Microsoft mempertahankan platform web dan ekosistem software mereka secara berkelanjutan. Ini tergolong Key Activities kategori...',
      'Platform / Jaringan',
      'Produksi massal',
      'Bantuan personal',
      'Outsourcing',
      'A'
    ],
    [
      3,
      'Fasilitas pabrik, infrastruktur bangunan, dan mesin logistik adalah contoh dari Key Resources berwujud...',
      'Intelektual',
      'Finansial',
      'Fisik',
      'Manusia',
      'C'
    ],
    [
      4,
      'Hak Cipta (Copyright), Paten, dan Trade Secret (Rahasia Dagang) merupakan aset penting yang tergolong dalam Key Resources kategori...',
      'Intelektual',
      'Infrastruktur Fisik',
      'Finansial Tunai',
      'Bantuan Manusia',
      'A'
    ],
    [
      5,
      'Merek dagang (Trademark) melindungi hal-hal berikut ini, kecuali...',
      'Logo perusahaan',
      'Slogan brand',
      'Branding visual (misal Nike swoosh)',
      'Formula rahasia komposisi produk',
      'D'
    ],
    [
      6,
      'Model bisnis yang berfokus ketat untuk meminimalkan biaya operasi dengan value proposition harga murah (contoh: maskapai AirAsia) disebut model...',
      'Value-Driven',
      'Cost-Driven',
      'Quality-Driven',
      'Luxury-Driven',
      'B'
    ],
    [
      7,
      'Di sisi lain, hotel mewah yang menawarkan layanan pribadi tingkat tinggi tanpa terlalu berfokus pada menekan biaya disebut model...',
      'Cost-Driven',
      'Value-Driven',
      'Economies of scale',
      'Outsourcing',
      'B'
    ],
    [
      8,
      'Fenomena turunnya biaya produksi per unit karena barang yang diproduksi dalam jumlah yang jauh lebih besar disebut dengan...',
      'Skala Ekonomi (Economies of Scale)',
      'Lingkup Ekonomi (Economies of Scope)',
      'Biaya Variabel',
      'Inflasi Produksi',
      'A'
    ],
    [
      9,
      'Keunggulan biaya yang dinikmati karena lingkup operasional perusahaan yang besar (misalnya menggunakan satu jalur distribusi pemasaran yang sama untuk banyak produk berbeda) disebut...',
      'Skala Ekonomi',
      'Lingkup Ekonomi (Economies of Scope)',
      'Fixed Cost Reduction',
      'Venture Capital',
      'B'
    ],
    [
      10,
      'Di dalam Key Resources Finansial, sumber dana dapat diperoleh dari pihak-pihak berikut, KECUALI...',
      'Angel investor',
      'Venture capital',
      'Crowdfunding',
      'Mencuri rahasia dagang (Trade Secret)',
      'D'
    ]
  ]),
  'key-partners': buildQuestions('key-partners', [
    [
      1,
      'Tujuan utama optimisasi dan skala ekonomi dalam kemitraan adalah...',
      'Menghindari pajak perusahaan',
      'Mengurangi biaya melalui outsourcing atau pemanfaatan infrastruktur bersama',
      'Meningkatkan jumlah persaingan',
      'Mengurangi jumlah karyawan secara drastis',
      'B'
    ],
    [
      2,
      'Kerjasama antara Apple (sistem operasi/produk) dan Foxconn (manufaktur perakitan) merupakan contoh kemitraan tipe...',
      'Aliansi strategis antar non-pesaing',
      'Coopetition',
      'Hubungan pembeli-pemasok (Buyer-Supplier)',
      'Usaha patungan (Joint Venture)',
      'C'
    ],
    [
      3,
      'Aliansi strategis antara perusahaan-perusahaan yang tidak bersaing, seperti kolaborasi Starbucks dan Pepsi, bertujuan untuk...',
      'Melengkapi produk dengan produk/jasa perusahaan mitra',
      'Menciptakan pesaing baru',
      'Mengurangi jumlah pelanggan',
      'Mengubah model bisnis utama secara total',
      'A'
    ],
    [
      4,
      "Apa yang dimaksud dengan konsep 'Coopetition'?",
      'Membeli perusahaan kompetitor',
      'Kemitraan strategis antarpesaing untuk berbagi biaya atau pasar',
      'Persaingan harga yang saling menjatuhkan',
      'Memutus hubungan dengan pemasok utama',
      'B'
    ],
    [
      5,
      "Contoh keberhasilan kemitraan 'Traffic Partners' yang sangat bergantung satu sama lain di industri digital adalah...",
      'Zynga dan Facebook',
      'Indomaret dan Alfamart',
      'Intel dan AMD',
      'Boeing dan Airbus',
      'A'
    ],
    [
      6,
      "Kampanye 'A Day Without Whopper' oleh Burger King yang justru mendorong pelanggan ke McDonald's untuk amal adalah contoh pemahaman strategis terkait...",
      'Pengurangan biaya tetap',
      'Outsourcing operasional',
      'Joint venture finansial',
      'Coopetition / kolaborasi demi awareness industri',
      'D'
    ],
    [
      7,
      'Pada model bisnis berbasis web/mobile, tujuan utama dari Traffic Partners adalah...',
      'Membuat hardware baru',
      'Mengelola keuangan perusahaan',
      'Mengantarkan orang ke website/aplikasi (cross referral/bayar per klik)',
      'Mengurangi server cost',
      'C'
    ],
    [
      8,
      'Pengembangan format optical disc Blu-ray secara bersama-sama oleh berbagai pabrikan elektronik terkemuka merupakan motivasi kemitraan untuk...',
      'Penipuan pasar',
      'Pengurangan risiko dan ketidakpastian',
      'Penghapusan hak cipta',
      'Menghindari pajak lisensi',
      'B'
    ],
    [
      9,
      'Usaha patungan (Joint Venture) umumnya dilakukan ketika dua atau lebih entitas ingin...',
      'Mengembangkan entitas bisnis baru bersama-sama',
      'Saling membajak karyawan',
      'Menutup lini produksi lama',
      'Melakukan PHK massal',
      'A'
    ],
    [
      10,
      'Blok Key Partners dalam Business Model Canvas pada dasarnya menggambarkan...',
      'Daftar pelanggan setia perusahaan',
      'Cara perusahaan mendapatkan pendanaan',
      'Rantai supplier dan mitra utama yang membuat model bisnis dapat berjalan',
      'Metode pemasaran digital perusahaan',
      'C'
    ]
  ]),
  'revenue-streams': buildQuestions('revenue-streams', [
    [
      1,
      'Pendapatan yang ditarik dari frekuensi pemakaian layanan tertentu oleh pelanggan (misalnya biaya tagihan telepon per menit bicara) dinamakan...',
      'Biaya Langganan',
      'Biaya Penggunaan (Pay per use / Usage fee)',
      'Lisensi',
      'Penjualan Aset',
      'B'
    ],
    [
      2,
      'Spotify dan pusat kebugaran (Gym) umumnya memperoleh pendapatan utama mereka melalui model...',
      'Penjualan aset satu kali',
      'Biaya Komisi perantara',
      'Biaya Berlangganan (Subscription)',
      'Manajemen hasil investasi',
      'C'
    ],
    [
      3,
      'Perusahaan perantara seperti penyedia kartu kredit atau Airbnb menghasilkan pendapatan mereka dengan mengutip persentase dari transaksi. Model ini disebut...',
      'Biaya Komisi (Brokerage fee / Commission)',
      'Lisensi',
      'Penjualan aset fisik',
      'Sewa / Leasing',
      'A'
    ],
    [
      4,
      "Model penetapan harga 'Freemium' pada produk digital berarti...",
      'Produk sepenuhnya berbayar sejak awal',
      'Produk dasar disediakan gratis, namun pelanggan ditarik biaya untuk mengakses layanan/fitur premium',
      'Produk dijual putus ke pihak ketiga',
      'Pelanggan dibayar untuk menggunakan aplikasi',
      'B'
    ],
    [
      5,
      'Memberikan izin hukum bagi perusahaan lain untuk menggunakan hak kekayaan intelektual atau paten dengan timbal balik pembayaran fee disebut...',
      'Komisi',
      'Langganan bulanan',
      'Lisensi (Licensing)',
      'Pinjaman bersyarat',
      'C'
    ],
    [
      6,
      "Mekanisme penetapan harga berbasis 'Manajemen Hasil' (Yield Management) biasanya diterapkan pada...",
      'Penjualan bahan sembako',
      'Produk elektronik laptop',
      'Kursi pesawat atau kamar hotel yang sangat bergantung pada sisa ketersediaan dan waktu pemesanan',
      'Biaya asuransi kendaraan',
      'C'
    ],
    [
      7,
      "Model 'Razor/Razor blade' merupakan strategi harga yang bertujuan untuk...",
      'Menjual alat utamanya (printer/alat cukur) dengan harga murah agar meraup untung dari penjualan rutin isi ulangnya (tinta/silet)',
      'Menjual alat utamanya sangat mahal',
      'Menyewakan produk ke kompetitor',
      'Memberikan lisensi gratis selamanya',
      'A'
    ],
    [
      8,
      'Penetapan harga yang murni berfokus pada persepsi pelanggan tentang efisiensi atau prestige, bukan pada HPP pembuatannya, disebut...',
      'Cost-based pricing',
      'Value pricing (Berbasis Nilai)',
      'Auction pricing',
      'Real-time pricing',
      'B'
    ],
    [
      9,
      'Jika perusahaan menjual ruang data (cloud) kepada klien hanya untuk waktu sementara dan klien tidak memiliki hardware-nya secara permanen, maka model pendapatannya adalah...',
      'Penjualan Aset tetap',
      'Penyewaan / Leasing',
      'Iklan (Advertising)',
      'Referral',
      'B'
    ],
    [
      10,
      'Pendapatan Afiliasi (Affiliate revenue) di bisnis online didapatkan dari cara...',
      'Menerima modal dari Bank',
      'Menagih uang parkir',
      'Menerima komisi karena telah sukses mengarahkan pelanggan untuk bertransaksi di website e-commerce mitra',
      'Menyewakan alamat email customer',
      'C'
    ]
  ])
}

export function getMultipleChoiceQuestionsForMaterial(materialId: string): QuestionMC[] {
  return docxMultipleChoiceQuestionBank[materialId] ?? []
}

export const totalDocxQuestionCount = Object.values(docxMultipleChoiceQuestionBank).reduce(
  (total, questions) => total + questions.length,
  0
)
