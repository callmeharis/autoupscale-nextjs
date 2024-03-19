import { FormikInterface } from '@/utils/formik';
import BaseInput from '../forms/base-input';
import { Form } from 'react-bootstrap';

export default function VehiclePricingInputGroup(props: {
  formik?: FormikInterface<any>;
  systemSettings: any;
}) {
  const { formik } = props;
  const tariffNames = props.systemSettings.map(obj => obj.name);
  return (
    <Form onSubmit={formik.handleSubmit} className=' shahdow-xl bg-white'>
      <div className='First_row'>
        <div className='   lg:flex justify-start md:flex'>
          {tariffNames.includes('hourly') && (
            <div className=' w-60 mr-4 input-style'>
              <BaseInput
                required
                type='number'
                className=''
                name='per_hour'
                formik={formik}
                label='Per Hour'
              />
            </div>
          )}

          {tariffNames.includes('daily') && (
            <div className='lg:mx-3 w-60 mr-4 input-style'>
              <BaseInput
                required
                className=''
                type='number'
                name='per_day'
                formik={formik}
                label='Per Day'
              />
            </div>
          )}

          {tariffNames.includes('weekly') && (
            <div className='lg:mx-3 w-60 mr-4 input-style'>
              <BaseInput
                required
                className=''
                type='number'
                name='per_week'
                formik={formik}
                label='Per Week'
              />
            </div>
          )}
          {tariffNames.includes('monthly') && (
            <div className='lg:mx-3 w-60 mr-4 input-style'>
              <BaseInput
                required
                className=''
                type='number'
                name='per_month'
                formik={formik}
                label='Per Month'
              />
            </div>
          )}
        </div>
      </div>
    </Form>
  );
}
