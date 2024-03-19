import BaseInput from '@/components/forms/base-input'
import BaseInputPhone from '@/components/forms/base-input-phone'
import ImageUploader from '@/components/media/image-uploader'
import { Form, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { BaseLoaderIcon } from '@/components/forms/controls/base-loader-icon'
import { Button } from 'react-bootstrap'
import { useEffectAsync } from '@/utils/react'
import { toast } from 'react-toastify'
import { UserEntity } from '@/models/user/user.entity'
import { globalAjaxExceptionHandler } from '@/utils/ajax'
import ManagerApi from '@/pages/api/manager'

export function Edit({ setEditManager, id  , onSave}) {
    const [images, setImages] = useState<any>()

    const managerApi = new ManagerApi();


    const handleImageSelection = (files) => {
        setImages(files)
        form.setValues({
            ...form.values,
            file_name: null,
            filename: null
        })
    }
    const form = useFormik({
        initialValues: new UserEntity(),
        validationSchema: UserEntity.ManagerYupSchema(),
        onSubmit: async (values: any) => {
            try {
                const formData = new FormData()
                const filteredData = Object.fromEntries(Object.entries(values)?.filter(([key, value]) => value !== null))

                Object.entries(filteredData).forEach(([key, val]: any) => {
                    formData.append(key, val);
                    formData.delete('file_name')
                    formData.delete('file_name')
                });

                if (images) {
                    images?.map((img, i) => {
                        formData.append(`images[${i}]`, img);
                    })
                } else {
                    formData.append(`image_ids[0]`, form.values?.image_id)
                }
                if (!images && !values.file_name) formData.delete('image_ids[0]')

             const data =   await managerApi.update(id, formData as UserEntity);
             onSave(data)
                setEditManager(false)
                toast.success("Manager update successfully")

            }

            catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: " Manager Update Failed",
                    toast,
                });
            }
        },
    });
    useEffectAsync(async () => {
        const data = await managerApi.getById(id)
        form.setValues({
            ...form.values,
            ...data,
            first_name: data?.first_name,
            last_name: data?.last_name,
            email: data?.email,

        })

    }, [])
    // use only for debugging purpose
    // useEffect(() => {
    //     console.log("err-------", form.errors);
    //     console.log("value-------", form.values.file_name);


    // }, [form.errors, form.values]);

    return (
        <>
            <div>
                <div className="m-1 p-3">
                    <>
                      
                        <form onSubmit={form.handleSubmit} className='space-y-6'> 
                            {
                                Boolean(form.values.file_name) && (
                                    <div>
                                        <div className="flex">
                                            <div style={{ marginRight: '10px' }}>
                                                <img
                                                    src={`${form.values.file_name}`}
                                                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }} />
                                                <MdCancel
                                                    className="cross-icon text-red-500 cursor-pointer"
                                                    onClick={() => {
                                                        form.setValues({
                                                            ...form.values,
                                                            file_name: null,
                                                            filename: null
                                                        })
                                                    }
                                                    }

                                                />

                                            </div>

                                        </div>
                                    </div>
                                )
                            }
                            <div className="mt-4">
                                <ImageUploader handleImageChange={handleImageSelection} />
                            </div>
                            <BaseInput
                                name='first_name'
                                placeholder="First Name"
                                label='First Name'
                                formik={form} 
                                className='w-full'
                            />
                            <BaseInput
                                name='last_name'
                                placeholder="Last Name"
                                label='Last Name'
                                formik={form} 
                                className='w-full'

                            />
                            <BaseInput
                                name='email'
                                placeholder="Email Address"
                                label='Email Address'
                                formik={form} 
                                className='w-full'

                            />
                            <div className="my-4 text-center" >
                                <Button type='submit' disabled={!!form?.isSubmitting} className='bg-btn-100'>
                                    {!!form.isSubmitting ? <BaseLoaderIcon /> : "Update"}
                                </Button>

                            </div>
                        </form>
                    </>
                </div>

            </div>

        </>
    )
}
