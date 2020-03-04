import React from "react";
import PropTypes from "prop-types";

export default function ModalError(props) {
  const {errorMessage} = props;
  return (
    <section className="modal">
      <h2 className="modal__title">An error occurred!</h2>
      <p className="modal__text">
        {`Status: ${errorMessage.status}
        ${errorMessage.data.error}`}
        <br />
        Please reload the page
      </p>
    </section>
  );
}

ModalError.propTypes = {
  errorMessage: PropTypes.shape({
    status: PropTypes.number.isRequired,
    data: PropTypes.shape({
      error: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
