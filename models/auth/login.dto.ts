import * as yup from "yup";
export class LoginDto {
  email?: string;
  password?: string;
  static yupSchema() {
    return yup.object({
      email: yup.string().email('Invalid Email Format').trim().required("Email is required").nullable(),

      /* Validating the password. */
      password: yup
        .string()
        .trim()
        .min(8, "Password Requirement Length")
        .matches(/\d/, "Password Requirement Length")
        .matches(
          /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
          "Password Requirement Special Character"
        )
        .required("Password is required")
        .nullable(),
    });
  }
}
