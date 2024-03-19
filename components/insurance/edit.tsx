import { InsuranceEntity } from '@/models/admin/insurance/insurance.entity'
import InsuranceApi from '@/pages/api/insurance'
import CompanyRoutes from '@/routes/company.route'
import { globalAjaxExceptionHandler } from '@/utils/ajax'
import { useEffectAsync } from '@/utils/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { MdCancel } from 'react-icons/md'
import { toast } from 'react-toastify'
import BaseInput from '../forms/base-input'
import BaseInputPhone from '../forms/base-input-phone'
import BaseTextArea from '../forms/base-text-area'
import ImageUploader from '../media/image-uploader'

export interface editInsuranceProps {
    setEditInsurance?: any;
    id?: number;
    onSave?:(e:any)=>void
}

const EditInsurance = (props: editInsuranceProps) => {

    const insuranceApi = new InsuranceApi();
    const router = useRouter();


    const [images, setImages] = useState<any>(null)

    const handleImageSelection = (files) => {
        setImages(files)
        form.setValues({
            ...form.values,
            thumbnail: null,
            file_name: null,
        })
    }

    const form = useFormik({
        initialValues: new InsuranceEntity(),
        validationSchema: InsuranceEntity.yupSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
          
            try {
                const formData = new FormData()
                const filteredData = Object.fromEntries(Object.entries(values)?.filter(([key, value]) => value !== null))

                Object.entries(filteredData).forEach(([key, val]: any) => {
                    formData.append(key, val);
                    formData.delete('thumbnail')
                    formData.delete('file_name')
                });

                if (images) {
                    images?.map((img, i) => {
                        formData.append(`images[${i}]`, img);
                    })
                } 
                if (!images && !values.thumbnail) formData.delete('image_ids[0]')

                const data = await insuranceApi.update(props?.id, formData as InsuranceEntity);
                props.onSave(data)
                props?.setEditInsurance(null)
                toast.success("Insurance update successfully")
                router.push(CompanyRoutes.setting.insurance)

            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Insurance update Failed",
                    toast,
                });
            }
        },
    });
    useEffectAsync(async () => {
        const data = await insuranceApi.getById(props?.id)
        form.setValues({
            ...form.values,
            ...data,
            name: data?.name,
            phone: data?.phone,
            email: data?.email,
            mailing_email: data?.mailing_email,
            address: data?.address,

            //file_name : data?.file_name,
            //thumbnail : data?.thumbnail,

        })

    }, [])

    return (
        <>
            <form onSubmit={form?.handleSubmit} className={`${form?.isSubmitting && 'opacity-20'} p-6 space-y-4`}>
                <div className="p-6 space-y-4" >
                    <p className='tracking-wide text-sm mb-2 block text-gray-400'>Company Logo</p>
                    <div>
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
                                                    })
                                                }
                                                }

                                            />

                                        </div>

                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <ImageUploader handleImageChange={handleImageSelection} />
                    <BaseInput required formik={form} label='Insurance Company Name' name='name' className='w-full ' />
                    <BaseInputPhone required formik={form} label='Phone Number' name='phone' className='w-full ' />
                    <BaseInput required formik={form} label='Email Address' name='email' className='w-full ' />
                    <BaseInput required formik={form} label='Mailing Address' name='mailing_email' className='w-full ' />
                    <BaseInput formik={form} label='Value' name='value' className='w-full ' />
                    <BaseInput formik={form} label='Type of cover' name='type_of_cover' className='w-full ' />
                    <BaseInput formik={form} label='Cover includes' name='cover_includes' className='w-full ' />
                    <BaseInput formik={form} label='Excess' name='excess' className='w-full ' />
                    <BaseInput formik={form} label='Length Liability' name='length_liability' className='w-full ' />
                    <BaseInput formik={form} required label='Copmany Url' name='company_url' className='w-full ' />
                    <BaseInput formik={form} required label='Policy Number' name='policy_number' className='w-full ' />
                    <BaseInput formik={form} required label='ABN Number' name='abn' className='w-full ' />
                    <BaseInput formik={form} required label='Company Terms Conditions' name='company_terms_conditions' className='w-full ' />
                    <BaseTextArea formik={form} name='notes' label='Notes' rows={2} />
                    <div className="text-end">
                        <Button className='bg-btn-100' type='submit' disabled={form?.isSubmitting}> Submit </Button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditInsurance