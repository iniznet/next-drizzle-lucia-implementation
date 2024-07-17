import { NextResponse } from 'next/server';
import { lucia } from '@/lib/auth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
    const { username, email, password } = await request.json();

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).get();

    if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const [newUser] = await db.insert(users).values({
        username,
        email,
        password: hashedPassword,
    }).returning();

    if (!newUser) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }

    // Create session
    const session = await lucia.createSession(newUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            'Set-Cookie': sessionCookie.serialize(),
        },
    });
}