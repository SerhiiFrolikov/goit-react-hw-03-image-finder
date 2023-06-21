import PropTypes from 'prop-types';
import { GalleryItem, ImgItem } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ id, onClick, src, alt }) => {
  return (
    <GalleryItem id={id} onClick={onClick}>
      <ImgItem src={src} alt={alt} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
