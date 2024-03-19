import React, { useContext, useEffect, useState } from "react";
import { Download } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import BaseInput from "../../../components/forms/base-input";
import { HeadingSec } from "../../reuse-component";
import CustomerApi from "../../../pages/api/customer";
import { globalAjaxExceptionHandler } from "../../../utils/ajax";
import BaseInputPhone from "../../../components/forms/base-input-phone";
import ImageUploader from "../../../components/media/image-uploader";
import { BaseCreateProps } from "../../../types/base-prop-types/base-create-prop.type";
import BaseClickToCopyInput from "../../../components/forms/base-copy-to-clipboard";
import { UserContext } from "../../../context/user-context";
import BaseLoader from "../../../components/forms/base-loader";
import CompanyRoutes from "../../../routes/company.route";
import { dateBeforeEighteenYears } from "../../../utils/helper/date-before-eighteen-years.helper";
import { UserTypeEnum } from "../../../enums/auth/user-type.enum";
// import { emailExistanceCheck } from "../../../utils/helper/email-existance-check.helper";
import { CustomerEntity } from "@/models/admin/customer/customer.entity";


export function FormSection({ onSave, showCopytoClip, isPublic, companyId }: BaseCreateProps) {

	const { user } = useContext(UserContext)

	const router = useRouter()
	const customerApi = new CustomerApi();
	const [images, setImages] = useState<any>(null)


	const handleImageSelection = (files) => {
		setImages(files)
	}

	useEffect(() => {
		if (!!companyId) form.setFieldValue('company_id', companyId)
	}, [])

	const form = useFormik({
		initialValues: new CustomerEntity(),
		validationSchema: CustomerEntity.createCustomerYupSchema(),
		validateOnChange: true,
		validateOnBlur: true,
		onSubmit: async (values: any) => {
			const formData = new FormData()
			Object?.entries(values).forEach(([key, val]: any) => {
				formData.append(key, val);
			});
			images?.map((img, i) => {
				formData.append(`images[${i}]`, img);
			})
			try {
				if (isPublic) {
					const data = await customerApi.public.create(formData as CustomerEntity)
					if (!!onSave) onSave(data)

				} else {
					const data = await customerApi.create(formData as CustomerEntity)
					if (!!onSave) {
						onSave(data)
					} else router.push(CompanyRoutes.customer.index)
				}

				toast.success("Customer Created Successfully")
			} catch (error) {
				globalAjaxExceptionHandler(error, {
					formik: form,
					defaultMessage: "Customer Creation Failed",
					toast,
				});
			}
		},
	});
	return (
		<>
			{
				form?.isSubmitting ? <BaseLoader /> : <div className="bg-gray-100">
					<form onSubmit={form.handleSubmit} encType="multipart/form-data">
						<div className=" shahdow-xl max-w-7xl m-auto bg-white pb-5 pt-2 px-10">

							{
								Boolean(showCopytoClip) && <div style={{ maxWidth: '350px', marginTop: '1rem', marginBottom: '1rem' }}>
									<BaseClickToCopyInput
										className="cursor-pointer"
										value={`${process.env.FRONTEND_BASE_URL}/customer-create/${user?.company?.id}`}
										label="Copy to Clipboard"
										tooltipText="public url to create customer"
									/>
								</div> 
							}

							<div className="py-4">
								<HeadingSec title="Add Customer " />
							</div>
							<ImageUploader handleImageChange={handleImageSelection} />
							<div className="First_row">
								<div className="   lg:flex  ">
									<div className="  w-full lg:w-64 lg:mt-0 mt-3">
										<BaseInput
											required
											name="first_name"
											formik={form}
											label="First Name"
										/>
									</div>
									<div className="lg:mx-3  w-full lg:w-64 lg:mt-0 mt-3">
										<BaseInput
											required
											name="last_name"
											formik={form}
											label="Last Name"
										/>
									</div>
									<div className="lg:mr-3 mr-0 w-full lg:w-64 lg:mt-0 mt-3">
										<BaseInput
											required
											name="email"
											// handleBlur={() => emailExistanceCheck({
											// 	form,
											// 	type: UserTypeEnum.CUSTOMER
											// })}
											formik={form}
											label="Email"
										/>
									</div>
									<div className="lg:mr-3 mr-0 w-full lg:w-64 lg:mt-0 mt-3">
										<BaseInputPhone
											name="whatsapp_no"
											formik={form}
											label="Whatsapp No"
										/>
									</div>

								</div>
							</div>
							<div className="third-row lg:mt-4  ">
								<div className="lg:flex w-full lg:w-10/12">

									<div className=" lg:mx-3 w-full lg:w-64 lg:mt-0 mt-3">
										<BaseInputPhone
											required
											className=""
											name="phone"
											formik={form}
											label="Phone No."
										/>
									</div>
									<div className=" lg:mx-3 w-full lg:w-64 lg:mt-0 mt-3">
										<BaseInput
											required
											name="registration_no"
											formik={form}
											label="Registration No"
										/>
									</div>
									<div className="lg:mx-3  w-full lg:w-64 lg:mt-0 mt-3">
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
							<div className="lg:flex w-full lg:w-10/12 lg:mt-4">
								<div className=" lg:mx-3 w-full lg:w-64 lg:mt-0 mt-3">
									<BaseInput
										required
										name="zip_code"
										formik={form}
										label="Zip"
									/>
								</div>
								<div className=" lg:mx-3 w-full lg:w-64 lg:mt-0 mt-3">
									<BaseInput
										name="state"
										formik={form}
										required
										label="State"
									/>
								</div>
								<div className=" lg:mx-3 w-full lg:w-64 lg:mt-0 mt-3">
									<BaseInput
										name="city"
										formik={form}
										label="City"
										required
									/>
								</div>
								<div className=" lg:mx-3 w-full lg:w-64 lg:mt-0 mt-3">
									<BaseInput
										name="street"
										formik={form}
										label="Street"
									/>
								</div>
								<div className=" lg:mx-3 w-full lg:w-64 lg:mt-0 mt-3">
									<BaseInput
										name="building"
										formik={form}
										label="Building "
									/>
								</div>
							</div>

							<div className="lg:flex w-full lg:w-10/12 lg:mt-4">
								<div className=" lg:mx-3 w-full lg:w-64 lg:mt-0 mt-3">
									<BaseInput
										name="emergency_name"
										formik={form}
										label="Emergency Contact Name"
									/>
								</div>
								<div className=" lg:mx-3 w-full lg:w-64 lg:mt-0 mt-3">
									<BaseInputPhone
											name="emergency_number"
											formik={form}
											label="Emergency Contact"
										/>
								</div>
							</div>

							<div className="Fourth_row mt-4  border-top">
								<h1 className="my-2 text-xl font-bold text-gray-500">License Details</h1>
								<div className="lg:w-8/12 w-full flex  lg:flex-row flex-col input-style ">
									<div className="mr-3  w-full lg:w-64 lg:mt-0 mt-3">
										<BaseInput
											required
											name="licence_no"
											formik={form}
											label="License no."
										/>
									</div>
									<div className="mr-3 w-full lg:w-64 lg:mt-0 mt-3">
										<BaseInput
											required
											name="issue_date"
											formik={form}
											label="License issue date"
											type="date"
											max={new Date().toISOString().split("T")[0]}
										/>
									</div>
									<div className="mr-3 w-full lg:w-64 lg:mt-0 mt-3">

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
								<div className="lg:w-8/12  flex  input-style ">
									<div className="mr-3 lg:w-96">
										<p className="tracking-wide text-sm mb-2 block text-gray-400 my-2">License front image</p>
										{
											Boolean(form?.values?.front_image) && (
												<div className="">
													<img
														src={URL.createObjectURL(form?.values?.front_image)}
														alt="N/A"
														className="h-24 w-24 object-cover p-1 mb-4 ml-8 border border-gray-300 rounded-full"
													/>
												</div>
											)
										}

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
										{Boolean(form?.errors?.front_image) && <p className="text-xs text-red-600 my-2">License back Image is required.</p>}
									</div>
								</div>
								<div className="lg:w-8/12  flex  input-style mt-4">
									<div className="mr-3 lg:w-96">
										<p className="my-2 tracking-wide text-sm mb-2 block text-gray-400">License back image</p>
										{
											Boolean(form?.values?.back_image) && (
												<div className="">
													<img
														src={URL.createObjectURL(form?.values?.back_image)}
														alt="N/A"
														className="h-24 w-24 object-cover p-1 mb-4 ml-8 border border-gray-300 rounded-full"
													/>

												</div>
											)
										}
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

										{Boolean(form?.errors?.back_image) && <p className="text-xs text-red-600 my-2">License back Image is required.</p>}
									</div>
								</div>
							</div>

							<div className="Fourth_row mt-4  border-top">
								<h1 className="my-2 text-xl font-bold text-gray-500">Offline Payment</h1>
								<div className="lg:w-8/12  lg:flex   input-style ">
									<div className="mr-3  w-full lg:w-64 lg:mt-0 mt-3">
										<BaseInput
											name="bsb"
											formik={form}
											label="BSB"
										/>
									</div>
									<div className="mr-3  w-full lg:w-64 lg:mt-0 mt-3">
										<BaseInput
											name="account_number"
											formik={form}
											label="Bank Account Number"
										/>
									</div>
									<div className="mr-3  w-full lg:w-64 lg:mt-0 mt-3">
										<BaseInput
											name="link_account_number"
											formik={form}
											label="LinkT Account Number"
										/>
									</div>
								</div>
							</div>

							<div className="text-right">
								<Button type="submit" className=" bg-btn-100 my-3">
									Create
								</Button>
							</div>
						</div>
					</form>
				</div>
			}

		</>
	);
}
