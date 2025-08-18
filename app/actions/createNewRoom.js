'use server';

import { createAdminClient } from '@/config/appwrite';
import checkAuth from './checkAuth';
import { ID } from 'node-appwrite';

const createNewRoom = async (previousState, formData) => {
  // Get an instance of our Appwrite databases
  const { databases, storage } = await createAdminClient();
  // Upload an image for the room
  let imageID;

  try {
    const { user } = await checkAuth();

    // Just a double "safety check" to ensure that the user has no access to the Add a Room page if the user is not logged in; we do not necessarily need this but it is here just in case
    if (!user) {
      return {
        error: 'You must be logged in to add a new room',
      };
    }

    const image = formData.get('image');

    if (image && image.size > 0 && image.name !== 'undefined') {
      try {
        // Upload the image to the DB
        const response = await storage.createFile('rooms', ID.unique(), image);

        imageID = response.$id;
      } catch (error) {
        console.log(
          'An error occurred while saving the image to the database.'
        );

        return {
          error: 'An error occurred while saving the image to the database',
        };
      }
    } else {
      console.log('No image file was provided, or the file is invalid.');
    }

    // Create the new room
    const newRoom = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      ID.unique(),
      {
        user_id: user.id,
        name: formData.get('name'),
        description: formData.get('description'),
        sqft: formData.get('sqft'),
        capacity: formData.get('capacity'),
        location: formData.get('location'),
        address: formData.get('address'),
        availability: formData.get('availability'),
        price_per_hour: formData.get('price_per_hour'),
        amenities: formData.get('amenities'),
        image_id: imageID,
      }
    );

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);

    const errorMessage =
      (await error.response.message) || 'An unexpected error occurred';

    return {
      error: errorMessage,
    };
  }
};

export default createNewRoom;
