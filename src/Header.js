import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontStyle } from "./FontStyle";

const Header = () => {
  return (
    <View style={styles.headerBG}>
      <Text style={FontStyle.headerTitle}>Upstox Holding</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerBG: {
    backgroundColor: "#930078",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
