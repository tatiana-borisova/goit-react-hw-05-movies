import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchReviews, onFetchError } from '../../apiService/fetchApi';
import s from './Reviews.module.css';

const getAvatarUrl = path => {
  if (!path) {
    return 'https://img2.freepng.ru/20180529/hao/kisspng-user-profile-computer-icons-login-user-avatars-5b0d943145b5c4.6135737115276165612855.jpg';
  } else if (path.startsWith('/http')) {
    return path.substr(1);
  }
  return `https://image.tmdb.org/t/p/w342/${path}`;
};

export default function Reviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchReviews(movieId)
      .then(movie => setReviews(movie.results))
      .catch(onFetchError);
  }, [movieId]);

  return (
    <>
      {reviews && reviews.length > 0 && (
        <ul className={s.list}>
          {reviews.map(review => (
            <li key={review.id} className={s.item}>
              <div className={s.author}>
                <div className={s.thumb}>
                  <img
                    className={s.img}
                    src={getAvatarUrl(review.author_details.avatar_path)}
                    alt=""
                  />
                </div>
                <h4 className={s.name}>{review.author}</h4>
              </div>
              <p className={s.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews && reviews.length === 0 && (
        <p className={s.noMovie}>
          ¯\_(ツ)_/¯ We don't have any reviews for this movie ¯\_(ツ)_/¯
        </p>
      )}
    </>
  );
}
