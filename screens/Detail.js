import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HTMLView from "react-native-htmlview";
import { AntDesign, Entypo } from "@expo/vector-icons";

import { DataContext } from "../components/DataContext";
import Color from "../constants/Color";
import VoteButton from "../components/VoteButton";
import Axios from "axios";
import qs from "qs";
import HadirButton from "../components/HadirButton";

const Detail = (props) => {
  const { idAgenda } = props.route.params;
  const [datas, setDatas, dataUser, setDataUser] = useContext(DataContext);
  const [detailData, setDetailData] = useState(null);
  const [jumlahVoteYes, setJumlahVoteYes] = useState(null);
  const [jumlahVoteNo, setJumlahVoteNo] = useState(null);
  const [jumlahBelumVote, setJumlahBelumVote] = useState(null);
  const [jumlahHadirYes, setJumlahHadirYes] = useState(null);
  const [jumlahHadirNo, setJumlahHadirNo] = useState(null);
  const [jumlahBelumPilih, setJumlahBelumPilih] = useState(null);

  useEffect(() => {
    if (detailData === null) {
      let newData = datas.find((data) => data.id_agenda === idAgenda);
      setDetailData(newData);
    }
  });

  useEffect(() => {
    if (!jumlahVoteYes && detailData && detailData.status_agenda === "usulan") {
      Axios.get(
        `https://api.dirumahki.online/index.php/vote/jumlah/${idAgenda}/1`
      ).then((res) => setJumlahVoteYes(res.data.toString()));
    }
  });

  useEffect(() => {
    if (!jumlahVoteNo && detailData && detailData.status_agenda === "usulan") {
      Axios.get(
        `https://api.dirumahki.online/index.php/vote/jumlah/${idAgenda}/0`
      ).then((res) => setJumlahVoteNo(res.data.toString()));
    }
  });

  useEffect(() => {
    if (
      !jumlahBelumVote &&
      detailData &&
      detailData.status_agenda === "usulan"
    ) {
      Axios.get(
        `https://api.dirumahki.online/index.php/vote/jumlah/${idAgenda}`
      ).then((res) => setJumlahBelumVote(res.data.toString()));
    }
  });

  useEffect(() => {
    if (
      !jumlahHadirYes &&
      detailData &&
      detailData.status_agenda === "terjadwal"
    ) {
      Axios.get(
        `https://api.dirumahki.online/index.php/invite/jumlah/${idAgenda}/1`
      ).then((res) => setJumlahHadirYes(res.data.toString()));
    }
  });
  useEffect(() => {
    if (
      !jumlahHadirNo &&
      detailData &&
      detailData.status_agenda === "terjadwal"
    ) {
      Axios.get(
        `https://api.dirumahki.online/index.php/invite/jumlah/${idAgenda}/0`
      ).then((res) => setJumlahHadirNo(res.data.toString()));
    }
  });

  useEffect(() => {
    if (
      !jumlahBelumPilih &&
      detailData &&
      detailData.status_agenda === "terjadwal"
    ) {
      Axios.get(
        `https://api.dirumahki.online/index.php/invite/jumlah/${idAgenda}`
      ).then((res) => setJumlahBelumPilih(res.data.toString()));
    }
  });

  if (detailData && detailData.status_agenda === "terjadwal") {
    const data = qs.stringify({
      user_invite: dataUser[0].id,
      agenda_invite: detailData.id_agenda,
      notif: "1",
    });
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };
    Axios.put(
      "https://api.dirumahki.online/index.php/invite",
      data,
      headers
    ).then();
  }
  if (detailData && detailData.status_agenda === "usulan") {
    const data = qs.stringify({
      user_vote: dataUser[0].id,
      agenda_vote: detailData.id_agenda,
      notif: "1",
    });
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };
    Axios.put(
      "https://api.dirumahki.online/index.php/vote",
      data,
      headers
    ).then();
  }
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
            <Text style={styles.dateTime}>
              <Text>{detailData.tanggal_agenda}</Text> |{" "}
              <Text>{detailData.waktu_agenda}</Text>
            </Text>
            <Text style={styles.status}>{detailData.status_agenda}</Text>
          </View>
          <View style={styles.descContainer}>
            <HTMLView
              value={detailData.deskripsi_agenda}
              addLineBreaks={false}
              stylesheet={richTextStyles}
            />
          </View>
          {detailData.status_agenda === "usulan" ? (
            <View>
              <VoteButton agenda={detailData.id_agenda} />
              {jumlahBelumVote && jumlahVoteYes && jumlahVoteNo ? (
                <View style={styles.jumlahContainer}>
                  <View style={styles.iconContainer}>
                    <AntDesign name="checkcircle" size={24} color="green" />
                    <Text>{jumlahVoteYes}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <Entypo name="circle-with-cross" size={24} color="red" />

                    <Text>{jumlahVoteNo}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <AntDesign name="questioncircle" size={24} color="blue" />
                    <Text>{jumlahBelumVote}</Text>
                  </View>
                </View>
              ) : (
                <View></View>
              )}
            </View>
          ) : (
            <View>
              <HadirButton agenda={detailData.id_agenda} />
              {jumlahBelumPilih && jumlahHadirYes && jumlahHadirNo ? (
                <View style={styles.jumlahContainer}>
                  <View style={styles.iconContainer}>
                    <AntDesign name="checkcircle" size={24} color="green" />
                    <Text>{jumlahHadirYes}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <Entypo name="circle-with-cross" size={24} color="red" />
                    <Text>{jumlahHadirNo}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <AntDesign name="questioncircle" size={24} color="blue" />
                    <Text>{jumlahBelumPilih}</Text>
                  </View>
                </View>
              ) : (
                <View></View>
              )}
            </View>
          )}
        </View>
      ) : (
        <ActivityIndicator />
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
});

const richTextStyles = StyleSheet.create({
  p: {
    marginTop: -20,
    marginBottom: -20,
  },
});

export default Detail;
