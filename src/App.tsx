import React from 'react';
import Input from './components/Input';
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
  const [boxNumber, setBoxNumber] = React.useState<null | number>(null);
  const [boxCapacity, setBoxCapacity] = React.useState<null | number>(null);
  const [doze, setDoze] = React.useState<null | number>(null);
  const [dailyCount, setDailyCount] = React.useState<null | number>(null);
  const [dailyDoze, setDailyDoze] = React.useState<null | number>(null);

  return (
    <>
      <div>
        <p className="naturalLanguage">
          Есть
          {' '}
          <Input func={setBoxNumber} />
          {' '}
          упаковок лекарства.
          В каждой пачке
          {' '}
          <Input func={setBoxCapacity} />
          {' '}
          таблеток, в каждой таблетке
          {' '}
          <Input func={setDoze} />
          {' '}
          мг действующего вещества.
          Каждый день надо пить
          {' '}
          <Input func={setDailyCount} />
          {' '}
          таблеток (или
          {' '}
          <Input func={setDailyDoze} />
          {' '}
          мг).
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
