import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authRoutes, protectedRoutes } from '@/routes';


export const middleware = (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken')?.value ?? ''; 
  const requestedPath = request.nextUrl.pathname;

  if ((protectedRoutes.includes(requestedPath) && !accessToken)) {
    request.cookies.delete('accessToken');
    const response = NextResponse.redirect(new URL('/login', request.url));
    return response;
  }

  if (authRoutes.includes(requestedPath) && accessToken) {
    return NextResponse.redirect(new URL('/credentials', request.url));
  }

  return;
};

