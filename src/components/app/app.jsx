import React from "react";

import Timer from "../timer/timer.jsx";
import PropTypes from "prop-types";

export default function App(props) {
  const {step, errorCount, time, renderErrors, getScreen} = props;

  return (
    <section className="game">
      <header
        style={{display: step === -1 ? `none` : `flex`}}
        className="game__header"
      >
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img
            className="game__logo"
            src="img/melody-logo-ginger.png"
            alt="Угадай мелодию"
          />
        </a>

        <Timer minutes={Math.floor(time / 60)} seconds={time % 60} />

        <div className="game__mistakes">{renderErrors(errorCount)}</div>
      </header>

      {getScreen(step)}
    </section>
  );
}

App.propTypes = {
  errorCount: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  renderErrors: PropTypes.func.isRequired,
  getScreen: PropTypes.func.isRequired
};
