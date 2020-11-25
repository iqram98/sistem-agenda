import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import Color from "../constants/Color";
import ButtonVote from "../components/ButtonVote";

const DescContainer = (props) => {
  const [checkMinOne, setCheckMinOne] = useState(false);
  let status;
  let color;
  switch (props.status) {
    case "usulan":
      status = "Vote";
      color = Color.buttonPrimary;
      break;
    case "terjadwal":
      status = "Hadiri";
      color = Color.buttonSecondary;
      break;
  }
  const dateCheck = () => {
    const d = new Date();
    let dateMinOne = `${d.getFullYear()}-${d.getMonth()}-${d.getDate() - 1}`;
    let dateAgenda = props.date.slice(8, 10) - 1;
    dateAgenda = dateAgenda.toString();
    if (dateAgenda === "0") {
      dateAgenda = "31";
    } else if (dateAgenda.length === 1) {
      dateAgenda = `0${dateAgenda}`;
    }
    dateAgenda = `${props.date.slice(0, 7)}-${dateAgenda}`;
    if (dateAgenda == dateMinOne) {
      setCheckMinOne(true);
    }
  };

  dateCheck();

  return (
    <View {...props} style={{ ...styles.descContainer, ...props.style }}>
      <Text style={styles.descTitle} numberOfLines={1}>
        {props.title}
      </Text>
      <Text style={styles.descTime}>{props.time.slice(0, 5)}</Text>
      <View style={styles.buttonContainer}>
        <Text style={styles.descStatus}>{props.status}</Text>
        {checkMinOne ? <Text style={styles.oneDay}>H-1</Text> : <View></View>}
      </View>
      <ButtonVote
        idAgenda={props.idAgenda}
        title={status}
        style={{ backgroundColor: color }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  descContainer: {
    height: "95%",
    marginLeft: 10,
    flex: 1,
    justifyContent: "space-around",
  },
  descTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descTime: {
    fontSize: 16,
  },
  descStatus: {
    backgroundColor: "white",
    width: "35%",
    textAlign: "center",
    color: Color.buttonSecondary,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  oneDay: {
    backgroundColor: "white",
    width: "35%",
    textAlign: "center",
    color: Color.buttonSecondary,
    borderRadius: 10,
    marginLeft: 5,
  },
});

export default DescContainer;
