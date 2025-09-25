import axios from 'axios';

// Створи фільмотеку з популярними фільмами, для цього використай
// https://developer.themoviedb.org/reference/trending-movies

// Щоб отримати постер фільму потрібно підставити url з відповіді від бекенду та url з документації
// https://developer.themoviedb.org/docs/image-basics

// Відмалюй картки з фільмами
// Приклад картки  => https://prnt.sc/Hi_iLLg7Nd1F

// Реалізуй пагінацію
// 1 Кнопка "Load More"

const BASE_URL = 'https://api.themoviedb.org/3';
const END_POINT = '/trending/movie/week';

const listEl = document.querySelector('.js-movie-list');
const loadBtnEl = document.querySelector('.js-load-more');
let page = 1;

loadBtnEl.addEventListener('click', onLoadMore);

async function fetchMovie(page = 1) {
  const { data } = await axios(`${BASE_URL}${END_POINT}`, {
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzNkYTg1YjdiMTgwMTFkMDZmNDljMzVlMzJmNTBmYyIsIm5iZiI6MTc1ODgwNzcyNi44MzUsInN1YiI6IjY4ZDU0NmFlY2ZhMzk5YTdhMzg4NDY0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HIH7WAO_7YA7uFw0JeN0tlufbUsG2iJbWO_w9tF8nU8',
    },
    params: {
      page,
    },
  });

  return data;
}

fetchMovie(page)
  .then(response => {
    console.log(response);
    listEl.insertAdjacentHTML('beforeend', createMarkup(response.results));
    if (response.page < response.total_pages) {
      loadBtnEl.classList.replace('load-more-hidden', 'load-more');
    }
  })
  .catch(error => {
    alert(error.message);
  });

function createMarkup(arr) {
  return arr
    .map(
      ({ poster_path, release_date, original_title, vote_average }) => `
    <li class="movie-card">
    <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}"/>
    <div class="movie-info">
    <h2${original_title}h2>
    <p>Release date: ${release_date}</p>
    <p>Vote average: ${vote_average}</p>
    </div>
    </li>`
    )
    .join('');
}

async function onLoadMore() {
  page += 1;
  loadBtnEl.disabled = true;
  try {
    const data = await fetchMovie(page);
    listEl.insertAdjacentHTML('beforeend', createMarkup(data.results));
    if (data.page >= data.total_pages) {
      loadBtnEl.classList.replace('load-more', 'load-more-hidden');
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loadBtnEl.disabled = false;
  }
}
