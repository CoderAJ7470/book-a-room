import React from 'react';

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

    // Format to locale string
    const formatted = localDate.toLocaleString('en-US', options);

    // Split and reconstruct as "<Month> <Day> at <Time>"
    const [monthDay, time] = formatted.split(', ');

    // Get date and time into a nice format
    return `${monthDay} at ${time}`;
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
        <a
          href='room.html'
          className='bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700'
        >
          View Room
        </a>
        <button
          href='#'
          className='bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700 cursor-pointer'
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

export default MyBookingsCard;
