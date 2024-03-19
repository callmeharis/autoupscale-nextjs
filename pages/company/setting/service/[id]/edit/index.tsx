import BaseCheck from "@/components/forms/base-check";
import BaseInput from "@/components/forms/base-input";
import BaseSelect from "@/components/forms/base-select";
import { BaseLoaderIcon } from "@/components/forms/controls/base-loader-icon";
import FullLayout from "@/components/layouts/company/full-layout";
import { HeadingSec } from "@/components/reuse-component";
import { GarageEntity } from "@/models/admin/garage/garage.entity";
import { MaintenanceEntity } from "@/models/admin/maintenance/maintenance.entity";
import { ServiceEntity } from "@/models/admin/service/service.entity";
import { VehicleEntity } from "@/models/admin/vehicle/vehicle.entity";
import GarageApi from "@/pages/api/garage";
import MaintenanceApi from "@/pages/api/maintenance";
import ServiceApi from "@/pages/api/service";
import VehichleApi from "@/pages/api/vehicle";
import CompanyPermissions from "@/permissions/company.permission";
import { globalAjaxExceptionHandler } from "@/utils/ajax";
import { useEffectAsync } from "@/utils/react";
import { useFormik } from "formik";
import Multiselect from "multiselect-react-dropdown";
import { ReactElement, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import CompanyRoutes from "@/routes/company.route";
import { useRouter } from "next/router";
import PageLayout from "@/components/layouts/company/page-layout";
import ViewModal from "@/components/view-modal";
import { Create } from "@/components/garage/create";
import { CreateMaintenance } from "@/components/maintenance/create";


const serviceApi = new ServiceApi();
const vehichleApi = new VehichleApi();
const garageApi = new GarageApi();
const maintenanceApi = new MaintenanceApi();

export default function EditServiceFormSection({ id }) {

    const [vehicles, setVehicles] = useState<VehicleEntity[]>([])
    const [addMaintenance, setAddMaintenance] = useState<boolean>(false)
    const [addGarage, setAddGarage] = useState<boolean>(false)
    const [garage, setGarage] = useState<GarageEntity[]>([])
    const [companyMaintenance, setCompanyMaintenance] = useState<MaintenanceEntity[]>([])
    const [maintenance, setMaintenance] = useState<MaintenanceEntity[]>([])
    const router = useRouter();
    useEffectAsync(async () => {
        const companyGarages = await garageApi.list()
        setGarage(companyGarages)
        const maintenanceData = await maintenanceApi.list()
        setCompanyMaintenance(maintenanceData)
        const data = await serviceApi.getById(id)
        console.log(data, 'data===');

        console.log("get service", data);
        form.setValues({
            ...form.values,
            ...data,
            vehicle_id: data?.vehicle?.id,
            garage_id: data?.garage?.id,
            odometer: data?.odometer,
            start_date: data?.start_date,
            end_date: data?.end_date,
        })
    }, [id])

    const form = useFormik({

        initialValues: new ServiceEntity(),
        validationSchema: ServiceEntity.updateServiceYupSchema(),

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
                await serviceApi.update(id, values as ServiceEntity)
                toast.success("Service updated successfully!")
                router.push(CompanyRoutes.setting.service.index)

            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Service updation Failed",
                    toast,
                });
            }
        },


    })
    const handleSave = (data: ServiceEntity) => {
        setGarage([...garage, data]);
        setAddGarage(false);
        form.setFieldValue('garage_id', data?.id);
    };
    const handleMaintenanceSave = (data: MaintenanceEntity) => {
        setMaintenance([...maintenance, data]);
        setAddMaintenance(false);
        form.setFieldValue('maintenance_id', data?.id);
    }
    useEffectAsync(async () => {
        const vehiclesData = await vehichleApi.list()
        setVehicles(vehiclesData)
        const garageData = await garageApi.list()

    }, [])
    useEffect(() => {
        console.log("err-------", form.errors);
        console.log("value-------", form.values);
    }, [form.errors, form.values]);
    return (
        <PageLayout>

            {
                <div className="m-auto tab max-w-7xl">
                    <div className="">
                        <div className="heading-sec py-3 px-3">
                            <HeadingSec title="Update Services" />
                        </div>
                        <Form onSubmit={form.handleSubmit} className="p-10 shahdow-xl bg-white space-y-5">
                            <div className="w-96">
                                <BaseSelect
                                    placeholder="Choose One"
                                    name="vehicle_id"
                                    label="Vehicle Name"
                                    options={vehicles?.map((v) => ({
                                        value: v?.id,
                                        label: v?.name,
                                    }))}
                                    className='w-96'
                                    required
                                    formik={form}
                                />
                            </div>
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
                                    required
                                    formik={form}
                                />
                            </div>
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
                                                const maintenances = companyMaintenance.find(
                                                    (type) => type?.name === name
                                                );
                                                return maintenances?.id;
                                            });
                                            form.setFieldValue(
                                                "maintenance_ids", selectedIds
                                            )
                                        }

                                    }
                                    selectedValues={companyMaintenance?.map(
                                        type => type?.name
                                    )}
                                    options={companyMaintenance.map((type) => (
                                        type?.name
                                    ))}

                                />
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
                                <Button className="bg-btn-100" type='submit' disabled={!!form?.isSubmitting} > {!!form.isSubmitting ? <BaseLoaderIcon /> : "Update Service"}</Button>

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
        </PageLayout>
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

EditServiceFormSection.getLayout = function getLayout(page: ReactElement) {
    return (<FullLayout permission={CompanyPermissions.settings.service.edit}>{page}</FullLayout>)
}