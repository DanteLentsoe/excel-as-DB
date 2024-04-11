import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ['/', '/privacy-policy', '/contact'],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: ['/', '/privacy-policy', '/contact'],
});

export const config = {
  // Protects all routes, including api/trpc.
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
