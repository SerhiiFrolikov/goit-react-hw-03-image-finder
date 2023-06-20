import PropTypes from 'prop-types';
import { Component } from 'react';
import { LoadMoreBtn } from './Button.styled';

export class Button extends Component {
  handleBtnClick = () => {
    this.props.handleSubmit();
  };

  render() {
    return (
      <LoadMoreBtn onClick={this.handleBtnClick} type="button">
        Load more
      </LoadMoreBtn>
    );
  }
}

Button.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
