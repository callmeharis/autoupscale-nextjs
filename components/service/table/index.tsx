import DataTable from '@/components/dataTable/viewDataTable';
import ViewModal from '@/components/view-modal';
import serviceApi from '@/pages/api/service';
import { globalAjaxExceptionHandler } from '@/utils/ajax';
import React, { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi';
import { BaseCreateProps } from '@/types/base-prop-types/base-create-prop.type';
import { ServiceEntity } from '@/models/admin/service/service.entity';
import { BsEye } from 'react-icons/bs';
import DeleteButton from '@/components/forms/base-delete';
import { useRouter } from 'next/router';
import CompanyRoutes from '@/routes/company.route';
import { PermissionType } from '@/types/permissions.type';
import { useAuth } from '@/hooks/use-auth';
import CompanyPermissions from '@/permissions/company.permission';

export interface serviceProps {
    service?: ServiceEntity[];
    isLoading?: boolean;
    onSave?: (e: any) => void
    can?: PermissionType
}

export default function ServiceTable(props: serviceProps) {

	const router = useRouter()

	const onViewClick = (id: number) => router.push(CompanyRoutes.setting.service.view.replace('[serviceId]', `${id}`))


	const onEditClick = (id: number) => router.push(CompanyRoutes.setting.service.edit.replace('[serviceId]', `${id}`))

    return (
        <div className="">
            <div className=" my-3">
                <DataTable
                    data={props?.service}
                    isLoading={props?.isLoading}
                    columns={[
						{
                            name: ' ID',
                            selector: (service: ServiceEntity) => <>{service?.id ?? 'N/A'}</>
                        },
                        {
                            name: ' Vehicle',
                            selector: (service: ServiceEntity) => <>{`${service?.vehicle?.brand?.name} ${service.vehicle?.model?.name}` ?? 'N/A'}</>
                        },

                        {
                            name: 'Start Date',
                            selector: (service: ServiceEntity) => <>
                                {service?.start_date ?? 'N/A'}
                            </>
                        },
						{
                            name: 'End Date',
                            selector: (service: ServiceEntity) => <span><>{service?.end_date ?? 'N/A'}</></span>
                        },
						{
                            name: 'Garage',
                            selector: (service: ServiceEntity) => <span><>{service?.garage?.id ?? 'N/A'}</></span>
                        },
						{
                            name: 'Odometer',
                            selector: (service: ServiceEntity) => <span><>{service?.odometer ?? 'N/A'}</></span>
                        },
                        {
							name: 'Actions',
							cell: (service: ServiceEntity) => (
								<div className="flex text-purple-600 px-4 py-2  text-[20px]">
									{props?.can?.edit && <BiEditAlt onClick={() => onEditClick(service?.id)} className="cursor-pointer text-base ml-1 " color="#5236ff" />}
									{props?.can?.view && <BsEye onClick={() => onViewClick(service?.id)} className="mx-1 cursor-pointer text-base ml-1 font-bold " color="#5236ff " />}
								</div>
							)
						},


                    ]} />
            </div>
        </div>
    )

}
