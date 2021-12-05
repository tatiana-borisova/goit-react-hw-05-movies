import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { Outlet } from 'react-router-dom';
import s from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  return (
    <>
      <form className={s.form}>
        <button type="submit" className={s.button}>
          <ImSearch />
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          onChange={handleQueryChange}
          value={searchQuery}
        />
      </form>
      <Outlet />
    </>
  );
}
