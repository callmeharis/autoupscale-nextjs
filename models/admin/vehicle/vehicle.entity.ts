import * as yup from "yup";
import { UserEntity } from "../../../models/user/user.entity";
import { Company } from "../company/company.entity";
import { Feature } from "../feature.entity";
import { Media } from "../media.entity";
import { VehicleBodyTypeEntity } from "./vehicle-body-type.entity";
import { VehicleBrandEntity } from "./vehicle-brand.entity";
import { VehicleGroupEntity } from "./vehicle-group.entity";
import { VehicleModelEntity } from "./vehicle-model.entity";
import { VehicleTransmissionTypeEntity } from "./vehicle-transmission.entity";
import { VehicleEngineTypeEntity } from "./vehicle-type-of-engine.entity";
import { VehicleTypeOfFuel } from "./vehicle-type-of-fuel.entity";
import { VehicleDamageEntity } from "./vehicle-damage.entity";
import { VehicleTypeEntity } from "./vehicle-type.entity";
import { TariffEntity } from "../tariff.entity";
import { DocumentEntity } from "../document/document.entity";

export class VehicleEntity {
    constructor() { }

    id?: number;
    name?: string;
    name_and_rego?: string;
    year?: number;
    created_at?: string;
    status?: number; // backeden integer
    status_string?: string;
    odometer?: number;
    fuel_level?: string;
    volume_tank?: string;
    air_bags?: number;
    vin?: string;
    rego?: string;
    default_price?: string;  // backeden integer
    number_of_seat?: number;
    number_of_door?: number;
    damages_count?: number;
    total_earning?: number;
    group_id?: number;
    transmission_id?: number;
    brand_id?: number;
    model_id?: number;
    type_of_engine_id?: number;
    type_of_fuel_id?: number;
    body_type_id?: number;
    color?: string;
    feature_ids?: number[];
    rental?: Company; // rental
    model?: VehicleModelEntity; // model
    group?: VehicleGroupEntity;
    transmission?: VehicleTransmissionTypeEntity;
    engine_type?: VehicleEngineTypeEntity;
    fuel_type?: VehicleTypeOfFuel;
    vehicle_type?: VehicleTypeEntity;
    body_type?: VehicleBodyTypeEntity;
    features?: Feature[];
    media?: Media[];
    investor?: UserEntity;
    customer?: UserEntity;
    brand?: VehicleBrandEntity;
    price?: TariffEntity;
    damage?: VehicleDamageEntity;
    damages?: VehicleDamageEntity[];
    user_id?: number;
    vehicle_type_id?: number;
    documents?: DocumentEntity[] ;
    per_hour?: number;
	per_day?: number;
	per_week?: number;
    per_month?: number;

    static yupSchema() {
        return yup.object({
            user_id: yup.number().positive().required('Investor is required').nullable(),
            vehicle_type_id: yup.number().positive().optional().nullable(),
            name: yup.string().optional().nullable(),
            year: yup.number().required('Year is required').nullable().min(1900, "Invalid year").max(2050, 'Invalid year').typeError('Year must be a number'),
            fuel_level: yup.number().optional().nullable().min(1, " Must be greater than or equal to 1").max(100, ' Must be less than or equal to 100').typeError('Fuel Level must be a number'),
            volume_tank: yup.string().optional().nullable(),
            odometer: yup.number().typeError('Odometer must be a number').positive('Odometer must be a positive number').max(9999999, 'Less than or equal to 9999999').optional().nullable(),
            vin: yup.string().optional().nullable(),
            rego: yup.string().required('Registration number is required').nullable(),
            default_price: yup.number().optional().nullable().typeError('Per day price must be a number'),
            number_of_door:   yup.number().optional().nullable().typeError('Number of doors must be a number').min(1, " Must be greater than or equal to 1").max(10, ' Must be less than or equal to 10'),
            number_of_seat:   yup.number().optional().nullable().typeError('Number of seats must be a number').min(1, "Must be greater than or equal to 1").max(10, ' Must be less than or equal to 10'),
            consumption: yup.string().optional().nullable(),
            body_type_id: yup.number().optional().positive().nullable().typeError('Body type must be a number'),
            group_id: yup.number().positive().optional().nullable().typeError('Group does not exist'),
            brand_id: yup.number().positive().required('Brand is required').nullable().typeError('Brand does not exist'),
            model_id: yup.number().positive().required('Model is required').nullable().typeError('Model does not exist'),
            color: yup.string().nullable(),
            transmission_id: yup.number().optional().positive().nullable().typeError('Transmission does not exist'),
            type_of_engine_id: yup.number().optional().positive().nullable().typeError('Engine type does not exist'),
            type_of_fuel_id: yup.number().optional().positive().nullable().typeError('Fuel type does not exist'),
            damageCount: yup.number().optional().nullable().typeError('Damage count must be a number'),
            air_bags: yup.number().nullable().typeError('Air Bags must be a number').optional(),
            per_hour: yup.number().positive().required("Vehicle's hourly rate is required"),
            per_day: yup.number().positive().required("Vehicle's daily rate is required"),
            per_week: yup.number().positive().required("Vehicle's weekly rate is required"),
            per_month: yup.number().positive().required("Vehicle's monthly rate is required"),
        })
    }



    static vehicleFiltersYupSchema() {
        return yup.object({
            body_type_id: yup.number().positive().nullable(),
            user_id: yup.number().positive().nullable(),
            brand_id: yup.number().positive().nullable(),
            status: yup.number().nullable(),
            transmission_id: yup.number().positive().nullable(),
            model_id: yup.number().positive().nullable(),

        })
    }
}