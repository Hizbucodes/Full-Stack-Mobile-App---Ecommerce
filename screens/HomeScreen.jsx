import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
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
import axios from "axios";
import ProductCard from "../components/product/ProductCard";
import DropDownPicker from "react-native-dropdown-picker";

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

  const deals = [
    {
      id: "20",
      title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      oldPrice: 25000,
      price: 19000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
        "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "30",
      title:
        "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
      oldPrice: 74000,
      price: 26000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      ],
      color: "Cloud Navy",
      size: "8 GB RAM 128GB Storage",
    },
    {
      id: "40",
      title:
        "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
      oldPrice: 16000,
      price: 14000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
      ],
      color: "Icy Silver",
      size: "6 GB RAM 64GB Storage",
    },
    {
      id: "50",
      title:
        "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
      oldPrice: 12999,
      price: 10999,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
      ],
    },
  ];

  const offers = [
    {
      id: "0",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
      offer: "72% off",
      oldPrice: 7500,
      price: 4500,
      image:
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
      ],
      color: "Green",
      size: "Normal",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
      carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
      color: "black",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 24999,
      price: 19999,
      image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
      ],
      color: "Norway Blue",
      size: "8GB RAM, 128GB Storage",
    },
  ];

  const [products, setProducts] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [productError, setProductError] = useState(null);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("jewelery");
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);

  const onCategoryOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        if (response.status !== 200) {
          throw new Error(response.data.message);
        }
        setProducts(response.data);
      } catch (err) {
        console.log(`Error Message: ${err}`);
        setProductError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderDealsItems = ({ item }) => {
    return (
      <Image
        source={{ uri: item.image }}
        resizeMode="cover"
        style={styles.dealsItemImage}
      />
    );
  };

  const renderOfferItems = ({ item }) => {
    return (
      <View style={styles.renderOfferItems}>
        <Image
          source={{ uri: item.image }}
          style={styles.dealsOfferItemImage}
        />
        <Text style={styles.renderOfferItemsText}>Upto {item?.offer}</Text>
      </View>
    );
  };

  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <Text style={styles.trendingDealsText}>
          Trending Deals of the week{" "}
          <Fontisto name="fire" size={24} color="#FFC11F" />
        </Text>

        <View style={styles.dealsItemContainer}>
          <FlatList
            data={deals}
            renderItem={renderDealsItems}
            keyExtractor={(deal) => deal.id}
            numColumns={2}
          />
        </View>

        <Text style={styles.todaysDealsText}>Today's Deals</Text>
        <View style={styles.todaysDealsContainer}>
          <FlatList
            data={offers}
            renderItem={renderOfferItems}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View>
          <Text style={styles.productCategoryHeaderTitle}>
            Find Products By Category
          </Text>
          <DropDownPicker
            open={open}
            value={category}
            items={items}
            setOpen={setOpen}
            placeholder="choose category"
            setValue={setCategory}
            setItems={setItems}
            onOpen={onCategoryOpen}
            zIndex={3000}
            zIndexInverse={1000}
            style={styles.dropDownCategory}
          />
          {isloading && (
            <ActivityIndicator size={"large"} color={COMMON_COLOR.primary} />
          )}
          {productError && (
            <Text style={styles.productErrorText}>{productError}</Text>
          )}

          {!isloading && !productError && (
            <ProductCard products={products} category={category} />
          )}
        </View>
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
  trendingDealsText: {
    fontWeight: "bold",
    fontSize: 22,
    paddingLeft: 20,
    marginVertical: 25,
  },
  dealsItemContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  dealsItemImage: {
    marginHorizontal: 15,
    width: 200,
    height: 300,
  },
  todaysDealsText: {
    fontWeight: "bold",
    fontSize: 22,
    paddingLeft: 20,
    marginVertical: 25,
  },
  todaysDealsContainer: {
    marginBottom: 20,
  },
  dealsOfferItemImage: {
    marginHorizontal: 15,
    width: 150,
    resizeMode: "center",
    height: 200,
  },
  renderOfferItems: {
    flexDirection: "column",
    alignItems: "center",
    rowGap: 10,
  },
  renderOfferItemsText: {
    width: "90%",
    backgroundColor: "#d42b49",
    padding: 10,
    fontWeight: "bold",
    color: "white",
    borderRadius: 5,
    textAlign: "center",
  },
  productCategoryHeaderTitle: {
    fontWeight: "bold",
    fontSize: 22,
    paddingLeft: 20,
    marginVertical: 25,
  },
  dropDownCategory: {
    borderColor: COMMON_COLOR.secondary,
    borderWidth: 3,
    height: 30,
    marginBottom: 50,
    width: "45%",
    marginLeft: 20,
    marginHorizontal: 10,
  },
  productErrorText: {
    fontWeight: "500",
    textAlign: "center",
    fontSize: 25,
    color: "red",
  },
});
