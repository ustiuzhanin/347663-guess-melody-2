import React from 'react';
import PropTypes from 'prop-types';

export default function Welcome(props) {
  const {time, mistakes, onClick} = props;

  return (
    <section className='welcome'>
      <div className='welcome__logo'>
        <img
          src='img/melody-logo.png'
          alt='Угадай мелодию'
          width='186'
          height='83'
        />
      </div>
      <button className='welcome__button' onClick={onClick}>
        <span className='visually-hidden'>Начать игру</span>
      </button>
      <h2 className='welcome__rules-title'>Правила игры</h2>
      <p className='welcome__text'>Правила просты:</p>
      <ul className='welcome__rules-list'>
        <li>За {time} минут нужно ответить на все вопросы.</li>
        <li>Можно допустить {mistakes} ошибки.</li>
      </ul>
      <p className='welcome__text'>Удачи!</p>
    </section>
  );
}

Welcome.defaultProps = {
  time: 5,
  mistakes: 3,
  onClick: () => {
    // TODO: prints an error if onClick wasn't passed
  }
};

Welcome.propTypes = {
  time: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};
