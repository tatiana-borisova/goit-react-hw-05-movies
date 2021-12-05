import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
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
    <>
      <h1 className={s.pageTitle}>Trending today</h1>
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
    </>
  );
}
