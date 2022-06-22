import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler'

import useCachedResources from './hooks/useCachedResources';
import TabMapScreen from "./screens/TabMapScreen";
import * as React from "react";

// fix bottomSheet
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {expo} from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
AppRegistry.registerComponent(expo.name, () => gestureHandlerRootHOC(App));



export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <TabMapScreen />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
