import { useState, useEffect } from 'react';
import {
  fetchTrendingMovies,
  onFetchError,
} from '../../apiService/fetchApi.js';
import Gallery from '../Gallery';
import s from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetchTrendingMovies()
      .then(({ results }) => setMovies(results))
      .catch(onFetchError);
  }, []);

  return (
    <>
      <h1 className={s.title}>Trending today</h1>
      {movies && <Gallery movies={movies} />}
    </>
  );
}
