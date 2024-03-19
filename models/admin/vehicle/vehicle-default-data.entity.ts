import * as yup from "yup";
import { VehicleBodyTypeEntity } from "./vehicle-body-type.entity";
import { VehicleBrandEntity } from "./vehicle-brand.entity";
import { VehicleColorEntity } from "./vehicle-colors.entity";
import { VehicleGroupEntity } from "./vehicle-group.entity";
import { VehicleTransmissionTypeEntity } from "./vehicle-transmission.entity";
import { VehicleEngineTypeEntity } from "./vehicle-type-of-engine.entity";


export class VehicleDefaultDataEntity {
    constructor() { }
    groups?: VehicleGroupEntity[];
    types?: VehicleBodyTypeEntity[];
    brands?: VehicleBrandEntity[];
    colors?: VehicleColorEntity[];
    engine_types?: VehicleEngineTypeEntity[];
    transmission_types?: VehicleTransmissionTypeEntity[];

    static yupSchema() {
        return yup.object().shape({
            groups: yup.array().of(
                yup.object().shape({
                    id: yup.number().required().nullable(),
                    name: yup.string().required(),
                })
            ),
            types: yup.array().of(
                yup.object().shape({
                    id: yup.number().required().nullable(),
                    name: yup.string().required(),
                })
            ),
            brands: yup.array().of(
                yup.object().shape({
                    id: yup.number().required().nullable(),
                    name: yup.string().required(),
                })
            ),
            colors: yup.array().of(
                yup.object().shape({
                    id: yup.number().required().nullable(),
                    name: yup.string().required(),
                })
            ),
            engine_types: yup.array().of(
                yup.object().shape({
                    id: yup.number().required().nullable(),
                    name: yup.string().required(),
                })
            ),
            transmission_types: yup.array().of(
                yup.object().shape({
                    id: yup.number().required().nullable(),
                    name: yup.string().required(),
                })
            ),
        });
    }

}
