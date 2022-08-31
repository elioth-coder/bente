import React from "react"
import {
  Box,
  Heading,
  Center,
  NativeBaseProvider
} from "native-base"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import AddProducts from "./pages/AddProducts"
import Page2 from "./pages/Page2"
import Page3 from "./pages/Page3"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AddProducts">
          <Stack.Screen name="AddProducts" component={AddProducts} />
          <Stack.Screen name="Page2" component={Page2} />
          <Stack.Screen name="Page3" component={Page3} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}