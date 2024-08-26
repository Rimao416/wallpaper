import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { getImageSize, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";

const ImageCard = ({ item, index }) => {
  const getImageHeight = () => {
    let { imageHeight: height, imageWidth: width } = item;
    return { height: getImageSize(height, width) };
  };
  return (
    <Pressable style={[styles.imageWrapper,styles.spacing]}>
      <Image
        style={[styles.image,getImageHeight()]}
        source={{ uri: item?.webformatURL }}
        transition={100}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  imageWrapper:{
    backgroundColor:theme.colors.grayBG,
    borderRadius:theme.radius.xl, 
    borderCurve:'continuous',
    overflow:"hidden",
    marginBottom:wp(2)
  },
  spacing:{
    marginRight:wp(2)
  }
});

export default ImageCard;
