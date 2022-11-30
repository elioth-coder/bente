import React from "react";
import { NativeBaseProvider, useTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { store } from './store'
import { Provider } from 'react-redux'

import SetupDB from "./pages/SetupDB";
import ListProduct from "./pages/ListProduct";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import QueryBox from "./pages/QueryBox";
import DBConnection from "./utils/DBConnection";

const Tab = createBottomTabNavigator();
const screenOptions = ({ route }) => {
  const { colors } = useTheme();

  return {
    tabBarIcon: ({ focused, color, size }) => {
      const routeIcons = {
        AddProduct: ["add", "add-outline"],
        ListProduct: ["list", "list-outline"],
        QueryBox: ["server", "server-outline"],
      };

      const index = focused ? 0 : 1;
      const name = route.name ? route.name : "";
      const icon = routeIcons[name][index];

      return <Ionicons name={icon} size={size} color={color} />;
    },
    tabBarActiveTintColor: colors["primary"]["500"],
    tabBarInactiveTintColor: "gray",
  };
};

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="SetupDB"
            screenOptions={screenOptions}>
            <Tab.Screen
              name="SetupDB"
              options={{ headerShown: false, tabBarButton: (props) => false }}
              component={SetupDB}
            />
            <Tab.Screen
              name="ListProduct"
              options={{ headerShown: false }}
              component={ListProduct}
            />
            <Tab.Screen
              name="AddProduct"
              options={{ headerShown: false }}
              component={AddProduct}
            />
            <Tab.Screen
              name="EditProduct"
              options={{ headerShown: false, tabBarButton: (props) => false }}
              component={EditProduct}
            />
            <Tab.Screen
              name="QueryBox"
              options={{ headerShown: false }}
              component={QueryBox}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
