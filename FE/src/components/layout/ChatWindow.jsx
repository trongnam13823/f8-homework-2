import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Send, MoreVertical, Phone, Video, Info } from 'lucide-react';
import { useMessages } from '@/hooks/useMessages';
import { useAuthStore } from '@/store/auth.store';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const ChatWindow = ({ conversation }) => {
    const scrollRef = useRef(null);
    const inputRef = useRef(null);
    const isInitialLoad = useRef(true);

    const currentUser = useAuthStore((state) => state.user);
    const {
        messages,
        sendMessage,
        isSending,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useMessages(conversation.id);
    const [content, setContent] = useState('');

    const isSendingMessage = useRef(false);

    const handleSend = (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        isSendingMessage.current = true;
        sendMessage({ content });
        setContent('');
    };

    const { sentinelRef, prevScrollHeightRef } = useInfiniteScroll({
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        scrollRef
    });

    // Xử lý vị trí cuộn (Scroll Position)
    useEffect(() => {
        const viewport = scrollRef.current;
        if (!viewport) return;

        if (isInitialLoad.current && messages.length > 0) {
            // Lần đầu vào chat: Cuộn thẳng xuống dưới cùng
            viewport.scrollTo({ top: viewport.scrollHeight });
            isInitialLoad.current = false;
        } else if (prevScrollHeightRef.current > 0) {
            // Khi load tin nhắn cũ: Giữ nguyên vị trí cuộn hiện tại để người dùng không bị nhảy khung hình
            const newScrollHeight = viewport.scrollHeight;
            const scrollDiff = newScrollHeight - prevScrollHeightRef.current;
            viewport.scrollTop = scrollDiff;
            prevScrollHeightRef.current = 0;
        } else if (isSendingMessage.current) {
            // Khi vừa gửi tin nhắn: Bắt buộc cuộn mượt xuống dưới cùng
            viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
            isSendingMessage.current = false;
        } else {
            // Khi nhận tin nhắn mới từ người khác: Chỉ cuộn xuống nếu người dùng đang ở gần đáy
            const isNearBottom = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 200;
            if (isNearBottom) {
                viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
            }
        }
    }, [messages]);

    // Reset initial load when conversation changes
    useEffect(() => {
        isInitialLoad.current = true;
    }, [conversation.id]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [conversation.id]);

    const isGroup = conversation.type === 'group';
    const users = conversation.users || conversation.members?.map(m => m.user) || [];
    const displayName = isGroup
        ? conversation.name || 'Unnamed Group'
        : users.find(u => u.id !== currentUser?.id)?.name || users[0]?.name || 'User';

    return (
        <div className="flex flex-col h-full bg-white dark:bg-zinc-950">
            {/* Header */}
            <header className="h-[64px] border-b border-zinc-200 dark:border-zinc-800 px-6 flex items-center justify-between shrink-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-zinc-100 dark:border-zinc-800">
                        <AvatarImage src={`https://api.dicebear.com/7.x/${isGroup ? 'initials' : 'avataaars'}/svg?seed=${displayName}`} />
                        <AvatarFallback>{displayName.charAt(0) || '?'}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                        <h2 className="text-sm font-bold truncate tracking-tight">{displayName}</h2>
                        <p className="text-[11px] text-green-500 font-medium flex items-center gap-1">
                            <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                            Online
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-zinc-400">
                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-primary">
                        <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-primary">
                        <Video className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="mx-1 h-6 bg-zinc-200/50" />
                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-primary">
                        <Info className="h-4 w-4" />
                    </Button>
                </div>
            </header>

            {/* Messages */}
            <div className="flex-1 min-h-0 relative">
                <ScrollArea
                    className="h-full"
                    viewportRef={scrollRef}
                >
                    <div className="p-6 pb-2 space-y-6 flex flex-col min-h-full">
                        {/* Sentinel for infinite scroll */}
                        <div ref={sentinelRef} className="h-8 flex items-center justify-center">
                            {isFetchingNextPage && <span className="text-xs text-zinc-400 animate-pulse">Loading older messages...</span>}
                        </div>

                        {Array.isArray(messages) && messages.map((msg, index) => {
                            const isMine = msg.senderId === currentUser?.id || msg.isOptimistic;

                            return (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex items-end gap-2 group",
                                        isMine ? "flex-row-reverse" : "flex-row"
                                    )}
                                >
                                    {!isMine && (
                                        <Avatar className="h-8 w-8 transition-transform group-hover:scale-105">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.sender?.name}`} />
                                            <AvatarFallback>{msg.sender?.name?.[0]}</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn(
                                        "flex flex-col max-w-[70%]",
                                        isMine ? "items-end" : "items-start"
                                    )}>
                                        {!isMine && (
                                            <span className="text-[10px] font-bold text-zinc-500 mb-1 ml-1 uppercase tracking-wider italic">
                                                {msg.sender?.name}
                                            </span>
                                        )}
                                        <div className={cn(
                                            "px-4 py-2.5 rounded-2xl text-sm shadow-sm transition-all",
                                            isMine
                                                ? "bg-primary text-white rounded-br-none"
                                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-none",
                                            msg.isOptimistic && "opacity-70 animate-pulse"
                                        )}>
                                            {msg.content}
                                        </div>
                                        <span className="text-[9px] text-zinc-400 mt-1.5 font-medium px-1">
                                            {format(new Date(msg.createdAt), 'HH:mm')}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </div>

            {/* Input */}
            <div className="p-6 pt-2 bg-linear-to-t from-white dark:from-zinc-950 via-white dark:via-zinc-950 to-transparent">
                <form
                    onSubmit={handleSend}
                    className="flex items-center gap-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-inner group transition-all focus-within:ring-2 ring-primary/20 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950"
                >
                    <Input
                        placeholder="Type a message..."
                        className="border-none bg-transparent focus-visible:ring-0 shadow-none text-sm h-12"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        ref={inputRef}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="h-10 w-10 mr-0.5 shrink-0 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95"
                        disabled={!content.trim() || isSending}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChatWindow;
