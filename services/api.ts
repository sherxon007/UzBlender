
import { Asset, Job, BlogPost, User, Conversation } from '../types';
import { MOCK_ASSETS, MOCK_JOBS, MOCK_BLOGS, MOCK_CONVERSATIONS } from './mockDb';

// Simulate Network Latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class ApiService {
    // --- ASSETS ---
    async getAssets(): Promise<Asset[]> {
        await delay(500); // Simulate network
        const storedAssets = localStorage.getItem('uzblender_assets');
        if (storedAssets) return JSON.parse(storedAssets);
        return MOCK_ASSETS;
    }

    async createAsset(asset: Asset): Promise<Asset> {
        await delay(1000);
        // In real backend, this saves to DB. Here we simulate it.
        return asset;
    }

    async updateAssetStatus(id: string, status: 'active' | 'rejected', reason?: string): Promise<void> {
        await delay(600);
        console.log(`[API] Asset ${id} status updated to ${status}. Reason: ${reason}`);
    }

    // --- JOBS ---
    async getJobs(): Promise<Job[]> {
        await delay(400);
        return MOCK_JOBS;
    }

    // --- BLOG ---
    async getBlogPosts(): Promise<BlogPost[]> {
        await delay(300);
        return MOCK_BLOGS;
    }

    // --- USER ---
    async updateUser(user: User): Promise<User> {
        await delay(800);
        return user;
    }

    // --- CHAT ---
    async getConversations(): Promise<Conversation[]> {
        await delay(200);
        return MOCK_CONVERSATIONS;
    }
}

export const api = new ApiService();
