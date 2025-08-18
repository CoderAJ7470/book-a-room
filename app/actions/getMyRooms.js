// This page will show all the rooms you create i.e. under your account

'use server';

import { createSessionClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';

const getMyRooms = async () => {
  const sessionCookie = (await cookies()).get('appwrite-session');

  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { account, databases } = await createSessionClient(
      sessionCookie.value
    );

    // Get the current user's id
    const user = await account.get();
    const userId = user.$id;

    // Get the current user's rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      [Query.equal('user_id', userId)]
    );

    return rooms;
  } catch (error) {
    console.log("Failed to get this user's rooms", error);
    redirect('/error');
  }
};

export default getMyRooms;
