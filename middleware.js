import { NextResponse } from 'next/server';

export const middleware = async (request) => {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Whenever you have middleware, you need to call the next() method
  // to continue on to the next middleware
  return NextResponse.next();
};

/**
 * Restricts the middleware above to run only on certain routes,
 * as specified below by the matcher's value.
 *
 * matcher: an array of routes to match a.k.a. routes to which we want to limit
 * running the middleware above
 */
export const config = {
  matcher: ['/bookings'],
};
