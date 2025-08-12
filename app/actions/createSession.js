'use server';

import { createAdminClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

const createSession = async (previousState, formData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return {
      error: 'Please fill out all fields',
    };
  }

  // Get an instance of the client account
  const { account } = await createAdminClient();

  // Start a new client session and also create and add the session cookie
  try {
    // New session with the user's email and password
    const session = await account.createEmailPasswordSession(email, password);

    // Create the session cookie
    (await cookies()).set('appwrite-session', session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(session.expire),
      path: '/',
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log('Authentication error: ', error);

    return {
      error: 'Invalid login credentials',
    };
  }
};

export default createSession;
