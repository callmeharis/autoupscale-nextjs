import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";
import { HeadingSec } from "../../reuse-component";
import BaseInput from "../../forms/base-input";
import InvestorApi from "../../../pages/api/investor";
import { globalAjaxExceptionHandler } from "../../../utils/ajax";
import BaseInputPhone from "../../../components/forms/base-input-phone";
import ImageUploader from "../../../components/media/image-uploader";
import { BaseCreateProps } from "../../../types/base-prop-types/base-create-prop.type";
import BaseLoader from "../../../components/forms/base-loader";
import CompanyRoutes from "../../../routes/company.route";
import { BaseLoaderIcon } from "../../../components/forms/controls/base-loader-icon";
import { UserTypeEnum } from "../../../enums/auth/user-type.enum";
// import { emailExistanceCheck } from "../../../utils/helper/email-existance-check.helper";
import { InvestorEntity } from "@/models/admin/investor/investor.entity";

export function FormSection({ onSave }: BaseCreateProps) {
  const [images, setImages] = useState<any>(null);
  const router = useRouter();

  const investorApi = new InvestorApi();

  const handleImageSelection = (files) => {
    setImages(files);
  };

  const form = useFormik({
    initialValues: new InvestorEntity(),
    validationSchema: InvestorEntity.createInvestorYupSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values: any) => {
      const formData = new FormData();
      try {
        Object.entries(values).forEach(([key, val]: any) => {
          formData.append(key, val);
        });
        images?.map((img, i) => {
          formData.append(`images[${i}]`, img);
        });
        const data = await investorApi.create(formData as InvestorEntity);
        console.log("Owner data", data);
        if (!!onSave) {
          onSave(data);
        } else router.push(CompanyRoutes.investor.index);
        toast.success("Owner created successfully");
      } catch (error) {
        globalAjaxExceptionHandler(error, {
          formik: form,
          defaultMessage: "Owner Created Failed",
          toast,
        });
      }
    },
  });
  // use only for debugging purpose
  // useEffect(() => {
  //     console.log("err-------", form.errors);
  //     console.log("value-------", form.values);
  // }, [form.errors, form.values]);

  return (
    <>
      
        <div className={`m-auto w-11/12 ${Boolean(form?.isSubmitting) && 'opacity-25'}`}>
          <div className="">
            <div className="heading-sec py-3 px-3">
              <HeadingSec title="Add Owner" />
            </div>
            <Form
              onSubmit={form.handleSubmit}
              className="p-10 shahdow-xl bg-white"
            >
              <ImageUploader handleImageChange={handleImageSelection} />
              <div className="First_row">
                <div className="md:flex ">
                  <div className="  md:w-60 md:mt-0 mt-4 w-11/12 input-style">
                    <BaseInput
                      required
                      className=""
                      name="first_name"
                      formik={form}
                      label="First Name"
                    />
                  </div>
                  <div className="md:mx-3  md:w-60 md:mt-0 mt-4 w-11/12 input-style">
                    <BaseInput
                      required
                      className=""
                      name="last_name"
                      formik={form}
                      label="Last Name"
                    />
                  </div>
                </div>
              </div>
              <div className="md:mt-3 md:flex">
                <div className=" md:w-60 md:mt-0 mt-4 w-11/12 mr-3">
                  <BaseInput
                    className=""
                    required
                    name="email"
                    // handleBlur={() => emailExistanceCheck({
                    //     form,
                    //     type: UserTypeEnum.INVESTOR
                    // })}
                    formik={form}
                    label="Email"
                  />
                </div>
                <div className=" md:w-60 md:mt-0 mt-4 w-11/12">
                  <BaseInputPhone
                    className=""
                    required
                    name="phone"
                    formik={form}
                    label="Phone No"
                  />
                </div>
              </div>
              <div className="md:mt-3  md:w-60  mt-4 w-11/12">
                <BaseInput
                  className=""
                  required
                  name="address"
                  formik={form}
                  label="Address"
                />
              </div>

              <div className="  md:my-0 my-3 flex justify-center text-end md:block mr-3">
                <Button
                  className="bg-btn-100"
                  type="submit"
                  disabled={
                    form?.isSubmitting || !form?.isValid || form?.isValidating
                  }
                >
                  {" "}
                  {!!form.isSubmitting ? <BaseLoaderIcon /> : "Create Owner"}
                </Button>
              </div>
            </Form>
          </div>
        </div>
     
    </>
  );
}
