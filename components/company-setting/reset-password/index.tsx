import BaseInput from '@/components/forms/base-input';
import BaseLoader from '@/components/forms/base-loader';
import { BaseLoaderIcon } from '@/components/forms/controls/base-loader-icon';
import { UpdatePasswordDto } from '@/models/auth/update-password.dto';
import AuthApi from '@/pages/api/auth';
import { globalAjaxExceptionHandler } from '@/utils/ajax';
import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import { FlexiPasswordChecklist } from 'react-flexi-password-checklist';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const form = useFormik({
    initialValues: new UpdatePasswordDto(),
    validationSchema: UpdatePasswordDto.yupSchema(),
    onSubmit: async (values: any) => {
      const api = new AuthApi();
      try {
        const user = await api.updatePassword(values);
        toast.success('Password Changed Successfully');
      } catch (error) {
        globalAjaxExceptionHandler(error, {
          formik: form,
          defaultMessage: 'Invalid Credentials',
          toast,
        });
      }
    },
  });

  return (
    <>
      {form?.isSubmitting ? (
        <BaseLoader />
      ) : (
        <form onSubmit={form.handleSubmit} >
          <div className='flex space-x-10'>
            <BaseInput
              label='Current Password'
              className='w-60 text-sm py-2 placeholder-gray-400 outline-none'
              required
              type='password'
              name='old_password'
              placeholder='Enter current password'
              formik={form}
            />
            <BaseInput
              label='New Password'
              className='w-60 text-sm py-2 placeholder-gray-400 outline-none'
              required
              type='password'
              name='password'
              placeholder='Enter new password'
              formik={form}
            />

            <BaseInput
              label='Confirm Password'
              className='w-60 text-sm py-2 placeholder-gray-400 outline-none'
              required
              type='password'
              name='confirm_password'
              placeholder='Confirm Password'
              formik={form}
            />
          </div>

          <div className=''>
            <FlexiPasswordChecklist password={form?.values?.password} />
          </div>

          <div className='my-4 text-end'>
            <Button
              className='bg-btn-100'
              type='submit'
              disabled={
                form?.isSubmitting || !form?.isValid || form?.isValidating
              }
            >
              {' '}
              {!!form.isSubmitting ? <BaseLoaderIcon /> : 'Update Password'}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
