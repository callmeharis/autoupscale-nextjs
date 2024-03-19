import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import { BsEye } from "react-icons/bs";
import VehichleApi from "../../../pages/api/vehicle";
import { FilterSearchBar } from "../../../components/vehicle/filter-searchbar";
import { useEffectAsync } from "../../../utils/react";
import { VehicleEntity } from "../../../models/admin/vehicle/vehicle.entity";
import DataTable from "../../dataTable/viewDataTable";
import { GetVehiclesOptions } from "../../../types/vehicle/get-vehicles-options.type";
import { UserEntity } from "../../../models/user/user.entity";
import ViewModal from "../../../components/view-modal";
import ViewVehicleDetail from "../../../pages/company/vehicle/[id]";
import CreateVehicle from "../../../pages/company/vehicle/create";

export interface ReservationVehicleTableProps {
    handleSelection?: (e: any) => void,
}
export function ReservationVehicleTable({ handleSelection }: ReservationVehicleTableProps) {
    const [vehicleModal, setVehicleModal] = useState<boolean>(false)
    const [vehicleId, setVehicleId] = useState<number>(null)
    const [vehicles, setVehicles] = useState<VehicleEntity[]>([])
    const [isLoading, setLoading] = useState<boolean>(true);
    const vehicleApi = new VehichleApi()

    useEffectAsync(async () => {
        try {
            const v_data = await vehicleApi.list({ status: 1 } as GetVehiclesOptions)
            setVehicles(v_data)
            if (v_data) setLoading(false)
        } catch (error) {
        }
    }, [])

    const form = useFormik({
        initialValues: new VehicleEntity(),
        validationSchema: VehicleEntity.vehicleFiltersYupSchema(),
        onSubmit: async (val) => {
            form?.setFieldValue('status', 1)
            try {
                const data = await vehicleApi.list(val as GetVehiclesOptions)
                setVehicles(data)
            } catch (error) {
            }
        },
        onReset: async (values) => {
            try {
                const data = await vehicleApi.list(values as GetVehiclesOptions)
                setVehicles(data)
            } catch (error) {
            }
        }
    })

    const onSaveComplete = (data: VehicleEntity) => {
        if (data?.id) setVehicleModal(false)
    }
    return (
        <div className="">
            <div className='mb-10'>
                <div className='text-end'>
                    {Boolean(!vehicles?.length) && (
                        <div className="mb-3">
                            <Button onClick={() => setVehicleModal(true)} className="bg-btn-100">
                                Add Vehicles
                            </Button>
                        </div>
                    )}
                    <div className="flex justify-between ">
                        <p className='text-gray-700  pt-4 font-bold mr-5'>Vehicles</p>

                        <FilterSearchBar form={form} /> 
                    </div>
                </div>
            </div>

            <div className="text-xs">
                <DataTable
                    selectable="single"
                    onSelectionChange={handleSelection}
                    data={vehicles}
                    itemsPerPage={10}
                    isLoading={isLoading}
                    columns={[
                        {
                            name: 'Car Rego',
                            selector: (v: VehicleEntity) => v?.rego
                        },
                        {
                            name: 'Name',
                            selector: (v: VehicleEntity) => v?.name
                        },
                        {
                            name: 'color',
                            selector: (v: VehicleEntity) => v?.color
                        },
                        {
                            name: 'year',
                            selector: (v: VehicleEntity) => v?.year

                        },
                        {
                            name: `rent`,
                            selector: (v: VehicleEntity) => v?.rental
                        },
                        {
                            name: 'model',
                            selector: (v: VehicleEntity) => v?.model
                        },
                        {
                            name: 'group',
                            selector: (v: VehicleEntity) => v?.group
                        },
                        {
                            name: 'View',
                            selector: (v: UserEntity) => (
                                <div className="flex text-purple-600 text-[24px]" onClick={() => setVehicleId(v?.id)}>
                                    <BsEye className="mx-1 text-green-500 " />
                                </div>
                            )
                        }
                    ]}

                />
            </div>
            <ViewModal
                size="xl"
                show={Boolean(vehicleId)}
                onCloseClick={() => setVehicleId(null)}
            >
                <ViewVehicleDetail id={vehicleId} hideActions={true} />
            </ViewModal>
            <ViewModal
                size="xl"
                show={vehicleModal}
                onCloseClick={() => setVehicleModal(false)}
            >
                <CreateVehicle onSave={onSaveComplete} />
            </ViewModal>
        </div>
    );
}
