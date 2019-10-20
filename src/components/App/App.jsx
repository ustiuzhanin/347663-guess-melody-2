import React from 'react';
import Welcome from '../Welcome/Welcome.jsx';

export default function App() {
  const rules = {
    time: 5,
    mistakes: 3
  };

  const onLaunchBtnClick = () => {
    // TODO: lauch the game on click
  };

  return (
    <Welcome
      time={rules.time}
      mistakes={rules.mistakes}
      onClick={onLaunchBtnClick}
    />
  );
}
