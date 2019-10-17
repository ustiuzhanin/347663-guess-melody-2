import React from 'react';
import Welcome from '../Welcome/Welcome.jsx';

export default function App() {
  const rules = {
    time: 5,
    mistakes: 3
  };

  return <Welcome rules={rules} />;
}
