import MyRoomCard from '@/components/MyRoomCard';
import Heading from '@/components/Heading';
import getMyRooms from '@/app/actions/getMyRooms';

const MyRooms = async () => {
  const rooms = await getMyRooms();

  return (
    <>
      <Heading title='My Rooms' />

      {rooms.length > 0 ? (
        rooms.map((room) => {
          return <MyRoomCard key={room.$id} room={room} />;
        })
      ) : (
        <p>You have not saved any rooms yet</p>
      )}
    </>
  );
};

export default MyRooms;
