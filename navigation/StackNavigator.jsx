import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import { COMMON_COLOR } from "../constants/commonColor";

const StackNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="product-info"
          component={ProductInfoScreen}
          options={({ route }) => ({
            title: route.params.title,
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: COMMON_COLOR.primary,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
