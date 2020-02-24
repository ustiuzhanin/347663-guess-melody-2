import React, {PureComponent} from "react";
import AudioPlayer from "../../components/audio-player/audio-player.jsx";
import withAudio from "../with-audio/with-audio.jsx";

const AudioPlayerWrapped = withAudio(AudioPlayer);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1
      };
    }
    render() {
      const {activePlayer} = this.state;

      return (
        <Component
          {...this.props}
          onSubmitBtnClick={() => this.setState({activePlayer: -1})}
          renderPlayer={(it, i) => {
            return (
              <AudioPlayerWrapped
                src={it.src}
                isPlaying={i === activePlayer}
                onPlayButtonClick={() =>
                  this.setState((prevState) => ({
                    activePlayer: prevState.activePlayer === i ? -1 : i
                  }))
                }
              />
            );
          }}
        />
      );
    }
  }

  return WithActivePlayer;
};

export default withActivePlayer;
