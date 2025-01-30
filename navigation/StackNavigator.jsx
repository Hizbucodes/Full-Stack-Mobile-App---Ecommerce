import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import AddressScreen from "../screens/AddressScreen";
import { COMMON_COLOR } from "../constants/commonColor";
import AddAddressScreen from "../screens/AddAddressScreen";
import CartScreen from "../screens/CartScreen";

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

        <Stack.Screen
          name="address"
          component={AddressScreen}
          options={{
            headerTitle: "Address",
            headerStyle: {
              backgroundColor: COMMON_COLOR.primary,
            },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="add-address"
          component={AddAddressScreen}
          options={{
            headerTintColor: "white",
            headerTitle: "Add New Address",
            headerStyle: {
              backgroundColor: COMMON_COLOR.primary,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
