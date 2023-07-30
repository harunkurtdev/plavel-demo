import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Button, View, SafeAreaView, Text } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { Colors } from "../constants/styles";

import  {AuthContext}  from '../store/auth-context';

import NotificationScreen from '../screens/NotificationScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

import IconButton from '../components/ui/IconButton';


export default function AuthenticatedStack() {
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
                            source={"https://picsum.photos/200/300"}
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
                component={NotificationScreen}
                options={{
                    headerStyle: { backgroundColor: 'white' },
                    headerTitleAlign: "center",
                    headerTitle: () => <Text style={{ color: 'black', fontSize: 20 }}>Notification</Text>,
                    headerLeft: () => <View />, // Bu kısım geri tuşunu kaldırır
                    headerBackImage: () => <View />, // Bu kısım özelleştirilmiş geri tuşunu kaldırır

                    headerBack: () => <View />
                }} />


        </Stack.Navigator>
    );
}
