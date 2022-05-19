import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Group,
  Path,
  runSpring,
  useDerivedValue,
  useValue,
} from '@shopify/react-native-skia';
import {createGraphPoints, getStraightLine} from './utils.js';
import {curveLines} from './utils.js/Math.js';
import Dots from './Dots.js';

const LinePath = ({data, height, width, minValue, maxValue, y0, color}) => {
  const paths = useValue({});
  const interpolateProgress = useValue(0);
  const commands = useRef([]);
  const [points, setPoints] = useState([]);

  const straightLine = useMemo(
    () => getStraightLine(width, height),
    [height, width],
  );

  useEffect(() => {
    if (height < 1 || width < 1) {
      // view is not yet measured!
      return;
    }
    if (data.length < 1) {
      // points are still empty!
      return;
    }

    if (!maxValue) {
      return;
    }

    setPoints(
      createGraphPoints({
        graphData: data,
        height,
        width,
        maxValue,
        minValue,
        y0,
      }),
    );
  }, [height, data, width, minValue, maxValue, y0]);

  useEffect(() => {
    if (points.length < 1) {
      // points are still empty!
      return;
    }

    const path = curveLines(points, 0, 'simple');

    const previous = paths.current;
    let from = previous.to ?? straightLine;
    if (previous.from != null && interpolateProgress.current < 1) {
      from = from.interpolate(previous.from, interpolateProgress.current);
    }

    if (path.isInterpolatable(from)) {
      paths.current = {
        from: from,
        to: path,
      };
    } else {
      paths.current = {
        from: path,
        to: path,
      };
    }
    commands.current = path.toCmds();

    runSpring(
      interpolateProgress,
      {from: 0, to: 1},
      {
        mass: 1,
        stiffness: 500,
        damping: 400,
        velocity: 0,
      },
    );
  }, [height, interpolateProgress, paths, points, straightLine]);

  const path = useDerivedValue(
    () => {
      const from = paths.current.from ?? straightLine;
      const to = paths.current.to ?? straightLine;

      return to.interpolate(from, interpolateProgress.current);
    },
    // RN Skia deals with deps differently. They are actually the required SkiaValues that the derived value listens to, not react values.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [interpolateProgress],
  );

  return (
    <Group>
      <Path
        path={path}
        strokeWidth={1}
        style="stroke"
        strokeJoin="round"
        strokeCap="round"
        color={color}
      />
      <Dots points={points} color={color} />
    </Group>
  );
};

export default React.memo(LinePath);
