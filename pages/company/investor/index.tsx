import router from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import FullLayout from "../../../components/layouts/company/full-layout";

import { useEffectAsync } from "../../../utils/react";
import InvestorApi from "../../api/investor";
import { UserEntity } from "../../../models/user/user.entity";
import { InvestorTable } from "../../../components/investor/table";
import CompanyRoutes from "@/routes/company.route";
import { EmptyData } from "@/components/empty-data";
import CompanyPermissions from "@/permissions/company.permission";
import { PermissionType } from "@/types/permissions.type";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { InvestorEntity } from "@/models/admin/investor/investor.entity";


export default function Investors() {
    const [investors, setInvestors] = useState<InvestorEntity[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
	const [can, setCan] = useState<PermissionType>(null)
    const { user, hasPermission } = useAuth()
    useEffectAsync(async () => {
        try {
            const investorApi = new InvestorApi();
            const data = await investorApi.list({ with: "documents" });
            setInvestors(data);
            if (data) setIsLoading(false)
            console.log("investor ", data)
        } catch (error) {
        }
    }, []);
	
	useEffect(() => {
		setCan({
			create: hasPermission(CompanyPermissions.investor.create),
			
		})
	}, [user])

    return (
        <div className="max-w-7xl m-auto ">
            <Row className='my-4 mx-5'>
                <Col lg={4} className="text-start p-0">
                    <h1 className=" mb-6 font-bold text-3xl">Owners</h1>
                </Col>
                <Col lg={8} className="text-end p-0">
                    { Boolean(can?.create) && <Button onClick={() => router.push(CompanyRoutes.investor.create)} className="bg-btn-100">Create Owner</Button>}
                </Col>
            </Row>
            <InvestorTable investors={investors} isLoading={isLoading} />
        </div>
    );
}
Investors.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout permission={CompanyPermissions.investor.index}>{page}</FullLayout>;
};
