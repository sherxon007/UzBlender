

export type Language = 'uz' | 'ru' | 'en';
export type Currency = 'USD' | 'UZS'; // New Currency Type
export type AdminRole = 'super_admin' | 'moderator' | 'support' | 'editor' | 'finance_manager';
export type AssetStatus = 'active' | 'pending' | 'rejected' | 'draft';
export type JobStatus = 'active' | 'pending' | 'closed' | 'rejected';

export interface SystemSettings {
    maintenanceMode: boolean;
    globalBanner: string;
    commissionRate: number;
    allowSignups: boolean;
}

export interface Transaction {
    id: string;
    userId?: string;
    userName?: string;
    type: 'deposit' | 'purchase' | 'refund' | 'sale';
    amount: number;
    date: string;
    description: string;
    status: 'completed' | 'pending' | 'failed' | 'refunded';
}

export interface AuditLog {
    id: string;
    adminId: string;
    adminName: string;
    action: string;
    target: string;
    timestamp: string;
    details?: string;
    severity: 'low' | 'medium' | 'high';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isCreator: boolean;
  isAdmin?: boolean; 
  adminRole?: AdminRole;
  joinedDate: string;
  purchasedAssets: string[]; 
  wishlist: string[]; 
  notifications: AppNotification[];
  
  // Seller Specifics
  sellerStatus?: 'none' | 'pending' | 'approved' | 'rejected';
  portfolioUrl?: string;
  primarySoftware?: string;
  phone?: string;

  // Wallet Integration
  isTelegramLinked: boolean;
  walletAddress?: string; 
  balance: number; 
  balanceLocked: number; 
  transactions: Transaction[]; 
  
  // Admin Control
  isBanned?: boolean; 

  // Profile
  bio?: string;
  location?: string;
  website?: string;
  skills?: string;
}

// NEW ADMIN TYPES
export interface SupportTicket {
    id: string;
    userId: string;
    userName: string;
    subject: string;
    message: string;
    status: 'open' | 'resolved' | 'closed';
    date: string;
    priority: 'low' | 'medium' | 'high';
}

export interface Report {
    id: string;
    targetId: string;
    targetType: 'asset' | 'user' | 'comment';
    reason: string;
    reporterId: string;
    status: 'pending' | 'resolved';
    date: string;
}

export interface PayoutRequest {
    id: string;
    userId: string;
    userName: string;
    amount: number;
    method: 'card' | 'bank';
    status: 'pending' | 'approved' | 'rejected';
    date: string;
}

export interface ContestEntry {
    id: string;
    contestId: string;
    userId: string;
    userName: string;
    title: string;
    description: string;
    imageUrl: string;
    submittedDate: string;
    votes: number;
    votedUserIds?: string[]; // Track who voted
}

export interface Contest {
    id: string;
    title: string;
    description: string;
    prizePool: string;
    deadline: string;
    participants: number;
    status: 'active' | 'completed' | 'draft';
    image: string;
    entries?: ContestEntry[];
}

export interface AppNotification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    date: string;
}

export interface Review {
    id: string;
    assetId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    rating: number;
    text: string;
    date: string;
}

export interface Asset {
  id: string;
  title: string;
  description?: string;
  author: string;
  authorId: string;
  authorAvatar: string;
  price: number; 
  discountPrice?: number;
  image: string;
  category: 'Character' | 'Vehicle' | 'Environment' | 'Weapon' | 'Prop';
  formats: string[];
  rating: number;
  reviews?: Review[];
  polygons?: string;
  vertices?: string;
  uploadDate: string;
  status: AssetStatus; 
  rejectionReason?: string;
}

export interface Job {
    id: string;
    title: string;
    company: string;
    budget: string;
    type: 'Contract' | 'Full-time' | 'Part-time' | 'One-time';
    experienceLevel: 'Junior' | 'Middle' | 'Senior' | 'Lead';
    skills: string[];
    description: string;
    postedDate: string;
    featured: boolean;
    authorId: string;
    status: JobStatus;
    applicationsCount: number;
}

export interface BlogPost {
    id: string;
    title: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    desc: string;
    content?: string;
}

export interface Artwork {
    id: string;
    title: string;
    artist: string;
    artistAvatar?: string;
    image: string;
    likes: number;
    comments: number;
    type: string;
    date: string;
    software?: string[]; // e.g. ['Blender', 'Substance']
    description?: string;
}

export interface CourseResource {
    title: string;
    url: string;
    type: 'file' | 'link';
}

export interface Course {
    id: string;
    title: string;
    instructor: string; 
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    rating: number; 
    image: string; 
    videoUrl?: string; 
    source?: 'YouTube' | 'Vimeo' | 'Local';
    software: 'Blender' | 'Unreal Engine' | 'Maya' | 'ZBrush' | 'Substance' | 'Houdini';
    tags: string[];
    resources?: CourseResource[]; // Download links for source files
    isCompleted?: boolean;
}

export interface LearningPath {
    id: string;
    title: string;
    description: string;
    software: string;
    totalHours: string;
    courseIds: string[]; // Linked courses
    image: string;
}

