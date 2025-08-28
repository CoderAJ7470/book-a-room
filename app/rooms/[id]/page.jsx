import Heading from '@/components/Heading';
import BookingForm from '@/components/BookingForm';
import Image from 'next/image';
import Link from 'next/link';
import getARoom from '@/app/actions/getARoom';

import { FaChevronLeft } from 'react-icons/fa';
import noPhotoPlaceholder from '@/public/images/no-image.jpg';

const RoomPage = async ({ params, searchParams }) => {
  const { id } = await params;
  const room = await getARoom(id);
  const bucketID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  // Get the query parameter to determine from which page we landed here
  const { clickedFrom } = await searchParams;

  if (!room) {
    return <Heading title='No room was found' />;
  }

  // Handle what link is set for the href at the top of this card above the image
  const handleHref = (fromPage) => {
    switch (fromPage) {
      case 'my-bookings':
        return '/bookings';
      case 'room-card':
        return '/';
    }
  };

  // Handle the text that is shown for the link text at the top of this card above the image
  const handleLinkText = (fromPage) => {
    switch (fromPage) {
      case 'my-bookings':
        return 'Back to Bookings';
      case 'room-card':
        return 'Back to Rooms';
    }
  };

  // Constructing the full image url - note the region id at the beginning of the domain
  const imageURL = `https://nyc.cloud.appwrite.io/v1/storage/buckets/${bucketID}/files/${room.image_id}/view?project=${projectID}`;

  const imageSrc = room.image_id ? imageURL : noPhotoPlaceholder;

  return (
    <>
      <Heading title={room.name} />
      <div className='bg-white shadow rounded-lg p-6'>
        <Link
          href={handleHref(clickedFrom)}
          className='flex items-center text-gray-600 hover:text-gray-800 mb-4'
        >
          <FaChevronLeft className='inline mr-1' />
          <span className='ml-2'>{handleLinkText(clickedFrom)}</span>
        </Link>

        <div className='flex flex-col sm:flex-row sm:space-x-6'>
          <Image
            src={imageSrc}
            alt={`/images/rooms/${room.name}`}
            width={400}
            height={100}
            className='w-full sm:w-1/3 h-64 object-cover rounded-lg'
          />

          <div className='mt-4 sm:mt-0 sm:flex-1'>
            <p className='text-gray-600 mb-4'>{room.description}</p>

            <ul className='space-y-2'>
              <li>
                <span className='font-semibold text-gray-800'>Size: </span>
                {room.sqft}sq. ft.
              </li>
              <li>
                <span className='font-semibold text-gray-800'>
                  Availability:&nbsp;
                </span>
                {room.availability}
              </li>
              <li>
                <span className='font-semibold text-gray-800'>Price: </span>$
                {room.price_per_hour} / hour
              </li>
              <li>
                <span className='font-semibold text-gray-800'>Address: </span>
                {room.address}
              </li>
            </ul>
          </div>
        </div>
        <BookingForm room={room} />
      </div>
    </>
  );
};

export default RoomPage;
