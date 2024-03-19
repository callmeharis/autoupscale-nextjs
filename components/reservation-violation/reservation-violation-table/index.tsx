import DataTable from "@/components/dataTable/viewDataTable";
import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { PermissionType } from "@/types/permissions.type";
import DeleteButton from "@/components/forms/base-delete";
import ViolationApi from "@/pages/api/violation";
import { toast } from "react-toastify";
import { ReservationViolationEntity } from "@/models/admin/violation/reservation.violation.entity";
import ShowFormattedDate from "@/components/date-formatter";
import ReservationViolationApi from "@/pages/api/reservation.violation";
export interface violationProps {
  reservationViolationData?: ReservationViolationEntity[];
  seteservationViolationData?: (e: any) => void;
  setEditViolation?: (e: any) => void;
  onSave?: (e: any) => void;
  can?: PermissionType;
}
export function ReservationViolationTable(props: violationProps) {
  const onDeleteClick = async (id: number ) => {
    const violationApi = new ReservationViolationApi();
    try {
      await violationApi.remove(id);
      props?.seteservationViolationData(
        props.reservationViolationData.filter((v) => v.id != id)
      );
      toast.success("Violation Removed Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Violation couldn't be removed");
    }
  };

  return (
    <>
      <div>
        <div className=" my-3">
          <DataTable
            data={props?.reservationViolationData}
            columns={[
              {
                name: "ID",
                selector: (v: ReservationViolationEntity) => (
                  <>{v?.id ?? "N/A"}</>
                ),
              },

              {
                name: "Type",
                selector: (v: ReservationViolationEntity) => (
                  <>{v?.violation?.name ?? "N/A"}</>
                ),
              },
              {
                name: "Comment",
                selector: (v: ReservationViolationEntity) => (
                  <>{v?.comment ?? "N/A"}</>
                ),
              },
              {
                name: "Fine Amount",
                selector: (v: ReservationViolationEntity) => (
                  <>{v?.fine_amount ?? "N/A"}</>
                ),
              },
              {
                name: "Violated At",
                selector: (v: ReservationViolationEntity) => (
                  <>
                    {v?.violation_at ? (
                      <ShowFormattedDate date={v?.violation_at} hideTime />
                    ) : (
                      "N/A"
                    )}
                  </>
                ),
              },
              {
                name: "Actions",
                cell: (v: ReservationViolationEntity) => (
                  <div className="flex text-[24px] text-slate-600">
                    {
                      <BiEditAlt
                        className="mx-1 cursor-pointer text-base ml-1  "
                        onClick={() => props?.setEditViolation(v?.id)}
                        color="#13B8A6 "
                      />
                    }
                    {
                      <DeleteButton
                        onDelete={() => onDeleteClick(v?.id)}
                        className="cursor-pointer text-base ml-1 "
                        color="#13B8A6"
                      />
                    }
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
