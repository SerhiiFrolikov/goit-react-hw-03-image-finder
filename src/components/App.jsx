import { Component } from 'react';
import { PixabayAPI } from 'api/pixabayApi';
import Notiflix from 'notiflix';
import { Container } from './App.styled';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imagegallery/ImageGallery';
import { Button } from './button/Button';
import Loader from './loader/Loader';

const pixabayApi = new PixabayAPI();

class App extends Component {
  state = {
    query: '',
    pageNumber: 1,
    cards: [],
    loaderVisible: false,
    loadMoreBtn: false,
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.pageNumber !== this.state.pageNumber
    ) {
      this.setState({ loaderVisible: true });
      try {
        const { data } = await pixabayApi.fetchPhotos(
          this.state.query,
          this.state.pageNumber
        );
        this.handleSuccessFetch(data);
      } catch (error) {
        this.handleErrorFetch(error);
      } finally {
        this.setState({ loaderVisible: false });
      }
    }
  }

  handleSubmitForm = query => {
    if (this.state.query !== query) {
      this.setState({
        cards: [],
        pageNumber: 1,
        query,
        loadMoreBtn: false,
      });
    }
  };

  handleLoadMoreBtnClick = () => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
      loadMoreBtn: true,
    }));
  };

  handleSuccessFetch(data) {
    if (data.totalHits === 0) {
      this.setState({ loadMoreBtn: false });
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    this.setState(prevState => ({
      loaderVisible: false,
      cards: [...prevState.cards, ...data.hits],
      loadMoreBtn: true,
    }));
    if (data.hits.length < 12) {
      this.setState({ loadMoreBtn: false });
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  }

  handleErrorFetch(error) {
    Notiflix.Notify.failure(error.message);
  }

  render() {
    return (
      <Container>
        <Searchbar handleSubmit={this.handleSubmitForm} />
        <ImageGallery cards={this.state.cards} />
        {this.state.loaderVisible && <Loader />}
        {this.state.loadMoreBtn && (
          <Button handleSubmit={this.handleLoadMoreBtnClick} />
        )}
      </Container>
    );
  }
}

export default App;
