import * as yup from "yup";
export class ResetDto {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
  static yupSchema() {
    return yup.object({
      email: yup.string().trim().required().nullable(),
      token: yup.string().trim().required().nullable(),
      password: yup.string().trim().required().nullable(),
      password_confirmation: yup.string().trim().required("Password confirmation is required").nullable(),
    });
  }
}
