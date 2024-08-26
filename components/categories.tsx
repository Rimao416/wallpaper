import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import React from "react";
import { data } from "@/constants/data";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Animated, { FadeInRight } from "react-native-reanimated";

const Categories: React.FC<{
  activeCategory: string;
  handleChangeCategory: (category: string) => void;
}> = ({ activeCategory, handleChangeCategory }) => {
  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatlistContainer}
      showsHorizontalScrollIndicator={false}
      data={data.categories}
      renderItem={({ item, index }) => (
        <CategoryItem
          title={item}
          index={index}
          isActive={activeCategory === item}
          handleChangeCategory={handleChangeCategory}
        />
      )}
    />
  );
};
const CategoryItem: React.FC<{
  title: any;
  index: number;
  isActive?: boolean;
  handleChangeCategory: (category: string) => void;
}> = ({ title, index, isActive, handleChangeCategory }) => {
    const textColor = isActive ? theme.colors.white : theme.colors.neutral(0.8);
    const backgroundColor=isActive?theme.colors.neutral(0.8):theme.colors.white
  return (
    <Animated.View entering={FadeInRight.delay(index * 200).duration(800)}>
      <Pressable
        onPress={() => handleChangeCategory(isActive ? null : title)}
        style={[styles.category, { backgroundColor }]}
      >
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingHorizontal: wp(4),
    gap: 8,
  },
  category: {
    paddingHorizontal: 15,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderCurve: "continuous",
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: 500,
  },
});

export default Categories;
