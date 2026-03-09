import Sidebar from '@/components/layout/Sidebar';
import ChatWindow from '@/components/layout/ChatWindow';
import CreateGroupModal from '@/components/layout/CreateGroupModal';
import { useAppStore } from '@/store/app.store';

const ChatPage = () => {
    const selectedConversation = useAppStore((state) => state.selectedConversation);

    return (
        <div className="flex h-screen w-full bg-white dark:bg-zinc-950 overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 relative">
                {selectedConversation ? (
                    <ChatWindow conversation={selectedConversation} />
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50">
                        <div className="p-8 rounded-full bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 mb-4">
                            <svg className="w-12 h-12 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">Select a conversation</h3>
                        <p className="text-sm text-zinc-400">Choose a person or group from the sidebar to start chatting</p>
                    </div>
                )}
            </main>
            <CreateGroupModal />
        </div>
    );
};

export default ChatPage;
