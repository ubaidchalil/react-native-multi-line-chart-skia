import {useMemo} from 'react';
import {Gesture} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';

export function useTapGesture() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const isTapGestureActive = useSharedValue(false);

  const tapGesture = useMemo(
    () =>
      Gesture.Tap()
        .onStart(event => {
          x.value = event.x;
          y.value = event.y;
          isTapGestureActive.value = true;
        })
        .onFinalize(() => {
          isTapGestureActive.value = false;
        }),
    [isTapGestureActive, x, y],
  );

  return useMemo(
    () => ({
      gesture: Gesture.Exclusive(tapGesture),
      x: x,
      y: y,
      isActive: isTapGestureActive,
    }),
    [tapGesture, x, isTapGestureActive, y],
  );
}
