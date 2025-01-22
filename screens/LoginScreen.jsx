import React, { useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useForm } from "react-hook-form";
import DisableKeyBoardHOC from "../components/DisableKeyBoardHOC";
import CustomButton from "../components/customButton/index";
import CustomInput from "../components/customInput/index";
import { useNavigation } from "@react-navigation/native";

import EMAIL_REGEX from "../util/email-validation/index";

const LoginScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignInPressed = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <DisableKeyBoardHOC>
      <SafeAreaView style={styles.Container}>
        <View style={styles.ImageContainer}>
          <Image
            source={require("../assets/Ever_Style.png")}
            style={styles.Image}
          />
        </View>

        <Text style={styles.Heading}>Login To Your Account</Text>

        <KeyboardAvoidingView>
          <View style={styles.InputGroup}>
            <View>
              <View style={styles.TextInput}>
                <Fontisto name="email" size={24} color="black" />

                <CustomInput
                  name="email"
                  placeholder="Enter your Email"
                  control={control}
                  rules={{
                    required: "Email is Required",
                    pattern: {
                      value: EMAIL_REGEX,
                      message: "Invalid Email Address",
                    },
                  }}
                />
              </View>
              {errors.email && (
                <Text style={styles.errorText}>{errors.email?.message}</Text>
              )}
            </View>

            <View>
              <View style={styles.TextInput}>
                <AntDesign name="lock" size={24} color="black" />
                <CustomInput
                  name="password"
                  placeholder="Enter your Password"
                  secureTextEntry
                  control={control}
                  rules={{
                    required: "Password is Required",
                    minLength: {
                      value: 8,
                      message: "Password must be atleast 8 characters long",
                    },
                  }}
                />
              </View>

              {errors.password && (
                <Text style={styles.errorText}>{errors.password?.message}</Text>
              )}
            </View>
          </View>
          <View style={styles.subTextContainer}>
            <Text>Keep me logged in</Text>
            <Text style={styles.forgotPasswordText}>Forgot Password</Text>
          </View>

          <CustomButton
            onPress={handleSubmit(onSignInPressed)}
            name="Sign in"
            disabled={isSubmitting ? true : false}
            isSubmitting={isSubmitting}
          />

          <View style={styles.signUpButtonContainer}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </DisableKeyBoardHOC>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  ImageContainer: {
    width: 235,
    height: 150,
    marginTop: 100,
  },

  Heading: {
    fontWeight: "bold",
    marginTop: 60,
    fontSize: 20,
  },
  Image: {
    width: "100%",
    height: "100%",
  },
  InputGroup: {
    alignItems: "center",
    gap: 50,
    marginTop: 120,
  },
  TextInput: {
    width: 400,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efeaea",
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  subTextContainer: {
    width: 380,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  forgotPasswordText: {
    color: "#007FFF",
    fontWeight: 500,
  },
  signUpButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    fontWeight: "500",
    borderBottomWidth: 1,
  },
  errorText: {
    color: "red",
    fontWeight: "500",
    marginTop: 2,
  },
});
