import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchCredits } from '../../apiService/fetchApi';

export default function Cast() {
  console.log('HELLO');
  const param = useParams();
  console.log(param);

  //   const [credits, setCredits] = useState(null);

  //   useEffect(() => {
  //     fetchCredits(movieId).then(movie => setCredits(movie));
  //   }, [movieId]);

  //   console.log(credits);

  return <div>HALLO!</div>;
}
