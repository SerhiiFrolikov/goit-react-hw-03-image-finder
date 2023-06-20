import PropTypes from 'prop-types';
import { GalleryItem, ImgItem } from './ImageGalleryItem.styled';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <GalleryItem id={this.props.id} onClick={this.props.onClick}>
        <ImgItem src={this.props.src} alt={this.props.alt} />
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
