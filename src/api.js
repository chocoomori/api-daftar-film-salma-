import axios from "axios";

const apikey = import.meta.env.VITE_APIKEY;
const baseUrl = import.meta.env.VITE_BASEURL;

export const getMovieList = async () => {
  const movie = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?`, {  
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjRmOGQ3YzRmM2U0NWIzZTc0ZDExOTAwNGNmNjZlOSIsIm5iZiI6MTcyNTg2NDQxOC4yMDU2NCwic3ViIjoiNjZkOTEyMTc0Yjc0MTRkNGIxMWFkMDI1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.W8l3sGV6Ijem-onmIVKWIp24863r4MMPpaodTkQSf4E`,
      },
    }
  );
  return movie.data.results;
};

export const searchMovie = async (q) => {
  const search = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${q}`,
    {  
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjRmOGQ3YzRmM2U0NWIzZTc0ZDExOTAwNGNmNjZlOSIsIm5iZiI6MTcyNTg2NDQxOC4yMDU2NCwic3ViIjoiNjZkOTEyMTc0Yjc0MTRkNGIxMWFkMDI1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.W8l3sGV6Ijem-onmIVKWIp24863r4MMPpaodTkQSf4E`,
      },
    }
  );
  return search.data.results;
};



