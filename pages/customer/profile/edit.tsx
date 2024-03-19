import React, { ReactElement, useEffect, useState } from "react";
import router from "next/router";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { MdCancel } from "react-icons/md";
import { useFormik } from "formik";
import BaseInputPhone from "../../../components/forms/base-input-phone";
import BaseLoader from "../../../components/forms/base-loader";
import { UserEntity } from "../../../models/user/user.entity";
import { globalAjaxExceptionHandler } from "../../../utils/ajax";
import CustomerApi from "../../../pages/api/customer";
import { useEffectAsync } from "../../../utils/react";
import { HeadingSec } from "../../../components/reuse-component";
import ImageUploader from "../../../components/media/image-uploader";
import BaseInput from "../../../components/forms/base-input";
import FullLayout from "../../../components/layouts/customer/full-layout";
import CustomerRoutes from "../../../routes/customer.route";
import { BaseLoaderIcon } from "../../../components/forms/controls/base-loader-icon";
import { dateBeforeEighteenYears } from "../../../utils/helper/date-before-eighteen-years.helper";

export default function EditCustomer() {
    const [customerData, settCustomerData] = useState<UserEntity>(null)
    const customerApi = new CustomerApi();
    const [images, setImages] = useState<any>(null)

    const handleImageSelection = (files) => {
        setImages(files)
        form.setValues({
            ...form.values,
            thumbnail: null,
            filename: null
        })
    }
    const form = useFormik({
        initialValues: new UserEntity(),
        validationSchema: UserEntity.updateCustomerYupSchema(),
        onSubmit: async (values: any) => {
            try {
                const formData = new FormData()
                delete values?.license
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
                } else {
                    formData.append(`image_ids[0]`, form.values?.image_id)
                }
                if (!images && !values.thumbnail) formData.delete('image_ids[0]')
                await customerApi.self.edit(formData as UserEntity);
                toast.success("Customer Updated Successfully")
                router.push(CustomerRoutes.profile.index)
            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Customer Updated Failed",
                    toast,
                });
            }
        },
    });

    useEffectAsync(async () => {

        try {
            const data: UserEntity = await customerApi.self.get();
            form.setValues({
                ...data,
                ...data.license,
                front_image: null,
                back_image: null,
            })
            settCustomerData(data)
        } catch (error) {
        }

    }, []);

    // useEffect(() => {
    // 	console.log("form values", form?.values)
    // 	console.log("form errors", form?.errors)
    // }, [form?.values, form?.errors])

    return (
        <>
            {
                form?.isSubmitting ? <BaseLoader /> : <div className="bg-gray-100">
                    <form onSubmit={form.handleSubmit}>

                        <div className=" shahdow-xl max-w-7xl m-auto bg-white pb-5 pt-2 px-10">
                            <div className="py-4">
                                <HeadingSec title="Edit Profile" />
                            </div>
                            {
                                Boolean(form.values.thumbnail) && (
                                    <div>
                                        <div className="flex">
                                            <div style={{ marginRight: '10px' }}>
                                                <img
                                                    src={`${form.values.thumbnail}`}
                                                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }} />
                                                <MdCancel
                                                    className="cross-icon text-red-500 cursor-pointer"
                                                    onClick={() => {
                                                        form.setValues({
                                                            ...form.values,
                                                            thumbnail: null,
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
                            <div className="my-4">
                                <ImageUploader handleImageChange={handleImageSelection} />
                            </div>
                            <div className="First_row">
                                <div className=" lg:w-8/12  lg:flex  items-center ">

                                    <div className=" input-style">
                                        <BaseInput
                                            required
                                            name="first_name"
                                            formik={form}
                                            label="First Name"
                                        />
                                    </div>
                                    <div className="lg:mx-3 input-style">
                                        <BaseInput
                                            className=""
                                            label="Last Name"
                                            required
                                            name="last_name"
                                            formik={form}
                                        />
                                    </div>
                                    <div className="mr-3">
                                        <BaseInput
                                            className=""
                                            required
                                            name="email"
                                            formik={form}
                                            label="Email"
                                        />
                                    </div>
                                    <div className="mr-3">
                                        <BaseInputPhone
                                            name="whatsapp_no"
                                            formik={form}
                                            label="Whatsapp No"
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="third-row mt-4 input-style">
                                <div className="lg:flex w-10/12">

                                    <div className=" lg:mx-3">
                                        <BaseInputPhone
                                            required
                                            name="phone"
                                            formik={form}
                                            label="Phone No."
                                        />
                                    </div>
                                    <div className=" lg:mx-3">
                                        <BaseInput
                                            required
                                            name="registration_no"
                                            formik={form}
                                            label="Registration No"
                                        />
                                    </div>
                                    <div className="lg:mx-3 input-style">
                                        <BaseInput
                                            type="date"
                                            name="dob"
                                            formik={form}
                                            label="Birthday"
                                            required
                                            max={dateBeforeEighteenYears()}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="lg:flex mt-4 w-10/12">
                                <div className=" lg:mx-3">
                                    <BaseInput
                                        required
                                        name="zip_code"
                                        formik={form}
                                        label="Zip"
                                    />
                                </div>
                                <div className=" lg:mx-3">
                                    <BaseInput
                                        name="state"
                                        formik={form}
                                        required
                                        label="State"
                                    />
                                </div>
                                <div className=" lg:mx-3">
                                    <BaseInput
                                        name="city"
                                        formik={form}
                                        label="City"
                                        required
                                    />
                                </div>
                                <div className=" lg:mx-3">
                                    <BaseInput
                                        name="street"
                                        formik={form}
                                        label="Street"
                                    />
                                </div>
                                <div className=" lg:mx-3">
                                    <BaseInput
                                        name="building"
                                        formik={form}
                                        label="Building "
                                    />
                                </div>
                            </div>

                            <div className="Fourth_row mt-4  border-top">
                                <h1 className="my-2 text-xl font-bold text-gray-500">License Details</h1>
                                <div className="lg:w-8/12  flex  items-center input-style ">
                                    <div className="mr-3 ">
                                        <BaseInput
                                            required
                                            name="licence_no"
                                            formik={form}
                                            label="License no."
                                        />
                                    </div>

                                    <div className="mr-3">
                                        <BaseInput
                                            required
                                            name="issue_date"
                                            formik={form}
                                            label="License issue date"
                                            type="date"
                                            max={new Date().toISOString().split("T")[0]}
                                        />
                                    </div>
                                    <div className="mr-3">
                                        <BaseInput
                                            required
                                            name="expiry_date"
                                            formik={form}
                                            label="License expiry date"
                                            type="date"
                                            min={new Date().toISOString().split("T")[0]}

                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="Fourth_row mt-4 ">
                                <div className="lg:w-8/12  flex  items-center input-style ">
                                    <div className="mr-3 lg:w-96">
                                        <p className="my-2">License front image</p>
                                        <div className="border my-2 rounded-md p-2">
                                            <img
                                                src={
                                                    Boolean(form?.values?.front_image) ? (
                                                        URL.createObjectURL(form.values?.front_image)
                                                    ) : (
                                                        `${customerData?.license?.front_image}`
                                                    )
                                                }
                                                alt="N/A"
                                                style={{ width: '500px', height: "200px" }}
                                            />
                                        </div>
                                        <input
                                            name="front_image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => {
                                                form.setValues({
                                                    ...form?.values,
                                                    front_image: event.currentTarget.files[0]
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="lg:w-8/12  flex  items-center input-style mt-4">
                                    <div className="mr-3 lg:w-96">
                                        <p className="my-2">License back image</p>
                                        <div className="border my-2 rounded-md p-2">
                                            <img
                                                src={
                                                    Boolean(form?.values?.back_image) ? (
                                                        URL.createObjectURL(form?.values?.back_image)
                                                    ) : (
                                                        `${customerData?.license?.back_image}`
                                                    )
                                                }
                                                alt="N/A"
                                                style={{ width: '500px', height: "200px" }}
                                            />
                                        </div>
                                        <input
                                            name="back_image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => {
                                                form.setValues({
                                                    ...form?.values,
                                                    back_image: event.currentTarget.files[0]
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <Button className="bg-btn-100" type='submit' disabled={form?.isSubmitting || !form?.isValid || form?.isValidating} > {!!form.isSubmitting ? <BaseLoaderIcon /> : "Update"}</Button>

                            </div>
                        </div>
                    </form>
                </div>
            }
        </>
    );
}
EditCustomer.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout>{page}</FullLayout>;
};















