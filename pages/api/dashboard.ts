import BaseApi from "./_baseApi";
import { VehicleGraphEntity } from "@/models/admin/vehicle/vehicle-graph-.entity";

export default class DashboardApi extends BaseApi {
    async list(): Promise<VehicleGraphEntity[]> {
        const { data: { data } } = await this.get(`dashboard-graph`);

        return data;
    }

}