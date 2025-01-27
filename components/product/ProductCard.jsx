import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../app/feature/cart/cartSlice";
import { COMMON_COLOR } from "../../constants/commonColor";

const ProductCard = ({ products, category }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const isProductInCart = (productId) => {
    return cart.some((cartItem) => cartItem.id === productId);
  };

  const addProductToCart = (item) => {
    dispatch(addToCart(item));
  };

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;
  const renderProductItems = ({ item }) => {
    return (
      <View style={styles.productCard}>
        <Image style={styles.productImage} source={{ uri: item?.image }} />

        <Text style={styles.productTitle}>
          {item?.title?.length > 30
            ? `${item?.title?.slice(0, 30)}...`
            : item?.title}
        </Text>

        <View style={styles.productPriceAndRatingContainer}>
          <Text style={styles.productPrice}>රු {item?.price}</Text>
          <Text style={styles.productRating}>{item?.rating?.rate} ratings</Text>
        </View>

        <TouchableOpacity
          onPress={() => addProductToCart(item)}
          style={styles.addToCartButton}
        >
          <Text style={styles.addToCartText}>
            {isProductInCart(item.id) ? "Product Already Added" : "Add to Cart"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={filteredProducts}
      renderItem={renderProductItems}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCard: {
    marginHorizontal: "auto",
    marginVertical: 20,
  },
  productImage: {
    marginHorizontal: "auto",
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  productTitle: {
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 10,
  },
  productPriceAndRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  productPrice: {
    fontWeight: "bold",
    fontSize: 15,
  },
  productRating: {
    fontWeight: "bold",
    color: "#FF9529",
  },
  addToCartButton: {
    backgroundColor: COMMON_COLOR.primary,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 20,
  },
  addToCartText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
