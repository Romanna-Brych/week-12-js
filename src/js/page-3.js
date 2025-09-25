import axios from 'axios';

// 2 Infinity scroll (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
const BASE_URL = 'https://api.themoviedb.org/3';
const END_POINT = '/trending/movie/week';

const listEl = document.querySelector('.js-movie-list');
const guardEl = document.querySelector('.js-guard');
let page = 1;

const options = {
  root: null,
  scrollMargin: '0px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(handlePagination, options);

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
  .then(data => {
    console.log(data);
    listEl.insertAdjacentHTML('beforeend', createMarkup(data.results));

    if (data.page < data.total_pages) {
      observer.observe(guardEl);
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

function handlePagination(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      page += 1;
      try {
        const data = await fetchMovie(page);
        listEl.insertAdjacentHTML('beforeend', createMarkup(data.results));

        if (data.page >= data.total_pages) {
          observer.unobserve(guardEl);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  });
}
