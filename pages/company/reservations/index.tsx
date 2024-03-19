import React, { ReactElement, useEffect, useState } from "react";
import { ReservationTable } from "../../../components/reservation/reservation-table";
import FullLayout from "../../../components/layouts/company/full-layout";
import { Button, Col, Row } from "react-bootstrap";
import router from "next/router";
import ReservationApi from "../../api/reservation";
import { useEffectAsync } from "@/utils/react";
import { ReservationEntity } from "../../../models/admin/reservation.entity";
import CompanyRoutes from "@/routes/company.route";
import { EmptyData } from "@/components/empty-data";
import CompanyPermissions from "@/permissions/company.permission";
import { useAuth } from "@/hooks/use-auth";
import { PermissionType } from "@/types/permissions.type";

export default function Reservation() {
    const [reservations, setReservations] = useState<ReservationEntity[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { user, hasPermission } = useAuth()
	const [can, setCan] = useState<PermissionType>(null)
	useEffect(() => {
		setCan({
			create: hasPermission(CompanyPermissions.reservations.create),
			
		})
	}, [user])
    const reservationApi = new ReservationApi();

    useEffectAsync(async () => {
        try {
            const data = await reservationApi.list();
            setReservations(data);
            setIsLoading(false); // Set isLoading to false when the data is fetched
        } catch (error) {
            setIsLoading(false); // Set isLoading to false even when there's an error
        }
    }, []);

    return (
        <div className="max-w-7xl mx-auto" id="rental-wrapper ">
            <Row className="py-4 mx-5">
                <Col lg={9} className="p-0"><h1 className="  mb-6 font-bold text-3xl">RESERVATIONS</h1></Col>
                <Col lg={3} className="p-0 text-end">
                   {can?.create && <Button
                        className="bg-btn-100"
                        onClick={() => router.push(CompanyRoutes.reservations.create)}
                    >
                        Add RESERVATION
                    </Button>}
                </Col>
            </Row>

         
                <ReservationTable reservations={reservations} isLoading={isLoading} />
        
        </div>
    );
}

Reservation.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout permission={CompanyPermissions.reservations.index}>{page}</FullLayout>;
};
