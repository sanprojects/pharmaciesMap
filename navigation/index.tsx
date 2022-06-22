import * as React from 'react';
import {ColorSchemeName, Dimensions, Pressable, StyleSheet} from 'react-native';
import TabMapScreen from '../screens/TabMapScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <TabMapScreen />
  );
}