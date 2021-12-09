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

  const getAvatarUrl = actor => {
    if (!actor.profile_path) {
      if (actor.gender === 1) {
        return 'https://cdn0.iconfinder.com/data/icons/user-pictures/100/female-512.png';
      }
      return 'https://cdn0.iconfinder.com/data/icons/user-pictures/100/male-512.png';
    }
    return `https://image.tmdb.org/t/p/w342/${actor.profile_path}`;
  };

  return (
    <>
      {cast && (
        <ul className={s.list}>
          {cast.map(actor => (
            <li key={actor.id} className={s.item}>
              <div className={s.thumb}>
                <img
                  className={s.img}
                  src={getAvatarUrl(actor)}
                  alt={actor.name}
                />
              </div>
              <div className={s.descr}>
                <h3 className={s.name}>{actor.name}</h3>
                <p className={s.character}>{actor.character}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
