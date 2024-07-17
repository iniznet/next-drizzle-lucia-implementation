import { NextResponse } from 'next/server';
import { lucia, validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
    const session = await validateRequest();

    if (!session.user) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    await lucia.invalidateSession(session.session.id);

    return redirect('/login');
}