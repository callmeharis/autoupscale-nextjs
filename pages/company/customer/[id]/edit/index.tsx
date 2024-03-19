import React, { ReactElement, useEffect, useState } from "react";
import router from "next/router";
import { toast } from "react-toastify";
import { Download } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { MdCancel } from "react-icons/md";
import { useFormik } from "formik";
import { HeadingSec } from "../../../../../components/reuse-component";
import { useEffectAsync } from "../../../../../utils/react";
import { globalAjaxExceptionHandler } from "../../../../../utils/ajax";
import BaseInput from "../../../../../components/forms/base-input";
import CustomerApi from "../../../../api/customer";
import FullLayout from "../../../../../components/layouts/company/full-layout";
import ImageUploader from "../../../../../components/media/image-uploader";
import BaseInputPhone from "../../../../../components/forms/base-input-phone";
import BaseLoader from "../../../../../components/forms/base-loader";
import CompanyRoutes from "../../../../../routes/company.route";
import { BaseLoaderIcon } from "../../../../../components/forms/controls/base-loader-icon";
import CompanyPermissions from "../../../../../permissions/company.permission";
import { dateBeforeEighteenYears } from "../../../../../utils/helper/date-before-eighteen-years.helper";
import { CustomerEntity } from "@/models/admin/customer/customer.entity";

export default function EditCustomer({ customer_id }) {
	const [customerData, settCustomerData] = useState<CustomerEntity>(null)
	const customerApi = new CustomerApi();
	const [images, setImages] = useState<any>(null)
    const handleImageSelection = (files) => {
        setImages(files)
        form.setValues({
            ...form.values,
            file_name: null,
            filename: null
        })
    }

	const form = useFormik({
		initialValues: new CustomerEntity(),
		validationSchema: CustomerEntity.updateCustomerYupSchema(),
		onSubmit: async (values: any) => {
			try {
				const formData = new FormData()
				delete values?.license
				const { thumbnail, file_name, documents, id, created_at, status, ...restValues } = values
				const filteredData = Object.fromEntries(Object.entries(values)?.filter(([key, value]) => value !== null))
				console.log(filteredData, 'Filter');

				Object.entries(filteredData).forEach(([key, val]: any) => {
					formData.append(key, val);
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
				await customerApi.update(customer_id, formData as CustomerEntity);
				toast.success("Customer Updated Successfully")
				router.push(CompanyRoutes.customer.index)
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
		if (customer_id) {
			try {
				const data: CustomerEntity = await customerApi.getById(customer_id);
				form.setValues({
					...data,
					...data.license,
					front_image: null,
					back_image: null,
				})
				settCustomerData(data)
			} catch (error) {
			}
		}
	}, [customer_id]);

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
								<HeadingSec title="Edit Customer" />
							</div>
							{
							Boolean(form.values.file_name) && (
								<div>
									<div className="flex">
										<div style={{ marginRight: '10px' }}>
											<img
												src={`${form.values.file_name} `}
												style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }} />
											<MdCancel
												className="cross-icon text-red-500 cursor-pointer"
												onClick={() => {
													form.setValues({
														...form.values,
														file_name: null,
														filename: null
													})
													// setImages(null)
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
								<div className=" lg:w-8/12  lg:flex   ">

									<div className=" input-style ">
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

									<div className=" lg:mr-3">
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
								<div className=" lg:mr-3">
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

							<div className="lg:flex w-10/12 mt-4">
								<div className=" lg:mr-3 w-64">
									<BaseInput
										name="emergency_name"
										formik={form}
										label="Emergency Contact Name"
									/>
								</div>
								<div className=" lg:mx-3 w-64">
									<BaseInputPhone
											name="emergency_number"
											formik={form}
											label="Emergency Contact"
										/>
								</div>
							</div>

							<div className="Fourth_row mt-4  border-top">
								<h1 className="my-2 text-xl font-bold text-gray-500">License Details</h1>
								<div className="lg:w-8/12  flex   input-style ">
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
								<div className="lg:w-8/12  flex   input-style ">
									<div className="mr-3 lg:w-96">
										<p className="my-2">License front image</p>
										<div className="">
											<img
												src={
													Boolean(form?.values?.front_image) ? (
														URL.createObjectURL(form.values?.front_image)
													) : (
														`${customerData?.license?.front_image}`
													)
												}
												alt="N/A"
												className="h-24 w-24 object-cover p-1 mb-4 ml-8 border border-gray-300 rounded-full"
											/>
										</div>
										<div className="relative overflow-hidden inline-block;">
											<button className="mr-3 px-4 py-3 text-sm btn-uploader ">Upload Image <Download className="inline-block" /></button>
											<input
												name="front_image"
												type="file"
												accept="image/*"
												className="text-[100px] absolute opacity-0 left-0 top-0"
												onChange={(event) => {
													form.setFieldValue('front_image', event.currentTarget.files[0]);
												}}
											/>
										</div>
									</div>
								</div>
								<div className="lg:w-8/12  flex   input-style mt-4">
									<div className="mr-3 lg:w-96">
										<p className="my-2">License back image</p>
										<div className="">
											<img
												src={
													Boolean(form?.values?.back_image) ? (
														URL.createObjectURL(form?.values?.back_image)
													) : (
														`${customerData?.license?.back_image}`
													)
												}
												alt="N/A"
												className="h-24 w-24 object-cover p-1 mb-4 ml-8 border border-gray-300 rounded-full"
											/>
										</div>
										<div className="relative overflow-hidden inline-block;">
											<button className="mr-3 px-4 py-3 text-sm btn-uploader ">Upload Image <Download className="inline-block" /></button>
											<input
												name="back_image"
												type="file"
												className="text-[100px] absolute opacity-0 left-0 top-0"
												accept="image/*"
												onChange={(event) => {
													form.setFieldValue('back_image', event.currentTarget.files[0]);
												}}
											/>

										</div>
									</div>
								</div>
							</div>

							<div className="Fourth_row mt-4  border-top">
								<h1 className="my-2 text-xl font-bold text-gray-500">Offline Payment</h1>
								<div className="lg:w-8/12  flex   input-style ">
									<div className="mr-3  w-64">
										<BaseInput
											name="bsb"
											formik={form}
											label="BSB"
										/>
									</div>
									<div className="mr-3  w-64">
										<BaseInput
											name="account_number"
											formik={form}
											label="Bank Account Number"
										/>
									</div>
									<div className="mr-3  w-64">
										<BaseInput
											name="link_account_number"
											formik={form}
											label="LinkT Account Number"
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
	return <FullLayout permission={CompanyPermissions.customer.edit}>{page}</FullLayout>;
};

export async function getServerSideProps(context) {
	try {
		const customer_id = context.params?.id;
		if (!!!customer_id)
			return { notFound: true }

		return {
			props: { customer_id }


		}
	} catch (error) {
		console.error("Exception is here:", error);
		return { props: { customer_id: 0 } }
	}
}













