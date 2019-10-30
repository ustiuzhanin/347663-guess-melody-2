import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: props.isPlaying,
      isLoading: true,
      progress: 0
    };

    this.audioRef = React.createRef();

    this.onPlayButtonClick = this.onPlayButtonClick.bind(this);
  }

  componentDidMount() {
    const audio = this.audioRef.current;
    const {src} = this.props;

    audio.src = src;

    audio.oncanplaythrough = () =>
      this.setState({
        isLoading: false
      });

    audio.onplay = () =>
      this.setState({
        isPlaying: true
      });

    audio.onpause = () =>
      this.setState({
        isPlaying: false
      });

    audio.ontimeupdate = () =>
      this.setState({
        progress: audio.currentTime
      });
  }

  componentDidUpdate() {
    const audio = this.audioRef.current;
    // audio.src = this.props.src;

    if (this.props.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  componentWillUnmount() {
    const audio = this.audioRef.current;

    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
    audio.src = ``;
  }

  onPlayButtonClick() {
    this.props.onPlayButtonClick();
    this.setState({isPlaying: !this.state.isPlaying});
  }

  render() {
    return (
      <>
        <button
          className={`track__button track__button--${
            this.state.isPlaying ? `pause` : `play`
          }`}
          type='button'
          disabled={this.state.isLoading}
          onClick={this.onPlayButtonClick}
        ></button>
        <div className='track__status'>
          <audio ref={this.audioRef}></audio>
        </div>
      </>
    );
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired
};
