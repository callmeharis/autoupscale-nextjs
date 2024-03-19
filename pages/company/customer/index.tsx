import { Button, Col, Row } from "react-bootstrap";
import router from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { CustomerTable } from "../../../components/customer/table";
import FullLayout from "../../../components/layouts/company/full-layout";
import { useEffectAsync } from "../../../utils/react";
import CustomerApi from "../../api/customer";
import { UserEntity } from "../../../models/user/user.entity";
import CompanyRoutes from "../../../routes/company.route";
import CompanyPermissions from "../../../permissions/company.permission";
import { EmptyData } from "../../../components/empty-data";
import { useAuth } from "@/hooks/use-auth";
import { PermissionType } from "@/types/permissions.type";
import { CustomerEntity } from "@/models/admin/customer/customer.entity";

export default function Customers() {
	
	const [customers, setCustomers] = useState<CustomerEntity[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { user, hasPermission } = useAuth()
	const [can, setCan] = useState<PermissionType>(null)
	useEffect(() => {
		setCan({
			create: hasPermission(CompanyPermissions.customer.create),
			
		})
	}, [user])

	useEffectAsync(async () => {
		try {
			const customerApi = new CustomerApi();
			const data = await customerApi.list({ with: "documents" });
			setCustomers(data);
            if(data) setIsLoading(false)

		} catch (error) {
		}
	}, [])
	
	
	 

	return (
		<div className="max-w-7xl m-auto ">
			<Row className="my-4 mx-5">
				<Col lg={10}  className="p-0">
					<h1 className=" mb-6 font-bold text-3xl">Customers</h1>
				</Col>
				<Col lg={2} className="p-0 text-end">
					{can?.create && <Button
						className="bg-btn-100"
						onClick={() => router.push(CompanyRoutes.customer.create)}
					>
						Create Customer
					</Button>}
					
				</Col>
			</Row>
		
			<CustomerTable customers={customers} isLoading={isLoading}/>
         
		</div>
	);
}

Customers.getLayout = function getLayout(page: ReactElement) {
	return <FullLayout permission={CompanyPermissions.customer.index}>{page}</FullLayout>;
};
