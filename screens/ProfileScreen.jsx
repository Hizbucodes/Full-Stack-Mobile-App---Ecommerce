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
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COMMON_COLOR } from "../constants/commonColor";
import axios from "axios";
import { userType } from "../context/user/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { userId } = useContext(userType);
  const [userProfile, setUserProfile] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userProfileActionButtons = [
    {
      id: "1",
      buttonTitle: "Your Orders",
      onPressEvent: () => void {},
    },
    {
      id: "2",
      buttonTitle: "Your Account",
      onPressEvent: () => void {},
    },
    {
      id: "3",
      buttonTitle: "Buy Again",
      onPressEvent: () => void {},
    },
    {
      id: "4",
      buttonTitle: "Logout",
      onPressEvent: () => void {},
    },
  ];

  console.log(userId);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "white",
        height: 120,
      },
      headerLeft: () => (
        <Image
          source={require("../assets/Ever_Style.png")}
          style={styles.Image}
        />
      ),
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={COMMON_COLOR.primary}
          />
          <Ionicons
            name="search-outline"
            size={24}
            color={COMMON_COLOR.primary}
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://192.168.8.102:3000/api/v1/userProfile/profile/${userId}`
        );
        if (response.status === 200) {
          setUserProfile(response.data.user);
          console.log(
            "User Profile Fetched Successfully: ",
            response.data.user
          );
        } else {
          console.error("Error While fetching user profile: ", response.data);
        }
      } catch (err) {
        if (err.response) {
          console.error("API Error: ", err.response.data.message);
        } else if (err.request) {
          console.error("Network Error", err.response.data.message);
        } else {
          console.error("Error Occured: ", err.message);
        }
      }
    };

    fetchProfile();
  }, []);
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("Auth Token cleared");
    navigation.replace("login");
  };
  const logout = () => {
    clearAuthToken();
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://192.168.8.102:3000/api/v1/userProfile/orders/${userId}`
        );
        if (response.status === 200) {
          console.log("Orders fetched successfully", response.data.orders);
          setOrders(response.data.orders);
        } else {
          console.error("Error while fetching orders", response.data);
        }
      } catch (err) {
        if (err.response) {
          console.error("API Error: ", err.response.data.message);
        } else if (err.request) {
          console.error("Network Error", err.response.data.message);
        } else {
          console.error("Error Occured: ", err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchOrders();
    }, 200);
  }, []);

  const renderUserProfileButtonActions = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={logout}
        style={styles.userProfileActionButtons}
      >
        <Text style={styles.buttonTitle}>{item?.buttonTitle}</Text>
      </TouchableOpacity>
    );
  };

  const renderOrderItems = ({ item }) => {
    return (
      <TouchableOpacity style={styles.orderImages}>
        {item?.products?.slice(0, 1).map((product) => (
          <Image style={styles.orderImage} source={{ uri: product?.image }} />
        ))}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.bodyContainer}>
        <Text style={styles.welcomeText}>
          Welcome <Text style={styles.username}> {userProfile?.username}</Text>
        </Text>

        <View style={styles.userProfileActionButtonsContainer}>
          <FlatList
            data={userProfileActionButtons}
            keyExtractor={(item) => item?.id}
            renderItem={renderUserProfileButtonActions}
            numColumns={2}
          />
        </View>

        {loading ? (
          <LottieView
            source={require("../assets/Animation - 1738490910773.json")}
            loop={true}
            autoPlay
            speed={2}
            style={styles.loadingState}
          />
        ) : (
          <FlatList
            style={styles.orderContainer}
            data={orders}
            renderItem={renderOrderItems}
            keyExtractor={(item) => item?.id}
            numColumns={2}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Image: {
    width: 120,
    height: 70,
    resizeMode: "cover",
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 15,
  },
  username: {
    fontWeight: "bold",
    fontSize: 17,
  },
  userProfileActionButtonsContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
  },
  userProfileActionButtons: {
    backgroundColor: COMMON_COLOR.secondary,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: "auto",
    marginVertical: 10,
    width: 200,
    alignItems: "center",
  },
  bodyContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  buttonTitle: {
    textAlign: "center",
    fontWeight: "500",
    color: "white",
  },
  orderImages: {
    margin: "auto",
  },
  orderImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    margin: 10,
  },
  loadingState: {
    width: 300,
    height: 300,
    margin: "auto",
    resizeMode: "cover",
  },
  orderContainer: {
    marginTop: 50,
  },
});
