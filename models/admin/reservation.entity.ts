import * as yup from "yup";
import { Company } from "./company/company.entity";
import { UserEntity } from "../user/user.entity";
import { VehicleEntity } from "./vehicle/vehicle.entity";
import { TariffEntity } from "./system/tariff.entity";
import Insurance from "@/components/insurance/insurance-table";
import { InsuranceEntity } from "./insurance/insurance.entity";
import { ReservationViolationEntity } from "./violation/reservation.violation.entity";
export class ReservationEntity {
  constructor() {}
  id?: number;
  start_date?: string | Date;
  end_date?: string | Date;
  rent?: number;
  bond?: string;
  notes?: string;
  days?: string;
  start_reading?: number;
  end_reading?: number;
  status?: string;
  //tariff?: string;
  tariff_id?: number;
  tariff?: TariffEntity;
  total?: string;
  booking_hours?: string;
  // Relations
  vehicle?: VehicleEntity;
  company?: Company;
  customer?: UserEntity;
  owner?: UserEntity;
  manager?: UserEntity;
  customer_id?: number;
  status_string?: string;
  vehicle_id?: number;
  company_insurance_id?: number;
  company_insurance?: InsuranceEntity;
  remarks?: string;
  reservation_violation_count?: number;
  due_amount?: number;
  payment_type?: string;
  violations?: ReservationViolationEntity[];

  static createReservationSchema() {
    return yup.object({
      vehicle_id: yup.number().required("Vehicle is required").nullable(),
      notes: yup.string().optional(),
      //tariff: yup.string().required('Tariff is required').nullable(),
      tariff_id: yup.number().required('Tariff is required'),
      start_date: yup.string().required('Start date is required').nullable(),
      rent: yup.number().required('Rent is required').typeError('Rent must be a number').positive('Rent must be positive').optional().nullable(),
      bond: yup.number().optional().nullable().positive('Bond must be positive').typeError('Bond must be a number'),
      customer_id: yup.number().required("Customer is required").typeError('Customer ID must be a number'),
      start_reading: yup.number().optional().typeError('Start reading must be a number').positive('Start Reading must be positive').nullable(),
      end_reading: yup.number().optional().nullable().positive('End Reading must be positive'),
      company_insurance_id: yup.number().optional(),
    });
  }
  static updateReservationSchema() {
    return yup.object({
      vehicle_id: yup.number().required("Vehicle is required").nullable(),
      notes: yup.string().optional().nullable(),
      //tariff: yup.string().required('Tariff is required').nullable(),
      start_date: yup.string().required('Start date is required').nullable(),
      rent: yup.number().typeError('Rent must be a number').positive('Rent must be positive').optional().nullable(),
      bond: yup.number().optional().nullable().positive('Bond must be positive').typeError('Bond must be a number'),
      customer_id: yup.number().required("Customer is required").typeError('Customer ID must be a number'),
      start_reading: yup.number().optional().typeError('Start reading must be a number').positive('Start Reading must be positive').nullable(),
      end_reading: yup.number().optional().nullable().positive('End Reading must be positive'),
      status: yup.number().required('status is required').nullable(),
    });
  }
  static viewReservationSchema() {
    return yup.object({
      notes: yup.string().optional().nullable(),
      end_reading: yup.number().optional().nullable(),
    });
  }
}
