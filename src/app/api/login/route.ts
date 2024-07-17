import { NextResponse } from 'next/server';
import { lucia } from '@/lib/auth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { verifyPassword } from '@/lib/auth';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    // Find user by email
    const user = await db.select().from(users).where(eq(users.email, email)).get();

    if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    // Verify password
    const validPassword = await verifyPassword(password, user.password);

    if (!validPassword) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    // Create session
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            'Set-Cookie': sessionCookie.serialize(),
        },
    });
}