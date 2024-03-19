import { toast } from "react-toastify";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { BsEye } from "react-icons/bs";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaCalendar } from "react-icons/fa";
import { useFormik } from "formik";
import BaseInput from "../../../components/forms/base-input";
import BaseSelect from "../../../components/forms/base-select";
import FullLayout from "../../../components/layouts/company/full-layout";
import { UserEntity } from "../../../models/user/user.entity";
import BaseTextArea from "../../../components/forms/base-text-area";
import ReservationApi from "../../api/reservation";
import { globalAjaxExceptionHandler } from "../../../utils/ajax";
import { ReservationEntity } from "../../../models/admin/reservation.entity";
import { VehicleEntity } from "../../../models/admin/vehicle/vehicle.entity";
import BaseLoader from "../../../components/forms/base-loader";
import CompanyRoutes from "../../../routes/company.route";
import ShowFormattedDate from "../../../components/date-formatter";
import { BaseLoaderIcon } from "../../../components/forms/controls/base-loader-icon";
import ViewModal from "../../../components/view-modal";
import VehichleApi from "../../../pages/api/vehicle";
import { useEffectAsync } from "../../../utils/react";
import { GetVehiclesOptions } from "../../../types/vehicle/get-vehicles-options.type";
import { FilterSearchBar } from "../../../components/vehicle/filter-searchbar";
import DataTable from "../../../components/dataTable/viewDataTable";
import ViewVehicleDetail from "../vehicle/[id]";
import CreateVehicle from "../vehicle/create";
import ViewCustomerDetail from "../customer/[id]";
import { FormSection } from "../../../components/customer";
import CustomerApi from "../../../pages/api/customer";
import { GetCustomersOptions } from "../../../types/customer/get-customers-options.type";
import { SystemSettingDto } from "@/models/setting/system-setting.dto";
import SettingApi from "@/pages/api/setting";
import { log } from "console";
import CompanyPermissions from "@/permissions/company.permission";
import { InsuranceEntity } from "@/models/admin/insurance/insurance.entity";
import InsuranceApi from "@/pages/api/insurance";
import Create from "@/components/insurance/create";
import { Filter } from "@/components/vehicle/filter";
export default function CreateReservation() {
  const reservationApi = new ReservationApi();
  const vehicleApi = new VehichleApi();
  const customerApi = new CustomerApi();
  const settingApi = new SettingApi();
  const companyInsuranceApi = new InsuranceApi();

  const [selectedVehicle, setSelectedVehicle] = useState<VehicleEntity>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<UserEntity>(null);
  const [vehicleModal, setVehicleModal] = useState<boolean>(false);
  const [vehicleId, setVehicleId] = useState<number>(null);
  const [vehicles, setVehicles] = useState<VehicleEntity[]>([]);
  const [isVehicleDataLoading, setVehicleDataLoading] =
    useState<boolean>(false);
  const [isCustomerDataLoading, setCustomerDataLoading] =
    useState<boolean>(false);
  const [stepOneActive, setStepOneActive] = useState<boolean>(true);
  const [stepTwoActive, setStepTwoActive] = useState<boolean>(false);
  const [customerId, setCustomerId] = useState<number>(null);
  const [showCustomerModal, setShowCustomerModal] = useState<boolean>(false);
  const [addInsurance, setAddInsurance] = useState<boolean>(false);
  const [customers, setCustomers] = useState<UserEntity[]>([]);
  const [dropDownData, setDropDownData] = useState<SystemSettingDto>();
  const [companyInsurance, setCompanyInsurance] = useState<InsuranceEntity[]>(
    []
  );

  const baseTable = useRef();

  const handleOnSaveInsurance = (data: InsuranceEntity) => {
    setCompanyInsurance([...companyInsurance, data]);
    setAddInsurance(false);
    form.setFieldValue("company_insurance_id", data?.id);
  };

  const stepOne = () => {
    setStepOneActive(!stepOneActive);
    setStepTwoActive(false);
  };
  const stepTwo = () => {
    setStepTwoActive(!stepTwoActive);
    setStepOneActive(false);
  };

  const router = useRouter();

  const handleCustomeRowSelection = (rows: UserEntity[]) => {
    form.setFieldValue("customer_id", rows[0]?.id);
    setSelectedCustomer(rows[0]);
  };
  const handleVehicleRowSelection = (rows: VehicleEntity[]) => {
    form.setFieldValue("vehicle_id", rows[0]?.id);
    setSelectedVehicle(rows[0]);
  };

  const form = useFormik({
    initialValues: new ReservationEntity(),
    validationSchema: ReservationEntity.createReservationSchema(),
    onSubmit: async (values: ReservationEntity) => {
      const formatedStartDate = new Date(values.start_date)
        .toISOString()
        .substring(0, 10);
      const formatedStartTime = new Date(values.start_date).toLocaleTimeString(
        "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }
      );
      if (values.end_date) {
        const formatedEndDate = new Date(values?.end_date)
          .toISOString()
          .substring(0, 10);
        const formatedEndTime = new Date(values?.end_date).toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }
        );
        values.end_date = `${formatedEndDate} ${formatedEndTime}`;
      }

      values.start_date = `${formatedStartDate} ${formatedStartTime}`;

      try {
        const res = await reservationApi.create({
          ...values,
          tariff_id: +values.tariff_id,
        });
        toast.success("Reservation created successfully");
        router.push(CompanyRoutes.reservations.index);

        try {
          const data: any = await reservationApi.downloadInvoice(res?.id);
          const url = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Invoice.pdf");
          document.body.appendChild(link);
          link.click();
        } catch (error) {}
        try {
          const data = await reservationApi.downloadContract(res.id);
          const url = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "contract_" + res.id + ".pdf");
          document.body.appendChild(link);
          link.click();
        } catch (error) {}
      } catch (error) {
        globalAjaxExceptionHandler(error, {
          formik: form,
          defaultMessage: "Reservation Creation Failed",
          toast,
        });
      }
    },
  });

  async function getVehicles(tariff_id: number) {
    setVehicleDataLoading(true);
    try {
      const v_data = await vehicleApi.list({
        status: 1,
        tariff_id,
        in_service: "no",
      } as GetVehiclesOptions);
      setVehicles(v_data);
    } catch (error) {
    } finally {
      setVehicleDataLoading(false);
    }
  }

  useEffectAsync(async () => {
    form.setFieldValue("start_date", new Date().toISOString());
    try {
      const [c_data, com_data, sys_data] = await Promise.all([
        customerApi.list(),
        companyInsuranceApi.list(),
        settingApi.system.list(),
      ]);
      setCustomers(c_data);
      setCompanyInsurance(com_data);
      setDropDownData(sys_data);
    } catch (error) {}
  }, []);

  const formVehicle = useFormik({
    initialValues: new VehicleEntity(),
    validationSchema: VehicleEntity.vehicleFiltersYupSchema(),
    onSubmit: async (val) => {
      try {
        const data = await vehicleApi.list(val as GetVehiclesOptions);
        setVehicles(data);
      } catch (error) {}
    },
    onReset: async (values) => {
      try {
        const data = await vehicleApi.list(values as GetVehiclesOptions);
        setVehicles(data);
      } catch (error) {}
    },
  });
  const formCustomer = useFormik({
    initialValues: new VehicleEntity(),
    validationSchema: VehicleEntity.vehicleFiltersYupSchema(),
    onSubmit: async (val) => {
      try {
        const data = await customerApi.list(val as GetCustomersOptions);
        setCustomers(data);
      } catch (error) {}
    },
    onReset: async (value) => {
      try {
        const data = await customerApi.list(value as GetCustomersOptions);
        setCustomers(data);
      } catch (error) {}
    },
  });
  const onSaveCompleteCustomer = (data: UserEntity) => {
    if (data?.id) {
      setCustomers([...customers, data]);
      setShowCustomerModal(false);
    }
  };
  const onSaveCompleteVehicle = (data: VehicleEntity) => {
    if (data?.id) {
      setVehicles([data, ...vehicles]);
      form.setFieldValue("vehicle_id", data?.id);
      setSelectedVehicle(data);
      // setVehicleModal(false);
    }
  };
  return (
    <>
      {
        <div
          className={`${
            Boolean(!!form?.isSubmitting) && "opacity-25"
          }  m-auto reservation bg-white `}
        >
          <div className="m-auto stepper w-[90%]  py-6">
            <h1 className="font-bold text-2xl mb-4 text-gray-600">
              Create Reservation
            </h1>
            <Form onSubmit={form.handleSubmit}>
              <div
                className="cursor-pointer border-b border-gray-300 flex  w-full  bg-slate-100  items-center py-4 px-4 no-underline text-base  font-medium"
                onClick={stepOne}
              >
                <span className="text-gray-700">Date and Vehicle </span>
                {Boolean(selectedVehicle) && (
                  <>
                    <span className="grid mx-5 ">
                      <span className="m-auto">Start Date</span>
                      <span className="flex items-center">
                        {" "}
                        <FaCalendar />
                        <>
                          {
                            <ShowFormattedDate
                              date={form?.values?.start_date}
                              hideTime
                            />
                          }
                        </>
                      </span>
                    </span>
                    <span className="flex items-center">
                      <span className="">
                        <img
                          className="object-cover h-20 w-20 rounded-full mx-3"
                          src={
                            Boolean(selectedVehicle?.media?.[0]?.file_name)
                              ? selectedVehicle?.media?.[0]?.file_name
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7EkV3CX7fEqiL-PnjPzqstMql_Uu1V2vj0g&usqp=CAU"
                          }
                        />
                      </span>
                      <span className="grid">
                        <span className="">{selectedVehicle?.name}</span>
                        <span className="group bg-gray-400 text-white text-xs leading-6 px-1 py-0.5   inline-block font-normal whitespace-nowrap">
                          <>{selectedVehicle?.group?.name}</>
                        </span>
                        <span className="text-sm text-gray-600">
                          <>{selectedVehicle?.rego}</>
                        </span>
                      </span>
                    </span>
                  </>
                )}
              </div>
              {stepOneActive && (
                <>
                  <div className="grid mt-4">
                    <div className="firstrow ">
                      <div className="groups flex space-x-5 mb-3">
                        <div className="inline-block relative w-full">
                          <BaseSelect
                            placeholder="Choose One"
                            name="tariff_id"
                            label="Tariffs"
                            options={dropDownData?.tariffs?.map((type) => ({
                              value: type?.id,
                              label: type?.name,
                            }))}
                            required
                            onChange={async (event) => {
                              form.handleChange(event);
                              await getVehicles(Number(event.target.value));
                            }}
                            formik={form}
                          />
                        </div>
                        <div className="inline-block relative w-full">
                          <BaseInput
                            label="Start Date"
                            name="start_date"
                            type="date"
                            required
                            formik={form}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* vehicle table */}
                  <p className="tracking-wide text-sm mt-9  capitalize flex items-center font-semibold text-gray-400">Select Vehicle</p>
                  <div className="secondrow ">
                    <div className="groups">
                      <div className="">
                        <div className="mb-5">
                          <div>
                            <div className="mb-10">
                              <div className="text-end">
                                <div className="mb-3">
                                  <Button
                                    onClick={() => setVehicleModal(true)}
                                    className="bg-btn-100"
                                  >
                                    Add Vehicles
                                  </Button>
                                </div>

                                <Filter title="Vehicles" form={formVehicle} />
                              </div>
                            </div>

                            <div className="text-xs">
                              <DataTable
                                selectable="single"
                                onSelectionChange={handleVehicleRowSelection}
                                data={vehicles}
                                itemsPerPage={10}
                                isLoading={isVehicleDataLoading}
                                columns={[
                                  {
                                    name: "Car Rego",
                                    selector: (v: VehicleEntity) => v?.rego,
                                  },
                                  {
                                    name: "Name",
                                    selector: (v: VehicleEntity) => v?.name,
                                  },
                                  {
                                    name: "color",
                                    selector: (v: VehicleEntity) => v?.color,
                                  },
                                  {
                                    name: "year",
                                    selector: (v: VehicleEntity) => v?.year,
                                  },
                                  {
                                    name: `rent`,
                                    selector: (v: VehicleEntity) => {
                                      let tariff = dropDownData?.tariffs.find(
                                        (t) => t.id == form.values.tariff_id
                                      );
                                      switch (tariff?.name) {
                                        case "hourly":
                                          return v?.price?.per_hour;
                                        case "daily":
                                          return v?.price?.per_month;
                                        case "weekly":
                                          return v?.price?.per_week;
                                        case "monthly":
                                          return v?.price?.per_month;
                                      }
                                    },
                                  },
                                  {
                                    name: "model",
                                    selector: (v: VehicleEntity) =>
                                      v?.model?.name,
                                  },
                                  // {
                                  //   name: 'group',
                                  //   selector: (v: VehicleEntity) =>
                                  //     v?.group?.name,
                                  // },
                                  {
                                    name: "View",
                                    selector: (v: UserEntity) => (
                                      <div
                                        className="flex text-purple-600 text-[24px]"
                                        onClick={() => setVehicleId(v?.id)}
                                      >
                                        <BsEye className="mx-1 text-green-500 " />
                                      </div>
                                    ),
                                  },
                                ]}
                              />
                            </div>
                            <ViewModal
                              size="xl"
                              show={Boolean(vehicleId)}
                              onCloseClick={() => setVehicleId(null)}
                            >
                              <ViewVehicleDetail
                                hideActions={true}
                                id={vehicleId}
                              />
                            </ViewModal>
                            <ViewModal
                              size="xl"
                              show={vehicleModal}
                              onCloseClick={() => setVehicleModal(false)}
                            >
                              <CreateVehicle
                               onSave={onSaveCompleteVehicle}
                                setVehicleModal={setVehicleModal}
                                vehicleModal={vehicleModal}
                                />
                            </ViewModal>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-5 mb-3">
                    <div className="inline-block relative w-1/2">
                      <BaseSelect
                        placeholder="Choose One"
                        name="company_insurance_id"
                        label="Company Insurances (Optional)"
                        options={companyInsurance.map((type) => ({
                          value: type?.id,
                          label: type?.name,
                        }))}
                        formik={form}
                      />
                    </div>

                    <div className=" relative w-1/2 flex justify-start items-end">
                      <Button
                        onClick={() => setAddInsurance(true)}
                        className="bg-btn-100"
                      >
                        Add Insurance
                      </Button>
                    </div>

                    <ViewModal
                      show={addInsurance}
                      onCloseClick={() => setAddInsurance(false)}
                      header="Insurance"
                    >
                      <Create onSave={handleOnSaveInsurance} />
                    </ViewModal>

                    {/* COME BACK here and add insurance button */}
                  </div>

                  <div className="flex space-x-5 my-3">
                    <div className="inline-block relative w-1/2">
                      <BaseInput
                        label="Start reading (Optional)"
                        name="start_reading"
                        type="number"
                        formik={form}
                        tooltip
                        tooltipText="Odometer reading of the vehicle"
                      />
                    </div>
                    <div className="inline-block relative w-1/2">
                      <BaseInput
                        label="Bond (Optional)"
                        name="bond"
                        type="number"
                        formik={form}
                        tooltip
                        tooltipText="Upfront Payment"
                      />
                    </div>
                  </div>
                  <div className="flex">
                  <div className="inline-block relative w-1/2 pr-3">
                    <BaseTextArea label="Notes" name="notes" formik={form} />
                  </div>
                  <div className="inline-block relative w-1/2 pl-3 mt-2">
                    <BaseInput
                      label={`${
                        dropDownData?.tariffs.find(
                          (t) => t.id == form.values.tariff_id
                        )?.name
                          ? dropDownData?.tariffs.find(
                              (t) => t.id == form.values.tariff_id
                            )?.name
                          : ""
                      } Rent`}
                      name="rent"
                      type="number"
                      append={<InputGroup.Text>£</InputGroup.Text>}
                      formik={form}
                    />
                  </div>
                  </div>

                  <div className="text-end space-x-4 py-5">
                    <Button
                      variant="primary"
                      className="bg-btn-100"
                      onClick={stepTwo}
                      disabled={
                        !form.values.tariff_id ||
                        !form.values.start_date ||
                        !form.values.vehicle_id
                      }
                    >
                      Next Step
                    </Button>
                  </div>
                </>
              )}
              <button
                type="reset"
                className=" border-b border-gray-300 flex w-full  bg-slate-100  items-center py-6 px-4 no-underline text-base text-gray-700 font-medium cursor-pointer"
                onClick={stepTwo}
                disabled={
                  !form.values.tariff ||
                  !form.values.start_date ||
                  !form.values.bond ||
                  !form.values.vehicle_id
                }
              >
                Customer
                {Boolean(selectedCustomer) && (
                  <>
                    <span className="grid mx-5">
                      <span className="m-auto">License Number</span>
                      <span className="flex items-center">
                        {" "}
                        <FaCalendar />
                        <>{selectedCustomer?.license?.licence_no}</>
                      </span>
                    </span>
                    <span className="flex items-center">
                      <span className="">
                        <img
                          className="object-cover h-20 w-20 rounded-full mx-3"
                          src={
                            Boolean(selectedCustomer?.file_name)
                              ? selectedCustomer?.file_name
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7EkV3CX7fEqiL-PnjPzqstMql_Uu1V2vj0g&usqp=CAU"
                          }
                        />
                      </span>
                      <span className="grid">
                        <span className="">{`${selectedCustomer?.first_name}${selectedCustomer?.last_name}`}</span>
                        <span className="group bg-gray-400 text-white text-xs leading-6 px-1 py-0.5   inline-block font-normal whitespace-nowrap">
                          <>{selectedCustomer?.email}</>
                        </span>
                        <span className="text-sm text-gray-600">
                          <>{selectedCustomer?.phone}</>
                        </span>
                      </span>
                    </span>
                  </>
                )}
              </button>

              {stepTwoActive && (
                <>
                  <div>
                    <div className=" space-x-12 mt-3">
                      <div className="secondrow ">
                        <div className="groups">
                          <div className=" relative ">
                            <div className="my-5">
                              <div>
                                <div>
                                  {customers.length === 0 ? (
                                    <>
                                      <div className="mb-3">
                                        <div className="text-end">
                                          <Button
                                            onClick={() =>
                                              setShowCustomerModal(true)
                                            }
                                            className="bg-btn-100"
                                          >
                                            Add Customer
                                          </Button>
                                        </div>
                                      </div>
                                    </>
                                  ) : null}
                                  <Filter
                                    title="Customers"
                                    form={formCustomer}
                                    showYear={false}
                                  />
                                </div>
                                <div className="text-xs">
                                  <DataTable
                                    selectable="single"
                                    onSelectionChange={
                                      handleCustomeRowSelection
                                    }
                                    data={customers}
                                    isLoading={isCustomerDataLoading}
                                    itemsPerPage={10}
                                    columns={[
                                      {
                                        name: "First Name",
                                        selector: (c: UserEntity) =>
                                          c?.first_name,
                                      },
                                      {
                                        name: "Last Name",
                                        selector: (c: UserEntity) =>
                                          c?.last_name,
                                      },
                                      {
                                        name: "DOB",
                                        selector: (c: UserEntity) => c?.dob,
                                      },
                                      {
                                        name: "Email",
                                        selector: (c: UserEntity) => c?.email,
                                      },
                                      {
                                        name: "Phone",
                                        selector: (c: UserEntity) => c?.phone,
                                      },
                                      {
                                        name: "Zip Code",
                                        selector: (c: UserEntity) =>
                                          c?.zip_code,
                                      },
                                      {
                                        name: "License Status",
                                        selector: (c: UserEntity) => {
                                          console.log("STATUS CHECK:", c);
                                          return c?.license?.status
                                            ? "Active"
                                            : "Expired";
                                        },
                                      },
                                      {
                                        name: "View ",
                                        selector: (c: UserEntity) => (
                                          <div
                                            className="flex text-purple-600 text-[24px]"
                                            onClick={() => setCustomerId(c?.id)}
                                          >
                                            <BsEye className="mx-1 text-green-500 " />
                                          </div>
                                        ),
                                      },
                                    ]}
                                  />
                                </div>
                                <ViewModal
                                  className="px-5"
                                  size="xl"
                                  show={Boolean(customerId)}
                                  onCloseClick={() => setCustomerId(null)}
                                >
                                  <ViewCustomerDetail
                                    hideActions={true}
                                    id={customerId}
                                  />
                                </ViewModal>
                                <ViewModal
                                  size="xl"
                                  show={showCustomerModal}
                                  onCloseClick={() =>
                                    setShowCustomerModal(false)
                                  }
                                >
                                  <FormSection
                                    onSave={onSaveCompleteCustomer}
                                  />
                                </ViewModal>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-5 text-end justify-end py-5">
                    <div className="text-left">
                      <Button
                        className="bg-btn-100"
                        type="submit"
                        disabled={
                          !form.values.customer_id ||
                          form?.isSubmitting ||
                          !form?.isValid ||
                          form?.isValidating
                        }
                      >
                        {" "}
                        {!!form.isSubmitting ? (
                          <BaseLoaderIcon />
                        ) : (
                          "Confirm Reservation"
                        )}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Form>
          </div>
        </div>
      }
    </>
  );
}

CreateReservation.getLayout = function getLayout(page: ReactElement) {
  return (
    <FullLayout permission={CompanyPermissions.reservations.create}>
      {page}
    </FullLayout>
  );
};
