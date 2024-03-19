import React, { ReactElement } from "react";
import FullLayout from "@/components/layouts/customer/full-layout";

export default function Payments() {

    return (
        <div className="max-w-7xl mx-auto bg-white h-screen " id="rental-wrapper ">
            <h1 className="pt-4 px-10 mb-6 font-bold text-3xl text-center">COMING SOON!</h1>
        </div>
    );
}
Payments.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout>{page}</FullLayout>;
};