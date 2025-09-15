'use server';

import { createSessionClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import checkAuth from './checkAuth';

const cancelBooking = async (bookingId) => {
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
        error: 'You must be logged in to cancel a booking.',
      };
    }

    // Get the booking to be cancelled
    const booking = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId
    );

    console.log('booking has: ', booking);

    // Check if the booking to be cancelled actually belongs to the current user
    if (booking.user_id !== user.id) {
      return {
        error: 'You are not authorized to cancel this booking.',
      };
    }

    // If the current user is authorized to do so, go ahead with the cancellation
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId
    );

    // Revalidate
    revalidatePath('/bookings', 'layout');

    return {
      success: true,
    };
  } catch (error) {
    console.log('Failed to cancel the booking;', error);

    return {
      error: 'Failed to cancel the booking.',
    };
  }
};

export default cancelBooking;
