import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

export default function ResultLose(props) {
  const {onClick, time} = props;
  const message = time
    ? `You have exceeded the number of allowed mistakes!`
    : `You run out of time!`;
  return (
    <section className="result">
      <div className="result__logo">
        <img
          src="img/melody-logo.png"
          alt="Угадай мелодию"
          width="186"
          height="83"
        />
      </div>
      <h2 className="result__title">Game Over!</h2>
      <p className="result__total result__total--fail">
        {message}
        <br />
        No worries, next time is gonna be better!
      </p>
      <Link to="/" className="replay" onClick={onClick}>
        Try Again!
      </Link>
    </section>
  );
}

ResultLose.propTypes = {
  onClick: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired
};
