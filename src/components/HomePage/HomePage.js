import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchTrendingMovies,
  onFetchError,
} from '../../apiService/fetchApi.js';
import s from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies()
      .then(({ results }) => setMovies(results))
      .catch(onFetchError);
  }, []);

  return (
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
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
