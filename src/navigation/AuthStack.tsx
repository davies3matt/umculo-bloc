import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Profile from '../containers/Profile';
import Groups from '../containers/Groups';
import { Image } from 'native-base';
import AddGroup from '../containers/Groups/addGroup';
import EditGroup from '../containers/Groups/editGroup';
import AddUser from '../containers/Groups/addUser'
import ViewInvite from '../containers/Groups/viewInvite';
import AddItem from '../containers/Groups/addItem';

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
        <Stack.Screen name="Groups" component={Groups} options={{ headerTitle: () => <LogoTitle/> }}/>
        <Stack.Screen name='AddGroup' component={AddGroup} options={{ headerTitle: () => <LogoTitle/>}}/>
        <Stack.Screen name='EditGroup' component={EditGroup} options={{ headerTitle: () => <LogoTitle/>}}/>
        <Stack.Screen name="ViewInvite" component={ViewInvite} options={{ headerTitle: () => <LogoTitle/> }}/>
        <Stack.Screen name="AddUser" component={AddUser} options={{ headerTitle: () => <LogoTitle /> }}/>
        <Stack.Screen name="AddItem" component={AddItem} options={{ headerTitle: () => <LogoTitle /> }}/>
    </Stack.Navigator>
    )
}

export default AuthStack;