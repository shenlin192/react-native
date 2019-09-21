import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [headerRelativeTop, setHeaderRelativeTop] = useState(0);

  const handleScroll = (event)=>{
    const topOffset = event.nativeEvent.contentOffset.y;
    if(topOffset<0){
      setHeaderRelativeTop(topOffset)
    }
    console.log(topOffset)
  }

  const jewelStyle = ()=>{
    return {
      ...styles.headerContainer,
      top: headerRelativeTop,
    }
  }

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <ScrollView
        style={styles.container}
        scrollEventThrottle={16}
         onScroll={handleScroll}
      >
        <View style={jewelStyle()}>
          <View style={styles.headerImage} >
            <Text> Image </Text>
            <Text> Image </Text>
            <Text> Image </Text>
            <Text> Image </Text>
          </View>

          <View>
            <Text> scroll up content </Text>
            <Text> scroll up content </Text>
            <Text> scroll up content </Text>
            <Text> scroll up content </Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.contentView}
        >
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <View style={{width: 300, height:600, backgroundColor: 'green'}} />
          {/*<AppNavigator />*/}
          <View style={{width: 300, height:500, backgroundColor: 'red'}} />
        </ScrollView>
      </ScrollView>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
  },
  headerContainer: {
    borderColor: '#000',
    borderWidth: 2,
  },
  headerImage: {
    marginBottom: 10,
    height: 200,
    backgroundColor: '#F0F0F0',
  },
  contentView: {
    // position: 'relative',
    top: -100,
    borderColor: '#c0c0c0',
    borderWidth: 2,
    flex: 1,
  },
  contentContainerStyle:{

  },
});
