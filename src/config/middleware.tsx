// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/mongodb';

export async function middleware(req: NextRequest) {
    const { db } = await connectToDatabase();
    const email = req.cookies.get('user-email');

    if (!email) {
        return NextResponse.redirect('/Login');
    }

    const user = await db.collection('users').findOne({ email });
    if (!user) {
        return NextResponse.redirect('/Login');
    }

    const isPaidUser = user.plan === 'paid';

    if (req.nextUrl.pathname.startsWith('/premium')) {
        if (!isPaidUser) {
            return NextResponse.redirect('/upgrade');
        }
    }

    return NextResponse.next();
}
