import BaseApi from "./_baseApi";
import { GarageEntity } from "@/models/admin/garage/garage.entity";

export default class GarageApi extends BaseApi {
    private baseUrl: string = "garage";
    async list(): Promise<GarageEntity[]> {
        const { data: { data } } = await this.get(`${this.baseUrl}`);

        return data;
    }
    async create(dto: GarageEntity): Promise<GarageEntity> {
        const { data: { data } } = await this.post(`${this.baseUrl}`, dto);

        return data;
    }
    async update(maintenanceId: number, dto: GarageEntity): Promise<GarageEntity> {
        const { data: { data } } = await this.put(
            `${this.baseUrl}/${maintenanceId}`,
            dto
        );
        return data;
    }
    async getById(maintenanceId: number): Promise<GarageEntity> {
        const { data: { data } } = await this.get(
            `${this.baseUrl}/${maintenanceId}`
        );

        return data;
    }
}