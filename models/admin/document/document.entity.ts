import * as yup from "yup";
import { Media } from "../media.entity";
export class DocumentEntity {
  constructor() {}
  documents?: Media[];
  document_id?: number;
  document_type?: string;

  static yupSchema() {
    return yup.object({
      document_id: yup.number().required().nullable(),
      document_type: yup.string().required("Location is required").nullable(),
    });
  }
}
