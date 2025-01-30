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
import axios from "axios";
import { userType } from "../context/user/UserContext";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { COMMON_COLOR } from "../constants/commonColor";
import { useSelector } from "react-redux";

const ConfirmationScreen = () => {
  const steps = [
    {
      title: "Address",
      Content: "Address Form",
    },
    {
      title: "Delivery",
      Content: "Delivery Options",
    },
    {
      title: "Payment",
      Content: "Payment Details",
    },
    {
      title: "Place Order",
      Content: "Order Summary",
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { userId } = useContext(userType);
  const cart = useSelector((state) => state.cart.cart);

  const total = cart
    ?.map((item) => item.price * item?.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://192.168.8.101:3000/api/v1/address/getAllAddresses/${userId}`
      );
      if (response.status === 200) {
        console.log(response.data.addresses);
        setAddresses(response.data.addresses);
      }
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  console.log(selectedAddress);

  const renderAddresses = ({ item }) => {
    return (
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          columnGap: 30,
        }}
      >
        {selectedAddress && selectedAddress._id === item?._id ? (
          <AntDesign
            name="checkcircleo"
            size={24}
            color={COMMON_COLOR.primary}
          />
        ) : (
          <Entypo
            onPress={() => setSelectedAddress(item)}
            name="circle"
            size={24}
            color={COMMON_COLOR.primary}
          />
        )}
        <TouchableOpacity
          onPress={() => setSelectedAddress(item)}
          style={styles.addressContainer}
        >
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

          {selectedAddress && selectedAddress._id === item?._id && (
            <Pressable
              onPress={() => setCurrentStep(1)}
              style={styles.selectedAddressButton}
            >
              <View style={styles.selectedAddressButtonContainer}>
                <Text style={styles.selectedAddressText}>
                  Deliver to this Address
                </Text>
                <FontAwesome name="hand-o-right" size={24} color="white" />
              </View>
            </Pressable>
          )}
        </TouchableOpacity>
      </Pressable>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.stepContainer}>
        <View style={styles.stepContainerOne}>
          {steps.map((step, index) => (
            <View style={styles.childStepComponent} key={index}>
              {index > 0 && (
                <View
                  style={[
                    styles.step,
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View
                style={[
                  styles.stepRounded,
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text style={styles.stepRoundedText}>&#10003;</Text>
                ) : (
                  <Text style={styles.stepRoundedText}>{index + 1}</Text>
                )}
              </View>
              <Text style={styles.stepTitle}>{step?.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep === 0 && (
        <View style={styles.deliveryAddressContainer}>
          <Text style={styles.deliveryAddressText}>
            Select a Delivery Address
          </Text>

          <FlatList data={addresses} renderItem={renderAddresses} />
        </View>
      )}

      {currentStep === 1 && (
        <View style={styles.deliveryAddressContainer}>
          <Text style={styles.deliveryAddressText}>
            Choose Your Delivery Options
          </Text>

          <View style={styles.deliveryOptionContainer}>
            <Pressable
              onPress={() => setSelectedDeliveryOption(!selectedDeliveryOption)}
              style={[
                styles.deliveryOption,
                {
                  backgroundColor: selectedDeliveryOption
                    ? "#C0BDBA"
                    : "#E2E2E2",
                },
              ]}
            >
              {selectedDeliveryOption ? (
                <AntDesign
                  onPress={() =>
                    setSelectedDeliveryOption(!selectedDeliveryOption)
                  }
                  name="checkcircleo"
                  size={24}
                  color={"black"}
                />
              ) : (
                <Entypo
                  onPress={() =>
                    setSelectedDeliveryOption(!selectedDeliveryOption)
                  }
                  name="circle"
                  size={24}
                  color={"black"}
                />
              )}

              <Text style={styles.selectedDeliveryOptionText}>
                Tomorrow by 10pm {" - "} FREE delivery with your Prime
                membership
              </Text>
            </Pressable>

            <TouchableOpacity
              onPress={() => setCurrentStep(2)}
              style={styles.continueButtonContainer}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {currentStep === 2 && (
        <View style={styles.deliveryAddressContainer}>
          <Text style={styles.deliveryAddressText}>
            Select your Payment Method
          </Text>

          <Pressable
            onPress={() => setSelectedPaymentMethod("cash")}
            style={[
              styles.paymentOption,
              {
                backgroundColor:
                  selectedPaymentMethod === "cash" ? "#C0BDBA" : "#E2E2E2",
              },
            ]}
          >
            {selectedPaymentMethod === "cash" ? (
              <AntDesign
                onPress={() => setSelectedPaymentMethod("cash")}
                name="checkcircleo"
                size={24}
                color={"black"}
              />
            ) : (
              <Entypo
                onPress={() => setSelectedPaymentMethod("cash")}
                name="circle"
                size={24}
                color={"black"}
              />
            )}

            <Text style={styles.selectedDeliveryOptionText}>
              Cash on Delivery
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSelectedPaymentMethod("card")}
            style={[
              styles.paymentOption,
              {
                backgroundColor:
                  selectedPaymentMethod === "card" ? "#C0BDBA" : "#E2E2E2",
              },
            ]}
          >
            {selectedPaymentMethod === "card" ? (
              <AntDesign
                onPress={() => setSelectedPaymentMethod("card")}
                name="checkcircleo"
                size={24}
                color={"black"}
              />
            ) : (
              <Entypo
                onPress={() => setSelectedPaymentMethod("card")}
                name="circle"
                size={24}
                color={"black"}
              />
            )}

            <Text style={styles.selectedDeliveryOptionText}>
              Credit / Debit Card
            </Text>
          </Pressable>

          <TouchableOpacity
            onPress={() => setCurrentStep(3)}
            style={styles.paymentMethodContinueButtonContainer}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep === 3 && selectedPaymentMethod === "cash" && (
        <View style={styles.deliveryAddressContainer}>
          <View style={styles.orderHeading}>
            <Text style={styles.deliveryAddressText}>Order Now</Text>
            <Text style={styles.orderTitle}>
              Shipping to {selectedAddress.name}
            </Text>
          </View>
          <View style={styles.savingContainer}>
            <View style={styles.savingContainerText}>
              <Text style={styles.savingTextTitle}>
                Save 5% and never run out
              </Text>
              <Text style={styles.savingTextSubTitle}>
                Turn on auto deliveries
              </Text>
            </View>

            <FontAwesome name="chevron-right" size={20} color="black" />
          </View>

          <View style={styles.orderContainer}>
            <View style={styles.orderTextContainer}>
              <Text style={styles.orderItems}>Items</Text>
              <Text style={styles.orderDelivery}>Delivery</Text>
              <Text style={styles.orderTotal}>Order Total</Text>
            </View>

            <View style={styles.orderTextValueContainer}>
              <Text style={styles.orderItems}>රු {total}</Text>
              <Text style={styles.orderDelivery}>රු 0</Text>
              <Text style={styles.orderItemsTotal}>රු {total}</Text>
            </View>
          </View>

          <View style={styles.orderPayWithContainer}>
            <Text style={styles.payWith}>Pay With</Text>
            <Text style={styles.payOnDelivery}>Pay on delivery (CASH)</Text>
          </View>

          <TouchableOpacity
            onPress={() => setCurrentStep(4)}
            style={styles.placeOrderContinueButtonContainer}
          >
            <Text style={styles.continueButtonText}>Place your Order</Text>
            <Feather name="box" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  step: {
    flex: 1,
    height: 2,
    backgroundColor: "green",
  },
  stepRounded: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  stepRoundedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  stepContainerOne: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    justifyContent: "space-between",
  },
  stepTitle: {
    textAlign: "center",
    marginTop: 8,
    fontWeight: "500",
  },
  childStepComponent: {
    justifyContent: "center",
    alignItems: "center",
  },
  deliveryAddressContainer: {
    marginHorizontal: 20,
  },
  deliveryAddressText: {
    fontWeight: "bold",
    fontSize: 16,
  },

  addressContainer: {
    width: "82%",
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
  selectedAddressButton: {
    backgroundColor: COMMON_COLOR.primary,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 20,
  },
  selectedAddressText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  selectedAddressButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 15,
    width: "100%",
  },
  selectedDeliveryOptionText: {
    fontWeight: "bold",
    textAlign: "justify",
    paddingLeft: 15,
    maxWidth: 400,
  },
  deliveryOptionContainer: {
    flexDirection: "column",
    rowGap: 30,
    alignItems: "center",
    marginTop: 25,
  },
  deliveryOption: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 15,
    borderRadius: 3,
    paddingLeft: 15,
  },
  continueButtonContainer: {
    backgroundColor: COMMON_COLOR.primary,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  continueButtonText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },

  paymentOption: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 15,
    borderRadius: 3,
    paddingLeft: 15,
    marginTop: 20,
  },
  paymentMethodContinueButtonContainer: {
    backgroundColor: COMMON_COLOR.primary,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  savingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  savingContainerText: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 5,
  },
  savingTextTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  savingTextSubTitle: {
    fontWeight: "500",
    color: "#58595E",
  },
  orderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "white",
    marginTop: 20,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  orderTextContainer: {
    flexDirection: "column",
    rowGap: 10,
    alignItems: "flex-start",
  },
  orderTextValueContainer: {
    flexDirection: "column",
    rowGap: 10,
  },
  orderTitle: {
    fontWeight: "500",
  },
  orderDelivery: {
    fontWeight: "500",
    color: "#58595E",
  },
  orderItems: {
    fontWeight: "500",
    color: "#58595E",
  },
  orderTotal: {
    fontWeight: "bold",
    fontSize: 19,
  },
  orderItemsTotal: {
    fontWeight: "bold",
    fontSize: 19,
    color: "#D20109",
  },
  orderHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  orderPayWithContainer: {
    paddingHorizontal: 15,
    backgroundColor: "white",
    marginTop: 20,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    rowGap: 5,
  },
  payWith: {
    fontWeight: "bold",
    color: "#58595E",
  },

  payOnDelivery: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
  placeOrderContinueButtonContainer: {
    backgroundColor: COMMON_COLOR.primary,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    flexDirection: "row",
    columnGap: 10,
  },
});
