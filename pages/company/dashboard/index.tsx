import React, { ReactElement, useState } from "react";
import FullLayout from "../../../components/layouts/company/full-layout";
import { DashboardReservationTable } from "@/components/dashboard";
import ReservationApi from "../../../pages/api/reservation";
import { ReservationEntity } from "../../../models/admin/reservation.entity";
import { useEffectAsync } from "../../../utils/react";
import { EmptyData } from "../../../components/empty-data";
import CompanyRoutes from "../../../routes/company.route";
import { Col, Row } from "react-bootstrap";
import Charts from "@/components/dashboard/charts";
import DataTable from "@/components/dataTable/viewDataTable";
import { BiEditAlt } from "react-icons/bi";
import DeleteButton from "@/components/forms/base-delete";
import { Maintenance } from "@/components/dashboard/maintenance";
import Reports from "../reports";
import { DashboardReports } from "@/components/dashboard/reports";
import DashboardTimeline from "@/components/dashboard/dashboard-timeline";

export default function Dashboard() {
	const [reservations, setReservations] = useState<ReservationEntity[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const reservationApi = new ReservationApi()
	useEffectAsync(async () => {
		try {
			const data = await reservationApi.list()
			setReservations(data)
			if (data) setIsLoading(false)
		} catch (error) {
		}
	}, [])
	return (
		<>
			<Row className="my-4 mx-5 ">
				<div className="text-start p-0 col-lg-4">
					<h1 className=" mb-6 font-bold text-3xl">Dashboard</h1>
				</div>

			</Row>
			<Row className="container-fluid">
				<Col lg={6}>
					<div className="mx-5">
						<h2 className="text-2xl font-semibold text-gray-800 "> Cars</h2>
						<Charts />

					</div>

				</Col>
				<Col lg={6}>
					<Maintenance />


				</Col>

			</Row>
			<div>
				<h2 className="text-2xl font-semibold text-gray-800 my-3 mx-5"> Reservations</h2>
				<DashboardReservationTable reservations={reservations} isLoading={isLoading} />
			</div>
			<div className="mx-5 mb-5">
				<h2 className="text-2xl font-semibold text-gray-800 my-3 "> Reports</h2>
				<DashboardReports />
			</div>
			<div className="mx-5 mb-5 hidden md:block">
				<h2 className="text-2xl font-semibold text-gray-800 my-3 "> Time Line</h2>
				<DashboardTimeline />
			</div>
		</>
	);
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
	return <FullLayout>{page}</FullLayout>;
};
