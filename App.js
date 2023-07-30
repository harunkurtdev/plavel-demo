import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import AppLoading from 'expo-app-loading';


import AuthContextProvider, { AuthContext } from './src/store/auth-context';


import * as SplashScreen from 'expo-splash-screen';
import NotificationScreen from './src/screens/NotificationScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';

import Root from "./src/routes/root";


export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await SplashScreen.hideAsync();
      } catch (err) {
        console.error(err);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }


  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

