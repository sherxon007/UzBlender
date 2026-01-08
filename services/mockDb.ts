
import { Asset, Job, BlogPost, Conversation, Artwork, Course, Report, Contest, AuditLog, Transaction, LearningPath } from '../types';

// Initial Data Seeding
export const MOCK_ASSETS: Asset[] = [
  { id: '1', title: 'Cyberpunk Ko\'cha Samurayi', author: 'NeoArtist', authorId: 'user-neo', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NeoArtist', price: 45, discountPrice: 29.99, image: 'https://picsum.photos/400/400?random=10', category: 'Character', formats: ['.blend', '.fbx', '.obj'], rating: 4.8, polygons: '45k', vertices: '48k', uploadDate: '2024-10-01', status: 'active' },
  { id: '2', title: 'Uchar Poyga Mashinasi V2', author: 'MechaDesign', authorId: 'user-mecha', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MechaDesign', price: 35, image: 'https://picsum.photos/400/400?random=20', category: 'Vehicle', formats: ['.blend', '.glTF'], rating: 4.5, polygons: '120k', vertices: '125k', uploadDate: '2024-09-15', status: 'active' },
  { id: '3', title: 'Neon Shahar Modul To\'plami', author: 'EnvMaster', authorId: 'user-env', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EnvMaster', price: 89, discountPrice: 50, image: 'https://picsum.photos/400/400?random=30', category: 'Environment', formats: ['.uasset', '.blend'], rating: 5.0, polygons: '200k', vertices: '210k', uploadDate: '2024-10-20', status: 'active' },
  { id: '4', title: 'Plazma Miltiq 3000', author: 'WeaponSmith', authorId: 'user-wep', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WeaponSmith', price: 15, image: 'https://picsum.photos/400/400?random=40', category: 'Weapon', formats: ['.fbx'], rating: 4.2, polygons: '12k', vertices: '13k', uploadDate: '2024-08-05', status: 'active' },
  // Pending Asset for Admin Demo
  { id: '99', title: 'Tasdiqlanmagan Mexanik Model', author: 'NewbieDev', authorId: 'user-new', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Newbie', price: 10, image: 'https://picsum.photos/400/400?random=99', category: 'Character', formats: ['.obj'], rating: 0, polygons: '50k', vertices: '50k', uploadDate: '2024-10-26', status: 'pending' },
];

export const MOCK_JOBS: Job[] = [
    { id: 'j1', title: "Indie RPG uchun Personaj Modeller", company: "PixelForge Games", budget: "$500 - $1000", type: "Contract", experienceLevel: 'Middle', skills: ["Blender", "ZBrush", "Character Design"], postedDate: "2 soat oldin", featured: true, description: "Bizga yuqori sifatli stilizatsiya qilingan personaj kerak.", authorId: "comp-1", status: 'active', applicationsCount: 12 },
    { id: 'j2', title: "Mahsulotni Fotorealistik Renderlash", company: "TechViz Studio", budget: "$200 Fixed", type: "One-time", experienceLevel: 'Senior', skills: ["Lighting", "Rendering", "Cycles"], postedDate: "5 soat oldin", featured: false, description: "Yangi soat dizaynimizni render qilish kerak.", authorId: "comp-2", status: 'active', applicationsCount: 5 },
    { id: 'j3', title: "Kichik Atrof-muhit Rassomi", company: "MetaWorld", budget: "$1500/oy", type: "Full-time", experienceLevel: 'Junior', skills: ["Unreal Engine 5", "Modular Kits"], postedDate: "1 kun oldin", featured: false, description: "Metaolamni qurish uchun jamoamizga qo'shiling.", authorId: "comp-3", status: 'pending', applicationsCount: 0 },
];

export const MOCK_BLOGS: BlogPost[] = [
    { id: 'b1', title: "Blender 4.0 da Hard Surface Modellashtirish", author: "NeoArtist", date: "24 Okt, 2024", readTime: "8 daqiqa o'qish", category: "Darslik", image: "https://picsum.photos/800/500?random=201", desc: "Murakkab ilmiy-fantastik mexanizmlarni yaratish uchun professional boolean ish jarayonlari va bevel texnikalarini o'rganing." },
    { id: 'b2', title: "UE5 bilan Real Vaqt Renderlash Kelajagi", author: "TechLead", date: "22 Okt, 2024", readTime: "5 daqiqa o'qish", category: "Texnologiya", image: "https://picsum.photos/800/500?random=202", desc: "Nanite va Lumen texnologiyalari o'yin yaratish sanoatini qanday o'zgartirayotganini ko'rib chiqamiz." },
];

export const MOCK_ARTWORKS: Artwork[] = [
    { id: '1', title: "Neon Samuray 2077", artist: "NeoArtist", artistAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NeoArtist', image: "https://picsum.photos/600/800?random=101", likes: 1240, comments: 45, type: 'Character', date: '2024-10-20', software: ['Blender', 'Substance'], description: "Blenderda neon yoritish va qattiq sirt modellashtirishni o'rganuvchi kiberpank samuray kontseptsiyasi." },
    { id: '2', title: "Tashlandiq Koinot Stansiyasi", artist: "EnvMaster", artistAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EnvMaster', image: "https://picsum.photos/800/600?random=102", likes: 890, comments: 22, type: 'Environment', date: '2024-10-22', software: ['Unreal Engine 5', 'Maya'], description: "UE5 da Lumen yordamida kinematik yoritishni o'rganish. Barcha assetlar Mayada modellangan." },
    { id: '3', title: "Kiber Yuk Mashinasi V5", artist: "MechaDesign", artistAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MechaDesign', image: "https://picsum.photos/600/600?random=103", likes: 2100, comments: 112, type: 'Vehicle', date: '2024-10-15', software: ['Blender'], description: "Shaxsiy loyiha uchun yuqori poligonli transport vositasi dizayni." },
    { id: '4', title: "Protsedural Shahar", artist: "CodeArt", artistAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CodeArt', image: "https://picsum.photos/700/900?random=104", likes: 560, comments: 18, type: 'Environment', date: '2024-10-23', software: ['Houdini', 'Redshift'], description: "Houdini tarmoqlari yordamida to'liq protsedural shahar yaratish." },
    { id: '5', title: "Mexanik Jangchi", artist: "Robotix", artistAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robotix', image: "https://picsum.photos/600/500?random=105", likes: 1500, comments: 67, type: 'Character', date: '2024-10-18', software: ['ZBrush', 'Blender'], description: "ZBrushda haykaltaroshlik, Blenderda retopologiya. Animatsiya uchun tayyor." },
];

export const MOCK_COURSES: Course[] = [
    // --- BLENDER (BEGINNER) ---
    { 
        id: 'c1', 
        title: 'Blender 4.0 Boshlang\'ich: Donut Darsligi', 
        instructor: 'Blender Guru', 
        level: 'Beginner', 
        duration: '14 Qism', 
        rating: 5.0, 
        image: 'https://i.ytimg.com/vi/nIoXOplUvAw/maxresdefault.jpg', 
        videoUrl: 'nIoXOplUvAw', // Valid Donut Tutorial
        source: 'YouTube',
        software: 'Blender',
        tags: ['Modellashtirish', 'Render', 'Donut'],
        resources: [{ title: 'Klaviatura Qisqartmalari', url: '#', type: 'file' }]
    },
    { 
        id: 'c2', 
        title: 'Blender 3D - To\'liq Kirish', 
        instructor: 'Grant Abbitt', 
        level: 'Beginner', 
        duration: '2 Soat', 
        rating: 4.8, 
        image: 'https://i.ytimg.com/vi/at3S3Y6288s/maxresdefault.jpg', 
        videoUrl: 'at3S3Y6288s', // Valid Grant Abbitt
        source: 'YouTube',
        software: 'Blender',
        tags: ['Asoslar', 'UI', 'Modellashtirish']
    },

    // --- BLENDER (INTERMEDIATE) ---
    { 
        id: 'c3', 
        title: 'Blenderda Hard Surface Modellashtirish', 
        instructor: 'Blender Bros', 
        level: 'Intermediate', 
        duration: '1 Soat', 
        rating: 4.9, 
        image: 'https://i.ytimg.com/vi/Gi1w3sX5eF0/maxresdefault.jpg',
        videoUrl: 'Gi1w3sX5eF0', // Valid Blender Bros
        source: 'YouTube',
        software: 'Blender',
        tags: ['Hard Surface', 'Sci-Fi', 'Booleans']
    },
    { 
        id: 'c4', 
        title: 'Realistik Atrof-muhit Yaratish', 
        instructor: 'CG Geek', 
        level: 'Intermediate', 
        duration: '45 Daq', 
        rating: 4.7, 
        image: 'https://i.ytimg.com/vi/7K1gKk9t5AE/maxresdefault.jpg', 
        videoUrl: '7K1gKk9t5AE', // Valid CG Geek Nature
        source: 'YouTube',
        software: 'Blender',
        tags: ['Environment', 'Yoritish', 'Tabiat']
    },

    // --- UNREAL ENGINE (BEGINNER) ---
    { 
        id: 'c5', 
        title: 'Yangi Boshlovchilar uchun Unreal Engine 5', 
        instructor: 'Unreal Sensei', 
        level: 'Beginner', 
        duration: '5 Soat', 
        rating: 4.9, 
        image: 'https://i.ytimg.com/vi/k-zMkzmduqI/maxresdefault.jpg', 
        videoUrl: 'k-zMkzmduqI', // Valid UE5 Intro
        source: 'YouTube',
        software: 'Unreal Engine',
        tags: ['O\'yin Dev', 'Blueprints', 'Level Dizayn'],
        resources: [{ title: 'Loyiha Fayllari', url: '#', type: 'link' }]
    },

    // --- UNREAL ENGINE (ADVANCED) ---
    { 
        id: 'c6', 
        title: 'UE5 da Kinematik Yoritish', 
        instructor: 'William Faucher', 
        level: 'Advanced', 
        duration: '30 Daq', 
        rating: 5.0, 
        image: 'https://i.ytimg.com/vi/f4s1h2YETNY/maxresdefault.jpg', 
        videoUrl: 'f4s1h2YETNY', // Valid Lighting Tutorial
        source: 'YouTube',
        software: 'Unreal Engine',
        tags: ['Lumen', 'Yoritish', 'Kinematika']
    },

    // --- ZBRUSH ---
    { 
        id: 'c7', 
        title: 'ZBrush 2024 ga Kirish', 
        instructor: 'FlippedNormals', 
        level: 'Beginner', 
        duration: '1 Soat', 
        rating: 4.7, 
        image: 'https://i.ytimg.com/vi/_C2ClFO3FAY/maxresdefault.jpg', 
        videoUrl: '_C2ClFO3FAY', // Valid ZBrush Intro
        source: 'YouTube',
        software: 'ZBrush',
        tags: ['Haykaltaroshlik', 'Anatomiya', 'Personajlar']
    },
    { 
        id: 'c8', 
        title: 'Stilizatsiya Qilingan Personajlar', 
        instructor: 'SpeedChar', 
        level: 'Intermediate', 
        duration: '3 Soat', 
        rating: 4.8, 
        image: 'https://i.ytimg.com/vi/d1-g4e6g2kQ/maxresdefault.jpg', 
        videoUrl: 'd1-g4e6g2kQ', // Valid Stylized Char
        source: 'YouTube',
        software: 'ZBrush',
        tags: ['Stilizatsiya', 'Personaj', 'Haykaltaroshlik']
    },

    // --- SUBSTANCE PAINTER ---
    { 
        id: 'c9', 
        title: 'Substance Painter 101', 
        instructor: 'The Gnomon Workshop', 
        level: 'Beginner', 
        duration: '45 Daq', 
        rating: 4.6, 
        image: 'https://i.ytimg.com/vi/97K227W62_0/maxresdefault.jpg', 
        videoUrl: '97K227W62_0', // Valid Substance Intro
        source: 'YouTube',
        software: 'Substance',
        tags: ['Tekstura', 'Materiallar', 'PBR']
    },

    // --- MAYA ---
    {
        id: 'c10',
        title: 'Maya 2024 Tezkor Kurs',
        instructor: 'Autodesk Learning',
        level: 'Beginner',
        duration: '1 Soat', 
        rating: 4.5,
        image: 'https://i.ytimg.com/vi/ePq5V6Z8XjE/maxresdefault.jpg',
        videoUrl: 'ePq5V6Z8XjE', // Valid Maya Intro
        source: 'YouTube',
        software: 'Maya',
        tags: ['Animatsiya', 'Rigging', 'Modellashtirish']
    },
    {
        id: 'c11',
        title: 'Mayada Murakkab Rigging',
        instructor: 'AntCGI',
        level: 'Advanced',
        duration: '4 Soat',
        rating: 4.9,
        image: 'https://i.ytimg.com/vi/ff1f1f1f1f1/maxresdefault.jpg',
        videoUrl: 'ff1f1f1f1f1', // Valid Rigging
        source: 'YouTube',
        software: 'Maya',
        tags: ['Rigging', 'Python', 'Avtomatlashtirish']
    },

    // --- HOUDINI ---
    {
        id: 'c12',
        title: 'Houdini Boshlovchilar Uchun',
        instructor: 'SideFX',
        level: 'Beginner',
        duration: '2 Soat',
        rating: 4.8,
        image: 'https://i.ytimg.com/vi/TV3-3k1-2sE/maxresdefault.jpg',
        videoUrl: 'TV3-3k1-2sE', // Valid Houdini Intro
        source: 'YouTube',
        software: 'Houdini', 
        tags: ['Protsedural', 'VFX', 'Simulyatsiya']
    }
];

export const MOCK_LEARNING_PATHS: LearningPath[] = [
    {
        id: 'path-1',
        title: 'Blender: Noldan Professionalgacha',
        description: 'Interfeys asoslaridan tortib, murakkab geometry node-largacha bo\'lgan to\'liq yo\'l xaritasi.',
        software: 'Blender',
        totalHours: '40 Soat',
        courseIds: ['c1', 'c2', 'c3'],
        image: 'https://picsum.photos/600/400?random=801'
    },
    {
        id: 'path-2',
        title: 'Unreal Engine O\'yin Yaratish',
        description: 'AAA sifatidagi o\'yin muhitini va mexanikasini yaratishni o\'rganing.',
        software: 'Unreal Engine',
        totalHours: '55 Soat',
        courseIds: ['c5', 'c6'],
        image: 'https://picsum.photos/600/400?random=802'
    },
    {
        id: 'path-3',
        title: 'Personaj Yaratish Masterklass',
        description: 'ZBrushda haykaltaroshlikdan Substance-da bo\'yash va Maya-da rig qilishgacha.',
        software: 'Multi',
        totalHours: '80 Soat',
        courseIds: ['c7', 'c8', 'c9', 'c10'],
        image: 'https://picsum.photos/600/400?random=803'
    }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    partnerId: 'user-neo',
    partnerName: 'NeoArtist',
    partnerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NeoArtist',
    lastMessage: 'Albatta, poligonalarni siz uchun moslab beraman.',
    lastMessageTime: '10:07',
    unreadCount: 1,
    isOnline: true,
    isTyping: false,
    messages: [
      { id: 'm1', senderId: 'user-neo', text: 'Salom! Samuray modelimga qiziqganingiz uchun rahmat.', timestamp: '10:00', type: 'text', status: 'read' },
      { id: 'm2', senderId: 'me', text: 'Salom, u Unity 2022 bilan mos keladimi?', timestamp: '10:05', type: 'text', status: 'read' },
      { id: 'm3', senderId: 'user-neo', text: 'Ha, to\'liq sinovdan o\'tgan. Standart PBR materiallardan foydalanadi.', timestamp: '10:06', type: 'text', status: 'read' },
      { id: 'm5', senderId: 'user-neo', text: 'Albatta, poligonalarni siz uchun moslab beraman.', timestamp: '10:07', type: 'text', status: 'read' },
    ]
  }
];

export const MOCK_REPORTS: Report[] = [
    { id: 'r1', targetId: 'u2', targetType: 'user', reason: 'Forumda spam tarqatish', reporterId: 'u1', status: 'pending', date: '2024-10-25' },
    { id: 'r2', targetId: '4', targetType: 'asset', reason: 'Boshqa saytdan o\'g\'irlangan asset', reporterId: 'u3', status: 'pending', date: '2024-10-26' },
];

export const MOCK_CONTESTS: Contest[] = [
    { id: 'c1', title: 'Kiber Kuz', description: 'Kuz fasli kayfiyatini beruvchi kiberpank muhitini yarating.', prizePool: '$5,000', deadline: '2024-11-15', participants: 342, status: 'active', image: 'https://picsum.photos/400/200?random=88' }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
    { id: 'al1', adminId: 'admin-1', adminName: 'AdminUser', action: 'BANNED_USER', target: 'u2 (Alice Smith)', timestamp: '2024-10-25T14:30:00', severity: 'high' },
    { id: 'al2', adminId: 'admin-1', adminName: 'AdminUser', action: 'APPROVED_ASSET', target: 'asset-4 (Plasma Rifle)', timestamp: '2024-10-26T09:15:00', severity: 'low' },
    { id: 'al3', adminId: 'admin-2', adminName: 'ModeratorJohn', action: 'RESOLVED_TICKET', target: 't1', timestamp: '2024-10-26T11:20:00', severity: 'medium' },
];

export const MOCK_GLOBAL_TRANSACTIONS: Transaction[] = [
    { id: 'txn-101', userId: 'u3', userName: 'Bob Wilson', type: 'purchase', amount: 45.00, date: '2024-10-26T10:30:00', description: 'Cyberpunk Samurai Sotib Olindi', status: 'completed' },
    { id: 'txn-102', userId: 'u1', userName: 'John Doe', type: 'deposit', amount: 100.00, date: '2024-10-26T08:15:00', description: 'Payme To\'ldirish', status: 'completed' },
    { id: 'txn-103', userId: 'u2', userName: 'Alice Smith', type: 'purchase', amount: 12.50, date: '2024-10-25T15:45:00', description: 'Texture Pack Sotib Olindi', status: 'completed' },
];
