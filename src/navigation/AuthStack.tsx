import React from "react"
import Dashboard from "../containers/Dashboard"
import Groups from "../containers/Groups"
import AddGroup from "../containers/Groups/addGroup"
import ViewGroup from "../containers/Groups/viewGroup"
import AddUser from "../containers/Groups/addUser"
import ViewInvite from "../containers/Groups/viewInvite"
import AddItem from "../containers/Groups/addItem"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import GroupLogs from "../containers/GroupContainers/GroupLogs"
import Ionicons from "react-native-vector-icons/Ionicons"
import Profile from "../containers/Authentication/Profile"
import { theme } from "../theme"

const Tab = createBottomTabNavigator()

const defaultOptions = { tabBarButton: () => null }
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
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ ...defaultOptions }}
      />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Groups" component={Groups} />

      <Tab.Screen
        name="AddGroup"
        component={AddGroup}
        options={{ ...defaultOptions }}
      />
      <Tab.Screen
        name="ViewGroup"
        component={ViewGroup}
        options={{ ...defaultOptions }}
      />
      <Tab.Screen
        name="ViewInvite"
        component={ViewInvite}
        options={{ ...defaultOptions }}
      />
      <Tab.Screen
        name="AddUser"
        component={AddUser}
        options={{ ...defaultOptions }}
      />
      <Tab.Screen
        name="AddItem"
        component={AddItem}
        options={{ ...defaultOptions }}
      />
      <Tab.Screen
        name="GroupLogs"
        component={GroupLogs}
        options={{ ...defaultOptions }}
      />
    </Tab.Navigator>
  )
}

export default AuthStack
