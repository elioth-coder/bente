import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  Input,
  ScrollView,
  HStack,
  Button,
  Image
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { StatusBar } from "react-native";
import HideKeyboardEventListener from "../utils/HideKeyboardEventListener";
import { useDispatch } from 'react-redux'
import { add } from '../features/counter/productsSlice'
import ProductsDatabase from "../databases/ProductsDatabase";

export default function AddProduct() {
  const dispatch = useDispatch()
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [openCam, setOpenCam] = useState(false);
  const [photo, setPhoto] = useState();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const navigation = useNavigation();

  useEffect(HideKeyboardEventListener(navigation), []);
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  let takePhoto = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
      ratio: "1:1"
    };

    let { uri } = await cameraRef.current.takePictureAsync(options);
    const asset = await MediaLibrary.createAssetAsync(uri);

    setPhoto(asset.uri);
    setOpenCam(false);
  };

  const saveProduct = async () => {
    try {
      const product = await ProductsDatabase.add({code, name, price, photo});
      dispatch(add(product));
      alert("Successfully save/added the product.");
      clearForm();
    } catch (e) {
      alert(e);
    }
  };

  const clearForm = () => {
    setCode("");
    setName("");
    setPrice("");
    setPhoto(undefined);
  };

  return (
    <Box flex={1} marginTop={StatusBar.currentHeight + "px"}>
      <ScrollView bgColor="white">
        <Box p="3">
          <Heading m="3" numberOfLines={1} ellipsizeMode="tail">
            Enter Product Details
          </Heading>
          <VStack w="100%" p="3" space="5">
            <VStack alignItems="center">
              {(!openCam && photo)
                ? <Image source={{
                    uri: photo
                  }} alt="..." size="2xl" />
                : <></>
              }
              {(openCam) 
                ? <>
                <Camera ref={cameraRef} 
                  type={CameraType.back}
                  style={{width: 300, height: 300}}>
                </Camera>
                <Button onPress={takePhoto}>Take Photo</Button>
                </>
                : (hasCameraPermission && hasMediaLibraryPermission) 
                  ? <Box alignItems="center">
                      <Button onPress={() => setOpenCam(true)}>Open Camera</Button>
                    </Box> 
                  : <Box alignItems="center">
                      <Text>No Camera or Media Library permission</Text>
                    </Box>
              }
            </VStack>
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
            <HStack justifyContent="flex-end">
              <Button size="lg" onPress={saveProduct}>
                Save
              </Button>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
