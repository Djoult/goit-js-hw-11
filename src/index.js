import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { fetchPictures } from './js/fetch-pictures';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', handleSearch);
loadBtn.addEventListener('submit', LoadMore);

let simpleLightbox = new SimpleLightbox('.gallery a');

let page = 1;

function handleSearch(e) {
  e.preventDefault();
  const searchQuery = e.target.elements.searchQuery.value.trim();
  page = 1;
  ClearMarkUp();
  if (searchQuery === '') {
    searchForm.reset();
    Notiflix.Notify.warning('Memento te hominem esse');
    return;
  }
  fetchPictures(searchQuery, page).then(data => {
    console.log(data);
    page += 1;
  });

  console.log(searchQuery);
}

function LoadMore() {
  fetchPictures(searchQuery, page).then(data => {
    console.log(data);
    page += 1;
  });
}

function createCards(data) {
  data.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      gallery.insertAdjacentHTML(
        'beforeend',
        `
        <a href="${largeImageURL}">
          <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${downloads}
              </p>
            </div>
          </div>
        </a>
        `
      );
    }
  );
}

function ClearMarkUp() {
  gallery.innerHTML = '';
}
