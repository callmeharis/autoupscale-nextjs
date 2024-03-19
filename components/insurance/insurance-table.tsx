import { InsuranceEntity } from "@/models/admin/insurance/insurance.entity";
import DataTable from "../dataTable/viewDataTable";
import { BiEditAlt } from "react-icons/bi";
import { useState } from "react";
import ViewModal from '@/components/view-modal';
import EditInsurance from "./edit";
import { PermissionType } from "@/types/permissions.type";

export interface insuranceProps {
    isLoading?: boolean;
    insurance?: InsuranceEntity[];
    setEditInsurance?:any, 
    can?:PermissionType
}
export default function Insurance(props: insuranceProps) {



    return (
        <>
            <DataTable
                data={props?.insurance}
                isLoading={props?.isLoading}
                className="p-0"
                columns={[
                    {
                        name: ' Name',
                        selector: (insurance: InsuranceEntity) => <>

                            <div className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                <div
                                    className="relative h-10 w-10"
                                >
                                    <img
                                        className="h-full w-full rounded-full object-cover object-center"
                                        src={Boolean(insurance.file_name) ? insurance.file_name : "https://www.w3schools.com/howto/img_avatar.png"}
                                        alt=""
                                    />
                                </div>
                                <div className="">
                                {insurance?.name ? insurance?.name : 'N/A'}
                                </div>
                            </div>
                        </>
                    },

                    {
                        name: 'Phone',
                        selector: (insurance: InsuranceEntity) => <>
                            {insurance?.phone ? insurance?.phone : 'N/A'}
                        </>
                    }, {
                        name: 'Email',
                        selector: (insurance: InsuranceEntity) => <span><>{insurance?.email ? insurance?.email : 'N/A'}</></span>
                    },
                    {
                        name: 'Mailing Email',
                        selector: (insurance: InsuranceEntity) => <span><>{insurance?.mailing_email ? insurance?.mailing_email : 'N/A'}</></span>
                    },
                    {
                        name: 'Actions',
                        cell: (insurance: InsuranceEntity) => (
                            <div className="flex text-[24px] text-slate-600">
                               {props?.can && <BiEditAlt className="mx-1 cursor-pointer text-base ml-1 " onClick={() => props?.setEditInsurance(insurance?.id)} color="#5236ff " />}
                            </div>
                        )
                    },


                ]}
            />

       





        </>
    )
}

