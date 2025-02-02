import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COMMON_COLOR } from "../constants/commonColor";
import { userType } from "../context/user/UserContext";

const AddAddressScreen = () => {
  const { userId, setUserId } = useContext(userType);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      setUserId(userId);
    };
    fetchUser();
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      country: "",
      name: "",
      mobileNo: "",
      houseNo: "",
      street: "",
      landMark: "",
      city: "",
      postalCode: "",
    },
  });

  const handleAddAddress = async (data) => {
    console.log("handleAddAddress triggered with data:", data);
    try {
      const response = await axios.post(
        "http://192.168.8.102:3000/api/v1/address/addAddress",
        {
          userId,
          address: {
            country: data.country,
            name: data.name,
            mobileNo: data.mobileNo,
            houseNo: data.houseNo,
            street: data.street,
            landMark: data.landMark,
            city: data.city,
            postalCode: data.postalCode,
          },
        }
      );
      console.log("Response:", response.data);
      Alert.alert("Success", "Address added successfully");
      reset();
      setTimeout(() => navigation.goBack(), 500);
    } catch (error) {
      console.error("Error adding address:", error.response || error.message);
      Alert.alert("Error", "Failed to add address");
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      <View style={styles.addAddressTitleContainer}>
        <Text style={styles.addAddressTitleText}>Add a new Address</Text>

        <Controller
          control={control}
          name="country"
          rules={{
            required: "Country is required",
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              textContentType="countryName"
              value={value}
              onChangeText={onChange}
              placeholder="Sri Lanka"
              placeholderTextColor={"black"}
              style={styles.input}
            />
          )}
        />
        <View style={styles.formContainer}>
          <Text style={styles.formTextLabel}>
            Full name [First and Last name]
          </Text>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Full name is required",
            }}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  textContentType="name"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your name"
                  placeholderTextColor={"gray"}
                  style={styles.input}
                />
                {error && (
                  <Text style={styles.inputErrorText}>{error.message}</Text>
                )}
              </>
            )}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTextLabel}>Mobile Number</Text>
          <Controller
            control={control}
            name="mobileNo"
            rules={{
              required: "Mobile No is required",
            }}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  textContentType="telephoneNumber"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your Mobile Number"
                  placeholderTextColor={"gray"}
                  style={styles.input}
                />
                {error && (
                  <Text style={styles.inputErrorText}>{error.message}</Text>
                )}
              </>
            )}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTextLabel}>House no, Building, Company</Text>
          <Controller
            control={control}
            name="houseNo"
            rules={{
              required: "House Number is required",
            }}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  placeholder="Enter House or Flat No"
                  textContentType="streetAddressLine1"
                  value={value}
                  onChangeText={onChange}
                  style={styles.input}
                />
                {error && (
                  <Text style={styles.inputErrorText}>{error.message}</Text>
                )}
              </>
            )}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTextLabel}>City</Text>
          <Controller
            control={control}
            name="city"
            rules={{
              required: "City is required",
            }}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  placeholder="Enter Your City"
                  textContentType="location"
                  value={value}
                  onChangeText={onChange}
                  style={styles.input}
                />
                {error && (
                  <Text style={styles.inputErrorText}>{error.message}</Text>
                )}
              </>
            )}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTextLabel}>
            Area, Street, Sector, Village
          </Text>
          <Controller
            control={control}
            name="street"
            rules={{
              required: "Street Number is required",
            }}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  placeholder="Enter your Street No"
                  textContentType="addressCity"
                  value={value}
                  onChangeText={onChange}
                  style={styles.input}
                />
                {error && (
                  <Text style={styles.inputErrorText}>{error.message}</Text>
                )}
              </>
            )}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTextLabel}>Landmark</Text>
          <Controller
            control={control}
            name="landMark"
            rules={{
              required: "Land Mark is required",
            }}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  textContentType="addressCity"
                  value={value}
                  placeholder="Enter you Landmark"
                  placeholderTextColor={"gray"}
                  onChangeText={onChange}
                  style={styles.input}
                />
                {error && (
                  <Text style={styles.inputErrorText}>{error.message}</Text>
                )}
              </>
            )}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTextLabel}>Pincode</Text>
          <Controller
            control={control}
            name="postalCode"
            rules={{
              required: "postal Code is required",
            }}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  textContentType="Enter your PostalCode"
                  value={value}
                  placeholder="Enter PostalCode"
                  placeholderTextColor={"gray"}
                  onChangeText={onChange}
                  style={styles.input}
                />
                {error && (
                  <Text style={styles.inputErrorText}>{error.message}</Text>
                )}
              </>
            )}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit(handleAddAddress)}
          style={[
            styles.PressableButtonContainer,
            isSubmitting && { opacity: 0.5 },
          ]}
          disabled={isSubmitting ? true : false}
        >
          {isSubmitting ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <>
              <FontAwesome name="address-card-o" size={24} color="white" />
              <Text style={styles.PressableButtonText}>Add Address</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  addAddressTitleContainer: {
    padding: 10,
  },
  addAddressTitleText: {
    fontWeight: "bold",
    fontSize: 17,
  },
  input: {
    borderColor: COMMON_COLOR.secondary,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  formContainer: {
    marginVertical: 10,
  },
  formTextLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  PressableButtonContainer: {
    borderRadius: 50,
    backgroundColor: COMMON_COLOR.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginTop: 40,
    flexDirection: "row-reverse",
    columnGap: 15,
  },
  PressableButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
  inputErrorText: {
    color: "red",
    fontWeight: "bold",
    paddingTop: 4,
  },
});
