import React, { ReactElement } from "react";
import FullLayout from "../../../components/layouts/company/full-layout";
import { FormSection } from "../../../components/customer";
import CompanyPermissions from "@/permissions/company.permission";

export default function Create() {
	return (
		<>
			<FormSection showCopytoClip />
		</>
	);
}
Create.getLayout = function getLayout(page: ReactElement) {
	return <FullLayout permission={CompanyPermissions.customer.create}>{page}</FullLayout>;
};
