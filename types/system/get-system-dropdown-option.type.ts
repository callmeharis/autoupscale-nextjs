import { PaymentMethodsEntity } from "@/models/admin/system/payments-methods.entity";
import { TariffEntity } from "@/models/admin/system/tariff.entity";
import { VehicleTypeEntity } from "@/models/admin/vehicle/vehicle-type.entity";

export type GetSystemDropdownOptions = {
    vehicle_types?: VehicleTypeEntity[];
    payment_methods?:PaymentMethodsEntity[];
    tariffs?:TariffEntity[];
}