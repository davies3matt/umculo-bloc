import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Profile from "../containers/Profile"
import Groups from "../containers/Groups"
import { Image } from "native-base"
import AddGroup from "../containers/Groups/addGroup"
import ViewGroup from "../containers/Groups/viewGroup"
import AddUser from "../containers/Groups/addUser"
import ViewInvite from "../containers/Groups/viewInvite"
import AddItem from "../containers/Groups/addItem"
import { createDrawerNavigator } from "@react-navigation/drawer"
import GroupLogs from "../containers/GroupContainers/GroupLogs"
import AdminAddItem from "../containers/AdminContainers/AddItem"

const Stack = createNativeStackNavigator()

const LogoTitle = (): JSX.Element => {
  return (
    <Image
      width={250}
      height={50}
      source={require("../../assets/Images/house-board.png")}
      alt="house-board-logo"
    />
  )
}
const Drawer = createDrawerNavigator()

const AuthRoot = (): JSX.Element => {
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ headerTitle: () => <LogoTitle /> }}
      />
      <Drawer.Screen
        name="Groups"
        component={Groups}
        options={{ headerTitle: () => <LogoTitle /> }}
      />
      <Drawer.Screen
        name="Admin Add Item"
        component={AdminAddItem}
        options={{ headerTitle: () => <LogoTitle /> }}
      />
    </Drawer.Navigator>
  )
}

const AuthStack = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthRoot"
        component={AuthRoot}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddGroup"
        component={AddGroup}
        options={{ headerTitle: () => <LogoTitle /> }}
      />
      <Stack.Screen
        name="ViewGroup"
        component={ViewGroup}
        options={{ headerTitle: () => <LogoTitle /> }}
      />
      <Stack.Screen
        name="ViewInvite"
        component={ViewInvite}
        options={{ headerTitle: () => <LogoTitle /> }}
      />
      <Stack.Screen
        name="AddUser"
        component={AddUser}
        options={{ headerTitle: () => <LogoTitle /> }}
      />
      <Stack.Screen
        name="AddItem"
        component={AddItem}
        options={{ headerTitle: () => <LogoTitle /> }}
      />
      <Stack.Screen
        name="GroupLogs"
        component={GroupLogs}
        options={{ headerTitle: () => <LogoTitle /> }}
      />
    </Stack.Navigator>
  )
}

export default AuthStack
