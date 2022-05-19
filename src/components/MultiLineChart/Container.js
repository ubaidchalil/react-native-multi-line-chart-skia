import React from 'react';
import {StyleSheet} from 'react-native';
import {Canvas, Group, RoundedRect} from '@shopify/react-native-skia';
import Reanimated from 'react-native-reanimated';

const ReanimatedView = Reanimated.View;

const Container = ({children, width, height, xAxisLabel, onLayout, y0}) => {
  return (
    <ReanimatedView style={styles.container} onLayout={onLayout}>
      <Canvas style={styles.svg}>
        <Group>
          <RoundedRect
            x={1}
            y={y0 + 1}
            width={width - 2}
            height={height - 2}
            r={25}
            strokeWidth={1}
            style="stroke"
            color="#F1F5F8">
            <Group>{children}</Group>
          </RoundedRect>
          {xAxisLabel}
        </Group>
      </Canvas>
    </ReanimatedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  svg: {flex: 1},
});

export default Container;
