import { DropzoneOptions } from 'react-dropzone';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { Media } from '@/models/admin/media.entity';
import MediaImage from '../../pages/api/imageUpload';
import { MediaFormSectionProps } from '@/types/media/media-form-section-props.type';


export default function MediaFormSection({ multiple }: MediaFormSectionProps) {

    const mediaApi = new MediaImage();
    const [images, setImages] = useState<Media[]>()

    const onDrop = async (acceptedFiles: any) => {
        try {
            const formData = new FormData();
            formData.append('mediable_type', images[0]?.mediable_type);
            formData.append('mediable_id', `${images[0]?.mediable_id}`);
            acceptedFiles.map((file, i) => {
                formData.append(`images[${i}]`, file);
            })
            const data = await mediaApi.create(formData);
            setImages(data)
        } catch (error) {
            console.error(error);
            alert("FAILED, please select the right image!")
        }
    };

    const dropzoneOptions: DropzoneOptions = {
        onDrop,
        multiple: Boolean(multiple),
        disabled: !Boolean(images?.length),
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions);

    // useEffect(
    //     () => setImages(media ? (Array.isArray(media) ? media : [media]) : []),
    //     [media]
    // )

    return (
        <div className='flex items-center'>
            {images?.map((m: Media, index) => (
                <div key={index} className='w-[80px] h-[80px] rounded ml-2 border border-gray-800'>
                    <img
                        className="rounded w-full h-full"
                        src={`${m?.file_name} `}
                        alt='N/A'
                    />
                </div>
            ))}
            <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? 'active' : ''} `}
            >
                <div className='ml-2'>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <Button>Drop the files here...</Button>
                    ) : (
                        <p
                            role='button'
                            className="underline text-sm text-blue-500 cursor-pointer">
                            upload image
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
