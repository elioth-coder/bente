import React, { useState, useContext } from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  VStack,
  HStack,
  ScrollView,
  Icon,
  Image,
} from "native-base";
import { StatusBar } from "react-native";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../features/counter/productsSlice'

import generateUniqueKey from "../utils/generateUniqueKey";
import ProductsDatabase from "../databases/ProductsDatabase";

export default function ListProduct() {
  const products = useSelector((state) => state.products)
  const dispatch = useDispatch()
  const navigation = useNavigation();

  const editProduct = (product) => {
    console.log(product);
    navigation.navigate("EditProduct", { ...product });
  };

  const confirmDelete = (id) => {
    Alert.alert("", "Delete this product?", [
      { text: "Yes", onPress: () => deleteProduct(id) },
      { text: "No", style: "cancel" },
    ]);
  };

  const deleteProduct = async (id) => {
    try {
      ProductsDatabase.remove(id);
      dispatch(remove(id));
      console.log("Successfully deleted the product.");
    } catch (e) {
      alert(e);
    }
  };

  const ListItem = ({ product }) => {
    return (
      <HStack
        borderBottomWidth="1"
        borderBottomColor="tertiary.200"
        bgColor="muted.100"
        justifyContent="center">
        <Center w="28%">
          <Image source={{
            uri: product.photo
          }} alt="..." size="xs" />
        </Center>
        <Text
          onPress={() => editProduct(product)}
          w="35%"
          p="3"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {product.name}
        </Text>
        <Text
          w="20%"
          p="3"
          textAlign="right"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {product.price}
        </Text>
        <Center w="17%" p="3">
          <Icon
            onPress={() => confirmDelete(product.id)}
            as={Ionicons}
            name="trash"
            color="danger.700"
            size={5}
          />
        </Center>
      </HStack>
    );
  };

  return (
    <Box flex={1} bgColor="white" marginTop={StatusBar.currentHeight + "px"}>
      <ScrollView>
        <Box p="3">
          <Heading m="3">
            <Text>List of Products</Text>
          </Heading>
          <VStack>
            <HStack justifyContent="center">
              <Center fontWeight="bold" w="28%" p="3">
                <Text fontWeight="bold">PHOTO</Text>
              </Center>
              <Text fontWeight="bold" w="35%" p="3">
                ITEM NAME
              </Text>
              <Text fontWeight="bold" w="20%" p="3">
                PRICE
              </Text>
              <Center w="17%" p="3">
                <Icon as={Ionicons} name="trash" size={6} />
              </Center>
            </HStack>
            <Box>
              {products.length ? (
                products.map((product) => (
                  <ListItem key={generateUniqueKey(16)} product={product} />
                ))
              ) : (
                <Center>
                  <Text>No products found.</Text>
                </Center>
              )}
            </Box>
          </VStack>
        </Box>
        <Box h="60px" w="100%"></Box>
      </ScrollView>
    </Box>
  );
}
