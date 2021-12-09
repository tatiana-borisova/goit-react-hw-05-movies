import { IoChevronBackOutline } from 'react-icons/io5';
import s from './BackButton.module.css';

import { React } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToBack = () => {
    navigate(location?.state?.from ?? '/');
  };

  return (
    <button onClick={goToBack} type="button" className={s.button}>
      <IoChevronBackOutline className={s.icon} size="3em" />
      <span className={s.label}>Search</span>
    </button>
  );
}
