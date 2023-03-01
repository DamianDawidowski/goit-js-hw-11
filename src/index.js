import axios from 'axios';
import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const form = document.querySelector('form');
const input = document.querySelector('input');
const searchBtn = document.querySelector('button');
const imageGallery = document.querySelector('.gallery');
let page = 0;
const lightbox = () => new SimpleLightbox('.gallery a', {});
// var axios = require('axios');

form.addEventListener('submit', e => {
  page = 1;
  console.log(input.value);
  e.preventDefault();
  if (!input.value.trim()) {
    // images.textContent = '';
    console.log('WORKS2');
    // Notiflix.Notify.failure(`Oops, there is no country with that name`);
    return;
  }

  imageGallery.textContent = '';
  fetchImages(`${input.value.trim()}`)
    .then(countries => {
      console.log('WORKS3');
      console.log(input.value);
lightbox();
      renderImages(countries);
const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});






    })
    .catch(error => {
      Notiflix.Notify.failure(`Oops, there is no country with that name`);
      console.log('WORKS4');
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
      console.log('WORKS6');
      return `<div class="photo-card">
        <img src=${image.webformatURL} alt=${image.tags} loading="lazy" />
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
  console.log(images);
  imageGallery.insertAdjacentHTML('beforeend', markup);
}

async function fetchImages(query) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=34020653-837b1231ff9ac2e46753275a8&q=${query}&image_type=photo&orientation=hohorizontal&safesearch=true&page=${page}&per_page=40`
    );
    console.log(`Pixabay response is ` + response);
    console.log(response.hits);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  setTimeout(console.log({ scrollTop, scrollHeight, clientHeight }), 1000);

  if (clientHeight + scrollTop >= scrollHeight - 5) {
    page++;
    // show the loading animation
    fetchImages(`${input.value.trim()}`).then(countries => {
      console.log('WORKS3');
      console.log(input.value);
      console.log(`after scrolling current page value is ${page}`);
      renderImages(countries);
    });
    setTimeout(console.log('LOAD'), 1000);
  }
});

//XXXXXXXXXXXXXXXX
// 34020653-837b1231ff9ac2e46753275a8
