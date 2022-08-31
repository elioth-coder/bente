import React from "react"
import {
  HStack,
  Button
} from "native-base"
import { useNavigation } from "@react-navigation/native"


export default function NavigationButtons() {
  const navigation = useNavigation();

  return (
    <HStack space={3} justifyContent="center">
      <Button onPress={() => navigation.navigate("Page1")}>Page 1</Button>
      <Button onPress={() => navigation.navigate("Page2")}>Page 2</Button>
      <Button onPress={() => navigation.navigate("Page3")}>Page 3</Button>
    </HStack>
  )
}