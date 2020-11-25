import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Color from "../constants/Color";

const Card = (props) => {
  let color;
  switch (props.color) {
    case "primary":
      color = Color.cardPrimary;
      break;
    case "secondary":
      color = Color.cardSecondary;
      break;
    case "tertiary":
      color = Color.cardTertiary;
      break;
  }
  return (
    <View
      {...props}
      style={{ ...styles.card, ...props.style, backgroundColor: color }}
    >
      {props.children}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginVertical: 10,
    flexDirection: "row",
  },
});

export default Card;
