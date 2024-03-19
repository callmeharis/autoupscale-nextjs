import * as yup from "yup";

export class TariffEntity {
	per_hour?: number;
	per_day?: number;
	per_week?: number;
    per_month?: number;
	static createInvestorYupSchema() {
		return yup.object({
			per_hour: yup.number().nullable(),
            per_day: yup.number().nullable(),
            per_week: yup.number().nullable(),
            per_month: yup.number().nullable(),
		});
	}
}
