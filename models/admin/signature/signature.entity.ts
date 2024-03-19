import * as yup from "yup";
import { Media } from "../media.entity";
export class SignatureEntity{
  constructor() {}
  signature_image?: Media[];
  user_id?: number;
  user_type?: string;

  static yupSchema() {
    return yup.object({
        user_id: yup.number().required().nullable(),
        user_type: yup.string().required("Location is required").nullable(),
    });
  }
}
