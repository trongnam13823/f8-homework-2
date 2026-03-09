import { create } from 'zustand';

export const useAppStore = create((set) => ({
    selectedConversation: null,
    isGroupModalOpen: false,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
    toggleGroupModal: (open) => set((state) => ({
        isGroupModalOpen: open !== undefined ? open : !state.isGroupModalOpen
    })),
}));
