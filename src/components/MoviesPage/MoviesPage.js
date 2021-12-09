import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchMovieByKeyWord, onFetchError } from '../../apiService/fetchApi';
import Gallery from '../Gallery';
import Form from '../Form';

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
      {movies && <Gallery movies={movies} />}
    </>
  );
}
