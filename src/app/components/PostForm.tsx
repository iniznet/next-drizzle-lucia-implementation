"use client";

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type PostFormData = {
    title: string;
    content: string;
};

type PostFormProps = {
    postId?: number;
    initialTitle?: string;
    initialContent?: string;
};

export default function PostForm({ postId, initialTitle = '', initialContent = '' }: PostFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<PostFormData>({
        defaultValues: {
            title: initialTitle,
            content: initialContent,
        },
    });
    const router = useRouter();

    const onSubmit = async (data: PostFormData) => {
        const url = postId ? `/api/posts/${postId}` : '/api/posts';
        const method = postId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                router.push('/posts');
            } else {
                // Handle error
                console.error('Failed to save post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    id="title"
                    {...register('title', { required: 'Title is required' })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                </label>
                <textarea
                    id="content"
                    {...register('content', { required: 'Content is required' })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    rows={5}
                />
                {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
            </div>
            <button
                type="submit"
                className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                {postId ? 'Update' : 'Create'} Post
            </button>
        </form>
    );
}