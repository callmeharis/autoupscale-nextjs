import BaseApi from "./_baseApi";

import { UserEntity } from "../../models/user/user.entity";
import { GetCustomersOptions } from "../../types/customer/get-customers-options.type";
import { ReportsEntity } from "../../models/admin/reports/reports.entity";
import { GetReportsFilterOptionTypes } from "@/types/reports/get-reports-filters-options.type";
import { ReservationEntity } from "@/models/admin/reservation.entity";
import { CustomerEntity } from "@/models/admin/customer/customer.entity";

export default class CustomerApi extends BaseApi {
	private baseUrl: string = "customer";

	async list(options?: GetCustomersOptions): Promise<CustomerEntity[]> {
		const { data: { data } } = await this.get(`${this.baseUrl}${this.buildQueryString(options)}`);

		return data;
	}

	async getById(customerId: number): Promise<CustomerEntity> {
		const { data: { data } } = await this.get(`${this.baseUrl}/${customerId}`);

		return data;
	}

	async create(dto: CustomerEntity): Promise<CustomerEntity> {
		const { data: { data } } = await this.post(`${this.baseUrl}`, dto);

		return data;
	}

	async update(customerId: number, dto: CustomerEntity): Promise<any> {
		const { data: { data } } = await this.post(`${this.baseUrl}/${customerId}/update`, dto);

		return data;
	}

	async remove(customerId: number): Promise<void> {
		const { data: { data } } = await this.delete(
			`${this.baseUrl}/${customerId}`
		);

		return data;
	}

	history = {
		getById: async (
			vehicleId: number,
			options?: GetReportsFilterOptionTypes
		): Promise<ReportsEntity> => {
			const { data: { data } } = await this.get(
				`${this.baseUrl}/${vehicleId}/history${this.buildQueryString(options)}`
			);

			return data;
		},
	}

	public = {
		baseUrl: `public/${this.baseUrl}`,
		// for creating customer publicly
		create: async (dto: CustomerEntity): Promise<CustomerEntity> => {
			const { data: { data } } = await this.post(`${this.public.baseUrl}`, dto);

			return data;
		}
	}

	self = {
		baseUrl: `public/${this.baseUrl}`,
		get: async (): Promise<CustomerEntity> => {
			const { data: { data } } = await this.get(`${this.self.baseUrl}/get`);

			return data;
		},
		edit: async (dto: CustomerEntity): Promise<CustomerEntity> => {
			const { data: { data } } = await this.post(`${this.self.baseUrl}/update`, dto);

			return data;
		},
		history: {
			get: async (options?: GetReportsFilterOptionTypes): Promise<ReportsEntity> => {
				const { data: { data } } = await this.get(`${this.self.baseUrl}/history${this.buildQueryString(options)}`);

				return data;
			},
		},
		reservation: {
			list: async (): Promise<ReservationEntity[]> => {
				const { data: { data } } = await this.get(`${this.self.baseUrl}/reservations`);

				return data;
			},
			get: async (id: number): Promise<ReservationEntity> => {
				const { data: { data } } = await this.get(`${this.self.baseUrl}/reservations/${id}`);

				return data;
			},
		},
	}

}
