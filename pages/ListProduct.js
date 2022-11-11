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
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { GlobalContext } from "../App";
import generateUniqueKey from "../utils/generateUniqueKey";

export default function ListProduct() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const { db } = useContext(GlobalContext);

  const editProduct = (product) => {
    console.log(product);
    navigation.navigate("EditProduct", { ...product });
  };

  const getProducts = async () => {
    const sql = `SELECT * FROM product`;

    try {
      let items = await db.exec(sql);
      setProducts(items);
      console.log("Successfully got the products.");
    } catch (e) {
      alert(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getProducts();
    }, [])
  );

  const confirmDelete = (id) => {
    Alert.alert("", "Delete this product?", [
      { text: "Yes", onPress: () => deleteProduct(id) },
      { text: "No", style: "cancel" },
    ]);
  };

  const deleteProduct = async (id) => {
    const sql = `DELETE FROM product WHERE id=${id}`;

    try {
      let rowsAffected = await db.exec(sql);
      let items = products.filter((item) => item.id != id);

      setProducts(items);
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
        justifyContent="center"
      >
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
