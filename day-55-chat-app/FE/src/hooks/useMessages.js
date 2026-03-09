import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { messagesApi } from '@/api/messages.api';
import { useAuthStore } from '@/store/auth.store';
import pusher from '@/lib/pusher';

export const useMessages = (conversationId) => {
    const queryClient = useQueryClient();
    const currentUser = useAuthStore((state) => state.user);

    const messagesQuery = useInfiniteQuery({
        queryKey: ['messages', conversationId],
        queryFn: ({ pageParam }) => messagesApi.list(conversationId, { before: pageParam }),
        getNextPageParam: (lastPage) => {
            if (lastPage.data?.hasMore && lastPage.data.messages.length > 0) {
                // To fetch "older" messages, we need the ID of the FIRST message in current batch (oldest)
                return lastPage.data.messages[0].id;
            }
            return undefined;
        },
        initialPageParam: undefined,
        enabled: !!conversationId,
    });

    useEffect(() => {
        if (!conversationId) return;

        const channelName = `chat.${conversationId}`;
        const channel = pusher.subscribe(channelName);

        channel.bind('message.new', (newMessage) => {
            // Chỉ cập nhật cache nếu tin nhắn không phải do chính mình gửi
            // Vì tin nhắn mình gửi đã được xử lý bởi optimistic update/mutation success
            if (newMessage.senderId !== currentUser?.id) {
                queryClient.setQueryData(['messages', conversationId], (old) => {
                    if (!old) return old;

                    // Thêm tin nhắn mới vào trang đầu tiên (trang chứa tin nhắn mới nhất)
                    const newPages = [...old.pages];
                    if (newPages.length > 0) {
                        // Check if message already exists to prevent duplicates
                        const exists = newPages[0].data.messages.some(m => m.id === newMessage.id);
                        if (exists) return old;

                        newPages[0] = {
                            ...newPages[0],
                            data: {
                                ...newPages[0].data,
                                messages: [...newPages[0].data.messages, newMessage]
                            }
                        };
                    }

                    return {
                        ...old,
                        pages: newPages
                    };
                });
            }
        });

        return () => {
            pusher.unsubscribe(channelName);
        };
    }, [conversationId, queryClient, currentUser?.id]);

    const sendMessageMutation = useMutation({
        mutationFn: (data) => messagesApi.create(conversationId, data),
        onMutate: async (newMessage) => {
            await queryClient.cancelQueries({ queryKey: ['messages', conversationId] });
            const previousMessages = queryClient.getQueryData(['messages', conversationId]);
            const tempId = Date.now().toString();

            // Optimistic update for InfiniteQuery
            queryClient.setQueryData(['messages', conversationId], (old) => {
                if (!old) return old;

                const dummyMessage = {
                    id: tempId,
                    content: newMessage.content,
                    senderId: currentUser?.id,
                    createdAt: new Date().toISOString(),
                    isOptimistic: true,
                    sender: currentUser
                };

                // Add to the first page (most recent)
                const newPages = [...old.pages];
                if (newPages.length > 0) {
                    newPages[0] = {
                        ...newPages[0],
                        data: {
                            ...newPages[0].data,
                            messages: [...newPages[0].data.messages, dummyMessage]
                        }
                    };
                }

                return {
                    ...old,
                    pages: newPages
                };
            });

            return { previousMessages, tempId };
        },
        onSuccess: (response, _, context) => {
            const realMessage = response.data;

            queryClient.setQueryData(['messages', conversationId], (old) => {
                if (!old) return old;

                const newPages = old.pages.map(page => ({
                    ...page,
                    data: {
                        ...page.data,
                        messages: page.data.messages.map((msg) =>
                            msg.id === context.tempId ? realMessage : msg
                        )
                    }
                }));

                return {
                    ...old,
                    pages: newPages
                };
            });
        },
        onError: (err, newMessage, context) => {
            queryClient.setQueryData(['messages', conversationId], context.previousMessages);
        },
    });

    // Flatten pages into a single chronological message list
    // Since page 0 is newest batch and page N is oldest:
    // Page 0: [M21...M40]
    // Page 1: [M1...M20]
    // Flattened correctly: [...Page1.messages, ...Page0.messages] -> [M1...M40]
    const messages = messagesQuery.data?.pages
        ? [...messagesQuery.data.pages].reverse().flatMap((page) => page.data?.messages || [])
        : [];

    return {
        messages,
        isLoading: messagesQuery.isLoading,
        isFetchingNextPage: messagesQuery.isFetchingNextPage,
        hasNextPage: messagesQuery.hasNextPage,
        fetchNextPage: messagesQuery.fetchNextPage,
        sendMessage: sendMessageMutation.mutate,
        isSending: sendMessageMutation.isPending,
    };
};
