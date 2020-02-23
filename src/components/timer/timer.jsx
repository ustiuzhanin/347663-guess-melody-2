import React from "react";
import PropTypes from "prop-types";

export default function Timer(props) {
  const {minutes, seconds} = props;
  return (
    <div className="timer__value">
      <span className="timer__mins">{minutes}</span>
      <span className="timer__dots">:</span>
      <span className="timer__secs">{seconds}</span>
    </div>
  );
}

Timer.propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired
};
