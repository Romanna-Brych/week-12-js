import"./assets/styles-C66Iylq-.js";import{a as m}from"./assets/vendor-CWxt7QI6.js";const p="https://api.themoviedb.org/3",g="/trending/movie/week",i=document.querySelector(".js-movie-list"),r=document.querySelector(".js-guard");let a=1;const d={root:null,scrollMargin:"0px",threshold:1},h=new IntersectionObserver(u,d);async function n(e=1){const{data:o}=await m(`${p}${g}`,{headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzNkYTg1YjdiMTgwMTFkMDZmNDljMzVlMzJmNTBmYyIsIm5iZiI6MTc1ODgwNzcyNi44MzUsInN1YiI6IjY4ZDU0NmFlY2ZhMzk5YTdhMzg4NDY0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HIH7WAO_7YA7uFw0JeN0tlufbUsG2iJbWO_w9tF8nU8"},params:{page:e}});return o}n(a).then(e=>{console.log(e),i.insertAdjacentHTML("beforeend",c(e.results)),e.page<e.total_pages&&h.observe(r)}).catch(e=>{alert(e.message)});function c(e){return e.map(({poster_path:o,release_date:s,original_title:t,vote_average:l})=>`
    <li class="movie-card">
    <img src="https://image.tmdb.org/t/p/w300${o}" alt="${t}"/>
    <div class="movie-info">
    <h2${t}h2>
    <p>Release date: ${s}</p>
    <p>Vote average: ${l}</p>
    </div>
    </li>`).join("")}function u(e,o){e.forEach(async s=>{if(s.isIntersecting){a+=1;try{const t=await n(a);i.insertAdjacentHTML("beforeend",c(t.results)),t.page>=t.total_pages&&o.unobserve(r)}catch(t){alert(t.message)}}})}
//# sourceMappingURL=page-3.js.map
