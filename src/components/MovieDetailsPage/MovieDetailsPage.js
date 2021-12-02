import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { fetchMovieByKeyWord } from '../../apiService/fetchApi.js';
import s from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieByKeyWord(movieId).then(movie => setMovie(movie));
  }, [movieId]);

  return (
    <>
      {movie && (
        <div>
          <div className={s.info}>
            <img
              src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className={s.descr}>
              <h1>{movie.title}</h1>
              <p>User Score: {movie.vote_average * 10}%</p>
              <h2>Overview</h2>
              <p className={s.overview}>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
            </div>
          </div>
          <div className={s.addInfo}>
            <p>Additional information</p>
            <ul>
              <li>
                <NavLink className={s.link} to={`/movies/${movieId}/cast`}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink className={s.link} to={`/movies/${movieId}/reviews`}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
