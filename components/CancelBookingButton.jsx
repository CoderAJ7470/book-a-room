'use client';

import cancelBooking from '@/app/actions/cancelBooking';
import { useMessage } from '@/app/context/MessageContext';

const CancelBookingButton = ({ bookingId }) => {
  const { showMessage } = useMessage();

  const handleCancelBooking = async () => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      const result = await cancelBooking(bookingId);

      if (result.success) {
        showMessage({
          content: 'Booking was cancelled successfully.',
          type: 'success',
        });
      }
    } catch (error) {
      console.log('Failed to cancel booking', error);

      return {
        error: 'Failed to cancel booking.',
      };
    }
  };

  return (
    <button
      onClick={handleCancelBooking}
      className='bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700 cursor-pointer'
    >
      Cancel Booking
    </button>
  );
};

export default CancelBookingButton;
