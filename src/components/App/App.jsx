import React from 'react';
import Welcome from '../Welcome/Welcome.jsx';

export default function App() {
  const rules = {
    time: 5,
    mistakes: 3
  };

  const onLaunchBtnClick = () => {
    /* eslint-disable no-console */
    console.log(`sss`);
  };

  return (
    <Welcome
      time={rules.time}
      mistakes={rules.mistakes}
      onClick={onLaunchBtnClick}
    />
  );
}
