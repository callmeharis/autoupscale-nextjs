import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BsEye } from "react-icons/bs";
import { ReservationEntity } from "../../../models/admin/reservation.entity";
import DataTable from "../../../components/dataTable/viewDataTable";
import ShowFormattedDate from "../../../components/date-formatter";
import { Dropdown } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import ReservationApi from "@/pages/api/reservation";
import { toast } from "react-toastify";
import CompanyRoutes from "../../../routes/company.route";
export interface ReservationTableProps {
    reservations?: ReservationEntity[];
    customerView?: boolean | (() => boolean)
    isLoading?: boolean;
}
export function DashboardReservationTable(props: ReservationTableProps) {
    const [reservations, setReservations] = useState<ReservationEntity[]>(props.reservations);
    const router = useRouter()
    const reservationApi = new ReservationApi();

    const onViewClickforCustomer = (id: number) => router.push(CompanyRoutes.reservations.view.replace('[reservationsId]', `${id}`))
    const onEditClick = (id: number) => router.push(CompanyRoutes.reservations.edit.replace('[reservationsId]', `${id}`))

    const onDeleteClick = async (id: number) => {
        const reservationApi = new ReservationApi();
        try {
            await reservationApi.remove(id);
            setReservations(reservations.filter(v => v.id != id))
            toast.success("Reservation Removed Successfully")
        } catch (error) {
            toast.error("Reservation couldn't removed")
        }
    };

    useEffect(() => {
        setReservations(props.reservations);
    }, [props]);

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
            console.log(error)
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
            console.log(error)
        }
    };

    return (
        <>
            <div className="mx-5">
                <DataTable
                className="h-72 overflow-y-auto"
                    buttonTitle="Add Reservation"
                    buttonRoute={CompanyRoutes.reservations.create}
                    data={reservations}
                    isLoading={props.isLoading}
                    columns={[
                        {
                            name: 'Id',
                            selector: (v: ReservationEntity) => v?.id
                        },
                        {
                            name: 'Status',
                            selector: (v: ReservationEntity) => (
                                <>
                                    {Boolean(parseInt(v?.status) == 0) && <button className="px-2 bg-red-500 rounded-3xl text-white">Booked</button>}
                                    {Boolean(parseInt(v?.status) == 1) && <button className="px-2 bg-green-500 rounded-3xl text-white">In Progress</button>}
                                    {Boolean(parseInt(v?.status) == 2) && <button className="px-2 bg-blue-500 rounded-3xl text-white">Completed</button>}
                                    {Boolean(parseInt(v?.status) == 3) && <button className="px-2 bg-red-500 rounded-3xl text-white">Cancelled</button>}
                                </>
                            )
                        },
                        {
                            name: 'Car Rego',
                            selector: (v: ReservationEntity) => v?.vehicle?.rego
                        },
                        {
                            name: 'Vehicle',
                            selector: (v: ReservationEntity) => (
                                <p className="text-blue-600 font-bold">
                                    <p className="vehicle-wrap__title ">
                                        <p className="text-blue-600 flex space-x-5 font-bold object-cover items-center">

                                            <img src=
                                                {Boolean(v?.vehicle?.media?.[0]?.file_name) ? v?.vehicle?.media?.[0]?.file_name : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7EkV3CX7fEqiL-PnjPzqstMql_Uu1V2vj0g&usqp=CAU"}
                                                className="object-cover h-20 w-20 rounded-full mx-3" alt="" />
                                            <p className="cursor-pointer">
                                                <>{v?.vehicle?.name ? v?.vehicle?.name : "N/A"}</>
                                            </p>

                                        </p>
                                    </p>
                                </p >
                            )
                        },
                        {
                            name: 'Start Date',
                            selector: (v: ReservationEntity) => (
                                <div className="flex">
                                    <span className="align-top">
                                        <>
                                            {v?.start_date ? <ShowFormattedDate date={v?.start_date} hideTime /> : "N/A"}
                                        </>
                                    </span>
                                </div>
                            )
                        },
                        // End_Date
                        {
                            name: 'End Date',
                            selector: (v: ReservationEntity) => (
                                <div className="flex">
                                    <span className="align-top">
                                        <>
                                            {v?.end_date ? <ShowFormattedDate date={v?.end_date} hideTime /> : "N/A"}
                                        </>
                                    </span>
                                </div>
                            )
                        },
                        {
                            name: 'Rent',
                            selector: (v: ReservationEntity) => (
                                <td className="px-4 py-2 text-purple-100">
                                    <div>
                                        {v?.rent ? v?.rent : "N/A"}{v.rent ? '£' : null} | {v?.tariff?.name}
                                    </div>
                                </td>
                            )
                        },
                        {
                            name: 'Actions',
                            cell: (v: ReservationEntity) => (
                                <div className="flex items-center text-purple-600 text-[24px]">


                                    {Boolean(props?.customerView) ? (
                                        <>
                                            <BsEye onClick={() => onViewClickforCustomer(v?.id)} className="mx-1 text-black " />
                                        </>
                                    ) : (
                                        <>
                                            {/* <BsEye onClick={() => onViewClick(v?.id)} className="mx-1 text-black " /> */}
                                            <BsEye onClick={() => onEditClick(v?.id)} className="text-black" />
                                        </>
                                    )}
                                    <div className="menu-dropdown">
                                        <Dropdown>
                                            <Dropdown.Toggle id="dropdown-button-dark-example1" className='border-none p-0 flex hover:bg-transparent focus:outline-none active:bg-transparent bg-none text-black'>
                                                <AiOutlineDownload className="text-btn-100 text-2xl text-black" />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu variant="light">
                                                <Dropdown.Item onClick={() => downloadReservationInvoice(v?.id)}>Download Invoice</Dropdown.Item>
                                                <Dropdown.Item onClick={() => downloadReservationContract(v?.id)}>Download Contract</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            )
                        },
                    ]}
                />
            </div>

        </>


    );

}
