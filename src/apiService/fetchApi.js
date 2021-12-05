import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const key = '0acbef793912116e8168b05c9b24e1e7';
const baseURL = `https://api.themoviedb.org/3`;

// const URL = {
//   IMAGE: 'https://image.tmdb.org/t/p/w342',
//   TRAILER: 'https://www.youtube.com/embed/',
// };

export function fetchTrendingMovies() {
  return fetch(`${baseURL}/trending/movie/day?api_key=${key}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    },
  );
}

export function fetchMovieById(query) {
  return fetch(`${baseURL}/movie/${query}?api_key=${key}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  });
}

export function fetchCast(query) {
  return fetch(`${baseURL}/movie/${query}/credits?api_key=${key}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    },
  );
}

export function fetchReviews(query) {
  return fetch(`${baseURL}/movie/${query}/reviews?api_key=${key}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    },
  );
}

export function fetchMovieByKeyWord(query) {
  return fetch(`${baseURL}/search/movie?api_key=${key}&query=${query}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    },
  );
}

// https://api.themoviedb.org/3/search/movie?api_key=0acbef793912116e8168b05c9b24e1e7&language=en-US&query=venom&page=1&include_adult=false

export function onFetchError() {
  toast.error('No matches found, please try again');
}
