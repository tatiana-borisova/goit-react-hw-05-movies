import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import s from './Gallery.module.css';
import GalleryItem from '../GalleryItem/GalleryItem';

export default function Gallery({ movies }) {
  const location = useLocation();

  return (
    <ul className={s.list}>
      {movies.map(movie => (
        <li key={movie.id} className={s.item}>
          <Link
            className={s.link}
            to={`/movies/${movie.id}`}
            state={{
              from: location,
            }}
          >
            <GalleryItem movie={movie} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
