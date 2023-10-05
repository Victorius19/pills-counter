import React from 'react';

const Input = (props: {func: (arg0: number) => void}) => {
  const { func } = props;

  const handler = React.useCallback((event) => {
    func(event.target.value);
  }, [func]);

  return (
    <input className="input" onChange={handler} type="number" />
  );
};

export default Input;
