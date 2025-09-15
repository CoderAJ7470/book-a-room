import CancelBookingButton from './CancelBookingButton';
import Link from 'next/link';

const MyBookingsCard = ({ booking }) => {
  const { check_in, check_out, room_id } = booking;

  // Format the date and time to make it look good
  const formatDate = (dateTimeString) => {
    const localDate = new Date(dateTimeString);

    const options = {
      month: 'short', // Abbreviated month name, e.g., "Aug"
      day: 'numeric', // Day of month, e.g., 28
      hour: 'numeric', // Local hour
      minute: '2-digit', // Local minutes with leading 0
      hour12: true, // Use 12-hour format with AM/PM
    };

    // Format to locale string - returns the date in the format MMM DD, 00:00 AM or PM
    const formatted = localDate.toLocaleString('en-US', options);

    // Split and reconstruct as "month, day at time"
    const [monthAndDay, time] = formatted.split(', ');

    // Get date and time into a nice format
    return `${monthAndDay} at ${time}`;
  };

  return (
    <div className='bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center'>
      <div>
        <h4 className='text-lg font-semibold'>{room_id.name}</h4>
        <p className='text-sm text-gray-600'>
          <strong>Check In: </strong>
          {formatDate(check_in)}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Check Out: </strong>
          {formatDate(check_out)}
        </p>
      </div>
      <div className='flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0'>
        <Link
          href={{
            pathname: `/rooms/${room_id.$id}`,
            query: { clickedFrom: 'my-bookings' },
          }}
          className='bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700'
        >
          View Room
        </Link>
        <CancelBookingButton bookingId={booking.$id} />
      </div>
    </div>
  );
};

export default MyBookingsCard;
