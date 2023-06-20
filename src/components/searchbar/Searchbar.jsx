import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Form,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

export class Searchbar extends Component {
  state = {
    query: '',
    pageNumber: 1,
  };

  addQueryName = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state.query);
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmitForm}>
          <SearchFormBtn type="submit" disabled={!this.state.query}>
            <SearchIcon width="30" height="30" />
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchFormInput
            value={this.state.query}
            onChange={this.addQueryName}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
