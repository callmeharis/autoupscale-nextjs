import React, { ReactElement } from "react";
import { FormSection } from "../../../components/investor";
import FullLayout from "../../../components/layouts/company/full-layout";
import CompanyPermissions from "@/permissions/company.permission";

export default function Create() {
    return <FormSection />;
}
Create.getLayout = function getLayout(page: ReactElement) {
	return (<FullLayout permission={CompanyPermissions.investor.create}>{page}</FullLayout>)
}