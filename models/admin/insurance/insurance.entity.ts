import * as yup from "yup";
import { Media } from "../media.entity";
export class InsuranceEntity {
  
    constructor() { }
    id?: number;
    name?: string;
    phone?: string;
    email?: string;
    mailing_email?: string;
    file_name?: string;
    thumbnail?: string;
    media?: Media[];
	image?: Media;
    value?:string ; 
    cover_includes?:string ; 
    type_of_cover?:string ; 
    excess?:string ; 
    length_liability?:string;
    notes?:string;
    company_url?:string;
    company_terms_conditions?:string;
    address?:string;
    abn?:string;
    policy_number?:string;

    static yupSchema() {
        return yup.object({
            name: yup.string().required("Insurance name is required"),
            phone: yup.string().required("Phone is required"),
            email: yup.string().email('Email must be valid').required("Email is required"),
            mailing_email: yup.string().email().required("Mailing Email is required"),
            value: yup.string().required('Value is required'),
            cover_includes: yup.string().required('Cover Includes is required'),
            type_of_cover: yup.string().required('Type of Cover is required'),
            excess: yup.string().required('Excess is required'),
            length_liability:yup.string().required('Length Liability is required'),
            notes: yup.string().required('Notes is required'),
            company_url:yup.string().required('Comapny url is required'),
            company_terms_conditions :yup.string().required('Company Terms & Condition is required'),
            address:yup.string().required('Address is required'),
            policy_number:yup.string().required('Policy Number is required'),
            abn:yup.string().required('Abn is required')
        })
    }

}
