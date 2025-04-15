import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  companyName: string;
  subscription: string | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, companyName: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // TODO: Implement actual authentication
        const mockUser = {
          id: '1',
          email,
          companyName: 'Test Company',
          subscription: null,
        };
        set({ user: mockUser, isAuthenticated: true });
      },
      register: async (email: string, password: string, companyName: string) => {
        // TODO: Implement actual registration
        const mockUser = {
          id: '1',
          email,
          companyName,
          subscription: null,
        };
        set({ user: mockUser, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);