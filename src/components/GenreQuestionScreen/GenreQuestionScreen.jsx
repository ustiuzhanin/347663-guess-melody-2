import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userAnswer: []
    };
  }

  render() {
    const {screenIndex, question, onAnswer} = this.props;
    const {genre, answers} = question;

    const btnClickHandler = (evt) => {
      const answerValue = evt.target.value;

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
      <section className='game game--genre'>
        <header className='game__header'>
          <a className='game__back' href='#'>
            <span className='visually-hidden'>Сыграть ещё раз</span>
            <img
              className='game__logo'
              src='img/melody-logo-ginger.png'
              alt='Угадай мелодию'
            />
          </a>

          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='timer'
            viewBox='0 0 780 780'
          >
            <circle
              className='timer__line'
              cx='390'
              cy='390'
              r='370'
              style={{
                filter: `url(#blur)`,
                transform: `rotate(-90deg) scaleY(-1)`,
                transformOrigin: `center`
              }}
            />
          </svg>

          <div className='timer__value' xmlns='http://www.w3.org/1999/xhtml'>
            <span className='timer__mins'>05</span>
            <span className='timer__dots'>:</span>
            <span className='timer__secs'>00</span>
          </div>

          <div className='game__mistakes'>
            <div className='wrong'></div>
            <div className='wrong'></div>
            <div className='wrong'></div>
          </div>
        </header>

        <section className='game__screen'>
          <h2 className='game__title'>Выберите {genre} треки</h2>
          <form
            className='game__tracks'
            onSubmit={(evt) => {
              evt.preventDefault();

              onAnswer(this.state.userAnswer);
              this.setState({userAnswer: []});
            }}
          >
            {answers.map((answer, i) => {
              return (
                <div key={`${screenIndex}-answer-${i}`} className='track'>
                  <button
                    className='track__button track__button--play'
                    type='button'
                  ></button>
                  <div className='track__status'>
                    <audio></audio>
                  </div>
                  <div className='game__answer'>
                    <input
                      className='game__input visually-hidden'
                      type='checkbox'
                      name='answer'
                      value={`answer-${i}`}
                      id={`answer-${i + 1}`}
                      onClick={(e) => {
                        btnClickHandler(e);
                      }}
                    />
                    <label className='game__check' htmlFor={`answer-${i + 1}`}>
                      Отметить
                    </label>
                  </div>
                </div>
              );
            })}

            <button className='game__submit button' type='submit'>
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
