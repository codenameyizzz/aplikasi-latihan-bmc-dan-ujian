import { BmcBlockId, BmcCaseStudy } from '../types'

export const orderedBmcBlockIds: BmcBlockId[] = ['KP', 'KA', 'KR', 'VP', 'CR', 'CH', 'CS', 'C$', 'R$']

function buildAnswerKey(items: Record<BmcBlockId, string[]>) {
  return items
}

function buildChannelPhaseAnswerKey(input: {
  awareness: string
  evaluation: string
  purchase: string
  delivery: string
  afterSales: string
}) {
  return [
    `Awareness: ${input.awareness}`,
    `Evaluation: ${input.evaluation}`,
    `Purchase: ${input.purchase}`,
    `Delivery: ${input.delivery}`,
    `After Sales: ${input.afterSales}`
  ]
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
      CH: buildChannelPhaseAnswerKey({
        awareness: 'Instagram, TikTok, dan kerja sama HR perusahaan membangun awareness awal terhadap solusi makan siang sehat.',
        evaluation: 'Website atau aplikasi, testimoni pelanggan kantor, dan informasi menu membantu calon pelanggan mengevaluasi kualitas, variasi, dan ketepatan layanan.',
        purchase: 'Pelanggan membeli atau berlangganan lewat aplikasi atau web app dengan pembayaran digital.',
        delivery: 'Makanan dikirim setiap hari kerja melalui partner logistik ke kantor pelanggan sebelum jam makan siang.',
        afterSales: 'Customer support via chat, penanganan komplain keterlambatan, dan follow-up kepuasan menjaga hubungan pasca pembelian.'
      }),
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
      CH: buildChannelPhaseAnswerKey({
        awareness: 'Konten LinkedIn, webinar gratis, dan partnership kampus membangun awareness target mahasiswa dan fresh graduate.',
        evaluation: 'Landing page, profil mentor, contoh hasil mentoring, dan diskusi di komunitas Telegram membantu calon user menilai kualitas layanan.',
        purchase: 'Pembelian paket mentoring, bootcamp, atau layanan kampus dilakukan melalui website platform dengan payment gateway.',
        delivery: 'Sesi mentoring, kelas singkat, webinar, dan materi digital disampaikan lewat platform online dan tools video conference.',
        afterSales: 'Follow-up via email atau komunitas, support lanjutan, dan akses komunitas membantu retention serta pengalaman pasca sesi.'
      }),
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
      CH: buildChannelPhaseAnswerKey({
        awareness: 'Instagram, komunitas zero waste, dan aktivasi di kompleks perumahan membangun kesadaran tentang refill ramah lingkungan.',
        evaluation: 'Chat WhatsApp, konten edukasi, dan testimoni pelanggan membantu calon customer membandingkan manfaat eco-friendly dan kepraktisan layanan.',
        purchase: 'Pelanggan memesan refill satuan atau paket langganan melalui WhatsApp atau Instagram DM.',
        delivery: 'Tim EcoFill datang ke rumah dengan motor listrik untuk refill langsung atau menukar botol standar.',
        afterSales: 'Pengingat reorder, respons komplain, dan edukasi lanjutan menjaga kepuasan serta repeat order.'
      }),
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
      CH: buildChannelPhaseAnswerKey({
        awareness: 'Website portofolio, Instagram, dan workshop gratis memperkenalkan layanan produksi kelas online kepada calon klien.',
        evaluation: 'Portofolio proyek, studi hasil, dan diskusi konsultasi membantu dosen atau trainer mengevaluasi kualitas ClassPod.',
        purchase: 'Klien membeli paket jasa produksi atau menyetujui skema revenue sharing melalui proses proposal dan negosiasi.',
        delivery: 'ClassPod mengirim value melalui rekaman video, editing, desain slide, upload ke LMS, dan support launching.',
        afterSales: 'Revisi pasca produksi, dukungan teknis, dan penawaran proyek lanjutan menjaga hubungan jangka panjang.'
      }),
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
  },
  {
    id: 'ruralmed-telehealth-network',
    title: 'Studi Kasus 5: RuralMed Telehealth Network',
    shortTitle: 'RuralMed',
    scenario:
      'RuralMed adalah startup healthtech yang ingin memperluas akses konsultasi kesehatan dasar untuk masyarakat di kota tier-2 dan daerah pinggiran yang masih kesulitan mengakses dokter umum maupun layanan follow-up pasca konsultasi. Platform ini tidak hanya menyediakan aplikasi telekonsultasi, tetapi juga membangun jaringan hybrid: aplikasi mobile untuk pasien, agen kesehatan komunitas di kecamatan, kerja sama dengan klinik lokal, laboratorium mitra, dan apotek mitra untuk pengambilan obat. Segmen pelanggannya tidak tunggal. Ada pasien individu dengan daya beli terbatas, perusahaan perkebunan yang ingin menyediakan benefit kesehatan untuk pekerja lapangan, serta pemerintah daerah yang tertarik menjalankan program pilot layanan kesehatan digital. Model bisnisnya menjadi rumit karena tiap segmen membutuhkan cara akuisisi, proses evaluasi, pembelian, dan pelayanan yang berbeda. Bagi pasien individu, RuralMed perlu membangun trust terkait kredibilitas dokter, keamanan data, dan kemudahan penggunaan aplikasi. Bagi klien B2B dan B2G, RuralMed harus menjual solusi berbasis dashboard, SLA layanan, serta kemampuan integrasi dengan sistem laporan kesehatan. Di sisi operasional, startup ini bergantung pada dokter umum freelance, mitra klinik, penyedia cloud, laboratorium untuk tes lanjutan, apotek untuk fulfilment resep, dan agen komunitas yang membantu onboarding pengguna non-digital. Di sisi keuangan, ada biaya besar pada teknologi, akuisisi dan edukasi pasar, pelatihan agen, customer support 24/7, kepatuhan regulasi, serta quality control layanan medis. Pendapatan dapat berasal dari biaya konsultasi per sesi, paket langganan keluarga, kontrak korporasi tahunan, fee koordinasi tes laboratorium, dan white-label dashboard untuk institusi.',
    task:
      'Susun Business Model Canvas yang mendalam untuk RuralMed. Jangan berhenti pada jawaban umum. Untuk blok Channels, jawaban harus dibagi mengikuti lima fase: Awareness, Evaluation, Purchase, Delivery, dan After Sales. Tunjukkan juga bagaimana perbedaan channel antara segmen individu, perusahaan, dan pemerintah memengaruhi desain model bisnis secara keseluruhan.',
    answerKey: buildAnswerKey({
      KP: [
        'Dokter umum freelance atau jaringan tenaga medis',
        'Klinik lokal sebagai mitra pemeriksaan lanjutan',
        'Laboratorium mitra',
        'Apotek mitra untuk fulfilment resep',
        'Agen kesehatan komunitas untuk onboarding',
        'Cloud provider dan infrastruktur teknologi',
        'Mitra institusional seperti perusahaan perkebunan dan pemerintah daerah'
      ],
      KA: [
        'Pengembangan dan maintenance aplikasi telehealth',
        'Verifikasi, penjadwalan, dan quality control dokter',
        'Koordinasi rujukan ke klinik, laboratorium, dan apotek',
        'Onboarding serta edukasi pasien melalui agen komunitas',
        'Penjualan solusi B2B/B2G dan pengelolaan dashboard institusional',
        'Customer support dan follow-up pasca konsultasi',
        'Kepatuhan regulasi serta pengelolaan data kesehatan'
      ],
      KR: [
        'Platform aplikasi pasien dan dashboard institusional',
        'Jaringan dokter, klinik, laboratorium, dan apotek',
        'Brand trust dan kredibilitas medis',
        'Data pasien, data operasional, dan sistem keamanan',
        'Tim teknologi, operasi kesehatan, sales institusi, dan support',
        'Jaringan agen kesehatan komunitas'
      ],
      VP: [
        'Akses kesehatan dasar yang lebih mudah untuk wilayah dengan akses dokter terbatas',
        'Model hybrid yang menggabungkan aplikasi digital dan pendampingan komunitas',
        'Layanan terintegrasi dari konsultasi sampai resep dan tes lanjutan',
        'Solusi kesehatan digital yang bisa dipakai individu, perusahaan, dan pemerintah',
        'Meningkatkan trust melalui dukungan lokal dan partner kesehatan resmi'
      ],
      CR: [
        'Self-service dan assisted service melalui aplikasi',
        'Personal assistance melalui agen komunitas dan customer support',
        'Relationship jangka panjang melalui subscription keluarga atau kontrak institusi',
        'After-care dan follow-up untuk menjaga kepercayaan serta retensi',
        'Account management untuk klien perusahaan dan pemerintah'
      ],
      CH: buildChannelPhaseAnswerKey({
        awareness: 'Untuk pasien individu, awareness dibangun lewat agen komunitas, edukasi kesehatan lokal, media sosial, dan rekomendasi klinik; untuk perusahaan dan pemerintah melalui presentasi solusi, proposal, networking sektor kesehatan, dan pilot project.',
        evaluation: 'Pasien mengevaluasi lewat testimoni, informasi dokter, reputasi mitra klinik, dan kemudahan aplikasi; perusahaan dan pemerintah mengevaluasi lewat demo dashboard, SLA, keamanan data, harga, dan bukti hasil pilot.',
        purchase: 'Pasien membeli sesi konsultasi atau paket keluarga lewat aplikasi atau dibantu agen; perusahaan dan pemerintah membeli melalui kontrak layanan, proposal, dan negosiasi institusional.',
        delivery: 'Value dikirim melalui telekonsultasi dalam aplikasi, bantuan agen komunitas, rujukan ke klinik atau laboratorium, serta fulfilment resep lewat apotek mitra.',
        afterSales: 'After sales mencakup follow-up kondisi pasien, bantuan penggunaan aplikasi, dukungan customer service, laporan performa untuk institusi, dan pembaruan kontrak atau perluasan layanan.'
      }),
      CS: [
        'Pasien individu di kota tier-2 dan daerah pinggiran',
        'Keluarga dengan akses kesehatan terbatas',
        'Perusahaan perkebunan atau industri lapangan',
        'Pemerintah daerah atau dinas yang menjalankan program kesehatan digital'
      ],
      'C$': [
        'Biaya pengembangan aplikasi dan cloud infrastructure',
        'Fee dokter dan tenaga medis',
        'Biaya akuisisi pasar serta edukasi pengguna',
        'Biaya pelatihan dan insentif agen komunitas',
        'Biaya customer support 24/7',
        'Biaya kepatuhan regulasi, keamanan data, dan quality control',
        'Biaya integrasi dengan mitra klinik, lab, dan apotek'
      ],
      'R$': [
        'Biaya konsultasi per sesi',
        'Paket langganan keluarga',
        'Kontrak tahunan korporasi',
        'Fee koordinasi tes laboratorium atau layanan tambahan',
        'White-label dashboard atau lisensi solusi untuk institusi'
      ]
    }),
    gradingRubric: [
      {
        point: 'Kedalaman multi-segment',
        description: 'Jawaban harus menunjukkan bahwa segmen individu, perusahaan, dan pemerintah memiliki kebutuhan serta channel yang berbeda.'
      },
      {
        point: 'Format Channels lima fase',
        description: 'Blok Channels wajib dibagi ke Awareness, Evaluation, Purchase, Delivery, dan After Sales dengan isi yang relevan.'
      },
      {
        point: 'Integrasi model hybrid',
        description: 'Jawaban harus menangkap kombinasi digital, agen komunitas, dan mitra kesehatan fisik sebagai bagian model bisnis.'
      },
      {
        point: 'Konsistensi operasional dan finansial',
        description: 'Partners, activities, resources, cost, dan revenue harus saling mendukung dan realistis.'
      }
    ]
  },
  {
    id: 'circuprint-b2b-platform',
    title: 'Studi Kasus 6: CircuPrint Sustainable Packaging Platform',
    shortTitle: 'CircuPrint',
    scenario:
      'CircuPrint adalah startup B2B yang membantu brand makanan, kosmetik, dan UMKM premium beralih dari kemasan konvensional ke kemasan yang lebih berkelanjutan tanpa mengorbankan kualitas visual, ketahanan distribusi, dan efisiensi biaya. Bisnis ini tidak sekadar menjual kemasan jadi. CircuPrint membangun platform konsultatif yang menggabungkan marketplace supplier, studio desain kemasan, kalkulator dampak lingkungan, dashboard reorder, dan layanan sourcing untuk bahan khusus. Klien datang dengan kebutuhan yang sangat beragam: ada UMKM yang hanya butuh kemasan stok kecil dan desain cepat, ada brand menengah yang butuh custom packaging untuk kampanye musiman, dan ada enterprise yang menuntut audit jejak material, sertifikasi, dan integrasi pengadaan ke sistem internal mereka. Tantangan terbesarnya adalah proses keputusan pembelian klien cenderung panjang dan melibatkan banyak pihak seperti owner, tim branding, procurement, quality assurance, bahkan tim sustainability. Karena itu, blok Channels tidak bisa dijawab hanya dengan menyebut website atau sales. Harus terlihat bagaimana CircuPrint menciptakan awareness, membantu evaluation teknis, memfasilitasi purchase yang kompleks, memastikan delivery sesuai spesifikasi, dan menyediakan after sales agar klien terus reorder. Di sisi partner, startup ini bergantung pada pabrik kemasan, supplier material ramah lingkungan, mitra logistik, konsultan sertifikasi, serta software vendor untuk dashboard dan kalkulator. Di sisi biaya, mereka menanggung biaya pengembangan platform, tim desain dan sourcing, biaya sample, edukasi pasar, quality assurance, serta layanan account management. Pendapatan berasal dari margin penjualan kemasan, fee desain, subscription dashboard reorder, consulting fee untuk proyek sustainability, dan kontrak enterprise jangka panjang.',
    task:
      'Buat Business Model Canvas yang lengkap dan analitis untuk CircuPrint. Jelaskan hubungan antarblok secara strategis. Khusus untuk blok Channels, jawaban harus mengikuti lima fase: Awareness, Evaluation, Purchase, Delivery, dan After Sales, serta harus mencerminkan proses B2B yang panjang dan melibatkan banyak pengambil keputusan.',
    answerKey: buildAnswerKey({
      KP: [
        'Pabrik kemasan dan converter',
        'Supplier material ramah lingkungan',
        'Mitra logistik',
        'Konsultan sertifikasi dan sustainability',
        'Vendor software untuk dashboard, kalkulator, dan platform',
        'Studio desain atau freelancer packaging specialist'
      ],
      KA: [
        'Mengembangkan dan memelihara platform sourcing serta reorder',
        'Konsultasi kebutuhan kemasan dan sustainability',
        'Desain kemasan dan pembuatan sample',
        'Sourcing supplier yang sesuai spesifikasi klien',
        'Quality assurance dan koordinasi produksi',
        'Penjualan B2B dan account management',
        'Edukasi pasar tentang packaging berkelanjutan'
      ],
      KR: [
        'Platform digital dan dashboard reorder',
        'Jaringan supplier dan pabrik kemasan',
        'Keahlian desain, sourcing, dan sustainability',
        'Data spesifikasi klien dan histori reorder',
        'Brand trust sebagai partner packaging berkelanjutan',
        'Tim sales konsultatif dan account management'
      ],
      VP: [
        'Memudahkan brand beralih ke kemasan lebih berkelanjutan tanpa kehilangan kualitas dan fungsi',
        'Satu platform untuk sourcing, desain, reorder, dan insight sustainability',
        'Mengurangi kompleksitas pencarian supplier dan validasi material',
        'Membantu klien mengambil keputusan packaging yang lebih cepat dan lebih terukur',
        'Menyediakan solusi dari UMKM sampai enterprise'
      ],
      CR: [
        'Consultative relationship untuk onboarding proyek',
        'Dedicated account management untuk klien menengah dan enterprise',
        'Self-service reorder melalui dashboard untuk klien yang sudah aktif',
        'Long-term relationship melalui proyek berulang dan kontrak enterprise'
      ],
      CH: buildChannelPhaseAnswerKey({
        awareness: 'Awareness dibangun lewat konten edukasi packaging berkelanjutan, studi kasus, webinar B2B, pameran industri, LinkedIn, dan jaringan partner sustainability.',
        evaluation: 'Calon klien mengevaluasi melalui konsultasi teknis, sample kemasan, simulasi biaya, kalkulator dampak lingkungan, sertifikasi material, dan referensi proyek sebelumnya.',
        purchase: 'Purchase dilakukan melalui proposal, negosiasi spesifikasi, approval procurement, kontrak, atau pemesanan ulang melalui dashboard bagi klien existing.',
        delivery: 'Delivery mencakup koordinasi desain final, produksi dengan supplier, quality assurance, pengiriman logistik, dan dashboard tracking sesuai spesifikasi klien.',
        afterSales: 'After sales meliputi evaluasi hasil penggunaan kemasan, penanganan issue kualitas, dashboard reorder, review performa supplier, dan upsell proyek sustainability lanjutan.'
      }),
      CS: [
        'UMKM premium yang butuh kemasan menarik dan berkelanjutan',
        'Brand makanan dan kosmetik skala menengah',
        'Enterprise dengan kebutuhan sertifikasi, audit material, dan integrasi procurement'
      ],
      'C$': [
        'Biaya pengembangan platform dan software',
        'Biaya tim desain, sourcing, dan account management',
        'Biaya sample dan prototyping',
        'Biaya marketing edukatif B2B dan event industri',
        'Biaya quality assurance dan koordinasi supplier',
        'Biaya support klien enterprise'
      ],
      'R$': [
        'Margin penjualan kemasan',
        'Fee desain kemasan',
        'Subscription dashboard reorder',
        'Consulting fee proyek sustainability',
        'Kontrak enterprise jangka panjang'
      ]
    }),
    gradingRubric: [
      {
        point: 'Kedalaman proses B2B',
        description: 'Jawaban harus menunjukkan bahwa pembelian melibatkan banyak pihak dan proses keputusan yang tidak singkat.'
      },
      {
        point: 'Format Channels lima fase',
        description: 'Blok Channels harus dipecah ke Awareness, Evaluation, Purchase, Delivery, dan After Sales dengan isi teknis yang sesuai.'
      },
      {
        point: 'Konsistensi value dan operasi',
        description: 'Value proposition harus benar-benar didukung oleh partners, activities, dan resources yang relevan.'
      },
      {
        point: 'Realisme monetisasi',
        description: 'Revenue streams dan cost structure harus realistis untuk platform B2B konsultatif.'
      }
    ]
  }
]

export const totalBmcCaseStudies = bmcCaseStudies.length
