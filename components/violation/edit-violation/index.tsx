import BaseInput from '@/components/forms/base-input';
import BaseSelect from '@/components/forms/base-select';
import { GarageEntity } from '@/models/admin/garage/garage.entity';
import { ViolationEntity } from '@/models/admin/violation/violation.entity';
import GarageApi from '@/pages/api/garage';
import ViolationApi from '@/pages/api/violation';
import CompanyRoutes from '@/routes/company.route';
import { globalAjaxExceptionHandler } from '@/utils/ajax';
import { useEffectAsync } from '@/utils/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
export interface editGarageProps {
    onSave: (e: any) => void
    id?: number;
}
export function EditViolationModal(props: editGarageProps) {
    const violationApi = new ViolationApi();
    const router = useRouter;
    const options = [
        { value: 0, label: 'In-active' },
        { value: 1, label: 'Active' }
    ];
    const form = useFormik({
        initialValues: new ViolationEntity(),
        validationSchema: ViolationEntity.yupSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                const data = await violationApi.update(props?.id, values as ViolationEntity);
                props?.onSave(data)
                toast.success("Violation update successfully")

            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Violation updation Failed",
                    toast,
                });
            }
        },
    });
    useEffectAsync(async () => {
        const data = await violationApi.getById(props?.id)
        form.setValues({
            ...form.values,
            ...data,
            name: data?.name,
            default_fine: data?.default_fine,
            is_enabled: data.is_enabled,

        })

    }, [])
    return (
        <div className={`${!!form?.isSubmitting && 'opacity-20'}`}>
            <form onSubmit={form?.handleSubmit} className='p-6 space-y-4'>
            <BaseSelect
                    label='Status'
                    name='is_enabled'
                    placeholder="Choose One"
                    options={options.map((option) => ({
                        value: option?.value,
                        label: option.label,
                    }))}
                    formik={form}
                />
                <BaseInput label='Name' className='w-full ' name='name' formik={form} required />
                <BaseInput label='Default Fine' type='number' className='w-full ' name='default_fine' formik={form} />
                <div className="text-end">
                    <Button className='bg-btn-100' type='submit' disabled={form?.isSubmitting}> Submit </Button>
                </div>

            </form>


        </div>
    )
}
