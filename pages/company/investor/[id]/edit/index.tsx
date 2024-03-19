import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { HeadingSec } from "../../../../../components/reuse-component";
import BaseInput from "../../../../../components/forms/base-input";
import InvestorApi from "../../../../api/investor";
import FullLayout from "../../../../../components/layouts/company/full-layout";
import { useEffectAsync } from "../../../../../utils/react";
import { globalAjaxExceptionHandler } from "../../../../../utils/ajax";
import BaseInputPhone from "../../../../../components/forms/base-input-phone";
import ImageUploader from "@/components/media/image-uploader";
import { MdCancel } from "react-icons/md";
import BaseLoader from "@/components/forms/base-loader";
import CompanyRoutes from "@/routes/company.route";
import { BaseLoaderIcon } from "@/components/forms/controls/base-loader-icon";
import CompanyPermissions from "@/permissions/company.permission";
import { InvestorEntity } from "@/models/admin/investor/investor.entity";

export default function EditInvestor({ id }) {
  const router = useRouter();
  const investorApi = new InvestorApi();
  const [images, setImages] = useState<any>(null);
  const handleImageSelection = (files) => {
    setImages(files);
    form.setValues({
      ...form.values,
      file_name: null,
      filename: null,
    });
  };

  const form = useFormik({
    initialValues: new InvestorEntity(),
    validationSchema: InvestorEntity.createInvestorYupSchema(),
    onSubmit: async (values: any) => {
      const formData = new FormData();
      try {
        const {
          thumbnail,
          file_name,
          documents,
          id,
          created_at,
          status,
          ...restValues
        } = values;
        const filteredData = Object.fromEntries(
          Object.entries(values)?.filter(([key, value]) => value !== null)
        );
        console.log(filteredData, "Filter");

        Object.entries(filteredData).forEach(([key, val]: any) => {
          formData.append(key, val);
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
        await investorApi.update(id, formData as InvestorEntity);
        toast.success("Owner updated successfully");
        router.push(CompanyRoutes.investor.index);
      } catch (error) {
        globalAjaxExceptionHandler(error, {
          formik: form,
          defaultMessage: "Owner Updated Failed",
          toast,
        });
      }
    },
  });

  useEffectAsync(async () => {
    if (id) {
      try {
        const data = await investorApi.getById(id);
        form.setValues(data);
      } catch (error) {
        console.log("error Owner", error);
      }
    }
  }, [id]);
  useEffectAsync(async () => {
    if (!!id) {
      const data = await investorApi.getById(id);
      form.setValues({
        ...form.values,
        ...data,
      });
    }
  }, [id]);

  // use only for debugging purpose
  useEffect(() => {
    console.log("err-------", form.errors);
    console.log("value-------", form.values);
  }, [form.errors, form.values]);

  const handleCancel = () => router.push(CompanyRoutes.investor.index);

  return (
    <>
      <div className={`m-auto w-11/12 ${Boolean(form?.isSubmitting) && 'opacity-25'}`}>
        <div className="px-3 heading-sec py-3">
          <HeadingSec title="Edit Owner" />
        </div>
        <form onSubmit={form.handleSubmit} className="p-10 shahdow-xl bg-white">
          {Boolean(form.values.file_name) && (
            <div>
              <div className="flex">
                <div style={{ marginRight: "10px" }}>
                  <img
                    src={`${form.values.file_name} `}
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
                      // setImages(null)
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="my-3">
            <ImageUploader handleImageChange={handleImageSelection} />
          </div>
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

          <div className="flex justify-end mt-4 items-center ">
            <Button
              className=" btn btn-danger bg-red-500 w-40 mr-4"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="bg-btn-100"
              type="submit"
              disabled={
                form?.isSubmitting || !form?.isValid || form?.isValidating
              }
            >
              {" "}
              {!!form.isSubmitting ? <BaseLoaderIcon /> : "Update Investor"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const id = context.params?.id;
    if (!!!id) return { notFound: true };

    return {
      props: { id },
    };
  } catch (error) {
    console.error("Exception is here:", error);
    return { props: { id: 0 } };
  }
}

EditInvestor.getLayout = function getLayout(page: ReactElement) {
  return (
    <FullLayout permission={CompanyPermissions.investor.edit}>
      {page}
    </FullLayout>
  );
};
