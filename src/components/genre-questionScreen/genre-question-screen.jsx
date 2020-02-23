import React, {PureComponent} from "react";
import AudioPlayer from "../audio-player/audio-player.jsx";
import PropTypes from "prop-types";

export default class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userAnswer: [],
      activePlayer: -1
    };
  }

  render() {
    const {screenIndex, question, onAnswer} = this.props;
    const {genre, answers} = question;

    const btnClickHandler = (evt) => {
      const answerValue = +evt.target.value;

      if (evt.target.checked) {
        this.setState((prevState) => {
          return {
            userAnswer: [...prevState.userAnswer, answerValue]
          };
        });
      } else {
        this.setState((prevState) => ({
          userAnswer: prevState.userAnswer.filter(
              (answr) => answr !== answerValue
          )
        }));
      }
    };

    return (
      <section className="game game--genre">
        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form
            className="game__tracks"
            onSubmit={(evt) => {
              evt.preventDefault();

              onAnswer(this.state.userAnswer);
              this.setState({userAnswer: [], activePlayer: -1});
            }}
          >
            {answers.map((answer, i) => {
              return (
                <div key={`${screenIndex}-answer-${i}`} className="track">
                  <AudioPlayer
                    src={answer.src}
                    isPlaying={i === this.state.activePlayer}
                    onPlayButtonClick={() =>
                      this.setState({
                        activePlayer: this.state.activePlayer === i ? -1 : i
                      })
                    }
                  />
                  <div className="game__answer">
                    <input
                      className="game__input visually-hidden"
                      type="checkbox"
                      name="answer"
                      value={`${i}`}
                      id={`answer-${i + 1}`}
                      onClick={(e) => {
                        btnClickHandler(e);
                      }}
                    />
                    <label className="game__check" htmlFor={`answer-${i + 1}`}>
                      Отметить
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
}

GenreQuestionScreen.propTypes = {
  screenIndex: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    genre: PropTypes.string.isRequired,
    answers: PropTypes.array.isRequired
  }).isRequired
};
