import BaseCarousel from "@/components/forms/base-carousel";
import ImageUploader from "@/components/media/image-uploader";
import ViewModal from "@/components/view-modal";
import { Damage } from "@/models/admin/damage.entity";
import { DocumentEntity } from "@/models/admin/document/document.entity";
import { ReservationEntity } from "@/models/admin/reservation.entity";
import { VehicleEntity } from "@/models/admin/vehicle/vehicle.entity";
import DocumentApi from "@/pages/api/document";
import { globalAjaxExceptionHandler } from "@/utils/ajax";
import { useEffectAsync } from "@/utils/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FilePdf } from "react-bootstrap-icons";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";

export interface DocumentEditProps {
  documentId?: number;
  documentType?: string;
  documentData?: VehicleEntity | ReservationEntity;
}

const DocumentEdit = (props: DocumentEditProps) => {
  const [images, setImages] = useState<any>();
  const [pdfView, setPdfView] = useState(null);
  const documentApi = new DocumentApi();
  const handleImageSelection = (files) => {
    setImages(files);
  };
  useEffectAsync(async () => {
    if (!!props?.documentData) {
      const { ...updateData } = props?.documentData;
      form.setValues({
        ...form.values,
        ...updateData,
      });
      console.log({ ...updateData }, "...props?.documentData");
    }
  }, [props?.documentData]);
  const form = useFormik({
    initialValues: new Damage(),
    onSubmit: async (values: any) => {
      const formData = new FormData();
      formData.append(`object_type`, `${props?.documentType}`);
      formData.append(`object_id`, `${props?.documentId}`);
      try {
        // Object.entries(values)?.forEach(([key, val]) => {
        //     formData.append(key, `${val}`);
        //   formData?.delete("documents");
        // });
        images?.map((img, i) => {
          formData.append(`documents[${i}]`, img);
        });
        form?.values?.documents?.map((m, i) => {
          formData.append(`document_ids[${i}]`, m?.id);
        });

        const data = await documentApi.update(formData as DocumentEntity);
        toast.success("Document Uploaded successfully!");
      } catch (error) {
        globalAjaxExceptionHandler(error, {
          formik: form,
          defaultMessage: "Document Uploaded Failed",
          toast,
        });
      }
    },
  });
  console.log(form?.values?.documents, "form?.values?.documents");

  return (
    <div className="">
      <form onSubmit={form?.handleSubmit}>
        {Boolean(form?.values?.documents?.length) && (
          <div>
            <div style={{ display: "flex" }}>
              {form?.values?.documents.map((image, index) => (
                <div key={index} style={{ marginRight: "10px" }}>
                  {image.type.includes("DOCUMENT") ? (
                    <>
                      <FilePdf
                        size={80}
                        color="black"
                        onClick={() => setPdfView(true)}
                        className="hover:opacity-30"
                      />
                      <ViewModal
                        show={!!Boolean(pdfView)}
                        onCloseClick={() => setPdfView(false)}
                        header=' Viewer'
                        size="xl"
                      >
                        <iframe
                          src={`${image?.file_name} `}
                          style={{ width: "100%", height: "600px" }}
                          frameBorder="0"
                        ></iframe>
                      </ViewModal>
                    </>
                  ) : (
                    <img
                      src={`${image?.file_name} `}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  )}

                  <MdCancel
                    className="cross-icon text-red-500 cursor-pointer"
                    onClick={() =>
                      form.setValues({
                        ...form.values,
                        documents:
                          form.values.documents?.filter(
                            (v) => v.id != image.id
                          ) ?? [],
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-between items-end">
          <ImageUploader
            multiple
            handleImageChange={handleImageSelection}
            acceptPdf
          />
          <Button
            type="submit"
            className="bg-btn-100"
            disabled={form?.isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DocumentEdit;
