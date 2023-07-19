import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

import { Image, Button, View, SafeAreaView, Text } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import { Images } from './constants/images';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton';

import { Ionicons } from '@expo/vector-icons';

import * as SplashScreen from 'expo-splash-screen';
import NotificationScreen from './screens/NotificationScreen';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
        headerTitleStyle: { fontSize: 24 },
        headerTitleAlign: 'center',
        headerBackImage: () => <Ionicons name="arrow-back" size={24} color="white" />
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} options={({ navigation }) => ({
        headerTitle: 'plavel',
        // header: () => (
        //   <SafeAreaView>
        //     <View style={{
        //       flex: 1,
        //       justifyContent: 'center',
        //       alignItems: 'center'
        //     }}>
        //       <Image
        //         source={Images.plavel}
        //         style={{ width: 125, height: 50, marginTop: 70 }}
        //         resizeMode="contain"
        //       />
        //     </View>
        //   </SafeAreaView>

        // ),

        headerStyle: { backgroundColor: 'white' },

        headerTitle: () => (
          <Image
            source={Images.plavel}
            style={{ width: 125, height: 50, margin: 5 }}
            resizeMode="contain"
          />
        ),
        headerTitleAlign: "center",

        // headerLeft: () => (
        //   <Button
        //     onPress={() => navigation.goBack()}
        //     title="Back"
        //     color="black"
        //   />
        // ),
      })} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        color="white"
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerStyle: { backgroundColor: 'white' },
          headerTitleAlign: "center",
          headerLeft: ({ tintColor }) => (
            <IconButton icon="arrow-back" color="black" size={24} onPress={() => { console.log("back") }} />

          ),
          color: "white",
          headerTitle: () => (
            <Image
              source={Images.plavel}
              style={{ width: 125, height: 50, margin: 5 }}
              resizeMode="contain"
            />
          ),
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color="black"
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Notification"
        // color= "black"
        component={NotificationScreen}
        options={{
          headerStyle: { backgroundColor: 'white' },
          headerTitleAlign: "center",
          headerTitle: () => <Text style={{ color: 'black', fontSize: 20 }}>Notification</Text>,
          // headerLeft: ({ tintColor }) => <IconButton icon="arrow-back" color="black" size={24} onPress={() => { console.log("back") }} />,
          headerLeft: () => <View />, // Bu kısım geri tuşunu kaldırır
          headerBackImage: () => <View />, // Bu kısım özelleştirilmiş geri tuşunu kaldırır
      
          headerBack: () => <View />
        }} />


    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
      {/* <AuthStack /> */}
      {/* <AuthenticatedStack /> */}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}


// AppRegistry.registerComponent('main', () => App);


export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        // Preload resources or perform some other tasks...

        // After everything is loaded, hide the splash screen
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

