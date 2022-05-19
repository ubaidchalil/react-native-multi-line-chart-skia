import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useRef,
  useEffect,
} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Animated, {FadeIn, FadeOut, Layout} from 'react-native-reanimated';

const TooltipItem = ({color, type, value}) => (
  <View style={styles.tooltipItem}>
    {!!color && (
      <View style={[styles.tooltipItemColor, {backgroundColor: color}]} />
    )}
    {!!type && <Text>{type}: </Text>}
    <Text>{value}</Text>
  </View>
);

const renderData = data => {
  if (Array.isArray(data)) {
    return data.map((item, index) => {
      const {value, color, type} = item || {};

      return (
        <TooltipItem
          key={`tooltip-${index}`}
          color={color}
          type={type}
          value={value}
        />
      );
    });
  } else {
    const {value, color, type} = data || {};

    return <TooltipItem color={color} type={type} value={value} />;
  }
};

const TooltipArea = forwardRef(
  ({shouldAutoClose = false, onTooltipClose}, ref) => {
    const [state, setState] = useState({});
    const [showTooltip, setShowTooltip] = useState(false);

    const timerRef = useRef(null);

    useEffect(() => {
      if (showTooltip && shouldAutoClose) {
        timerRef.current && clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setShowTooltip(false);
        }, 5000);
      }

      return () => timerRef.current && clearTimeout(timerRef.current);
    }, [showTooltip, state, shouldAutoClose]);

    useImperativeHandle(ref, () => ({
      setTooltipAreaState(updatedState) {
        setShowTooltip(true);
        setState(updatedState);
      },
    }));

    function onClose() {
      onTooltipClose?.();
      setShowTooltip(false);
    }

    return (
      showTooltip && (
        <Animated.View
          layout={Layout.delay(300)}
          entering={FadeIn}
          // exiting={FadeOut}
          style={styles.tooltipContainer}>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text>X</Text>
          </TouchableOpacity>
          <Text>{state?.label}</Text>
          {renderData(state?.data)}
        </Animated.View>
      )
    );
  },
);

const styles = StyleSheet.create({
  tooltipContainer: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'red',
  },
  tooltipItem: {flexDirection: 'row', alignItems: 'center'},
  tooltipItemColor: {width: 10, height: 10, borderRadius: 5, marginRight: 5},
  close: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 99999,
  },
});
export default TooltipArea;
