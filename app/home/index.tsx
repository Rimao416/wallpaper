import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import Categories from "@/components/categories";
import { apiCall } from "@/api";
import ImageGrid from "@/components/imageGrid";
const HomeScrenn = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState("");
  const searchInputRef = React.useRef<TextInput>(null);
  const [activeCategory, setActiveCategory] = useState("backgrounds");
  const [images, setImages] = useState<any[]>([]);
  useEffect(() => {
    fetchImages();
  }, []);
  const fetchImages = async (params = { page: 1 }, append = true) => {
    let res = await apiCall(params);
    if (res?.success && res?.data?.hits) {
      if (append) {
        setImages([...images, ...res.data.hits]);
      } else {
        setImages([...res.data.hits]);
      }
    }
  };
  const handleChangeCategory = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <Pressable>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>
      <ScrollView>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <TextInput
            placeholder="Search for photos..."
            style={styles.searchInput}
            ref={searchInputRef}
            value={search}
            onChangeText={(value: string) => setSearch(value)}
          />
          {search && (
            <Pressable style={styles.closeIcon}>
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>
        <View style={styles.categories}>
          <Categories
            handleChangeCategory={handleChangeCategory}
            activeCategory={activeCategory}
          />
        </View>
        <View>
            {images.length > 0 && <ImageGrid images={images}/>}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(4),
  },
  title: {
    fontSize: hp(4),
    fontWeight: "600",
    color: theme.colors.neutral(0.9),
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
  categories: {},
});
export default HomeScrenn;
