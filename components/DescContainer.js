import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import Color from "../constants/Color";
import ButtonVote from "../components/ButtonVote";

const DescContainer = (props) => {
  const [checkMinOne, setCheckMinOne] = useState(false);
  let status;
  let color;
  let span;
  switch (props.status) {
    case "vote":
      status = "Detail Vote";
      color = Color.buttonPrimary;
      span = "vote";
      break;
    case "undangan":
      status = "Detail Undangan";
      color = Color.buttonSecondary;
      span = "undangan";
      break;
    case "terlaksana":
      status = "Lihat Hasil";
      color = Color.buttonTertiary;
      span = "terlaksana";
      break;
    case "agenda_pribadi":
      status = "Detail";
      color = Color.backgroundPrimary;
      span = "pribadi";
      break;
    default:
      status = "Detail";
      color = Color.backgroundPrimary;
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
        {props.status ? (
          <Text
            style={
              props.status == "terlaksana"
                ? styles.descStatusHijau
                : styles.descStatus
            }
          >
            {span}
          </Text>
        ) : (
          <View></View>
        )}
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
    width: Dimensions.get("window").width < 390 ? "50%" : "35%",
    textAlign: "center",
    color: Color.buttonSecondary,
    borderRadius: 10,
  },
  descStatusHijau: {
    backgroundColor: Color.buttonPrimary,
    width: "35%",
    textAlign: "center",
    color: "white",
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
