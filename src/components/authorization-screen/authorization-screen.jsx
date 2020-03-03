import React from "react";
import PropTypes from "prop-types";

export default function AuthorizationScreen(props) {
  const {onChange, onSubmit} = props;

  const onBtnCLick = (evt) => {
    evt.preventDefault();

    // props.history.goBack();
  };

  return (
    <label className="login">
      <div className="login__logo">
        <img
          src="img/melody-logo.png"
          alt="Угадай мелодию"
          width="186"
          height="83"
        />
      </div>
      <h2 className="login__title">Необходима авторизация</h2>
      <p className="login__text">Представтесь!</p>
      <form
        className="login__form"
        action=""
        onChange={onChange}
        onSubmit={onSubmit}
      >
        <p className="login__field">
          <label className="login__label" htmlFor="name">
            Логин
          </label>
          <input className="login__input" type="text" name="email" id="name" />
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
        <button
          className="login__button button"
          type="submit"
          onClick={(evt) => onBtnCLick(evt)}
        >
          Войти
        </button>
      </form>
    </label>
  );
}

AuthorizationScreen.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
