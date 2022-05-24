import React from "react"
import Dashboard from "../containers/Dashboard"
import Groups from "../containers/Groups"
import AddGroup from "../containers/GroupContainers/AddGroup"
import ViewGroup from "../containers/GroupContainers/ViewGroup"
import AddUser from "../containers/GroupContainers/AddUser"
import ViewInvite from "../containers/GroupContainers/ViewGroupInvite"
import AddItem from "../containers/GroupContainers/AddItem"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import GroupLogs from "../containers/GroupContainers/GroupLogs"
import AdminAddItem from "../containers/AdminContainers/AddItem"
import Ionicons from "react-native-vector-icons/Ionicons"
import Profile from "../containers/Authentication/Profile"
import { theme } from "../theme"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const defaultOptions = { tabBarButton: () => null }

const AuthScreens = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.secondary[400],
        },
      })}
    >
      <Stack.Screen name="AddGroup" component={AddGroup} />
      <Stack.Screen name="ViewGroup" component={ViewGroup} />
      <Stack.Screen name="ViewInvite" component={ViewInvite} />
      <Stack.Screen name="AddUser" component={AddUser} />
      <Stack.Screen name="AddItem" component={AddItem} />
      <Stack.Screen name="GroupLogs" component={GroupLogs} />
      <Stack.Screen name="Admin Add Item" component={AdminAddItem} />
    </Stack.Navigator>
  )
}

const AuthStack = (): JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => ({
        headerRightContainerStyle: { paddingRight: 10 },
        tabBarIconStyle: { color: theme.colors.secondary[500] },
        tabBarShowLabel: false,
        headerTitleStyle: { color: theme.colors.accent[100] },
        headerStyle: {
          backgroundColor: theme.colors.secondary[500],
          borderBottomWidth: 0,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.secondary[500],
          borderTopWidth: 0,
        },
        headerRight: () => (
          <Ionicons
            name={
              route.name === "Profile"
                ? "person-circle"
                : "person-circle-outline"
            }
            onPress={() => navigation.navigate("Profile")}
            size={30}
            color={
              route.name === "Profile"
                ? theme.colors.accent[100]
                : theme.colors.accent[400]
            }
          />
        ),
        tabBarIcon: ({ focused }) => {
          let iconName
          let color

          switch (route.name) {
            case "Dashboard":
              iconName = focused ? "easel" : "easel-outline"
              color = focused
                ? theme.colors.accent[100]
                : theme.colors.accent[400]

              break
            case "Groups":
              iconName = focused ? "people-circle" : "people-circle-outline"
              color = focused
                ? theme.colors.accent[100]
                : theme.colors.accent[400]

              break
          }
          return <Ionicons name={iconName} size={30} color={color} />
        },
      })}
      sceneContainerStyle={{ backgroundColor: theme.colors.secondary[400] }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ ...defaultOptions }}
      />
      <Tab.Screen name="Groups" component={Groups} />
      <Tab.Screen
        name="AuthScreens"
        component={AuthScreens}
        options={{ ...defaultOptions }}
      />
    </Tab.Navigator>
  )
}

export default AuthStack
