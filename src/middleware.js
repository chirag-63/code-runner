export { auth as middleware } from '@/auth';
import { NextResponse } from 'next/server';

// export function middleware(request) {
//     const { pathname } = request.nextUrl;
//     if (pathname.startsWith('/api/auth/callback/google')) {
//         return NextResponse.next();
//     }

//     if (pathname.startsWith('/api/')) {
//         return NextResponse.redirect(new URL('/', request.url));
//     }
//     return NextResponse.next();
// }

// export const config = {
//     matcher: '/api/:path*',
// };
