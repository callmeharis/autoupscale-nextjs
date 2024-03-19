
export type BaseCreateProps = {
    onSave?: (e: any) => void,
    showCopytoClip?: boolean | (() => boolean);
    isPublic?: boolean | (() => boolean);
    companyId?: number;
}