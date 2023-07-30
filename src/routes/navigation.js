import  AuthStack  from "./auth";
import AuthenticatedStack  from "./view";

import  {AuthContext}  from '../store/auth-context';

import  {NavigationContainer}  from '@react-navigation/native';

import { useContext, useEffect, useState } from 'react';


export default function Navigation() {
    const authCtx = useContext(AuthContext);

    return (
        <NavigationContainer>
            {!authCtx.isAuthenticated && <AuthStack />}
            {authCtx.isAuthenticated && <AuthenticatedStack />}
        </NavigationContainer>
    );
}
