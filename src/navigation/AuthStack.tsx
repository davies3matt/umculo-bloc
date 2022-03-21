import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Profile from '../containers/Profile';
import { Image } from 'native-base';

const Stack = createNativeStackNavigator();

const LogoTitle: React.FC = () => {
    return (
      <Image
        width={250}
        height={50}
        source={require('../../assets/Images/house-board.png')}
        alt='house-board-logo'
      />
    )
  }

const AuthStack:React.FC = () => {
    return (
    <Stack.Navigator>
        <Stack.Screen name='Profile' component={Profile} options={{ headerTitle: () => <LogoTitle/>}}/>
    </Stack.Navigator>
    )
}

export default AuthStack;