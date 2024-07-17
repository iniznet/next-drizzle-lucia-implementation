import Link from 'next/link';
import PostList from '../components/PostTable';

export default function Posts() {
    return (
        <main className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Posts</h1>
                    <Link href="/posts/create" className="bg-indigo-500 text-white p-2 rounded">
                        New
                    </Link>
                </div>

                <PostList />
            </div>
        </main>
    );
}