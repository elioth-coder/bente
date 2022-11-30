import React, { useEffect, useContext } from "react";
import { Box, Center, HStack, Heading, VStack, Spinner } from "native-base";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from 'react-redux'
import { populate } from '../features/counter/productsSlice'
import ProductsDatabase from "../databases/ProductsDatabase";
import DBConnection from "../utils/DBConnection";

const db = new DBConnection("pos");

export default function SetupDB() {
  const dispatch = useDispatch()

  const navigation = useNavigation();

  const getProducts = async () => {
    try {
      let items = await ProductsDatabase.getAll();
      dispatch(populate(items));
      console.log("Successfully got the products.");
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    async function setupDatabase() {
      const createProductsTableQuery = `
        CREATE TABLE IF NOT EXISTS product (
          id INTEGER PRIMARY KEY,
          photo TEXT,
          code TEXT NOT NULL UNIQUE,
          name TEXT NOT NULL,
          price REAL NOT NULL
        );  
        
      `;
      try {
        await db.exec(createProductsTableQuery);
        navigation.navigate("ListProduct");
      } catch (e) {
        console.log(e);
      }
    }

    setupDatabase();
    getProducts();
  }, []);

  return (
    <Box flex={1} marginTop={StatusBar.currentHeight + "px"}>
      <VStack space={3} justifyContent="center" flex={1}>
        <Center>
          <Heading>Setting up database...</Heading>
        </Center>
        <HStack space={8} justifyContent="center">
          <Spinner color="emerald.500" />
          <Spinner color="warning.500" />
          <Spinner color="indigo.500" />
          <Spinner color="cyan.500" />
        </HStack>
      </VStack>
    </Box>
  );
}
