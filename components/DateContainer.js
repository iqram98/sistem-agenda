import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const DateContainer = (props) => {
  return (
    <View {...props} style={{ ...styles.dateContainer, ...props.style }}>
      <Text style={styles.dateDay}>{props.day}</Text>
      <Text style={styles.dateMonth}>{props.month}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  dateContainer: {
    backgroundColor: "white",
    width: "26%",
    height: "95%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  dateDay: {
    fontSize: Dimensions.get("window").width < 390 ? 20 : 35,
    fontWeight: "bold",
    color: "#3F3F3F",
  },
  dateMonth: {
    fontSize: 12,
    color: "#3F3F3F",
  },
});

export default DateContainer;
