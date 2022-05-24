import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "../containers/Authentication/Login"
import SignUp from "../containers/Authentication/SignUp"
import VerifyCode from "../containers/Authentication/verifyCode"
import Ionicons from "react-native-vector-icons/Ionicons"
import { FontAwesome } from "@expo/vector-icons"
import React from "react"
import { theme } from "../theme"

const Tab = createMaterialTopTabNavigator()
const Stack = createNativeStackNavigator()

const SignUpRoot = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="Register" component={SignUp} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
    </Stack.Navigator>
  )
}

const AppStack = (): JSX.Element => {
  const iconSize = 25
  return (
    <Tab.Navigator
      screenOptions={(route) => ({
        tabBarActiveTintColor: theme.colors.accent[200],
        tabBarStyle: {
          backgroundColor: theme.colors.secondary[500],
          paddingTop: 20,
        },
        tabBarIcon: ({ focused }) => {
          let iconName
          let color

          switch (route.route.name) {
            case "Login":
              iconName = focused ? "paper-plane" : "paper-plane-o"
              color = focused
                ? theme.colors.accent[100]
                : theme.colors.accent[400]

              return (
                <FontAwesome name={iconName} size={iconSize} color={color} />
              )
            default:
              iconName = focused ? "ios-person-add" : "ios-person-add-outline"
              color = focused
                ? theme.colors.accent[100]
                : theme.colors.accent[400]

              return <Ionicons name={iconName} size={iconSize} color={color} />
          }
        },
        tabBarIconStyle: {
          marginTop: 10,
          width: iconSize,
          height: iconSize,
        },
        tabBarIndicatorStyle: { backgroundColor: theme.colors.accent[200] },
      })}
      sceneContainerStyle={{ backgroundColor: theme.colors.secondary[400] }}
    >
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="SignUp" component={SignUpRoot} />
    </Tab.Navigator>
  )
}

export default AppStack
