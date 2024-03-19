import React, { ReactElement } from "react";
import { ServiceFormSection } from "@/components/service/form";
import FullLayout from "@/components/layouts/company/full-layout";
import CompanyPermissions from "@/permissions/company.permission";
import PageLayout from "@/components/layouts/company/page-layout";

export default function Create() {
    return <PageLayout>
        <ServiceFormSection />
    </PageLayout>
}
Create.getLayout = function getLayout(page: ReactElement) {
    return (<FullLayout permission={CompanyPermissions.settings.service.index}>{page}</FullLayout>)
}