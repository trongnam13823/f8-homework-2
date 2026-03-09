import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useAuth = () => {
    const navigate = useNavigate();
    const loginAction = useAuthStore((state) => state.login);
    const logoutAction = useAuthStore((state) => state.logout);

    const loginMutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: (response) => {
            loginAction(response.data);

            toast.success('Login successfully!');
            navigate('/chat');
        },
        onError: (error) => {
            toast.error(error.message || 'Login failed');
        }
    });

    const registerMutation = useMutation({
        mutationFn: authApi.register,
        onSuccess: () => {
            toast.success('Account created successfully! Please login.');
            navigate('/login');
        },
        onError: (error) => {
            toast.error(error.message || 'Registration failed');
        }
    });

    const logout = () => {
        logoutAction();
        toast.info('Logged out');
        navigate('/login');
    };

    return {
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        register: registerMutation.mutate,
        isRegistering: registerMutation.isPending,
        logout,
    };
};
