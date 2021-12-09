import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import s from './Form.module.css';

export default function Form({ onSubmit }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleQuerySubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.warning('Enter your request');
      return;
    }

    const params = { query: searchQuery };
    setSearchParams(params);
    setSearchQuery('');
  };

  return (
    <form className={s.form} onSubmit={handleQuerySubmit}>
      <button type="submit" className={s.button}>
        <ImSearch className={s.icon} />
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
  );
}