export interface Message {
  id: string;
  senderId: string;
  text?: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'system';
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  lastMessage: string;
  lastMessageTime: string; 
  unreadCount: number;
  messages: Message[];
  isOnline?: boolean;
  isTyping?: boolean; 
}

export type ViewType = 'marketplace' | 'community' | 'learn' | 'product' | 'dashboard' | 'support' | 'seller' | 'settings' | 'messages' | 'admin' | 'jobs' | 'blog' | 'contests';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export interface StoreState {
  user: User | null;
  users: User[]; // All users for admin
  language: Language;
  currency: Currency; 
  exchangeRate: number; // Dynamic Rate
  lastRateUpdate: string;
  
  // System Config
  systemSettings: SystemSettings;

  // Data Collections
  assets: Asset[];
  jobs: Job[];
  blogPosts: BlogPost[];
  artworks: Artwork[];
  courses: Course[];
  learningPaths: LearningPath[];
  cart: Asset[];
  conversations: Conversation[];
  
  // Admin Collections
  tickets: SupportTicket[];
  reports: Report[];
  payouts: PayoutRequest[];
  contests: Contest[];
  auditLogs: AuditLog[];
  globalTransactions: Transaction[];

  // UI States
  isAuthOpen: boolean;
  authMode: 'login' | 'signup';
  isCartOpen: boolean;
  isWalletOpen: boolean; 
  currentView: ViewType;
  activeAssetId: string | null; 
  searchQuery: string;
  toasts: ToastMessage[];
  isLoading: boolean;
  activeConversationId: string | null;

  // Actions
  initApp: () => Promise<void>;
  
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  updateExchangeRate: () => Promise<void>; // Fetch live rate
  formatPrice: (price: number) => string; 
  
  login: (user: User) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  
  // User Governance Actions
  setAdminRole: (role: AdminRole) => void; // Self (deprecated usage, check context)
  updateUserRole: (targetUserId: string, role: AdminRole | undefined, isAdmin: boolean) => void; // Admin action
  toggleUserBan: (id: string, status: boolean) => void; 
  verifyCreator: (userId: string) => void;

  openAuth: (mode?: 'login' | 'signup') => void;
  closeAuth: () => void;
  
  toggleCart: (isOpen?: boolean) => void;
  toggleWallet: (isOpen?: boolean) => void; 
  toggleWishlist: (assetId: string) => void; 
  
  setView: (view: ViewType, assetId?: string) => void;
  setSearchQuery: (query: string) => void;
  
  addToCart: (asset: Asset) => void;
  removeFromCart: (assetId: string) => void;
  clearCart: () => void;
  
  // Backend Actions
  uploadAsset: (data: Partial<Asset>) => Promise<void>;
  approveAsset: (id: string) => Promise<void>;
  rejectAsset: (id: string, reason: string) => Promise<void>;
  updateAsset: (id: string, data: Partial<Asset>) => Promise<void>; 
  deleteAsset: (id: string) => Promise<void>; 
  
  // Bulk Actions
  bulkApproveAssets: (ids: string[]) => void;
  bulkDeleteAssets: (ids: string[]) => void;
  
  submitReview: (assetId: string, rating: number, text: string) => Promise<void>;
  uploadArtwork: (title: string, type: string) => void;
  deleteArtwork: (id: string) => void; // NEW
  submitContestEntry: (contestId: string, data: { title: string, description: string, imageUrl: string }) => void;
  markCourseComplete: (courseId: string) => void; 
  
  sendSystemNotification: (userId: string, title: string, message: string) => void;
  
  // System Management
  updateSystemSettings: (settings: Partial<SystemSettings>) => void;
  addAuditLog: (action: string, target: string, details?: string, severity?: 'low' | 'medium' | 'high') => void;

  // Admin New Actions
  createBlogPost: (post: Partial<BlogPost>) => void;
  updateBlogPost: (id: string, data: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  
  createJob: (job: Partial<Job>) => void; 
  updateJobStatus: (id: string, status: JobStatus) => void;
  deleteJob: (id: string) => void;

  createCourse: (course: Partial<Course>) => void; // NEW
  deleteCourse: (id: string) => void; // NEW
  
  resolveTicket: (id: string) => void;
  resolveReport: (id: string) => void;
  approvePayout: (id: string) => void;
  processRefund: (transactionId: string) => void;
  
  createContest: (contest: Partial<Contest>) => void;
  updateContest: (id: string, data: Partial<Contest>) => void; 
  deleteContest: (id: string) => void;

  // Wallet
  connectTelegramWallet: () => void;
  refreshWalletBalance: () => void;
  topUpWallet: (amount: number, source: string) => void;
  payWithWallet: (amount: number) => boolean; 
  purchaseItems: () => Promise<void>;

  // Chat
  startChat: (partnerName: string, partnerAvatar: string, initialMessage?: string) => void; 
  sendMessage: (text: string, type?: 'text' | 'image' | 'file', fileData?: {url: string, name: string, size: string}) => void;
  setActiveConversation: (id: string) => void;
  setTyping: (convId: string, isTyping: boolean) => void;

  // System
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  markNotificationsRead: () => void;
}
