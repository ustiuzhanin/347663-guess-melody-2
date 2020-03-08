import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

export default function ResultWin(props) {
  const {time, errors, onClick} = props;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
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
      <h2 className="login__title">You are an actual music lover!</h2>
      <p className="login__total">
        For {minutes} minutes and {seconds} seconds you`ve scored 12 points, and
        made {errors} mistakes
      </p>
      <Link to="/" onClick={onClick} className="replay">
        Try Again!
      </Link>
    </section>
  );
}

ResultWin.propTypes = {
  time: PropTypes.number.isRequired,
  errors: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};
