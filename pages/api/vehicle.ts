import { VehicleEntity } from "@/models/admin/vehicle/vehicle.entity";
import BaseApi from "./_baseApi";
import { GetVehiclesOptions } from "@/types/vehicle/get-vehicles-options.type";
import { GetVehiclesDropdownOptions } from "@/types/vehicle/get-vehicles-dropdown-options.type";
import { VehicleModelEntity } from "@/models/admin/vehicle/vehicle-model.entity";
import { ReportsEntity } from "@/models/admin/reports/reports.entity";
import { GetReportsFilterOptionTypes } from "@/types/reports/get-reports-filters-options.type";
import { VehicleDamageEntity } from "@/models/admin/vehicle/vehicle-damage.entity";
import { VehicleBrandEntity } from "@/models/admin/vehicle/vehicle-brand.entity";
import axios from 'axios'

export default class VehichleApi extends BaseApi {
	static vehicleDamage(arg0: VehicleDamageEntity) {
		throw new Error('Method not implemented.');
	}
	private baseUrl: string = "vehicles";

	async list(
		options?: GetVehiclesOptions
	): Promise<VehicleEntity[]> {
		const { data: { data } } = await this.get(
			`${this.baseUrl}${this.buildQueryString(options)}`
		);

		return data;
	}

	async uploadDamageImage(formData:FormData): Promise<any> {
		const { data: { data } } = await this.post(
			`/vehicle-state`,
			formData
		);
		// const {data} = await axios.post('http://localhost:3001/upload', formData, )
		return data;
	}

	async getById(
		vehicleId: number,
		options?: GetVehiclesOptions
	): Promise<VehicleEntity> {
		const { data: { data } } = await this.get(
			`${this.baseUrl}/${vehicleId}${this.buildQueryString(options)}`
		);

		return data;
	}

	async create(dto: VehicleEntity): Promise<VehicleEntity> {
		const { data: { data } } = await this.post(
			`${this.baseUrl}`,
			dto
		);
		return data;
	}

	async update(
		vehicleId: number,
		dto: VehicleEntity
	): Promise<VehicleEntity> {
		const { data: { data } } = await this.post(
			`${this.baseUrl}/${vehicleId}/update`,
			dto
		);
		return data;
	}

	async remove(vehicleId: number): Promise<void> {
		const { data: { data } } = await this.delete(
			`${this.baseUrl}/${vehicleId}`
		);

		return data;
	}
	// API for dropdown data
	async getVehichleDropDownData(options?: GetVehiclesOptions): Promise<GetVehiclesDropdownOptions> {
		const { data: { data } } = await this.get(`create-vehicle${this.buildQueryString(options)}`);

		return data;
	}

	// for fetching model against brand
	async getVehichleModels(brandId: number): Promise<VehicleModelEntity[]> {
		const { data: { data } } = await this.get(`brand/${brandId}/models`);

		return data;
	}

	async createVehicleModel(dto: VehicleModelEntity): Promise<VehicleModelEntity> {
		const { data: { data } } = await this.post(`add-model`, dto);

		return data;
	}

	async createVehicleBrand(dto: VehicleBrandEntity): Promise<VehicleBrandEntity> {
		const { data: { data } } = await this.post(`add-brand`, dto);

		return data;
	}

	async getHistoryById(
		vehicleId: number,
		options?: GetReportsFilterOptionTypes
	): Promise<ReportsEntity> {
		const { data: { data } } = await this.get(
			`${this.baseUrl}/${vehicleId}/history${this.buildQueryString(options)}`
		);

		return data;
	}

	async createVehicleDamage(dto: VehicleDamageEntity): Promise<{ count: number, damages: VehicleDamageEntity[] }> {
		const { data: { data } } = await this.post(
			`${this.baseUrl}/damage`,
			dto,
		);
		return data;
	}
	async getVehichleDamage(vehicleId: number): Promise<{ count: number, damages: VehicleDamageEntity[] }> {

		const { data: { data } } = await this.get(`${this.baseUrl}/damage/${vehicleId}`);

		return data;

	}
	async deleteVehicleDamage(vehicleId: number): Promise<void> {
		const { data: { data } } = await this.delete(
			`${this.baseUrl}/damage/${vehicleId}`
		);

		return data;
	}
}
