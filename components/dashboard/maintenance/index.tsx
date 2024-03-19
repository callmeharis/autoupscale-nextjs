import DataTable from '@/components/dataTable/viewDataTable'
import DeleteButton from '@/components/forms/base-delete'
import { MaintenanceEntity } from '@/models/admin/maintenance/maintenance.entity'
import MaintenanceApi from '@/pages/api/maintenance'
import { globalAjaxExceptionHandler } from '@/utils/ajax'
import { useEffectAsync } from '@/utils/react'
import React, { useState } from 'react'
import { toast } from "react-toastify";
import { BiEditAlt } from 'react-icons/bi'

export function Maintenance() {
    const maintenanceApi = new MaintenanceApi();
    const [maintenance, setMaintenance] = useState<MaintenanceEntity[]>(null);
    useEffectAsync(async () => {
        try {
            const data = await maintenanceApi.list();
            setMaintenance(data);
            console.log(data);

        } catch (error) {
            globalAjaxExceptionHandler(error, {
                defaultMessage: "",
                toast,
            });
        }



    }, [])
    return (
        <div className="mx-3">
            <h2 className="text-2xl font-semibold text-gray-800 my-3"> Maintenance</h2>
            <div className=" my-3">
                <DataTable
                    data={maintenance}
                    className='h-72 overflow-y-auto'
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


                    ]} />
            </div>
        </div>
    )
}
