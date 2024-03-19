import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import BaseInput from '@/components/forms/base-input'
import { GarageEntity } from '@/models/admin/garage/garage.entity';
import GarageApi from '@/pages/api/garage';
import { BaseCreateProps } from '@/types/base-prop-types/base-create-prop.type'
import { globalAjaxExceptionHandler } from '@/utils/ajax';

export function Create({ onSave }: BaseCreateProps) {
 
    const garageApi = new GarageApi();
    const form = useFormik({
        initialValues: new GarageEntity(),
        validationSchema: GarageEntity.yupSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                const data = await garageApi.create(values as GarageEntity);
                toast.success("Garage added successfully")
                onSave(data)
            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Garage Created Failed",
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
                    <BaseInput label='email' className='w-full ' name='email' formik={form} required />
                    <BaseInput label='Location' className='w-full ' name='location' formik={form} required />
                    <div className="text-end">
                        <Button className='bg-btn-100' type='submit' disabled={form?.isSubmitting}> Submit </Button>
                    </div>

                </form>


            </div>

        </>
    )
}
