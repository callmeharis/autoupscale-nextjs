import * as yup from "yup";
import { LicenseEntity } from "../license.entity";
import { Company } from "../company/company.entity";
import { Media } from "../media.entity";

export class CustomerEntity {
    // Indent issues
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    dob?: string;
    image?: Media;
    registration_no?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    file_name?: string;
    thumbnail?: string;
    license?: LicenseEntity;
    expiry_date?: string;
    licence_no?: string;
    created_at?:string;
    front_image?: any;
    back_image?: any;
    whatsapp_no?: string;
    full_name?: string;
    bsb?: string;
    emergency_name?: string;
    emergency_number?: string;
    link_account_number?: string;
    account_number?: string;

    static createCustomerYupSchema() {
        return yup.object({
            phone: yup.string().trim().required('Phone is required').nullable(),
            first_name: yup.string().trim().required('First name is required').nullable(),
            last_name: yup.string().trim().required('Last name is required').nullable(),
            email: yup.string().trim().email().required('Email is required').nullable(),
            city: yup.string().required('City is required'),
            state: yup.string().required('State is required'),
            dob: yup.string().required('Date of birth is required').matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
                .test('age', 'Age must be 18 years or above', (value) => {
                    if (!value) {
                        return true;
                    }
                    const dob = new Date(value);
                    const today = new Date();
                    const age = today.getFullYear() - dob.getFullYear();
                    return age >= 18;
                })
            ,
            zip_code: yup.string().required('ZIP code is required').nullable().typeError("Zip code must be string"),
            whatsapp_no: yup.string().nullable(),
            street: yup.string(),
            building: yup.string(),
            registration_no: yup.string().required('Registration number is required'),
            expiry_date: yup.string().required('Expiry date is required'),
            issue_date: yup.string().required('Issue date is required'),
            licence_no: yup.string().required('License number is required'),
            front_image: yup
                .mixed()
                .required("Please select an image file")
                .test(
                    "fileType",
                    "Invalid file type, only image files are allowed",
                    (value) => (value ? value.type.startsWith("image/") : true)
                ),
            back_image: yup
                .mixed()
                .required("Please select an image file")
                .test(
                    "fileType",
                    "Invalid file type, only image files are allowed",
                    (value) => (value ? value.type.startsWith("image/") : true)
                ),
        });
    }
    static updateCustomerYupSchema() {
        return yup.object({
            phone: yup.string().trim().required('Phone is required').nullable(),
            first_name: yup.string().trim().required('First name is required').nullable(),
            last_name: yup.string().trim().required('Last name is required').nullable(),
            email: yup.string().trim().email().required('Email is required').nullable(),
            city: yup.string().required('City is required'),
            state: yup.string().required('State is required'),
            dob: yup.string().required('Date of birth is required').matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
            whatsapp_no: yup.string().nullable(),
            zip_code: yup.string().required('ZIP code is required').nullable().typeError("Zip code must be string"),
            street: yup.string().optional().nullable(),
            building: yup.string().optional().nullable(),
            registration_no: yup.string().required('Registration number is required'),
            expiry_date: yup.string().required('Expiry date is required'),
            issue_date: yup.string().required('Issue date is required'),
            licence_no: yup.string().required('License number is required'),
            front_image: yup.mixed()
                .test('fileType', 'Invalid file type, only image files are allowed', (value) =>
                    value ? value?.type?.startsWith('image/') : true
                ).nullable().optional(),
            back_image: yup.mixed()
                .test('fileType', 'Invalid file type, only image files are allowed', (value) =>
                    value ? value?.type?.startsWith('image/') : true
                ).nullable().optional()
        });
    }

}
