import * as yup from "yup";
import { Media } from "./../admin/media.entity";
import { Company } from "./../admin/company/company.entity";
import { stringEnum } from "../../utils/yup";
import { CustomerGroupEnum } from "../../enums/customer-group.enum";
import { LicenseEntity } from "../admin/license.entity";
import { UserRoles } from "@/enums/auth/user-role.enum";
import { SignatureEntity } from "../admin/signature/signature.entity";
export class UserEntity {
	// Indent issues
	id?: number;
	first_name?: string;
	last_name?: string;
	email?: string;
	password?: string;
	address?: string;
	phone?: string;
	dob?: string;
	image?: Media;
	email_verified?:boolean;
	registration_no?: string;
	status?: boolean | boolean = false;
	type?: string;
	city?: string;
	state?: string;
	country?: string;
	country_id?: number;
	privacy_policy?: boolean;
	notes?: string;
	zip_code?: string;
	roles?: any[];
	permissions?: [];
	company?: Company;
	token?: string;
	file_name?: string;
	thumbnail?: string;
	license?: LicenseEntity;
	expiry_date?: string;
	licence_no?: string;
	front_image?: any;
	back_image?: any;
	whatsapp_no?: string;
	created_at?: string;
	full_name?: string;
	media?:Media;
	Signature?:SignatureEntity;

	static yupschema() {
		return yup.object({
			first_name: yup.string().required(),
			last_name: yup.string().required(),
			email: yup.string().email().required(),
			password: yup.string().required(),
			address: yup.string(),
			phone: yup.string(),
			dob: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/),
			image: yup.string(),
			registration_no: yup.string(),
			status: yup.boolean(),
			type: yup.string(),
			city: yup.string(),
			state: yup.string(),
			country: yup.string(),
			notes: yup.string(),
			zip_code: yup.string(),
			roles: yup.array(),
			company: yup.array(),
			media: yup.array(),
			token: yup.string(),
			jwt: yup.mixed(),
		});
	}
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
			street: yup.string(),
			building: yup.string(),
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
	static ManagerYupSchema() {
		return yup.object({
			first_name: yup.string().trim().required('First name is required').nullable(),
			last_name: yup.string().trim().required('Last name is required').nullable(),
			email: yup.string().trim().email().required('Email is required').nullable(),
		})
	}
}
