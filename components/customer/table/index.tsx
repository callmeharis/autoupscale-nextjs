import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import { BiEditAlt } from "react-icons/bi";
import { BsClock, BsEye, BsTrash } from "react-icons/bs";
import DataTable from "../../dataTable/viewDataTable";
import CustomerApi from "../../../pages/api/customer";
import DeleteButton from "../../forms/base-delete";
import CompanyRoutes from "@/routes/company.route";
import { PermissionType } from "@/types/permissions.type";
import { useAuth } from "@/hooks/use-auth";
import CompanyPermissions from "@/permissions/company.permission";
import { CustomerEntity } from "@/models/admin/customer/customer.entity";


export interface CustomerTableProps {
	customers?: CustomerEntity[];
	isLoading?: boolean;
}

export function CustomerTable(props: CustomerTableProps) {
	const [customers, setCustomers] = useState<CustomerEntity[]>(props.customers);

	const router = useRouter()

	const { user, hasPermission } = useAuth()
	const [can, setCan] = useState<PermissionType>(null)
	useEffect(() => {
		setCan({
			view: hasPermission(CompanyPermissions.customer.view),
			edit: hasPermission(CompanyPermissions.customer.edit),
			delete: hasPermission(CompanyPermissions.customer.delete),
		})
	}, [user])

	const onViewClick = (id: number) => router.push(CompanyRoutes.customer.view.replace("[customerId]", `${id}`));
	const onEditClick = (id: number) => router.push(CompanyRoutes.customer.edit.replace("[customerId]", `${id}`));
	const onHistoryClick = (id: number) => router.push(CompanyRoutes.customer.history.replace("[customerId]", `${id}`));

	const onDeleteClick = async (id: number) => {
		const customerApi = new CustomerApi();
		try {
			await customerApi.remove(id);
			setCustomers(customers.filter(v => v.id != id))
			toast.success("Customer Removed Successfully")
		} catch (error) {
			toast.error("Customer couldn't removed")
		}
	};

	useEffect(() => {
		setCustomers(props.customers);

	}, [props]);
	return (
		<div className="mx-5">
			<DataTable
				data={customers}
				isLoading={props.isLoading}
				columns={[
					{
						name: 'Id',
						selector: (customer: CustomerEntity) => customer.id
					},

					{
						name: 'Name',
						selector: (customer: CustomerEntity) => (

							<div className="flex gap-3 px-6 py-4 font-normal text-gray-900">
								<div
									className="relative h-10 w-10"
								>
									<img
										className="h-full w-full rounded-full object-cover object-center"
										src={Boolean(customer.file_name) ? customer.file_name : "https://www.w3schools.com/howto/img_avatar.png"}
										alt=""
									/>
								</div>
								<div className="text-sm cursor-pointer " onClick={() => onViewClick(customer?.id)}>
									<div className="text-sm  h-full flex items-center hover:text-blue-500 hover:underline transition-all duration-300"><>{`${customer.first_name ?? ''} ${customer.last_name ?? ''}`}</></div>

								</div>
							</div>
						)
					},
					{
						name: 'Email Address',
						selector: (customer: CustomerEntity) => (

							<div className="vehicle-wrap">
								{customer?.email ? customer.email : 'N/A'}
							</div>

						)
					},
					{
						name: 'Phone',
						selector: (customer: CustomerEntity) => (
							<div className="vehicle-wrap">
								{customer?.phone ? customer?.phone : "N/A"}
							</div>

						)
					},
					// Licence Number
					{
						name: 'Licence Number',
						selector: (customer: CustomerEntity) => (
							<div className="vehicle-wrap">
								{customer?.license?.licence_no ? customer?.license?.licence_no : "N/A"}
							</div>

						)
					},
					{
						name: 'Actions',
						cell: (customer: CustomerEntity) => (
							<div className="flex text-purple-600 px-4 py-2 text-[20px]">
								{can.edit && <BiEditAlt onClick={() => onEditClick(customer?.id)} className="cursor-pointer text-base ml-1 " color="#5236ff" />}
								{can.view && <BsEye onClick={() => onViewClick(customer?.id)} className="mx-1 cursor-pointer text-base ml-1 font-bold " color="#5236ff " />}
								<BsClock className=" cursor-pointer text-base ml-1 " color="#5236ff" onClick={() => onHistoryClick(customer?.id)} />
								{can.delete && <DeleteButton onDelete={() => onDeleteClick(customer?.id)} className="cursor-pointer text-base ml-1 " color="#5236ff" />}
							</div>

						)
					},
				]}

			/>
		</div>
	);
}
