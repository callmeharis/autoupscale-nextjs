import { toast } from "react-toastify";
import { useFormik } from "formik";
import React, { ReactElement, useState } from "react";
import { globalAjaxExceptionHandler } from "@/utils/ajax";
import { useAuth } from "../../hooks/use-auth";
import AuthApi from "../api/auth";
import BaseInput from "../../components/forms/base-input";
import AxiosProgress from "@/components/progress/axios-progress";
import { ForgotPasswordDto } from "@/models/auth/forgot-password.dto";
import FullLayout from "@/components/layouts/public/full-layout";
import { Button } from "react-bootstrap";
import CarSignup from '../../public/Car_signup.png'
import Image from "next/image";
import { BaseLoaderIcon } from "@/components/forms/controls/base-loader-icon";


export default function Reset() {
    const { login } = useAuth();

    const [showMessage, setShowMessage] = useState<boolean>(false);

    const form = useFormik({
        initialValues: new ForgotPasswordDto(),
        validationSchema: ForgotPasswordDto.yupSchema(),
        onSubmit: async (values: any) => {
            const api = new AuthApi();
            try {
                await api.forgotPassword(values)
                toast.success("Check your email to reset password")
                setShowMessage(true)
            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Invalid Credentials",
                    toast,
                });
            }
        },
    });

    return (
        <>
        

                <section className="container mx-auto w-10/12">
                    <div className="">
                        <div
                            className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                            <div
                                className="shrink-1 mb-12 grow-0 basis-auto hidden md:shrink-0 lg:w-6/12 xl:w-6/12 lg:block xl:block">

                                <Image src={CarSignup} width={550} height={550} alt="Car Sign Up " />
                            </div>

                            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                                <form onSubmit={form.handleSubmit}>
                                    <h1 className="my-3 text-2xl font-bold text-gray-600 text-center decoration-overline decoration-black">Forgot Password </h1>
                                    <div className="signUp_form bg-white rounded">
                                        <div className="space-y-3 signUPForn shadow-lg p-10 mx-auto rounded-2xl">
                                            <BaseInput
                                                className="w-full mb-4 "
                                                required
                                                label="Email"
                                                name="email"
                                                placeholder="Email"
                                                formik={form}
                                            />
                                            {
                                               
                                            <p className=" text-gray-500 text-sm mx-3 w-96">{ !!showMessage &&  (`If an account with ${form?.values.email} exists, you will get an email on how to reset your password`)} </p>
                                            }
                                            <div className="my-3 text-center">
                                                <Button className="bg-btn-100 w-full " type='submit' disabled={form?.isSubmitting || !form?.isValid || form?.isValidating} > {!!form.isSubmitting ? <BaseLoaderIcon /> : "Reset"}</Button>

                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                </section >
           
        </>
    );
}

Reset.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout>{page}</FullLayout>;
};