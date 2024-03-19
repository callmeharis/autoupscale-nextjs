import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { BiEditAlt } from 'react-icons/bi'
import { BsEye, BsTrash } from 'react-icons/bs'
import DataTable from "../../dataTable/viewDataTable";
import InvestorApi from "../../../pages/api/investor";
import DeleteButton from "../../forms/base-delete";
import CompanyRoutes from "@/routes/company.route";
import { useAuth } from "@/hooks/use-auth";
import { PermissionType } from "@/types/permissions.type";
import CompanyPermissions from "@/permissions/company.permission";
import { InvestorEntity } from "@/models/admin/investor/investor.entity";
export interface InvestorTableProps {
	investors?: InvestorEntity[];
	isLoading?: boolean;
}

export function InvestorTable(props: InvestorTableProps) {
	const [investors, setInvestors] = useState<InvestorEntity[]>(props.investors);
	const router = useRouter()
	const { user, hasPermission } = useAuth()
	const [can, setCan] = useState<PermissionType>(null)
	useEffect(() => {
		setCan({
			view: hasPermission(CompanyPermissions.investor.view),
			edit: hasPermission(CompanyPermissions.investor.edit),
			delete: hasPermission(CompanyPermissions.investor.delete),
		})
	}, [user])
	const onViewClick = (id: number) => router.push(CompanyRoutes.investor.view.replace('[investorId]', `${id}`))


	const onEditClick = (id: number) => router.push(CompanyRoutes.investor.edit.replace('[investorId]', `${id}`))

	const onDeleteClick = async (id: number) => {
		const investorApi = new InvestorApi();
		try {
			await investorApi.remove(id);
			setInvestors(investors.filter(v => v.id != id))
			toast.success("Owner Removed Successfully")
		} catch (error) {
			toast.error("Owner couldn't removed")
		}
	};

	useEffect(() => {
		setInvestors(props.investors);
	}, [props]);
	return (

<div className="mx-5" suppressHydrationWarning={true}>
			<DataTable
			isLoading={props.isLoading}
				data={investors}
				columns={[
					{
						name: 'Id',
						selector: (investor: InvestorEntity) => investor.id
					},

					{
						name: 'Name',
						selector: (investor: InvestorEntity) => (

							<div className="flex gap-3 px-6 py-4 font-normal text-gray-900">
								<div
									className="relative h-10 w-10"
								>
									<img
										className="h-full w-full rounded-full object-cover object-center"
										src={Boolean(investor.file_name) ? investor.file_name : "https://www.w3schools.com/howto/img_avatar.png"}
										alt=""
									/>
								</div>
								<div className="text-sm cursor-pointer " onClick={() => onViewClick(investor?.id)}>
									<div className="text-sm  h-full flex items-center hover:text-blue-500 hover:underline transition-all duration-300"><>{investor?.first_name ? `${investor.first_name} ${investor.last_name}` : 'N/A'}</></div>

								</div>
							</div>

						)
					},
					{
						name: 'Email',
						selector: (investor: InvestorEntity) => (
							<div className="vehicle-wrap">
								{investor?.email}
							</div >

						)
					},
					{
						name: 'Address',
						selector: (investor: InvestorEntity) => (
							<div className="vehicle-wrap">
								<div className="vehicle-wrap__flex flex items-start">
									{investor?.address}
								</div >
							</div >

						)
					},
					{
						name: 'Phone',
						selector: (investor: InvestorEntity) => (
							<div className="vehicle-wrap">
								{investor?.phone ? investor?.phone : "N/A"}
							</div>

						)
					},

					{
						name: 'Actions',
						cell: (investor: InvestorEntity) => (
							<div className="flex text-purple-600 px-4 py-2  text-[20px]">
								{can.edit && <BiEditAlt onClick={() => onEditClick(investor?.id)} className="cursor-pointer text-base ml-1 " color="#5236ff" />}
								{can.view && <BsEye onClick={() => onViewClick(investor?.id)} className="mx-1 cursor-pointer text-base ml-1 font-bold " color="#5236ff " />}
								{can.delete && <DeleteButton onDelete={() => onDeleteClick(investor?.id)} className="cursor-pointer text-base ml-1 " color="#5236ff" />}
							</div>

						)
					},
				]}

			/>
		</div>
	);
}
