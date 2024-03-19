import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';
import { AxiosProgressEvent } from 'axios';
import { globalAjaxExceptionHandler } from '@/utils/ajax';
import { useAuth } from '../../hooks/use-auth';
import AuthApi from '../api/auth';
import BaseInput from '../../components/forms/base-input';
import AxiosProgress from '@/components/progress/axios-progress';
import { ResetDto } from '@/models/auth/reset.dto';
import { useRouter } from 'next/router';
import BaseLoader from '@/components/forms/base-loader';
import AuthRoutes from '@/routes/auth.route';
import FullLayout from '@/components/layouts/public/full-layout';
import { Button } from 'react-bootstrap';
import { BaseLoaderIcon } from '@/components/forms/controls/base-loader-icon';
import { FlexiPasswordChecklist } from 'react-flexi-password-checklist';

export default function ResetPassword() {
  const router = useRouter();
  const { query } = router;

  const { login, user } = useAuth();

  const [progress, setProgress] = useState<number>(0);

  const form = useFormik({
    initialValues: new ResetDto(),
    validationSchema: ResetDto.yupSchema(),
    onSubmit: async (values: any) => {
      const api = new AuthApi();
      try {
        const user = await api.resetPassword(values);
        toast.success('Password Changed Successfully');
        router.push(AuthRoutes.login);
        login(user);
      } catch (error) {
        globalAjaxExceptionHandler(error, {
          formik: form,
          defaultMessage: 'Invalid Credentials',
          toast,
        });
      }
    },
  });
  useEffect(() => {
    form.setFieldValue('email', query?.email);
    form.setFieldValue('token', query?.token);
  }, [form?.values]);

  // use only for debugging purpose
  // useEffect(() => {
  //     console.log("err-------", form.errors);
  //     console.log("value-------", form.values);
  // }, [form.errors, form.values]);

  return (
    <>
      {form?.isSubmitting ? (
        <BaseLoader />
      ) : (
        <div className='container mx-auto'>
          <div className='signup-text mt-10 p-10 text-center'>
            <div className='text-4xl mb-5'>Forgot Password</div>
            <div className='form_bg-img'>
              <div className='lg:w-4/12 mx-auto relative'>
                <div className='bg-signup-img  '>
                  <div className='Login Form bg-white'></div>
                  <AxiosProgress progress={progress} />
                  <form onSubmit={form.handleSubmit}>
                    <div className='LoginForn shadow-lg  p-10 mx-auto rounded-sm'>
                      <BaseInput
                        className='w-full mb-4 border-b-2 text-sm border-blue-400 flex-1 py-2 placeholder-gray-400 outline-none focus:border-blue-400'
                        required
                        type='password'
                        name='password'
                        placeholder='Password'
                        formik={form}
                      />
                      {Boolean(form.values.password) && (
                        <FlexiPasswordChecklist
                          password={form?.values?.password}
                        />
                      )}
                      <BaseInput
                        className='w-full mb-4 border-b-2 text-sm border-blue-400 flex-1 py-2 placeholder-gray-400 outline-none focus:border-blue-400'
                        required
                        type='password'
                        name='password_confirmation'
                        placeholder='Confirm Password'
                        formik={form}
                      />

                      <div className='my-4'>
                        <Button
                          className='bg-btn-100'
                          type='submit'
                          disabled={
                            form?.isSubmitting ||
                            !form?.isValid ||
                            form?.isValidating
                          }
                        >
                          {' '}
                          {!!form.isSubmitting ? <BaseLoaderIcon /> : 'Send'}
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// export async function getServerSideProps(context) {
//     try {
//         const token = context.params;
//         console.log("here's token", token)
//         if (!!!token)
//             return { notFound: true }

//         return {
//             props: { token }
//         }
//     } catch (error) {
//         console.error("Exception is here:", error);
//         return { props: { token: '' } }
//     }
// }

ResetPassword.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
