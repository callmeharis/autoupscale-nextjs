import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import BaseInput from '@/components/forms/base-input'
import { globalAjaxExceptionHandler } from '@/utils/ajax';
import ViolationApi from '@/pages/api/violation';
import { ViolationEntity } from '@/models/admin/violation/violation.entity';
import { FaCalendar } from 'react-icons/fa';
import ShowFormattedDate from '@/components/date-formatter';

export interface CreateViolationModalProp {
    onSave : (e : any) => void;

}
export function CreateViolationModal(props : CreateViolationModalProp) {

    const garageApi = new ViolationApi();
    const form = useFormik({
        initialValues: new ViolationEntity(),
        validationSchema: ViolationEntity.yupSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                const data = await garageApi.create(values as ViolationEntity);
                toast.success("Violation added successfully")
                props.onSave(data)
            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Violation creation Failed",
                    toast,
                });
            }
        },
    });
    return (
        <>
            <div className={`${!!form?.isSubmitting && 'opacity-20'}`}>
                <form onSubmit={form?.handleSubmit} className='p-6 space-y-4'>
                    <BaseInput label='Name' className='w-full ' name='name' formik={form} required />
                    <BaseInput label='Default Fine' type='number' className='w-full ' name='default_fine' formik={form}/>
                    <div className="text-end">
                        <Button className='bg-btn-100' type='submit' disabled={form?.isSubmitting}> Submit </Button>
                    </div>

                </form>


            </div>

        </>
    )
}
