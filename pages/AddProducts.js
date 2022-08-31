import React from "react"
import {
  Box,
  Heading,
  Center,
  StatusBar,
  VStack,
  Input
} from "native-base"

import NavigationButtons from "../components/NavigationButtons"

export default function AddProducts() {
  return (
    <Box marginTop={StatusBar.currentHeight} flex={1}>
      <Center>
        <Heading>Add Products</Heading>
      </Center>
      <VStack>
        <Input m="3" placeholder="Enter product barcode." w="100%" />
        <Input m="3" placeholder="Enter product name." w="100%" />
        <Input m="3" placeholder="Enter product price." w="100%" />
      </VStack>
      <NavigationButtons />
    </Box>
  )
}