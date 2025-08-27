import MyBookingsCard from '@/components/MyBookingsCard';
import getMyBookings from '../actions/getMyBookings';

const Bookings = async () => {
  const myBookings = await getMyBookings();

  return (
    <>
      {myBookings.length === 0 ? (
        <p className='text-gray-600 mt-4'>You have no bookings</p>
      ) : (
        myBookings.map((myBooking) => {
          return <MyBookingsCard key={myBooking.$id} booking={myBooking} />;
        })
      )}
    </>
  );
};

export default Bookings;
