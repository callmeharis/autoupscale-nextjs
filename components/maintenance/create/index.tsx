import BaseCheckList from '@/components/forms/base-check-list'
import BaseInput from '@/components/forms/base-input'
import BaseSelect from '@/components/forms/base-select'
import { MaintenanceEntity } from '@/models/admin/company/maintenance/maintenance.entity'
import MaintenanceApi from '@/pages/api/maintenance'
import CompanyRoutes from '@/routes/company.route'
import { BaseCreateProps } from '@/types/base-prop-types/base-create-prop.type'
import { globalAjaxExceptionHandler } from '@/utils/ajax'
import { useFormik } from 'formik'
import React from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

export function CreateMaintenance({onSave}:BaseCreateProps) {
    const maintenanceApi = new MaintenanceApi();
    const form = useFormik({
        initialValues: new MaintenanceEntity(),
        validationSchema: MaintenanceEntity.yupSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
               const data = await maintenanceApi.create(values as MaintenanceEntity);
                toast.success("Maintenance added successfully")
                onSave(data)
            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Maintenance Created Failed",
                    toast,
                });
            }
        },
    });
    return (
        <div className={`${!!form?.isSubmitting && 'opacity-20'}`}>
            <form onSubmit={form?.handleSubmit} className='p-6 space-y-4'>
                <BaseInput label='Name' className='w-full ' name='name' formik={form} required />
                <BaseInput label='Period' className='w-full ' name='days' formik={form} required type='number'/>
                <BaseInput label='Milage' className='w-full ' name='kms' formik={form} required type='number'/>
                <div className="text-end">
                    <Button className='bg-btn-100' type='submit' disabled={form?.isSubmitting}> Submit </Button>
                </div>

            </form>


        </div>
    )
}
