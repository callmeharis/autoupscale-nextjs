import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { AxiosProgressEvent } from 'axios';
import { FlexiPasswordChecklist } from 'react-flexi-password-checklist';
import { useAuth } from '../../hooks/use-auth';
import { globalAjaxExceptionHandler } from '../../utils/ajax';
import { SignUpDto } from '../../models/auth/signup.dto';
import BaseInput from '../../components/forms/base-input';
import AuthApi from '../api/auth';
import { MainSec } from '../../components/signup';
import AxiosProgress from '../../components/progress/axios-progress';
import FullLayout from '../../components/layouts/public/full-layout';
import { BaseLoaderIcon } from '../../components/forms/controls/base-loader-icon';
import BaseCheck from '../../components/forms/base-check';
import { UserTypeEnum } from '../../enums/auth/user-type.enum';
// import { emailExistanceCheck } from '../../utils/helper/email-existance-check.helper';
import VerifyEmail from '@/components/signup/verify-email';
export default function SignUp() {
  const [progress, setProgress] = useState<number>(0);
  const { login, user } = useAuth();

  const api = new AuthApi();
  const form = useFormik({
    initialValues: new SignUpDto(),
    validationSchema: SignUpDto.yupSchema(),
    onSubmit: async (values: SignUpDto) => {
      const { ...restValues } = values;
      try {
        const data = await api.signUp(restValues, {
          onUploadProgress: (progressEvent: AxiosProgressEvent) =>
            setProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            ),
        });
        if (data.permissions?.length) {
          login(data);
        }
      } catch (error) {
        console.log('Signup error', error);
        globalAjaxExceptionHandler(error, {
          formik: form,
          defaultMessage: 'Something went wrong',
          toast,
        });
      }
    },
  });

  // useEffect(() => {
  // 	console.log("form.errors", form.errors)
  // }, [form.errors])

  return (
    <MainSec>
      <form onSubmit={form.handleSubmit}>
        <h1 className='my-3 text-2xl font-bold text-gray-600 text-center decoration-overline decoration-black'>
          SIGN UP HERE
        </h1>
        <div className='signUp_form bg-white rounded'>
          <div className='space-y-3 signUPForn shadow-lg lg:p-10 p-3 xl:p-10 mx-auto rounded-2xl'>
            <AxiosProgress progress={progress} />
            <BaseInput
              label='Company name'
              name='company_name'
              placeholder='CodeupScale'
              required
              formik={form}
            />
            <div className='flex space-x-2'>
              <BaseInput
                label='First Name'
                required
                className='w-100'
                name='first_name'
                placeholder='John'
                formik={form}
              />
              <BaseInput
                label='Last Name'
                required
                className='w-100'
                name='last_name'
                placeholder='Doe'
                formik={form}
              />
            </div>
            <BaseInput
              label='Email'
              required
              type='email'
              name='email'
              placeholder='example@codeupscale.com'
              // handleBlur={() =>
              //   emailExistanceCheck({
              //     form,
              //     type: UserTypeEnum.COMPANY,
              //   })
              // }
              formik={form}
            />
            <BaseInput
              label='Password'
              required
              type='password'
              name='password'
              placeholder='********'
              hideErrors
              formik={form}
              showPasswordToggle
            />
            {Boolean(form.values.password) && (
              <FlexiPasswordChecklist password={form?.values?.password} />
            )}
            <BaseInput
              label='Confirm Password'
              required
              type='password'
              name='confirm_password'
              placeholder='********'
              formik={form}
            />
            <BaseCheck
              className='ml-2 my-4'
              name='privacy_policy'
              required
              label='I Accept the privacy policy'
              formik={form}
            />
            <div className='my-3 text-center'>
              <Button
                className='bg-btn-100 w-10/12 '
                type='submit'
                disabled={
                  form?.isSubmitting ||
                  !form?.isValid ||
                  form?.isValidating ||
                  !form.values.privacy_policy
                }
              >
                {' '}
                {!!form.isSubmitting ? <BaseLoaderIcon /> : 'Sign Up'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </MainSec>
  );
}

SignUp.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout stopRouting={true}>{page}</FullLayout>;
};
