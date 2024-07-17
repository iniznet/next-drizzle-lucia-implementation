'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

type Post = {
    id: number;
    title: string;
    content: string;
    userId: number;
};

export default function Detail() {
    const router = useRouter();
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/posts/${id}`)
                .then(res => res.json())
                .then(data => setPost(data));
        }
    }, [id]);

    const handleDelete = async () => {
        const response = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
        if (response.ok) {
            router.push('/posts');
        } else {
            console.error('Failed to delete post');
        }
    };

    if (!post)
        return (
            <main className="bg-gray-100 min-h-screen">
                <div>Loading...</div>
            </main>
        );

    return (
        <main className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8">
                <h1>{post.title}</h1>
                <p>{post.content}</p>

                <Link href={`/posts/${id}/edit`}>Edit</Link>

                <button onClick={handleDelete}>Delete</button>
            </div>
        </main>
    );
}