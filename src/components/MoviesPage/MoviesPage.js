import React, { useState, useEffect, lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchMovieByKeyWord, onFetchError } from '../../apiService/fetchApi';
import Form from '../Form';

const Gallery = lazy(() => import('../Gallery'));

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('query') || '';

  useEffect(() => {
    searchQuery &&
      fetchMovieByKeyWord(searchQuery)
        .then(movies => {
          if (movies.results.length === 0) {
            toast.error(`No movies found for "${searchQuery}". Try again.`);
            setMovies(null);
            return;
          }
          setMovies(movies.results);
        })
        .catch(onFetchError);
  }, [searchQuery]);

  return (
    <>
      <Form />
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
