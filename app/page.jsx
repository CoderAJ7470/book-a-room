import RoomCard from '@/components/RoomCard';
import Heading from '@/components/Heading';

import roomData from '@/data/rooms.json';

export default function Home() {
  return (
    <>
      <Heading title='Available Rooms' />
      {roomData.length > 0 ? (
        roomData.map((room) => {
          return <RoomCard key={room.$id} room={room} />;
        })
      ) : (
        <p>
          Sorry, no room is available at the moment. Please check back later,
          thank you.
        </p>
      )}
    </>
  );
}

