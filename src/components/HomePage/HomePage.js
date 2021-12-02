import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTrendingMovies } from '../../apiService/fetchApi.js';
import s from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(({ results }) => setMovies(results));
  }, []);

  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id} className={s.item}>
          <Link className={s.link} to={`/movies/${movie.id}`}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
