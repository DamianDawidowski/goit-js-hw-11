import axios from 'axios';
import './css/styles.css';

// import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const form = document.querySelector('form');
const input = document.querySelector('input');
const searchBtn = document.querySelector('button');
const imageGallery = document.querySelector('.gallery');


// var axios = require('axios');

  

form.addEventListener('submit', (e) => {
  console.log(input.value);
  e.preventDefault();
  if (!input.value.trim()) {
    // images.textContent = '';
    console.log('WORKS2');
    // Notiflix.Notify.failure(`Oops, there is no country with that name`);
    return;
  }

  fetchImages(`${input.value.trim()}`)
    .then(countries => {
      console.log('WORKS3');
      console.log(input.value);

      renderImages(countries);
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

  
      //  (extraHTML = <div class="eachimage"><img class="eachFlag"  src=${image.webformatURL} /> </div>)
      
    //    <h2 class="singleimageName">${image.name}</h2>
    //    </div>
    //  <div class="eachInfo"> <span class="eachHighlight">Capital: </span><p class="eachValue"> ${image.capital}</p></div>
    //   <div class="eachInfo"> <span class="eachHighlight">Population: </span><p class="eachValue"> ${image.population}</p></div>
    //    <div class="eachInfo"> <p class="eachHighlight removeMargin">Languages: </p><span class="eachValue">${image.languages[0].name};

      // for (let i = 1; i < image.languages.length - 1; i++) {
      //   extraHTML = extraHTML + `, ${image.languages[i].name};
      // }

      // extraHTML = extraHTML + ` </span></div>`;
  
    })

    .join('');
   console.log(images);
  imageGallery.innerHTML = markup;
}

async function fetchImages(query) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=34020653-837b1231ff9ac2e46753275a8&q=${query}&image_type=photo&orientation=hohorizontal&safesearch=true`
    );
    console.log(`Pixabay response is ` + response);
    console.log( response.hits);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}




  // function fetchImages(query) {
  // return   axios


// async function fetchImages(query) {
//   return await axios
//     .get(
//       `https://pixabay.com/api/?key=34020653-837b1231ff9ac2e46753275a8&q=${query}&image_type=photo`
//     )
//     .then(response => {
//       if (!response.ok) {
//         console.log('WORKS7');
//         throw new Error(response.status);
//       }

//       return response.json();
//     });
// }

//XXXXXXXXXXXXXXXX
// 34020653-837b1231ff9ac2e46753275a8
