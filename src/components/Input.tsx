/* eslint-disable react/require-default-props */
import React from 'react';

const Input = (props: {
  func: (arg0: number) => void,
  disabled?: boolean,
}) => {
  const {
    func,
    disabled = false,
  } = props;

  const handler = React.useCallback((event) => {
    if (event.target.value === '') {
      func(null);

      return;
    }

    func(event.target.value);
  }, [func]);

  return (
    <>
      {' '}
      <input className="input" onChange={handler} type="number" disabled={disabled} />
      {' '}
    </>
  );
};

export default Input;
