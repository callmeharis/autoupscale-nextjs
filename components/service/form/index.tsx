import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";
import { HeadingSec } from "../../reuse-component";
import BaseInput from "../../forms/base-input";
import { globalAjaxExceptionHandler } from "../../../utils/ajax";
import { BaseLoaderIcon } from "../../../components/forms/controls/base-loader-icon";
import ServiceApi from "@/pages/api/service";
import { ServiceEntity } from "@/models/admin/service/service.entity";
import BaseSelect from "@/components/forms/base-select";
import { useEffectAsync } from "@/utils/react";
import VehichleApi from "@/pages/api/vehicle";
import { VehicleEntity } from "@/models/admin/vehicle/vehicle.entity";
import Multiselect from "multiselect-react-dropdown";
import { MaintenanceEntity } from "@/models/admin/maintenance/maintenance.entity";
import MaintenanceApi from "@/pages/api/maintenance";
import { GarageEntity } from "@/models/admin/garage/garage.entity";
import GarageApi from "@/pages/api/garage";
import BaseCheck from "@/components/forms/base-check";
import CompanyRoutes from "@/routes/company.route";
import { useRouter } from "next/router";
import ViewModal from "@/components/view-modal";
import { Create } from "@/components/garage/create";
import { CreateMaintenance } from "@/components/maintenance/create";

export function ServiceFormSection() {
    const [vehicles, setVehicles] = useState<VehicleEntity[]>([])
    const [maintenance, setMaintenance] = useState<MaintenanceEntity[]>([])
    const [addMaintenance, setAddMaintenance] = useState<boolean>(false)
    const [addGarage, setAddGarage] = useState<boolean>(false)
    const [garage, setGarage] = useState<GarageEntity[]>([])
    const serviceApi = new ServiceApi();
    const vehichleApi = new VehichleApi();
    const garageApi = new GarageApi();
    const maintenanceApi = new MaintenanceApi();
    const router = useRouter();

    const form = useFormik({

        initialValues: new ServiceEntity(),
        validationSchema: ServiceEntity.createServiceYupSchema(),

        onSubmit: async (values: ServiceEntity) => {
            const form_data = new FormData();
            const { maintenance_ids, ...restValues } = values

            if (maintenance_ids) {

                maintenance_ids.forEach((maintenance_ids, i) => {
                    form_data?.append(`maintenance_ids[${i}]`, maintenance_ids)
                })
            }

            Object.entries(restValues).map(([key, value]) => {
                form_data.append(key, String(value))
            })
            try {
                await serviceApi.create(form_data as ServiceEntity)
                router.push(CompanyRoutes.setting.service.index)

                toast.success("Service added successfully!")

            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Service Creation Failed",
                    toast,
                });
            }
        },


    })
    useEffectAsync(async () => {
        const vehiclesData = await vehichleApi.list()
        setVehicles(vehiclesData)
        const maintenanceData = await maintenanceApi.list()
        setMaintenance(maintenanceData);
        const garageData = await garageApi.list()
        setGarage(garageData)

    }, [])
    // const handleSave = ()=>{

    //     setAddGarage(false)
    // }
    const handleSave = (data: ServiceEntity) => {
        setGarage([...garage, data]);
        setAddGarage(false);
        form.setFieldValue('garage_id', data?.id);
    };
    const handleMaintenanceSave =(data : MaintenanceEntity)=>{
        setMaintenance([...maintenance, data]);
        setAddMaintenance(false);
        form.setFieldValue('maintenance_id', data?.id);
    }
    useEffect(() => {
        console.log("err-------", form.errors);
        console.log("value-------", form.values);
    }, [form.errors, form.values]);
    return (
        <>

            {
                <div className="m-auto tab max-w-7xl">
                    <div className="">
                        <div className="heading-sec py-3 px-3">
                            <HeadingSec title="Add Services" />
                        </div>
                        <Form onSubmit={form.handleSubmit} className="p-10 shahdow-xl bg-white space-y-5">
                            <div className="w-96">
                                <BaseSelect
                                    placeholder="Choose One"
                                    name="vehicle_id"
                                    label="Vehicle Name"
                                    options={vehicles?.map((v) => ({
                                        value: v?.id,
                                        label: v?.name_and_rego,
                                    }))}
                                    className='w-96'
                                    required
                                    formik={form}
                                />
                            </div>
                            <div className="flex">

                                <div className="w-96">
                                    <BaseSelect
                                        placeholder="Choose One"
                                        name="garage_id"
                                        label="Garage Name"
                                        options={garage?.map((v) => ({
                                            value: v?.id,
                                            label: v?.name,
                                        }))}
                                        className='w-96'
                                        formik={form}
                                    />
                                </div>
                                <div className="mx-3 my-auto mb-0">

                                    <Button className="bg-btn-100  " onClick={() => setAddGarage(true)}>Add Garage</Button>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="w-96">
                                    <p className="tracking-wide text-sm mb-2 block text-gray-400"> Maintenance</p>
                                    <Multiselect
                                        className="w-96"
                                        isObject={false}
                                        onKeyPressFn={function noRefCheck() { }
                                        }
                                        onRemove={(event) => { console.log(event) }}
                                        onSearch={function noRefCheck() { }}

                                        onSelect={
                                            (event) => {
                                                const selectedIds = event.map((name) => {
                                                    const maintenances = maintenance.find(
                                                        (type) => type?.name === name
                                                    );
                                                    return maintenances?.id;
                                                });
                                                form.setFieldValue(
                                                    "maintenance_ids", selectedIds
                                                )
                                            }

                                        }
                                        options={maintenance.map((type) => (
                                            type?.name
                                        ))}

                                    />
                                </div>
                                <div className="mx-3 my-auto mb-0">

                                    <Button className="bg-btn-100  " onClick={() => setAddMaintenance(true)}>Add Maintenance</Button>
                                </div>
                            </div>
                            <div className="w-96">

                                <BaseInput
                                    required
                                    className=""
                                    name="odometer"
                                    type="number"
                                    formik={form}
                                    label="Odometer"
                                />
                            </div>
                            <div className="w-96">
                                <BaseInput
                                    required
                                    className=""
                                    name="start_date"
                                    formik={form}
                                    label="Start Date"
                                    type="date"
                                />
                            </div>
                            {!Boolean(form.values.one_day_maintenance) && (<div className="w-96">
                                <BaseInput
                                    required
                                    className=""
                                    name="end_date"
                                    formik={form}
                                    label="End Date"
                                    type="date"
                                />
                            </div>)}


                            <div className="mb-4 text-left">
                                <BaseCheck
                                    className='ml-2 my-4'
                                    name='one_day_maintenance'
                                    label='One day maintenance'
                                    formik={form}
                                // onChange={() => handleOnChange()}
                                />
                            </div>

                            <div className="text-end">
                                <Button className="bg-btn-100" type='submit' disabled={!!form?.isSubmitting} > {!!form.isSubmitting ? <BaseLoaderIcon /> : "Add Service"}</Button>

                            </div>
                        </Form>
                        <ViewModal
                            show={addGarage}
                            onCloseClick={() => setAddGarage(false)}
                            header='Garage'
                        >
                            <Create onSave={handleSave} />
                        </ViewModal>

                        <ViewModal
                            show={addMaintenance}
                            onCloseClick={() => setAddMaintenance(false)}
                            header='Maintenance'
                        >
                            <CreateMaintenance onSave={handleMaintenanceSave} />
                        </ViewModal>
                    </div >
                </div >
            }
        </>
    );
}
