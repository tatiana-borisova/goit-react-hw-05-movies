import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { AiFillStar } from 'react-icons/ai';
import { Link, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
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

    if (searchQuery.trim() === '') {
      toast.warning('Enter your request');
      return;
    }

    fetchMovieByKeyWord(searchQuery)
      .then(movies => {
        if (movies.results.length === 0) {
          toast.error(`No movies found for "${searchQuery}". Try again.`);
          return;
        }
        setMovies(movies.results);
      })
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
            <li key={movie.id} className={s.item}>
              <Link className={s.link} to={`/movies/${movie.id}`}>
                <div className={s.thumb}>
                  <img
                    className={s.img}
                    src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                    alt={`There is no poster for the movie "${movie.title}"`}
                  />
                </div>
                <h3 className={s.title}>{movie.title}</h3>
                <p className={s.vote}>
                  <AiFillStar className={s.icon} />
                  {movie.vote_average}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Outlet />
    </>
  );
}
