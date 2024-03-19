import { ReportsEntity } from "../../models/admin/reports/reports.entity";
import BaseApi from "./_baseApi";
import { GetReportsFilterOptionTypes } from "../../types/reports/get-reports-filters-options.type";


export default class ReportsApi extends BaseApi {
    private baseUrl: string = "stats";

    async list(options?: GetReportsFilterOptionTypes): Promise<ReportsEntity> {
        const { data: { data } } = await this.get(
            `${this.baseUrl}${this.buildQueryString(options)}`
        );

        return data;
    }
    async download(options?: GetReportsFilterOptionTypes): Promise<any> {
        const { data } = await this.get(
            `${this.baseUrl}/download${this.buildQueryString(options)}`
        );

        return data;
    }


}
