import React, {PureComponent} from 'react';
import AudioPlayer from '../audio-player/audio-player.jsx';
import PropTypes from 'prop-types';

export default class ArtistQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    };
  }

  render() {
    const {question, onAnswer} = this.props;
    const {answers, song} = question;
    return (
      <section className='game game--artist'>
        <section className='game__screen'>
          <h2 className='game__title'>Кто исполняет эту песню?</h2>
          <div className='game__track'>
            <div className='track'>
              <AudioPlayer
                key={song.src}
                src={song.src}
                isPlaying={this.state.isPlaying}
                onPlayButtonClick={() =>
                  this.setState({isPlaying: !this.state.isPlaying})
                }
              />
            </div>
          </div>

          <form className='game__artist'>
            {answers.map((answer, i) => {
              return (
                <div key={`answer-${i}`} className='artist'>
                  <input
                    className='artist__input visually-hidden'
                    type='radio'
                    name='answer'
                    value={`${i}`}
                    id={`answer-${i + 1}`}
                    onClick={(evt) => {
                      this.setState({isPlaying: false});
                      onAnswer(+evt.target.value);
                    }}
                  />
                  <label className='artist__name' htmlFor={`answer-${i + 1}`}>
                    <img
                      className='artist__picture'
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
}

ArtistQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.array.isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
