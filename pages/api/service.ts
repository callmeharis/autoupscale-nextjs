import { ServiceEntity } from "@/models/admin/service/service.entity";
import BaseApi from "./_baseApi";

export default class ServiceApi extends BaseApi {
    private baseUrl: string = "service";

    async list(): Promise<ServiceEntity[]> {
        const { data: { data } } = await this.get(`service`);

        return data;
    }

    async create(dto: ServiceEntity): Promise<ServiceEntity> {
        const { data: { data } } = await this.post(`add-service`, dto);

        return data;
    }

    async update(serviceId: number, dto: ServiceEntity): Promise<ServiceEntity> {
        const { data: { data } } = await this.put(
            `${this.baseUrl}/${serviceId}`,
            dto
        );
        return data;
    }

    async getById(serviceId: number): Promise<ServiceEntity> {
        const { data: { data } } = await this.get(
            `${this.baseUrl}/${serviceId}`
        );

        return data;
    }
}