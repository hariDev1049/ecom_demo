export { auth as middleware } from './lib/auth';

export const config = {
  matcher: ['/((?!api|_next/static|_next/images|favicon.ico).*)'],
};
