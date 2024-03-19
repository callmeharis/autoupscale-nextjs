import { toast } from "react-toastify";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useEffectAsync } from "../../../../../utils/react";
import BaseInput from "../../../../../components/forms/base-input";
import BaseSelect from "../../../../../components/forms/base-select";
import FullLayout from "../../../../../components/layouts/company/full-layout";
import BaseTextArea from "../../../../../components/forms/base-text-area";
import ReservationApi from "../../../../api/reservation";
import { globalAjaxExceptionHandler } from "../../../../../utils/ajax";
import { ReservationEntity } from "../../../../../models/admin/reservation.entity";
import BaseLoader from "@/components/forms/base-loader";
import CompanyRoutes from "@/routes/company.route";
import { FaCalendar } from "react-icons/fa";
import ShowFormattedDate from "@/components/date-formatter";
import { HiDocument, HiDocumentDuplicate } from "react-icons/hi2";
import SettingApi from "@/pages/api/setting";
import { SystemSettingDto } from "@/models/setting/system-setting.dto";
import { useAuth } from "@/hooks/use-auth";
import { PermissionType } from "@/types/permissions.type";
import CompanyPermissions from "@/permissions/company.permission";
import ViewModal from "@/components/view-modal";
import { ReservationViolationTable } from "@/components/reservation-violation/reservation-violation-table";
import { CreateReservationViolation } from "@/components/reservation-violation/create";
import { ReservationViolationEntity } from "@/models/admin/violation/reservation.violation.entity";
import ReservationViolation from "@/components/reservation-violation";
import DocumentEdit from "@/components/document/update";
import { DocumentTypeEnum } from "@/enums/document/document-type.enum";

