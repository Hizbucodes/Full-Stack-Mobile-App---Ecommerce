import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <Text style={styles.inputLabelText}>Your Addresses</Text>
        <Pressable
          onPress={() => navigation.navigate("add-address")}
          style={styles.addAddressContainer}
        >
          <Text>Add a new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable></Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  inputLabelText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  addAddressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    paddingHorizontal: 5,
    paddingVertical: 7,
  },
});
