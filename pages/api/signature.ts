import BaseApi from "./_baseApi";
import { SignatureEntity } from "@/models/admin/signature/signature.entity";

export default class SignatureApi extends BaseApi {
  private baseUrl: string = "signature";


  async update(dto: SignatureEntity): Promise<SignatureEntity> {
    const {
      data: { data },
    } = await this.post(`${this.baseUrl}`, dto);

    return data;
  }
}
