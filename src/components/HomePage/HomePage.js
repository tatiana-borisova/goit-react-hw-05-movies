import React, { useState, useEffect, lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import {
  fetchTrendingMovies,
  onFetchError,
} from '../../apiService/fetchApi.js';
import s from './HomePage.module.css';

const Gallery = lazy(() => import('../Gallery'));

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
      {movies && (
        <Suspense
          fallback={
            <Loader
              color="#0f548d"
              height={150}
              width={150}
              style={{ textAlign: 'center' }}
            />
          }
        >
          <Gallery movies={movies} />
        </Suspense>
      )}
    </>
  );
}
