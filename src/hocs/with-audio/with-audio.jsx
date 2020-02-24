import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export default function withAudio(Component) {
  class WithAudio extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: props.isPlaying,
        isLoading: true,
        progress: 0,
        audio: null
      };

      this.audioRef = React.createRef();

      this.onPlayButtonClick = this.onPlayButtonClick.bind(this);
    }

    componentDidMount() {
      const audio = this.audioRef.current;
      const {src} = this.props;
      // eslint-disable-next-line
      console.log(this.audioRef);
      // eslint-disable-next-line
      console.log(audio);
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

      // if (prevProps.src !== this.props.src) {
      //   audio.src = this.props.src;
      // }

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
        <Component
          {...this.props}
          isPlaying={this.state.isPlaying}
          isLoading={this.state.isLoading}
          audioRef={this.audioRef}
          onPlayButtonClick={this.onPlayButtonClick}
        />
      );
    }
  }

  WithAudio.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired
  };

  return WithAudio;
}
