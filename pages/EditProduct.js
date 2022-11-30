import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  Input,
  ScrollView,
  HStack,
  Button,
} from "native-base";
import { StatusBar } from "react-native";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import HideKeyboardEventListener from "../utils/HideKeyboardEventListener";
import { useDispatch } from 'react-redux'
import { update } from '../features/counter/productsSlice'
import ProductsDatabase from "../databases/ProductsDatabase";

export default function EditProduct() {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  useEffect(HideKeyboardEventListener(navigation), []);

  const route = useRoute();
  const { id } = route.params;
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      setCode(route.params.code);
      setName(route.params.name);
      setPrice(route.params.price + "");
    }, [route])
  );

  const updateProduct = async (id) => {
    try {
      let rowsAffected = ProductsDatabase.update({id, code, name, price});
      dispatch(update({id, code, name, price}))
      alert("Successfully updated the product.");
      navigation.navigate("ListProduct");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Box flex={1} marginTop={StatusBar.currentHeight + "px"}>
      <ScrollView bgColor="white">
        <Box p="3">
          <Heading m="3" numberOfLines={1} ellipsizeMode="tail">
            Edit Product Details
          </Heading>
          <VStack w="100%" p="3" space="5">
            <Input
              w="auto"
              bgColor="white"
              value={code}
              onChangeText={setCode}
              placeholder="Enter code."
            />
            <Input
              w="auto"
              bgColor="white"
              value={name}
              onChangeText={setName}
              placeholder="Enter name."
            />
            <Input
              w="auto"
              bgColor="white"
              value={price}
              onChangeText={setPrice}
              placeholder="Enter price."
            />
            <HStack justifyContent="flex-end" space={1}>
              <Button
                size="lg"
                bgColor="danger.500"
                onPress={() => navigation.navigate("ListProduct")}
              >
                Cancel
              </Button>
              <Button size="lg" onPress={() => updateProduct(id)}>
                Update
              </Button>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
