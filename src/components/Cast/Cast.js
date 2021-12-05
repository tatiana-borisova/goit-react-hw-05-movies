import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchCast, onFetchError } from '../../apiService/fetchApi';
import s from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    fetchCast(movieId)
      .then(movie => setCast(movie.cast))
      .catch(onFetchError);
  }, [movieId]);

  return (
    <>
      {cast && (
        <ul className={s.list}>
          {cast.map(actor => (
            <li key={actor.id} className={s.item}>
              <div className={s.thumb}>
                <img
                  className={s.img}
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w342/${actor.profile_path}`
                      : 'https://i.work.ua/career_guide/59_b.png'
                  }
                  alt={actor.name}
                />
              </div>
              <h3 className={s.name}>{actor.name}</h3>
              <p className={s.character}>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
