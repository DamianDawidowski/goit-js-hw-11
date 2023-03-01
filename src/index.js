import axios from 'axios';
import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const form = document.querySelector('form');
const input = document.querySelector('input');
const imageGallery = document.querySelector('.gallery');
let page = 0;
let numberOfPages = Math.ceil(name.totalHits / 40);

form.addEventListener('submit', e => {
  page = 1;
  e.preventDefault();
  if (!input.value.trim()) {
    return;
  }

  imageGallery.textContent = '';
  fetchImages(`${input.value.trim()}`)
    .then(images => {
      new SimpleLightbox('.gallery a');
      renderImages(images);
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
      lightbox().refresh();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      Notiflix.Notify.failure(`Oops, there is no country with that name`);
    });
});

function renderImages(images) {
  if (images.hits.length == 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
  const markup = images.hits
    .map(image => {
      return `<div class="photo-card">
       <a class="gallery__item" href="${image.largeImageURL}"> <img src=${image.webformatURL} alt=${image.tags} loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${image.likes}
          </p>
          <p class="info-item">
            <b>Views</b>${image.views}
          </p>
          <p class="info-item">
            <b>Comments</b>${image.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${image.downloads}
          </p>
        </div>
      </div>`;
    })
    .join('');
  imageGallery.insertAdjacentHTML('beforeend', markup);
}

async function fetchImages(query) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=34020653-837b1231ff9ac2e46753275a8&q=${query}&image_type=photo&orientation=hohorizontal&safesearch=true&page=${page}&per_page=40`
    );
    return response.data;
  } catch (error) {}
}

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight - 5) {
    page++;
    if (page >= numberOfPages) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
    fetchImages(`${input.value.trim()}`).then(images => {
      renderImages(images);
      lightbox().refresh();
      new SimpleLightbox('.gallery a');
    });
  }
});
