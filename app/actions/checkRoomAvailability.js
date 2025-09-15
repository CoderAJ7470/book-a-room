'use server';

import { createSessionClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';

/**
 *
 * @param checkInA - the check-in date which we want to book for a room
 * @param checkOutA - the check-out date which we want to book for a room
 * @param checkInB - the check-in date on which the same room has already been booked
 * @param checkOutB - the check-out date on which the same room has already been booked
 * @returns - true if there's an overlap, false otherwise
 */
const isDateRangeOverlapping = (checkInA, checkOutA, checkInB, checkOutB) => {
  const parsedCheckInA = new Date(checkInA);
  const parsedCheckOutA = new Date(checkOutA);
  const parsedCheckInB = new Date(checkInB);
  const parsedCheckOutB = new Date(checkOutB);

  return parsedCheckInA < parsedCheckOutB && parsedCheckOutA > parsedCheckInB;
};

const checkRoomAvailability = async (roomId, wantToCheckIn, wantToCheckOut) => {
  const sessionCookie = (await cookies()).get('appwrite-session');

  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);

    // Fetch all bookings for a given room
    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [Query.equal('room_id', roomId)]
    );

    // Loop through all bookings and check for any overlaps
    for (const booking of bookings) {
      const bookingCheckInDateTime = booking.check_in;
      const bookingCheckOutDateTime = booking.check_out;

      // if true, we know that there is an overlap between the date and time for which the user wishes to book the room (checkInDateTime/checkOutDateTime) and the date and time for which the room has already been booked (bookingCheckInDateTime/bookingCheckOutDateTime), we want to return false
      if (
        isDateRangeOverlapping(
          wantToCheckIn,
          wantToCheckOut,
          bookingCheckInDateTime,
          bookingCheckOutDateTime
        )
      ) {
        return false;
      }
    }

    // No overlap found, proceed with booking
    return true;
  } catch (error) {
    console.log('Availability checking failed', error);

    return {
      error: 'Availability checking failed',
    };
  }
};

export default checkRoomAvailability;
