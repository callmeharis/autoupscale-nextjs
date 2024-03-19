import { useFormik } from 'formik'
import React from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import BaseInput from '../../../components/forms/base-input'
import { MaintenanceEntity } from '../../../models/admin/company/maintenance/maintenance.entity'
import MaintenanceApi from '../../../pages/api/maintenance'
import { globalAjaxExceptionHandler } from '../../../utils/ajax'
import { useEffectAsync } from '../../../utils/react'
export interface editMaintenanceProps {
    onSave?: (e: any) => void;
    id?: number;
}
export function EditMaintenance(props: editMaintenanceProps) {
    const maintenanceApi = new MaintenanceApi();
    const form = useFormik({
        initialValues: new MaintenanceEntity(),
        validationSchema: MaintenanceEntity.yupSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                const data = await maintenanceApi.update(props?.id, values as MaintenanceEntity);
                props?.onSave(data)
                toast.success("Maintenance update successfully")

            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Maintenance update Failed",
                    toast,
                });
            }
        },
    });
    useEffectAsync(async () => {
        const data = await maintenanceApi.getById(props?.id)
        form.setValues({
            ...form.values,
            ...data,
            name: data?.name,
            kms: data?.kms,
            days: data?.days,

        })

    }, [])
    return (
        <div className={`${!!form?.isSubmitting && 'opacity-20'}`}>
            <form onSubmit={form?.handleSubmit} className='p-6 space-y-4'>
                <BaseInput label='Name' className='w-full ' name='name' formik={form} required />
                <BaseInput label='Period' className='w-full ' name='days' formik={form} required type='number' />
                <BaseInput label='Milage' className='w-full ' name='kms' formik={form} required type='number' />
                <div className="text-end">
                    <Button className='bg-btn-100' type='submit' disabled={form?.isSubmitting}> Submit </Button>
                </div>
            </form>
        </div>
    )
}
