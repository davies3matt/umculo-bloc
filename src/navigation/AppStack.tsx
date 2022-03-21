import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../containers/Authentication/Login';
import SignUp from '../containers/Authentication/SignUp';
import VerifyCode from '../containers/Authentication/verifyCode';
import React from 'react';

const Stack = createNativeStackNavigator();

const AppStack: React.FC = () => {
    return (
    <Stack.Navigator>
        <Stack.Screen name='Login' component={Login}></Stack.Screen>
        <Stack.Screen name='SignUp' component={SignUp}></Stack.Screen>
        <Stack.Screen name='VerifyCode' component={VerifyCode}></Stack.Screen>
    </Stack.Navigator>
    )
}

export default AppStack;