import { NextResponse } from 'next/server';
import { db } from '@/db';
import { posts, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/session';

// GET all posts
export async function GET() {
    const allPosts = await db.select().from(posts).leftJoin(users, eq(posts.userId, users.id));
    return NextResponse.json(allPosts);
}

// POST new post
export async function POST(request: Request) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content } = await request.json();
    const newPost = await db.insert(posts).values({
        userId: user.id,
        title,
        content,
    }).returning();

    return NextResponse.json(newPost[0]);
}