import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from '../../common/forms/Form';
import { FormInput } from '../../common/forms/FormInput';
import { Button } from '../../common/Button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { loginUser } from '../../../features/auth/authActions';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-right', autoClose: 5000 });
        }
    }, [error]);

    const handleSubmit = async (data: Record<string, string | File>) => {
        const credentials = {
            email: data.email as string,
            password: data.password as string,
        };

        const loginPromise = dispatch(loginUser(credentials)).then((result) => {
            if (loginUser.fulfilled.match(result)) {
                return result;
            } else {
                throw new Error('Login failed');
            }
        });

        toast.promise(
            loginPromise,
            {
                pending: 'Signing you in...',
                success: 'Welcome back! Redirecting to dashboard...',
                error: 'Invalid email or password',
            }
        );

        loginPromise
            .then(() => {
                setTimeout(() => navigate('/dashboard'), 1000);
            })

    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl font-bold">✨</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-8">
                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Welcome back</h1>
                    <p className="text-center text-gray-600 mb-8">Sign in to AI-Sprint to continue</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{error}</div>
                    )}

                    <Form onSubmit={handleSubmit} className="space-y-5">
                        <FormInput name="email" label="Email" type="email" placeholder="you@company.com" required />
                        <FormInput name="password" label="Password" type="password" placeholder="Enter your password" required />

                        <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200">
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </Form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">or continue with</span>
                        </div>
                    </div>

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

                    <p className="text-center mt-6 text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-purple-600 hover:text-purple-700 font-medium">Sign up</Link>
                    </p>
                </div>


            </div>
        </div>
    );
};

export default Login;
