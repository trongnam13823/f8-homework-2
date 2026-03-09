import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema } from '@/schemas/auth.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const RegisterPage = () => {
    const { register: registerUser, isRegistering } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data) => {
        registerUser(data);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
            <Card className="w-full max-w-96 shadow-lg border-zinc-200 dark:border-zinc-800">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight text-center">Create an account</CardTitle>
                    <CardDescription className="text-center">
                        Enter your information to get started
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                {...register('name')}
                                className={errors.name ? 'border-red-500 focus-visible:ring-0 focus-visible:border-red-500' : ''}
                            />
                            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register('email')}
                                className={errors.email ? 'border-red-500 focus-visible:ring-0 focus-visible:border-red-500' : ''}
                            />
                            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register('password')}
                                className={errors.password ? 'border-red-500 focus-visible:ring-0 focus-visible:border-red-500' : ''}
                            />
                            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                {...register('confirmPassword')}
                                className={errors.confirmPassword ? 'border-red-500 focus-visible:ring-0 focus-visible:border-red-500' : ''}
                            />
                            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 border-t-0">
                        <Button size="lg" type="submit" className="w-full font-semibold" disabled={isRegistering}>
                            {isRegistering && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Account
                        </Button>
                        <div className="text-center text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary hover:underline font-medium">
                                Login
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default RegisterPage;
