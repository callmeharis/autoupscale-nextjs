import DataTable from '@/components/dataTable/viewDataTable';
import ViewModal from '@/components/view-modal';
import { GarageEntity } from '@/models/admin/garage/garage.entity'
import React, { useState } from 'react'
import { BiEditAlt } from 'react-icons/bi';
import { EditGarage } from '../edit-garage';
import { PermissionType } from '@/types/permissions.type';
export interface garageProps {
    garage?: GarageEntity[];
    isLoading?: boolean;
    setEditGarage?: (e: any) => void;
    can?: PermissionType
}
export function GarageTable(props: garageProps) {

    return (
        <>

            <div>
                <div className=" my-3">
                    <DataTable
                        data={props?.garage}
                        isLoading={props?.isLoading}
                        columns={[
                            {
                                name: ' Name',
                                selector: (garage: GarageEntity) => <>{garage?.name ? garage?.name : 'N/A'}</>
                            },

                            {
                                name: 'Period',
                                selector: (garage: GarageEntity) => <>
                                    {garage?.email ? garage?.email : 'N/A'}
                                </>
                            }, {
                                name: 'Millage',
                                selector: (garage: GarageEntity) => <span><>{garage?.location ? garage?.location : 'N/A'}</></span>
                            },
                            {
                                name: 'Actions',
                                cell: (garage: GarageEntity) => (
                                    <div className="flex text-[24px] text-slate-600">
                                        {
                                            !!props?.can?.edit &&
                                            < BiEditAlt className="mx-1 cursor-pointer text-base ml-1  " onClick={() => props?.setEditGarage(garage?.id)} color="#5236ff " />
                                        }
                                    </div>
                                )
                            },


                        ]} />
                </div>
            </div>
        </>
    )
}
