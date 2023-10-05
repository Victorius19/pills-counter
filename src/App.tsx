import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Button, createMuiTheme, ThemeProvider } from '@material-ui/core';

import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#066ace',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#EBEBEB',
    },
  },
});

const App = () => {
  const test = 0;

  return (
    <p>
      HELLO
      {test}
    </p>
  );
};

export default App;
