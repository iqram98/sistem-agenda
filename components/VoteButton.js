import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Color from "../constants/Color";
import Axios from "axios";
import qs from "qs";
import { DataContext } from "./DataContext";
import { AppLoading } from "expo";

const VoteButton = (props) => {
  const [datas, setDatas, dataUser, setDataUser] = useContext(DataContext);
  const [vote, setVote] = useState(null);

  useEffect(() => {
    if (!vote) {
      Axios.get(
        `https://api.simleg-dprdsulteng.com/index.php/vote?user_vote=${dataUser[0].id}&agenda_vote=${props.agenda}`
      ).then((res) => setVote(res.data[0]));
    }
  });

  const handleButton = (vote) => {
    const data = qs.stringify({
      user_vote: dataUser[0].id,
      agenda_vote: props.agenda,
      is_vote: vote,
    });
    const dataHistory = qs.stringify({
      user_history: dataUser[0].id,
      agenda_history: props.agenda,
      nama_history: vote == 1 ? "Vote Ya" : "Vote No",
    });
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };
    Axios.put(
      "https://api.simleg-dprdsulteng.com/index.php/vote",
      data,
      headers
    ).then((res) => setVote(res.data));
    Axios.post(
      "https://api.simleg-dprdsulteng.com/index.php/history",
      dataHistory,
      headers
    ).then((res) => console.log(res.data));
    props.resetVote();
  };

  const handleReset = () => {
    const data = qs.stringify({
      user_vote: dataUser[0].id,
      agenda_vote: props.agenda,
      is_vote: "",
    });
    const dataHistory = qs.stringify({
      user_history: dataUser[0].id,
      agenda_history: props.agenda,
      nama_history: vote == 1 ? "Vote Ya" : "Vote No",
    });
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };
    Axios.put(
      "https://api.simleg-dprdsulteng.com/index.php/vote",
      data,
      headers
    ).then((res) => setVote(res.data));
    Axios.post(
      "https://api.simleg-dprdsulteng.com/index.php/history",
      dataHistory,
      headers
    ).then((res) => console.log(res.data));
    props.resetVote();
  };

  return (
    <View style={styles.main}>
      {vote ? (
        vote.is_vote === "" ? (
          <View style={styles.main}>
            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={handleButton.bind(this, 1)}
            >
              <Text style={{ color: "white" }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={handleButton.bind(this, 0)}
            >
              <Text style={{ color: "white" }}>No</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View style={styles.afterVote}>
              <Text>
                Anda Telah Melakukan Vote {vote.is_vote === "1" ? "Yes" : "No"}
              </Text>
            </View>
            <TouchableOpacity style={styles.again} onPress={handleReset}>
              <Text style={{ color: "white" }}>Vote Ulang</Text>
            </TouchableOpacity>
          </View>
        )
      ) : (
        <AppLoading />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonPrimary: {
    backgroundColor: Color.buttonPrimary,
    width: "35%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonSecondary: {
    backgroundColor: Color.buttonSecondary,
    width: "35%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  afterVote: {
    paddingHorizontal: 10,
    backgroundColor: Color.buttonTertiary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  again: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.buttonSecondary,
    height: 40,
    borderRadius: 10,
    marginTop: 10,
    width: "60%",
    alignSelf: "center",
  },
});

export default VoteButton;
