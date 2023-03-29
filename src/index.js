import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', handleSearch);

function handleSearch() {
  console.log('searched');
}
