import FullLayout from "@/components/layouts/company/full-layout";
import { ReactElement } from "react";
export default function Company() {
    return (
        <div className="py-5">
        </div>
    );
}
Company.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout>{page}</FullLayout>;
};