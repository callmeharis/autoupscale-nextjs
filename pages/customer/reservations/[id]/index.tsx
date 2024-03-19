import React, { ReactElement, useEffect, useState } from 'react'
import { Button, Col, Container, Dropdown, Form, InputGroup, Row } from 'react-bootstrap'
import { ReservationEntity } from '@/models/admin/reservation.entity';
import { useEffectAsync } from '@/utils/react';
import router, { useRouter } from 'next/router';
import ShowFormattedDate from '@/components/date-formatter';
import CompanyRoutes from '@/routes/company.route';
import CustomerApi from '@/pages/api/customer';
import FullLayout from '@/components/layouts/customer/full-layout';
import BaseLoader from '@/components/forms/base-loader';
import { useFormik } from 'formik';
import ReservationApi from '@/pages/api/reservation';
import { globalAjaxExceptionHandler } from '@/utils/ajax';
import { toast } from 'react-toastify';
import { FaCalendar } from 'react-icons/fa';
import BaseSelect from '@/components/forms/base-select';
import { HiDocument, HiDocumentDuplicate } from 'react-icons/hi2';
import BaseInput from '@/components/forms/base-input';
import BaseTextArea from '@/components/forms/base-text-area';

export default function CustomerViewReservationDetail({ id }) {
    const customerReservationApi = new CustomerApi();
    const [reservation, setReservation] = useState<ReservationEntity>();
    const [stepOneActive, setStepOneActive] = useState(true);
    const [stepTwoActive, setStepTwoActive] = useState(false);
    const [stepThreeActive, setStepThreeActive] = useState(false)
    useEffectAsync(async () => {
        try {
            const data = await customerReservationApi.self.reservation.get(id)
            setReservation(data)
        } catch (error) {
        }
    }, []);
    const router = useRouter()

    const reservationApi = new ReservationApi()

    useEffectAsync(async () => {
        if (!!id) {
            const data = await reservationApi.getById(id)
            form.setValues({
                ...form.values,
                ...data,
                status: data?.status,
                vehicle_id: data?.vehicle?.id,
                customer_id: data?.customer?.id,
                start_date: data?.start_date ? new Date(data?.start_date).toISOString() : new Date().toISOString(),
                end_date: data.end_date ? new Date(data?.end_date).toISOString() : null,
                end_reading: data?.end_reading
            })
        }
    }, [id])


    const form = useFormik({
        initialValues: new ReservationEntity(),
        validationSchema: ReservationEntity.viewReservationSchema(),
        onSubmit: async ({ notes, end_reading, ...restValues }: ReservationEntity) => {
            try {
                await reservationApi.completeReservation({ id, notes, end_reading })
                toast.success("Reservation Updated successfully")
                router.push(CompanyRoutes.reservations.index)
            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Reservation Updation Failed",
                    toast,
                });
            }
        }
    })


    const stepOne = () => {
        setStepOneActive(!stepOneActive);
        setStepTwoActive(false);
        setStepThreeActive(false);
    };
    const stepTwo = () => {
        setStepTwoActive(!stepTwoActive);
        setStepOneActive(false);
        setStepThreeActive(false);
    }
    const stepThree = () => {
        setStepThreeActive(!stepThreeActive)
        setStepOneActive(false);
        setStepTwoActive(false);


    }
    useEffect(() => {
       

    }, [form.values, form.errors])

    useEffectAsync(async () => {
        try {
            const data = await reservationApi.getById(id);
            setReservation(data)
        } catch (error) {
        }
    }, []);
    const downloadReservationInvoice = async (id: number) => {
        try {
            const data = await reservationApi.downloadInvoice(id)
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'invoice_number' + id + '.pdf')
            document.body.appendChild(link);
            link.click();
        } catch (error) {
        }
    };
    const downloadReservationContract = async (id: number) => {
        try {
            const data = await reservationApi.downloadContract(id)
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'contract_' + id + '.pdf')
            document.body.appendChild(link);
            link.click();
        } catch (error) {
        }
    };

    return (
        form?.isSubmitting ? <BaseLoader /> : <div className=" m-auto reservation bg-white ">
            <div className="m-auto stepper w-3/5  px-2 py-6">
                <h1 className="font-bold text-2xl mb-4 text-gray-600">
                    Edit Reservation
                </h1>
                <Form onSubmit={form.handleSubmit}>

                    <div className="border-b border-gray-300 flex  w-full  bg-slate-100  items-center py-4 px-4 no-underline text-base  font-medium" onClick={stepOne}>
                        <span className='text-gray-700'>Date and Vehicle </span>
                        {Boolean(form.values.vehicle) &&
                            <>
                                <span className="grid mx-5">
                                    <span className='m-auto'>Start Date</span>
                                    <span className='flex items-center'> <FaCalendar /><>{<ShowFormattedDate date={form?.values?.start_date} hideTime />}</></span>
                                </span>
                                <span className='flex items-center'>
                                    <span>
                                        <img className='object-cover h-20 w-20 rounded-full mx-3' src={Boolean(form.values.vehicle?.media?.[0]?.file_name) ? form.values.vehicle?.media?.[0]?.file_name : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7EkV3CX7fEqiL-PnjPzqstMql_Uu1V2vj0g&usqp=CAU"} />
                                    </span>
                                    <span className="grid">
                                        <span className=''>{form.values.vehicle?.name}</span>
                                        <span className="group bg-gray-400 text-white text-xs leading-6 px-1 py-0.5   inline-block font-normal whitespace-nowrap">
                                            <>
                                                {form.values.vehicle?.status_string}
                                            </>
                                        </span>
                                        <span className='text-sm text-gray-600'>
                                            <>
                                                {form.values.vehicle?.rego}
                                            </>
                                        </span>
                                    </span>

                                </span>
                            </>
                        }
                    </div>
                    {stepOneActive && (<>
                        <div className="grid mt-4">
                            <div className="firstrow ">
                                <div className="groups flex space-x-5 mb-3">
                                    <div className="inline-block relative w-full">
                                        <BaseSelect
                                            placeholder="Choose One"
                                            options={['days']}
                                            name="tariff"
                                            label="Tarrif"
                                            required
                                            formik={form}
                                            readOnly
                                        />
                                    </div>
                                    <div className="inline-block relative w-full">
                                        <BaseInput
                                            label='Start Date'
                                            name='start_date'
                                            type='date'
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
                                        label='Bond'
                                        name='bond'
                                        type='number'
                                        formik={form}
                                        required
                                        readOnly
                                    />
                                </div>
                                <div className="inline-block relative w-1/2">
                                    <BaseInput
                                        label='Rent (Optional)'
                                        name='rent'
                                        type='number'
                                        append={(<InputGroup.Text>$</InputGroup.Text>)}
                                        formik={form}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-5 mb-3">
                                <div className="inline-block relative w-1/2">
                                    <BaseInput
                                        label='Start reading (Optional)'
                                        name='start_reading'
                                        type='number'
                                        formik={form}
                                        readOnly
                                    />
                                </div>
                                <div className="inline-block relative w-1/2">
                                    <BaseInput
                                        label='End reading (Optional)'
                                        name='end_reading'
                                        type='number'
                                        formik={form}
                                        readOnly
                                    />
                                </div>

                            </div>
                            <div className="inline-block relative w-1/2">
                                <BaseTextArea
                                    label='Notes'
                                    name='notes'
                                    formik={form}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="shadow bg-white mb-[30px] my-5 rounded-md max-w-7xl mx-auto">
                            <div className="p-[20px]">
                                <div className="flex justify-between min-h-16 items-center py-3  px-6 border-b border-gray-300">
                                    <h3 className=" font-medium text-gray-800 text-lg">Selected Vehicle</h3>
                                </div>
                                <Row>
                                    <Col lg={2}>
                                        <img width={144} height={144} className='rounded-full w-36 h-32 object-cover object-center border border-gray-300"' src={
                                            Boolean(form.values?.vehicle?.media[0]?.file_name) ? (
                                                `${form.values?.vehicle?.media[0]?.file_name}`
                                            ) : (
                                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-dztcp9-WB3jN5lwSEPMj7dJKC2URReC2jw&usqp=CAU"
                                            )}
                                            alt=""
                                        />
                                    </Col>

                                    <Col lg={10}>

                                        <ul className='flex justify-between my-4'>
                                            <li className=''>
                                                <p className='mb-2 font-medium text-gray-600'> Id</p>
                                                <p className='text-base text-gray-800 '> {form.values?.vehicle?.id} </p>
                                            </li>
                                            <li className=''>
                                                <p className='mb-2 font-medium text-gray-600'> Status</p>
                                                <p className='text-base text-gray-800 '>
                                                    {(form.values?.vehicle?.status_string) === "Cancelled" ? <button className="px-2 bg-red-500 rounded-3xl text-white">Cancel</button> : <button className="px-2 bg-blue-500 rounded-3xl text-white">{form.values?.vehicle?.status_string}</button>}
                                                </p>
                                            </li>
                                            <li className=''>
                                                <p className='mb-2 font-medium text-gray-600'>Car Rego</p>
                                                <p className={`${'text-base text-gray-800'}`}> {form.values?.vehicle?.rego ? form.values?.vehicle?.rego : "N/A"} </p>
                                            </li>
                                            <li className=''>
                                                <p className='mb-2 font-medium text-gray-600'> Vehicle Name    </p>
                                                <p className={`${'text-base text-gray-800'}`}> {form.values?.vehicle?.name ? form.values?.vehicle?.name : "N/A"} </p>
                                            </li>
                                            <li className=''>
                                                <p className='mb-2 font-medium text-gray-600'> Year    </p>
                                                <p className={`${'text-base text-gray-800'}`}> {form.values?.vehicle?.year ? form.values?.vehicle?.year : "N/A"} </p>
                                            </li>
                                            <li className=''>
                                                <p className='mb-2 font-medium text-gray-600'> Owner    </p>
                                                <p className='text-base text-gray-800 '> {form.values?.owner?.first_name} </p>
                                            </li>
                                            <li>

                                            </li>

                                        </ul>
                                    </Col>


                                </Row>

                            </div>

                        </div>
                        <div className="text-end space-x-4 py-5">

                            <Button variant="primary" className='bg-btn-100'
                                onClick={stepTwo}
                                disabled={!form.values.tariff || !form.values.start_date || !form.values.bond || !form.values.vehicle_id}
                            >
                                Next Step
                            </Button>

                        </div>

                    </>)}
                    <button type='reset' className="border-b border-gray-300 flex w-full  bg-slate-100  items-center py-6 px-4 no-underline text-base text-gray-700 font-medium" onClick={stepTwo} >
                        Customer
                        {Boolean(form?.values?.customer) && <>
                            <span className="grid mx-5">
                                <span className='m-auto'>License Number</span>
                                <span className='flex items-center'> <FaCalendar /><>{Boolean(form?.values?.customer?.license?.licence_no) ? form?.values?.customer?.license?.licence_no : "N/A"}</></span>
                            </span>
                            <span className='flex items-center'>
                                <span className=''>
                                    <img className='object-cover h-20 w-20 rounded-full mx-3' src={Boolean(form?.values?.customer?.file_name) ? form?.values?.customer?.file_name : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7EkV3CX7fEqiL-PnjPzqstMql_Uu1V2vj0g&usqp=CAU"} />
                                </span>
                                <span className="grid">
                                    <span className=''>{`${form?.values?.customer?.first_name}${form?.values?.customer?.last_name}`}</span>
                                    <span className="group bg-gray-400 text-white text-xs leading-6 px-1 py-0.5   inline-block font-normal whitespace-nowrap">
                                        <>
                                            {form?.values?.customer?.email}
                                        </>
                                    </span>
                                    <span className='text-sm text-gray-600'>
                                        <>
                                            {form?.values?.customer?.phone}
                                        </>
                                    </span>
                                </span>

                            </span>

                        </>}
                    </button>


                    {stepTwoActive && <>
                        <div>

                            <div className="">
                                <div className="">
                                    <div className="">
                                        <div className="">
                                            <div className="my-5">
                                                <div className="shadow bg-white my-4 mb-[30px] rounded-md max-w-7xl mx-auto">
                                                    <div className="p-[20px]">
                                                        <div className="flex justify-between min-h-16 items-center py-3  px-6 border-b border-gray-300">
                                                            <h3 className=" font-medium text-gray-800 text-lg">Selected Customer</h3>
                                                        </div>
                                                        <Row>
                                                            <Col lg={2}>
                                                                <img className='rounded-full w-36 h-32 object-cover object-center border border-gray-300"' src={
                                                                    Boolean(form.values?.customer?.file_name) ? (`${form.values?.customer?.file_name}`)
                                                                        : ("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHeu1JU1avFzQtN-az4HZqEpR1VvEBN-SEXfEuOtt8Xg&s")} alt="" />
                                                            </Col>
                                                            <Col lg={10}>
                                                                <ul className='flex justify-between my-4'>
                                                                    <li className=''>
                                                                        <p className='mb-2 font-medium text-gray-600'> Id</p>
                                                                        <p className='text-base text-gray-800 '> {form.values?.customer?.id} </p>
                                                                    </li>
                                                                    <li className=''>
                                                                        <p className='mb-2 font-medium text-gray-600'> Name</p>
                                                                        <p className='text-base text-gray-800 '> {form.values?.customer?.full_name} </p>
                                                                    </li>

                                                                    <li className=''>
                                                                        <p className='mb-2 font-medium text-gray-600'> Email    </p>
                                                                        <p className={`${'text-base text-gray-800'}`}> {form.values?.customer?.email ? form.values?.customer?.email : "N/A"} </p>
                                                                    </li>
                                                                    <li className=''>
                                                                        <p className='mb-2 font-medium text-gray-600'> Phone Number</p>
                                                                        <p className={`${'text-base text-gray-800'}`}> {form.values?.customer?.phone ? form.values?.customer?.phone : "N/A"} </p>
                                                                    </li>
                                                                    <li>

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
                        <div className="text-end">
                            <Button variant="primary" className='bg-btn-100'
                                onClick={stepThree}
                                disabled={!form.values.tariff || !form.values.start_date || !form.values.bond || !form.values.vehicle_id}
                            >
                                Next Step
                            </Button>
                        </div>

                    </>}
                    <button onClick={stepThree} type='reset' className="border-b border-gray-300 flex w-full  bg-slate-100  items-center py-6 px-4 no-underline text-base text-gray-700 font-medium" >
                        Documents
                    </button>
                    {
                        stepThreeActive && <>

                            <div className="my-5">
                                <div className="shadow bg-white my-4 mb-[30px] rounded-md max-w-7xl mx-auto">
                                    <div className="p-[20px]">
                                        <div className="flex justify-between min-h-16 items-center py-3  px-6 border-b border-gray-300">
                                            <h3 className=" font-medium text-gray-800 text-lg">Documents</h3>
                                        </div>
                                        <Row>
                                            <Col lg={6}>
                                                <div
                                                    className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                                                    <h5
                                                        className="mb-2 text-xl font-medium leading-tight text-black ">
                                                        Invoice
                                                    </h5>
                                                    <div className="flex space-x-6 py-3" >
                                                        <HiDocumentDuplicate className='text-4xl text-gray-400' />
                                                        <button
                                                            type="button"
                                                            className=" rounded bg-btn-100"
                                                            onClick={() => downloadReservationInvoice(reservation?.id)}
                                                        >

                                                            Download
                                                        </button>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div
                                                    className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                                                    <h5
                                                        className="mb-2 text-xl font-medium leading-tight text-black " >
                                                        Contract
                                                    </h5>
                                                    <div className="flex space-x-6 py-3" >
                                                        <HiDocument className='text-4xl text-gray-400' />
                                                        <button
                                                            type="button"
                                                            className=" rounded bg-btn-100" onClick={() => downloadReservationContract(reservation?.id)}>

                                                            Download
                                                        </button>
                                                    </div>
                                                </div>

                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </>

                    }


                </Form>
            </div>

        </div >
    )
}

CustomerViewReservationDetail.getLayout = function getLayout(page: ReactElement) {
    return (<FullLayout>{page}</FullLayout>)
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