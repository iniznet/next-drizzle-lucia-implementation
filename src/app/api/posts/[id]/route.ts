import { NextResponse } from 'next/server';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/session';

// GET single post
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const post = await db.select().from(posts).where(eq(posts.id, parseInt(params.id))).get();
    if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
}

// PUT (update) post
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content } = await request.json();
    const updatedPost = await db.update(posts)
        .set({ title, content })
        .where(eq(posts.id, parseInt(params.id)))
        .returning();

    if (updatedPost.length === 0) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(updatedPost[0]);
}

// DELETE post
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const deletedPost = await db.delete(posts)
        .where(eq(posts.id, parseInt(params.id)))
        .returning();

    if (deletedPost.length === 0) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post deleted successfully' });
}