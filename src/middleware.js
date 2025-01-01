import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function middleware(request) {

    const authResult = await auth(request);
    if (authResult) return authResult;

    const url = request.url;
    const isApiRoute = url.includes('/api/');

    const isGoogleAuthRoute = url.includes('/api/auth/google');
    const referer = request.headers.get('referer');

    if (isApiRoute && !isGoogleAuthRoute && !referer?.includes(request.nextUrl.origin)) {
        return NextResponse.redirect(
            new URL('/', request.nextUrl)
        )
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*'
};
