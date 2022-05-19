import React from 'react';
import {graphPadding} from './constants';
import Label from './Label';

const XAxis = ({data, width, height, y0, isXAxisBottom = false}) => {
  if (width === 0 || height === 0 || !data || !data.length) {
    return null;
  }
  const labels = [];

  const itemWidth = (width - 2 * graphPadding) / data.length;

  for (let i = 0; i < data.length; i++) {
    const x = i * itemWidth + itemWidth / 4;
    const y = isXAxisBottom ? height + 15 : 0 + 10;

    labels.push(
      <Label key={`xAxis-Line-${i}`} x={x} y={y}>
        {data[i]?.label}
      </Label>,
    );
  }

  return labels;
};

export default React.memo(XAxis);
