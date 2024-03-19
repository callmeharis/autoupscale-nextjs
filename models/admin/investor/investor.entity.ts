import * as yup from "yup";
import { Media } from "../media.entity";

export class InvestorEntity {
    // Indent issues
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    address?: string;
    phone?: string;
    image?: Media;
    city?: string;
    state?: string;
    file_name?: string;
    thumbnail?: string;
    created_at?: string;
    dob?: string;
    registration_no?: string;
    status?: string;
    type?: string;
    country?:string;
    zip_code?:string;
    full_name?: string;


    static yupSchemaForInvestor() {
        return yup.object({
            first_name: yup.string().max(255).required().nullable(),
            last_name: yup.string().max(255).required().nullable(),
            email: yup.string().trim().email().required().nullable(),
            address: yup.string().required().nullable(),
            phone: yup.string().max(255).required().nullable(),
            registration_no: yup.string().max(20).required("Id card no is a required field").nullable(),
            dob: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/).required().nullable()
        })
    }
    static createInvestorYupSchema() {
        return yup.object({
            first_name: yup
                .string()
                .trim()
                .required("First name is required ")
                .nullable()
                .max(255, "first name cannot exceed 255 character"),
            last_name: yup
                .string()
                .trim()
                .required("Last name is required ")
                .nullable()
                .max(255, "last name cannot exceed 255 character"),
            email: yup
                .string()
                .trim()
                .email("Invalid Email Format")
                .required("Email is required")
                .nullable()
                .max(255, "email cannot exceed 255 character"),
            address: yup.string().required("Address is required").nullable(),
            phone: yup.string().required("Phone is required").nullable(),
            registration_no: yup.number().optional().nullable(),
            state: yup.string().optional().nullable(),
        });
    }

}