export default function EditReservation({ id }) {
  const [stepOneActive, setStepOneActive] = useState(true);
  const [stepTwoActive, setStepTwoActive] = useState(false);
  const [stepThreeActive, setStepThreeActive] = useState(false);
  const [stepFourActive, setStepFourActive] = useState(false);
  const [reservation, setReservation] = useState<ReservationEntity>();
  const [dropDownData, setDropDownData] = useState<SystemSettingDto>();
  const [showRemarks, setShowRemarks] = useState<Boolean>();
  const { user, hasPermission } = useAuth();
  const [can, setCan] = useState<PermissionType>(null);
  const [addViolation, setAddViolation] = useState<boolean>(false);
  useEffect(() => {
    setCan({
      start: hasPermission(CompanyPermissions.reservations.start),
      complete: hasPermission(CompanyPermissions.reservations.complete),
    });
  }, [user]);
  const router = useRouter();

  const reservationApi = new ReservationApi();
  const settingApi = new SettingApi();

  useEffectAsync(async () => {
    if (!!id) {
      const data = await reservationApi.getById(id);
      const { tariff } = data;
      form.setValues({
        ...form.values,
        ...data,
        status: data?.status,
        vehicle_id: data?.vehicle?.id,
        customer_id: data?.customer?.id,
        start_date: data?.start_date
          ? new Date(data?.start_date).toISOString()
          : new Date().toISOString(),
        end_date: data.end_date ? new Date(data?.end_date).toISOString() : null,
        end_reading: data?.end_reading,
        tariff_id: tariff.id,
      });
    }

    const data = await settingApi.system.list();
    setDropDownData(data);
  }, [id]);

  const form = useFormik({
    initialValues: new ReservationEntity(),
    validationSchema: ReservationEntity.viewReservationSchema(),
    onSubmit: async ({
      notes,
      end_reading,
      remarks,
      payment_type,
      due_amount,
      ...restValues
    }: ReservationEntity) => {
      try {
        await reservationApi.completeReservation({
          id,
          notes,
          end_reading,
          remarks,
          payment_type,
          due_amount,
        });
        setShowRemarks(false);
        toast.success("Reservation Updated successfully");

        router.push(CompanyRoutes.reservations.index);
      } catch (error) {
        globalAjaxExceptionHandler(error, {
          formik: form,
          defaultMessage: "Reservation Updation Failed",
          toast,
        });
      }
    },
  });

  const stepOne = () => {
    setStepOneActive(!stepOneActive);
    setStepTwoActive(false);
    setStepThreeActive(false);
    setStepFourActive(false);
  };
  const stepTwo = () => {
    setStepTwoActive(!stepTwoActive);
    setStepOneActive(false);
    setStepFourActive(false);
    setStepThreeActive(false);
  };
  const stepThree = () => {
    setStepThreeActive(!stepThreeActive);
    setStepOneActive(false);
    setStepTwoActive(false);
    setStepFourActive(false);
  };
  const stepFour = () => {
    setStepOneActive(false);
    setStepTwoActive(false);
    setStepThreeActive(false);
    setStepFourActive(!stepFourActive);
  };
  // useEffect(() => {
  //     console.log("formvalie--", form.values)
  //     console.log("erorr--", form.errors)

  // }, [form.values, form.errors])

  useEffectAsync(async () => {
    try {
      const data = await reservationApi.getById(id);
      setReservation(data);
    } catch (error) {}
  }, []);

  const downloadReservationInvoice = async (id: number) => {
    try {
      const data = await reservationApi.downloadInvoice(id);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice_number" + id + ".pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {}
  };
  const downloadReservationContract = async (id: number) => {
    try {
      const data = await reservationApi.downloadContract(id);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "contract_" + id + ".pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {}
  };
  const onStartReservationClick = async (id: number) => {
    const { end_reading, notes, ...rest } = form?.values;
    try {
      const data = await reservationApi.startReservation({
        id,
        notes,
        end_reading,
      });
      setReservation(data);
      toast.success("Reservation Started");
    } catch (error) {
      toast.error("Status can not be changed");
    }
  };
  const handleOnSave = (data: ReservationViolationEntity) => {
    const findGarage = reservation.violations.findIndex(
      (v) => v.id === data.id
    );
    alert(findGarage);
    if (findGarage !== -1) {
      const updatedGarage = [
        ...reservation.violations.slice(0, findGarage),
        data,
        ...reservation.violations.slice(findGarage + 1),
      ];

      //setGarage(updatedGarage);
    } else {
      //setGarage([data, ...garage]);
    }
    //setEditViolance(null);
    setAddViolation(false);
  };

  const onCancelReservationClick = async (id: number) => {
    const { end_reading, notes, ...rest } = form?.values;
    try {
      const data = await reservationApi.cancelReservation({
        id,
        notes,
        end_reading,
      });
      setReservation(data);
      toast.success("Reservation Cancelled");
    } catch (error) {
      toast.error("Status can not be changed");
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
          <div className="m-auto stepper w-[90%]  px-5 py-6">
            <h1 className="font-bold text-2xl mb-4 text-gray-600">
              Edit Reservation
            </h1>
            <Form onSubmit={form.handleSubmit}>
              <div
                className="border-b border-gray-300 flex  w-full  bg-slate-100  items-center py-4 px-4 no-underline text-base  font-medium"
                onClick={stepOne}
              >
                <span className="text-gray-700">Date and Vehicle </span>
                {Boolean(form.values.vehicle) && (
                  <>
                    <span className="grid mx-5">
                      <span className="ml-1">Start Date</span>
                      <span className="flex items-center text-sm text-gray-600">
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
                      <span>
                        <img
                          className="object-cover h-20 w-20 rounded-full mx-3"
                          src={
                            Boolean(form.values.vehicle?.media?.[0]?.file_name)
                              ? form.values.vehicle?.media?.[0]?.file_name
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7EkV3CX7fEqiL-PnjPzqstMql_Uu1V2vj0g&usqp=CAU"
                          }
                        />
                      </span>
                      <span className="grid text-left">
                        <span className="">{form.values.vehicle?.name}</span>
                        <span className="group bg-gray-400 text-white text-xs leading-6 px-1 py-0.5   inline-block font-normal whitespace-nowrap">
                          <>{form.values.vehicle?.status_string}</>
                        </span>
                        <span className="text-sm text-gray-600">
                          <>{form.values.vehicle?.rego}</>
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
                            label="Tariff"
                            options={dropDownData?.tariffs?.map((type) => ({
                              value: type?.id,
                              label: type?.name,
                            }))}
                            formik={form}
                            readOnly
                            required
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
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-5 mb-3">
                      <div className="inline-block relative w-1/2">
                        <BaseInput
                          label="Bond"
                          name="bond"
                          type="number"
                          formik={form}
                          required
                          readOnly
                        />
                      </div>
                      <div className="inline-block relative w-1/2">
                        <BaseInput
                          label="Rent (Optional)"
                          name="rent"
                          type="number"
                          append={<>£</>}
                          formik={form}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="flex space-x-5 mb-3">
                      <div className="inline-block relative w-1/2">
                        <BaseInput
                          label="Start reading (Optional)"
                          name="start_reading"
                          type="number"
                          formik={form}
                          readOnly
                        />
                      </div>
                      <div className="inline-block relative w-1/2">
                        <BaseInput
                          label="End reading (Optional)"
                          name="end_reading"
                          type="number"
                          formik={form}
                          readOnly={reservation?.status_string == "Completed"}
                        />
                      </div>
                    </div>
                    <div className="inline-block relative w-1/2">
                      <BaseTextArea
                        label="Notes"
                        name="notes"
                        formik={form}
                        readOnly={reservation?.status_string == "Completed"}
                      />
                    </div>
                  </div>
                  <div className="shadow bg-white mb-[30px] my-5 rounded-md max-w-7xl mx-auto">
                    <div className="p-[20px]">
                      <div className="flex justify-between min-h-16 items-center py-3  px-6 border-b border-gray-300">
                        <h3 className=" font-medium text-gray-800 text-lg">
                          Selected Vehicle
                        </h3>
                      </div>
                      <Row>
                        <Col lg={2}>
                          <img
                            width={144}
                            height={144}
                            className='rounded-full w-36 h-32 object-cover object-center border border-gray-300"'
                            src={
                              Boolean(form.values?.vehicle?.media[0]?.file_name)
                                ? `${form.values?.vehicle?.media[0]?.file_name}`
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-dztcp9-WB3jN5lwSEPMj7dJKC2URReC2jw&usqp=CAU"
                            }
                            alt=""
                          />
                        </Col>

                        <Col lg={10}>
                          <ul className="flex justify-between my-4">
                            <li className="">
                              <p className="mb-2 font-medium text-gray-600">
                                {" "}
                                Id
                              </p>
                              <p className="text-base text-gray-800 ">
                                {" "}
                                {form.values?.vehicle?.id}{" "}
                              </p>
                            </li>
                            <li className="">
                              <p className="mb-2 font-medium text-gray-600">
                                {" "}
                                Status
                              </p>
                              <p className="text-base text-gray-800 ">
                                {form.values?.vehicle?.status_string ===
                                "Cancelled" ? (
                                  <button className="px-2 bg-red-500 rounded-3xl text-white">
                                    Cancel
                                  </button>
                                ) : (
                                  <button className="px-2 bg-blue-500 rounded-3xl text-white">
                                    {form.values?.vehicle?.status_string}
                                  </button>
                                )}
                              </p>
                            </li>
                            <li className="">
                              <p className="mb-2 font-medium text-gray-600">
                                Car Rego
                              </p>
                              <p className={`${"text-base text-gray-800"}`}>
                                {" "}
                                {form.values?.vehicle?.rego
                                  ? form.values?.vehicle?.rego
                                  : "N/A"}{" "}
                              </p>
                            </li>
                            <li className="">
                              <p className="mb-2 font-medium text-gray-600">
                                {" "}
                                Vehicle Name{" "}
                              </p>
                              <p className={`${"text-base text-gray-800"}`}>
                                {" "}
                                {form.values?.vehicle?.name
                                  ? form.values?.vehicle?.name
                                  : "N/A"}{" "}
                              </p>
                            </li>
                            <li className="">
                              <p className="mb-2 font-medium text-gray-600">
                                {" "}
                                Year{" "}
                              </p>
                              <p className={`${"text-base text-gray-800"}`}>
                                {" "}
                                {form.values?.vehicle?.year
                                  ? form.values?.vehicle?.year
                                  : "N/A"}{" "}
                              </p>
                            </li>
                            <li className="">
                              <p className="mb-2 font-medium text-gray-600">
                                {" "}
                                Owner{" "}
                              </p>
                              <p className="text-base text-gray-800 ">
                                {" "}
                                {form.values?.owner?.first_name}{" "}
                              </p>
                            </li>
                            <li>
                              <Button
                                className="bg-btn-100 mt-2"
                                onClick={() => {
                                  router.push(
                                    CompanyRoutes.vehicle.view.replace(
                                      "[vehicleId]",
                                      `${form.values?.vehicle?.id}`
                                    )
                                  );
                                }}
                              >
                                {" "}
                                View
                              </Button>
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </div>
                  </div>

                  <div className="shadow bg-white mb-[30px] my-5 rounded-md max-w-7xl mx-auto">
                    <div className="p-[20px]">
                      <div className="flex justify-between min-h-16 items-center py-3  px-6 border-b border-gray-300">
                        <h3 className=" font-medium text-gray-800 text-lg">
                          Insurance Details
                        </h3>
                      </div>
                      <Row>
                        <Col lg={2}>
                          <img
                            width={144}
                            height={144}
                            className='rounded-full w-36 h-32 object-cover object-center border border-gray-300"'
                            src={
                              Boolean(reservation?.company_insurance?.media)
                                ? `${reservation?.company_insurance?.media[0]?.file_name}`
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-dztcp9-WB3jN5lwSEPMj7dJKC2URReC2jw&usqp=CAU"
                            }
                            alt=""
                          />
                        </Col>

                        <Col lg={10}>
                          <ul className="flex justify-between my-4">
                            <li className="">
                              <p className="mb-2 font-medium text-gray-600">
                                {" "}
                                Name
                              </p>
                              <p className="text-base text-gray-800 ">
                                {" "}
                                {form.values?.company_insurance?.name}{" "}
                              </p>
                            </li>
                            <li className="">
                              <p className="mb-2 font-medium text-gray-600">
                                {" "}
                                Policy No
                              </p>
                              <p className="text-base text-gray-800 ">
                                {" "}
                                {reservation?.company_insurance
                                  ?.policy_number ?? "N/A"}{" "}
                              </p>
                            </li>
                            <li className="">
                              <p className="mb-2 font-medium text-gray-600">
                                Email
                              </p>
                              <p className={`${"text-base text-gray-800"}`}>
                                {" "}
                                {reservation?.company_insurance?.email ??
                                  "N/A"}{" "}
                              </p>
                            </li>
                            <li className="">
                              <p className="mb-2 font-medium text-gray-600">
                                {" "}
                                Phone
                              </p>
                              <p className={`${"text-base text-gray-800"}`}>
                                {" "}
                                {reservation?.company_insurance?.phone ??
                                  "N/A"}{" "}
                              </p>
                            </li>
                            <li className="">
                              <p className="mb-2 font-medium text-gray-600">
                                {" "}
                                Address
                              </p>
                              <p className={`${"text-base text-gray-800"}`}>
                                {" "}
                                {reservation?.company_insurance?.address ??
                                  "N/A"}{" "}
                              </p>
                            </li>
                          </ul>
                        </Col>
                      </Row>
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
                className="border-b border-gray-300 flex w-full  bg-slate-100  items-center py-6 px-4 no-underline text-base text-gray-700 font-medium"
                onClick={stepTwo}
              >
                Customer
                {Boolean(form?.values?.customer) && (
                  <>
                    <span className="grid mx-5">
                      <span className="text-left">License Number</span>
                      <span className="flex items-center text-sm text-gray-600 ">
                        <>
                          {Boolean(form?.values?.customer?.license?.licence_no)
                            ? form?.values?.customer?.license?.licence_no
                            : "N/A"}
                        </>
                      </span>
                    </span>
                    <span className="flex items-center">
                      <span className="">
                        <img
                          className="object-cover h-20 w-20 rounded-full mx-3"
                          src={
                            Boolean(form?.values?.customer?.file_name)
                              ? form?.values?.customer?.file_name
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7EkV3CX7fEqiL-PnjPzqstMql_Uu1V2vj0g&usqp=CAU"
                          }
                        />
                      </span>
                      <span className="grid text-left">
                        <span className="">{`${form?.values?.customer?.first_name}${form?.values?.customer?.last_name}`}</span>
                        <span className="group bg-gray-400 text-white text-xs leading-6 px-1 py-0.5   inline-block font-normal whitespace-nowrap">
                          <>{form?.values?.customer?.email}</>
                        </span>
                        <span className="text-sm text-gray-600">
                          <>{form?.values?.customer?.phone}</>
                        </span>
                      </span>
                    </span>
                  </>
                )}
              </button>

              {stepTwoActive && (
                <>
                  <div>
                    <div className="">
                      <div className="">
                        <div className="">
                          <div className="">
                            <div className="my-5">
                              <div className="shadow bg-white my-4 mb-[30px] rounded-md max-w-7xl mx-auto">
                                <div className="p-[20px]">
                                  <div className="flex justify-between min-h-16 items-center py-3  px-6 border-b border-gray-300">
                                    <h3 className=" font-medium text-gray-800 text-lg">
                                      Selected Customer
                                    </h3>
                                  </div>
                                  <Row>
                                    <Col lg={2}>
                                      <img
                                        className='rounded-full w-36 h-32 object-cover object-center border border-gray-300"'
                                        src={
                                          Boolean(
                                            form.values?.customer?.file_name
                                          )
                                            ? `${form.values?.customer?.file_name}`
                                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHeu1JU1avFzQtN-az4HZqEpR1VvEBN-SEXfEuOtt8Xg&s"
                                        }
                                        alt=""
                                      />
                                    </Col>
                                    <Col lg={10}>
                                      <ul className="flex justify-between my-4">
                                        <li className="">
                                          <p className="mb-2 font-medium text-gray-600">
                                            {" "}
                                            Id
                                          </p>
                                          <p className="text-base text-gray-800 ">
                                            {" "}
                                            {form.values?.customer?.id}{" "}
                                          </p>
                                        </li>
                                        <li className="">
                                          <p className="mb-2 font-medium text-gray-600">
                                            {" "}
                                            Name
                                          </p>
                                          <p className="text-base text-gray-800 ">
                                            {" "}
                                            {
                                              form.values?.customer?.full_name
                                            }{" "}
                                          </p>
                                        </li>

                                        <li className="">
                                          <p className="mb-2 font-medium text-gray-600">
                                            {" "}
                                            Email{" "}
                                          </p>
                                          <p
                                            className={`${"text-base text-gray-800"}`}
                                          >
                                            {" "}
                                            {form.values?.customer?.email
                                              ? form.values?.customer?.email
                                              : "N/A"}{" "}
                                          </p>
                                        </li>
                                        <li className="">
                                          <p className="mb-2 font-medium text-gray-600">
                                            {" "}
                                            Phone Number
                                          </p>
                                          <p
                                            className={`${"text-base text-gray-800"}`}
                                          >
                                            {" "}
                                            {form.values?.customer?.phone
                                              ? form.values?.customer?.phone
                                              : "N/A"}{" "}
                                          </p>
                                        </li>
                                        <li>
                                          <Button
                                            className="bg-btn-100 mt-2"
                                            onClick={() => {
                                              router.push(
                                                CompanyRoutes.customer.view.replace(
                                                  "[customerId]",
                                                  `${form.values?.customer?.id}`
                                                )
                                              );
                                            }}
                                          >
                                            {" "}
                                            View{" "}
                                          </Button>
                                        </li>
                                      </ul>
                                    </Col>
                                  </Row>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-end mb-5">
                    <Button
                      variant="primary"
                      className="bg-btn-100"
                      onClick={stepThree}
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
                onClick={stepFour}
                type="reset"
                className="border-b border-gray-300 flex w-full  bg-slate-100  items-center py-6 px-4 no-underline text-base text-gray-700 font-medium"
              >
                Violations
              </button>

             
            </Form>
            {stepFourActive && (
                <ReservationViolation reservation={reservation} />
              )}
              <button
                onClick={stepThree}
                type="reset"
                className="border-b border-gray-300 flex w-full  bg-slate-100  items-center py-6 px-4 no-underline text-base text-gray-700 font-medium"
              >
                Documents
              </button>
              {stepThreeActive && (
                <>
                  <div className="my-5">
                    <div className="shadow bg-white my-4 mb-[30px] rounded-md max-w-7xl mx-auto">
                      <div className="p-[20px]">
                     
                        <Row>
                          <Col lg={6}>
                          <div className="flex  min-h-16 items-center py-3   border-b border-gray-300">
                          <h3 className=" font-medium text-gray-800 text-lg">
                            Download Documents
                          </h3>
                         
                        </div>
                         <Row className="py-4">
                         <Col lg={6}>
                          
                              <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                                <h5 className="mb-2 text-xl font-medium leading-tight text-black ">
                                  Invoice
                                </h5>
                                <div className="flex space-x-6 py-3">
                                  <HiDocumentDuplicate className="text-4xl text-gray-400" />
                                  <button
                                    type="button"
                                    className=" rounded bg-btn-100"
                                    onClick={() =>
                                      downloadReservationInvoice(
                                        reservation?.id
                                      )
                                    }
                                  >
                                    Download
                                  </button>
                                </div>
                              </div>
                            </Col>
                            <Col lg={6}>
                            <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                              <h5 className="mb-2 text-xl font-medium leading-tight text-black ">
                                Contract
                              </h5>
                              <div className="flex space-x-6 py-3">
                                <HiDocument className="text-4xl text-gray-400" />
                                <button
                                  type="button"
                                  className=" rounded bg-btn-100"
                                  onClick={() =>
                                    downloadReservationContract(reservation?.id)
                                  }
                                >
                                  Download
                                </button>
                              </div>
                            </div>
                            </Col>
                         </Row>
                          </Col>
                          <Col lg={6}>
                          <div className="flex  min-h-16 items-center py-3   border-b border-gray-300">
                          <h3 className=" font-medium text-gray-800 text-lg">
                            Add Documents
                          </h3>
                         
                        </div>
                            <div className="py-4">

                              <DocumentEdit  documentType={DocumentTypeEnum.RESERVATION_DOCUMENT} documentId={reservation?.id} documentData={reservation}/>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </>
              )}
          </div>

          <div className="text-end my-3">
            {reservation?.status == "0" ? (
              <>
                {can?.start && (
                  <Button
                    className="bg-btn-100"
                    onClick={() => onStartReservationClick(reservation?.id)}
                  >
                    Start Reservation
                  </Button>
                )}
                {
                  <Button
                    className="bg-btn-100"
                    onClick={() => onCancelReservationClick(reservation?.id)}
                  >
                    Cancel Reservation
                  </Button>
                }
              </>
            ) : null}
            {reservation?.status == "1" ? (
              <>
                {can?.complete && (
                  <Button
                    onClick={() => {
                      setShowRemarks(true);
                    }}
                    className="bg-btn-100"
                  >
                    Complete Reservation
                  </Button>
                )}
              </>
            ) : null}
          </div>
        </div>
      }
      <ViewModal
        show={Boolean(showRemarks)}
        onCloseClick={() => setShowRemarks(false)}
        header="Remarks"
        className="px-5 pt-4 pb-5"
      >
        <form className="space-y-4" onSubmit={form?.handleSubmit}>
          <BaseSelect
            required
            label="Payment Type"
            options={["Bank Wire", "Cash", "Online", "Cheque"]}
            formik={form}
            name="payment_type"
          />
          <BaseInput
            formik={form}
            label="Due Ammount"
            name="due_amount"
            type="number"
          />
          <BaseTextArea formik={form} label="Remarks" name="remarks" />
          <Button
            className="bg-btn-100 w-full"
            type="submit"
            disabled={form?.isSubmitting}
          >
            Submit
          </Button>
        </form>
      </ViewModal>
    </>
  );
}
EditReservation.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
export async function getServerSideProps(context) {
  try {
    const id = context.params?.id;
    if (!!!id) return { notFound: true };

    return {
      props: { id },
    };
  } catch (error) {
    console.error("Exception is here:", error);
    return { props: { id: 0 } };
  }
}
