// import FullLayout from '@/components/layouts/dashboard/full-layout'
import { GiAutoRepair } from 'react-icons/gi';
import React, { ReactElement, useState } from 'react'
import { useEffectAsync } from '../../../../utils/react';
import { Button, Col, Row } from 'react-bootstrap';
import { UserEntity } from '../../../../models/user/user.entity';
import FullLayout from '../../../../components/layouts/company/full-layout'
import InvestorApi from '../../../api/investor';
import ViewCard from '../../../../components/view-card';
import ViewDetails from '../../../../components/view-details';
import router from 'next/router';
import { toast } from 'react-toastify';
import DeleteButton from '@/components/forms/base-delete';
import { VehicleEntity } from '@/models/admin/vehicle/vehicle.entity';
import VehichleApi from '@/pages/api/vehicle';
import { BsClock, BsEye, BsSpeedometer } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';
import { AiFillCar } from 'react-icons/ai';
import DataTable from '@/components/dataTable/viewDataTable';
import { GetVehiclesOptions } from '@/types/vehicle/get-vehicles-options.type';
import ViewModal from '@/components/view-modal';
import ViewVehicleDetail from '../../vehicle/[id]';
import ShowFormattedDate from '@/components/date-formatter';
import CompanyRoutes from '@/routes/company.route';
import { formatOdometer } from '@/utils/common';
import { EmptyData } from '@/components/empty-data';
import CompanyPermissions from '@/permissions/company.permission';
import { InvestorEntity } from '@/models/admin/investor/investor.entity';

