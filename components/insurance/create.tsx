import { BaseCreateProps } from '@/types/base-prop-types/base-create-prop.type'
import React, { useState } from "react";
import BaseInput from '../forms/base-input'
import ImageUploader from '../media/image-uploader'
import BaseInputPhone from '../forms/base-input-phone'
import { useRouter } from "next/router";
import CompanyRoutes from '@/routes/company.route';
import { globalAjaxExceptionHandler } from '@/utils/ajax';
import { useFormik } from "formik";
import { InsuranceEntity } from '@/models/admin/insurance/insurance.entity';
import InsuranceApi from '@/pages/api/insurance';
import { toast } from "react-toastify";
import BaseLoader from '../forms/base-loader';
import { Button, Form } from "react-bootstrap";
import BaseTextArea from '../forms/base-text-area';

const Create = ({ onSave }: BaseCreateProps) => {

    const [images, setImages] = useState<any>(null)
    const router = useRouter()

    const insuranceApi = new InsuranceApi();


    const handleImageSelection = (files) => {
        setImages(files)
    }

    const form = useFormik({
        initialValues: new InsuranceEntity(),
        validationSchema: InsuranceEntity.yupSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values: any) => {
            const formData = new FormData();
            try {
                Object.entries(values).forEach(([key, val]: any) => {
                    formData.append(key, val);
                });
                images?.map((img, i) => {
                    formData.append(`images[${i}]`, img);
                })
                const data = await insuranceApi.create(formData as InsuranceEntity);
                onSave(data)
                toast.success("Insurance created successfully")
            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Insurance creation Failed",
                    toast,
                });
            }
        },
    });


    return (
        <>
            {
                <div className="m-auto tab max-w-7xl">
                    <div className="">
                        <div className="heading-sec py-1 px-1">
                        </div>
                        <form onSubmit={form.handleSubmit} className={`${form?.isSubmitting && 'opacity-20'}`}>
                            <div className="p-6 space-y-4">
                                <p className='tracking-wide text-sm mb-2 block text-gray-400'>Company Logo</p>
                                <ImageUploader handleImageChange={handleImageSelection} />
                                <BaseInput name="name" label='Insurance Company Name' className='w-full ' formik={form} />
                                <BaseInputPhone name="phone" label='Phone Number' className='w-full ' formik={form} />
                                <BaseInput name="email" label='Email Address' className='w-full ' formik={form} />
                                <BaseInput name="mailing_email" label='Mailing Address' className='w-full ' formik={form} />
                                <BaseInput formik={form} required label='Value' name='value' className='w-full ' />
                                <BaseInput formik={form} required label='Type of cover' name='type_of_cover' className='w-full ' />
                                <BaseInput formik={form} required label='Cover includes' name='cover_includes' className='w-full ' />
                                <BaseInput formik={form} required label='Excess' name='excess' className='w-full ' />
                                <BaseInput formik={form} required label='Address' name='address' className='w-full ' />
                                <BaseInput formik={form} required label='Copmany Url' name='company_url' className='w-full ' />
                                <BaseInput formik={form} required label='Policy Number' name='policy_number' className='w-full ' />
                                <BaseInput formik={form} required label='ABN Number' name='abn' className='w-full ' />
                                <BaseInput formik={form} required label='Company Terms Conditions' name='company_terms_conditions' className='w-full ' />
                                <BaseInput formik={form} required label='Length Liability' name='length_liability' className='w-full ' />
                                <BaseTextArea formik={form} required name='notes' label='Notes' rows={2} />
                                <div className="text-end">
                                    <Button className="bg-btn-100" type='submit' disabled={form?.isSubmitting}>
                                        Submit
                                    </Button>
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default Create