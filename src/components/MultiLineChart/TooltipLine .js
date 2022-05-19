import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useRef,
  useEffect,
} from 'react';
import Line from './Line';

const initialState = {x: 0, y: 0, x2: 0, y2: 0};

const TooltipLine = forwardRef(({shouldAutoClose = false}, ref) => {
  const [state, setState] = useState(initialState);

  const timerRef = useRef(null);

  const resetTooltipLineState = () => {
    setState(initialState);
  };

  useEffect(() => {
    const {x} = state;
    if (x > 0 && shouldAutoClose) {
      timerRef.current && clearTimeout(timerRef.current);
      timerRef.current = setTimeout(resetTooltipLineState, 5000);
    }

    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [state, shouldAutoClose]);

  useImperativeHandle(ref, () => ({
    setTooltipLineState(updatedState) {
      setState(updatedState);
    },
    resetTooltipLineState,
  }));

  return (
    <Line x={state.x} y={state.y} x2={state.x2} y2={state.y2} color="blue" />
  );
});

export default TooltipLine;
