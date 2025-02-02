import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const OrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Main");
    }, 3000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        style={styles.lottiViewCelebration}
        source={require("../assets/Animation - 1738384964301.json")}
        autoPlay
        loop={false}
        speed={0.7}
        resizeMode="cover"
      />
      <LottieView
        style={styles.lottiView}
        source={require("../assets/Animation - 1738384272116.json")}
        autoPlay
        speed={0.7}
        loop={false}
      />
      <Text style={styles.subText}>Your Order Has been Received</Text>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottiView: {
    width: 400,
    height: 400,
    marginHorizontal: "auto",
  },
  lottiViewCelebration: {
    zIndex: 99,
    position: "absolute",
    width: width,
    height: height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  subText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
