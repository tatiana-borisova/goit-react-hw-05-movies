import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useLocation, useParams } from 'react-router';
import { fetchMovieById, onFetchError } from '../../apiService/fetchApi.js';
import BackButton from '../BackButton';
import s from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchMovieById(movieId)
      .then(movie => setMovie(movie))
      .catch(onFetchError);
  }, [movieId]);

  return (
    <>
      <BackButton />
      {movie && (
        <div className={s.background}>
          <div
            className={s.info}
            style={{
              backgroundImage: `linear-gradient(to right,rgba(255, 255, 255, 0.9),rgba(231, 231, 255, 0.9)),url('https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}')`,
            }}
          >
            <img
              className={s.img}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png'
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
            <h3 className={s.title}>Additional information</h3>
            <ul className={s.list}>
              <li>
                <Link
                  className={s.link}
                  to={`/movies/${movieId}/cast`}
                  state={{
                    from: location?.state?.from,
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  className={s.link}
                  to={`/movies/${movieId}/reviews`}
                  state={{
                    from: location?.state?.from,
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
      )}
    </>
  );
}
