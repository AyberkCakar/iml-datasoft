import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authRoutes, protectedRoutes } from './utils/services/routers';
import { verifyJwtToken } from './lib/verifyJwt';

export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('user')?.value;
  const user = currentUser ? JSON.parse(currentUser) : undefined;
  let verify = false;
  if (user?.token) {
    verify = await verifyJwtToken(user.token);
  }

  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    !currentUser &&
    !verify
  ) {
    request.cookies.delete('user');
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('user');

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser && verify) {
    return NextResponse.redirect(new URL('/data-generator', request.url));
  }
}
