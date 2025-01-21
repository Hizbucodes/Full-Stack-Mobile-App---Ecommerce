import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";

const DisableKeyBoardHOC = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DisableKeyBoardHOC;
