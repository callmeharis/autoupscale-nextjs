import React, { ReactElement, useState } from 'react'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap'
import FullLayout from '@/components/layouts/company/full-layout'
import { ReservationEntity } from '@/models/admin/reservation.entity';
import ReservationApi from '@/pages/api/reservation';
import { useEffectAsync } from '@/utils/react';
import ViewCard from '@/components/view-card';
import ViewDetails from '@/components/view-details';
import { toast } from 'react-toastify';
import router from 'next/router';
import ShowFormattedDate from '@/components/date-formatter';
import CompanyRoutes from '@/routes/company.route';
import CompanyPermissions from '@/permissions/company.permission';

export default function ViewReservationDetail({ id }) {
    const reservationApi = new ReservationApi();
    const [reservation, setReservation] = useState<ReservationEntity>();
    useEffectAsync(async () => {
        try {
            const data = await reservationApi.getById(id);
            setReservation(data)
        } catch (error) {
        }
    }, []);


    const onStartReservationClick = async (id: number) => {
        try {
            const data = await reservationApi.startReservation({ id });
            setReservation(data)
            toast.success("Reservation Started")
        } catch (error) {
            toast.error("Status can not be changed")
        }


    }
    const onCancelReservationClick = async (id: number) => {
        try {
            const data = await reservationApi.cancelReservation({ id });
            setReservation(data)
            toast.success("Reservation Cancelled")
        } catch (error) {
            toast.error("Status can not be changed")
        }
    };
    const onCompleteReservationClick = async (id: number) => {
        try {
            const data = await reservationApi.completeReservation({ id });
            setReservation(data)
            toast.success("Reservation completed")
        } catch (error) {
            toast.error("Status can not be changed")
        }
    };
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
        <>
            <div className='text-end max-w-7xl m-auto my-3 flex space-x-3 justify-end'>
                {reservation?.status == '0' ? <>
                    <Button className='bg-btn-100' onClick={() => onStartReservationClick(reservation?.id)}>Start Reservation</Button>
                    <Button className='bg-btn-100' onClick={() => onCancelReservationClick(reservation?.id)}>Cancel Reservation</Button>
                </> : null}
                {reservation?.status == '1' ? <>
                    <Button className='bg-btn-100' onClick={() => onCompleteReservationClick(reservation?.id)}>Complete Reservation</Button>
                </> : null}
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-button-dark-example1" className='bg-btn-100'>
                        Download
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="light">
                        <Dropdown.Item onClick={() => downloadReservationInvoice(reservation?.id)} >Download Invoice</Dropdown.Item>
                        <Dropdown.Item onClick={() => downloadReservationContract(reservation?.id)}>Download Contract</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="shadow bg-white mb-[30px] rounded-md max-w-7xl mx-auto">
                <div className="p-[20px]">
                    <div className="flex justify-between min-h-16 items-center py-3  px-6 border-b border-gray-300">
                        <h3 className=" font-medium text-gray-800 text-lg">Reservation Info</h3>
                    </div>
                    <Row>

                        <Col lg={10}>
                            <ul className='flex justify-between my-4'>
                                <li className=''>
                                    <p className='mb-2 font-medium text-gray-600'> Tariff</p>
                                    <p className='text-base text-gray-800 '> {reservation?.tariff.name} </p>
                                </li>
                                <li className=''>
                                    <p className='mb-2 font-medium text-gray-600'> Status</p>
                                    <p className='text-base text-gray-800 '>
                                        <>
                                            {Boolean(parseInt(reservation?.status) == 0) && <button className="px-2 bg-red-500 rounded-3xl text-white">Booked</button>}
                                            {Boolean(parseInt(reservation?.status) == 1) && <button className="px-2 bg-green-500 rounded-3xl text-white">In Progress</button>}
                                            {Boolean(parseInt(reservation?.status) == 2) && <button className="px-2 bg-blue-500 rounded-3xl text-white">Completed</button>}
                                        </>
                                    </p>
                                </li>

                                <li className=''>
                                    <p className='mb-2 font-medium text-gray-600'> Start Date    </p>
                                    <p className={`${'text-base text-gray-800'}`}> {reservation?.start_date ? <><ShowFormattedDate date={reservation?.start_date} hideTime /></> : 'No Start Date'} </p>
                                </li>
                                <li className=''>
                                    <p className='mb-2 font-medium text-gray-600'> End Date</p>
                                    <p className={`${'text-base text-gray-800'}`}> {<>{reservation?.end_date ? <ShowFormattedDate date={reservation?.end_date} hideTime /> : "No End Date"}</>} </p>
                                </li>
                                <li className=''>
                                    <p className='mb-2 font-medium text-gray-600'> Rend/Day</p>
                                    <p className={`${'text-base text-gray-800'}`}> {reservation?.rent ? reservation?.rent : "Rent"} </p>
                                </li>
                                <li className=''>
                                    <p className='mb-2 font-medium text-gray-600'> Bond</p>
                                    <p className={`${'text-base text-gray-800'}`}> {reservation?.bond ? reservation?.bond : "No Bond"} </p>
                                </li>
                                <li className=''>
                                    <p className='mb-2 font-medium text-gray-600'> Total Rent</p>
                                    <p className={`${'text-base text-gray-800'}`}> {reservation?.total ? reservation?.total : "N/A"} </p>
                                </li>

                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="shadow bg-white mb-[30px] rounded-md max-w-7xl mx-auto">
                <div className="p-[20px]">
                    <div className="flex justify-between min-h-16 items-center py-3  px-6 border-b border-gray-300">
                        <h3 className=" font-medium text-gray-800 text-lg">Customer Info</h3>
                    </div>
                    <Row>
                        <Col lg={2}>
                            <img width={144} height={144} className='rounded-full w-36 h-36 object-cover object-center border border-gray-300"' src={
                                Boolean(reservation?.customer?.file_name) ? (`${reservation?.customer?.file_name}`)
                                    : ("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHeu1JU1avFzQtN-az4HZqEpR1VvEBN-SEXfEuOtt8Xg&s")} alt="" />
                        </Col>
                        <Col lg={10}>
                            <ul className='flex justify-between my-4'>
                                <li className=''>
                                    <p className='mb-2 font-medium text-gray-600'> Id</p>
                                    <p className='text-base text-gray-800 '> {reservation?.customer?.id} </p>
                                </li>
                                <li className=''>
                                    <p className='mb-2 font-medium text-gray-600'> Name</p>
                                    <p className='text-base text-gray-800 '> {reservation?.customer?.full_name} </p>
                                </li>

                                <li className=''>
                                    <p className='mb-2 font-medium text-gray-600'> Email    </p>
                                    <p className={`${'text-base text-gray-800'}`}> {reservation?.customer?.email ? reservation?.customer?.email : "N/A"} </p>
                                </li>
                                <li className=''>
                                    <p className='mb-2 font-medium text-gray-600'> Phone Number</p>
                                    <p className={`${'text-base text-gray-800'}`}> {reservation?.customer?.phone ? reservation?.customer?.phone : "N/A"} </p>
                                </li>
                                <li>
                                    <Button className='bg-btn-100' onClick={() => {
                                        router.push(CompanyRoutes.customer.view.replace('[customerId]', `${reservation?.customer?.id}`))
                                    }}> View Customer   </Button>
                                </li>

                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="shadow bg-white mb-[30px] rounded-md max-w-7xl mx-auto">
                <div className="p-[20px]">
                    <div className="flex justify-between min-h-16 items-center py-3  px-6 border-b border-gray-300">
                        <h3 className=" font-medium text-gray-800 text-lg">Vehicle Info</h3>
                    </div>
                    <Row>
                        <Col lg={2}>
                            <img width={144} height={144} className='rounded-full w-36 h-36 object-cover object-center border border-gray-300"' src={
                                Boolean(reservation?.vehicle?.media[0]?.file_name) ? (
                                    `${reservation?.vehicle?.media[0]?.file_name}`
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
                                    <p className='text-base text-gray-800 '> {reservation?.vehicle?.id} </p>
                                </li>
                                <li className=''>
                                    <p className='mb-2 font-medium text-gray-600'> Status</p>
                                    <p className='text-base text-gray-800 '>
                                        {(reservation?.vehicle?.status_string) === "Cancelled" ? <button className="px-2 bg-red-500 rounded-3xl text-white">Cancel</button> : <button className="px-2 bg-blue-500 rounded-3xl text-white">{reservation?.vehicle?.status_string}</button>}
                                    </p>
                                </li>
                                <li className=''>
                                    <p className='mb-2 font-medium text-gray-600'>Car Rego</p>
                                    <p className={`${'text-base text-gray-800'}`}> {reservation?.vehicle?.rego ? reservation?.vehicle?.rego : "N/A"} </p>
                                </li>
                                <li className=''>
                                    <p className='mb-2 font-medium text-gray-600'> Vehicle Name    </p>
                                    <p className={`${'text-base text-gray-800'}`}> {reservation?.vehicle?.name ? reservation?.vehicle?.name : "N/A"} </p>
                                </li>
                                <li className=''>
                                    <p className='mb-2 font-medium text-gray-600'> Year    </p>
                                    <p className={`${'text-base text-gray-800'}`}> {reservation?.vehicle?.year ? reservation?.vehicle?.year : "N/A"} </p>
                                </li>
                                <li className=''>
                                    <p className='mb-2 font-medium text-gray-600'> Owner    </p>
                                    <p className='text-base text-gray-800 '> {reservation?.owner?.first_name} </p>
                                </li>
                                <li>
                                    <Button className='bg-btn-100' onClick={() => {
                                        router.push(CompanyRoutes.vehicle.view.replace('[vehicleId]', `${reservation?.vehicle?.id}`))
                                    }}> View Vehicle   </Button>
                                </li>

                            </ul>
                        </Col>


                    </Row>

                </div>

            </div>
            <div className="shadow bg-white mb-[30px] rounded-md max-w-7xl mx-auto">
                <div className="p-[20px]">
                    <div className="flex justify-between min-h-16 items-center py-3  px-6 border-b border-gray-300">
                        <h3 className=" font-medium text-gray-800 text-lg">Notes</h3>
                    </div>
                    <Row>
                        <Col lg={10}>

                            <ul className='flex justify-between my-4'>
                                <li className=''>
                                    <p className='text-base text-gray-800 '> {reservation?.notes ? reservation?.notes : "N/A"} </p>
                                </li>
                            </ul>
                        </Col>


                    </Row>

                </div>

            </div>


        </>
    )
}

ViewReservationDetail.getLayout = function getLayout(page: ReactElement) {
    return (<FullLayout permission={CompanyPermissions.reservations.edit}>{page}</FullLayout>)
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