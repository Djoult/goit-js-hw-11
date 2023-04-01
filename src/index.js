import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPictures } from './js/fetch-pictures';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', handleSearch);
loadBtn.addEventListener('click', handleLoadMore);

let simpleLightbox = null;
let searchQuery = null;
let page = 1;

async function handleSearch(e) {
  e.preventDefault();
  searchQuery = e.target.elements.searchQuery.value.trim();
  page = 1;
  ClearMarkUp();
  if (searchQuery === '') {
    searchForm.reset();
    loadBtn.classList.add('is-hidden');
    Notiflix.Notify.warning('Please, enter a request', {
      clickToClose: true,
    });
    return;
  }
  try {
    const {
      hits: pictures,
      totalHits: totalQuantity,
      total: quantity,
    } = await fetchPictures(searchQuery, page);
    if (quantity === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        {
          clickToClose: true,
        }
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${totalQuantity} images.`, {
      clickToClose: true,
    });
    createCards(pictures);
    simpleLightbox = new SimpleLightbox('.gallery a', {
      // navText: ['&#11178;', '&#11179;'],
      navText: ['&#8656;', '&#8658;'],
      //   closeText: "&#10015;", краще не розкоментовувати :)
      closeText: '&#10803',
      showCounter: false,
    });
    if (totalQuantity < page * 40) {
      loadBtn.classList.add('is-hidden');
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results.",
        { clickToClose: true }
      );
      createEndMessage();
      return;
    }
    loadBtn.classList.remove('is-hidden');
  } catch {
    Notiflix.Notify.failure('Please try again later.'),
      {
        clickToClose: true,
      };
  }

  console.log(searchQuery);
}

async function handleLoadMore() {
  page += 1;
  try {
    const {
      hits: pictures,
      totalHits: totalQuantity,
      total: quantity,
    } = await fetchPictures(searchQuery, page);
    createCards(pictures);
    simpleLightbox.refresh();
    autoScrollPage();

    if (totalQuantity < page * 40) {
      loadBtn.classList.add('is-hidden');
      createEndMessage();
      return;
    }
  } catch (err) {
    console.log(err);
    Notiflix.Notify.failure('Please try again later.'),
      {
        clickToClose: true,
      };
  }
}
function createEndMessage() {
  gallery.insertAdjacentHTML(
    'beforeend',
    `
    <p class="end-message">
      The end :)
    </p>
    `
  );
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

function autoScrollPage() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function ClearMarkUp() {
  gallery.innerHTML = '';
}
