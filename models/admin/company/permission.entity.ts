import * as yup from "yup";
import { Feature } from "../feature.entity";
export class PermissionEntity {
    permission_ids?: number[];
    id?: number
    name?: string;
    description?: string;
    type?: string;
    static yupschema() {
        return yup.object({
            name: yup.string().optional(),
            description: yup.string().optional(),
        })
    }
}
