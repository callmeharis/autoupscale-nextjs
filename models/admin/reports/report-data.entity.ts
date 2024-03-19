import * as yup from 'yup';
import { UserEntity } from '../../user/user.entity';
import { VehicleEntity } from '../vehicle/vehicle.entity';
import { TariffEntity } from '../system/tariff.entity';
export class ReportDataEntity {
  constructor() {}
  address?: string;
  bond?: number;
  customer_contact?: string;
  customer_email?: string;
  customer_name?: string;
  units?: number;
  end_date?: string;
  id?: number;
  licence_image?: string;
  licence_no?: number;
  notes?: string;
  rego?: string;
  start_date?: string;
  state_country?: string;
  total?: number;
  vehicle_id?: number;
  vehicle_name?: string;
  rent?: number;
  // for filters
  owner_id?: number;
  customer_id?: number;
  status?: number;
  status_string?: string;
  customer?: UserEntity;
  vehicle?: VehicleEntity;
  investor?: UserEntity;
  tariff?: TariffEntity;
  static yupSchema() {
    return yup.object({
      address: yup.string().required().nullable(),
      bond: yup.number().required().nullable(),
      customer_contact: yup.string().required().nullable(),
      customer_email: yup.string().required().nullable(),
      customer_name: yup.string().required().nullable(),
      days: yup.number().required().nullable(),
      end_date: yup.date().required().nullable(),
      id: yup.number().required().nullable(),
      licence_image: yup.string().required().nullable(),
      licence_no: yup.number().required().nullable(),
      notes: yup.string().required().nullable(),
      rego: yup.string().required().nullable(),
      start_date: yup.date().required().nullable(),
      state_country: yup.string().required().nullable(),
      tariff: yup.string().required().nullable(),
      total: yup.number().required().nullable(),
      vehicle_id: yup.number().required().nullable(),
      vehicle_name: yup.array().required().nullable(),
    });
  }

  static reportsFiltersYupSchema() {
    return yup.object({
      owner_id: yup.number().positive().nullable(),
      customer_id: yup.number().positive().nullable(),
      vehicle_id: yup.string().nullable(),
      start_date: yup.date().nullable(),
      end_date: yup.date().nullable(),
      status: yup.number().nullable(),
    });
  }
}
