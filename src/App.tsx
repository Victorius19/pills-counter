import React from 'react';
import OneAnswer from './components/OneAnswer';
import './styles.scss';
// import { createMuiTheme } from '@material-ui/core';

// import { red } from '@material-ui/core/colors';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#066ace',
//     },
//     error: {
//       main: red.A400,
//     },
//     background: {
//       default: '#EBEBEB',
//     },
//   },
// });

const App = () => {
  const test = 0;

  return (
    <>
      <div>
        <p className="naturalLanguage">
          Есть _____ упаковок лекарства.
          В каждой пачке _____ таблеток, в каждой таблетке _____ мг действующего вещества.
          Каждый день надо пить _____ таблеток (или _____ мг).
        </p>
      </div>
      <div className="answer">
        <OneAnswer
          count={0}
          text="Одной пачки хватит на:"
          theme="yellow"
        />
        <OneAnswer
          count={0}
          text="Одной пачки хватит на:"
          theme="blue"
        />
      </div>
    </>
  );
};

export default App;
