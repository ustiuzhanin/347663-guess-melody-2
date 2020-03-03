import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

export default function ResultWin(props) {
  const {time, errors, onClick} = props;
  const hour = Math.floor(time / 60);
  const minutes = time % 60;
  return (
    <section className="login">
      <div className="login__logo">
        <img
          src="img/melody-logo.png"
          alt="Угадай мелодию"
          width="186"
          height="83"
        />
      </div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__total">
        За {hour} минуты и {minutes} секунд вы набрали 12 баллов (8 быстрых),
        совершив {errors} ошибки
      </p>
      <p className="login__text">
        Хотите сравнить свой результат с предыдущими попытками? Представтесь!
      </p>
      <form className="login__form" action="">
        <p className="login__field">
          <label className="login__label" htmlFor="name">
            Логин
          </label>
          <input className="login__input" type="text" name="name" id="name" />
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">
            Пароль
          </label>
          <input
            className="login__input"
            type="text"
            name="password"
            id="password"
          />
          <span className="login__error">Неверный пароль</span>
        </p>
        <button className="login__button button" type="submit">
          Войти
        </button>
      </form>
      <Link to="/" onClick={onClick} className="replay">
        Сыграть ещё раз
      </Link>
    </section>
  );
}

ResultWin.propTypes = {
  time: PropTypes.number.isRequired,
  errors: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};
