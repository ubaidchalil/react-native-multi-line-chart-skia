import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const renderYAxisLabels = (min, max) => {
  if (max === 0) {
    return;
  }
  const labels = [];
  const diff = (max - min) / 3;
  for (let i = 3; i >= 0; i--) {
    const text = `${Math.round(min + diff * i)}`;
    labels.push(
      <Text key={`y-axisLabel${i}`} style={styles.text}>
        {text}
      </Text>,
    );
  }
  return labels;
};

const YAxis = ({min, max, y0}) => {
  return (
    <View style={[styles.yAxisArea, {marginTop: y0}]}>
      {renderYAxisLabels(min, max)}
    </View>
  );
};

const styles = StyleSheet.create({
  yAxisArea: {
    marginLeft: 5,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 12,
    top: 0,
  },
});

export default React.memo(YAxis);
