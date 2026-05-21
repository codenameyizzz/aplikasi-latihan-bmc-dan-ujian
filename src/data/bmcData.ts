import { BmcElement } from '../types'

export const bmcElements: BmcElement[] = [
  {
    id: 'KP',
    name: 'Key Partners',
    nameEn: 'Strategic alliances, suppliers, and external enablers',
    iconName: 'Handshake',
    color: 'emerald',
    definition:
      'Jaringan pemasok dan mitra yang membantu model bisnis berjalan. Kemitraan dibangun untuk mengoptimalkan model bisnis, mengurangi risiko, memperoleh kapabilitas tertentu, atau mengamankan sumber daya penting.',
    keyQuestions: [
      'Siapa mitra paling penting di luar perusahaan?',
      'Siapa pemasok utama kita?',
      'Sumber daya kunci apa yang kita peroleh dari mitra?',
      'Aktivitas utama apa yang dijalankan oleh mitra?'
    ],
    examples: [
      {
        businessName: 'Coffee Shop',
        items: [
          'Local coffee farmers and cooperatives that supply high-quality beans',
          'Milk and artisan syrup distributors',
          'Eco-friendly packaging suppliers for cups and straws',
          'Food delivery platforms that extend logistics and reach'
        ]
      },
      {
        businessName: 'SaaS EdTech',
        items: [
          'Professional instructors and content creators who provide courses',
          'Cloud hosting providers such as AWS or Google Cloud',
          'Payment gateway partners for online checkout',
          'Certification or industry associations that add credibility'
        ]
      }
    ]
  },
  {
    id: 'KA',
    name: 'Key Activities',
    nameEn: 'The most important actions the business must perform',
    iconName: 'CheckSquare',
    color: 'blue',
    definition:
      'Aktivitas paling penting yang wajib dijalankan perusahaan untuk menyampaikan proposisi nilai, menjaga operasi tetap berjalan, menjangkau pelanggan, dan mempertahankan pendapatan.',
    keyQuestions: [
      'Aktivitas apa yang dibutuhkan untuk mewujudkan value proposition?',
      'Aktivitas apa yang paling penting untuk channels kita?',
      'Aktivitas apa yang mendukung customer relationships?',
      'Aktivitas apa yang langsung mendorong revenue streams?'
    ],
    examples: [
      {
        businessName: 'Coffee Shop',
        items: [
          'Consistent beverage preparation and quality control',
          'Seasonal menu research and product development',
          'Barista training for service standardization',
          'Daily social media marketing and campaign execution'
        ]
      },
      {
        businessName: 'SaaS EdTech',
        items: [
          'Platform development, debugging, and maintenance',
          'Multimedia course production and editing',
          'Performance marketing and SEO execution',
          'Continuous curriculum refresh to stay relevant'
        ]
      }
    ]
  },
  {
    id: 'KR',
    name: 'Key Resources',
    nameEn: 'Assets the company needs to operate and compete',
    iconName: 'Cpu',
    color: 'indigo',
    definition:
      'Aset paling penting yang dibutuhkan agar model bisnis dapat berfungsi. Sumber daya ini bisa berupa aset fisik, intelektual, manusia, maupun finansial.',
    keyQuestions: [
      'Sumber daya apa yang dibutuhkan untuk menyampaikan value proposition?',
      'Sumber daya apa yang paling vital untuk channels dan operasi?',
      'Sumber daya manusia atau finansial apa yang paling kritis bagi keberlangsungan bisnis?'
    ],
    examples: [
      {
        businessName: 'Coffee Shop',
        items: [
          'Physical assets such as location, espresso machines, seating, and fast Wi-Fi',
          'Human assets such as trained baristas, pastry staff, and content creators',
          'Intellectual assets such as signature recipes and brand identity',
          'Financial resources such as working capital for fresh inventory'
        ]
      },
      {
        businessName: 'SaaS EdTech',
        items: [
          'Intellectual assets such as source code and course copyrights',
          'Human resources such as engineers, designers, and expert tutors',
          'Infrastructure such as reliable cloud servers and workstations',
          'Customer data and product insights that improve the platform'
        ]
      }
    ]
  },
  {
    id: 'VP',
    name: 'Value Propositions',
    nameEn: 'Why customers should choose this business over alternatives',
    iconName: 'Sparkles',
    color: 'amber',
    definition:
      'Gabungan produk dan layanan yang menciptakan nilai bagi customer segment tertentu dengan cara menyelesaikan masalah, memenuhi kebutuhan, atau memberikan diferensiasi yang bermakna.',
    keyQuestions: [
      'Nilai apa yang kita berikan kepada pelanggan?',
      'Masalah pelanggan mana yang kita bantu selesaikan?',
      'Kebutuhan pelanggan mana yang kita penuhi?',
      'Bundel produk atau layanan apa yang kita tawarkan untuk tiap segmen?'
    ],
    examples: [
      {
        businessName: 'Coffee Shop',
        items: [
          'Fresh specialty coffee at an accessible price',
          'A work-friendly environment with abundant power outlets',
          'Fast service through self-ordering and pickup flow',
          'Health-conscious menu options such as oat milk and low-sugar drinks'
        ]
      },
      {
        businessName: 'SaaS EdTech',
        items: [
          'Lifetime access with ongoing content updates',
          'Mentor-guided community learning and discussion',
          'Project-based curriculum aligned with real industry needs',
          'Recognized certification backed by startup ecosystem partners'
        ]
      }
    ]
  },
  {
    id: 'CR',
    name: 'Customer Relationships',
    nameEn: 'How the business acquires, retains, and grows customers',
    iconName: 'Heart',
    color: 'rose',
    definition:
      'Jenis hubungan yang dibangun perusahaan dengan customer segment tertentu untuk memperoleh pelanggan, mempertahankan mereka, dan meningkatkan nilai jangka panjang.',
    keyQuestions: [
      'Jenis hubungan seperti apa yang diharapkan tiap segmen dari kita?',
      'Bagaimana kita membangun dan menjaga hubungan tersebut?',
      'Berapa biaya untuk mempertahankan hubungan itu?',
      'Bagaimana hubungan tersebut terintegrasi dengan bagian model bisnis lainnya?'
    ],
    examples: [
      {
        businessName: 'Coffee Shop',
        items: [
          'Friendly personal service that recognizes repeat customers',
          'Digital loyalty programs that reward repeat purchases',
          'Birthday offers and personalized promotions',
          'Interactive social content that keeps the audience engaged'
        ]
      },
      {
        businessName: 'SaaS EdTech',
        items: [
          '24/7 support through live chat and knowledge base flows',
          'Peer community spaces for collaborative learning',
          'Weekly mentor sessions and live Q and A',
          'Email newsletters with learning and career tips'
        ]
      }
    ]
  },
  {
    id: 'CH',
    name: 'Channels',
    nameEn: 'How value is communicated, delivered, and sold',
    iconName: 'Send',
    color: 'sky',
    definition:
      'Cara perusahaan berkomunikasi dengan dan menjangkau customer segments untuk menyampaikan value proposition. Channels mencakup promosi, penjualan, dan distribusi.',
    keyQuestions: [
      'Melalui channel apa pelanggan ingin dijangkau?',
      'Bagaimana kita menjangkau mereka saat ini?',
      'Channel mana yang paling efisien dari sisi biaya?',
      'Bagaimana channel tersebut sesuai dengan kebiasaan pelanggan?'
    ],
    examples: [
      {
        businessName: 'Coffee Shop',
        items: [
          'Direct channel through the physical store',
          'Social channels such as Instagram and TikTok',
          'Mobile ordering through an app or preorder flow',
          'Third-party channels such as delivery marketplaces'
        ]
      },
      {
        businessName: 'SaaS EdTech',
        items: [
          'Main website and landing pages',
          'Paid digital channels such as Google Ads and Meta Ads',
          'Organic search through blog and educational content',
          'Email sequences for lead nurturing and conversion'
        ]
      }
    ]
  },
  {
    id: 'CS',
    name: 'Customer Segments',
    nameEn: 'Distinct groups of people or organizations the business serves',
    iconName: 'Target',
    color: 'violet',
    definition:
      'Kelompok orang atau organisasi berbeda yang ingin dijangkau dan dilayani perusahaan. Tanpa pelanggan yang menguntungkan, tidak ada model bisnis yang dapat bertahan.',
    keyQuestions: [
      'Untuk siapa kita menciptakan nilai?',
      'Siapa pelanggan yang paling penting bagi bisnis kita?',
      'Apa ciri, kebiasaan, tujuan, dan pain point utama mereka?'
    ],
    examples: [
      {
        businessName: 'Coffee Shop',
        items: [
          'Students who need a comfortable place to study with reliable internet',
          'Freelancers and remote workers who use cafes as workspaces',
          'Casual coffee buyers who prioritize speed and convenience',
          'Specialty coffee enthusiasts who care about bean origin and taste'
        ]
      },
      {
        businessName: 'SaaS EdTech',
        items: [
          'Career switchers who want to move into tech roles',
          'Working professionals seeking upskilling for promotion',
          'University students learning practical skills beyond class',
          'Companies that need internal training platforms for employees'
        ]
      }
    ]
  },
  {
    id: 'C$',
    name: 'Cost Structure',
    nameEn: 'The major costs required to operate the business model',
    iconName: 'CreditCard',
    color: 'purple',
    definition:
      'Semua biaya utama yang timbul untuk menjalankan model bisnis, termasuk biaya menciptakan nilai, menjaga hubungan pelanggan, dan menyampaikan produk atau layanan.',
    keyQuestions: [
      'Biaya apa yang paling penting dalam model bisnis kita?',
      'Key resources mana yang paling mahal?',
      'Key activities mana yang menimbulkan biaya operasi terbesar?'
    ],
    examples: [
      {
        businessName: 'Coffee Shop',
        items: [
          'Store rent and occupancy costs',
          'Core ingredients such as beans, milk, gas, and packaging',
          'Salaries for baristas and front-of-house staff',
          'Utilities such as electricity, water, and internet',
          'Marketing and promotional spending'
        ]
      },
      {
        businessName: 'SaaS EdTech',
        items: [
          'Cloud hosting and infrastructure spending',
          'Compensation for developers, designers, and operations staff',
          'Revenue share or fees paid to instructors',
          'Paid acquisition spend for growth campaigns',
          'Software subscriptions for CRM, analytics, and support tooling'
        ]
      }
    ]
  },
  {
    id: 'R$',
    name: 'Revenue Streams',
    nameEn: 'How the business captures monetary value from each segment',
    iconName: 'Wallet',
    color: 'teal',
    definition:
      'Cara perusahaan menghasilkan uang dari setiap customer segment. Blok ini menjelaskan bagaimana nilai yang diciptakan diubah menjadi pemasukan bagi bisnis.',
    keyQuestions: [
      'Untuk nilai apa pelanggan benar-benar bersedia membayar?',
      'Bagaimana cara pelanggan lebih suka membayar saat ini?',
      'Seberapa besar kontribusi tiap aliran pendapatan terhadap total bisnis?'
    ],
    examples: [
      {
        businessName: 'Coffee Shop',
        items: [
          'Retail beverage sales as the main revenue source',
          'Food add-ons such as pastries and snacks',
          'Packaged coffee bean and ground coffee sales',
          'Branded merchandise such as tumblers and tote bags',
          'Room or event space rental for small gatherings'
        ]
      },
      {
        businessName: 'SaaS EdTech',
        items: [
          'One-time course purchases',
          'Monthly or annual subscription access',
          'Corporate training packages for teams',
          'Premium fees for exams, certificates, or private mentoring'
        ]
      }
    ]
  }
]
