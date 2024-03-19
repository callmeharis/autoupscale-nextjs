import * as yup from "yup";
export class ForgotPasswordDto {
  email: string;
  static yupSchema() {
    return yup.object({
      email: yup.string().email('Invalid Email Format').required('Email is required').nullable()
    })
  }
}