import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', handleSearch);

function handleSearch(e) {
  e.preventDefault();
  const searchQuery = e.target.elements.searchQuery.value;
  console.log(searchQuery);
}
