import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Color from "../constants/Color";
import Axios from "axios";
import qs from "qs";
import { DataContext } from "./DataContext";
import { AppLoading } from "expo";

const HadirButton = (props) => {
  const [datas, setDatas, dataUser, setDataUser] = useContext(DataContext);
  const [invite, setInvite] = useState(null);

  useEffect(() => {
    if (!invite) {
      Axios.get(
        `https://api.dirumahki.online/index.php/invite?user_invite=${dataUser[0].id}&agenda_invite=${props.agenda}`
      ).then((res) => setInvite(res.data[0]));
    }
  });

  const handleButton = (invite) => {
    const data = qs.stringify({
      user_invite: dataUser[0].id,
      agenda_invite: props.agenda,
      presence_invite: invite,
    });
    const dataHistory = qs.stringify({
      user_history: dataUser[0].id,
      agenda_history: props.agenda,
      nama_history: invite == 1 ? "Akan Hadir" : "Berhalangan Hadir",
    });
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };
    Axios.put(
      "https://api.dirumahki.online/index.php/invite",
      data,
      headers
    ).then((res) => setInvite(res.data));
    Axios.post(
      "https://api.dirumahki.online/index.php/history",
      dataHistory,
      headers
    ).then((res) => console.log(res.data));
    props.resetHadir();
  };

  const handleReset = () => {
    const data = qs.stringify({
      user_invite: dataUser[0].id,
      agenda_invite: props.agenda,
      presence_invite: "",
    });
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };
    Axios.put(
      "https://api.dirumahki.online/index.php/invite",
      data,
      headers
    ).then((res) => setInvite(res.data));
    props.resetHadir();
  };

  return (
    <View style={styles.main}>
      {invite ? (
        invite.presence_invite === "" ? (
          <View style={styles.main}>
            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={handleButton.bind(this, 1)}
            >
              <Text style={{ color: "white" }}>Hadiri</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={handleButton.bind(this, 0)}
            >
              <Text style={{ color: "white" }}>Berhalangan</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View style={styles.afterVote}>
              <Text>
                Anda {invite.presence_invite === "1" ? "Akan" : "Berhalangan"}{" "}
                Menghadiri Rapat
              </Text>
            </View>
            <TouchableOpacity style={styles.again} onPress={handleReset}>
              <Text style={{ color: "white" }}>Pilih Ulang</Text>
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

export default HadirButton;
