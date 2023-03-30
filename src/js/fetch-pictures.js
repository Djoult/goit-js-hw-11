export { fetchPictures };
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34731614-b41e97651a70304ab60586fa3';
const searchParams = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
  //   page: page,
});
function fetchPictures(query, page) {
  return fetch(`${BASE_URL}?${searchParams}&q='${query}'&page=${page}`).then(
    res => {
      if (!res.ok) {
        throw new Error(res.status);
        // Oops, there is no country with that name
      }
      return res.json();
    }
  );
}
