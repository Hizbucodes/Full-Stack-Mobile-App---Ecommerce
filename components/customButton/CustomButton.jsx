import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BUTTON_BACKGROUND_COLOR from "../../constants/button/index";

const CustomButton = ({ name, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{name}</Text>
      </Pressable>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: 250,
    marginTop: 100,
    marginHorizontal: "auto",
  },
  button: {
    backgroundColor: BUTTON_BACKGROUND_COLOR.primary,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
  },
});
