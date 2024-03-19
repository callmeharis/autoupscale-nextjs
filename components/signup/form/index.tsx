import { toast } from "react-toastify";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { SignUpDto } from "../../../models/auth/signup.dto";
import { UserRoles } from "../../../enums/auth/user-role.enum";
import { useAuth } from "../../../hooks/use-auth";
import BaseInput from "../../../components/forms/base-input";
import BaseSelect from "../../../components/forms/base-select";

import AuthApi from "../../../pages/api/auth";
import { BaseLoaderIcon } from "@/components/forms/controls/base-loader-icon";
import { Button } from "react-bootstrap";

export function SignupForm() {
    const { login } = useAuth();
    const form = useFormik({
        initialValues: new SignUpDto(),
        validationSchema: SignUpDto.yupSchema(),
        onSubmit: async (values: any) => {
            const api = new AuthApi();
            try {
                const user = await api.signUp(values);
                login(user);
                toast.success("User Registered Successfully");
            } catch (error) {
                console.log("errorr====", error);
                toast.error("Signup failed");
            }
        },
    });

    // use only for debugging purpose
    useEffect(() => {
        console.log("err-------", form.errors);
        console.log("value-------", form.values);
    }, [form.errors, form.values]);

    return (
        <form onSubmit={form.handleSubmit}>
            <BaseSelect name="role" enumType={UserRoles} formik={form} />
            <div className="signUp_form bg-white rounded">
                <div className="signUPForn shadow-lg p-10 mx-auto rounded-2xl">
                    {Boolean(form.values.role === UserRoles.COMPANY) && (
                        <BaseInput
                            className="w-full mb-4 border-b-2 text-sm border-blue-400 flex-1 py-2 placeholder-gray-400 outline-none focus:border-blue-400"
                            name="company_name"
                            placeholder="Company name"
                            formik={form}
                        />
                    )}
                    <BaseInput
                        className="w-full mb-4 border-b-2 text-sm border-blue-400 flex-1 py-2 placeholder-gray-400 outline-none focus:border-blue-400"
                        required
                        name="first_name"
                        placeholder="First name"
                        formik={form}
                    />
                    <BaseInput
                        className="w-full mb-4 border-b-2 text-sm border-blue-400 flex-1 py-2 placeholder-gray-400 outline-none focus:border-blue-400"
                        required
                        name="last_name"
                        placeholder="Last name"
                        formik={form}
                    />
                    <BaseInput
                        className="w-full mb-4 border-b-2 text-sm border-blue-400 flex-1 py-2 placeholder-gray-400 outline-none focus:border-blue-400"
                        required
                        type="email"
                        name="email"
                        placeholder="Email"
                        formik={form}
                    />
                    <BaseInput
                        className="w-full mb-4 border-b-2 text-sm border-blue-400 flex-1 py-2 placeholder-gray-400 outline-none focus:border-blue-400"
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        formik={form}
                    />
                    <BaseInput
                        className="w-full mb-4 border-b-2 text-sm border-blue-400 flex-1 py-2 placeholder-gray-400 outline-none focus:border-blue-400"
                        required
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        formik={form}
                    />
                    <div className="mb-4 text-left">
                        <label className="block">
                            <input className="mr-2 leading-tight" type="checkbox" />
                            <span className="text-sm text-gray-300">
                                I Accept the privacy policy
                            </span>
                        </label>
                    </div>
                    <div className="my-3">
                        <Button className="bg-btn-100" type='submit' disabled={form?.isSubmitting || !form?.isValid || form?.isValidating} > {!!form.isSubmitting ? <BaseLoaderIcon /> : "Sign Up Now"}</Button>

                    </div>
                </div>
            </div>
        </form>
    );
}
