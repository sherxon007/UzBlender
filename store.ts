
import { create } from 'zustand';
import { StoreState, User, Asset, Job, BlogPost, Contest, SupportTicket, Report, PayoutRequest, Transaction, AuditLog, AppNotification, Language, Currency, ViewType, ToastMessage, Conversation, Artwork, Course } from './types';
import { MOCK_ASSETS, MOCK_JOBS, MOCK_BLOGS, MOCK_CONVERSATIONS, MOCK_ARTWORKS, MOCK_COURSES, MOCK_CONTESTS, MOCK_REPORTS, MOCK_AUDIT_LOGS, MOCK_GLOBAL_TRANSACTIONS, MOCK_LEARNING_PATHS } from './services/mockDb';
import { api } from './services/api';

// Persistence Helper
const saveState = (state: StoreState) => {
    // In a real app, we might save specific parts to localStorage
    // localStorage.setItem('uzblender_state', JSON.stringify(state));
};

export const useStore = create<StoreState>((set, get) => ({
    user: null,
    users: [],
    language: 'uz',
    currency: 'UZS',
    exchangeRate: 12500, // Mock rate
    lastRateUpdate: new Date().toISOString(),

    // System Config
    systemSettings: {
        maintenanceMode: false,
        globalBanner: '',
        commissionRate: 0.3,
        allowSignups: true
    },

    // Data Collections
    assets: MOCK_ASSETS,
    jobs: MOCK_JOBS,
    blogPosts: MOCK_BLOGS,
    artworks: MOCK_ARTWORKS,
    courses: MOCK_COURSES,
    learningPaths: MOCK_LEARNING_PATHS,
    cart: [],
    conversations: MOCK_CONVERSATIONS,

    // Admin Collections
    tickets: [], // Mock empty for now
    reports: MOCK_REPORTS,
    payouts: [],
    contests: MOCK_CONTESTS,
    auditLogs: MOCK_AUDIT_LOGS,
    globalTransactions: MOCK_GLOBAL_TRANSACTIONS,

    // UI States
    isAuthOpen: false,
    authMode: 'login',
    isCartOpen: false,
    isWalletOpen: false,
    currentView: 'marketplace',
    activeAssetId: null,
    searchQuery: '',
    toasts: [],
    isLoading: false,
    activeConversationId: null,

    // Actions
    initApp: async () => {
        set({ isLoading: true });
        try {
            // Simulate fetching initial data
            const assets = await api.getAssets();
            const jobs = await api.getJobs();
            const blogPosts = await api.getBlogPosts();
            // Fetch users for admin demo
            const users: User[] = [
                { id: 'u1', name: 'John Doe', email: 'john@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', isCreator: false, joinedDate: '2024-01-01', purchasedAssets: [], wishlist: [], notifications: [], isTelegramLinked: false, balance: 100, balanceLocked: 0, transactions: [] },
                { id: 'u2', name: 'NeoArtist', email: 'neo@artist.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NeoArtist', isCreator: true, sellerStatus: 'approved', joinedDate: '2024-02-15', purchasedAssets: [], wishlist: [], notifications: [], isTelegramLinked: true, balance: 450, balanceLocked: 50, transactions: [] }
            ];
            set({ assets, jobs, blogPosts, users, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            console.error("Failed to init app", error);
        }
    },

    setLanguage: (lang: Language) => set({ language: lang }),
    setCurrency: (curr: Currency) => set({ currency: curr }),
    updateExchangeRate: async () => { /* fetch rate */ },
    formatPrice: (price: number) => {
        const { currency, exchangeRate } = get();
        if (currency === 'UZS') return `${(price * exchangeRate).toLocaleString()} UZS`;
        return `$${price.toFixed(2)}`;
    },

    login: (user: User) => {
        set({ user, isAuthOpen: false });
        get().addToast(`Welcome back, ${user.name}`, 'success');
    },
    logout: () => {
        set({ user: null, currentView: 'marketplace' });
        get().addToast('Logged out successfully', 'info');
    },
    updateUser: async (data: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
            const updatedUser = { ...currentUser, ...data };
            set({ user: updatedUser });
            await api.updateUser(updatedUser);
            get().addToast('Profile updated', 'success');
        }
    },

    setAdminRole: (role) => { /* deprecated usage */ },
    updateUserRole: (targetUserId, role, isAdmin) => {
        const users = get().users.map(u => u.id === targetUserId ? { ...u, adminRole: role, isAdmin } : u);
        set({ users });
    },
    toggleUserBan: (id, status) => {
        const users = get().users.map(u => u.id === id ? { ...u, isBanned: status } : u);
        set({ users });
    },
    verifyCreator: (userId) => {
        const users = get().users.map(u => u.id === userId ? { ...u, sellerStatus: 'approved', isCreator: true } : u);
        set({ users });
    },

    openAuth: (mode = 'login') => set({ isAuthOpen: true, authMode: mode }),
    closeAuth: () => set({ isAuthOpen: false }),

    toggleCart: (isOpen) => set((state) => ({ isCartOpen: isOpen !== undefined ? isOpen : !state.isCartOpen })),
    toggleWallet: (isOpen) => set((state) => ({ isWalletOpen: isOpen !== undefined ? isOpen : !state.isWalletOpen })),
    toggleWishlist: (assetId) => {
        const user = get().user;
        if (!user) return get().openAuth('login');
        const wishlist = user.wishlist.includes(assetId)
            ? user.wishlist.filter(id => id !== assetId)
            : [...user.wishlist, assetId];
        set({ user: { ...user, wishlist } });
        get().addToast(user.wishlist.includes(assetId) ? 'Removed from wishlist' : 'Added to wishlist', 'info');
    },

    setView: (view: ViewType, assetId?: string) => set({ currentView: view, activeAssetId: assetId || null, searchQuery: '' }),
    setSearchQuery: (query: string) => set({ searchQuery: query }),

    addToCart: (asset: Asset) => {
        const { cart } = get();
        if (!cart.find(a => a.id === asset.id)) {
            set({ cart: [...cart, asset], isCartOpen: true });
            get().addToast('Added to cart', 'success');
        } else {
            set({ isCartOpen: true });
        }
    },
    removeFromCart: (assetId: string) => set((state) => ({ cart: state.cart.filter(a => a.id !== assetId) })),
    clearCart: () => set({ cart: [] }),

    uploadAsset: async (data: Partial<Asset>) => {
        // Mock upload
        const newAsset: Asset = {
            id: `asset-${Date.now()}`,
            title: data.title || 'Untitled',
            author: get().user?.name || 'Unknown',
            authorId: get().user?.id || 'unknown',
            authorAvatar: get().user?.avatar || '',
            price: data.price || 0,
            image: 'https://picsum.photos/400/400?random=' + Date.now(),
            category: data.category || 'Prop',
            formats: data.formats || [],
            rating: 0,
            uploadDate: new Date().toISOString(),
            status: 'pending',
            ...data
        } as Asset;
        set((state) => ({ assets: [newAsset, ...state.assets] }));
    },
    approveAsset: async (id) => {
        set((state) => ({ assets: state.assets.map(a => a.id === id ? { ...a, status: 'active' } : a) }));
    },
    rejectAsset: async (id, reason) => {
        set((state) => ({ assets: state.assets.map(a => a.id === id ? { ...a, status: 'rejected', rejectionReason: reason } : a) }));
    },
    updateAsset: async (id, data) => {
        set((state) => ({ assets: state.assets.map(a => a.id === id ? { ...a, ...data } : a) }));
    },
    deleteAsset: async (id) => {
        set((state) => ({ assets: state.assets.filter(a => a.id !== id) }));
    },

    bulkApproveAssets: (ids) => {
         set((state) => ({ assets: state.assets.map(a => ids.includes(a.id) ? { ...a, status: 'active' } : a) }));
    },
    bulkDeleteAssets: (ids) => {
        set((state) => ({ assets: state.assets.filter(a => !ids.includes(a.id)) }));
    },

    submitReview: async (assetId, rating, text) => {
        const { user } = get();
        if (!user) return;
        const newReview = {
            id: `rev-${Date.now()}`,
            assetId,
            userId: user.id,
            userName: user.name,
            userAvatar: user.avatar,
            rating,
            text,
            date: new Date().toISOString()
        };
        set((state) => ({
            assets: state.assets.map(a => a.id === assetId ? { ...a, reviews: [...(a.reviews || []), newReview] } : a)
        }));
        get().addToast('Review submitted', 'success');
    },
    uploadArtwork: (title, type) => {
         const { user, artworks } = get();
         if (!user) return;
         const newArt: Artwork = {
             id: `art-${Date.now()}`,
             title,
             artist: user.name,
             image: `https://picsum.photos/600/800?random=${Date.now()}`,
             likes: 0,
             comments: 0,
             type,
             date: new Date().toISOString()
         };
         set({ artworks: [newArt, ...artworks] });
    },
    deleteArtwork: (id) => {
        set((state) => ({ artworks: state.artworks.filter(a => a.id !== id) }));
    },
    submitContestEntry: (contestId, data) => {
        const { user, contests } = get();
        if (!user) return;
        const newEntry = {
            id: `entry-${Date.now()}`,
            contestId,
            userId: user.id,
            userName: user.name,
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            submittedDate: new Date().toISOString(),
            votes: 0
        };
        set({
            contests: contests.map(c => c.id === contestId ? { ...c, entries: [...(c.entries || []), newEntry], participants: (c.participants || 0) + 1 } : c)
        });
    },
    markCourseComplete: (courseId) => {
        set((state) => ({
            courses: state.courses.map(c => c.id === courseId ? { ...c, isCompleted: true } : c)
        }));
    },

    sendSystemNotification: (userId, title, message) => {
        // In real app, push to user notifications
    },

    updateSystemSettings: (settings) => set((state) => ({ systemSettings: { ...state.systemSettings, ...settings } })),
    addAuditLog: (action, target, details, severity) => {
        const { user, auditLogs } = get();
        const newLog: AuditLog = {
            id: `log-${Date.now()}`,
            adminId: user?.id || 'system',
            adminName: user?.name || 'System',
            action,
            target,
            timestamp: new Date().toISOString(),
            details,
            severity: severity || 'low'
        };
        set({ auditLogs: [newLog, ...auditLogs] });
    },

    createBlogPost: (post) => set((state) => ({ blogPosts: [{ ...post, id: `post-${Date.now()}` } as BlogPost, ...state.blogPosts] })),
    updateBlogPost: (id, data) => set((state) => ({ blogPosts: state.blogPosts.map(p => p.id === id ? { ...p, ...data } : p) })),
    deleteBlogPost: (id) => set((state) => ({ blogPosts: state.blogPosts.filter(p => p.id !== id) })),

    createJob: (job) => set((state) => ({ jobs: [{ ...job, id: `job-${Date.now()}` } as Job, ...state.jobs] })),
    updateJobStatus: (id, status) => set((state) => ({ jobs: state.jobs.map(j => j.id === id ? { ...j, status } : j) })),
    deleteJob: (id) => set((state) => ({ jobs: state.jobs.filter(j => j.id !== id) })),

    createCourse: (course) => set((state) => ({ courses: [{ ...course, id: `course-${Date.now()}` } as Course, ...state.courses] })),
    deleteCourse: (id) => set((state) => ({ courses: state.courses.filter(c => c.id !== id) })),

    resolveTicket: (id) => set((state) => ({ tickets: state.tickets.map(t => t.id === id ? { ...t, status: 'resolved' } : t) })),
    resolveReport: (id) => set((state) => ({ reports: state.reports.map(r => r.id === id ? { ...r, status: 'resolved' } : r) })),
    approvePayout: (id) => set((state) => ({ payouts: state.payouts.map(p => p.id === id ? { ...p, status: 'approved' } : p) })),
    processRefund: (transactionId) => { /* refund logic */ },

    createContest: (contest) => {
      const { contests } = get();
      const newContest: Contest = {
          id: `contest-${Date.now()}`,
          title: contest.title || 'Untitled',
          description: contest.description || '',
          prizePool: contest.prizePool || '$0',
          deadline: contest.deadline || '',
          participants: 0,
          status: contest.status || 'active', // Allow manual status setting
          image: contest.image || ''
      };
      set({ contests: [newContest, ...contests] });
      saveState(get());
      get().addToast('Contest launched', 'success');
    },
    updateContest: (id, data) => set((state) => ({ contests: state.contests.map(c => c.id === id ? { ...c, ...data } : c) })),
    deleteContest: (id) => set((state) => ({ contests: state.contests.filter(c => c.id !== id) })),

    connectTelegramWallet: () => {
        const { user } = get();
        if (user) {
            set({ user: { ...user, isTelegramLinked: true, walletAddress: 'UQ...' + Math.random().toString(36).substring(7) } });
            get().addToast('Telegram wallet connected', 'success');
        }
    },
    refreshWalletBalance: () => {
        // Mock refresh
    },
    topUpWallet: (amount, source) => {
        const { user } = get();
        if (user) {
            const newTransaction: Transaction = {
                id: `txn-${Date.now()}`,
                userId: user.id,
                type: 'deposit',
                amount,
                date: new Date().toISOString(),
                description: `${source} Top-up`,
                status: 'completed'
            };
            set({ user: { ...user, balance: user.balance + amount, transactions: [newTransaction, ...user.transactions] } });
        }
    },
    payWithWallet: (amount) => {
        const { user } = get();
        if (user && user.balance >= amount) {
            set({ user: { ...user, balance: user.balance - amount } });
            return true;
        }
        return false;
    },
    purchaseItems: async () => {
        const { user, cart, payWithWallet, clearCart, addToast } = get();
        const total = cart.reduce((sum, item) => sum + (item.discountPrice || item.price), 0);
        
        if (payWithWallet(total) && user) {
            const newTxn: Transaction = {
                id: `txn-${Date.now()}`,
                userId: user.id,
                type: 'purchase',
                amount: total,
                date: new Date().toISOString(),
                description: `Purchased ${cart.length} items`,
                status: 'completed'
            };
            const updatedUser = {
                ...get().user!,
                purchasedAssets: [...user.purchasedAssets, ...cart.map(a => a.id)],
                transactions: [newTxn, ...(get().user?.transactions || [])]
            };
            set({ user: updatedUser });
            clearCart();
            addToast('Purchase successful!', 'success');
        } else {
            addToast('Insufficient funds', 'error');
        }
    },

    startChat: (partnerName, partnerAvatar, initialMessage) => {
        const { conversations, user, activeConversationId } = get();
        if (!user) return;
        
        // Check if conversation exists (simplified check by name for mock)
        const existing = conversations.find(c => c.partnerName === partnerName);
        if (existing) {
            set({ activeConversationId: existing.id, currentView: 'messages' });
            if (initialMessage) {
                // send message
                get().sendMessage(initialMessage);
            }
        } else {
            const newConv: Conversation = {
                id: `conv-${Date.now()}`,
                partnerId: `partner-${Date.now()}`,
                partnerName,
                partnerAvatar,
                lastMessage: initialMessage || '',
                lastMessageTime: 'Now',
                unreadCount: 0,
                messages: initialMessage ? [{
                    id: `msg-${Date.now()}`,
                    senderId: 'me',
                    text: initialMessage,
                    timestamp: 'Now',
                    type: 'text',
                    status: 'sent'
                }] : []
            };
            set({ conversations: [newConv, ...conversations], activeConversationId: newConv.id, currentView: 'messages' });
        }
    },
    sendMessage: (text, type = 'text', fileData) => {
        const { conversations, activeConversationId } = get();
        if (!activeConversationId) return;
        
        const updatedConversations = conversations.map(c => {
            if (c.id === activeConversationId) {
                const newMsg = {
                    id: `msg-${Date.now()}`,
                    senderId: 'me',
                    text,
                    timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                    type,
                    fileUrl: fileData?.url,
                    fileName: fileData?.name,
                    fileSize: fileData?.size,
                    status: 'sent' as const
                };
                return { ...c, messages: [...c.messages, newMsg], lastMessage: type === 'text' ? text : `Sent a ${type}`, lastMessageTime: 'Now' };
            }
            return c;
        });
        set({ conversations: updatedConversations });
    },
    setActiveConversation: (id) => set({ activeConversationId: id }),
    setTyping: (convId, isTyping) => {}, // Mock

    addToast: (message, type: 'success' | 'info' | 'error' = 'info') => {
        const newToast: ToastMessage = { id: `toast-${Date.now()}`, message, type };
        set((state) => ({ toasts: [...state.toasts, newToast] }));
        setTimeout(() => set((state) => ({ toasts: state.toasts.filter(t => t.id !== newToast.id) })), 3000);
    },
    removeToast: (id) => set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) })),
    markNotificationsRead: () => {
         // Mock
    },
    voteForEntry: (contestId, entryId) => {
        const { user, contests } = get();
        if (!user) return;
        set({
            contests: contests.map(c => {
                if (c.id === contestId) {
                    return {
                        ...c,
                        // CRITICAL FIX: Ensure entries is an array before mapping
                        entries: (c.entries || []).map(e => {
                            if (e.id === entryId) {
                                // Toggle vote
                                const hasVoted = e.votedUserIds?.includes(user.id);
                                const votedUserIds = hasVoted ? e.votedUserIds?.filter(id => id !== user.id) : [...(e.votedUserIds || []), user.id];
                                return { ...e, votes: votedUserIds?.length || 0, votedUserIds };
                            }
                            return e;
                        })
                    }
                }
                return c;
            })
        });
        get().addToast('Vote registered', 'success');
    }
}));
