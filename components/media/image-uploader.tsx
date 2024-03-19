import React, { useState } from "react";
import { FilePdf, Upload } from "react-bootstrap-icons";
import { useDropzone } from "react-dropzone";
import { MdCancel } from "react-icons/md";
import { MediaFormSectionProps } from "../../types/media/media-form-section-props.type";
import ViewModal from "../view-modal";

const ImageUploader = ({
  handleImageChange,
  multiple,
  acceptPdf,
}: MediaFormSectionProps) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [pdfView, setPdfView] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDrop = (acceptedFiles) => {
    const maxSize = 31457280;
    const oversizedFiles = acceptedFiles.filter((file) => file.size > maxSize);

    if (oversizedFiles.length > 0) {
      alert("Some files exceed the limit of 30 MBs.");
      return;
    }

    setIsLoading(true);
    // Process the images and set the loading state to false once images are loaded
    Promise.all(
      acceptedFiles.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({
                name: file.name,
                preview: reader.result,
                type: file.type,
              });
            };
            reader.readAsDataURL(file);
          })
      )
    ).then((images) => {
      setIsLoading(false);
      Boolean(multiple)
        ? setSelectedImages((prevImages) => [...prevImages, ...images])
        : setSelectedImages(images);
      handleImageChange(acceptedFiles);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: Boolean(multiple),
    accept: !!Boolean(acceptPdf)
      ? {
          "images/png": [".png"],
          "images/jpg": [".jpg"],
          "images/jpeg": [".jpeg"],
          "application/pdf": [".pdf"],
        }
      : {
          "images/png": [".png"],
          "images/jpg": [".jpg"],
          "images/jpeg": [".jpeg"],
        },
    disabled: isLoading,
    // Prevent further uploads while images are being processed
  });

  const removeImage = (index) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  return (
    <div>
      {Boolean(selectedImages?.length > 0) && (
        <div>
          <div
            style={{ display: "flex", alignItems: "center", overflowX: "auto" }}
          >
            {selectedImages?.map((image, index) => (
              <div
                key={index}
                style={{
                  marginRight: "10px",
                  minWidth: "80px",
                  maxWidth: "80px",
                }}
              >
                {/* <img
                                    src={image?.preview}
                                    alt={image?.name}
                                    style={{ objectFit: 'cover', borderRadius: '50%', width: '80px', height: '80px' }}
                                /> */}
                {image.type.includes("pdf") ?   (
                  <>
                  <div className="relative">
                    <FilePdf className="hover:opacity-30" size={80} color="black" 
                        onClick={() => setPdfView(true)}
                        />
                    
                  </div>
                      <ViewModal
                        show={!!Boolean(pdfView)}
                        onCloseClick={() => setPdfView(false)}
                        header=' Viewer'
                        size="xl"
                      >
                        <iframe
                          src={`${image?.preview} `}
                          style={{ width: "100%", height: "600px" }}
                          frameBorder="0"
                        ></iframe>
                      </ViewModal>
                    </>
                ) : (
                  <img
                    src={image.preview}
                    alt={image.name}
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                      width: "80px",
                      height: "80px",
                    }}
                  />
                ) }
                <MdCancel
                  className="cross-icon text-red-500 cursor-pointer"
                  onClick={() => removeImage(index)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {Boolean(isLoading) && <div>Image Uploding</div>}

      <div
        className={`text-center mt-2  cursor-pointer  ${
          isLoading && "opacity-10"
        }`}
        {...getRootProps()}
        style={{
          border: "1px dashed black",
          padding: "20px",
          marginBottom: "20px",
          width: "fit-content",
        }}
      >
        <input {...getInputProps()} />

        {Boolean(multiple) ? (
          <div className="flex justify-center">
            <p className="mt-4 flex items-center">
              Drag and drop or click to select images.
              <span className="ml-2">
                <Upload />
              </span>
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="flex items-center p-0 ">
              upload image
              <span className="ml-2">
                <Upload />
              </span>
            </p>
          </div>
        )}
      </div>
     
    </div>
    
    
  );
};

export default ImageUploader;
