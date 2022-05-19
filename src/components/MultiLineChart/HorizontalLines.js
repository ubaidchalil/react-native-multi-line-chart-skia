import React from 'react';
import Line from './Line';

const HorizontalLines = ({width, height, noOfLines = 4, y0}) => {
  if (width === 0 || height === 0) {
    return null;
  }
  const lines = [];
  for (let i = 0; i < noOfLines + 1; i++) {
    if (i === 0 || i === noOfLines) {
      continue;
    }
    const x = i * (width / noOfLines);
    const y = y0 + 0;

    const x2 = i * (width / noOfLines);
    const y2 = y0 + height;

    lines.push(<Line key={i} isDashed x={x} y={y} x2={x2} y2={y2} />);
  }
  return lines;
};

export default React.memo(HorizontalLines);
