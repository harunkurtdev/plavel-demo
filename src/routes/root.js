import  Navigation  from "./navigation";
import AppLoading from 'expo-app-loading';

import  AsyncStorage  from "@react-native-async-storage/async-storage";

import { useContext, useEffect, useState } from 'react';

import  { AuthContext } from '../store/auth-context';

export default function Root() {
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

