import { Media } from "@/models/admin/media.entity";

export type MediaFormSectionProps = {
    handleImageChange?: (e: any) => void;
    // media?: Media | Media[];
    multiple?: Boolean | (() => boolean);
    acceptPdf?:boolean;
}
