import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BsEye } from "react-icons/bs";
import { AiOutlineDownload } from "react-icons/ai";
import { ReservationEntity } from "../../../models/admin/reservation.entity";
import DataTable from "../../../components/dataTable/viewDataTable";
import { toast } from "react-toastify";
import ReservationApi from "../../../pages/api/reservation";
import DeleteButton from "@/components/forms/base-delete";
import { Dropdown } from "react-bootstrap";
import ShowFormattedDate from "@/components/date-formatter";
import CustomerRoutes from "@/routes/customer.route";
import CompanyRoutes from "@/routes/company.route";
import { useAuth } from "@/hooks/use-auth";
import { PermissionType } from "@/types/permissions.type";
import CompanyPermissions from "@/permissions/company.permission";
export interface ReservationTableProps {
    reservations?: ReservationEntity[];
    customerView?: boolean | (() => boolean)
    isLoading?: boolean;
}
export function ReservationTable(props: ReservationTableProps) {
    const [reservations, setReservations] = useState<ReservationEntity[]>(props.reservations);
    const { user, hasPermission } = useAuth()
	const [can, setCan] = useState<PermissionType>(null)
	useEffect(() => {
		setCan({
			view: hasPermission(CompanyPermissions.reservations.view),
			edit: hasPermission(CompanyPermissions.reservations.edit),
			delete: hasPermission(CompanyPermissions.reservations.delete),
            download_invoice: hasPermission(CompanyPermissions.reservations.download_invoice),
            download_contract:hasPermission(CompanyPermissions.reservations.download_contract),
		})
	}, [user])
    const router = useRouter()
    const reservationApi = new ReservationApi();

    const onViewClickforCustomer = (id: number) => router.push(CustomerRoutes.reservations.view.replace('[reservationsId]', `${id}`))
    const onEditClick = (id: number) => router.push(CompanyRoutes.reservations.edit.replace('[reservationsId]', `${id}`))
    const onViewVehicle = (id: number) => router.push(CompanyRoutes.vehicle.view.replace('[vehicleId]', `${id}`))

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
    if (can?.download_contract || can?.download_invoice) {
        console.log('Yes Its Allow both' )
    }
    return (
        <>
            <div className="mx-5">

                <DataTable
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
                                    {Boolean(parseInt(v?.status) == 0) && <span
                                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-2 text-xs font-semibold text-red-800"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-300"></span>
                                        booked
                                    </span>
                                    }
                                    {Boolean(parseInt(v?.status) == 1) && <span
                                        className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-2 text-xs font-semibold text-green-800"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                        in-progress
                                    </span>
                                    }
                                    {Boolean(parseInt(v?.status) == 2) && <span
                                        className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2 py-2 text-xs font-semibold text-cyan-800"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-600"></span>
                                        completed
                                    </span>
                                    }
                                    {Boolean(parseInt(v?.status) == 3) && <span
                                        className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-2 text-xs font-semibold text-cyan-800"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                                        Canceled
                                    </span>

                                    }
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
                                <div className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                    <div
                                        className="relative h-10 w-10"
                                    >
                                        <img
                                            className="h-full w-full rounded-full object-cover object-center"
                                            src={Boolean(v?.vehicle?.media?.[0]?.file_name) ? v?.vehicle?.media?.[0]?.file_name : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7EkV3CX7fEqiL-PnjPzqstMql_Uu1V2vj0g&usqp=CAU"}
                                            alt=""
                                        />
                                    </div>
                                    <div className="text-sm cursor-pointer">
                                        <div className="font-medium text-gray-700 flex items-center h-full cursor-pointer" onClick={() => onViewVehicle(v?.vehicle?.id)} ><>{v?.vehicle?.name ? v?.vehicle?.name : "N/A"}</></div>

                                    </div>
                                </div>
                            )
                        },
                        {
                            name: 'Insurance',
                            selector: (v: ReservationEntity) => v?.company_insurance?.name ?? 'N/A'
                        },
                        {
                            name: 'Customer',
                            selector: (v: ReservationEntity) => v?.customer?.full_name
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
                            name: 'Violations',
                            selector: (v: ReservationEntity) => (
                                <td className="px-4 py-2 text-purple-100">
                                    <div>
                                        {v?.reservation_violation_count ?? 0}
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
                                            {can?.view && <BsEye onClick={() => onViewClickforCustomer(v?.id)} className="mx-1 cursor-pointer text-base ml-1  " color="#5236ff " />}
                                        </>
                                    ) : (
                                        <>
                                            {/* <BsEye onClick={() => onViewClick(v?.id)} className="mx-1 text-black " /> */}
                                            {can?.view &&<BsEye onClick={() => onEditClick(v?.id)} className="mx-1 cursor-pointer text-base ml-1  " color="#5236ff " />}
                                            {can?.delete &&  <DeleteButton onDelete={() => onDeleteClick(v?.id)} className="mx-1 cursor-pointer text-base ml-1  " color="#5236ff " />}
                                        </>
                                    )}
                                   { (can?.download_contract || can?.download_invoice) &&
                                    <div className="menu-dropdown">
                                        <Dropdown>
                                            <Dropdown.Toggle id="dropdown-button-dark-example1" className=' mx-1 cursor-pointer text-base ml-1 border-none p-0 flex hover:bg-transparent focus:outline-none active:bg-transparent bg-none text-black'>
                                                <AiOutlineDownload className="text-btn-100 text-2xl text-black" />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu variant="light">
                                               {can?.download_invoice && <Dropdown.Item onClick={() => downloadReservationInvoice(v?.id)}>Download Invoice</Dropdown.Item>}
                                                {can?.download_contract && <Dropdown.Item onClick={() => downloadReservationContract(v?.id)}>Download Contract</Dropdown.Item>}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    
                                    }
                                </div>
                            )
                        },
                    ]}
                />


            </div>
        </>
    );
}