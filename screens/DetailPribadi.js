import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Linking,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HTMLView from "react-native-htmlview";
import { AntDesign, Entypo } from "@expo/vector-icons";

import { DataContext } from "../components/DataContext";
import Color from "../constants/Color";
import Axios from "axios";
import qs from "qs";
import HadirButton from "../components/HadirButton";

const DetailPribadi = (props) => {
  const { idAgenda } = props.route.params;
  const [
    datas,
    setDatas,
    dataUser,
    setDataUser,
    notif,
    setNotif,
    invite,
    setInvite,
    vote,
    setVote,
    terlaksana,
    setTerlaksana,
    token,
    setToken,
    pribadi,
    setPribadi,
  ] = useContext(DataContext);
  const [detailData, setDetailData] = useState(null);
  const [jumlahHadirYes, setJumlahHadirYes] = useState(null);
  const [jumlahHadirNo, setJumlahHadirNo] = useState(null);
  const [jumlahBelumPilih, setJumlahBelumPilih] = useState(null);

  useEffect(() => {
    if (datas && detailData === null) {
      let newData = datas.find((data) => data.id_agenda === idAgenda);
      setDetailData(newData);
    }
    if (detailData) {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      };
      Axios.put(
        `https://api.dirumahki.online/index.php/agendapribadi/${detailData.id_agenda}/${dataUser[0].id}`,
        headers
      ).then();
    }
  });
  return (
    <ScrollView style={styles.screen}>
      {detailData !== null ? (
        <View>
          <ImageBackground
            style={styles.background}
            source={{
              uri: `https://dirumahki.online/assets/uploads/img_rapat/${detailData.img_agenda}`,
            }}
          >
            <TouchableOpacity
              style={styles.back}
              onPress={() => props.navigation.navigate("Main")}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                color="black"
                size={30}
              />
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{detailData.nama_agenda}</Text>
            <Text style={styles.dateTime}>{detailData.waktu_agenda}</Text>
            <Text style={styles.status}>{detailData.status_agenda}</Text>
          </View>
          <View style={styles.descContainer}>
            <HTMLView
              value={detailData.deskripsi_agenda}
              addLineBreaks={false}
              stylesheet={richTextStyles}
            />
          </View>
        </View>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>Loading...</Text>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    marginTop: 36,
    flex: 1,
    backgroundColor: "white",
  },
  background: {
    width: "100%",
    height: 300,
  },
  back: {
    marginHorizontal: 20,
  },
  titleContainer: {
    width: "80%",
    backgroundColor: Color.backgroundSecondary,
    marginTop: -45,
    padding: 25,
    borderRadius: 10,
    alignSelf: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateTime: {
    color: "#777",
  },
  status: {
    color: "#777",
    fontStyle: "italic",
  },
  descContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  jumlahContainer: {
    backgroundColor: Color.backgroundSecondary,
    height: 50,
    borderRadius: 10,
    width: "70%",
    alignSelf: "center",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    marginBottom: 50,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "15%",
  },
  buttonHasil: {
    width: "60%",
    alignSelf: "center",
    backgroundColor: Color.buttonSecondary,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonDraft: {
    width: "60%",
    alignSelf: "center",
    backgroundColor: Color.buttonTertiary,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
  },
  tidakDraft: {
    alignSelf: "center",
    color: "red",
    marginVertical: 10,
  },
});

const richTextStyles = StyleSheet.create({
  p: {
    marginTop: -20,
    marginBottom: -20,
  },
});

export default DetailPribadi;
