import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppStore } from '@/store/app.store';
import { useAuthStore } from '@/store/auth.store';
import { cn } from '@/lib/utils';

const ConversationItem = ({ conversation }) => {
    const selectedConversation = useAppStore((state) => state.selectedConversation);
    const setSelectedConversation = useAppStore((state) => state.setSelectedConversation);
    const currentUser = useAuthStore((state) => state.user);

    const isActive = selectedConversation?.id === conversation.id;

    // For DMs, show the other user's name
    const isGroup = conversation.type === 'group';
    const getDisplayName = () => {
        if (isGroup) return conversation.name || 'Unnamed Group';
        const users = conversation.users || conversation.members?.map(m => m.user) || [];
        const otherUser = users.find(u => u.id !== currentUser?.id) || users[0];
        return otherUser?.name || 'Unknown User';
    };

    const displayName = getDisplayName();

    const lastMessage = conversation.lastMessage;
    const lastMessageDate = conversation.updatedAt ? new Date(conversation.updatedAt) : null;

    return (
        <button
            onClick={() => setSelectedConversation(conversation)}
            className={cn(
                "w-full group flex items-start gap-3 p-3 rounded-lg transition-all duration-200 text-left",
                isActive
                    ? "bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50 border border-transparent"
            )}
        >
            <div className="relative">
                <Avatar className="h-11 w-11 border border-zinc-100 dark:border-zinc-800">
                    <AvatarImage src={`https://api.dicebear.com/7.x/${isGroup ? 'initials' : 'avataaars'}/svg?seed=${displayName}`} />
                    <AvatarFallback>{displayName.charAt(0) || '?'}</AvatarFallback>
                </Avatar>
                {/* Simple active indicator for DM demo */}
                {!isGroup && <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full" />}
            </div>

            <div className="flex-1 min-w-0 py-0.5">
                <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className={cn(
                        "text-sm font-semibold truncate",
                        isActive ? "text-primary" : "text-zinc-900 dark:text-zinc-100"
                    )}>
                        {displayName}
                    </h4>
                    {lastMessageDate && (
                        <span className="text-[10px] text-zinc-400 font-medium">
                            {formatDistanceToNow(lastMessageDate, { addSuffix: false })}
                        </span>
                    )}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate line-clamp-1 leading-relaxed">
                    {lastMessage ? (
                        <>
                            {lastMessage.sender?.name && (
                                <span className="font-medium text-zinc-400 mr-1">{lastMessage.sender.name}:</span>
                            )}
                            {lastMessage.content}
                        </>
                    ) : (
                        'No messages yet'
                    )}
                </p>
            </div>
        </button>
    );
};

export default ConversationItem;
