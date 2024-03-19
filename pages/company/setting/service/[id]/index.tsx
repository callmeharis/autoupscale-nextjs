import React, { ReactElement, useState } from 'react'
import router from 'next/router';
import CompanyRoutes from '@/routes/company.route';
import CompanyPermissions from '@/permissions/company.permission';
import ServiceApi from '@/pages/api/service';
import { ServiceEntity } from '@/models/admin/service/service.entity';
import { useEffectAsync } from '@/utils/react';
import {  Row } from 'react-bootstrap';
import FullLayout from '@/components/layouts/company/full-layout';
import ViewDetails from '@/components/view-details';
import ViewCard from '@/components/view-card';
import { VehicleEntity } from '@/models/admin/vehicle/vehicle.entity';
import { GarageEntity } from '@/models/admin/garage/garage.entity';
import DataTable from '@/components/dataTable/viewDataTable';
import { MaintenanceEntity } from '@/models/admin/maintenance/maintenance.entity';

export default function ViewServiceDetail({ id }) {
    const [service, setService] = useState<ServiceEntity>();
    const [vehicle, setVehicle] = useState<VehicleEntity>();
    const [maintenance, setMaintenance] = useState<MaintenanceEntity[]>([]);
    const [garage, setGarage] = useState<GarageEntity>();
    const serviceApi = new ServiceApi();

    useEffectAsync(async () => {
        if (id) {
            try {
                const data = await serviceApi.getById(id)
                setService(data)
                setVehicle(data?.vehicle)
                setGarage(data?.garage)
                setMaintenance(data?.maintenances)
                console.log("single service data", data);
            } catch (error) {
            }
        }
    }, [id]);

    return (
        <>

            <ViewCard>
                <Row>
                    <ViewDetails
                        title="Vehicle Information"
                        default={"N/A"}
                        obj={{
                            "ID": vehicle?.id,
                            "Vehicle": `${vehicle?.brand?.name} ${vehicle?.model?.name}`,
                            "Car Rego": vehicle?.rego,
                            'Year': vehicle?.year,
                            "Odometer": vehicle?.odometer,

                        }}
                    />
                </Row>
            </ViewCard>

            <ViewCard>
                <Row>
                    <ViewDetails
                        title="Service Information"
                        default={"N/A"}
                        obj={{
                            "ID": service?.id,
                            "Vehicle": service?.vehicle?.name,
                            "Start Date": service?.start_date,
                            "End Date": service?.end_date,
                            "Garage": service?.garage?.name,
                            "Odometer": service?.odometer,
                        }}
                    />
                </Row>
            </ViewCard>



            <ViewCard>
                <Row>
                    <ViewDetails
                        title="Garage Information"
                        default={"N/A"}
                        obj={{
                            "ID": garage?.id,
                            "Name": garage?.name,
                            "Email": garage?.email,
                            "Location": garage?.location,

                        }}
                    />
                </Row>
            </ViewCard>

            <div className='flex justify-between  items-center py-3  mx-[40px] '>
					<p className=' font-medium text-gray-800 text-lg'>Maintenance</p>
				</div>
              <DataTable
              className='mx-[38px]'
					data={maintenance}
					columns={[
						{
							name: 'Id',
							selector: (v: MaintenanceEntity) => v?.id
						},
                        {
							name: 'Name',
							selector: (v: MaintenanceEntity) => v?.name
						},
                        {
							name: 'Milage',
							selector: (v: MaintenanceEntity) => v?.kms
						},
                        {
							name: 'Period',
							selector: (v: MaintenanceEntity) => v.days
						},
					]}

				/>

        </>

    )
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

ViewServiceDetail.getLayout = function getLayout(page: ReactElement) {
    return (<FullLayout permission={CompanyPermissions.settings.service.view}>{page}</FullLayout>)
}