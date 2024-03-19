import BaseInput from '@/components/forms/base-input';
import { GarageEntity } from '@/models/admin/garage/garage.entity';
import GarageApi from '@/pages/api/garage';
import CompanyRoutes from '@/routes/company.route';
import { globalAjaxExceptionHandler } from '@/utils/ajax';
import { useEffectAsync } from '@/utils/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
export interface editGarageProps{
    onSave: (e: any) => void
    id?:number;
}
export  function EditGarage(props : editGarageProps) {
    const garageApi = new GarageApi();
    const router = useRouter;
    const form = useFormik({
        initialValues: new GarageEntity(),
        validationSchema: GarageEntity.yupSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                const data = await garageApi.update(props?.id, values as GarageEntity);
                props?.onSave(data)
                toast.success("Garage update successfully")
                // router.push(CompanyRoutes.setting.)

            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Garage update Failed",
                    toast,
                });
            }
        },
    });
    useEffectAsync(async () => {
        const data = await garageApi.getById(props?.id)
        form.setValues({
            ...form.values,
            ...data,
            name: data?.name,
            email: data?.email,
            location: data?.location,

        })

    }, [])
  return (
    <div className={`${!!form?.isSubmitting && 'opacity-20'}`}>
    <form onSubmit={form?.handleSubmit} className='p-6 space-y-4'>
        <BaseInput label='Name' className='w-full ' name='name' formik={form} required />
        <BaseInput label='Email' className='w-full ' name='email' formik={form} required />
        <BaseInput label='Location' className='w-full ' name='location' formik={form} required />
        <div className="text-end">
            <Button  className='bg-btn-100' type='submit' disabled={form?.isSubmitting}> Submit </Button>
        </div>

    </form>


</div>
  )
}
