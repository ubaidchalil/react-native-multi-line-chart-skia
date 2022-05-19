import React, {useMemo, useCallback, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import Reanimated, {
  runOnJS,
  useAnimatedReaction,
  FadeIn,
  FadeOut,
  Layout,
} from 'react-native-reanimated';
import {getYAxisValues} from '../../../data';
import Container from './Container';
import {useComponentSize} from './hooks/useComponentSize';
import {useTapGesture} from './hooks/useTapGesture';
import HorizontalLines from './HorizontalLines';
import LinePath from './LinePath';
import TooltipArea from './TooltipArea';
import TooltipLine from './TooltipLine ';
import {getMaxAndMin, getMaxAndMinArraysOfData} from './utils.js';
import VerticalLines from './VerticalLines';
import XAxis from './XAxis';
import YAxis from './YAxis';

const xAxisAreaHeight = 20;

const getToolTipData = (data, selectedIndex) => {
  const toolTipData = [];
  for (let i = 0; i < data.length; i++) {
    if (!data[i].item[selectedIndex].displayDot) {
      continue;
    }
    const {color, type, item} = data[i];
    toolTipData.push({value: item[selectedIndex]?.value, color, type});
  }
  return toolTipData;
};

const MultiLineChart = ({graphData, isXAxisBottom = false, xAxisValues}) => {
  const tooltipLineRef = useRef();
  const tooltipAreaRef = useRef();

  const [showTooltip, setShowTooltip] = useState(false);

  const [size, onLayout] = useComponentSize();
  const {width, height: componentHeight} = size;

  const {gesture, x, isActive} = useTapGesture();

  const height = componentHeight - xAxisAreaHeight;

  const {min: minValue, max: maxValue} = useMemo(
    () =>
      Array.isArray(graphData)
        ? getMaxAndMinArraysOfData(graphData)
        : getMaxAndMin(graphData),
    [graphData],
  );

  const data = useMemo(
    () => (Array.isArray(graphData) ? graphData : [graphData]),
    [graphData],
  );

  const firstData = useMemo(() => data?.[0]?.item, [data]);

  const y0 = isXAxisBottom ? 0 : xAxisAreaHeight;

  const setFingerX = useCallback(
    (fingerX, active) => {
      if (!active || !firstData) {
        return;
      }
      const itemWidth = width / firstData.length;
      const index = Math.floor(fingerX / itemWidth);
      const xTooltipLine = index * itemWidth + itemWidth / 2;

      const tooltipDataList = getToolTipData(data, index);

      if ((tooltipDataList || []).length === 0) {
        return;
      }
      tooltipLineRef.current.setTooltipLineState({
        x: xTooltipLine,
        y: y0 + 1,
        x2: xTooltipLine,
        y2: y0 + height - 1,
      });

      const tooltipData = {
        label: data[0].item[index].label,
        data: tooltipDataList,
      };

      tooltipAreaRef.current.setTooltipAreaState(tooltipData);
    },
    [firstData, height, width, y0, data],
  );

  useAnimatedReaction(
    () => ({fingerX: x.value, active: isActive.value}),
    ({fingerX, active}) => {
      runOnJS(setFingerX)(fingerX, active);
    },
    [setFingerX, width, x, isActive],
  );

  const onTooltipClose = () => tooltipLineRef.current.resetTooltipLineState();

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <GestureDetector gesture={gesture}>
          <Container
            width={width}
            height={height}
            xAxisLabel={
              <XAxis
                data={xAxisValues}
                width={width}
                height={height}
                y0={y0}
                isXAxisBottom={isXAxisBottom}
              />
            }
            y0={y0}
            onLayout={onLayout}>
            <VerticalLines width={width} height={height} y0={y0} />
            <HorizontalLines width={width} height={height} y0={y0} />
            <TooltipLine ref={tooltipLineRef} y0={y0} />
            {data.map(({item, color}, index) => (
              <LinePath
                key={`line-${index}`}
                width={width}
                height={height}
                data={item}
                maxValue={maxValue}
                minValue={minValue}
                y0={y0}
                color={color}
              />
            ))}
          </Container>
        </GestureDetector>
        {data.length > 0 && <YAxis min={minValue} max={maxValue} y0={y0} />}
      </View>

      <TooltipArea ref={tooltipAreaRef} onTooltipClose={onTooltipClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    height: 220,
    flexDirection: 'row',
  },
  container: {},
  tooltipContainer: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
  },
});

export default MultiLineChart;
