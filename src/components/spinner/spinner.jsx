import React from "react";
import PropTypes from "prop-types";

export default function Spinner(props) {
  return (
    <img
      style={props.style}
      width={100}
      height={100}
      src="img/loading_spinner.gif"
      alt="preloader"
    />
  );
}

Spinner.propTypes = {
  style: PropTypes.object
};
