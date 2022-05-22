import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "../containers/Authentication/Login"
import SignUp from "../containers/Authentication/SignUp"
import VerifyCode from "../containers/Authentication/verifyCode"
import React from "react"
import { theme } from "../theme"

const Stack = createNativeStackNavigator()

const AppStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerTitleStyle: { color: theme.colors.accent[100] },
        headerStyle: {
          backgroundColor: theme.colors.secondary[500],
          borderBottomWidth: 0,
        },
      })}
    >
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
      <Stack.Screen name="VerifyCode" component={VerifyCode}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default AppStack
