import { DocumentEntity } from "@/models/admin/document/document.entity";
import BaseApi from "./_baseApi";

export default class DocumentApi extends BaseApi {
  private baseUrl: string = "document-media";

  async create(dto: DocumentEntity): Promise<DocumentEntity> {
    const {
      data: { data },
    } = await this.post(`${this.baseUrl}`, dto);

    return data;
  }

  async update(dto: DocumentEntity): Promise<DocumentEntity> {
    const {
      data: { data },
    } = await this.post(`${this.baseUrl}`, dto);

    return data;
  }
}