export default function ViewInvestorDetail({ id }) {
	const [showVehicleModal, setShowVehicleModal] = useState<number>(null)
	const [investor, setInvestor] = useState<InvestorEntity>();
	const [vehicles, setVehicles] = useState<VehicleEntity[]>([])
	const investorApi = new InvestorApi();
	const vehicleApi = new VehichleApi();

	useEffectAsync(async () => {
		if (id) {
			try {
				const data = await investorApi.getById(id);
				setInvestor(data)
				const investorVehicles = await vehicleApi.list({ user_id: id } as GetVehiclesOptions)
				setVehicles(investorVehicles)
			} catch (error) {
			}
		}
	}, [id]);
	const onEditClick = (id: number) => {
		router.push(CompanyRoutes.investor.edit.replace('[investorId]', `${id}`))

	}
	const onHistoryVehicle = (id: number) => {
		router.push(CompanyRoutes.vehicle.history.replace('[vehicleId]', `${id}`))
	}
	const onDeleteClick = async (id: number) => {
		const investorApi = new InvestorApi()
		try {
			await investorApi.remove(id);
			setInvestor(investor)
			router.push(CompanyRoutes.investor.index)
		} catch (error) {
			toast.error("Vehicle couldn't removed")
		}
	};
	const onVehicleDeleteClick = async (id: number) => {
		const vehicleApi = new VehichleApi();
		try {
			await vehicleApi.remove(id);
			setVehicles(vehicles.filter(v => v.id != id))
			toast.success("Vehicle Removed Successfully")
		} catch (error) {
			toast.error("Vehicle couldn't removed")
		}
	};
	const onVehicleViewClick = (id: number) => {
		router.push(CompanyRoutes.vehicle.view.replace('[vehicleId]', `${id}`))
	}

	const onVehicleEditClick = (id: number) => {
		router.push(CompanyRoutes.vehicle.edit.replace('[vehicleId]', `${id}`))
	}

	return (
		<>
			<div className="shadow bg-white mb-[30px] rounded-md w-11/12 mx-auto">
				<div className="p-[20px]">
					<Row>
						<Col sm={2}>
							<img className='mx-auto my-4 md:my-0 rounded-full w-36 md:h-36 object-cover object-center border border-gray-300"' src={Boolean(investor?.file_name) ?
								(`${investor?.file_name}`) : ("https://www.w3schools.com/howto/img_avatar.png")
							} alt="" />
						</Col>

						<Col sm={7}>
							<ul className='flex flex-wrap'>
								<li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
									<p className='mb-2 font-medium text-gray-600'> Id</p>
									<p className='text-base text-gray-800 font-bold'> {investor?.id} </p>
								</li>
								<li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
									<p className='mb-2 font-medium text-gray-600'> First Name</p>
									<p className={`${'text-base text-gray-800'}`}> {investor?.first_name ? investor?.first_name : "N/A"} </p>
								</li>

								<li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
									<p className='mb-2 font-medium text-gray-600'> Last Name</p>
									<p className={`${'text-base text-gray-800'}`}> {investor?.last_name ? investor?.last_name : "N/A"} </p>
								</li>
								<li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
									<p className='mb-2 font-medium text-gray-600'> Date of birth</p>
									<p className={`${'text-base text-gray-800'}`}> {investor?.dob ? investor?.dob : "N/A"} </p>
								</li>
								<li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
									<p className='mb-2 font-medium text-gray-600'> Created </p>
									<p className={`${'text-base text-gray-800'}`}> {investor?.created_at ? <ShowFormattedDate date={investor?.created_at} hideTime /> : "N/A"} </p>
								</li>
							</ul>
						</Col>
					
						<Col sm={3} className='flex flex-col justify-start md:items-end items-center'>
								<Button className='bg-btn-100 lg:w-auto w-full' onClick={() => onEditClick(investor?.id)}>
									Edit Owner
								</Button>
								<DeleteButton onDelete={() => onDeleteClick(investor?.id)} tittle='Delete' className='lg:w-auto w-full flex items-center justify-center btn btn-outline-danger px-4 mt-2 hover:text-white' />

						</Col>
					</Row>
				</div>
			</div>
			<ViewCard>
				<Row>
					<ViewDetails
						title="Location"
						default={"N/A"}
						obj={{
							"Country": investor?.country,
							"City": investor?.city,
							"State": investor?.state,
							"Address": investor?.address,
							"Zip Code": investor?.zip_code,

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
							"Email": investor?.email,
							"Registration No": investor?.registration_no,
							"Status": investor?.status,
							"Type": investor?.type,
						}}
					/>
				</Row>
			</ViewCard>
			<ViewCard>
				<div className='flex justify-between min-h-16 items-center py-3  px-6 border-b border-gray-300'>
					<p className=' font-medium text-gray-800 text-lg'>Owner&apos;s Vehicles</p>
				</div>

				{ Boolean (vehicles.length == 0) ? (<EmptyData title='No history is available yet'/>)  :  <DataTable
					data={vehicles}
					columns={[
						{
							name: 'Id',
							selector: (v: VehicleEntity) => v.id
						},
						{
							name: 'Status',
							cell: (v: VehicleEntity) => (
								{
									0: (<span
										className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-2 text-xs font-semibold text-red-800"
									>
										<span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
										in-active
									</span>),
									1: (<span
										className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-2 text-xs font-semibold text-green-800"
									>
										<span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
										active
									</span>),
									2: (<span
										className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2 py-2 text-xs font-semibold text-cyan-800"
									>
										<span className="h-1.5 w-1.5 rounded-full bg-cyan-600"></span>
										booked
									</span>),
								}[(v?.status)]
							)
						},
						{
							name: 'Car Rego',
							cell: (v: VehicleEntity) => (
								<div className="vehicle-wrap">
									{v?.rego ? v?.rego : "N/A"}
								</div>
							)
						},
						{
							name: 'Vehicle',
							cell: (v: VehicleEntity) => (
								<div className="flex gap-3 px-6 py-4 font-normal text-gray-900">
									<div
										className="relative h-10 w-10"
									// className="relative h-20 w-20"
									>
										<img
											className="h-full w-full rounded-full object-cover object-center"
											src={Boolean(v?.media?.[0]?.file_name) ? v?.media?.[0]?.file_name : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7EkV3CX7fEqiL-PnjPzqstMql_Uu1V2vj0g&usqp=CAU"}
											alt=""
										/>
										{/* <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
									</div>
									<div className="text-sm cursor-pointer" onClick={() => setShowVehicleModal(v?.id)}>
										<div className="font-medium text-gray-700"><>{v?.brand?.name ? v?.brand?.name : "N/A"}</></div>
										<div className="text-gray-400"><> {v?.model?.name ? v?.model?.name : "N/A"}</></div>
									</div>
								</div>
							)
						},
						{
							name: 'Damage',
							cell: (v: VehicleEntity) => (
								<div className="flex gap-2">
									<span
										className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1 text-md font-semibold text-slate-600"
									>
										<GiAutoRepair className="text-xl text-gray-700" />{v?.damages_count ? v?.damages_count : "0"}
									</span>
								</div>
							)
						},
						{
							name: 'Year',
							cell: (v: VehicleEntity) => (
								<div className="vehicle-wrap">
									{v?.year ? v?.year : "N/A"}
								</div>
							)
						},
						{
							name: 'Owner',
							cell: (v: VehicleEntity) => (
								!!v?.investor ? v?.investor?.first_name : "N/A"
							)
						},
						{
							name: "Odometer",
							cell: (v: VehicleEntity) => (
								<div className="flex gap-2">
									<span
										className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600"
									>
										{formatOdometer(v.odometer)}
									</span>
								</div>
							),
						},
						{
							name: 'Actions',
							cell: (v: VehicleEntity) => (
								<div className="flex text-[24px] text-slate-600">
									<BsEye onClick={() => onVehicleViewClick(v?.id)} className="mx-1 cursor-pointer text-base ml-1  " color="#5236ff " />
									<BiEditAlt onClick={() => onVehicleEditClick(v?.id)} className="mx-1 cursor-pointer text-base ml-1  " color="#5236ff " />
									<BsClock className="mx-1 cursor-pointer text-base ml-1  " color="#5236ff " onClick={() => onHistoryVehicle(v?.id)} />
									<DeleteButton onDelete={() => onVehicleDeleteClick(v?.id)} className="mx-1 cursor-pointer text-base ml-1  " color="#5236ff " />
								</div>
							)
						},

					]}

				/>}
			</ViewCard>
			<ViewModal
				size="xl"
				show={Boolean(showVehicleModal)}
				onCloseClick={() => setShowVehicleModal(null)}
			>
				<ViewVehicleDetail hideActions={true} id={showVehicleModal} />
			</ViewModal>
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

ViewInvestorDetail.getLayout = function getLayout(page: ReactElement) {
	return (<FullLayout permission={CompanyPermissions.investor.view}>{page}</FullLayout>)
}