import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import ImageCarousel from "../components/ImageCarousel";
import { COMMON_COLOR } from "../constants/commonColor";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";

const ProductInfoScreen = () => {
  const route = useRoute();

  const carouselImages = route?.params?.carouselImages;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <ImageCarousel
            images={carouselImages}
            imageHeight={500}
            dotActiveColor={COMMON_COLOR.primary}
            dotInactiveColor={COMMON_COLOR.secondary}
            resizeMode="contain"
          />
          <View style={styles.offerContainer}>
            <Text style={styles.offerText}>{route?.params?.offer}</Text>
          </View>

          <View style={styles.shareContainer}>
            <Entypo name="share" size={24} color="black" />
          </View>

          <View style={styles.favoriteContainer}>
            <Ionicons name="heart-outline" size={24} color="black" />
          </View>
        </View>

        <View style={styles.productDetailsContainer}>
          <View style={styles.inStockContainer}>
            <Text style={styles.inStockText}>IN STOCK</Text>
          </View>
          <Text style={styles.productTitle}>{route?.params?.title}</Text>
          <Text style={styles.productPrice}>රු {route?.params?.price}</Text>
          <Text style={styles.lineSeperator} />

          <View style={styles.subTextProductContainer}>
            <Text style={styles.productColorKey}>Color:</Text>
            <Text style={styles.productColorValue}>{route?.params?.color}</Text>
          </View>

          <View style={styles.subTextProductContainer}>
            <Text style={styles.productSizeKey}>Size:</Text>
            <Text style={styles.productSizeValue}>{route?.params?.size}</Text>
          </View>
          <Text style={styles.lineSeperator} />
          <View style={styles.subTextProductContainer}>
            <Text style={styles.productPriceKey}>Sub Total:</Text>
            <Text style={styles.productPriceValue}>
              රු {route?.params?.price}
            </Text>
          </View>

          <Text style={styles.freeDeliveryText}>
            Free delivery Tomorrow by 3 PM. Order within 10hrs 30 mins
          </Text>
          <View style={styles.deliveryAddressContainer}>
            <Entypo name="location" size={24} color="black" />
            <Text style={styles.deliveryAddressText}>
              Deliver to Hizbullah - Kandy 56789
            </Text>
          </View>

          <View style={styles.ButtonsContainer}>
            <TouchableOpacity style={styles.buttonPressableAddToCart}>
              <Text style={styles.buttonPressableText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonPressableBuyNow}>
              <Text style={styles.buttonPressableText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  offerContainer: {
    position: "absolute",
    top: 10,
    left: "15%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#F40C2A",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    zIndex: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  offerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  shareContainer: {
    position: "absolute",
    top: 10,
    right: "15%",
    transform: [{ translateX: 50 }],
    backgroundColor: "#E5DDDF",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    zIndex: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  favoriteContainer: {
    position: "absolute",
    bottom: 30,
    left: "15%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#E5DDDF",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    zIndex: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  productTitle: {
    fontWeight: "400",
    fontSize: 18,
    textAlign: "justify",
  },
  productDetailsContainer: {
    flexDirection: "column",
    paddingHorizontal: 20,
    rowGap: 15,
  },
  productPrice: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "justify",
  },
  lineSeperator: {
    borderBottomColor: COMMON_COLOR.secondary,
    borderBottomWidth: 1,
    height: 1,
  },
  subTextProductContainer: {
    flexDirection: "row",
    columnGap: 5,
  },
  productColorKey: {
    fontSize: 16,
  },
  productColorValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productSizeKey: {
    fontSize: 16,
  },
  productSizeValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPriceKey: {
    fontSize: 16,
  },
  productPriceValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  freeDeliveryText: {
    fontWeight: "500",
    fontSize: 18,
    color: COMMON_COLOR.secondary,
  },
  deliveryAddressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: 15,
  },
  deliveryAddressText: {
    fontWeight: "500",
    fontSize: 16,
  },
  inStockContainer: {
    backgroundColor: "green",
    borderRadius: 50,
    width: 90,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  inStockText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  ButtonsContainer: {
    flexDirection: "column",
    rowGap: 15,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  buttonPressableAddToCart: {
    backgroundColor: COMMON_COLOR.secondary,
    paddingVertical: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressableBuyNow: {
    backgroundColor: COMMON_COLOR.primary,
    paddingVertical: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressableText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
