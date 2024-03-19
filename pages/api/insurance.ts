import BaseApi from "./_baseApi";

import { UserEntity } from "../../models/user/user.entity";
import { GetCustomersOptions } from "../../types/customer/get-customers-options.type";
import { ReportsEntity } from "../../models/admin/reports/reports.entity";
import { GetReportsFilterOptionTypes } from "@/types/reports/get-reports-filters-options.type";
import { ReservationEntity } from "@/models/admin/reservation.entity";
import { InsuranceEntity } from "@/models/admin/insurance/insurance.entity";

export default class InsuranceApi extends BaseApi {
	private baseUrl: string = "company-insurance";

	async create(dto: InsuranceEntity): Promise<InsuranceEntity> {
		const { data: { data } } = await this.post(`${this.baseUrl}`, dto);

		return data;
	}

	async getById(insuranceId: number): Promise<InsuranceEntity> {
		const { data: { data } } = await this.get(`${this.baseUrl}/${insuranceId}`);

		return data;
	}

	async list(): Promise<InsuranceEntity[]> {
		const { data: { data } } = await this.get(`${this.baseUrl}`);

		return data;
	}

	async update(insuranceId: number, dto: InsuranceEntity): Promise<any> {
		const { data: { data } } = await this.post(`${this.baseUrl}/${insuranceId}/update`, dto);

		return data;
	}


}
