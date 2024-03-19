import * as yup from "yup";
export class ManagerPermissionDto {
    customer?: number[];
    investor?: number[];
    manager?: number[];
    other?: number[];
    report?: number[];
    reserve?: number[];
    vehicle?: number[];
    static yupschema() {
        return yup.object({
            customer: yup.array().of(yup.number()).optional(),
            investor: yup.array().of(yup.number()).optional(),
            manager: yup.array().of(yup.number()).optional(),
            other: yup.array().of(yup.number()).optional(),
            report: yup.array().of(yup.number()).optional(),
            reserve: yup.array().of(yup.number()).optional(),
            vehicle: yup.array().of(yup.number()).optional(),
        })
    }
}
