import { CountryEntity } from "../../models/admin/country.entity";
import BaseApi from "./_baseApi";

export default class CountriesApi extends BaseApi {
    private baseUrl: string = "all-countries";

    constructor() {
        super();
    }

    async list(): Promise<CountryEntity[]> {
        const { data } = await this.get(`${this.baseUrl}`);

        return data;
    }

}
