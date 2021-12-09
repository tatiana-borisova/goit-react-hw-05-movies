import { AiFillStar } from 'react-icons/ai';
import s from './GalleryItem.module.css';

export default function GalleryItem({ movie }) {
  return (
    <>
      <div className={s.thumb}>
        <img
          className={s.img}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
              : 'https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png'
          }
          alt={movie.title}
        />
      </div>
      <div className={s.descr}>
        <h3 className={s.title}>{movie.title}</h3>
        <p className={s.vote}>
          <AiFillStar className={s.icon} />
          {movie.vote_average}
        </p>
      </div>
    </>
  );
}
