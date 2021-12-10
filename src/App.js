import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import Section from './components/Section';
import AppBar from './components/AppBar';
import HomePage from './components/HomePage';
import MoviesPage from './components/MoviesPage';

const MovieDetailsPage = lazy(() => import('./components/MovieDetailsPage'));
const Cast = lazy(() => import('./components/Cast'));
const Reviews = lazy(() => import('./components/Reviews'));
const loader = <Loader color="#0f548d" style={{ textAlign: 'center' }} />;

export default function App() {
  return (
    <Section>
      <AppBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route
          path="/movies/:movieId"
          element={
            <Suspense fallback={loader}>
              <MovieDetailsPage />
            </Suspense>
          }
        >
          <Route
            path="cast"
            element={
              <Suspense fallback={loader}>
                <Cast />
              </Suspense>
            }
          />
          <Route
            path="reviews"
            element={
              <Suspense fallback={loader}>
                <Reviews />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<HomePage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Section>
  );
}
