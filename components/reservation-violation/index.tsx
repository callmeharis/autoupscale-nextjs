import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ReservationViolationTable } from "../reservation-violation/reservation-violation-table";
import { CreateReservationViolation } from "../reservation-violation/create";
import ViewModal from "../view-modal";
import { EditReservationViolation } from "./reservation-edit-violation";
import { ReservationViolationEntity } from "@/models/admin/violation/reservation.violation.entity";
import { ReservationEntity } from "@/models/admin/reservation.entity";
import ReservationViolationApi from "@/pages/api/reservation.violation";
import { toast } from "react-toastify";

export default function ReservationViolation({ reservation }) {
  const [reservationData, setReservationData] =
    useState<ReservationEntity>(reservation);
    const [reservationViolationData, seteservationViolationData] =
    useState<ReservationViolationEntity[]>(reservation?.violations);
  const [addViolation, setAddViolation] = useState<boolean>(false);
  const [editViolation, setEditViolation] = useState<number>(null);
  
  const handleOnSave = (data: ReservationViolationEntity) => {
    const findReservationViolation = reservationViolationData.findIndex(v => v.id === data.id);
    if (findReservationViolation !== -1) {
        const updatedReservationVoilation = [
            ...reservationViolationData.slice(0, findReservationViolation), data, ...reservationViolationData.slice(findReservationViolation + 1)
        ];

        seteservationViolationData(updatedReservationVoilation);
    } else {
        seteservationViolationData([data, ...reservationViolationData]);
    }
    setEditViolation(null);
    setAddViolation(false)
}
  
  return (
    <>
      <Row className="mb-0 mt-4 mx-5">
        <Col lg={1} className="p-0">
          <h1 className=" mb-6 font-bold text-3xl">Violations</h1>
        </Col>
        <Col className="text-end p-0" lg={11}>
          <Row>
            <Col className="flex">
              <Col>
                {
                  <Button
                    className="ml-2 bg-btn-100 mb-3 w-[153px]"
                    onClick={() => setAddViolation(true)}
                  >
                    Add Violation
                  </Button>
                }
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>
      <ReservationViolationTable
        reservationViolationData={reservationViolationData}
        seteservationViolationData={seteservationViolationData}
        setEditViolation={setEditViolation}
        
      />
      
      <ViewModal
        show={addViolation}
        onCloseClick={() => setAddViolation(false)}
        header="Reservation Violation"
      >
        <CreateReservationViolation reservationId={reservationData?.id} onSave={handleOnSave}/>
      </ViewModal>

      <ViewModal
        show={Boolean(editViolation)}
        onCloseClick={() => setEditViolation(null)}
        header="Reservation Violation"
      >
        <EditReservationViolation reservationViolationId={editViolation} onSave={handleOnSave}/>
      </ViewModal>
    </>
  );
}
