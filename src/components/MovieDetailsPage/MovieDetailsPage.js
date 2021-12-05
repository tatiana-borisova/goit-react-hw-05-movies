import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useParams } from 'react-router';
import { fetchMovieById } from '../../apiService/fetchApi.js';
import s from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieById(movieId).then(movie => setMovie(movie));
  }, [movieId]);

  return (
    <>
      {movie && (
        <div
          className={s.background}
          style={{
            backgroundImage: `linear-gradient(to right,rgba(255, 255, 255, 0.9),rgba(255, 231, 231, 0.9)),url('https://image.tmdb.org/t/p/w342/${movie.backdrop_path}')`,
          }}
        >
          <div className={s.info}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpwWJq3_l53c_y23r8gbPaeETCmAmVo9F25A&usqp=CAU'
              }
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
          <Outlet />
        </div>
      )}
    </>
  );
}
