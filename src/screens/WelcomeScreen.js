import { StyleSheet, Text, View, Button, Animated } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import NotificationScreen from "./NotificationScreen";
import Scaffold from "./Flutter";
import { useState } from 'react';


import React from 'react';


function WelcomeScreen() {

  const [showNotificationScreen, setShowNotificationScreen] = useState(false);

  const navigateToOtherPageState = () => {
    setShowNotificationScreen(true);
  }

  if (showNotificationScreen) {
    return <NotificationScreen />;
  }


  const navigation = useNavigation();

  const navigateToOtherPage = () => {
    navigation.navigate('Notification');
  }



  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Button title="Go to Other Page" onPress={navigateToOtherPage} />
    </View>
  );
}

export default WelcomeScreen;


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
