'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useMessage } from '../context/MessageContext';
import createNewUser from '../actions/createNewUser';
import Link from 'next/link';

const RegisterForm = () => {
  const [state, formAction] = useActionState(createNewUser, {});
  const router = useRouter();

  // Our custom function from the MessageContext we created to show a custom message box
  const { showMessage } = useMessage();

  useEffect(() => {
    if (state.error) {
      showMessage({
        content: state.error,
        type: 'error',
      });
    }

    if (state.success) {
      showMessage({
        content: 'New user successfully registered!',
        type: 'success',
      });
      router.push('/login');
    }
  }, [state]);

  return (
    <div className='flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20'>
        <form action={formAction}>
          <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
            Register
          </h2>

          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-gray-700 font-bold mb-2'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className='border rounded w-full py-2 px-3'
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-gray-700 font-bold mb-2'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='border rounded w-full py-2 px-3'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-gray-700 font-bold mb-2'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='border rounded w-full py-2 px-3'
              required
            />
          </div>

          <div className='mb-6'>
            <label
              htmlFor='confirm-password'
              className='block text-gray-700 font-bold mb-2'
            >
              Confirm Password
            </label>
            <input
              type='password'
              id='confirm-password'
              name='confirm-password'
              className='border rounded w-full py-2 px-3'
              required
            />
          </div>

          <div className='flex flex-col gap-5'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
            >
              Register
            </button>

            <p>
              Have an account?&nbsp;
              <Link href='/login' className='text-blue-500'>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
