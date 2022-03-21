import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import React from 'react';
import { useAuthContext } from "../contexts/AuthContext";
import { validateToken } from "../utils/helpers";
import Loading from "./Loading";

const AppNavigation: React.FC = () => {

  const { authData, isAuthenticating } = useAuthContext();

  if (isAuthenticating) {
    return <Loading />
  }
    return (
        <NavigationContainer>
          {validateToken(authData.token) ? <AuthStack /> : <AppStack />}
        </NavigationContainer>
    )
}

export default AppNavigation;