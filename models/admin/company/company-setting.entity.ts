import * as yup from "yup";
import { Media } from "../media.entity";
export class CompanySettingEntity {
    constructor() { }
    name?: string;
    email?: string;
    reply_to_email?: string;
    phone?: string;
    official_address?: string;
    bank_name?: string;
    iban?: string;
    tax_number?: string;
    swift_bic?: string;
    registration_no?: string;
    website_link?: string;
    media?: Media[];
    static companySettingyupSchema() {
        return yup.object({
            name: yup.string().optional().nullable(),
            email: yup.string().optional().nullable(),
            reply_to_email: yup.string().optional().nullable(),
            phone: yup.string().optional().nullable(),
            official_address: yup.string().optional().nullable(),
            bank_name: yup.string().optional().nullable(),
            tax_number: yup.string().optional().nullable(),
            swift_bc: yup.string().optional().nullable(),
            registration_no: yup.string().optional().nullable(),
            website_link: yup.string().optional().nullable(),
            iban: yup.string().optional().nullable(),
        });
    }
}
