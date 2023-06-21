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
    const { query, pageNumber } = this.state;
    if (prevState.query !== query || prevState.pageNumber !== pageNumber) {
      this.setState({ loaderVisible: true });
      try {
        const { data } = await pixabayApi.fetchPhotos(query, pageNumber);
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

    const images = data.hits.map(
      ({ id, tags, webformatURL, largeImageURL }) => ({
        id,
        tags,
        webformatURL,
        largeImageURL,
      })
    );
    this.setState(prevState => ({
      loaderVisible: false,
      cards: [...prevState.cards, ...images],
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
    const { cards, loaderVisible, loadMoreBtn } = this.state;
    return (
      <Container>
        <Searchbar handleSubmit={this.handleSubmitForm} />
        <ImageGallery cards={cards} />
        {loaderVisible && <Loader />}
        {loadMoreBtn && <Button handleSubmit={this.handleLoadMoreBtnClick} />}
      </Container>
    );
  }
}

export default App;
