import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COMMON_COLOR } from "../constants/commonColor";

const AddAddressScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { isLoading, isSubmitSuccessful, errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      mobileNo: "",
      houseNo: "",
      streetNo: "",
      landMark: "",
      pinCode: "",
    },
  });
  return (
    <ScrollView style={styles.container}>
      <View style={styles.addAddressTitleContainer}>
        <Text style={styles.addAddressTitleText}>Add a new Address</Text>

        <Controller
          control={control}
          name="address"
          rules={{
            required: "Address is required",
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
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
            name="fullName"
            rules={{
              required: "Full name is required",
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Enter your name"
                placeholderTextColor={"gray"}
                style={styles.input}
              />
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
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Enter your Mobile Number"
                placeholderTextColor={"gray"}
                style={styles.input}
              />
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
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTextLabel}>
            Area, Street, Sector, Village
          </Text>
          <Controller
            control={control}
            name="streetNo"
            rules={{
              required: "Street Number is required",
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
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
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                placeholder="Landmark is required"
                placeholderTextColor={"gray"}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTextLabel}>Pincode</Text>
          <Controller
            control={control}
            name="pinCode"
            rules={{
              required: "Pincode is required",
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                placeholder="Enter Pincode"
                placeholderTextColor={"gray"}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
        </View>

        <TouchableOpacity style={styles.PressableButtonContainer}>
          <FontAwesome name="address-card-o" size={24} color="white" />
          <Text style={styles.PressableButtonText}>Add Address</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 20,
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
});
