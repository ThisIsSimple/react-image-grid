import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

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

const ImgCell = styled.div``;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Container = styled.div`
  display: grid;
  gap: 0.2rem;
  ${(props) => props.count === 2 && `grid-template-columns: repeat(2, 1fr);`}
  ${(props) => props.isHorizontal && props.count === 3 && `grid-template-columns: repeat(2, 1fr);`}
  ${(props) => props.isHorizontal && props.count >= 4 && `grid-template-columns: repeat(3, 1fr);`}
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
    ${(props) => props.isHorizontal && props.count === 3 && `grid-column-end: 3;`}
    ${(props) => props.isHorizontal && props.count >= 4 && `grid-column-end: 4;`}
    ${(props) => !props.isHorizontal && props.count === 3 && `grid-row-end: 3;`}
    ${(props) => !props.isHorizontal && props.count >= 4 && `grid-row-end: 4;`}
  }
  ${(props) => (props.count === 2 ? `${ImgCell} {` : `${ImgCell}:not(:nth-child(1)) {`)}
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

const ImageGrid = ({ images, className, onClick }) => {
  const count = images.length;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHorizontal, setIsHorizontal] = useState(true);

  useEffect(() => {
    const img = new Image();
    const [firstImage] = images;
    img.src = firstImage;

    img.onload = () => {
      setImageLoaded(true);
      if (img.width > img.height) setIsHorizontal(true);
      else setIsHorizontal(false);
    };
  }, [images]);

  return imageLoaded && (
      <Container isHorizontal={isHorizontal} count={count} className={className}>
        {images.map(
          (image, index) =>
            index <= 3 && (
              <ImgCell key={image} onClick={e => onClick(image)}>
                <Img src={image} alt={image} />
                {count > 4 && index === 3 && (
                  <Overlay>
                    <h3>+{count - 3}</h3>
                  </Overlay>
                )}
              </ImgCell>
            ),
        )}
      </Container>
  );
};

ImageGrid.defaultProps = {
  className: '',
  onClick: () => {},
};

ImageGrid.propTypes = {
  images: PropTypes.array.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGrid;