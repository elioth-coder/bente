import React, {useState, useContext, useEffect} from "react"
import {
  Box,
  Heading,
  VStack,
  Input,
  ScrollView,
  HStack,
  Button
} from "native-base"
import { useNavigation } from "@react-navigation/native"
import { StatusBar } from "react-native"
import { GlobalContext } from "../GlobalContext"
import hideTabBarOnKeyboardShow from "../utils/hideTabOnKeyboardShow"

export default function AddProduct() {
  const navigation = useNavigation()
  const { addKeyboardEventListener, removeKeyboardEventListener } = hideTabBarOnKeyboardShow(navigation)

  useEffect(() => {
    addKeyboardEventListener()

    return () => {
      removeKeyboardEventListener()
    }
  }, []);
  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const { db } = useContext(GlobalContext);

  const saveProduct = async () => {
    console.log("Clicked Save Product button.")
    
    const sql = 
      `INSERT INTO product (code, name, price) 
       VALUES ('${code}','${name}',${price})`
    
    try {
      await db.exec(sql);
      alert("Successfully added the product.")
      clearForm()
    } catch (e) {
      alert(e)
    }
  }

  const clearForm = () => {
    setCode("")
    setName("")
    setPrice("")
  }

  return (
    <Box flex={1} marginTop={StatusBar.currentHeight + "px"}>
      <ScrollView bgColor="white">
        <Box p="3">
          <Heading m="3" numberOfLines={1} ellipsizeMode="tail">Enter Product Details</Heading>
          <VStack w="100%" p="3" space="5">
            <Input w="auto" bgColor="white" value={code} onChangeText={setCode} placeholder="Enter code." />
            <Input w="auto" bgColor="white" value={name} onChangeText={setName} placeholder="Enter name." />
            <Input w="auto" bgColor="white" value={price} onChangeText={setPrice} placeholder="Enter price." />
            <HStack justifyContent="flex-end">
              <Button size="lg" onPress={saveProduct}>Save</Button>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  )
}