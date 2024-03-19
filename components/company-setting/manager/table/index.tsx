import React, { useState } from "react";
import { BiEditAlt } from 'react-icons/bi'
import { Permission } from "../permission";
import { FaUserCheck } from "react-icons/fa";
import DataTable from "../../../dataTable/viewDataTable";
import DeleteButton from "../../../forms/base-delete";
import { UserEntity } from "../../../../models/user/user.entity";
import ViewModal from "../../../../components/view-modal";
import { Edit } from "../edit";
import { PermissionType } from "@/types/permissions.type";


export interface ManagerTableProps {
    manager?: UserEntity[];
    onDelete?: (id: number) => void
    setEditManager?:(e:any) => void
    isLoading?: boolean;
    can?:PermissionType
}

export function ManagerTable(props: ManagerTableProps) {
    const [permission, setPermission] = useState<number>(null)

    return (
        <div >
            <DataTable
                data={props?.manager}
                isLoading={props?.isLoading}
                columns={[
                    {
                        name: 'Id',
                        selector: (v: UserEntity) => v.id
                    },
                    {
                        name: 'First Name',
                        cell: (v: UserEntity) => (
                            <div className="">
                                {v?.first_name ? v?.first_name : "N/A"}
                            </div>
                        )
                    },
                    {
                        name: 'Last Name',
                        cell: (v: UserEntity) => (
                            <div className="">
                                {v?.last_name ? v?.last_name : "N/A"}
                            </div>
                        )
                    },
                    {
                        name: 'Image',
                        cell: (v: UserEntity) => (
                            <div className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                <div
                                    className="relative h-10 w-10"
                                >
                                    <img
                                        className="h-full w-full rounded-full object-cover object-center"
                                        src={Boolean(v?.file_name) ? v?.file_name : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7EkV3CX7fEqiL-PnjPzqstMql_Uu1V2vj0g&usqp=CAU"}
                                        alt=""
                                    />
                                </div>

                            </div>
                        )
                    },
                    {
                        name: 'Email',
                        cell: (v: UserEntity) => (
                            <div className="flex gap-2">
                                <span
                                    className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1 text-md font-semibold text-slate-600"
                                >
                                    {v?.email ? v?.email : "0"}
                                </span>
                            </div>
                        )
                    },


                    {
                        name: 'Actions',
                        cell: (v: UserEntity) => (
                            <div className="flex text-[24px] text-slate-600">
                                {props?.can?.edit && <FaUserCheck onClick={() => setPermission(v?.id)}className="mx-1 cursor-pointer text-base ml-1  " color="#5236ff "  />}
                              {props?.can?.edit &&  <BiEditAlt onClick={() => props?.setEditManager(v?.id)} className="mx-1 cursor-pointer text-base ml-1  " color="#5236ff " />}
                              {props?.can?.delete &&  <DeleteButton onDelete={() => props?.onDelete(v?.id)} className="mx-1 cursor-pointer text-base ml-1  " color="#5236ff " />}
                            </div>
                        )
                    },

                ]}

            />
            <ViewModal
                show={Boolean(permission)}
                onCloseClick={() => setPermission(null)}
                header='Permissions'
                size="xl"
            >
                <Permission id={permission} setPermission={setPermission} />
            </ViewModal>
          
        </div>

    );
}

export async function getServerSideProps(context) {
    try {
        const id = context.params?.id;
        if (!!!id)
            return { notFound: true }

        return {
            props: { id }
        }
    } catch (error) {
        console.error("Exception is here:", error);
        return { props: { id: 0 } }
    }
}