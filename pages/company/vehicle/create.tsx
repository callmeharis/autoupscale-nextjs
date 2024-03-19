import { useFormik } from "formik";
import { Button, Form, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import React, { ReactElement, useEffect, useState } from "react";
import FullLayout from "../../../components/layouts/company/full-layout";
import BaseSelect from "../../../components/forms/base-select";
import { useEffectAsync } from "../../../utils/react";
import VehichleApi from "../../api/vehicle";
import BaseInput from "../../../components/forms/base-input";
import BaseCheckList from "../../../components/forms/base-check-list";
import { VehicleModelEntity } from "../../../models/admin/vehicle/vehicle-model.entity";
import { globalAjaxExceptionHandler } from "../../../utils/ajax";
import { GetVehiclesDropdownOptions } from "../../../types/vehicle/get-vehicles-dropdown-options.type";
import { GetVehiclesOptions } from "@/types/vehicle/get-vehicles-options.type";
import { VehicleEntity } from "../../../models/admin/vehicle/vehicle.entity";
import ViewModal from "../../../components/view-modal";
import ImageUploader from "../../../components/media/image-uploader";
import { FormSection } from "../../../components/investor";
import { ModelFormSection } from "@/components/model/form";
import { UserEntity } from "../../../models/user/user.entity";
import { BaseCreateProps } from "../../../types/base-prop-types/base-create-prop.type";
import { VehicleDamage } from "@/components/vehicle/vehicle-damages";
import CompanyRoutes from "@/routes/company.route";
import { useRouter } from "next/router";
import SettingApi from "@/pages/api/setting";
import { log } from "console";
import { VehicleBrandEntity } from "@/models/admin/vehicle/vehicle-brand.entity";
import { BrandFormSection } from "@/components/brand/form";
import CompanyPermissions from "@/permissions/company.permission";
import VehiclePricingInputGroup from "@/components/vehicle/vehicle-pricing-inputs";
import { CustomerEntity } from "@/models/admin/customer/customer.entity";
import { DocumentTypeEnum } from "@/enums/document/document-type.enum";
import DocumentEdit from "@/components/document/update";
export interface CreateVehicleProps {
  onSave: (e: any) => void;
  setVehicleModal?: (e: any) => void;
  vehicleModal?: boolean;
}
export default function CreateVehicle(props: CreateVehicleProps) {
  const [specificationsData, setSpecificationsData] = useState(false);
  const [stepShow, setStepShow] = useState<boolean>(false);
  const [vehicleId, setVehicleId] = useState<number>(null);
  const [addInvestor, setAddInvestor] = useState<boolean>(false);
  const [addModel, setAddModel] = useState<boolean>(false);
  const [brandId, setBrandId] = useState<string>(null);
  const [vehicleTypeId, setVehicleTypeId] = useState<string>(null);
  const [dropDownData, setDropDownData] =
    useState<GetVehiclesDropdownOptions>();
  const [vehicleModels, setVehicleModels] = useState<VehicleModelEntity[]>();
  const [systemSettings, setSystemSettings] = useState([]);

  const [addBrand, setAddBrand] = useState<boolean>(false);

  const [stepOneActive, setStepOneActive] = useState<boolean>(true);
  const [stepTwoActive, setStepTwoActive] = useState<boolean>(false);
  const [stepThreeActive, setStepThreeActive] = useState<boolean>(false);
  const [vehicleTypeSelected, setVehicleTypeSelected] = useState(true);
  const [vehicleBrandSelected, setVehicleBrandSelected] = useState(false);

  const router = useRouter();

  const [images, setImages] = useState<any>();

  const vehichleApi = new VehichleApi();
  const settingApi = new SettingApi();

  const handleImageSelection = (files) => {
    setImages(files);
  };

  const onDamageNextClick = () => {
    setStepShow(true);
    setStepTwoActive(false);
    setStepThreeActive(true);
  };

  // const getInitialDropdownData = async vehicle_id => {
  //   try {
  //     const data = await vehichleApi.getVehichleDropDownData({
  //       // vehicle type id = 1 is
  //       vehicle_type_id: 1,
  //     } as GetVehiclesOptions);
  //     setDropDownData(data);
  //     //setVehicleModels(data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffectAsync(async () => {
    try {
      const data = await vehichleApi.getVehichleDropDownData({
        // vehicle type id = 1 is
        vehicle_type_id: 1,
      } as GetVehiclesOptions);

      setDropDownData(data);
    } catch (error) {
      console.log("useEffectAsync error:", error);
    }

    const data = await settingApi.system.list();
    const tariffData = data.tariffs;
    setSystemSettings(tariffData);
  }, []);

  const handleBrandChange = async ({
    target: { value },
  }: any): Promise<void> => {
    form.setFieldValue("brand_id", value);
    setBrandId(value);

    value ? setVehicleBrandSelected(true) : setVehicleBrandSelected(false);

    try {
      const data = await vehichleApi.getVehichleModels(parseInt(value));
      setVehicleModels(data);
    } catch (error) {}
  };

  // const handleVehicleTypeChange = async ({
  //   target: { value },
  // }: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
  //   form.setFieldValue('vehicle_type_id', value);
  //   setVehicleTypeId(value);

  //   value ? setVehicleTypeSelected(true) : setVehicleTypeSelected(false);

  //   try {
  //     const data = await vehichleApi.getVehichleDropDownData({
  //       vehicle_type_id: parseInt(value),
  //     } as GetVehiclesOptions);
  //     setDropDownData(data);
  //     //setVehicleModels(data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  function onFinish() {
    if (props?.vehicleModal) {
      props?.setVehicleModal(false);
    } else {
      router.push(CompanyRoutes.vehicle.index);
    }
  }

  const form = useFormik({
    initialValues: new VehicleEntity(),
    validationSchema: VehicleEntity.yupSchema(),
    onSubmit: async (values: VehicleEntity) => {
      const formData = new FormData();
      if (values?.feature_ids) {
        values.feature_ids?.forEach((featureId, i) => {
          formData.append(`feature_ids[${i}]`, `${featureId}`);
        });
      }
      Object?.entries(values)?.forEach(([key, val]) => {
        formData.append(key, val);
        formData?.delete("feature_ids");
      });
      images?.map((img, i) => {
        formData.append(`images[${i}]`, img);
      });
      try {
        const data = await vehichleApi.create(formData as VehicleEntity);
        toast.success("vehicle created successfully!");

        setStepTwoActive(!stepTwoActive);
        setStepShow(true);

        setStepOneActive(false);
        setSpecificationsData(true);
        const {
          brand,
          model,
          color,
          body_type,
          fuel_type,
          group,
          transmission,
          engine_type,
          rental,
          features,
          investor,
          ...updatedData
        } = data;
        form.setValues({
          ...form.values,
          ...updatedData,
          user_id: investor?.id || null,
          group_id: group?.id || null,
          brand_id: brand?.id || null,
          model_id: model?.id || null,
          transmission_id: transmission?.id || null,
          type_of_engine_id: engine_type?.id || null,
          type_of_fuel_id: fuel_type?.id || null,
          body_type_id: body_type?.id || null,
          color: color,
          feature_ids: features.map((f) => f?.id) || [],
        });
        const vehicleData = data?.id;
        setVehicleId(vehicleData);
        if (!!props?.onSave) {
          props?.onSave(data);
        }
      } catch (error) {
        globalAjaxExceptionHandler(error, {
          formik: form,
          defaultMessage: "Vehicle Creation Failed",
          toast,
        });
      }
    },
  });

  const onSaveComplete = (data: CustomerEntity) => {
    if (data?.id) setAddInvestor(false);
    setDropDownData({
      ...dropDownData,
      investors: [...dropDownData.investors, { ...data }],
    });
    form.setFieldValue("user_id", data?.id);
  };

  const onModelSaveComplete = (data: VehicleModelEntity) => {
    if (data?.id) setAddModel(false);

    setVehicleModels([...vehicleModels, data]);
    form.setFieldValue("model_id", data.id);
  };

  const onBrandSaveComplete = (data: VehicleBrandEntity) => {
    if (data?.id) setAddBrand(false);

    setDropDownData({
      ...dropDownData,
      brands: [...dropDownData.brands, { ...data }],
    });
    handleBrandChange({ target: { value: data.id.toString() } });
  };
  const stepOne = () => {
    setStepOneActive(!stepOneActive);
    setStepTwoActive(false);
    setStepThreeActive(false);
  };

  const handleAddBrandClick = () => {
    vehicleTypeSelected;
    setAddBrand(true);
  };

  const handleAddModelClick = () => {
    vehicleTypeSelected;
    setAddModel(true);
  };

  const stepTwo = () => {
    setStepTwoActive(!stepTwoActive);
    setStepOneActive(false);
    setStepThreeActive(false);
    setSpecificationsData(true);
  };

  const stepThree = () => {
    setStepThreeActive(!stepThreeActive);
    setStepTwoActive(false);
    setStepOneActive(false);
  };

  return (
    <>
      {
        <div className="m-auto vehicle bg-white">
          <div className="m-auto stepper max-w-7xl  px-5 py-6">
            <h1 className="font-bold text-2xl mb-4 text-gray-600">
              Add Vehicle
            </h1>
            <div
              className="border-b border-gray-300 flex justify-between  w-full  bg-slate-100  items-center py-4 px-4 no-underline text-base  font-medium"
              onClick={stepOne}
            >
              <span className="text-gray-700">Specifications</span>
              {specificationsData && (
                <span className="flex items-center">
                  <span className="grid">
                    <span className="text-sm text-gray-600">
                      <>
                        <span className="flex items-center">
                          <span className="text-sm text-gray-600">
                            <>
                              <div>Name</div>
                              <div>{form?.values.name}</div>
                            </>
                          </span>
                          <span className="text-sm text-gray-600 mx-5">
                            <>
                              <div>Car Rego</div>
                              <div>{form?.values.rego}</div>
                            </>
                          </span>
                          <span className="text-sm text-gray-600 ">
                            <>
                              <div>Year</div>
                              <div>{form?.values.year}</div>
                            </>
                          </span>
                        </span>
                      </>
                    </span>
                  </span>
                </span>
              )}
            </div>
            {stepOneActive && (
              <>
                <Form onSubmit={form.handleSubmit}>
                  <div className="border-b border-gray-300   w-full  bg-slate-100  items-center shadow-sm no-underline text-base  font-medium">
                    <div className="tab">
                      <div className="bg-gray-200 ">
                        <div className="px-10 py-5 shahdow-xl bg-white w-100">
                          <ImageUploader
                            multiple
                            handleImageChange={handleImageSelection}
                          />
                          <div className="secondrow lg:flex">
                            <div className="flex">
                              <div className="inline-block relative w-52 mb-8">
                                <BaseSelect
                                  placeholder="Choose One"
                                  name="user_id"
                                  label="Owner"
                                  options={dropDownData?.investors?.map(
                                    (type) => ({
                                      value: type?.id,
                                      label: `${type?.first_name}  ${type?.last_name}`,
                                    })
                                  )}
                                  required
                                  formik={form}
                                />
                              </div>
                              <div className="mt-[25px] pt-1">
                                {Boolean(dropDownData?.investors) && (
                                  <Button
                                    onClick={() => setAddInvestor(true)}
                                    className="mx-3 bg-btn-100"
                                  >
                                    Add Owner
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-12 mb-5">
                            {/* <div className='secondrow lg:flex'>
                              <div className='inline-block relative w-52'>
                                <BaseSelect
                                  placeholder='Choose One'
                                  name='vehicle_type_id'
                                  label='Vehicle Type'
                                  options={dropDownData?.vehicle_types?.map(
                                    type => ({
                                      value: type?.id,
                                      label: type?.name,
                                    })
                                  )}
                                  onChange={handleVehicleTypeChange}
                                  required
                                  formik={form}
                                />
                              </div>
                            </div> */}
                            <div className="secondrow lg:flex">
                              <div className="inline-block relative w-52 ">
                                <BaseSelect
                                  placeholder="Choose One"
                                  name="brand_id"
                                  label="Brand"
                                  options={dropDownData?.brands?.map(
                                    (type) => ({
                                      value: type?.id,
                                      label: type?.name,
                                    })
                                  )}
                                  onChange={handleBrandChange}
                                  formik={form}
                                  required
                                />
                              </div>
                              {Boolean(dropDownData) && (
                                <Button
                                  className="bg-btn-100 h-[40px] mt-[29px] mx-3"
                                  onClick={() => handleAddBrandClick()}
                                >
                                  Add Brand
                                </Button>
                              )}
                            </div>

                            <div className="secondrow lg:flex">
                              <div className="inline-block relative w-52">
                                <BaseSelect
                                  placeholder="Choose One"
                                  name="model_id"
                                  label="Model"
                                  options={vehicleModels?.map((type) => ({
                                    value: type?.id,
                                    label: type?.name,
                                  }))}
                                  formik={form}
                                  required
                                />
                              </div>
                              {Boolean(dropDownData) && (
                                <Button
                                  className="bg-btn-100 h-[40px] mt-[29px] mx-3"
                                  onClick={() => handleAddModelClick()}
                                >
                                  Add Model
                                </Button>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-12 ">
                            <div className="secondrow lg:flex">
                              <div className="groups">
                                <div className="groups input-style w-52">
                                  <BaseInput
                                    name="rego"
                                    label="Registration No."
                                    placeholder="RV102"
                                    formik={form}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            {/* <div className='secondrow lg:flex'>
                              <div className='inline-block relative w-52'>
                                <BaseSelect
                                  placeholder='Choose One'
                                  name='group_id'
                                  label='Group'
                                  options={dropDownData?.groups?.map(type => ({
                                    value: type?.id,
                                    label: type?.name,
                                  }))}
                                  formik={form}
                                />
                              </div>
                            </div> */}
                            <div className="secondrow lg:flex">
                              <div className="groups input-style w-52">
                                <BaseInput
                                  name="year"
                                  label="Year"
                                  type="number"
                                  placeholder="2023"
                                  formik={form}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <h1 className="tracking-wide text-sm mt-9  capitalize flex items-center font-semibold text-gray-400">
                              More Information(Optional){" "}
                            </h1>
                          </div>
                          <div className="flex space-x-12 my-9">
                            <div className="secondrow lg:flex">
                              <div className="groups input-style w-48">
                                <BaseInput
                                  name="color"
                                  label="color"
                                  placeholder="white"
                                  formik={form}
                                />
                              </div>
                            </div>

                            <div className="secondrow lg:flex">
                              <div className="inline-block relative w-52">
                                <BaseSelect
                                  placeholder="Choose One"
                                  name="transmission_id"
                                  label="Transmission"
                                  options={dropDownData?.transmission_types?.map(
                                    (type) => ({
                                      value: type?.id,
                                      label: type?.name,
                                    })
                                  )}
                                  formik={form}
                                />
                              </div>
                            </div>

                            <div className="secondrow lg:flex ">
                              <div className="inline-block relative w-52">
                                <BaseSelect
                                  placeholder="Choose One"
                                  name="body_type_id"
                                  label="Body Type"
                                  options={dropDownData?.body_types?.map(
                                    (type) => ({
                                      value: type?.id,
                                      label: type?.name,
                                    })
                                  )}
                                  formik={form}
                                />
                              </div>
                            </div>
                            <div className="groups input-style w-48">
                              <BaseInput
                                name="vin"
                                label="VIN"
                                placeholder="2323-3432-223"
                                formik={form}
                              />
                            </div>
                          </div>

                          <div className="flex space-x-12 my-9">
                            <div className="secondrow lg:flex">
                              <div className="inline-block relative w-52">
                                <BaseSelect
                                  placeholder="Choose One"
                                  name="type_of_fuel_id"
                                  label="Fuel Type"
                                  options={dropDownData?.fuel_types?.map(
                                    (type) => ({
                                      value: type?.id,
                                      label: type?.name,
                                    })
                                  )}
                                  formik={form}
                                />
                              </div>
                            </div>
                            <div className="secondrow flex mr-5 lg:flex">
                              <div className="groups input-style w-52">
                                <BaseInput
                                  name="volume_tank"
                                  label="Tank Volume"
                                  type="number"
                                  placeholder="25 ltr"
                                  append={
                                    <InputGroup.Text>ltr</InputGroup.Text>
                                  }
                                  formik={form}
                                />
                              </div>
                            </div>

                            <div className="secondrow lg:flex">
                              <div className="groups input-style w-52">
                                <BaseInput
                                  name="fuel_level"
                                  label="Fuel Level"
                                  placeholder="20%"
                                  min={1}
                                  max={100}
                                  type="number"
                                  append={<InputGroup.Text>%</InputGroup.Text>}
                                  formik={form}
                                />
                              </div>
                            </div>
                            <div className="secondrow lg:flex">
                              <div className="groups input-style w-48">
                                <BaseInput
                                  name="odometer"
                                  label="Odometer"
                                  type="number"
                                  placeholder="0120201"
                                  formik={form}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-12  my-9">
                            <div className="secondrow lg:flex">
                              <div className="inline-block relative w-52">
                                <BaseSelect
                                  placeholder="Choose One"
                                  name="type_of_engine_id"
                                  label="Engine Type"
                                  options={dropDownData?.engine_types?.map(
                                    (type) => ({
                                      value: type?.id,
                                      label: type?.name,
                                    })
                                  )}
                                  formik={form}
                                />
                              </div>
                            </div>
                            <div className="secondrow lg:flex">
                              <div className="groups input-style w-52">
                                <BaseInput
                                  name="number_of_seat"
                                  label="Number of seats"
                                  type="number"
                                  placeholder="5"
                                  formik={form}
                                  min={1}
                                  max={10}
                                />
                              </div>
                            </div>
                            <div className="secondrow lg:flex">
                              <div className="groups input-style w-52">
                                <BaseInput
                                  name="number_of_door"
                                  label="Number of doors"
                                  type="number"
                                  placeholder="4"
                                  min={1}
                                  max={10}
                                  formik={form}
                                />
                              </div>
                            </div>
                            <div className="secondrow lg:flex">
                              <div className="groups input-style w-48">
                                <BaseInput
                                  name="air_bags"
                                  label="Number of air bags"
                                  type="number"
                                  placeholder="2"
                                  min={1}
                                  max={10}
                                  formik={form}
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className="groups input-style w-52">
                                                            <BaseInput
                                                                name="default_price"
                                                                label="Per Day"
                                                                placeholder="23$"
                                                                type="number"
                                                                append={(<InputGroup.Text>$</InputGroup.Text>)}
                                                                formik={form}
                                                            />
                                                        </div> */}

                          <div className="check_boxes lg:w-100 ">
                            <h6 className="tracking-wide text-sm mb-2 block text-gray-400">
                              Features:
                            </h6>
                            <div className="flex items-center mb-4 space-x-10">
                              <BaseCheckList
                                name="feature_ids"
                                className="col-12 font-normal"
                                options={dropDownData?.features}
                                valueKey="id"
                                labelKey="name"
                                cols={2}
                                formik={form}
                                showSelectAll
                              />
                            </div>
                          </div>

                          <h6 className="tracking-wide text-sm mb-2 block text-gray-400">
                            Pricing:
                          </h6>

                          <VehiclePricingInputGroup
                            formik={form}
                            systemSettings={systemSettings}
                          />

                          <div className="flex justify-end items-center ">
                            <div className="text-end my-3">
                              {stepShow == false && (
                                <Button
                                  variant="primary"
                                  className="bg-btn-100"
                                  disabled={
                                    !!form?.isSubmitting ||
                                    !form.values.brand_id ||
                                    !form.values.model_id ||
                                    !form.values.rego ||
                                    !form.values.year
                                  }
                                  type="submit"
                                >
                                  Next Step
                                </Button>
                              )}
                              {stepShow && (
                                <Button
                                  className="bg-btn-100"
                                  onClick={stepTwo}
                                >
                                  Next Step
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
                <ViewModal
                  size="xl"
                  show={addInvestor}
                  onCloseClick={() => setAddInvestor(false)}
                >
                  <FormSection onSave={onSaveComplete} />
                </ViewModal>

                <ViewModal
                  size="xl"
                  show={addModel}
                  onCloseClick={() => setAddModel(false)}
                >
                  <ModelFormSection
                    onSave={onModelSaveComplete}
                    brandId={brandId}
                  />
                </ViewModal>

                <ViewModal
                  size="xl"
                  show={addBrand}
                  onCloseClick={() => setAddBrand(false)}
                >
                  <BrandFormSection
                    onSave={onBrandSaveComplete}
                    brandId={brandId}
                    // vehicleTypeId={vehicleTypeId}
                  />
                </ViewModal>
              </>
            )}

            <button
              type="reset"
              className=" border-b border-gray-300 flex w-full  bg-slate-100  items-center py-6 px-4 no-underline text-base text-gray-700 font-medium"
              onClick={stepTwo}
              disabled={
                !!form?.isSubmitting ||
                !form.values.brand_id ||
                !form.values.model_id ||
                !form.values.rego ||
                !form.values.year
              }
            >
              Damages
            </button>

            {stepTwoActive && (
              <>
                <VehicleDamage vehicleId={vehicleId} />
              </>
            )}

            {stepTwoActive && (
              <div className="my-3 text-end">
                <Button className="bg-btn-100 mx-3" onClick={stepOne}>
                  Previous Step
                </Button>
                <Button className="bg-btn-100 mx-3" onClick={stepThree}>
                  Next Step
                </Button>
              </div>
            )}

            <button
              type="reset"
              className=" border-b border-gray-300 flex w-full  bg-slate-100  items-center py-6 px-4 no-underline text-base text-gray-700 font-medium"
              onClick={stepThree}
              disabled={
                !!form?.isSubmitting ||
                !form.values.brand_id ||
                !form.values.model_id ||
                !form.values.rego ||
                !form.values.year
              }
            >
              Documents
            </button>

            {stepThreeActive && (
              <>
              <div className="my-14 mx-4 ">
                <div className="px-0 mb-4 w-full text-left text-[17px]  font-semi-bold">
                  Create Documents
                </div>
                <DocumentEdit
                  documentId={vehicleId}
                  documentType={DocumentTypeEnum.VEHICLE_DOCUMENT}
                />
                </div>
                <div className="my-3 text-end">
                  <Button className="bg-btn-100 mx-3" onClick={stepTwo}>
                    Previous Step
                  </Button>
                  <Button className="bg-btn-100" onClick={onFinish}>
                    Finish
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      }
    </>
  );
}

CreateVehicle.getLayout = function getLayout(page: ReactElement) {
  return (
    <FullLayout permission={CompanyPermissions.vehicle.create}>
      {page}
    </FullLayout>
  );
};
