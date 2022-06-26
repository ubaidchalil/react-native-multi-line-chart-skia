import React from 'react';
import {
  DashPathEffect,
  Line as SkiaLine,
  vec,
} from '@shopify/react-native-skia';

const Line = ({
  x,
  y,
  x2,
  y2,
  isDashed = false,
  color = '#F1F5F8',
  strokeWidth = 1,
}) => {
  const p1 = vec(x, y);
  const p2 = vec(x2, y2);

  return (
    <SkiaLine
      p1={p1}
      p2={p2}
      color={color}
      style="stroke"
      strokeWidth={strokeWidth}>
      {isDashed && <DashPathEffect intervals={[4, 5]} />}
    </SkiaLine>
  );
};

export default Line;
