import * as yup from "yup";
import { UserEntity } from "../../user/user.entity";
export class Company {
	constructor() { }
	id?: number;
	name?: string;
	user?: UserEntity;
	status?: string;
	country?: string;
	country_name?: string;
	country_code?: string;
	currency_name?: string;
	currency_code?: string;
	dial_code?: string;
	currency_symbol?: string;
	
	static yupSchema() {
		return yup.object({
			id: yup.number().required().nullable(),
			name: yup.string().required().nullable(),
			user_id: yup.number().positive().required().nullable(),
			status: yup.string().optional().nullable(),
		});
	}

	static yupSchemaForUpdateCompany() {
		return yup.object({
			name: yup.string().required().nullable(),
		});
	}
}
