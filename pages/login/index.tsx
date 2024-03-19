import { toast } from "react-toastify";
import { useFormik } from "formik";
import React, { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { AxiosProgressEvent } from "axios";
import { globalAjaxExceptionHandler } from "@/utils/ajax";
import { useAuth } from "../../hooks/use-auth";
import { MainSec } from "../../components/login";
import { LoginDto } from "../../models/auth/login.dto";
import AuthApi from "../api/auth";
import BaseInput from "../../components/forms/base-input";
import AxiosProgress from "@/components/progress/axios-progress";
import { useRouter } from "next/router";
import ForgetPasswordRoutes from "@/routes/forget-password.route";
import FullLayout from "@/components/layouts/public/full-layout";
import { Button } from "react-bootstrap";
import { BaseLoaderIcon } from "@/components/forms/controls/base-loader-icon";
import CompanyRoutes from "@/routes/company.route";
import AuthRoutes from "@/routes/auth.route";

export default function Login() {
  const { login, user } = useAuth();
  const router = useRouter();

  const [progress, setProgress] = useState<number>(0);

  const form = useFormik({
    initialValues: new LoginDto(),
    validationSchema: LoginDto.yupSchema(),
    onSubmit: async (values: any) => {
      const api = new AuthApi();
      try {
        const user = await api.login(values, {
          onUploadProgress: (progressEvent: AxiosProgressEvent) =>
            setProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            ),
        });

        console.log(user.permissions.length, "its permission");
        if (user.permissions?.length) {
          login(user);
        }
      } catch (error) {
        globalAjaxExceptionHandler(error, {
          formik: form,
          defaultMessage: "Invalid Credentials",
          toast,
        });
      }
    },
  });

  // use only for debugging purpose
  useEffect(() => {}, [form.errors, form.values]);

  return (
    <MainSec>
      <form onSubmit={form.handleSubmit}>
        <h1 className="my-3 text-2xl font-bold text-gray-600 text-center decoration-overline decoration-black">
          LOG IN{" "}
        </h1>
        <div className="signUp_form bg-white rounded">
          <div className="space-y-3 signUPForn shadow-lg p-10 mx-auto rounded-2xl">
            <AxiosProgress progress={progress} />
            <BaseInput
              required
              type="email"
              name="email"
              placeholder="Email"
              formik={form}
              label="Email"
            />
            <BaseInput
              required
              type="password"
              name="password"
              placeholder="Password"
              formik={form}
              label="Password"
              showPasswordToggle
            />
            <div className="flex md:text-left text-center md:justify-between flex-col md:flex-row">
              <p>
                <Link href={ForgetPasswordRoutes.index}>
                  <span
                    className="text-sm font-display font-semibold text-gray-500 hover:text-gray-400
                                        cursor-pointer"
                  >
                    Forgot Password?
                  </span>
                </Link>
              </p>
              <p>
                <Link href={AuthRoutes.signup}>
                  <span
                    className="text-sm font-display font-semibold text-gray-500 hover:text-gray-400
                                        cursor-pointer"
                  >
                   Create an account
                  </span>
                </Link>
              </p>
            </div>
            <div className="my-3 text-center">
              <Button
                className="bg-btn-100 w-100 "
                type="submit"
                disabled={
                  form?.isSubmitting || !form?.isValid || form?.isValidating
                }
              >
                {" "}
                {!!form.isSubmitting ? <BaseLoaderIcon /> : "Log in"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </MainSec>
  );
}
Login.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
