import React from "react"
import {
  Box,
  Heading,
  Center,
  StatusBar
} from "native-base"

import NavigationButtons from "../components/NavigationButtons"

export default function Page3() {
  return (
    <Box marginTop={StatusBar.currentHeight} flex={1}>
      <Center>
        <Heading>I am Page 3</Heading>
      </Center>
      <NavigationButtons />
    </Box>
  )
}