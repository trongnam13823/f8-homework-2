import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { conversationsApi } from '@/api/conversations.api';
import { useAppStore } from '@/store/app.store';
import { useAuthStore } from '@/store/auth.store';
import pusher from '@/lib/pusher';

export const useConversations = () => {
    const queryClient = useQueryClient();
    const setSelectedConversation = useAppStore((state) => state.setSelectedConversation);

    const currentUser = useAuthStore((state) => state.user);
    const activeSubs = useRef(new Set());

    const conversationsQuery = useQuery({
        queryKey: ['conversations'],
        queryFn: conversationsApi.list,
        select: (response) => response.data || [],
    });

    const conversations = conversationsQuery.data || [];

    useEffect(() => {
        if (!currentUser?.id) return;

        // 1. Subscribe to individual conversation channels
        conversations.forEach((conv) => {
            const channelName = `chat.${conv.id}`;
            if (!activeSubs.current.has(channelName)) {
                const channel = pusher.subscribe(channelName);

                channel.bind('message.new', (newMessage) => {
                    // Cập nhật danh sách hội thoại (Sidebar)
                    queryClient.setQueryData(['conversations'], (old) => {
                        if (!old) return old;

                        const conversationIndex = old.findIndex(c => c.id === conv.id);
                        if (conversationIndex === -1) return old;

                        const updatedConversations = [...old];
                        const updatedConv = {
                            ...updatedConversations[conversationIndex],
                            lastMessage: newMessage,
                            updatedAt: newMessage.createdAt
                        };

                        // Đưa lên đầu danh sách
                        updatedConversations.splice(conversationIndex, 1);
                        updatedConversations.unshift(updatedConv);

                        return updatedConversations;
                    });

                    // Cập nhật cache tin nhắn (để khi click vào là có sẵn tin nhắn mới)
                    // Chỉ cập nhật nếu không phải do chính mình gửi (vì mutation đã lo việc đó)
                    if (newMessage.senderId !== currentUser.id) {
                        queryClient.setQueryData(['messages', conv.id], (old) => {
                            if (!old) return old;

                            const newPages = [...old.pages];
                            if (newPages.length > 0) {
                                // Tránh trùng lặp
                                if (newPages[0].data.messages.some(m => m.id === newMessage.id)) return old;

                                newPages[0] = {
                                    ...newPages[0],
                                    data: {
                                        ...newPages[0].data,
                                        messages: [...newPages[0].data.messages, newMessage]
                                    }
                                };
                            }
                            return { ...old, pages: newPages };
                        });
                    }
                });
                activeSubs.current.add(channelName);
            }
        });

        // 2. Subscribe to user-specific channel for "Global" events (vd: được mời vào group mới)
        const userChannelName = `user.${currentUser.id}`;
        if (!activeSubs.current.has(userChannelName)) {
            const userChannel = pusher.subscribe(userChannelName);

            userChannel.bind('conversation.updated', (data) => {
                // Nếu là update từ channel user, ta invalidate để đảm bảo đồng bộ hoàn toàn
                queryClient.invalidateQueries({ queryKey: ['conversations'] });
            });
            activeSubs.current.add(userChannelName);
        }

        return () => {
            // Không cần unsubscribe ngay ở đây vì 'conversations' thay đổi liên tục sẽ gây ra vòng lặp sub/unsub
            // Ta sẽ unsubscribe khi hook thực sự bị hủy (unmount component)
        };
    }, [currentUser?.id, conversations, queryClient]);

    // Cleanup khi component unmount
    useEffect(() => {
        return () => {
            activeSubs.current.forEach(channelName => {
                pusher.unsubscribe(channelName);
            });
            activeSubs.current.clear();
        };
    }, []);

    const createConversationMutation = useMutation({
        mutationFn: conversationsApi.create,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
            setSelectedConversation(response.data);
        },
    });

    return {
        conversations: conversationsQuery.data || [],
        isLoading: conversationsQuery.isLoading,
        createConversation: createConversationMutation.mutate,
        isCreating: createConversationMutation.isPending,
    };
};
