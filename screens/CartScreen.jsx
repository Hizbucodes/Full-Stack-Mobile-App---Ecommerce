import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../app/feature/cart/cartSlice";
import { COMMON_COLOR } from "../constants/commonColor/commonColor";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const total = cart
    ?.map((item) => item.price * item?.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };

  const deleteFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const renderCartItems = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("product-info", {
              id: item.id,
              title: item.title,
              price: item.price,
              carouselImages: item.carouselImages,
              color: item.color,
              oldPrice: item.oldPrice,
              offer: item.offer,
              size: item.size,
              item: item,
            })
          }
          key={index}
          style={styles.productContainer}
        >
          <Image style={styles.productImage} source={{ uri: item?.image }} />

          <View style={styles.productDetailText}>
            <Text style={styles.productTitle}>
              {(item?.title).length > 30
                ? `${item?.title.slice(0, 30)}...`
                : item?.title}
            </Text>
            <Text style={styles.productPrice}>රු {item?.price}</Text>
            <Text style={styles.productStock}>In Stock</Text>
          </View>
        </TouchableOpacity>
        <View></View>

        <View style={styles.bottomProductDetailContainer}>
          <View style={styles.productIncrementDecrementContainer}>
            <View style={styles.productIncrementDecrement}>
              {item?.quantity === 1 ? (
                <Pressable onPress={() => decreaseQuantity(item)}>
                  <FontAwesome6
                    name="trash-alt"
                    size={30}
                    color={COMMON_COLOR.primary}
                  />
                </Pressable>
              ) : (
                <Pressable onPress={() => decreaseQuantity(item)}>
                  <AntDesign
                    name="minussquareo"
                    size={30}
                    color={COMMON_COLOR.primary}
                  />
                </Pressable>
              )}

              <Text style={styles.productIncrementDecrementTextInput}>
                {item?.quantity}
              </Text>
              <Pressable onPress={() => increaseQuantity(item)}>
                <AntDesign
                  name="plussquareo"
                  size={30}
                  color={COMMON_COLOR.primary}
                />
              </Pressable>
            </View>
            <Pressable
              onPress={() => deleteFromCart(item)}
              style={styles.productDeleteButtonContainer}
            >
              <Text style={styles.productDeleteButtonText}>Delete</Text>
            </Pressable>
          </View>
          <View style={styles.bottomButtonContainer}>
            <Pressable style={styles.bottomButton}>
              <Text style={styles.bottomButtonTextOne}>Save for Later</Text>
            </Pressable>
            <Pressable style={styles.bottomButton}>
              <Text style={styles.bottomButtonTextTwo}>
                Save more like this
              </Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.bottomHorizontalLine} />
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.subTotalContainer}>
        <Text style={styles.subTotalTitle}>Subtotal: </Text>
        <Text style={styles.subTotalValue}>රු {total}</Text>
      </View>

      <TouchableOpacity
        disabled={cart.length < 1 ? true : false}
        onPress={() => navigation.navigate("confirmation-screen")}
        style={[
          styles.proceedToBuyButton,
          {
            backgroundColor:
              cart.length >= 1 ? COMMON_COLOR.primary : COMMON_COLOR.secondary,
          },
        ]}
      >
        <Text style={styles.proceedToBuyButtonText}>
          Proceed to Buy ({cart.length}) products
        </Text>
      </TouchableOpacity>

      <Text style={styles.bottomHorizontalLine} />

      {cart.length > 0 ? (
        <FlatList data={cart} renderItem={renderCartItems} />
      ) : (
        <>
          <Image
            style={styles.emptyCartImage}
            source={require("../assets/empty-cart.jpg")}
          />

          <Text style={styles.emptyCartText}>
            Your Cart is Currently Empty 🙄
          </Text>
          <Text style={styles.emptyCartTextDescription}>
            Before proceed to checkout you must add some products to your
            shopping cart.
          </Text>
        </>
      )}
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 55,
    paddingHorizontal: 5,
  },
  subTotalContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    columnGap: 2,
  },
  subTotalTitle: {
    fontSize: 20,
    fontWeight: "500",
  },

  subTotalValue: {
    fontWeight: "bold",
    fontSize: 25,
  },
  proceedToBuyButton: {
    paddingVertical: 18,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  proceedToBuyButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  bottomHorizontalLine: {
    borderBottomWidth: 2,
    borderBottomColor: "#E2E2E2",
  },
  productImage: {
    width: 140,
    height: 140,
    resizeMode: "stretch",
  },
  productContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  productDetailText: {
    rowGap: 8,
    textAlign: "justify",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "400",
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productStock: {
    color: "green",
    fontWeight: "500",
    fontSize: 14,
  },
  bottomProductDetailContainer: {
    marginTop: 15,
    flexDirection: "column",
    rowGap: 15,
    paddingLeft: 10,
  },
  productIncrementDecrementContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },
  productIncrementDecrement: {
    columnGap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  productIncrementDecrementTextInput: {
    fontWeight: "bold",
    fontSize: 15,
  },
  productDeleteButtonContainer: {
    backgroundColor: COMMON_COLOR.secondary,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  productDeleteButtonText: {
    color: "white",
    fontWeight: "500",
  },
  bottomButtonContainer: {
    flexDirection: "row",
    columnGap: 15,
    alignItems: "center",
  },
  bottomButton: {
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  bottomButtonTextOne: {
    fontWeight: "500",
  },
  bottomButtonTextTwo: {
    fontWeight: "500",
  },

  emptyCartImage: {
    width: 320,
    height: 320,
    resizeMode: "cover",
    alignSelf: "center",
  },
  emptyCartText: {
    textAlign: "center",
    marginTop: 50,
    fontWeight: "bold",
    fontSize: 25,
  },
  emptyCartTextDescription: {
    textAlign: "center",
    marginTop: 15,
    width: 350,
    margin: "auto",
    color: "#C0BDBA",
    fontWeight: "bold",
    fontSize: 15,
  },
});
