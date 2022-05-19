import React from 'react';
import {Text} from '@shopify/react-native-skia';

const Label = ({x, y, children}) => {
  return <Text x={x} y={y} text={children} familyName="serif" size={12} />;
};

export default Label;
