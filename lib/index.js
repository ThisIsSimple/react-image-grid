import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./style.css";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
`;

const ImgCell = styled.div`
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Container = styled.div`
  display: grid;
  ${(props) => `gap: ${props.gap};`}
  ${(props) => props.count === 2 && `grid-template-columns: repeat(2, 1fr);`}
  ${(props) =>
    props.isHorizontal &&
    props.count === 3 &&
    `grid-template-columns: repeat(2, 1fr);`}
  ${(props) =>
    props.isHorizontal &&
    props.count >= 4 &&
    `grid-template-columns: repeat(3, 1fr);`}
  ${(props) =>
    !props.isHorizontal &&
    props.count === 3 &&
    `grid-template-columns: 2fr 1fr; grid-template-rows: repeat(2, 1fr);`}
  ${(props) =>
    !props.isHorizontal &&
    props.count >= 4 &&
    `grid-template-columns: 2fr 1fr; grid-template-rows: repeat(3, 1fr);`}
  ${ImgCell}:nth-child(1) {
    grid-column-start: 1;
    grid-row-start: 1;
    ${(props) =>
      props.isHorizontal && props.count === 3 && `grid-column-end: 3;`}
    ${(props) =>
      props.isHorizontal && props.count >= 4 && `grid-column-end: 4;`}
    ${(props) => !props.isHorizontal && props.count === 3 && `grid-row-end: 3;`}
    ${(props) => !props.isHorizontal && props.count >= 4 && `grid-row-end: 4;`}
  }
  ${(props) =>
    props.count === 2 ? `${ImgCell} {` : `${ImgCell}:not(:nth-child(1)) {`}
    position: relative;
    &:after {
      content: '';
      display: block;
      padding-bottom: 100%;
    }
    ${Img} {
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      position: absolute;
    }
  }
`;

const ImageGrid = ({ images, gap, className, onClick, modal }) => {
  const count = images.length;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHorizontal, setIsHorizontal] = useState(true);

  const [open, setOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const handleClick = (clickedImage) => {
    setImageIndex(images.indexOf(clickedImage));
    setOpen(true);
    onClick(clickedImage);
  };

  useEffect(() => {
    const img = new Image();
    const [firstImage] = images;
    img.src = firstImage;

    img.onload = () => {
      setImageLoaded(true);
      if (img.width > img.height) setIsHorizontal(true);
      else setIsHorizontal(false);
    };

    setGalleryImages(
      images.map((image) => ({
        original: image,
      }))
    );
  }, [images]);

  return (
    imageLoaded && (
      <>
        <Container
          isHorizontal={isHorizontal}
          count={count}
          gap={gap}
          className={className}
        >
          {images.map(
            (image, index) =>
              index <= 3 && (
                <ImgCell
                  key={image}
                  onClick={() => handleClick(image)}
                >
                  <Img src={image} alt={image} />
                  {count > 4 && index === 3 && (
                    <Overlay>
                      <h3>+{count - 3}</h3>
                    </Overlay>
                  )}
                </ImgCell>
              )
          )}
        </Container>
        {modal && (
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            closeIcon={
              <div style={{color: "white"}}>
                <svg
                  style={{width: '2rem'}}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            }
            center
            styles={{
              modalContainer: {
                overflow: "hidden",
              },
              modal: {
                maxWidth: "100vw",
                width: "100vw",
                height: "100vh",
                top: 0,
                left: 0,
                margin: 0,
                padding: 0,
                background: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
            animationDuration={0}
          >
            <ImageGallery
              items={galleryImages}
              showPlayButton={false}
              showFullscreenButton={false}
              showThumbnails={false}
              startIndex={imageIndex}
            />
          </Modal>
        )}
      </>
    )
  );
};

ImageGrid.defaultProps = {
  className: "",
  gap: "0.2rem",
  modal: true,
  onClick: () => {},
};

ImageGrid.propTypes = {
  images: PropTypes.array.isRequired,
  gap: PropTypes.string,
  className: PropTypes.string,
  modal: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ImageGrid;
