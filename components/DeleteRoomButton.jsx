'use client';

import { FaTrash } from 'react-icons/fa';
import deleteRoom from '@/app/actions/deleteRoom';
import { useMessage } from '@/app/context/MessageContext';

const DeleteRoomButton = ({ roomId }) => {
  const { showMessage } = useMessage();

  const handleDeleteRoom = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this room?'
    );

    if (confirmDelete) {
      try {
        const response = await deleteRoom(roomId);
        showMessage({
          content: 'The room was deleted succesfully.',
          type: 'success',
        });
      } catch (error) {
        console.log('Failed to delete the room you selected for deleting.');

        showMessage({
          content:
            'Sorry, an error occurred while trying to delete the room. Room deletion has failed.',
          type: 'error',
        });
      }
    }
  };

  return (
    <button
      className='bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700 cursor-pointer'
      onClick={handleDeleteRoom}
    >
      <FaTrash className='inline mr-1' />
      Delete
    </button>
  );
};

export default DeleteRoomButton;
