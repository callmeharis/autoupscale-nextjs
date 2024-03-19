import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";
import BaseInput from "../../forms/base-input";
import { useEffectAsync } from "@/utils/react";
import React, { useState } from "react";
import { globalAjaxExceptionHandler } from "../../../utils/ajax";
import CompanyRoutes from "../../../routes/company.route";
import { BaseLoaderIcon } from "../../../components/forms/controls/base-loader-icon";
import { TariffEntity } from "@/models/admin/tariff.entity";
import VehichleApi from "@/pages/api/vehicle";
import { VehicleEntity } from "@/models/admin/vehicle/vehicle.entity";
import { EmptyData } from "@/components/empty-data";

export interface VehiclePriceProps {
    vehicleId: number;
    systemSettings: any;
}

export function TariffFormSection(props: VehiclePriceProps) {

    const [vehicle, setVehicle] = useState<VehicleEntity>()
    const router = useRouter()

    const tariffNames = props.systemSettings.map((obj) => obj.name);

    const vehicleApi = new VehichleApi();

    useEffectAsync(async () => {
            const data = await vehicleApi.getById(props.vehicleId)
            setVehicle(data);

            form.setValues({
                per_hour : data?.price?.per_hour,
                per_day : data?.price?.per_day,
                per_week : data?.price?.per_week,
                per_month : data?.price?.per_month,
            });
    }, [])

    const form = useFormik({
        initialValues: new TariffEntity(),
        validationSchema: TariffEntity.createInvestorYupSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values: any) => {
            try {
                const data = await vehicleApi.update(props.vehicleId, values);

                router.push(CompanyRoutes.vehicle.index)
                toast.success("Prices added successfully")
            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Something went wrong.",
                    toast,
                });
            }
        },

    });

    return (
        <>
        {!!Boolean(tariffNames.length == 0) ? (<EmptyData title="Please enable tariffs in system setting"/>) :
        <div>
        <div className="flex space-x-5 items-center">
                <div className='h-9 w-9 bg-blue-800 mt-3 rounded-full flex justify-center items-center text-lg text-white'>
                    3
                </div>
                <div className='px-0 py-26 w-full mt-3 text-left text-[22.9px]  font-semi-bold'>
                    Vehicle Pricing
                </div>
            </div>
            <Form onSubmit={form.handleSubmit} className="p-10 shahdow-xl bg-white">
                <div className="First_row">
                    <div className="   lg:flex justify-start md:flex">
                        {
                            tariffNames.includes("hourly") && <div className=" w-60 input-style">
                                <BaseInput
                                    required
                                    type="number"
                                    className=""
                                    name="per_hour"
                                    formik={form}
                                    label="Per Hour"
                                />
                            </div>}

                        {
                            tariffNames.includes("daily") &&
                            <div className="lg:mx-3 w-60 input-style">
                                <BaseInput
                                    required
                                    className=""
                                    type="number"
                                    name="per_day"
                                    formik={form}
                                    label="Per Day"
                                />

                            </div>
                        }

                        {
                            tariffNames.includes("weekly") &&
                            <div className="lg:mx-3 w-60 input-style">
                                <BaseInput
                                    required
                                    className=""
                                    type="number"
                                    name="per_week"
                                    formik={form}
                                    label="Per Week"
                                />

                            </div>
                        }
                        {
                            tariffNames.includes("monthly") &&
                            <div className="lg:mx-3 w-60 input-style">
                                <BaseInput
                                    required
                                    className=""
                                    type="number"
                                    name="per_month"
                                    formik={form}
                                    label="Per Month"
                                />

                            </div>
                        }
                    </div>
                </div>
                <div className="text-end">
                    <Button className="bg-btn-100" type='submit' disabled={form?.isSubmitting || !form?.isValid || form?.isValidating} > {!!form.isSubmitting ? <BaseLoaderIcon /> : "Finish"}</Button>

                </div>
            </Form>
        </div>
    }
            
        </>
    );
}
