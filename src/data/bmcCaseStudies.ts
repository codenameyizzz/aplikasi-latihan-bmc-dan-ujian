import { BmcBlockId, BmcCaseStudy } from '../types'

export const orderedBmcBlockIds: BmcBlockId[] = ['KP', 'KA', 'KR', 'VP', 'CR', 'CH', 'CS', 'C$', 'R$']

function buildAnswerKey(items: Record<BmcBlockId, string[]>) {
  return items
}

export const bmcCaseStudies: BmcCaseStudy[] = [
  {
    id: 'healthy-meal-subscription',
    title: 'Studi Kasus 1: HealthyBite Meal Subscription',
    shortTitle: 'HealthyBite',
    scenario:
      'HealthyBite adalah startup yang menjual paket makan siang sehat berlangganan untuk karyawan kantor di Jakarta. Pelanggan memilih paket mingguan lewat aplikasi, lalu makanan dikirim setiap hari kerja sebelum jam makan siang. Startup ini menekankan menu bergizi, variasi menu, dan ketepatan waktu. Untuk menghemat biaya, mereka tidak memasak sendiri, tetapi bekerja sama dengan cloud kitchen lokal dan partner logistik. Promosi utama dilakukan lewat Instagram, TikTok, referral kantor, dan kerja sama dengan HR perusahaan.',
    task:
      'Isi sembilan blok Business Model Canvas berdasarkan studi kasus ini. Gunakan nama blok BMC asli dalam bahasa Inggris, lalu jelaskan isi tiap blok secara spesifik sesuai konteks bisnis HealthyBite.',
    answerKey: buildAnswerKey({
      KP: [
        'Cloud kitchen atau mitra dapur produksi',
        'Partner logistik last-mile',
        'Pemasok bahan makanan sehat',
        'Payment gateway',
        'HR perusahaan atau komunitas kantor sebagai partner akuisisi'
      ],
      KA: [
        'Kurasi dan perencanaan menu sehat',
        'Pengelolaan aplikasi dan sistem pemesanan',
        'Koordinasi produksi dengan cloud kitchen',
        'Pengaturan pengiriman tepat waktu',
        'Pemasaran digital dan program referral'
      ],
      KR: [
        'Aplikasi atau platform pemesanan',
        'Brand HealthyBite',
        'Data pelanggan dan preferensi menu',
        'Tim operasional dan customer service',
        'Jaringan mitra dapur dan logistik'
      ],
      VP: [
        'Makan siang sehat yang praktis untuk pekerja kantoran',
        'Paket berlangganan yang memudahkan pemesanan rutin',
        'Variasi menu bergizi',
        'Pengiriman tepat waktu sebelum jam makan siang'
      ],
      CR: [
        'Subscription relationship',
        'Customer support via chat',
        'Program referral',
        'Personalized reminders atau rekomendasi menu',
        'Retention melalui kemudahan repeat order'
      ],
      CH: [
        'Aplikasi mobile atau web app',
        'Instagram dan TikTok',
        'Referral kantor',
        'Kerja sama B2B dengan perusahaan atau HR'
      ],
      CS: [
        'Karyawan kantor di kota besar',
        'Profesional sibuk yang ingin makan sehat',
        'Perusahaan yang ingin mendukung employee wellness'
      ],
      'C$': [
        'Biaya produksi makanan ke mitra dapur',
        'Biaya logistik pengiriman',
        'Biaya pengembangan dan maintenance aplikasi',
        'Biaya marketing digital',
        'Biaya customer service dan operasional'
      ],
      'R$': [
        'Biaya langganan mingguan atau bulanan',
        'Penjualan add-on seperti snack sehat atau minuman',
        'Paket korporat untuk perusahaan'
      ]
    }),
    gradingRubric: [
      {
        point: 'Kesesuaian blok',
        description: 'Jawaban menempatkan ide ke blok BMC yang tepat, tidak tertukar antara customers, channels, partners, dan lainnya.'
      },
      {
        point: 'Spesifik terhadap studi kasus',
        description: 'Isi kanvas menyebut detail yang memang muncul atau logis dari HealthyBite, bukan jawaban generik.'
      },
      {
        point: 'Kelengkapan sembilan blok',
        description: 'Semua blok BMC terisi dan masing-masing memuat poin inti yang cukup.'
      },
      {
        point: 'Logika model bisnis',
        description: 'Ada hubungan yang konsisten antara value proposition, segment, channels, revenue, dan cost.'
      }
    ]
  },
  {
    id: 'mentorloop-edtech',
    title: 'Studi Kasus 2: MentorLoop Career Platform',
    shortTitle: 'MentorLoop',
    scenario:
      'MentorLoop adalah platform edtech yang mempertemukan mahasiswa dan fresh graduate dengan mentor praktisi industri untuk sesi mentoring karier, review CV, mock interview, dan kelas singkat. Platform ini menawarkan sesi gratis terbatas untuk akuisisi awal, lalu menjual paket premium, kelas bootcamp, dan layanan perusahaan kampus. MentorLoop mengandalkan website, webinar gratis, konten LinkedIn, dan komunitas Telegram. Keunggulan utamanya adalah akses mentor industri yang relevan dan feedback yang praktis untuk membantu pengguna lebih cepat mendapatkan pekerjaan.',
    task:
      'Susun Business Model Canvas lengkap untuk MentorLoop. Isi tiap blok dengan elemen yang paling penting dan jelaskan hubungan antarblok secara logis.',
    answerKey: buildAnswerKey({
      KP: [
        'Mentor praktisi industri',
        'Kampus atau organisasi mahasiswa',
        'Payment gateway',
        'Penyedia webinar atau video platform',
        'Perusahaan rekrutmen atau komunitas karier'
      ],
      KA: [
        'Mengembangkan dan memelihara platform',
        'Merekrut dan mengelola mentor',
        'Menjadwalkan sesi mentoring',
        'Membuat konten webinar dan kelas',
        'Pemasaran konten dan community building'
      ],
      KR: [
        'Platform website atau aplikasi',
        'Jaringan mentor berkualitas',
        'Brand dan reputasi',
        'Database pengguna',
        'Tim produk, operasi, dan support'
      ],
      VP: [
        'Akses langsung ke mentor industri',
        'Feedback praktis untuk CV, interview, dan kesiapan kerja',
        'Belajar karier yang lebih personal dibanding kelas umum',
        'Membantu mahasiswa dan fresh graduate lebih cepat siap kerja'
      ],
      CR: [
        'Community-based relationship',
        'Personal assistance melalui mentor',
        'Email atau chat follow-up',
        'Freemium untuk akuisisi lalu premium untuk pendalaman',
        'Retention lewat komunitas dan progress learning'
      ],
      CH: [
        'Website platform',
        'Webinar gratis',
        'LinkedIn content',
        'Telegram community',
        'Partnership kampus'
      ],
      CS: [
        'Mahasiswa tingkat akhir',
        'Fresh graduate',
        'Career switcher junior',
        'Kampus atau organisasi yang ingin layanan pengembangan karier'
      ],
      'C$': [
        'Fee mentor atau revenue share',
        'Biaya pengembangan platform',
        'Biaya marketing dan webinar',
        'Biaya operasi komunitas dan support',
        'Biaya tools digital'
      ],
      'R$': [
        'Paket mentoring premium',
        'Biaya bootcamp atau kelas singkat',
        'Layanan B2B untuk kampus atau organisasi',
        'Add-on seperti review CV atau mock interview'
      ]
    }),
    gradingRubric: [
      {
        point: 'Segmentasi pelanggan tepat',
        description: 'Jawaban membedakan pengguna individu dan kemungkinan pelanggan institusional seperti kampus.'
      },
      {
        point: 'Value proposition relevan',
        description: 'Nilai utama harus menekankan akses mentor industri dan feedback karier yang praktis.'
      },
      {
        point: 'Revenue dan cost realistis',
        description: 'Jawaban menunjukkan sumber pendapatan dan biaya utama yang masuk akal untuk platform mentoring.'
      },
      {
        point: 'Konsistensi platform',
        description: 'Partners, activities, dan resources selaras dengan bisnis digital berbasis mentor.'
      }
    ]
  },
  {
    id: 'refill-mobile',
    title: 'Studi Kasus 3: EcoFill Refill Delivery',
    shortTitle: 'EcoFill',
    scenario:
      'EcoFill adalah bisnis refill produk rumah tangga seperti sabun cuci, sabun mandi, dan pembersih lantai dengan konsep ramah lingkungan. Pelanggan memesan isi ulang lewat WhatsApp dan Instagram, lalu tim EcoFill datang ke area perumahan menggunakan motor listrik untuk mengisi ulang wadah pelanggan atau menukar botol standar. Target utamanya adalah keluarga muda urban yang ingin mengurangi sampah plastik tetapi tetap ingin belanja praktis. EcoFill bekerja sama dengan produsen cairan curah, komunitas zero waste, dan beberapa kompleks perumahan untuk aktivasi. Pendapatan berasal dari penjualan produk isi ulang dan paket langganan bulanan.',
    task:
      'Buat Business Model Canvas untuk EcoFill berdasarkan informasi studi kasus. Jelaskan isi tiap blok dengan poin-poin yang operasional dan tidak terlalu umum.',
    answerKey: buildAnswerKey({
      KP: [
        'Produsen produk curah',
        'Komunitas zero waste',
        'Pengelola kompleks perumahan',
        'Pemasok botol atau wadah standar',
        'Mitra pembayaran digital'
      ],
      KA: [
        'Pengadaan produk curah',
        'Operasional refill dan pengantaran',
        'Koordinasi jadwal kunjungan ke perumahan',
        'Edukasi pelanggan soal gaya hidup minim sampah',
        'Pemasaran via WhatsApp dan Instagram'
      ],
      KR: [
        'Motor listrik atau armada pengantaran',
        'Stok produk curah',
        'Botol standar atau wadah refill',
        'Brand yang identik dengan eco-living',
        'Tim operasional lapangan'
      ],
      VP: [
        'Belanja kebutuhan rumah tangga yang lebih ramah lingkungan',
        'Mengurangi sampah plastik sekali pakai',
        'Praktis karena refill dikirim ke rumah',
        'Pilihan langganan rutin untuk kebutuhan bulanan'
      ],
      CR: [
        'Personal service via chat',
        'Edukasi dan komunitas',
        'Subscription untuk repeat order',
        'Retention melalui kemudahan reorder dan jadwal rutin'
      ],
      CH: [
        'WhatsApp',
        'Instagram',
        'Aktivasi di kompleks perumahan',
        'Komunitas zero waste'
      ],
      CS: [
        'Keluarga muda urban',
        'Rumah tangga peduli lingkungan',
        'Warga kompleks perumahan yang ingin praktis'
      ],
      'C$': [
        'Biaya pembelian produk curah',
        'Biaya operasional pengiriman',
        'Biaya wadah atau botol',
        'Biaya promosi komunitas dan digital',
        'Biaya tenaga kerja operasional'
      ],
      'R$': [
        'Penjualan refill satuan',
        'Paket langganan bulanan',
        'Bundling paket kebutuhan rumah tangga'
      ]
    }),
    gradingRubric: [
      {
        point: 'Nilai lingkungan dan kepraktisan',
        description: 'Jawaban menangkap dua nilai utama: eco-friendly dan convenience.'
      },
      {
        point: 'Operasi lapangan jelas',
        description: 'Key activities, key resources, dan cost structure harus mencerminkan operasional refill delivery.'
      },
      {
        point: 'Segment dan channel sesuai',
        description: 'Customer segment dan channel harus cocok dengan keluarga muda urban dan komunitas perumahan.'
      },
      {
        point: 'Monetisasi masuk akal',
        description: 'Revenue streams harus sesuai dengan penjualan refill dan model subscription.'
      }
    ]
  },
  {
    id: 'classpod-studio',
    title: 'Studi Kasus 4: ClassPod Creator Studio',
    shortTitle: 'ClassPod',
    scenario:
      'ClassPod adalah studio kecil yang membantu dosen, trainer, dan konsultan mengubah materi presentasi mereka menjadi kelas online berbayar. Tim ClassPod menawarkan jasa rekaman video, editing, desain slide, upload ke LMS, dan strategi launching. Mereka juga memiliki opsi bagi hasil jika klien belum mampu membayar penuh di awal. ClassPod memasarkan layanan melalui portofolio website, Instagram, referral klien lama, dan workshop gratis untuk calon pengajar. Nilai utama yang ditawarkan adalah mempercepat proses digitalisasi materi tanpa klien harus membangun tim produksi sendiri.',
    task:
      'Lengkapi Business Model Canvas untuk ClassPod. Pastikan tiap blok menjelaskan bagaimana bisnis jasa ini menciptakan nilai, bekerja, dan menghasilkan uang.',
    answerKey: buildAnswerKey({
      KP: [
        'Freelance videografer atau editor',
        'Platform LMS atau course hosting',
        'Pembayaran digital',
        'Komunitas trainer atau akademisi',
        'Mitra studio atau sewa alat'
      ],
      KA: [
        'Produksi video dan editing',
        'Desain slide dan packaging kelas',
        'Onboarding klien dan konsultasi',
        'Uploading course ke LMS',
        'Promosi, workshop gratis, dan portofolio marketing'
      ],
      KR: [
        'Tim kreatif dan produksi',
        'Peralatan rekaman dan software editing',
        'Portofolio proyek',
        'Brand dan jaringan klien',
        'Template workflow produksi'
      ],
      VP: [
        'Membantu ahli materi membuat kelas online tanpa membangun tim sendiri',
        'Mempercepat digitalisasi materi',
        'Paket end-to-end dari produksi sampai launching',
        'Opsi bagi hasil untuk klien dengan modal terbatas'
      ],
      CR: [
        'Dedicated assistance atau project-based relationship',
        'Konsultasi intensif selama produksi',
        'Referral dari klien puas',
        'Hubungan jangka panjang untuk produksi seri kelas berikutnya'
      ],
      CH: [
        'Website portofolio',
        'Instagram',
        'Workshop gratis',
        'Referral klien lama'
      ],
      CS: [
        'Dosen',
        'Trainer',
        'Konsultan',
        'Subject matter expert yang ingin menjual kelas online'
      ],
      'C$': [
        'Biaya SDM kreatif dan editor',
        'Biaya alat dan software produksi',
        'Biaya marketing dan workshop',
        'Biaya operasional proyek'
      ],
      'R$': [
        'Fee jasa produksi proyek',
        'Revenue sharing dari penjualan kelas',
        'Paket add-on seperti launching support atau desain tambahan'
      ]
    }),
    gradingRubric: [
      {
        point: 'Logika bisnis jasa terlihat',
        description: 'Jawaban harus menunjukkan bahwa ini adalah service business berbasis proyek dan kapabilitas tim.'
      },
      {
        point: 'Value proposition kuat',
        description: 'Nilai utama harus menekankan percepatan produksi kelas online dan kemudahan bagi klien.'
      },
      {
        point: 'Partners dan resources tepat',
        description: 'Mitra dan sumber daya harus mencerminkan produksi konten digital.'
      },
      {
        point: 'Revenue model jelas',
        description: 'Jawaban perlu menyebut fee jasa, bagi hasil, atau add-on yang relevan.'
      }
    ]
  }
]

export const totalBmcCaseStudies = bmcCaseStudies.length
