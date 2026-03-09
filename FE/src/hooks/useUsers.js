import { useQuery } from '@tanstack/react-query';
import { usersApi } from '@/api/users.api';
import { useAuthStore } from '@/store/auth.store';

export const useUsers = (searchTerm) => {
    const currentUser = useAuthStore((state) => state.user);

    const searchUsersQuery = useQuery({
        queryKey: ['/users/search', searchTerm],
        queryFn: () => usersApi.search(searchTerm),
        enabled: !!searchTerm,
        select: (response) => {
            const users = response.data || [];
            return users.filter((user) => user.id !== currentUser?.id);
        },
    });

    return {
        users: searchUsersQuery.data || [],
        isLoading: searchUsersQuery.isLoading,
    };
};
