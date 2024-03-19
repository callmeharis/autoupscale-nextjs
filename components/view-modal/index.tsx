import { useState, useEffect } from "react";
import { X, XLg } from "react-bootstrap-icons";
import { Modal, Button, Carousel } from "react-bootstrap";
import { useTranslation } from "../../hooks/use-translation";

export interface ViewModalProps {
    show?: boolean;
    title?: string;
    header?: string | JSX.Element | JSX.Element[];
    footer?: string | JSX.Element | JSX.Element[];
    closeText?: string;
    size?: 'sm' | 'lg' | 'xl';
    onCloseClick?: () => void;
    readonly children?: any | any;
    setSelectedImage?: (image: any) => void;
    images?: any[];
    className?:string;
}

export default function ViewModal(props: ViewModalProps) {
    const { t } = useTranslation();
    const [show, setShow] = useState(!!props.show);

    useEffect(() => {
        setShow(!!props.show);
    }, [props]);

    const hideModelHandler = () => {
        setShow(false);
    };

    return (
        <Modal show={show} size={props.size} onHide={props.onCloseClick ?? hideModelHandler}>
            <Modal.Header className={`justify-content-between `}>
                {props.title && (
                    <h4 className="modal-title font-weight-normal">
                        {typeof props.title === "string" ? t(props.title) : props.title}
                    </h4>
                )}
                {props.header}
                <div className="text-end w-full">
                    <Button className="border rounded-full h-9 w-10 bg-red-500 font-bold text-white hover:bg-red-500F" onClick={props.onCloseClick ?? hideModelHandler}>
                        <XLg /> {t(props.closeText)}
                    </Button>
                </div>
            </Modal.Header>
            {/* <Modal.Body>
                {props.images && props.images.length > 0 ? (
                    <>
                        <Carousel interval={null} activeIndex={props.images.findIndex(image => image.file_name === selectedImage)}>
                            {props.images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img src={image?.file_name} alt={`Slide ${index + 1} Image`} className="d-block w-100 h-96 object-cover" />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <div className="thumbnail-container mt-3 d-flex justify-between">
                            {props.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`${image?.file_name}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`thumbnail w-20 h-20 ${selectedImage === image?.file_name ? "active" : ""}`}
                                    onClick={() => handleThumbnailClick(index)}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <p>No images available</p>
                )}
            </Modal.Body> */}
            <Modal.Body className={`p-0 ${props?.className}`}>{props?.children}</Modal.Body>

            {props.footer && <Modal.Footer>{props.footer}</Modal.Footer>}
        </Modal>
    );
}