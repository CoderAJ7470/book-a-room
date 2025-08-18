// In order to use server actions, we need this line at the top here
// Since these functions will run only on the server
'use server';

/**
 * Couple of notes about the import statements below
 *
 * revalidatePath - This updates the cache, so e.g. if we add a room and get re-directed back
 * to the rooms page, it will appear without us having to refresh the page
 *
 * redirect - a function from next/navigation that will allow a re-direct to any page in the app
 */
import { createAdminClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';

async function getARoom(id) {
  try {
    const { databases } = await createAdminClient();

    /**
     * Returns all rooms from our database.
     *
     * listDocuments - takes in an ID as the first argument, and the name of our collections, which in this case, is "rooms"
     */
    const room = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      id
    );

    return room;
  } catch (error) {
    console.log('Failed to get the room you wanted', error);
    redirect('/error');
  }
}

export default getARoom;
