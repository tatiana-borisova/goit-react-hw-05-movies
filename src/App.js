import { Routes, Route } from 'react-router-dom';
import Section from './components/Section';
import AppBar from './components/AppBar';
import HomePage from './components/HomePage';
import MoviesPage from './components/MoviesPage';
import MovieDetailsPage from './components/MovieDetailsPage';
import Cast from './components/Cast';
import Reviews from './components/Reviews';

export default function App() {
  return (
    <Section>
      <AppBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>

        <Route path="*" element={<HomePage />} />
      </Routes>
    </Section>
  );
}
