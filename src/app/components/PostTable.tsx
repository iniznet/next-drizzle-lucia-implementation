"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Post = {
    id: number,
    userId: number,
    title: string,
    content: string,
}

type User = {
    id: number
    username: string
    email: string
}

type Posts = {
    post: Post,
    user: User,
}

export default function PostList() {
    const [posts, setPosts] = useState<Posts[]>([]);

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    return (
        <table className="w-full bg-white shadow-lg rounded">
            <thead>
                <tr>
                    <th className="border-b p-2">ID</th>
                    <th className="border-b p-2">Title</th>
                    <th className="border-b p-2">User</th>
                    <th className="border-b p-2">Content</th>
                    <th className="border-b p-2">Actions</th>
                </tr>
            </thead>

            <tbody>
                {posts.map(({ post, user }) => (
                    <tr key={post.id}>
                        <td className="p-2 text-center">{post.id}</td>
                        <td className="p-2 text-center">{post.title}</td>
                        <td className="p-2 text-center">{user.username}</td>
                        <td className="p-2 text-center">{post.content.slice(0, 50)}...</td>
                        <td className="p-2 text-center">
                            <Link href={`/posts/${post.id}`} className="bg-blue-500 text-white p-2 rounded">
                                View
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}