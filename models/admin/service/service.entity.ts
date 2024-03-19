import * as yup from "yup";
import { VehicleEntity } from "../vehicle/vehicle.entity";
import { MaintenanceEntity } from "../maintenance/maintenance.entity";
import { GarageEntity } from "../garage/garage.entity";
export class ServiceEntity {
    constructor() { }
    id?: number;
    vehicle_id?: number;
    maintenance_ids?:number[] | string[];
    start_date?: string | Date;
    end_date?: string | Date;
    garage_id?: number;
    odometer?: number;
    one_day_maintenance?: Boolean;
    garage?: GarageEntity;
    vehicle?: VehicleEntity;
    maintenances?: MaintenanceEntity[];

    static createServiceYupSchema() {
        return yup.object({
            start_date: yup.string().required('Start date is required').nullable(),
            end_date: yup.string().optional().nullable(),
            vehicle_id: yup.number().required('Vehicle is requierd').nullable(),
            garage_id: yup.number().optional().nullable(),
            odometer: yup.number().required('Odometer is requierd').nullable(),
        })
    }

    static updateServiceYupSchema() {
        return yup.object({
            start_date: yup.string().required('Start date is required').nullable(),
            end_date: yup.string().nullable(),
            vehicle_id: yup.number().required('Vehicle is requierd').nullable(),
            garage_id: yup.number().required('Garage is requierd').nullable(),
            odometer: yup.number().required('Odometer is requierd').nullable(),
        })
    }

}