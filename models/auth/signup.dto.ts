import * as yup from "yup";
export class SignUpDto {
	//is_terms_accepted?: boolean;
	company_name?: string;
	first_name?: string;
	last_name?: string;
	email?: string;
	password?: string;
	confirm_password?: string;
	privacy_policy?: boolean;
	static yupSchema() {
		return yup.object({
			// privacy_policy: yup.boolean().required('Please accept our privacy policy'),
			company_name: yup.string().trim().required("company name is required").nullable(),
			first_name: yup.string().trim().required("first name is required").nullable(),
			last_name: yup.string().trim().required("last name is required").nullable(),
			email: yup.string().trim().email('Invalid email format').required("email is required").nullable(),

			/* Validating the password. */
			password: yup
				.string()
				.trim()
				.min(8, "Password Requirement Length")
				.matches(/\d/, "Password Requirement Number")
				.matches(
					/[`!@#$%^&*()_\-=[\]{};':"\\|,.<>/?~]/,
					"Password Requirement Special Character"
				)
				.required("password is required")
				.nullable(),
				

			confirm_password: yup
				.string()
				.trim()
				.oneOf([yup.ref("password")], "Password do not match!")
				.required("confirm password is required")
				.nullable(),

				privacy_policy: yup
				.boolean()
				.oneOf([true], "Please accept our privacy policy")
  				.required("Please accept our privacy policy")
		});
	}
}
