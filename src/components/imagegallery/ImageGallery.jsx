import PropTypes from 'prop-types';
import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';
import { Modal } from '../modal/Modal';
import ImageGalleryItem from '../imagegalleryitem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    url: '',
    openModal: false,
  };

  addModalUrl = url => {
    this.setState({
      url,
      openModal: true,
    });
  };

  handleOpenModal = () => {
    this.setState({
      openModal: false,
    });
  };

  render() {
    return (
      <>
        <Gallery>
          {this.props.cards.map(({ id, webformatURL, tags, largeImageURL }) => {
            return (
              <ImageGalleryItem
                id={id}
                key={id}
                onClick={() => this.addModalUrl(largeImageURL)}
                src={webformatURL}
                alt={tags}
              />
            );
          })}
        </Gallery>
        {this.state.openModal && (
          <Modal url={this.state.url} openModal={this.handleOpenModal} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ).isRequired,
};
