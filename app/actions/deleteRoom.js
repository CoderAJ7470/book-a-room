'use server';

import { createSessionClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { revalidatePath } from 'next/cache';

const deleteRoom = async (roomId) => {
  console.log('room id coming in: ', roomId);
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

    // Get room that the user wants to delete
    const roomToBeDeleted = rooms.find((room) => {
      return room.$id === roomId;
    });

    // Delete the room
    if (roomToBeDeleted) {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
        roomToBeDeleted.$id
      );

      // revalidatePath seems to work great here. Still figuring out the mysterious behaviour of this function.
      revalidatePath('/rooms/my', 'layout');
      revalidatePath('/', 'layout');

      return {
        success: true,
      };
    } else {
      return {
        error: 'Room to be deleted not found.',
      };
    }
  } catch (error) {
    console.log('Failed to delete the room', error);

    return {
      error: 'Failed to delete the room.',
    };
  }
};

export default deleteRoom;
