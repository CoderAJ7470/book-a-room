import MyBookingsCard from '@/components/MyBookingsCard';
import getMyBookings from '../actions/getMyBookings';
import Heading from '@/components/Heading';

const Bookings = async () => {
  const myBookings = await getMyBookings();

  return (
    <>
      <Heading title='My Bookings' />
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
