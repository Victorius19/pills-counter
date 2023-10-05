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

  const daysWithOneBox = React.useMemo(() => {
    if (boxCapacity !== null) {
      if (dailyDoze !== null && doze !== null) {
        return (boxCapacity * doze) / dailyDoze;
      }

      if (dailyCount !== null) {
        return boxCapacity / dailyCount;
      }
    }

    return null;
  }, [boxNumber, boxCapacity, doze, dailyCount, dailyDoze]);

  const daysWithAllBox = React.useMemo(() => {
    if (boxNumber !== null && boxCapacity !== null) {
      if (dailyCount !== null) {
        return (boxNumber * boxCapacity) / dailyCount;
      }

      if (doze !== null && dailyDoze !== null) {
        return (boxNumber * boxCapacity * doze) / dailyDoze;
      }
    }

    return null;
  }, [boxNumber, boxCapacity, doze, dailyCount, dailyDoze]);

  return (
    <>
      <div>
        <p className="naturalLanguage">
          Есть
          <Input func={setBoxNumber} />
          упаковок лекарства.
          В каждой упаковке
          <Input func={setBoxCapacity} />
          таблеток, а в каждой таблетке
          <Input func={setDoze} />
          мг действующего вещества.
          Каждый день надо пить
          <Input func={setDailyCount} disabled={dailyDoze !== null} />
          таблеток (или
          <Input func={setDailyDoze} disabled={dailyCount !== null} />
          мг)
        </p>
      </div>
      <div className="answer">
        <OneAnswer
          count={daysWithOneBox}
          text="Одной упаковки хватит на:"
          theme="yellow"
        />
        <OneAnswer
          count={daysWithAllBox}
          text={`${boxNumber || 'X'} упаковок хватит на:`}
          theme="blue"
        />
      </div>
    </>
  );
};

export default App;
