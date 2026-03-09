import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ChatPage from '@/pages/ChatPage';
import ProtectedRoute from '@/routes/ProtectedRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/chat" />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/chat',
                element: <ChatPage />,
            },
        ],
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
