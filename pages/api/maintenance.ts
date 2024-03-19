import { MaintenanceEntity } from "@/models/admin/company/maintenance/maintenance.entity";
import BaseApi from "./_baseApi";

export default class MaintenanceApi extends BaseApi {
    private baseUrl: string = "maintenance";
    async list(): Promise<MaintenanceEntity[]> {
        const { data: { data } } = await this.get(`${this.baseUrl}`);

        return data;
    }
    async create(dto: MaintenanceEntity): Promise<MaintenanceEntity> {
        const { data: { data } } = await this.post(`${this.baseUrl}`, dto);

        return data;
    }
    async update(maintenanceId: number, dto: MaintenanceEntity): Promise<MaintenanceEntity> {
        const { data: { data } } = await this.put(
            `${this.baseUrl}/${maintenanceId}`,
            dto
        );
        return data;
    }
    async getById(maintenanceId: number): Promise<MaintenanceEntity> {
        const { data: { data } } = await this.get(
            `${this.baseUrl}/${maintenanceId}`
        );

        return data;
    }
}