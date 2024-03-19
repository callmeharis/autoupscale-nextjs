import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import BaseInput from "../../forms/base-input";
import { globalAjaxExceptionHandler } from "../../../utils/ajax";
import ImageUploader from "../../../components/media/image-uploader";
import BaseTextArea from "@/components/forms/base-text-area";
import BaseSelect from "@/components/forms/base-select";
import { VehicleDamageEntity } from "@/models/admin/vehicle/vehicle-damage.entity";
import VehichleApi from "@/pages/api/vehicle";
import { useEffectAsync } from "@/utils/react";
import { GetVehiclesDropdownOptions } from "@/types/vehicle/get-vehicles-dropdown-options.type";
import { toast } from "react-toastify";
import { DamagaeTypeEnum } from "@/enums/damage/damage-type.enum";
import BaseLoader from "@/components/forms/base-loader";
import { BaseLoaderIcon } from "@/components/forms/controls/base-loader-icon";
import { GetVehiclesOptions } from "@/types/vehicle/get-vehicles-options.type";

export interface VehicleIdprop {
    vehicleId?: number;
    showModal?: any;
    setShowModal?: any;
    handleSaveDamageImage?: () => Promise<any>,
    onSave?: (e: VehicleDamageEntity[]) => void,
    type?: DamagaeTypeEnum;
}
export function FormSection(props: VehicleIdprop) {
    const vehicleApi = new VehichleApi()

    const [images, setImages] = useState<any>(null)
    const [dropDownData, setDropDownData] = useState<GetVehiclesDropdownOptions>()

    const handleImageSelection = (files) => {
        setImages(files)
    }

    const form = useFormik({
        initialValues: new VehicleDamageEntity(),
        validationSchema: VehicleDamageEntity.yupSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values: any) => {
            const formData = new FormData();
            try {
                Object.entries(values).forEach(([key, val]: any) => {
                    formData.append(key, val);
                });
                images?.map((img, i) => {
                    formData.append(`images[${i}]`, img);
                })
                formData.append("vehicle_id", `${props.vehicleId}`);
                formData.append("damage_id", `${props.showModal}`);
                const data = await vehicleApi.createVehicleDamage(formData as VehicleDamageEntity);
                if (props.type == DamagaeTypeEnum?.EXTERIOR) { 
                    const res = await props.handleSaveDamageImage()
                    console.log(res)
                }
                props.setShowModal(false)
                props?.onSave(data.damages)
                toast.success("Damage Created")
            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Unable to add Damage",

                });
                toast.error("Unable to add Damage")
            }
        },
    });
    useEffectAsync(async () => {
        form.setFieldValue("type", props?.type)
        try {
            const dropDownData = await vehicleApi.getVehichleDropDownData({
                vehicle_type_id: 1,
              } as GetVehiclesOptions)
            setDropDownData(dropDownData)
        } catch (error) {
            console.log("error vehicle", error)
        }
    }, [])

    return (
        <>

            <Form onSubmit={form.handleSubmit} className={` ${form?.isSubmitting && 'opacity-50'} space-y-4 p-4`} >
                <BaseInput label='Title:' placeholder="Damage Title" formik={form} name='title' required />
                <BaseTextArea label='Description:' rows={2} formik={form} name='description' required />
                <BaseSelect
                    options={["Low", "Medium ", "High", "Very High"]}
                    label='Choose damage level'
                    placeholder="Chose One"
                    required
                    formik={form}
                    name='issue_level'
                />
                <ImageUploader multiple handleImageChange={handleImageSelection} />
                {
                    !!!Boolean(images) && <p className="text-red-500 italic -mt-2 pt-0 mr-0 w-full mb-2 text-left">
                        images are required
                    </p>
                }
                <div className="text-center">
                    <Button className="bg-btn-100" type='submit' disabled={form?.isSubmitting} > {!!form.isSubmitting ? <BaseLoaderIcon /> : "Add Damage"}</Button>
                </div>
            </Form>


        </>
    );
}
