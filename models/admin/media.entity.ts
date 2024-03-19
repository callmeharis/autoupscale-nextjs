import { MediaableTypeEnum } from "@/enums/media/mediaable-type.enum";
import * as yup from "yup";
export class Media {
  constructor() {}

  id?: number;
  file_name?: string;
  thumbnail?: string;
  file_type?: string;
  mediable_id?: number;
  mediable_type?: MediaableTypeEnum;

  static yupSchema() {
    return yup.object({
      mediable_id: yup.number().positive().required().nullable(),
      mediable_type: yup.string().required().nullable(),
      thumbnail: yup.string().required().nullable(),
      // file_name: yup
      //   .object()
      //   .shape({
      //     image: yup
      //       .mixed()
      //       .test(
      //         "fileType",
      //         "Only JPG and PNG JPEG, SVG, GIF images are allowed",
      //         (value) => {
      //           if (value) {
      //             const fileType = value.type.split("/")[1];
      //             return ["jpg", "png", "svg", "jpeg", "gif"].includes(
      //               fileType
      //             );
      //           }
      //           return true;
      //         }
      //       )
      //       .required("An image is required"),
      //   })
      //   .required()
      //   .nullable(),
    });
  }
}
