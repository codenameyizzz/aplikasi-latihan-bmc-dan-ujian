import { QuestionEssay, QuestionMC } from '../types'
import customerRelationshipsPdfUrl from '../../materials/10_TEKNO_Customer_Relationship_Riyanthi.pdf?url'
import revenueStreamsPdfUrl from '../../materials/11_TEKNO_Revenue_Stream_Riyanthi.pdf?url'
import keyPartnersPdfUrl from '../../materials/12_TEKNO_Key_Partners_Riyanthi.pdf?url'
import keyActResourcesCostPdfUrl from '../../materials/13_TEKNO_KeyAct_KeyResources_Cost_Riyanthi.pdf?url'
import financialManagementPptxUrl from '../../materials/Cost_Structure_Financial_Management.pptx?url'

export interface MaterialFlashcard {
  id: string
  front: string
  back: string
  bullets: string[]
}

export interface StudyMaterial {
  id: string
  shortTitle: string
  title: string
  sourceFile: string
  sourceHref: string
  sourceType: 'pdf' | 'pptx'
  summary: string
  focusAreas: string[]
  flashcards: MaterialFlashcard[]
  quizQuestions: QuestionMC[]
  essayQuestions: QuestionEssay[]
}

export const studyMaterials: StudyMaterial[] = [
  {
    id: 'customer-relationships',
    shortTitle: 'Customer Relationships',
    title: 'Customer Relationships, Get-Keep-Grow, dan AARRR',
    sourceFile: 'materials/10_TEKNO_Customer_Relationship_Riyanthi.pdf',
    sourceHref: customerRelationshipsPdfUrl,
    sourceType: 'pdf',
    summary:
      'Materi ini membahas peran blok Customer Relationships, enam jenis hubungan pelanggan, strategi get-keep-grow, pengembangan relationship pada channel fisik maupun web/mobile, dan customer lifecycle AARRR.',
    focusAreas: ['Jenis CR', 'Get Keep Grow', 'AARRR', 'Physical Channel', 'Web Mobile'],
    flashcards: [
      {
        id: 'cr_fc_1',
        front: 'Apa fungsi utama Customer Relationships dalam Business Model Canvas?',
        back:
          'Customer Relationships menjelaskan jenis hubungan yang dibangun perusahaan dengan customer segment tertentu untuk akuisisi, retensi, dan pertumbuhan nilai pelanggan.',
        bullets: [
          'Mempengaruhi customer experience secara keseluruhan',
          'Harus selaras dengan channel yang dipakai',
          'Mendukung get, keep, dan grow customers'
        ]
      },
      {
        id: 'cr_fc_2',
        front: 'Sebutkan enam jenis Customer Relationships yang dijelaskan di materi.',
        back:
          'Enam jenis utamanya adalah personal assistance, dedicated personal assistance, self-service, automated services, communities, dan co-creation.',
        bullets: [
          'Personal assistance berbasis interaksi manusia',
          'Automated services menggabungkan self-service dengan otomasi',
          'Co-creation melibatkan pelanggan membentuk nilai bersama perusahaan'
        ]
      },
      {
        id: 'cr_fc_3',
        front: 'Apa arti strategi get, keep, grow customers?',
        back:
          'Get berarti menarik pelanggan baru, keep berarti mempertahankan pelanggan yang sudah ada, dan grow berarti meningkatkan nilai transaksi, frekuensi, atau referral dari pelanggan tersebut.',
        bullets: [
          'Get terkait demand creation',
          'Keep terkait retention dan loyalty',
          'Grow terkait upselling, cross-selling, dan referral'
        ]
      },
      {
        id: 'cr_fc_4',
        front: 'Apa itu AARRR Framework?',
        back:
          'AARRR adalah lima metrik perilaku pengguna: acquisition, activation, retention, referral, dan revenue.',
        bullets: [
          'Acquisition: bagaimana user datang',
          'Activation: pengalaman awal yang memberi value',
          'Retention, referral, dan revenue menilai kualitas pertumbuhan'
        ]
      },
      {
        id: 'cr_fc_5',
        front: 'Apa perbedaan fokus Customer Relationships pada channel fisik dan web/mobile?',
        back:
          'Channel fisik menekankan awareness, purchase, loyalty, dan upselling melalui interaksi langsung, sedangkan web/mobile lebih menekankan acquisition, activation, retention, referral, dan revenue berbasis perilaku digital.',
        bullets: [
          'Physical channel banyak memakai promosi toko, layanan, dan loyalty point',
          'Web/mobile memakai search, app store, email, viral, dan analytics',
          'Keduanya sama-sama mengejar pelanggan yang kembali dan bernilai'
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'cr_q_1',
        question:
          'Jika sebuah aplikasi belajar menampilkan profil online, riwayat penggunaan, dan rekomendasi otomatis tanpa campur tangan staf, jenis Customer Relationship yang paling tepat adalah...',
        options: [
          { key: 'A', text: 'Dedicated personal assistance' },
          { key: 'B', text: 'Automated services' },
          { key: 'C', text: 'Communities' },
          { key: 'D', text: 'Co-creation' }
        ],
        correctAnswer: 'B',
        explanation:
          'Automated services menggabungkan self-service dengan proses otomatis seperti profil, rekomendasi, dan personalisasi digital.',
        category: 'Jenis CR'
      },
      {
        id: 'cr_q_2',
        question:
          'Program loyalty point yang bertujuan membuat pelanggan tetap kembali paling langsung termasuk strategi...',
        options: [
          { key: 'A', text: 'Get' },
          { key: 'B', text: 'Keep' },
          { key: 'C', text: 'Grow' },
          { key: 'D', text: 'Referral' }
        ],
        correctAnswer: 'B',
        explanation:
          'Loyalty point terutama dipakai untuk retensi, sehingga masuk ke strategi keep customers.',
        category: 'Get Keep Grow'
      },
      {
        id: 'cr_q_3',
        question:
          'Urutan yang benar dalam AARRR Framework adalah...',
        options: [
          { key: 'A', text: 'Acquisition, Activation, Retention, Referral, Revenue' },
          { key: 'B', text: 'Activation, Acquisition, Retention, Revenue, Referral' },
          { key: 'C', text: 'Acquisition, Retention, Activation, Referral, Revenue' },
          { key: 'D', text: 'Awareness, Activation, Retention, Referral, Revenue' }
        ],
        correctAnswer: 'A',
        explanation:
          'Materi menjelaskan AARRR sebagai acquisition, activation, retention, referral, lalu revenue.',
        category: 'AARRR'
      },
      {
        id: 'cr_q_4',
        question:
          'Pada channel web/mobile, fase ketika pengguna pertama kali benar-benar merasakan manfaat inti produk disebut...',
        options: [
          { key: 'A', text: 'Acquisition' },
          { key: 'B', text: 'Activation' },
          { key: 'C', text: 'Retention' },
          { key: 'D', text: 'Revenue' }
        ],
        correctAnswer: 'B',
        explanation:
          'Activation adalah fase ketika pengguna bukan hanya datang, tetapi sudah mengalami value awal dari produk.',
        category: 'Web Mobile'
      },
      {
        id: 'cr_q_5',
        question:
          'Contoh co-creation yang paling sesuai dengan materi adalah...',
        options: [
          { key: 'A', text: 'Perusahaan menyediakan FAQ agar pelanggan membaca sendiri' },
          { key: 'B', text: 'Perusahaan menugaskan account manager khusus untuk satu klien' },
          { key: 'C', text: 'Pelanggan ikut memberi ulasan, ide, atau konten yang membentuk nilai layanan' },
          { key: 'D', text: 'Perusahaan menutup akses pelanggan ke komunitas pengguna' }
        ],
        correctAnswer: 'C',
        explanation:
          'Co-creation berarti perusahaan dan pelanggan bersama-sama membentuk nilai atau pengalaman, misalnya melalui ulasan, ide, atau kontribusi konten.',
        category: 'Jenis CR'
      }
    ],
    essayQuestions: [
      {
        id: 'cr_e_1',
        title: 'Essay 1: Customer Relationships untuk Kedai Buku dan Kopi',
        scenario:
          'Sebuah kedai buku dan kopi baru ingin membangun pelanggan tetap. Mereka memiliki toko fisik di dekat kampus, akun Instagram aktif, dan program stamp card manual. Pemilik ingin agar pelanggan bukan hanya datang sekali, tetapi rutin membeli kopi sambil membeli buku atau merchandise.',
        task:
          'Analisislah strategi Customer Relationships usaha tersebut dengan kerangka get, keep, dan grow. Sebutkan minimal 1 taktik yang cocok untuk masing-masing tahap dan jelaskan alasan pemilihannya.',
        suggestedAnswer:
          'Jawaban yang baik memetakan tiga tahap. Get dapat dilakukan lewat awareness dan consideration, misalnya promosi Instagram, kolaborasi komunitas kampus, atau event peluncuran. Keep dapat dilakukan lewat stamp card, pelayanan personal, atau follow-up ke pelanggan tetap. Grow dapat dilakukan lewat upselling pastry, bundling kopi + buku, membership, atau program referral. Argumen pentingnya adalah setiap taktik harus mendukung relasi jangka panjang, bukan hanya transaksi satu kali.',
        keywords: ['get', 'keep', 'grow', 'awareness', 'loyalty', 'retention', 'upselling', 'referral', 'personal assistance', 'customer relationships'],
        gradingRubric: [
          {
            point: 'Strategi Get',
            description: 'Menjelaskan cara menarik pelanggan awal, misalnya promosi, awareness, event, atau kolaborasi komunitas.'
          },
          {
            point: 'Strategi Keep',
            description: 'Menjelaskan cara mempertahankan pelanggan, misalnya loyalty, pelayanan personal, atau follow-up.'
          },
          {
            point: 'Strategi Grow',
            description: 'Menjelaskan cara menaikkan nilai pelanggan melalui upsell, cross-sell, bundling, atau referral.'
          },
          {
            point: 'Alasan dan Keterkaitan',
            description: 'Menjelaskan mengapa taktik tersebut cocok dengan konteks kedai fisik dan tujuan retensi.'
          }
        ]
      },
      {
        id: 'cr_e_2',
        title: 'Essay 2: AARRR untuk Aplikasi Konsultasi Gizi',
        scenario:
          'Sebuah startup membuat aplikasi konsultasi gizi berbasis mobile. Saat ini mereka sudah memiliki landing page, akun TikTok, free trial tujuh hari, dan fitur membagikan hasil diet ke teman. Namun banyak pengguna yang mengunduh aplikasi lalu berhenti di minggu pertama.',
        task:
          'Gunakan kerangka AARRR untuk menganalisis kondisi tersebut. Jelaskan tindakan apa yang perlu dibenahi pada minimal tiga tahap AARRR agar retention dan revenue meningkat.',
        suggestedAnswer:
          'Jawaban yang baik menghubungkan masalah ke beberapa tahap AARRR. Acquisition dapat dievaluasi dari kualitas traffic yang datang dari landing page atau TikTok. Activation perlu diperbaiki jika pengguna tidak cepat merasakan manfaat, misalnya onboarding dan first success moment harus diperjelas. Retention perlu diperkuat dengan reminder, personal progress tracking, atau interaksi rutin. Referral dapat dipakai dengan mekanisme ajak teman yang lebih bernilai. Revenue membaik jika pengguna berhasil bertahan dan melihat manfaat sehingga lebih bersedia berlangganan.',
        keywords: ['acquisition', 'activation', 'retention', 'referral', 'revenue', 'onboarding', 'trial', 'retention', 'customer lifecycle'],
        gradingRubric: [
          {
            point: 'Identifikasi Tahap AARRR',
            description: 'Mengidentifikasi minimal tiga tahap AARRR yang relevan dengan masalah pengguna berhenti di awal.'
          },
          {
            point: 'Perbaikan Activation atau Retention',
            description: 'Menjelaskan taktik perbaikan onboarding, early value, reminder, atau engagement lanjutan.'
          },
          {
            point: 'Keterkaitan dengan Revenue',
            description: 'Menjelaskan bahwa retention yang lebih baik akan mendorong revenue atau konversi berlangganan.'
          },
          {
            point: 'Argumen Logis',
            description: 'Menyusun alasan yang runtut dan sesuai dengan channel web/mobile.'
          }
        ]
      }
    ]
  },
  {
    id: 'revenue-streams',
    shortTitle: 'Revenue Streams',
    title: 'Revenue Streams, Revenue Model, dan Pricing Model',
    sourceFile: 'materials/11_TEKNO_Revenue_Stream_Riyanthi.pdf',
    sourceHref: revenueStreamsPdfUrl,
    sourceType: 'pdf',
    summary:
      'Materi ini menekankan peran Revenue Streams dalam BMC, perbedaan pendapatan transaksi dan berulang, berbagai model pendapatan, mekanisme harga tetap dan dinamis, serta kesalahan umum dalam penetapan harga.',
    focusAreas: ['Recurring Revenue', 'Revenue Model', 'Pricing Model', 'Licensing', 'Dynamic Pricing'],
    flashcards: [
      {
        id: 'rs_fc_1',
        front: 'Apa yang dimaksud Revenue Streams dalam Business Model Canvas?',
        back:
          'Revenue Streams adalah cara bisnis menghasilkan uang dari setiap customer segment dan bagaimana value yang diberikan diubah menjadi arus pemasukan.',
        bullets: [
          'Menjawab nilai apa yang dibayar pelanggan',
          'Harus dianalisis per segmen pelanggan',
          'Berbeda dari biaya atau cost structure'
        ]
      },
      {
        id: 'rs_fc_2',
        front: 'Apa dua jenis besar Revenue Streams yang dibahas dalam materi?',
        back:
          'Dua jenis utamanya adalah pendapatan transaksi satu kali dan pendapatan berulang yang datang dari pembayaran berkelanjutan.',
        bullets: [
          'Penjualan aset biasanya satu kali',
          'Subscription biasanya berulang',
          'Perbedaan ini memengaruhi stabilitas cash flow'
        ]
      },
      {
        id: 'rs_fc_3',
        front: 'Sebutkan beberapa contoh revenue model dari materi.',
        back:
          'Contoh revenue model meliputi asset sale, usage fee, subscription fees, lending-renting-leasing, licensing, brokerage fees, advertising, referral, dan affiliate revenue.',
        bullets: [
          'Satu bisnis bisa memakai beberapa model sekaligus',
          'Model harus sesuai dengan value proposition',
          'Channel web/mobile sering memakai kombinasi model'
        ]
      },
      {
        id: 'rs_fc_4',
        front: 'Apa perbedaan mekanisme harga tetap dan harga dinamis?',
        back:
          'Harga tetap memakai aturan yang konsisten seperti list price atau harga per fitur, sedangkan harga dinamis berubah menurut negosiasi, kapasitas, waktu, atau kondisi pasar.',
        bullets: [
          'Fixed pricing lebih mudah diprediksi',
          'Dynamic pricing lebih adaptif terhadap situasi',
          'Pemilihan bergantung pada karakter bisnis'
        ]
      },
      {
        id: 'rs_fc_5',
        front: 'Apa kesalahan umum dalam memahami atau menentukan Revenue Streams?',
        back:
          'Kesalahan umum adalah mengira Revenue Streams hanya soal harga atau menentukan harga semata-mata dari biaya internal ditambah markup tanpa melihat nilai dan kemauan bayar pelanggan.',
        bullets: [
          'Cost-based pricing murni sering menyesatkan',
          'Persepsi nilai pelanggan tetap penting',
          'Segmen dan mekanisme pembayaran harus ikut dipertimbangkan'
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'rs_q_1',
        question:
          'Pendapatan berulang paling tepat didefinisikan sebagai...',
        options: [
          { key: 'A', text: 'Pendapatan yang hanya muncul setelah promosi diskon' },
          { key: 'B', text: 'Pendapatan dari transaksi aset satu kali' },
          { key: 'C', text: 'Pendapatan dari pembayaran berkelanjutan seperti langganan' },
          { key: 'D', text: 'Pendapatan dari penurunan biaya produksi' }
        ],
        correctAnswer: 'C',
        explanation:
          'Recurring revenue berasal dari pembayaran berkelanjutan, misalnya membership atau subscription bulanan.',
        category: 'Recurring Revenue'
      },
      {
        id: 'rs_q_2',
        question:
          'Model pendapatan yang membuat pelanggan membayar semakin besar seiring makin sering layanan dipakai adalah...',
        options: [
          { key: 'A', text: 'Usage fee' },
          { key: 'B', text: 'Licensing' },
          { key: 'C', text: 'Advertising' },
          { key: 'D', text: 'Brokerage fee' }
        ],
        correctAnswer: 'A',
        explanation:
          'Usage fee dikenakan berdasarkan frekuensi atau intensitas pemakaian layanan, seperti biaya telepon atau utilitas.',
        category: 'Revenue Model'
      },
      {
        id: 'rs_q_3',
        question:
          'Jika perusahaan memperoleh pendapatan dengan memberi izin penggunaan hak kekayaan intelektual kepada pihak lain, model tersebut adalah...',
        options: [
          { key: 'A', text: 'Subscription fee' },
          { key: 'B', text: 'Licensing' },
          { key: 'C', text: 'Asset sale' },
          { key: 'D', text: 'Referral fee' }
        ],
        correctAnswer: 'B',
        explanation:
          'Licensing berarti perusahaan memperoleh revenue dengan memberikan izin penggunaan hak kekayaan intelektual seperti paten atau software.',
        category: 'Licensing'
      },
      {
        id: 'rs_q_4',
        question:
          'Contoh mekanisme harga dinamis yang disebut dalam materi adalah...',
        options: [
          { key: 'A', text: 'List price yang sama untuk semua pembeli' },
          { key: 'B', text: 'Harga berdasarkan kualitas fitur dengan tabel tetap' },
          { key: 'C', text: 'Negosiasi atau yield management' },
          { key: 'D', text: 'Markup biaya tetap pada semua kasus' }
        ],
        correctAnswer: 'C',
        explanation:
          'Harga dinamis berubah mengikuti kondisi transaksi atau pasar, termasuk negosiasi dan yield management.',
        category: 'Pricing Model'
      },
      {
        id: 'rs_q_5',
        question:
          'Kesalahan penetapan harga berbasis biaya murni adalah...',
        options: [
          { key: 'A', text: 'Memperhatikan willingness to pay pelanggan' },
          { key: 'B', text: 'Mengabaikan persepsi nilai dan hanya menambah markup di atas biaya' },
          { key: 'C', text: 'Membandingkan opsi fixed dan dynamic pricing' },
          { key: 'D', text: 'Mengkaji kontribusi tiap revenue stream' }
        ],
        correctAnswer: 'B',
        explanation:
          'Materi menekankan bahwa cost-based pricing murni keliru jika mengabaikan nilai yang dirasakan pelanggan dan kondisi pasar.',
        category: 'Pricing Mistake'
      }
    ],
    essayQuestions: [
      {
        id: 'rs_e_1',
        title: 'Essay 1: Revenue Model untuk Platform Gym Hybrid',
        scenario:
          'Sebuah gym ingin menambah aplikasi mobile pendamping latihan. Manajemen mempertimbangkan beberapa pilihan: biaya pendaftaran sekali bayar, membership bulanan, biaya konsultasi personal per sesi, serta penjualan merchandise dan iklan dari brand suplemen.',
        task:
          'Rancang kombinasi Revenue Streams yang paling masuk akal untuk bisnis tersebut. Jelaskan minimal tiga aliran pendapatan dan kaitkan masing-masing dengan value yang diterima pelanggan.',
        suggestedAnswer:
          'Jawaban yang baik memilih beberapa revenue streams yang saling melengkapi. Membership bulanan cocok sebagai recurring revenue untuk akses gym dan aplikasi. Personal training per sesi cocok sebagai usage fee atau premium service. Merchandise dapat menjadi asset sale tambahan. Iklan atau sponsorship dapat relevan jika audiens cukup besar, tetapi bukan sumber utama pada awal bisnis. Setiap revenue stream harus dijelaskan hubungannya dengan value yang diterima pelanggan, misalnya akses rutin, personal coaching, atau convenience.',
        keywords: ['revenue streams', 'subscription', 'membership', 'usage fee', 'asset sale', 'advertising', 'value', 'customer'],
        gradingRubric: [
          {
            point: 'Minimal Tiga Revenue Streams',
            description: 'Menyebutkan setidaknya tiga aliran pendapatan yang relevan dengan kasus.'
          },
          {
            point: 'Kesesuaian dengan Value',
            description: 'Menjelaskan value apa yang dibayar pelanggan pada tiap aliran pendapatan.'
          },
          {
            point: 'Recurring dan Non-Recurring',
            description: 'Membedakan mana yang bersifat berulang dan mana yang bersifat transaksi satu kali atau usage-based.'
          },
          {
            point: 'Logika Model Pendapatan',
            description: 'Menunjukkan kombinasi yang realistis dan tidak asal menumpuk semua model.'
          }
        ]
      },
      {
        id: 'rs_e_2',
        title: 'Essay 2: Pricing Strategy untuk Aplikasi Kursus Online',
        scenario:
          'Sebuah aplikasi kursus online menjual kelas desain digital. Tim produk bingung memilih antara harga tetap per kelas, paket bundling berdasarkan fitur, atau harga dinamis untuk promo musiman dan kursi terbatas pada workshop live.',
        task:
          'Bandingkan mekanisme fixed pricing dan dynamic pricing untuk kasus tersebut. Jelaskan kelebihan, risiko, dan situasi kapan masing-masing lebih tepat dipakai.',
        suggestedAnswer:
          'Jawaban yang baik menjelaskan bahwa fixed pricing cocok untuk kelas reguler yang mudah dipahami pasar dan memudahkan pembelian. Harga per fitur atau bundling juga masih termasuk fixed pricing. Dynamic pricing bisa berguna untuk workshop live, kursi terbatas, promo waktu tertentu, atau negosiasi B2B. Risiko dynamic pricing adalah kebingungan pelanggan atau persepsi tidak adil jika tidak dikelola jelas. Analisis yang kuat akan mengaitkan pilihan harga dengan jenis produk, perilaku pelanggan, dan tujuan revenue.',
        keywords: ['fixed pricing', 'dynamic pricing', 'list price', 'bundling', 'yield management', 'promotion', 'pricing model'],
        gradingRubric: [
          {
            point: 'Menjelaskan Fixed Pricing',
            description: 'Menerangkan fixed pricing dan contoh penerapannya pada kelas atau paket fitur.'
          },
          {
            point: 'Menjelaskan Dynamic Pricing',
            description: 'Menerangkan dynamic pricing dan situasi seperti promo, kapasitas, atau waktu terbatas.'
          },
          {
            point: 'Membahas Risiko atau Trade-off',
            description: 'Membahas kelebihan dan risiko dari kedua pendekatan.'
          },
          {
            point: 'Rekomendasi Situasional',
            description: 'Memberi rekomendasi kapan masing-masing pendekatan lebih tepat dipakai.'
          }
        ]
      }
    ]
  },
  {
    id: 'key-partners',
    shortTitle: 'Key Partners',
    title: 'Key Partners untuk Channel Fisik dan Web/Mobile',
    sourceFile: 'materials/12_TEKNO_Key_Partners_Riyanthi.pdf',
    sourceHref: keyPartnersPdfUrl,
    sourceType: 'pdf',
    summary:
      'Materi ini membahas siapa yang termasuk key partners, mengapa perusahaan membutuhkan kemitraan, motivasi partnership, bentuk partnership pada channel fisik, serta traffic partners dan marketplace pada bisnis digital.',
    focusAreas: ['Strategic Alliances', 'Coopetition', 'Buyer Supplier', 'Traffic Partners', 'Marketplace'],
    flashcards: [
      {
        id: 'kp_fc_1',
        front: 'Apa yang dimaksud blok Key Partners?',
        back:
          'Key Partners adalah supplier dan mitra yang menyediakan sumber daya, aktivitas, kemampuan, atau akses pasar agar model bisnis dapat berjalan lebih efektif.',
        bullets: [
          'Tidak semua aktivitas harus dikerjakan sendiri',
          'Mitra dapat mempercepat akses ke market',
          'Mitra bisa memberi resources atau menjalankan activities'
        ]
      },
      {
        id: 'kp_fc_2',
        front: 'Apa tiga motivasi utama membangun kemitraan menurut materi?',
        back:
          'Tiga motivasinya adalah optimisasi dan skala ekonomi, pengurangan risiko dan ketidakpastian, serta akuisisi sumber daya atau aktivitas tertentu.',
        bullets: [
          'Kemitraan bisa menghemat modal',
          'Kemitraan bisa mengurangi ketidakpastian kompetitif',
          'Kemitraan bisa melengkapi kemampuan yang tidak dimiliki internal'
        ]
      },
      {
        id: 'kp_fc_3',
        front: 'Sebutkan bentuk kemitraan yang dibahas untuk channel fisik.',
        back:
          'Bentuk yang dibahas antara lain strategic alliance antara non-pesaing, coopetition antarpesaing, joint venture, dan buyer-supplier relationship.',
        bullets: [
          'Non-pesaing saling melengkapi',
          'Coopetition berarti kerja sama dengan pesaing',
          'Buyer-supplier penting untuk manufaktur dan rantai pasok'
        ]
      },
      {
        id: 'kp_fc_4',
        front: 'Apa yang dimaksud coopetition?',
        back:
          'Coopetition adalah kerja sama strategis dengan pesaing langsung untuk berbagi biaya, memperluas pasar, atau menumbuhkan kesadaran industri bersama.',
        bullets: [
          'Tetap bersaing, tetapi pada area tertentu bekerja sama',
          'Sering muncul pada event industri atau promosi bersama',
          'Tujuannya bukan menghapus kompetisi, tetapi mengelola pasar'
        ]
      },
      {
        id: 'kp_fc_5',
        front: 'Apa peran traffic partners, app stores, dan marketplace pada bisnis digital?',
        back:
          'Traffic partners membawa orang ke website atau aplikasi, sedangkan app stores dan marketplace menjadi mitra distribusi penting bagi produk digital.',
        bullets: [
          'Mempengaruhi acquisition user',
          'Dapat berfungsi sebagai channel sekaligus partner',
          'Sangat penting pada model web/mobile'
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'kp_q_1',
        question:
          'Motivasi partnership yang fokus pada pengurangan ketidakpastian kompetisi adalah...',
        options: [
          { key: 'A', text: 'Optimisasi dan skala ekonomi' },
          { key: 'B', text: 'Pengurangan risiko dan ketidakpastian' },
          { key: 'C', text: 'Penciptaan harga dinamis' },
          { key: 'D', text: 'AARRR growth loop' }
        ],
        correctAnswer: 'B',
        explanation:
          'Salah satu motivasi utama bermitra adalah mengurangi risiko dan ketidakpastian dalam lingkungan bisnis yang kompetitif.',
        category: 'Motivasi Partnership'
      },
      {
        id: 'kp_q_2',
        question:
          'Jika dua merek fesyen yang saling bersaing ikut pameran industri bersama untuk membesarkan pasar, hubungan itu disebut...',
        options: [
          { key: 'A', text: 'Joint venture' },
          { key: 'B', text: 'Buyer-supplier relationship' },
          { key: 'C', text: 'Coopetition' },
          { key: 'D', text: 'Self-service' }
        ],
        correctAnswer: 'C',
        explanation:
          'Coopetition adalah kerja sama dengan pesaing langsung untuk tujuan tertentu seperti promosi industri atau berbagi biaya.',
        category: 'Coopetition'
      },
      {
        id: 'kp_q_3',
        question:
          'Hubungan partnership yang paling erat dengan pasokan bahan mentah, komponen, atau manufaktur adalah...',
        options: [
          { key: 'A', text: 'Buyer-supplier relationship' },
          { key: 'B', text: 'Communities' },
          { key: 'C', text: 'Advertising partnership' },
          { key: 'D', text: 'Activation partnership' }
        ],
        correctAnswer: 'A',
        explanation:
          'Buyer-supplier relationship berfokus pada pasokan komponen, produksi, supply chain, dan operasi fisik.',
        category: 'Supplier'
      },
      {
        id: 'kp_q_4',
        question:
          'Pada bisnis web/mobile, pihak yang terutama mengantarkan user ke website atau aplikasi disebut...',
        options: [
          { key: 'A', text: 'Traffic partners' },
          { key: 'B', text: 'Dedicated assistants' },
          { key: 'C', text: 'Internal auditors' },
          { key: 'D', text: 'Licensing partners' }
        ],
        correctAnswer: 'A',
        explanation:
          'Traffic partners sangat penting pada channel virtual karena mereka membantu mendatangkan user ke website atau aplikasi.',
        category: 'Web Mobile'
      },
      {
        id: 'kp_q_5',
        question:
          'Contoh strategic alliance antara non-pesaing yang paling sesuai adalah...',
        options: [
          { key: 'A', text: 'Dua operator telekomunikasi perang tarif bersama' },
          { key: 'B', text: 'Aplikasi kasir bermitra dengan payment gateway dan penyedia printer struk' },
          { key: 'C', text: 'Perusahaan membubarkan seluruh supplier' },
          { key: 'D', text: 'Pelanggan membuat ulasan produk' }
        ],
        correctAnswer: 'B',
        explanation:
          'Aplikasi kasir dan payment gateway bukan pesaing langsung, tetapi bisa saling melengkapi untuk membentuk penawaran yang lebih kuat.',
        category: 'Strategic Alliance'
      }
    ],
    essayQuestions: [
      {
        id: 'kp_e_1',
        title: 'Essay 1: Partnership untuk Startup Frozen Food',
        scenario:
          'Sebuah startup frozen food ingin menjual produknya melalui toko sendiri, reseller, dan aplikasi online. Mereka belum punya fasilitas produksi besar, jaringan distribusi nasional, maupun sistem pembayaran digital yang matang.',
        task:
          'Identifikasi minimal tiga key partners yang seharusnya dimiliki startup tersebut. Jelaskan juga motivasi partnership untuk tiap mitra, misalnya optimisasi, pengurangan risiko, atau akuisisi resource/activity.',
        suggestedAnswer:
          'Jawaban yang baik dapat menyebut pabrik maklon atau supplier bahan baku sebagai buyer-supplier partner untuk akuisisi aktivitas produksi. Distributor logistik atau cold chain dapat menjadi partner untuk akuisisi aktivitas dan optimisasi. Payment gateway atau marketplace digital dapat menjadi partner untuk akses pasar dan kapabilitas transaksi. Jika ada reseller utama atau jaringan toko, itu juga dapat dihitung sebagai strategic alliance untuk mempercepat akses market.',
        keywords: ['key partners', 'supplier', 'distributor', 'payment gateway', 'marketplace', 'optimisasi', 'risiko', 'resource', 'activity'],
        gradingRubric: [
          {
            point: 'Identifikasi Mitra',
            description: 'Menyebutkan minimal tiga mitra yang relevan dengan model bisnis frozen food.'
          },
          {
            point: 'Motivasi Partnership',
            description: 'Menghubungkan tiap mitra dengan motivasi seperti optimisasi, pengurangan risiko, atau akuisisi resource/activity.'
          },
          {
            point: 'Keterkaitan dengan Operasi',
            description: 'Menjelaskan bagaimana mitra tersebut membantu produksi, distribusi, atau transaksi.'
          },
          {
            point: 'Analisis Logis',
            description: 'Argumen masuk akal dan sesuai dengan sifat bisnis fisik.'
          }
        ]
      },
      {
        id: 'kp_e_2',
        title: 'Essay 2: Partnership untuk Aplikasi Produktivitas Mobile',
        scenario:
          'Sebuah tim kecil membuat aplikasi mobile produktivitas. Mereka ingin cepat mendapat pengguna tanpa budget iklan besar. Produk akan diluncurkan melalui App Store dan Play Store, lalu diarahkan juga dari blog produktivitas dan komunitas digital.',
        task:
          'Analisislah bentuk key partners yang paling penting untuk model web/mobile ini. Bahas peran traffic partners, app stores atau marketplace, dan partner lain yang mungkin dibutuhkan.',
        suggestedAnswer:
          'Jawaban yang kuat akan menyebut app stores sebagai partner distribusi utama, traffic partners seperti blog, komunitas, atau media partner sebagai sumber acquisition, dan mungkin payment provider atau analytics tools sebagai partner pendukung. Penjelasan harus menunjukkan bahwa pada bisnis digital, partner tidak hanya memasok barang, tetapi juga membantu discovery, akses user, distribusi, dan monetization.',
        keywords: ['traffic partners', 'app store', 'marketplace', 'distribution', 'acquisition', 'web/mobile', 'partner'],
        gradingRubric: [
          {
            point: 'Traffic Partners',
            description: 'Menjelaskan partner yang membantu mendatangkan user ke aplikasi.'
          },
          {
            point: 'App Store atau Marketplace',
            description: 'Menjelaskan peran channel distribusi digital sebagai mitra penting.'
          },
          {
            point: 'Partner Pendukung Tambahan',
            description: 'Menyebut partner tambahan yang masuk akal seperti payment, analytics, atau integrasi lain.'
          },
          {
            point: 'Kesesuaian dengan Model Digital',
            description: 'Menunjukkan pemahaman bahwa partnership digital berbeda dari supply chain fisik.'
          }
        ]
      }
    ]
  },
  {
    id: 'key-activities-resources-cost',
    shortTitle: 'KA KR Cost',
    title: 'Key Activities, Key Resources, dan Cost Structure',
    sourceFile: 'materials/13_TEKNO_KeyAct_KeyResources_Cost_Riyanthi.pdf',
    sourceHref: keyActResourcesCostPdfUrl,
    sourceType: 'pdf',
    summary:
      'Materi ini menggabungkan pembahasan tentang aktivitas utama, sumber daya utama, dan struktur biaya, termasuk kategori resources, intellectual property, peran SDM, cost-driven versus value-driven, fixed cost, variable cost, dan economies of scale.',
    focusAreas: ['Key Activities', 'Key Resources', 'IP', 'Human Resources', 'Cost Structure'],
    flashcards: [
      {
        id: 'karc_fc_1',
        front: 'Apa yang dimaksud Key Activities?',
        back:
          'Key Activities adalah aktivitas paling penting yang wajib dijalankan agar value proposition, channel, customer relationship, dan revenue model dapat bekerja.',
        bullets: [
          'Menjadi inti operasional model bisnis',
          'Tidak semua aktivitas perusahaan adalah key activity',
          'Jika aktivitas inti gagal, model bisnis ikut terganggu'
        ]
      },
      {
        id: 'karc_fc_2',
        front: 'Apa empat kategori utama Key Resources?',
        back:
          'Key Resources dibagi menjadi physical, intellectual, human, dan financial resources.',
        bullets: [
          'Physical: fasilitas, mesin, lokasi, inventori',
          'Intellectual: merek, paten, source code, database',
          'Human dan financial sama pentingnya pada bisnis berbasis pengetahuan'
        ]
      },
      {
        id: 'karc_fc_3',
        front: 'Mengapa intellectual resources penting?',
        back:
          'Intellectual resources seperti brand, source code, paten, hak cipta, dan database sulit dibangun tetapi dapat memberi perlindungan dan keunggulan kompetitif yang kuat.',
        bullets: [
          'Melindungi kreativitas dan teknologi inti',
          'Mendukung diferensiasi jangka panjang',
          'Sering menjadi aset utama startup digital'
        ]
      },
      {
        id: 'karc_fc_4',
        front: 'Apa peran human resources dalam model bisnis?',
        back:
          'Human resources penting karena bisnis kreatif dan padat pengetahuan sangat bergantung pada skill, pengalaman, dan kapasitas orang-orang kunci yang menjalankannya.',
        bullets: [
          'SDM berkualitas bisa menjadi pembeda utama',
          'Perlu direncanakan untuk pertumbuhan 2-3 tahun ke depan',
          'Kekurangan talent dapat membatasi pertumbuhan bisnis'
        ]
      },
      {
        id: 'karc_fc_5',
        front: 'Apa dua kelas Cost Structure dan bagaimana fokusnya?',
        back:
          'Cost Structure dibedakan menjadi cost-driven yang fokus menekan biaya serendah mungkin dan value-driven yang lebih fokus menciptakan nilai meski biayanya lebih besar.',
        bullets: [
          'Fixed cost tidak berubah langsung oleh volume output',
          'Variable cost berubah mengikuti volume',
          'Economies of scale membuat biaya per unit turun saat skala naik'
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'karc_q_1',
        question:
          'Pada bisnis marketplace digital, aktivitas yang paling dominan karena platform menjadi aset utama adalah...',
        options: [
          { key: 'A', text: 'Pengembangan platform dan jaringan' },
          { key: 'B', text: 'Penjualan lisensi paten ke pabrik' },
          { key: 'C', text: 'Pembentukan loyalty point offline' },
          { key: 'D', text: 'Pengiriman bahan mentah ke gudang pabrik' }
        ],
        correctAnswer: 'A',
        explanation:
          'Materi menekankan bahwa pada bisnis berbasis platform, aktivitas utama didominasi pengembangan platform dan jaringan.',
        category: 'Key Activities'
      },
      {
        id: 'karc_q_2',
        question:
          'Merek dagang, paten, hak cipta, source code, dan database pelanggan termasuk kategori...',
        options: [
          { key: 'A', text: 'Physical resources' },
          { key: 'B', text: 'Intellectual resources' },
          { key: 'C', text: 'Human resources' },
          { key: 'D', text: 'Financial resources' }
        ],
        correctAnswer: 'B',
        explanation:
          'Semua contoh tersebut merupakan intellectual resources karena melindungi atau mewakili aset non-fisik yang bernilai.',
        category: 'Key Resources'
      },
      {
        id: 'karc_q_3',
        question:
          'Jenis kekayaan intelektual yang terutama melindungi brand, logo, slogan, atau tanda dagang adalah...',
        options: [
          { key: 'A', text: 'Trademark' },
          { key: 'B', text: 'Copyright' },
          { key: 'C', text: 'Patent' },
          { key: 'D', text: 'Trade secret' }
        ],
        correctAnswer: 'A',
        explanation:
          'Trademark digunakan untuk melindungi identitas brand seperti logo, slogan, atau mark dagang.',
        category: 'Intellectual Property'
      },
      {
        id: 'karc_q_4',
        question:
          'Model bisnis yang berusaha menjaga struktur biaya seramping mungkin terutama termasuk kelas...',
        options: [
          { key: 'A', text: 'Value-driven' },
          { key: 'B', text: 'Cost-driven' },
          { key: 'C', text: 'Revenue-driven' },
          { key: 'D', text: 'Acquisition-driven' }
        ],
        correctAnswer: 'B',
        explanation:
          'Cost-driven model berupaya meminimalkan biaya dalam desain dan operasional model bisnis.',
        category: 'Cost Structure'
      },
      {
        id: 'karc_q_5',
        question:
          'Keunggulan biaya yang muncul ketika perusahaan tumbuh dan biaya per unit menurun disebut...',
        options: [
          { key: 'A', text: 'Fixed cost' },
          { key: 'B', text: 'Economies of scale' },
          { key: 'C', text: 'Licensing fee' },
          { key: 'D', text: 'Dedicated assistance' }
        ],
        correctAnswer: 'B',
        explanation:
          'Economies of scale adalah keunggulan biaya yang dinikmati saat volume atau skala operasi meningkat.',
        category: 'Biaya'
      }
    ],
    essayQuestions: [
      {
        id: 'karc_e_1',
        title: 'Essay 1: Menganalisis Platform Belajar Live Class',
        scenario:
          'Sebuah startup ingin membuat platform live class untuk kelas bahasa asing. Mereka perlu menjamin kelas berjalan lancar, materi aman, tutor berkualitas, dan biaya operasional tetap terkendali saat jumlah murid bertambah.',
        task:
          'Jelaskan minimal dua Key Activities, dua Key Resources, dan dua komponen Cost Structure yang paling penting untuk bisnis tersebut. Tunjukkan hubungan antarelemen tersebut.',
        suggestedAnswer:
          'Jawaban yang baik menyebut key activities seperti pengembangan platform, scheduling kelas, quality control tutor, dan customer support. Key resources dapat berupa source code, cloud infrastructure, tutor, tim engineering, dan brand. Cost structure yang penting antara lain gaji tutor/tim, biaya server, software tools, dan marketing. Analisis harus menunjukkan hubungan bahwa resources memungkinkan activities berjalan dan activities tersebut menimbulkan biaya tertentu.',
        keywords: ['key activities', 'key resources', 'cost structure', 'platform', 'cloud', 'tutor', 'gaji', 'server'],
        gradingRubric: [
          {
            point: 'Key Activities',
            description: 'Menyebutkan minimal dua aktivitas utama yang relevan untuk live class platform.'
          },
          {
            point: 'Key Resources',
            description: 'Menyebutkan minimal dua sumber daya utama yang mendukung aktivitas tersebut.'
          },
          {
            point: 'Cost Structure',
            description: 'Menyebutkan minimal dua komponen biaya penting yang logis.'
          },
          {
            point: 'Hubungan Antarblok',
            description: 'Menjelaskan hubungan logis antara aktivitas, resources, dan biaya.'
          }
        ]
      },
      {
        id: 'karc_e_2',
        title: 'Essay 2: Cost-Driven vs Value-Driven pada Bisnis Hotel Boutique',
        scenario:
          'Sebuah hotel boutique ingin mempertahankan pelayanan premium, desain interior unik, dan pengalaman personal. Namun investor baru mendorong efisiensi biaya agresif agar margin cepat naik.',
        task:
          'Analisis apakah model bisnis hotel tersebut lebih cocok cost-driven atau value-driven. Jelaskan konsekuensinya terhadap Key Resources, Key Activities, dan Cost Structure.',
        suggestedAnswer:
          'Jawaban yang baik menyimpulkan bahwa hotel boutique premium cenderung value-driven karena diferensiasinya berasal dari pengalaman dan kualitas. Konsekuensinya adalah resources seperti SDM terlatih, desain interior, dan brand premium harus dijaga. Activities seperti pelayanan personal dan quality control pengalaman tidak boleh dipotong sembarangan. Cost structure memang bisa dioptimalkan, tetapi jika terlalu ditekan dapat merusak value proposition utamanya.',
        keywords: ['value-driven', 'cost-driven', 'customer experience', 'resources', 'activities', 'cost structure', 'premium'],
        gradingRubric: [
          {
            point: 'Memilih Kelas Cost Structure',
            description: 'Menentukan apakah bisnis lebih cocok cost-driven atau value-driven.'
          },
          {
            point: 'Dampak pada Key Resources',
            description: 'Menjelaskan resources apa yang harus dipertahankan atau dioptimalkan.'
          },
          {
            point: 'Dampak pada Key Activities',
            description: 'Menjelaskan aktivitas inti yang tidak boleh rusak akibat efisiensi berlebihan.'
          },
          {
            point: 'Argumen Strategis',
            description: 'Menunjukkan trade-off yang jelas antara efisiensi biaya dan nilai premium.'
          }
        ]
      }
    ]
  },
  {
    id: 'financial-management',
    shortTitle: 'Financial Management',
    title: 'Cost Structure dalam Praktik Financial Management',
    sourceFile: 'materials/Cost_Structure_Financial_Management.pptx',
    sourceHref: financialManagementPptxUrl,
    sourceType: 'pptx',
    summary:
      'Materi presentasi ini memperluas pemahaman cost structure ke pencatatan keuangan praktis: direct dan indirect cost, fixed dan variable cost, penentuan harga jual, laporan laba rugi, stok opname, arus kas, dan manajemen risiko.',
    focusAreas: ['Direct Indirect Cost', 'Fixed Variable Cost', 'Income Statement', 'Cash Flow', 'Risk Management'],
    flashcards: [
      {
        id: 'fm_fc_1',
        front: 'Apa fokus utama materi Cost Structure (Financial Management)?',
        back:
          'Materi ini menghubungkan teori cost structure dengan praktik administrasi keuangan seperti pencatatan biaya, harga jual, laporan keuangan, arus kas, dan manajemen risiko.',
        bullets: [
          'Lebih praktis daripada sekadar definisi BMC',
          'Sangat relevan untuk UMKM',
          'Menuntut disiplin pencatatan transaksi'
        ]
      },
      {
        id: 'fm_fc_2',
        front: 'Apa perbedaan biaya tetap dan biaya variabel?',
        back:
          'Biaya tetap cenderung tidak berubah langsung karena volume output, sedangkan biaya variabel berubah proporsional terhadap perubahan volume produksi atau aktivitas.',
        bullets: [
          'Sewa biasanya fixed cost',
          'Bahan baku sering variable cost',
          'Analisis perilaku biaya penting untuk pengambilan keputusan'
        ]
      },
      {
        id: 'fm_fc_3',
        front: 'Apa arti direct cost dan indirect cost?',
        back:
          'Direct cost dapat ditelusuri langsung ke produk atau layanan tertentu, sedangkan indirect cost merupakan biaya penunjang yang tidak mudah dibebankan langsung ke satu output spesifik.',
        bullets: [
          'Bahan baku produk adalah contoh direct cost',
          'Biaya administrasi umum sering menjadi indirect cost',
          'Pemisahan ini membantu perhitungan harga pokok dan harga jual'
        ]
      },
      {
        id: 'fm_fc_4',
        front: 'Apa langkah dasar administrasi keuangan yang ditekankan materi?',
        back:
          'Langkah dasarnya adalah mencatat semua transaksi, membedakan biaya langsung dan tidak langsung, mengumpulkan bukti transaksi, lalu menyusun laporan keuangan.',
        bullets: [
          'Pencatatan rapi adalah fondasi keputusan finansial',
          'Laporan bisa dibuat dengan Excel sederhana',
          'Tanpa transaksi yang rapi, laporan menjadi tidak andal'
        ]
      },
      {
        id: 'fm_fc_5',
        front: 'Apa tiga kelompok utama dalam laporan arus kas?',
        back:
          'Laporan arus kas memisahkan perubahan kas ke aktivitas operasi, investasi, dan pendanaan.',
        bullets: [
          'Operasi berasal dari aktivitas penghasil pendapatan utama',
          'Investasi berkaitan dengan aset atau penanaman dana',
          'Pendanaan berkaitan dengan modal, utang, atau dividen'
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'fm_q_1',
        question:
          'Biaya yang totalnya berubah seiring perubahan volume produksi paling tepat disebut...',
        options: [
          { key: 'A', text: 'Biaya tetap' },
          { key: 'B', text: 'Biaya variabel' },
          { key: 'C', text: 'Biaya tangguhan' },
          { key: 'D', text: 'Biaya oportunitas' }
        ],
        correctAnswer: 'B',
        explanation:
          'Biaya variabel berubah seiring perubahan volume produksi atau aktivitas bisnis.',
        category: 'Perilaku Biaya'
      },
      {
        id: 'fm_q_2',
        question:
          'Contoh indirect cost yang lebih sulit ditelusuri langsung ke satu produk adalah...',
        options: [
          { key: 'A', text: 'Tepung untuk satu batch roti' },
          { key: 'B', text: 'Biji kopi untuk satu gelas espresso' },
          { key: 'C', text: 'Biaya administrasi kantor umum' },
          { key: 'D', text: 'Kemasan spesifik untuk satu pesanan' }
        ],
        correctAnswer: 'C',
        explanation:
          'Biaya administrasi umum adalah contoh indirect cost karena tidak langsung melekat pada satu unit produk tertentu.',
        category: 'Direct Indirect Cost'
      },
      {
        id: 'fm_q_3',
        question:
          'Langkah administrasi keuangan paling awal dan paling mendasar adalah...',
        options: [
          { key: 'A', text: 'Mencatat semua transaksi yang terjadi' },
          { key: 'B', text: 'Membagikan dividen tahunan' },
          { key: 'C', text: 'Menghapus seluruh biaya tetap' },
          { key: 'D', text: 'Melakukan merger usaha' }
        ],
        correctAnswer: 'A',
        explanation:
          'Materi menekankan pencatatan semua transaksi sebagai fondasi pembuatan laporan keuangan.',
        category: 'Administrasi Keuangan'
      },
      {
        id: 'fm_q_4',
        question:
          'Laporan laba rugi multiple-step berbeda dari single-step karena...',
        options: [
          { key: 'A', text: 'Tidak memuat penjualan bersih sama sekali' },
          { key: 'B', text: 'Memisahkan tahapan seperti laba kotor, laba usaha, dan laba sebelum pajak' },
          { key: 'C', text: 'Hanya mencatat kas masuk' },
          { key: 'D', text: 'Hanya digunakan untuk perusahaan publik' }
        ],
        correctAnswer: 'B',
        explanation:
          'Multiple-step income statement menyajikan tahapan perhitungan yang lebih rinci seperti penjualan bersih, laba kotor, dan laba usaha.',
        category: 'Income Statement'
      },
      {
        id: 'fm_q_5',
        question:
          'Penghindaran risiko, pengurangan risiko, berbagi risiko, dan retensi risiko termasuk...',
        options: [
          { key: 'A', text: 'Jenis customer relationship' },
          { key: 'B', text: 'Alternatif perlakuan risiko' },
          { key: 'C', text: 'Metode activation funnel' },
          { key: 'D', text: 'Kategori intellectual property' }
        ],
        correctAnswer: 'B',
        explanation:
          'Materi manajemen risiko memperkenalkan empat perlakuan risiko: avoidance, reduction, sharing, dan retention.',
        category: 'Risk Management'
      }
    ],
    essayQuestions: [
      {
        id: 'fm_e_1',
        title: 'Essay 1: Administrasi Keuangan untuk UMKM Roti Rumahan',
        scenario:
          'Sebuah UMKM roti rumahan mulai berkembang. Pemilik sering mencampur uang pribadi dan uang usaha, tidak menyimpan semua bukti transaksi, dan belum bisa membedakan biaya bahan baku dengan biaya operasional umum.',
        task:
          'Jelaskan langkah administrasi keuangan sederhana yang seharusnya dilakukan usaha tersebut. Sertakan pentingnya pemisahan biaya, bukti transaksi, dan jenis laporan keuangan yang perlu mulai disusun.',
        suggestedAnswer:
          'Jawaban yang baik menyebut pencatatan seluruh transaksi, pemisahan uang pribadi dan usaha, pengumpulan bukti transaksi, klasifikasi direct dan indirect cost, lalu penyusunan laporan sederhana seperti laba rugi, posisi keuangan, dan arus kas. Penjelasan harus menunjukkan bahwa tanpa data yang rapi, harga jual dan keputusan usaha akan lemah.',
        keywords: ['transaksi', 'bukti transaksi', 'direct cost', 'indirect cost', 'laba rugi', 'arus kas', 'laporan keuangan', 'umkm'],
        gradingRubric: [
          {
            point: 'Pencatatan dan Bukti',
            description: 'Menjelaskan perlunya pencatatan transaksi dan pengumpulan bukti transaksi.'
          },
          {
            point: 'Klasifikasi Biaya',
            description: 'Menjelaskan pentingnya membedakan biaya langsung dan tidak langsung atau biaya tetap dan variabel.'
          },
          {
            point: 'Laporan Keuangan Dasar',
            description: 'Menyebutkan laporan yang perlu disusun seperti laba rugi atau arus kas.'
          },
          {
            point: 'Alasan Manajerial',
            description: 'Menjelaskan dampaknya pada keputusan harga, kontrol usaha, atau kesehatan keuangan.'
          }
        ]
      },
      {
        id: 'fm_e_2',
        title: 'Essay 2: Harga Jual dan Risiko pada Usaha Minuman Literan',
        scenario:
          'Usaha minuman literan ingin menaikkan kapasitas produksi. Pemilik masih bingung membedakan biaya tetap, variabel, biaya langsung, dan biaya tidak langsung. Di saat yang sama, ia khawatir jika harga jual terlalu rendah maka cash flow usaha akan terganggu.',
        task:
          'Analisis bagaimana pemilik seharusnya mengelompokkan biaya untuk membantu menentukan harga jual, lalu jelaskan dua risiko keuangan yang perlu dikelola dan bagaimana perlakuan risikonya.',
        suggestedAnswer:
          'Jawaban yang baik mengelompokkan bahan baku dan kemasan sebagai biaya langsung atau variabel, sedangkan sewa atau gaji administrasi sebagai biaya tetap atau tidak langsung. Klasifikasi ini membantu menghitung biaya pokok dan harga jual yang rasional. Risiko keuangan bisa berupa kekurangan kas, salah harga jual, atau pemborosan biaya. Perlakuan risiko dapat berupa pengurangan risiko lewat kontrol biaya dan pencatatan yang lebih baik, atau retensi/berbagi risiko sesuai konteks usaha.',
        keywords: ['biaya tetap', 'biaya variabel', 'direct cost', 'indirect cost', 'harga jual', 'cash flow', 'risk management'],
        gradingRubric: [
          {
            point: 'Pengelompokan Biaya',
            description: 'Mengelompokkan beberapa biaya ke kategori yang tepat.'
          },
          {
            point: 'Hubungan dengan Harga Jual',
            description: 'Menjelaskan bagaimana klasifikasi biaya membantu penetapan harga jual.'
          },
          {
            point: 'Risiko Keuangan',
            description: 'Mengidentifikasi minimal dua risiko keuangan yang masuk akal.'
          },
          {
            point: 'Perlakuan Risiko',
            description: 'Menjelaskan langkah penanganan risiko seperti pengurangan, retensi, atau berbagi risiko.'
          }
        ]
      }
    ]
  }
]

export const totalMaterialFlashcards = studyMaterials.reduce(
  (total, material) => total + material.flashcards.length,
  0
)

export const totalMaterialQuestions = studyMaterials.reduce(
  (total, material) => total + material.quizQuestions.length,
  0
)

export const totalMaterialEssayQuestions = studyMaterials.reduce(
  (total, material) => total + material.essayQuestions.length,
  0
)
