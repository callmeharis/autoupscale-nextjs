import DataTable from '@/components/dataTable/viewDataTable';
import React, { useState } from 'react'
import { BiEditAlt } from 'react-icons/bi';
import { PermissionType } from '@/types/permissions.type';
import { ViolationEntity } from '@/models/admin/violation/violation.entity';
import DeleteButton from '@/components/forms/base-delete';
import ViolationApi from '@/pages/api/violation';
import { toast } from 'react-toastify';
export interface violationProps {
    violation?: ViolationEntity[];
    isLoading?: boolean;
    setEditViolation?: (e: any) => void;
    can?: PermissionType ;
    onDeleteClick?:  (id: number) => void;
}
export function ViolationTable(props: violationProps) {
 
    return (
        <>

            <div>
                <div className=" my-3">
                    <DataTable
                        data={props?.violation}
                        isLoading={props?.isLoading}
                        columns={[
                            {
                                name: 'ID',
                                selector: (violation: ViolationEntity) => <>{violation?.id ?? 'N/A'}</>
                            },
                            {
                                name: 'Name',
                                selector: (violation: ViolationEntity) => <>{violation?.name ?? 'N/A'}</>
                            },

                            {
                                name: 'Default Fine',
                                selector: (v: ViolationEntity) => <>
                                    {v?.default_fine ?? 'N/A'}
                                </>
                            }, {
                                name: 'Status',
                                selector: (v: ViolationEntity) => <span><>{v?.is_enabled == 0 ? 'In-Active' : 'Active'}</></span>
                            },
                            {
                                name: 'Actions',
                                cell: (v: ViolationEntity) => (
                                    <div className="flex text-[24px] text-slate-600">
                                        {
                                            !!props?.can?.edit &&
                                            < BiEditAlt className="mx-1 cursor-pointer text-base ml-1  " onClick={() => props?.setEditViolation(v?.id)} color="#13B8A6 " />
                                        }
                                        {!!props?.can?.delete && <DeleteButton onDelete={() => props?.onDeleteClick(v?.id)} className="cursor-pointer text-base ml-1 " color="#13B8A6" />}
                                    </div>
                                )
                            },


                        ]} />
                </div>
            </div>
        </>
    )
}
