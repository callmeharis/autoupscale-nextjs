
import * as yup from "yup";
import { UserEntity } from "@/models/user/user.entity";
import { Media } from "../media.entity";
export class VehicleDamageEntity {
    constructor() { }

    id?: number;
    damage_id?: string;
    title?: string;
    description?: string;
    issue_level?: any;
    // investor_id?: UserEntity;
    vehicle_id?: number;
    type?: string;
    media?: Media[];
    damage_images?:Media[];

    static yupSchema() {
        return yup.object({
            title: yup.string().required('Title is required'),
            type: yup.string().required('type is required'),
            description: yup.string().required('Description is required'),
            issue_level: yup.string().required('Damage level is required'),
            // investor_id: yup.string().required('Investor is required')

        })
    }
}
