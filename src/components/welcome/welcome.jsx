import React from "react";
import Spinner from "../spinner/spinner.jsx";
import PropTypes from "prop-types";

export default function Welcome(props) {
  const {time, errorCount, onStartButtonClick, loading} = props;

  return (
    <section className="welcome">
      <div className="welcome__logo">
        <img
          src="img/melody-logo.png"
          alt="Угадай мелодию"
          width="186"
          height="83"
        />
      </div>

      {loading ? (
        <Spinner style={{position: `absolute`, top: `340px`}} />
      ) : (
        <button className="welcome__button" onClick={onStartButtonClick}>
          <span className="visually-hidden">Play</span>
        </button>
      )}

      <h2 className="welcome__rules-title">Game Rules</h2>
      <p className="welcome__text">The rules are simple:</p>
      <ul className="welcome__rules-list">
        <li>You have to answer all the questions in {time} minutes</li>
        <li>You are allowed to make {errorCount} mistakes.</li>
      </ul>
      <p className="welcome__text">Good Luck!</p>
    </section>
  );
}

Welcome.propTypes = {
  time: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  onStartButtonClick: PropTypes.func.isRequired
};
