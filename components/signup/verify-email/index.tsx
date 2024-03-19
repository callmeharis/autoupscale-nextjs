// import { Button } from 'react-bootstrap'

import { useAuth } from '@/hooks/use-auth';
import AuthApi from '@/pages/api/auth';
import UserApi from '@/pages/api/user';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function VerifyEmail({
  email,
  authToken,
}: {
  email: string;
  authToken: string;
}) {
  const api = new AuthApi();
  const userApi = new UserApi();
  const { updateUser, user } = useAuth();

  useEffect(() => {
    const userInterval = setInterval(async () => {
      const data = await userApi.me();
      updateUser({
        ...data,
        token: user.token,
      });
    }, 30000);

    return () => clearInterval(userInterval);
  }, []);

  if (!user) return null;

  return (
    <div className='flex items-center justify-center h-screen pb-5 m-auto bg-slate-100'>
      <div className='max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12'>
        <h1 className='text-2xl  mb-4'>Email Verification</h1>
        <h3 className='text-xl'>
          Please verify your email address to continue
        </h3>
        <div className='flex justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-24 h-24 text-green-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              stroke-linecap='round'
              strokeLinejoin='round'
              strokeWidth='1'
              d='M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76'
            ></path>
          </svg>
        </div>
        <p>
          An email with a verification link has been sent to {email}. Click the
          link to verify your email.
        </p>
        <p>If you did not receive the email, please check your spam folder .</p>
        <div className='mt-4'>
          <p
            onClick={async () => {
              await api.sendVerifyEmail(email, {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              });
              toast.success('Email sent successfully');
            }}
            className='bg-btn-100 cursor-pointer'
          >
            Resend Email?
          </p>
        </div>
      </div>
    </div>
  );
}
