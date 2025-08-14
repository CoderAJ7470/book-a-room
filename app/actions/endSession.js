'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

const endSession = async () => {
  // Retrieve the session cookie
  const sessionCookie = (await cookies()).get('appwrite-session');

  if (!sessionCookie) {
    return {
      error: 'No session cookie found',
    };
  }

  try {
    const { account } = await createSessionClient(sessionCookie.value);

    // Now delete the session; 'current' will delete the on-going session
    await account.deleteSession('current');

    // Clear the session cookie - this is a required step after deleting the session
    (await cookies()).get('appwrite-session');

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: 'An error occurred while ending the session',
    };
  }
};

export default endSession;
