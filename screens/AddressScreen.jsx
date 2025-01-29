import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import axios from "axios";
import { userType } from "../context/user/UserContext";
import { COMMON_COLOR } from "../constants/commonColor";

const AddressScreen = () => {
  const navigation = useNavigation();
  const { userId } = useContext(userType);

  console.log("USER ID: ", userId);

  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://192.168.8.102:3000/api/v1/address/getAllAddresses/${userId}`
      );
      if (response.status === 200) {
        console.log(response.data.addresses);
        setAddresses(response.data.addresses);
      }
      setError(response.data.message);
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  console.log(addresses);

  const renderAddresses = ({ item }) => {
    return (
      <TouchableOpacity style={styles.addressContainer}>
        <View style={styles.AddressNameTextContainer}>
          <Text style={styles.AddressNameText}>
            {item?.name}
            <Entypo name="location-pin" size={20} color="#B12001" />
          </Text>
        </View>
        <Text>
          {item?.houseNo} {item?.landMark}
        </Text>
        <Text>{item?.street}</Text>
        <Text>{item?.country}</Text>
        <Text>{item?.city}</Text>
        <Text>Mobile No: {item?.mobileNo}</Text>
        <Text>Postal Code: {item?.postalCode}</Text>
        <View style={styles.buttonActionsContainer}>
          <Pressable style={styles.buttonActionsTextContainer}>
            <Text style={styles.buttonActionsText}>EDIT</Text>
          </Pressable>
          <Pressable style={styles.buttonActionsTextContainer}>
            <Text style={styles.buttonActionsText}>DELETE</Text>
          </Pressable>
          <Pressable style={styles.buttonActionsTextContainer}>
            <Text style={styles.buttonActionsText}>Set as Default</Text>
          </Pressable>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <Text style={styles.inputLabelText}>Your Addresses</Text>
        <Pressable
          onPress={() => navigation.navigate("add-address")}
          style={styles.addAddressContainer}
        >
          <Text style={styles.addNewAddressText}>Add a new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <FlatList data={addresses} renderItem={renderAddresses} />
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
  addNewAddressText: {
    fontWeight: "500",
    fontSize: 14,
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
    marginBottom: 20,
  },
  addressContainer: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginVertical: 15,
  },
  AddressNameText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  AddressNameTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
  },
  buttonActionsContainer: {
    flexDirection: "row",
    columnGap: 15,
    marginTop: 15,
  },
  buttonActionsTextContainer: {
    backgroundColor: COMMON_COLOR.secondary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonActionsText: {
    color: "white",
    fontWeight: "500",
  },
});
