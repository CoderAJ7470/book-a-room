'use server';

import { createSessionClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { ID } from 'node-appwrite';
import checkAuth from './checkAuth';
import { revalidatePath } from 'next/cache';
import checkRoomAvailability from './checkRoomAvailability';

const bookRoom = async (previousState, formData) => {
  const sessionCookie = (await cookies()).get('appwrite-session');

  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);

    // Get the current user's id
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: 'You must be logged in to book a room.',
      };
    }

    // Get the date and time from the formData
    const checkInDate = formData.get('check_in_date');
    const checkInTime = formData.get('check_in_time');
    const checkOutDate = formData.get('check_out_date');
    const checkOutTime = formData.get('check_out_time');
    const roomId = formData.get('room_id');

    // Combine the above entries into ISO 8601 format (DateTime), but convert it to local time first by passing it to the Date constructor:
    const checkInDateTime = new Date(`${checkInDate}T${checkInTime}`);
    const checkOutDateTime = new Date(`${checkOutDate}T${checkOutTime}`);

    // Check if room is available for user-chosen date and time
    const isAvailable = await checkRoomAvailability(
      roomId,
      checkInDateTime,
      checkOutDateTime
    );

    if (!isAvailable) {
      return {
        error:
          'The date and time you have chosen overlaps with an existing booking for this room.',
      };
    }

    const bookingData = {
      check_in: checkInDateTime,
      check_out: checkOutDateTime,
      user_id: user.id, // user is from the destructured user above from checkAuth()
      room_id: roomId,
    };

    // Create the booking
    const newBooking = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      ID.unique(),
      bookingData
    );

    // Revalidate cache
    revalidatePath('/bookings', 'layout');

    return {
      success: true,
    };
  } catch (error) {
    console.log('Failed to book the room', error);

    return {
      error: 'Sorry, something went wrong while trying to book the room.',
    };
  }
};

export default bookRoom;
