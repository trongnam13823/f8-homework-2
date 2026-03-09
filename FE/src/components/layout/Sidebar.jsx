import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useAppStore } from '@/store/app.store';
import { useConversations } from '@/hooks/useConversations';
import { useUsers } from '@/hooks/useUsers';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { LogOut, Plus, Search, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import ConversationItem from '@/components/layout/ConversationItem';

const Sidebar = () => {
    const user = useAuthStore((state) => state.user);
    const { logout } = useAuth();
    const { conversations, createConversation } = useConversations();
    const toggleGroupModal = useAppStore((state) => state.toggleGroupModal);

    const [searchTerm, setSearchTerm] = useState('');
    const { users: searchResults, isLoading: isSearching } = useUsers(searchTerm);

    const handleUserClick = (targetUser) => {
        createConversation({
            type: 'dm',
            users: [targetUser.id],
        });
        setSearchTerm('');
    };

    return (
        <aside className="w-[300px] border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-full bg-zinc-50/50 dark:bg-zinc-900/50">
            {/* User Profile */}
            <div className="h-[64px] px-4 flex items-center justify-between bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-zinc-200 dark:border-zinc-700">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} />
                        <AvatarFallback>{user?.name?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold truncate">{user?.name}</span>
                        <span className="text-xs text-zinc-500 truncate">{user?.email}</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={logout} className="text-zinc-500 hover:text-red-500 transition-colors">
                    <LogOut className="h-4 w-4" />
                </Button>
            </div>

            {/* Search Bar */}
            <div className="p-4">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search users..."
                        className="pl-9 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {searchTerm && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-xl z-50 overflow-hidden">
                            {searchResults.length > 0 ? (
                                <div className="max-h-[300px] overflow-y-auto">
                                    {searchResults.map((u) => (
                                        <button
                                            key={u.id}
                                            className="w-full p-2 flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left"
                                            onClick={() => handleUserClick(u)}
                                        >
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`} />
                                                <AvatarFallback>{u.name?.charAt(0) || '?'}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-sm font-medium truncate">{u.name}</span>
                                                <span className="text-xs text-zinc-500 truncate">{u.email}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-3 text-sm text-zinc-500 text-center">No users found</div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="px-4 mb-2 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Conversations</h3>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-[10px] font-bold uppercase tracking-tight gap-1 hover:bg-primary hover:text-white transition-all"
                    onClick={() => toggleGroupModal(true)}
                >
                    <Users className="h-3 w-3" />
                    New Group
                </Button>
            </div>

            {/* Conversations List */}
            <ScrollArea className="flex-1">
                <div className="px-2 pb-4 space-y-0.5">
                    {conversations.map((conv) => (
                        <ConversationItem key={conv.id} conversation={conv} />
                    ))}
                    {conversations.length === 0 && (
                        <div className="p-4 text-center text-sm text-zinc-500">
                            No conversations yet
                        </div>
                    )}
                </div>
            </ScrollArea>
        </aside>
    );
};

export default Sidebar;
