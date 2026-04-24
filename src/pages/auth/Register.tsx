import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../components/common/Button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { registerUser } from '../../features/auth/authActions';
import { clearError } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

const registerSchema = z.object({
    username: z.string().min(2, 'Full name must have at least 2 characters'),
    email: z.string().email('Email is invalid'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
        mode: 'onBlur',
        resolver: zodResolver(registerSchema),
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error, user, token } = useAppSelector((state) => state.auth);

    // Redirect if already logged in
    useEffect(() => {
        if (user && token) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, token, navigate]);

    // Clear errors on mount
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    }, [error]);

    const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
        const registerPromise = dispatch(registerUser({
            username: data.username,
            email: data.email,
            password: data.password,
        })).then((result) => {
            if (registerUser.fulfilled.match(result)) {
                return result;
            } else {
                throw new Error('Registration failed');
            }
        });

        toast.promise(
            registerPromise,
            {
                pending: 'Creating your account...',
                success: 'Account created successfully! Redirecting to login...',
                error: 'Failed to create account',
            }
        );

        registerPromise
            .then(() => {
                navigate('/login');
            })
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl font-bold">✨</span>
                    </div>
                </div>

                {/* Card */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                    {/* Header */}
                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
                        Create an account
                    </h1>
                    <p className="text-center text-gray-600 mb-8">
                        Start managing your projects with AI
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                {...register('username')}
                                className={`w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="you@company.com"
                                {...register('email')}
                                className={`w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Create a strong password"
                                {...register('password')}
                                className={`w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                            )}
                            <p className="mt-1 text-xs text-gray-500">
                                Must be at least 6 characters
                            </p>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                {...register('confirmPassword')}
                                className={`w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Agreement */}
                        <div className="py-2">
                            <label className="flex items-start gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    className="mt-1 rounded"
                                    required
                                />
                                <span>
                                    I agree to the{' '}
                                    <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                                        Terms of Service
                                    </a>
                                    {' '}and{' '}
                                    <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                                        Privacy Policy
                                    </a>
                                </span>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">or continue with</span>
                        </div>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="text-lg">G</span>
                            <span className="text-sm font-medium text-gray-700">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="text-lg">⚙</span>
                            <span className="text-sm font-medium text-gray-700">GitHub</span>
                        </button>
                    </div>
                </div>

                {/* Footer Link */}
                <p className="text-center mt-6 text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                        Sign In
                    </Link>
                </p>
            </div>

        </div>
    );
};

export default Register;