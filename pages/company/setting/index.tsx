import React, { ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { MdCancel } from "react-icons/md";
import { Button, Form } from "react-bootstrap";
import { CompanySettingEntity } from "../../../models/admin/company/company-setting.entity";
import { globalAjaxExceptionHandler } from "../../../utils/ajax";
import { useEffectAsync } from "../../../utils/react";
import BaseInput from "../../../components/forms/base-input";
import BaseInputPhone from "../../../components/forms/base-input-phone";
import FullLayout from "../../../components/layouts/company/full-layout";
import ImageUploader from "../../../components/media/image-uploader";
import { BaseLoaderIcon } from "../../../components/forms/controls/base-loader-icon";
import PageLayout from "../../../components/layouts/company/page-layout";
import CompanyPermissions from "../../../permissions/company.permission";
import SettingApi from "../../api/setting";
import { UserTypeEnum } from "../../../enums/auth/user-type.enum";
// import { emailExistanceCheck } from '../../../utils/helper/email-existance-check.helper';
import { useAuth } from "@/hooks/use-auth";
import { PermissionType } from "@/types/permissions.type";
import ResetPassword from "@/components/company-setting/reset-password";
import Signature from "@/components/document/signature";
import { signatureEnums } from "@/enums/signature/signature.group.enum";

export default function Setting() {
  const [images, setImages] = useState<any>();
  const [settingData, setSettingData] = useState<any>();

  const settingApi = new SettingApi();
  const { user, hasPermission } = useAuth();
  const [can, setCan] = useState<PermissionType>(null);
  useEffect(() => {
    setCan({
      view: hasPermission(CompanyPermissions.settings.companySettings.index),
    });
  }, [user]);

  const handleImageSelection = (files) => {
    setImages(files);
    form.setValues({
      ...form.values,
      file_name: null,
      filename: null,
    });
  };
  const form = useFormik({
    initialValues: new CompanySettingEntity(),
    validationSchema: CompanySettingEntity.companySettingyupSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values: any) => {
      const formData = new FormData();
      try {
        const filteredData = Object.fromEntries(
          Object.entries(values)?.filter(([key, value]) => value !== null)
        );
        Object.entries(filteredData).forEach(([key, val]: any) => {
          formData.append(key, val);
          formData.delete("file_name");
          formData.delete("file_name");
        });

        if (images) {
          images?.map((img, i) => {
            formData.append(`images[${i}]`, img);
          });
        } else {
          formData.append(`image_ids[0]`, form.values?.image_id);
        }
        if (!images && !values.file_name) formData.delete("image_ids[0]");

        await settingApi.company.update(formData as CompanySettingEntity);
        toast.success("Setting update successfully");
      } catch (error) {
        globalAjaxExceptionHandler(error, {
          formik: form,
          defaultMessage: "Setting Update Failed",
          toast,
        });
      }
    },
  });
  useEffectAsync(async () => {
    const data = await settingApi.company.getById();
    setSettingData(data)
    form.setValues({
      ...form.values,
      ...data,
      name: data?.name,
      email: data?.email,
      reply_to_email: data?.reply_to_email,
      phone: data?.phone,
      official_address: data?.official_address,
      bank_name: data?.bank_name,
      iban: data?.iban,
      tax_number: data?.tax_number,
      swift_bic: data?.swift_bic,
      website_link: data?.website_link,
      registration_no: data?.registration_no,
    });
  }, []);
  console.log(settingData , 'setSettingData')
  return (
    <>
      <PageLayout title="">
        <h1 className="pb-4 text-xl ">Update company Info </h1>
        {can?.view && (
          <>
            <Form onSubmit={form.handleSubmit} className="px-5">
              <div>
                {Boolean(form.values.file_name) && (
                  <div>
                    <div className="flex">
                      <div style={{ marginRight: "10px" }}>
                        <img
                          src={`${form.values.file_name}`}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                        />
                        <MdCancel
                          className="cross-icon text-red-500 cursor-pointer"
                          onClick={() => {
                            form.setValues({
                              ...form.values,
                              file_name: null,
                              filename: null,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <ImageUploader handleImageChange={handleImageSelection} />
              </div>
              <div className="mt-4 flex space-x-8">
                <BaseInput
                  label="Full Name"
                  placeholder="Full Name"
                  required
                  name="name"
                  formik={form}
                />
                <BaseInput
                  label="Email Address"
                  name="email"
                  placeholder="Email"
                  formik={form}
                  // handleBlur={() => emailExistanceCheck({
                  //     form,
                  //     type: UserTypeEnum.COMPANY
                  // })}
                />
                <BaseInput
                  label="Reply To Email"
                  placeholder="Reply To Email"
                  type="email"
                  name="reply_to_email"
                  formik={form}
                />
              </div>
              <div className="mt-4 flex space-x-8">
                <BaseInputPhone
                  label="Phone"
                  placeholder="Phone"
                  name="phone"
                  formik={form}
                />
                <BaseInput
                  label="Official Address"
                  placeholder="Official Address"
                  required
                  name="official_address"
                  formik={form}
                />
                <BaseInput
                  label="Name of bank"
                  placeholder="Name of Bank"
                  required
                  name="bank_name"
                  formik={form}
                />
              </div>
              <div className="mt-4 flex space-x-8">
                <BaseInput
                  label="IBAN"
                  placeholder="IBAN"
                  required
                  formik={form}
                  name="iban"
                />
                <BaseInput
                  label="T.A.X Number"
                  placeholder="T.A.X Number"
                  required
                  name="tax_number"
                  formik={form}
                />
                <BaseInput
                  label="SWIFT/BIC"
                  placeholder="SWIFT/BIC"
                  required
                  name="swift_bic"
                  formik={form}
                />
              </div>
              <div className="mt-4 flex space-x-8">
                <BaseInput
                  label="Registeration Number"
                  placeholder="Registeration Number"
                  name="registration_no"
                  formik={form}
                  required
                />
                <BaseInput
                  label="Website Link"
                  placeholder="Website Link"
                  required
                  name="website_link"
                  formik={form}
                />
              </div>
              <div className="my-4 text-end">
                {
                  <Button
                    type="submit"
                    disabled={!!form?.isSubmitting}
                    className="bg-btn-100"
                  >
                    {!!form.isSubmitting ? <BaseLoaderIcon /> : "Update"}
                  </Button>
                }
              </div>
            </Form>
            <div className="mb-5">
              <h1 className="pb-4 text-xl ">Update Signature </h1>
              <div className="px-5">

              <Signature UserId={settingData?.id} UserType={signatureEnums.COMPANY} signature={settingData?.signature}/>
              </div>
            </div>
            <div>
              <h1 className="pb-4 text-xl ">Update Password </h1>
              <div className="px-5">
                <ResetPassword />
              </div>
            </div>
          </>
        )}
      </PageLayout>
    </>
  );
}
Setting.getLayout = function getLayout(page: ReactElement) {
  return (
    <FullLayout permission={CompanyPermissions.settings.companySettings.index}>
      {page}
    </FullLayout>
  );
};
