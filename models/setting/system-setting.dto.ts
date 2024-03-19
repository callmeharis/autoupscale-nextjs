
import * as yup from "yup";
import { VehicleTypeEntity } from "../admin/vehicle/vehicle-type.entity";
import { PaymentMethodsEntity } from "../admin/system/payments-methods.entity";
import { TariffEntity } from "../admin/system/tariff.entity";
export class SystemSettingDto {
    constructor() { }
    id?: number;
    payment_methods?: PaymentMethodsEntity[];
    payment_methods_ids?: number[] | string[];
    tariffs?: TariffEntity[];
    tariff_ids?: number[] | string[];
    vehicle_types?: VehicleTypeEntity[];
    vehicle_type_ids?: number[] | string[];
}
