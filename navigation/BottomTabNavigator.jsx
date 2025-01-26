import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { BOTTOM_TAB_BAR_COLOR } from "../constants/bottomTabBar/index";
import HomeScreen from "../screens/HomeScreen";

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 60 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            color: BOTTOM_TAB_BAR_COLOR.labelColor,
            fontWeight: "bold",
            fontSize: 12,
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name="home-sharp"
                size={24}
                color={BOTTOM_TAB_BAR_COLOR.iconColor}
              />
            ) : (
              <Ionicons
                name="home-outline"
                size={24}
                color={BOTTOM_TAB_BAR_COLOR.iconColor}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarLabelStyle: {
            color: BOTTOM_TAB_BAR_COLOR.labelColor,
            fontWeight: "bold",
            fontSize: 12,
          },

          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome
                name="user"
                size={24}
                color={BOTTOM_TAB_BAR_COLOR.iconColor}
              />
            ) : (
              <FontAwesome5
                name="user"
                size={24}
                color={BOTTOM_TAB_BAR_COLOR.iconColor}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Cart",
          tabBarLabelStyle: {
            color: BOTTOM_TAB_BAR_COLOR.labelColor,
            fontWeight: "bold",
            fontSize: 12,
          },

          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name="cart"
                size={24}
                color={BOTTOM_TAB_BAR_COLOR.iconColor}
              />
            ) : (
              <Ionicons
                name="cart-outline"
                size={24}
                color={BOTTOM_TAB_BAR_COLOR.iconColor}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
