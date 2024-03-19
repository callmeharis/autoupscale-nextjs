import { toast } from "react-toastify";
import { BsClock } from "react-icons/bs";
import { BsEye } from 'react-icons/bs'
import { BiEditAlt } from 'react-icons/bi'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { VehicleEntity } from "../../../models/admin/vehicle/vehicle.entity";
import DataTable from "../../dataTable/viewDataTable";
import VehichleApi from "../../../pages/api/vehicle";
import DeleteButton from "../../forms/base-delete";
import CompanyRoutes from "@/routes/company.route";
import { GiAutoRepair } from "react-icons/gi";
import { formatOdometer } from "@/utils/common";
import { PermissionType } from "@/types/permissions.type";
import CompanyPermissions from "@/permissions/company.permission";
import { useAuth } from "@/hooks/use-auth";

export interface VehicleTableProps {
	vehicles?: VehicleEntity[];
	isLoading?: boolean;
}

export function VehicleTable(props: VehicleTableProps) {
	const [vehicles, setVehicles] = useState<VehicleEntity[]>(props.vehicles);
	const { user, hasPermission } = useAuth()
	const [can, setCan] = useState<PermissionType>(null)
	useEffect(() => {
		setCan({
			view: hasPermission(CompanyPermissions.vehicle.view),
			edit: hasPermission(CompanyPermissions.vehicle.edit),
			delete: hasPermission(CompanyPermissions.vehicle.delete),
		})
	}, [user])
	const router = useRouter()

	const onViewClick = (id: number) => {
		router.push(CompanyRoutes.vehicle.view.replace('[vehicleId]', `${id}`))
	}

	const onEditClick = (id: number) => {
		router.push(CompanyRoutes.vehicle.edit.replace('[vehicleId]', `${id}`))
	}

	const onHistoryVehicle = (id: number) => {
		router.push(CompanyRoutes.vehicle.history.replace('[vehicleId]', `${id}`))
	}

	const onDeleteClick = async (id: number) => {
		const vehicleApi = new VehichleApi();
		try {
			await vehicleApi.remove(id);
			setVehicles(vehicles.filter(v => v.id != id))
			toast.success("Vehicle Removed Successfully")
		} catch (error) {
			toast.error("Vehicle couldn't removed")
		}
	};

	useEffect(() => {
		setVehicles(props.vehicles);
	}, [props]);

	return (
		<div className="mx-5">
			<DataTable
				data={vehicles}
			isLoading={props.isLoading}
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
								<div className="text-sm cursor-pointer" onClick={() => onViewClick(v?.id)}>
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
							!!v?.investor ? `${v?.investor?.first_name} ${v?.investor?.last_name}` : "N/A"
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
								<BsClock className="mx-1 cursor-pointer text-base ml-1  " color="#5236ff " onClick={() => onHistoryVehicle(v?.id)} />
								{can.edit && <BiEditAlt onClick={() => onEditClick(v?.id)} className="cursor-pointer text-base ml-1 " color="#5236ff" />}
								{can.view && <BsEye onClick={() => onViewClick(v?.id)} className="mx-1 cursor-pointer text-base ml-1 font-bold " color="#5236ff " />}
								{can.delete && <DeleteButton onDelete={() => onDeleteClick(v?.id)} className="cursor-pointer text-base ml-1 " color="#5236ff" />}
							</div>
						)
					},
				]}

			/>
		</div>
	);
}
