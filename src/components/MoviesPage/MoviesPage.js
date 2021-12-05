import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { Link, Outlet } from 'react-router-dom';
import { fetchMovieByKeyWord, onFetchError } from '../../apiService/fetchApi';
import s from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleQueryChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleQuerySubmit = e => {
    e.preventDefault();

    fetchMovieByKeyWord(searchQuery)
      .then(movies => setMovies(movies.results))
      .catch(onFetchError);

    setSearchQuery('');
  };

  return (
    <>
      <form className={s.form} onSubmit={handleQuerySubmit}>
        <button type="submit" className={s.button}>
          <ImSearch />
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          onChange={handleQueryChange}
          value={searchQuery}
        />
      </form>
      {movies && (
        <ul className={s.list}>
          {movies.map(movie => (
            <li className={s.item} key={movie.id}>
              <Link className={s.link} to={`/movies/${movie.id}`}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Outlet />
    </>
  );
}
