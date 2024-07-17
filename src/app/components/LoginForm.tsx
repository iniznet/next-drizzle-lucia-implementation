"use client";

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type LoginFormData = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                router.push('/'); // Redirect to home page on successful login
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Login failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
                    type="email"
                    id="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    {...register('password', { required: 'Password is required' })}
                    type="password"
                    id="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Password"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>
            {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
            <div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white p-2 rounded"
                >
                    Login
                </button>

                <a
                    href="/register"
                    className="block text-center mt-2 text-sm text-indigo-500"
                >
                    Register
                </a>
            </div>
        </form>
    );
}