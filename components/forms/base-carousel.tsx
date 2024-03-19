// import React, { useState, useEffect } from 'react';
// import { Carousel } from 'react-bootstrap';
// import ViewModal from '../view-modal';

// const BaseCarousel = ({ images }) => {
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [activeIndex, setActiveIndex] = useState(0);

//     const handleSlideChange = (selectedIndex) => {
//         setActiveIndex(selectedIndex);
//     };

//     const renderSlides = () => {
//         const slides = images.map((image, index) => (
//             <Carousel.Item key={index}>
//                 <div className="image-container">
//                     <img
//                         className="carousel-image"
//                         src={`${image?.file_name}`}
//                         alt={`Slide ${index + 1} Image`}
//                         onClick={() => setSelectedImage(image)}
//                     />
//                 </div>
//             </Carousel.Item>
//         ));

//         return slides;
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             const numSlides = images.length;
//             setActiveIndex((prevIndex) => (prevIndex + 1) % numSlides);
//         }, 3000); // Change slide every 3 seconds

//         return () => {
//             clearInterval(interval);
//         };
//     }, [images]);

//     return (
//         <>
//             <style>
//                 {`
//         .image-container {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           height: 200px;
//           width: 200px;
//         }
//         .carousel-image {
//           width: 100%;
//           height: 100%;
//           border-radius: 50%;
//           object-fit: cover;
//         }
//         `}
//             </style>
//             <Carousel
//                 activeIndex={activeIndex}
//                 onSelect={handleSlideChange}
//                 interval={null} // Disable automatic sliding
//                 nextIcon={null} // Remove next icon
//                 prevIcon={null} // Remove previous icon
//             >
//                 {renderSlides()}
//             </Carousel>
//             <ViewModal
//                 size="lg"
//                 show={selectedImage !== null}
//                 onCloseClick={() => setSelectedImage(null)}
//                 images={images}
//             >
//                 {selectedImage && (
//                     <img
//                         className="d-block w-100"
//                         src={`${selectedImage?.file_name}`}
//                         alt="Selected Image"
//                     />
//                 )}
//             </ViewModal>
//         </>
//     );
// };

// export default BaseCarousel;


// import React, { useState, useEffect } from 'react';
// import { Carousel, Modal } from 'react-bootstrap';

// const BaseCarousel = ({ images }) => {
//     const [showModal, setShowModal] = useState(false);
//     const [activeIndex, setActiveIndex] = useState(0);

//     const handleSlideChange = (selectedIndex) => {
//         setActiveIndex(selectedIndex);
//     };

//     const openModal = () => {
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setShowModal(false);
//     };

//     const renderThumbnails = () => {
//         return images.map((image, index) => (
//             <img
//                 key={index}
//                 className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
//                 src={`${image.file_name}`}
//                 alt={`Thumbnail ${index + 1}`}
//                 onClick={() => handleThumbnailClick(index)}
//             />
//         ));
//     };

//     const handleThumbnailClick = (index) => {
//         setActiveIndex(index);
//     };

//     const renderSlides = () => {
//         return images.map((image, index) => (
//             <Carousel.Item key={index}>
//                 <img
//                     className="carousel-image"
//                     src={`${image.file_name}`}
//                     alt={`Slide ${index + 1} Image`}
//                 />
//             </Carousel.Item>
//         ));
//     };

//     useEffect(() => {
//         const handleKeyDown = (event) => {
//             if (event.key === 'ArrowLeft') {
//                 setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//             } else if (event.key === 'ArrowRight') {
//                 setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
//             }
//         };

//         window.addEventListener('keydown', handleKeyDown);

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         };
//     }, [images.length]);

//     return (
//         <>
//             <style>
//                 {`
//           .carousel-image {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }
//           .thumbnail {
//             width: 50px;
//             height: 50px;
//             object-fit: cover;
//             cursor: pointer;
//             border: 1px solid #ccc;
//             margin: 2px;
//           }
//           .thumbnail.active {
//             border-color: #000;
//           }
//         `}
//             </style>
//             <div className="carousel-container">
//                 <div className="carousel">
//                     <img
//                         className="carousel-image"
//                         src={`${images[activeIndex]?.file_name}`}
//                         alt="Selected Image"
//                         onClick={openModal}
//                     />
//                 </div>
//                 <div className="thumbnails">{renderThumbnails()}</div>
//             </div>
//             <Modal show={showModal} onHide={closeModal} size="lg">
//                 <Modal.Body>
//                     <Carousel
//                         activeIndex={activeIndex}
//                         onSelect={handleSlideChange}
//                         interval={null} // Disable automatic sliding
//                         nextIcon={<span className="carousel-control-next-icon bg-dark" />} // Custom next icon
//                         prevIcon={<span className="carousel-control-prev-icon bg-dark" />} // Custom previous icon
//                     >
//                         {renderSlides()}
//                     </Carousel>
//                 </Modal.Body>
//             </Modal>
//         </>
//     );
// };

// export default BaseCarousel;



import React, { useState, useEffect } from 'react';
import { Carousel, Modal } from 'react-bootstrap';

const BaseCarousel = ({ images }) => {
    const [showModal, setShowModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSlideChange = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const renderThumbnails = () => {
        return images.map((image, index) => (
            <img
                key={index}
                className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
                src={`${image.file_name}`}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(index)}
            />
        ));
    };

    const handleThumbnailClick = (index) => {
        setActiveIndex(index);
    };

    const renderSlides = () => {
        return images.map((image, index) => (
            <Carousel.Item key={index}>
                <img
                    className="carousel-image"
                    src={`${image.file_name}`}
                    alt={`Slide ${index + 1} Image`}
                />
            </Carousel.Item>
        ));
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
            } else if (event.key === 'ArrowRight') {
                setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [images.length]);

    return (
        <>
            <style>
                {`
                .main-carousel-image{
                    width: 200px;
                    height:200px;
                    border-radius: 50%;
                    object-fit:cover;
                }
                .carousel-item img {
                    width: 100%;
                    height: 50vh;    
                    object-fit: contain;
                  }
          .carousel-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .thumbnail {
            width: 50px;
            height: 50px;
            object-fit: cover;
            cursor: pointer;
            margin: 2px;
            
          }
       
        `}
            </style>
            <div className="carousel-container">
                <div className="carousel">
                    <img
                        className=" main-carousel-image"
                        src={images[activeIndex]?.file_name ? images[activeIndex]?.file_name : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7EkV3CX7fEqiL-PnjPzqstMql_Uu1V2vj0g&usqp=CAU"}
                        alt="Selected Image"
                        onClick={openModal}
                    />
                </div>
            </div>
            {
                images[activeIndex]?.file_name &&
                < Modal show={showModal} onHide={closeModal} size="lg">
                    <Modal.Body>
                        <Carousel
                            activeIndex={activeIndex}
                            onSelect={handleSlideChange}
                            interval={null} // Disable automatic sliding
                            nextIcon={
                                <span className='bg-black rounded-full'><span className="carousel-control-next-icon" /></span>
                            } // Custom next icon
                            prevIcon={<span className="carousel-control-prev-icon" />} // Custom previous icon
                        >
                            {renderSlides()}
                        </Carousel>
                    </Modal.Body>
                    <Modal.Footer className="thumbnails flex space-x-4 justify-start items-center">
                        {renderThumbnails()}
                    </Modal.Footer>
                </Modal >
            }
        </>
    );
};

export default BaseCarousel;
