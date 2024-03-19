import { GetInvestorsOptions } from "@/types/investor/get-investors-options.type";
import BaseApi from "./_baseApi";
import { InvestorEntity } from "@/models/admin/investor/investor.entity";

export default class InvestorApi extends BaseApi {
	private baseUrl: string = "investor";

	async list(options?: GetInvestorsOptions): Promise<InvestorEntity[]> {
		const { data: { data } } = await this.get(
			`${this.baseUrl}${this.buildQueryString(options)}`
		);

		return data;
	}

	async create(dto: InvestorEntity): Promise<InvestorEntity> {
		const { data: { data } } = await this.post(`${this.baseUrl}`, dto);

		return data;
	}

	async getById(investorId: number): Promise<InvestorEntity> {
		const { data: { data } } = await this.get(
			`${this.baseUrl}/${investorId}`
		);

		return data;
	}

	async update(investorId: number, dto: InvestorEntity): Promise<InvestorEntity> {
		const { data: { data } } = await this.post(
			`${this.baseUrl}/${investorId}/update`,
			dto
		);
		return data;
	}
	async remove(investorId: number): Promise<void> {
		const { data: { data } } = await this.delete(
			`${this.baseUrl}/${investorId}`
		);

		return data;
	}
}
