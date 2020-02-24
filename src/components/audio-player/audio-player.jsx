import React from "react";
import PropTypes from "prop-types";

export default function AudioPlayer(props) {
  const {isPlaying, isLoading, onPlayButtonClick, audioRef} = props;
  return (
    <>
      <button
        className={`track__button track__button--${
          isPlaying ? `pause` : `play`
        }`}
        type="button"
        disabled={isLoading}
        onClick={onPlayButtonClick}
      ></button>
      <div className="track__status">
        <audio ref={audioRef}></audio>
      </div>
    </>
  );
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  audioRef: PropTypes.object.isRequired
};
