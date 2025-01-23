import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomInput from "../components/customInput/index";
import { COMMON_COLOR } from "../constants/commonColor/index";
import ImageCarousel from "../components/ImageCarousel";

const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      name: "Home",
    },
    {
      id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      name: "Deals",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      name: "Electronics",
    },
    {
      id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      name: "Mobiles",
    },
    {
      id: "5",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
      name: "Music",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      name: "Fashion",
    },
    {
      id: "7",
      image:
        "https://m.media-amazon.com/images/I/61xq0PAjSwL._AC_UL480_FMwebp_QL65_.jpg",
      name: "Watches",
    },
    {
      id: "8",
      image:
        "https://m.media-amazon.com/images/I/3132fK3zjUL._AC_UL480_FMwebp_QL65_.jpg",
      name: "Beauty",
    },
  ];

  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.searchContainer}>
          <Pressable style={styles.searchInput}>
            <AntDesign
              name="search1"
              size={24}
              color="black"
              style={styles.searchIcon}
            />
            <CustomInput
              name="search"
              control={control}
              placeholder="Search EverStyle.in"
            />
          </Pressable>

          <Feather name="mic" size={24} color="white" />
        </View>

        <View style={styles.locationHeaderContainer}>
          <Ionicons name="location-outline" size={24} color="white" />
          <Pressable>
            <Text style={styles.addressText}>
              Deliver to Hizbullah - Kandy 56789
            </Text>
          </Pressable>
          <AntDesign name="down" size={18} color="white" />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item) => (
            <Pressable
              key={item.id}
              style={styles.TopHorizontalPressebaleSliderImages}
            >
              <Image
                style={styles.TopHorizontalSliderImages}
                resizeMode="contain"
                source={{ uri: item.image }}
              />
              <Text style={styles.TopHorizontalSliderImageText}>
                {item?.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <ImageCarousel />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    flex: 1,
    backgroundColor: "white",
  },
  searchContainer: {
    backgroundColor: COMMON_COLOR.primary,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    alignItems: "center",
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 5,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  locationHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 20,
    backgroundColor: COMMON_COLOR.secondary,
    paddingVertical: 10,
    columnGap: 10,
  },
  addressText: {
    color: "white",
    fontWeight: "500",
  },
  TopHorizontalSliderImages: {
    width: 50,
    height: 50,
  },
  TopHorizontalPressebaleSliderImages: {
    margin: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  TopHorizontalSliderImageText: {
    marginTop: 10,
    fontWeight: 500,
    fontSize: 12,
    textAlign: "center",
  },
});
