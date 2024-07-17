'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import PostForm from '@/app/components/PostForm';

type Post = {
    id: number;
    title: string;
    content: string;
    userId: number;
};

export default function Edit() {
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

    if (!post)
        return (
            <main className="bg-gray-100 min-h-screen">
                <div>Loading...</div>
            </main>
        );

    return (
        <main className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8">
                <h1>Edit Post</h1>

                <PostForm postId={post.id} initialTitle={post.title} initialContent={post.content} />
            </div>
        </main>
    );
}