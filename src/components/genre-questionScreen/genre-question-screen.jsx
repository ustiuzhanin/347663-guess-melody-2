import React from "react";
import PropTypes from "prop-types";

export default function GenreQuestionScreen(props) {
  const {
    screenIndex,
    question,
    onAnswer,
    renderPlayer,
    onSubmitBtnClick,
    onClick
  } = props;
  const {genre, answers} = question;

  return (
    <section className="game game--genre">
      <section className="game__screen">
        <h2 className="game__title">Guess the melody</h2>
        <p className="game__text">Genre: {genre}</p>
        <form
          className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();

            onAnswer();
            onSubmitBtnClick();
          }}
        >
          {answers.map((answer, i) => {
            return (
              <div key={`${screenIndex}-answer-${i}`} className="track">
                {renderPlayer(answer, i)}
                <div className="game__answer">
                  <input
                    className="game__input visually-hidden"
                    type="checkbox"
                    name="answer"
                    value={`${i}`}
                    id={`answer-${i + 1}`}
                    onClick={(e) => {
                      onClick(e);
                    }}
                  />
                  <label className="game__check" htmlFor={`answer-${i + 1}`}>
                    Select
                  </label>
                </div>
              </div>
            );
          })}
          <button className="game__submit button" type="submit">
            Ответить
          </button>
        </form>
      </section>
    </section>
  );
}

GenreQuestionScreen.propTypes = {
  screenIndex: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    genre: PropTypes.string.isRequired,
    answers: PropTypes.array.isRequired
  }).isRequired,
  renderPlayer: PropTypes.func.isRequired,
  onSubmitBtnClick: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
