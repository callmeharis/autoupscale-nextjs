import BaseApi from "./_baseApi";
import { Media } from "../../models/admin/media.entity";

export default class MediaImage extends BaseApi {
  private baseUrl: string = "media";

  async create(dto: any): Promise<any> {
    const {
      data: { data },
    } = await this.post(`${this.baseUrl}`, dto);

    return data;
  }

  async remove(investorId: number): Promise<void> {
    const {
      data: { data },
    } = await this.delete(`${this.baseUrl}/${investorId}`);

    return data;
  }
}
