import React from "react";
import PropTypes from "prop-types";

export default function AuthorizationScreen(props) {
  const {onChange, onSubmit} = props;

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
      <h2 className="login__title">Fake authorization required!</h2>
      <p className="login__text">Please introduce yourself!</p>
      <form
        className="login__form"
        action=""
        onChange={onChange}
        onSubmit={onSubmit}
      >
        <p className="login__field">
          <label className="login__label" htmlFor="name">
            Email
          </label>
          <input className="login__input" type="text" name="email" id="name" />
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">
            Password
          </label>
          <input
            className="login__input"
            type="text"
            name="password"
            id="password"
          />
          <span className="login__error">Wrong Password</span>
        </p>
        <button className="login__button button" type="submit">
          Sign In
        </button>
      </form>
    </label>
  );
}

AuthorizationScreen.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
