import { StyleSheet } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { Provider } from "react-redux";
import { store } from "./app/store/store";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
