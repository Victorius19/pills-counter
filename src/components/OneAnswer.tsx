import React from 'react';

const OneAnswer = (props: {count: number, text: string, theme: 'blue' | 'yellow'}) => {
  const {
    text,
    count,
    theme,
  } = props;

  return (
    <div>
      {text}
      <div className={`oneAnswer oneAnswer__${theme}`}>
        <div>
          {count === 0 ? 'X' : count}
          <br />
          <span>дней</span>
        </div>
        <img src={`./${theme}Cat.svg`} alt="cat" />
      </div>
    </div>
  );
};

export default OneAnswer;
