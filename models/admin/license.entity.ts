import * as yup from "yup";

export class LicenseEntity {
	front_image?: string;
	back_image?: string;
	expiry_date?: string;
	status?: number;
	issue_date?: string;
	licence_no?: number;
	static yupSchema() {
		return yup.object({
			front_image: yup.mixed()
				.required('Please select an image file')
				.test('fileType', 'Invalid file type, only image files are allowed', (value) =>
					value ? value.type.startsWith('image/') : true
				),
			back_image: yup.mixed()
				.required('Please select an image file')
				.test('fileType', 'Invalid file type, only image files are allowed', (value) =>
					value ? value.type.startsWith('image/') : true
				),
			expiry_date: yup.string().required().nullable(),
			issue_date: yup.string().required().nullable(),
			license_no: yup.string().required(),
		});
	}
}
