import { UserEntity } from "@/models/user/user.entity";
import { CompanyInvestorsEntity } from "../../models/admin/company/company-investors.entity";
import { Feature } from "../../models/admin/feature.entity";
import { VehicleBodyTypeEntity } from "../../models/admin/vehicle/vehicle-body-type.entity";
import { VehicleBrandEntity } from "../../models/admin/vehicle/vehicle-brand.entity";
import { VehicleColorEntity } from "../../models/admin/vehicle/vehicle-colors.entity";
import { VehicleFuelTypeEntity } from "../../models/admin/vehicle/vehicle-fuel-type.entity";
import { VehicleGroupEntity } from "../../models/admin/vehicle/vehicle-group.entity";
import { VehicleTransmissionTypeEntity } from "../../models/admin/vehicle/vehicle-transmission.entity";
import { VehicleEngineTypeEntity } from "../../models/admin/vehicle/vehicle-type-of-engine.entity";
import { VehicleTypeEntity } from "@/models/admin/vehicle/vehicle-type.entity";
import { InvestorEntity } from "@/models/admin/investor/investor.entity";

export type GetVehiclesDropdownOptions = {
    groups?: VehicleGroupEntity[];
    colors?: VehicleColorEntity[];
    brands?: VehicleBrandEntity[];
    engine_types?: VehicleEngineTypeEntity[];
    transmission_types?: VehicleTransmissionTypeEntity[];
    body_types?: VehicleBodyTypeEntity[];
    vehicle_types?: VehicleTypeEntity[];
    features?: Feature[];
    fuel_types?: VehicleFuelTypeEntity[];
    investors?: InvestorEntity[];

}
