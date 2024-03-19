import React from 'react'
import { BiEditAlt } from 'react-icons/bi';
import DataTable from '../../../components/dataTable/viewDataTable';
import { MaintenanceEntity } from '../../../models/admin/company/maintenance/maintenance.entity';
import { PermissionType } from '@/types/permissions.type';

export interface maintenanceProps {
    maintenance?: MaintenanceEntity[];
    isLoading?: boolean;
    setEditMaintenance?: (e: any) => void
    can?:PermissionType
}
export default function MaintenanceTable(props: maintenanceProps) {

    return (
        <div className="">
            <div className=" my-3">
                <DataTable
                    data={props?.maintenance}
                    isLoading={props?.isLoading}
                    columns={[
                        {
                            name: ' Name',
                            selector: (maintenance: MaintenanceEntity) => <>{maintenance?.name ? maintenance?.name : 'N/A'}</>
                        },

                        {
                            name: 'Period',
                            selector: (maintenance: MaintenanceEntity) => <>
                                {maintenance?.days ? maintenance?.days : 'N/A'}
                            </>
                        }, {
                            name: 'Millage',
                            selector: (maintenance: MaintenanceEntity) => <span><>{maintenance?.kms ? maintenance?.kms : 'N/A'}</></span>
                        },
                        {
                            name: 'Actions',
                            cell: (maintenance: MaintenanceEntity) => (
                                <div className="flex text-[24px] text-slate-600">
                                   {!!props?.can?.edit && <BiEditAlt className="mx-1 cursor-pointer text-base ml-1  " onClick={() => props?.setEditMaintenance(maintenance?.id)} color="#5236ff " />}
                                </div>
                            )
                        },


                    ]} />

            </div>
        </div>
    )

}
