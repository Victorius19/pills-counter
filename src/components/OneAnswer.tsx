import React from 'react';

const OneAnswer = (props: {count: number | null, text: string, theme: 'blue' | 'yellow'}) => {
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
          {(count !== null && !Number.isNaN(count)) ? Math.floor(count) : 'X'}
          <br />
          <span>дней</span>
        </div>
        <img src={`./${theme}Cat.svg`} alt="cat" />
      </div>
    </div>
  );
};

export default OneAnswer;
