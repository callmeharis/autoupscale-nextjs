import * as yup from 'yup';

export class VerifyEmailCodeDto {
  email: string;
  verification_token: string;
  static yupSchema() {
    return yup.object({
      email: yup.string().trim().required().nullable(),
      verification_token: yup.string().trim().required().nullable(),
    });
  }
}
