import React, { ReactElement, useState } from "react";
import { ReservationTable } from "../../../components/reservation/reservation-table";
import { useEffectAsync } from "@/utils/react";
import { ReservationEntity } from "../../../models/admin/reservation.entity";
import FullLayout from "@/components/layouts/customer/full-layout";
import CustomerApi from "@/pages/api/customer";
export default function Reservation() {
    const [reservations, setReservations] = useState<ReservationEntity[]>([])
    const customerApi = new CustomerApi()
    useEffectAsync(async () => {
        try {
            const data = await customerApi.self.reservation.list()
            setReservations(data)
        } catch (error) {
        }
    }, [])
    return (
        <div className="max-w-7xl mx-auto bg-white h-screen" id="rental-wrapper ">
            <h1 className="pt-4 px-10 mb-6 font-bold text-3xl">RESERVATIONS</h1>
            <ReservationTable reservations={reservations} customerView />
        </div>
    );
}
Reservation.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout>{page}</FullLayout>;
};