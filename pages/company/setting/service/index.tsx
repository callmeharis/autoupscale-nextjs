import React, { ReactElement, useEffect, useState } from 'react'
import FullLayout from "../../../../components/layouts/company/full-layout";
import CompanyPermissions from '@/permissions/company.permission';
import PageLayout from '@/components/layouts/company/page-layout';
import { Button, Col, Row } from 'react-bootstrap';
import ServiceApi from '@/pages/api/service';
import { useEffectAsync } from '@/utils/react';
import { globalAjaxExceptionHandler } from '@/utils/ajax';
import { ServiceEntity } from '@/models/admin/service/service.entity';
import { useRouter } from 'next/router';
import CompanyRoutes from '@/routes/company.route';
import ServiceTable from '@/components/service/table';
import { PermissionType } from '@/types/permissions.type';
import { useAuth } from '@/hooks/use-auth';

export default function Service() {
    const serviceApi = new ServiceApi();
    const [service, setService] = useState<ServiceEntity[]>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { user, hasPermission } = useAuth()
	const [can, setCan] = useState<PermissionType>(null)
	useEffect(() => {
		setCan({
			view: hasPermission(CompanyPermissions.settings.service.view),
			edit: hasPermission(CompanyPermissions.settings.service.edit),
            create : hasPermission(CompanyPermissions.settings.service.create)
		    
		})
	}, [user])
    const router = useRouter()
    useEffectAsync(async () => {
        try {
            const data = await serviceApi.list();
            setService(data);
            console.log("service data", data);

            if (data) setIsLoading(false)
        } catch (error) {
            globalAjaxExceptionHandler(error, {
                defaultMessage: "",
            });
        }



    }, [])

    return (
        <PageLayout title='Service' actions={
             can?.create &&
            <Button className="bg-btn-100 mb-3 " onClick={() => router.push(CompanyRoutes.setting.service.create)}>Add Service</Button>
        }>

            {<ServiceTable service={service} isLoading={isLoading} can={can}/> }

        </PageLayout>
    )
}
Service.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout permission={CompanyPermissions.settings.service.index}>{page}</FullLayout>;
};
