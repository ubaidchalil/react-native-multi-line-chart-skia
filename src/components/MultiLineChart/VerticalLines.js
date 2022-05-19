import React from 'react';
import Line from './Line';

const VerticalLines = ({width, height, noOfLines = 3, y0}) => {
  if (width === 0 || height === 0) {
    return null;
  }
  const lines = [];
  for (let i = 0; i < noOfLines + 1; i++) {
    if (i === 0 || i === noOfLines) {
      continue;
    }
    const x = 1;
    const y = y0 + i * (height / noOfLines);

    const x2 = width;
    const y2 = y0 + i * (height / noOfLines);

    lines.push(
      <Line key={`verticalLine-${i}`} isDashed x={x} y={y} x2={x2} y2={y2} />,
    );
  }
  return lines;
};

export default React.memo(VerticalLines);
