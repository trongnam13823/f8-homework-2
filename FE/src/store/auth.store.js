import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            login: ({ user, accessToken }) => set({ user, accessToken }),
            logout: () => set({ user: null, accessToken: null }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
