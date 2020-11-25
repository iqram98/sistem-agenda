import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Color from "../constants/Color";

const ButtonVote = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      {...props}
      style={{ ...styles.buttonVote, ...props.style }}
      onPress={() =>
        navigation.push("Detail", {
          idAgenda: props.idAgenda,
        })
      }
    >
      <Text style={styles.textVote}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonVote: {
    alignSelf: "flex-end",
    backgroundColor: Color.buttonPrimary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
  },
  textVote: {
    color: "white",
  },
});

export default ButtonVote;
