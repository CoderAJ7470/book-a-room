'use server';

import { createAdminClient } from '@/config/appwrite';
import { ID } from 'node-appwrite'; // generates a new ID for each new user account

const createNewUser = async (previousState, formData) => {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirm-password');

  if (!email || !name || !password) {
    return {
      error: 'Please fill out all fields',
    };
  }

  if (password.length < 8) {
    return {
      error: 'Password must be at least 8 characters long',
    };
  }

  if (password !== confirmPassword) {
    return {
      error: 'Passwords do not match',
    };
  }

  // Get the Appwrite account object to access its properties, so we can create the new user account whenever a new user fills out the registration form and submits it
  const { account } = await createAdminClient();

  try {
    // Create the new user with a unique ID, and the user's email, password and name
    await account.create(ID.unique(), email, password, name);

    return {
      success: true,
    };
  } catch (error) {
    console.log('Error while registering - ', error);

    return {
      error: 'Unable to complete registration process',
    };
  }
};

export default createNewUser;
