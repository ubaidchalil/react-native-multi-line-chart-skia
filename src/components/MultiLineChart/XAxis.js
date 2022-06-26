import {Group} from '@shopify/react-native-skia';
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
    const {label} = data[i];

    const labelX = i * itemWidth + itemWidth / 4;
    const labelY = isXAxisBottom ? height + 15 : y0 - 10;

    labels.push(
      <Group key={`xAxis-Line-${i}`}>
        {label && (
          <Label x={labelX} y={labelY}>
            {label}
          </Label>
        )}
      </Group>,
    );
  }

  return labels;
};

export default React.memo(XAxis);
