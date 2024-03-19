import * as yup from 'yup';
export class UpdatePasswordDto {
  old_password: string;
  password: string;
  confirm_password: string;
  static yupSchema() {
    return yup.object({
      old_password: yup
        .string()
        .trim()
        .required('Old password is required')
        .nullable(),
      password: yup
        .string()
        .trim()
        .min(8, 'Password Requirement Length')
        .matches(/\d/, 'Password Requirement Number')
        .matches(
          /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
          'Password Requirement Special Character'
        )
        .required('password is required')
        .nullable(),

      confirm_password: yup
        .string()
        .trim()
        .oneOf([yup.ref('password')], 'Password do not match!')
        .required('confirm password is required')
        .nullable(),
    });
  }
}
