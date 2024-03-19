import BaseLoader from '@/components/forms/base-loader';
import FullLayout from '@/components/layouts/public/full-layout';
import EmailVerifyFailed from '@/components/signup/email-verification-failed';
import EmailVerified from '@/components/signup/email-verified';
import AuthApi from '@/pages/api/auth';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

export default function VerifyEmail() {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const router = useRouter();
  const api = new AuthApi();

  console.log('ROUTER QUERY:', router.query);
  const { email = '', token = '' } = router.query;

  useEffect(() => {
    if (email && token) {
      api
        .verifyEmailCode({
          email: email as string,
          verification_token: token as string,
        })
        .then(res => {
          console.log('Verification response', res);
          setVerified(true);
        })
        .catch(err => {
          console.log('Verifying email error', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [router.query]);

  if (loading) {
    return <BaseLoader />;
  }

  return (
    <div>
      {verified ? <EmailVerified router={router} /> : <EmailVerifyFailed />}
    </div>
  );
}

VerifyEmail.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout stopRouting={true}>{page}</FullLayout>;
};
