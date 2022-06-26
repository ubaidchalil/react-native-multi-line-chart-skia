import {Skia} from '@shopify/react-native-skia';
import {graphPadding, minAndMaxAddPercentage} from '../constants';

export const getMaxAndMin = (data = []) =>
  data.reduce(
    (prev, curr) => {
      if (!curr.value) {
        return prev;
      }
      const max2 = curr.value > prev.max ? curr.value : prev.max;
      const min2 = curr.value < prev.min ? curr.value : prev.min;
      return {max: max2, min: min2};
    },
    {max: Number.MIN_SAFE_INTEGER, min: Number.MAX_SAFE_INTEGER},
  );

export const getMaxAndMinArraysOfData = (data = []) =>
  data.reduce(
    (prev, curr) => {
      const {max, min} = getMaxAndMin(curr?.item);
      const max2 = max > prev.max ? max : prev.max;
      const min2 = min < prev.min ? min : prev.min;
      return {max: max2, min: min2};
    },
    {max: Number.MIN_SAFE_INTEGER, min: Number.MAX_SAFE_INTEGER},
  );

export const createGraphPoints = ({
  graphData,
  height,
  width,
  maxValue,
  minValue,
  y0,
}) => {
  const points = [];
  const itemWidth = width / graphData.length;

  const diff = (maxValue - minValue) * minAndMaxAddPercentage;

  const max = maxValue + diff;
  const min = minValue - diff;

  for (let i = 0; i < graphData.length; i += 1) {
    const {value, displayDot, subLabelProps, displayMarkLine} = graphData[i];
    if (!value) {
      continue;
    }

    const x = itemWidth * i + itemWidth / 2;
    let y = y0 + height - ((value - min) / (max - min)) * height;

    points.push({x: x, y: y, displayDot, subLabelProps, displayMarkLine});
  }

  return points;
};

export const getStraightLine = (width, height, y0) => {
  const path = Skia.Path.Make();
  path.moveTo(0, height / 2);
  const x = width;
  const y = y0 + height / 2;
  path.cubicTo(x, y, x, y, x, y);
  return path;
};

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const days = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

export const generateRandomData = () => {
  const data = [];
  for (let i = 0; i < 7; i += 1) {
    data.push({
      value: randomIntFromInterval(10, 250),
      label: days[i],
      type: 'Steps',
      displayDot: true,
    });
  }
  return data;
};

export const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
