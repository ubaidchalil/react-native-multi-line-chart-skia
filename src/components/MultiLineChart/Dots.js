import React from 'react';
import {Circle, Group} from '@shopify/react-native-skia';
import Line from './Line';
import Label from './Label';

const Dots = ({
  points,
  color,
  backgroundColor = 'white',
  height,
  y0,
  isXAxisBottom,
}) => {
  return points.map((point, index) => {
    const {x, y, displayDot, displayMarkLine, subLabelProps} = point;

    const {label, align = 'center'} = subLabelProps || {};

    const letterSize = 5.5;
    const labelLength = label ? label.length : 0;

    const labelX = {
      left: x - letterSize * labelLength,
      center: x - (letterSize * labelLength) / 2,
      right: x,
    };

    const subLabelX = labelX[align];
    const subLabelY = isXAxisBottom ? height + 30 : y0 - 30;

    const renderSubLabel = label ? (
      <Label x={subLabelX} y={subLabelY}>
        {label}
      </Label>
    ) : null;

    const markLine = displayMarkLine ? (
      <Line
        x={x}
        y={y0 + 1}
        x2={x}
        y2={y0 + height - 1}
        color="black"
        isDashed
        strokeWidth={1.5}
      />
    ) : null;

    if (!displayDot) {
      return (
        <Group key={`${index}-dot`}>
          {markLine}
          {renderSubLabel}
        </Group>
      );
    }
    return (
      <Group key={`${index}-dot`}>
        <Circle cx={x} cy={y} r={3} color={backgroundColor} />
        <Circle
          cx={x}
          cy={y}
          style="stroke"
          strokeWidth={1}
          r={3}
          color={color}
        />
        {markLine}
        {renderSubLabel}
      </Group>
    );
  });
};

export default React.memo(Dots);
