import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from "react-toastify";
import { useFormik } from 'formik'
import ManagerApi from '../../../../pages/api/manager'
import BaseInput from '../../../../components/forms/base-input'
import ImageUploader from '../../../../components/media/image-uploader'
import { UserEntity } from '../../../../models/user/user.entity'
import { globalAjaxExceptionHandler } from '../../../../utils/ajax'
import { BaseCreateProps } from '../../../../types/base-prop-types/base-create-prop.type';
import { BaseLoaderIcon } from '../../../../components/forms/controls/base-loader-icon';



export function Create({ onSave }: BaseCreateProps) {

    const [images, setImages] = useState<any>()

    const managerApi = new ManagerApi();
    const handleImageSelection = (files) => {
        setImages(files)
    }

    const form = useFormik({
        initialValues: new UserEntity(),
        validationSchema: UserEntity.ManagerYupSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values: any) => {
            const formData = new FormData();
            try {
                Object.entries(values)?.forEach(([key, val]) => {
                    formData.append(key, `${val}`);
                    formData?.delete('media')

                });
                images?.map((img, i) => {
                    formData.append(`images[${i}]`, img);
                })
                form?.values?.media?.map((m, i) => { formData.append(`image_ids[${i}]`, m?.id) })

                const result = await managerApi.create(formData as UserEntity);
                onSave(result)
                toast.success("Manager Create Successfully")

            }

            catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: " Manager Creation Failed",
                    toast,
                });
            }
        },
    });


    return (
        <>

            <div className="p-6 space-y-7">
                <form onSubmit={form?.handleSubmit} className='space-y-6'>
                    <ImageUploader handleImageChange={handleImageSelection} />
                    <BaseInput
                        name='first_name'
                        placeholder="First Name"
                        label='First Name'
                        formik={form}
                    />
                    <BaseInput
                        name='last_name'
                        placeholder="Last Name"
                        label='Last Name'
                        formik={form}

                    />
                    <BaseInput
                        name='email'
                        placeholder="Email Address"
                        label='Email Address'
                     
                        formik={form}

                    />

                    <div className="my-3 text-center">
                        <Button type='submit' disabled={!!form?.isSubmitting} className='bg-btn-100'>
                            {!!form.isSubmitting ? <BaseLoaderIcon /> : "Add Manager"}
                        </Button>
                    </div>
                </form>

            </div>
        </>
    )
}
