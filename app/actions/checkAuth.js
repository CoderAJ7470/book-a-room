'use server';

// Checks if the user is authenticated. This functionality allows us to show certain links to only those users who are authenticated i.e. logged in - this functionality will be used in the Header component and other areas where only authenticated users can access certain things, like links etc

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

const checkAuth = async () => {
  // Get the Appwrite session cookie
  const sessionCookie = (await cookies()).get('appwrite-session');

  // If the cookie has not yet been set, return false for isAuthenticated - prevents the user from accessing certain links/buttons etc where this functionality is being used to do so
  if (!sessionCookie) {
    return {
      isAuthenticated: false,
    };
  }

  // If the user is authenticated a.k.a. the user is logged in, then get the session cookie value, and also get the user's log-in credentials to ensure they have access to certain links, as and where dictated by this functionality's usage
  try {
    const { account } = await createSessionClient(sessionCookie.value);
    const user = await account.get();

    return {
      isAuthenticated: true,
      user: {
        id: user.$id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    return {
      isAuthenticated: false,
    };
  }
};

export default checkAuth;
