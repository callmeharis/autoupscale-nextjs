import React, { ReactElement, useState } from "react";
import { useRouter } from 'next/router'
import { Button, Carousel, Col, Modal, Row } from 'react-bootstrap';
import FullLayout from "../../../../components/layouts/company/full-layout";
import ViewDetails from "../../../../components/view-details";
import ViewCard from "../../../../components/view-card";
import CustomerApi from '@/pages/api/customer';
import { useEffectAsync } from '@/utils/react';
import CustomerHistory from "@/components/customer/history";
import { toast } from "react-toastify";
import DeleteButton from "@/components/forms/base-delete";
import DonutChart from "@/components/forms/base-chart";
import ShowFormattedDate from "@/components/date-formatter";
import CompanyRoutes from "@/routes/company.route";
import CompanyPermissions from "@/permissions/company.permission";
import { CustomerEntity } from "@/models/admin/customer/customer.entity";

export default function ViewCustomerDetail({ id, hideActions }) {
	const router = useRouter()
	const [showModal, setShowModal] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);

	const handleImageClick = () => {
		setShowModal(true);
	};

	const handleModalClose = () => {
		setShowModal(false);
	};

	const handleThumbnailClick = (selectedIndex) => {
		setActiveIndex(selectedIndex);
	};
	const [customer, setCustomer] = useState<CustomerEntity>();

	const customerApi = new CustomerApi()

	useEffectAsync(async () => {
		if (id) {
			try {
				const data = await customerApi.getById(id);
				setCustomer(data)
			} catch (error) {
				console.log("error customer", error);
			}
		}
	}, [id]);
	const onEditClick = (id: number) => {
		router.push(CompanyRoutes.customer.edit.replace('[customerId]', `${id}`))

	}
	const onDeleteClick = async (id: number) => {
		const customerApi = new CustomerApi()
		try {
			await customerApi.remove(id);
			setCustomer(customer)
			router.push(CompanyRoutes.customer.index)
			toast.success("Vehicle Removed Successfully")
		} catch (error) {
			toast.error("Vehicle couldn't removed")
		}
	};



	return (
		<>
			<div className="shadow bg-white mb-[30px] rounded-md max-w-7xl mx-auto">
				<div className="p-[20px]">
					<Row>
						<Col lg={2}>
							<img className='rounded-full w-36 h-36 object-cover object-center border border-gray-300"' src={
								Boolean(customer?.file_name) ?
									(`${customer?.file_name}`) : ("https://www.w3schools.com/howto/img_avatar.png")
							} alt="" />
						</Col>

						<Col lg={4}>
							<ul className='flex flex-wrap'>
								<li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
									<p className='mb-2 font-medium text-gray-600'> Id</p>
									<p className='text-base text-gray-800 font-bold'> {customer?.id} </p>
								</li>
								<li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
									<p className='mb-2 font-medium text-gray-600'> First Name</p>
									<p className={`${'text-base text-gray-800'}`}> {customer?.first_name ? customer?.first_name : "N/A"} </p>
								</li>
								<li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
									<p className='mb-2 font-medium text-gray-600'> Last Name</p>
									<p className={`${'text-base text-gray-800'}`}> {customer?.last_name ? customer?.last_name : "N/A"} </p>
								</li>
								<li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
									<p className='mb-2 font-medium text-gray-600'> Date of birth</p>
									<p className={`${'text-base text-gray-800'}`}> {customer?.dob ? <ShowFormattedDate date={customer?.dob} hideTime /> : "N/A"} </p>
								</li>
								<li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
									<p className='mb-2 font-medium text-gray-600'> Created </p>
									<p className={`${'text-base text-gray-800'}`}> {customer?.created_at ? <ShowFormattedDate date={customer?.created_at} hideTime /> : "N/A"} </p>
								</li>
							</ul>
						</Col>
						<Col lg={3}>
							<div className="h-40 container m-0 p-0">
								<DonutChart />
							</div>

						</Col>
						{
							!hideActions ? (
								<Col lg={3}>
									<div>
										<Button onClick={() => onEditClick(customer?.id)} className='bg-btn-100'>
											Edit Customer
										</Button>
									</div>
									<div>

										<DeleteButton onDelete={() => onDeleteClick(customer?.id)} tittle='Delete' className='flex items-center btn btn-outline-danger px-4 mt-2 hover:text-white' />

									</div>

								</Col>
							) : null
						}
					</Row>
				</div>
			</div>
			<ViewCard>
				<Row>
					<ViewDetails
						title="Location"
						default={"N/A"}
						obj={{
							"City": customer?.city,
							"State": customer?.state,
							"Zip Code": customer?.zip_code,

						}}
					/>
				</Row>
			</ViewCard>
			<ViewCard>
				<Row>
					<ViewDetails
						title="Contact Information"
						default={"N/A"}
						obj={{
							"Phone number": customer?.phone,
							"E-mail": customer?.email,
							"Whatsapp number": customer?.whatsapp_no,
							"Registration Number": customer?.registration_no,
							"Emergency Contact Name": customer?.emergency_name ?? 'N/A',
							"Emergency Number": customer?.emergency_number ?? 'N/A'
						}}
					/>
				</Row>
			</ViewCard>
			<Row className="max-w-7xl m-auto">
				<Col lg={6} className="pl-0">
					<ViewCard>
						<ViewDetails
							title="License Details"
							default={"N/A"}
							obj={{
								"Type": "DRIVER LICENSE",
								"License Number": customer?.license?.licence_no,
								"Issue Date": customer?.license?.issue_date ? customer?.license?.issue_date : 'No issue date',
								"Expiry Date": customer?.license?.expiry_date ? customer?.license?.expiry_date : 'No expiry date',
							}}
						/>
					</ViewCard>
				</Col>
				<Col lg={6} className="pr-0">
					{/* <ViewCard>
						<Row className="text-center">
							<div className="flex justify-between min-h-16 items-center py-3  px-6  border-gray-300"><h3 className=" font-medium text-gray-800 text-lg">License Images </h3></div>
							<Col lg={3} className="" >
								<img src={`${customer?.license?.front_image}`} className="w-32 m-auto" alt="dsajk" />
							</Col>
							<Col lg={3} className="">

								<img src={`${customer?.license?.back_image}`} className="w-32 m-auto" alt="dsajk" />
							</Col>

						</Row>
					</ViewCard> */}
					<ViewCard>
						<Row className="text-center">
							<div className="flex justify-between min-h-16 items-center py-3 px-6 border-gray-300">
								<h3 className="font-medium text-gray-800 text-lg">License Images</h3>
							</div>
							{ customer?.license?.front_image && (
								<Col lg={3} className="">
								<img
									src={`${customer?.license?.front_image}`}
									className="w-32 h-32 m-auto cursor-pointer object-cover rounded-sm"
									alt="Front Image"
									onClick={handleImageClick}
								/>
							</Col>
							)}
							{customer?.license?.back_image && (
								<Col lg={3} className="">
									<img
										src={`${customer?.license?.back_image}`}
										className="w-32 h-32 m-auto cursor-pointer object-cover rounded-sm"
										alt="Front Image"
										onClick={handleImageClick}
									/>
								</Col>
							)}
						</Row>
					</ViewCard>

					<Modal show={showModal} onHide={handleModalClose} size="lg">
						<Modal.Body>
							<Carousel activeIndex={activeIndex} onSelect={handleThumbnailClick} interval={null}>
								<Carousel.Item>
									<img
										src={`${customer?.license?.front_image}`}
										alt="Front Image"
										style={{ width: '100%', height: 'auto', maxHeight: '500px' }}
									/>
								</Carousel.Item>
								<Carousel.Item>
									<img
										src={`${customer?.license?.back_image}`}
										alt="Back Image"
										style={{ width: '100%', height: 'auto', maxHeight: '500px' }}
									/>
								</Carousel.Item>
							</Carousel>
						</Modal.Body>
					</Modal>

				</Col>
			</Row>
			<ViewCard>
				<Row>
					<ViewDetails
						title="Offline Payment"
						default={"N/A"}
						obj={{
							"BSB": customer?.bsb ?? 'N/A',
							"Bank Account Number": customer?.account_number ?? 'N/A',
							"LinkT Account Number": customer?.link_account_number ?? 'N/A',
						}}
					/>
				</Row>
			</ViewCard>
			<ViewCard>
				<h1 className=" font-medium text-gray-800 text-lg">History</h1>
				<CustomerHistory id={id} />

			</ViewCard>

		</>


	)
}

export async function getServerSideProps(context) {
	try {
		const id = context.params?.id;
		if (!!!id)
			return { notFound: true }

		return {
			props: { id }
		}
	} catch (error) {
		console.error("Exception is here:", error);
		return { props: { id: 0 } }
	}

}


ViewCustomerDetail.getLayout = function getLayout(page: ReactElement) {
	return <FullLayout permission={CompanyPermissions.customer.view}>{page}</FullLayout>;
};
