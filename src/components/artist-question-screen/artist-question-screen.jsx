import React from "react";
import PropTypes from "prop-types";

export default function ArtistQuestionScreen(props) {
  const {question, onAnswer, renderPlayer, onSubmitBtnClick} = props;
  const {answers, song} = question;

  return (
    <section className="game game--artist">
      <section className="game__screen">
        <h2 className="game__title">Who is performing this song?</h2>
        <div className="game__track">
          <div className="track">{renderPlayer(song, 0)}</div>
        </div>

        <form className="game__artist">
          {answers.map((answer, i) => {
            return (
              <div key={`answer-${i}`} className="artist">
                <input
                  className="artist__input visually-hidden"
                  type="radio"
                  name="answer"
                  value={`${i}`}
                  id={`answer-${i + 1}`}
                  onClick={(evt) => {
                    onSubmitBtnClick();
                    onAnswer(+evt.target.value);
                  }}
                />
                <label className="artist__name" htmlFor={`answer-${i + 1}`}>
                  <img
                    className="artist__picture"
                    src={answer.picture}
                    alt={answer.artist}
                  />
                  {answer.artist}
                </label>
              </div>
            );
          })}
        </form>
      </section>
    </section>
  );
}

ArtistQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.array.isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  renderPlayer: PropTypes.func.isRequired,
  onSubmitBtnClick: PropTypes.func.isRequired
};
