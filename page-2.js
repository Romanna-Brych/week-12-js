import"./assets/styles-C66Iylq-.js";import{a as d}from"./assets/vendor-CWxt7QI6.js";const m="https://api.themoviedb.org/3",p="/trending/movie/week",s=document.querySelector(".js-movie-list"),a=document.querySelector(".js-load-more");let i=1;a.addEventListener("click",h);async function c(e=1){const{data:t}=await d(`${m}${p}`,{headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzNkYTg1YjdiMTgwMTFkMDZmNDljMzVlMzJmNTBmYyIsIm5iZiI6MTc1ODgwNzcyNi44MzUsInN1YiI6IjY4ZDU0NmFlY2ZhMzk5YTdhMzg4NDY0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HIH7WAO_7YA7uFw0JeN0tlufbUsG2iJbWO_w9tF8nU8"},params:{page:e}});return t}c(i).then(e=>{console.log(e),s.insertAdjacentHTML("beforeend",l(e.results)),e.page<e.total_pages&&a.classList.replace("load-more-hidden","load-more")}).catch(e=>{alert(e.message)});function l(e){return e.map(({poster_path:t,release_date:r,original_title:o,vote_average:n})=>`
    <li class="movie-card">
    <img src="https://image.tmdb.org/t/p/w300${t}" alt="${o}"/>
    <div class="movie-info">
    <h2${o}h2>
    <p>Release date: ${r}</p>
    <p>Vote average: ${n}</p>
    </div>
    </li>`).join("")}async function h(){i+=1,a.disabled=!0;try{const e=await c(i);s.insertAdjacentHTML("beforeend",l(e.results)),e.page>=e.total_pages&&a.classList.replace("load-more","load-more-hidden")}catch(e){alert(e.message)}finally{a.disabled=!1}}
//# sourceMappingURL=page-2.js.map
