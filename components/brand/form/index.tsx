import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";
import { HeadingSec } from "../../reuse-component";
import BaseInput from "../../forms/base-input";
import VehichleApi from "@/pages/api/vehicle";
import { globalAjaxExceptionHandler } from "../../../utils/ajax";
import BaseLoader from "../../../components/forms/base-loader";
import CompanyRoutes from "../../../routes/company.route";
import { BaseLoaderIcon } from "../../../components/forms/controls/base-loader-icon";
import { VehicleBrandEntity } from "@/models/admin/vehicle/vehicle-brand.entity";

export function BrandFormSection( {onSave  , brandId} )  {

    const router = useRouter()

    const vehichleApi = new VehichleApi;

    const form = useFormik({
        initialValues: new VehicleBrandEntity(),
        validationSchema: VehicleBrandEntity.yupSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values: any) => {
            const formData = new FormData();
            try {
                Object.entries(values).forEach(([key, val]: any) => {
                    formData.append(key, val);
                });
                //formData.append('vehicle_type_id', vehicleTypeId)
                const data = await vehichleApi.createVehicleBrand(formData as VehicleBrandEntity);
                if (!!onSave) {
                    onSave(data)
                } else router.push(CompanyRoutes.vehicle.create)
                toast.success("Brand created successfully")
            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Brand Created Failed",
                    toast,
                });
            }
        },
    });

    return (
        <>
            {
                form?.isSubmitting ? <BaseLoader /> : <div className="m-auto tab max-w-7xl">
                    <div className="">
                        <div className="heading-sec py-3 px-3">
                            <HeadingSec title="Add Brand" />
                        </div>
                        <form onSubmit={form.handleSubmit} className="p-10 shahdow-xl bg-white">
                            <div className="First_row">
                                <div className="   lg:flex justify-start md:flex">
                                    <div className=" w-60 input-style">
                                        <BaseInput
                                            required
                                            className=""
                                            name="name"
                                            formik={form}
                                            label="Name"
                                        />
                                    </div>
                                </div>
                            </div>



                            <div className="text-end">
                                <Button className="bg-btn-100" type='submit' > {!!form.isSubmitting ? <BaseLoaderIcon /> : "Create Brand"}</Button>

                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}