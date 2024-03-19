import { SignatureEntity } from "@/models/admin/signature/signature.entity";
import SignatureApi from "@/pages/api/signature";
import { globalAjaxExceptionHandler } from "@/utils/ajax";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import SignaturePad from "react-signature-canvas";
import { toast } from "react-toastify";

interface SignatureCanvasRef {
  clear: () => void;
  getTrimmedCanvas: () => HTMLCanvasElement | null;
}
export interface SignatureProps {
  UserType?: string;
  UserId?: number;
  signature?:SignatureEntity;
}

const Signature = (props: SignatureProps) => {
  const [imageURL, setImageURL] = useState<any | null>(null);
  const [imageData, setImageData] = useState<string>(null);
  const sigCanvas = useRef<SignatureCanvasRef | null>(null);
  const signatureApi = new SignatureApi();

  const clearCanvas = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };

  const saveCanvas = () => {
    if (sigCanvas.current) {
      const trimmedCanvas = sigCanvas.current.getTrimmedCanvas();
      if (trimmedCanvas) {
        const imageDataURL = trimmedCanvas.toDataURL("image/png");
        setImageData(imageDataURL)
        console.log(imageDataURL , 'trimmedCanvas')
        
        // Convert base64 image data to binary
        const binaryImageData = atob(imageDataURL.split(",")[1]);
        const arrayBuffer = new ArrayBuffer(binaryImageData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryImageData.length; i++) {
          uint8Array[i] = binaryImageData.charCodeAt(i);
        }
        const blob = new Blob([arrayBuffer], { type: "image/png" });
        setImageURL(blob);
      }
    }
  };
console.log(props?.signature?.signature_image , 'props?.signature?.signature_image')
  const form = useFormik({
    initialValues: new SignatureEntity(),
    onSubmit: async (values: SignatureEntity) => {
      const formData = new FormData();
      formData.append(`user_type`, `${props?.UserType}`);
      formData.append(`user_id`, `${props?.UserId}`);
      formData.append("signature_image", imageURL);
      try {
        await signatureApi.update(formData as SignatureEntity);
        toast.success("Signature Uploaded successfully!");
      } catch (error) {
        globalAjaxExceptionHandler(error, {
          formik: form,
          defaultMessage: "Signature Uploaded Failed",
          toast,
        });
      }
    },
  });
  return (
    <>
    <h5 className="tracking-wide text-md my-3  capitalize flex items-center text-gray-400 font-semibold">Latest Signature</h5>
     <img
            src={ Boolean(imageData) ? (imageData) : ` ${props?.signature?.signature_image}`}
            className="block m-0 border-1 w-24 h-24 object-contain   rounded-full cursor-pointer"
            alt=""
          />
        <h5 className="tracking-wide text-md my-3  capitalize flex items-center text-gray-400 font-semibold">Update Signature</h5>
      <form
        className="flex items-center justify-between"
        onSubmit={form?.handleSubmit}
      >
        
          <SignaturePad
            ref={(ref) => {
              if (ref) {
                sigCanvas.current = ref;
              }
            }}
            canvasProps={{
              className: "signatureCanvas border-1",
            }}
          />
        <div className="flex">
            <>
              <Button
                type="submit"
                className="bg-btn-100 mx-2"
                onClick={saveCanvas}
              >
                Save
              </Button>
              <Button
                type="reset"
                className="bg-btn-100 mx-2"
                onClick={clearCanvas}
              >
                Clear
              </Button>
            </>
         
        </div>
      </form>
    </>
  );
};

export default Signature;
