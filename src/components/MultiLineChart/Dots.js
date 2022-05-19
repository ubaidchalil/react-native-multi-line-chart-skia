import React from 'react';
import {Circle, Group} from '@shopify/react-native-skia';

const Dots = ({points, color, backgroundColor = 'white'}) => {
  return points.map((point, index) => {
    const {x, y, displayDot} = point;
    if (!displayDot) {
      return null;
    }
    return (
      <Group key={`${index}-dot`}>
        <Circle cx={x} cy={y} r={4} color={backgroundColor} />
        <Circle
          cx={x}
          cy={y}
          style="stroke"
          strokeWidth={1}
          r={4}
          color={color}
        />
      </Group>
    );
  });
};

export default React.memo(Dots);
