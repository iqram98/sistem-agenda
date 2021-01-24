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
import VoteButton from "../components/VoteButton";
import Axios from "axios";
import qs from "qs";
import HadirButton from "../components/HadirButton";

const Detail = (props) => {
  const { idAgenda } = props.route.params;
  const [datas, setDatas, dataUser, setDataUser, notif, setNotif] = useContext(
    DataContext
  );
  const [detailData, setDetailData] = useState(null);

  const [jumlahBelumVote, setJumlahBelumVote] = useState(null);
  const [jumlahBelumPilih, setJumlahBelumPilih] = useState(null);
  const [ubahNotif, setUbahNotif] = useState(null);

  useEffect(() => {
    if (detailData === null) {
      let newData = datas.find((data) => data.id_agenda === idAgenda);
      setDetailData(newData);
    }

    if (!jumlahBelumVote && detailData && detailData.status_agenda === "vote") {
      Axios.get(
        `https://api.simleg-dprdsulteng.com/index.php/vote/jumlah/${idAgenda}`
      ).then((res) => setJumlahBelumVote(res.data));
    }

    if (
      !jumlahBelumPilih &&
      detailData &&
      detailData.status_agenda === "undangan"
    ) {
      Axios.get(
        `https://api.simleg-dprdsulteng.com/index.php/invite/jumlah/${idAgenda}`
      ).then((res) => setJumlahBelumPilih(res.data));
    }

    if (!ubahNotif && detailData && detailData.status_agenda === "undangan") {
      const data = qs.stringify({
        user_invite: dataUser[0].id,
        agenda_invite: detailData.id_agenda,
        notif: "1",
      });
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      };
      Axios.put(
        "https://api.simleg-dprdsulteng.com/index.php/invite",
        data,
        headers
      ).then();
    }
    if (!ubahNotif && detailData && detailData.status_agenda === "vote") {
      const data = qs.stringify({
        user_vote: dataUser[0].id,
        agenda_vote: detailData.id_agenda,
        notif: "1",
      });
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      };
      Axios.put(
        "https://api.simleg-dprdsulteng.com/index.php/vote",
        data,
        headers
      ).then();
      //setNotif(null);
    }
  });

  return (
    <ScrollView style={styles.screen}>
      {detailData !== null ? (
        <View>
          <ImageBackground
            style={styles.background}
            source={{
              uri: `https://simleg-dprdsulteng.com/assets/uploads/img_rapat/${detailData.img_agenda}`,
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
          {detailData.status_agenda == "terlaksana" ? (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("ListUser", {
                  idAgenda,
                })
              }
            >
              <View style={styles.buttonDraft}>
                <Text>Daftar Peserta</Text>
              </View>
            </TouchableOpacity>
          ) : null}
          {detailData.draft_agenda !== "" ? (
            <TouchableOpacity
              style={styles.buttonDraft}
              onPress={() => {
                Linking.openURL(
                  `https://simleg-dprdsulteng.com/assets/uploads/draft/${detailData.draft_agenda}`
                );
              }}
            >
              <Text style={{ color: "white" }}>Unduh Lampiran Rapat</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.tidakDraft}>Belum Ada Lampiran Rapat</Text>
          )}
          {detailData.status_agenda === "vote" ? (
            <View>
              <VoteButton
                resetVote={() => setJumlahBelumVote(null)}
                agenda={detailData.id_agenda}
              />
              {jumlahBelumVote ? (
                <View style={styles.jumlahContainer}>
                  <View style={styles.iconContainer}>
                    <AntDesign name="checkcircle" size={24} color="green" />
                    <Text>{jumlahBelumVote.Ya}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <Entypo name="circle-with-cross" size={24} color="red" />

                    <Text>{jumlahBelumVote.Tidak}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <AntDesign name="questioncircle" size={24} color="blue" />
                    <Text>{jumlahBelumVote.Belum}</Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text>Loading...</Text>
                </View>
              )}
            </View>
          ) : detailData.status_agenda === "undangan" ? (
            <View>
              <HadirButton agenda={detailData.id_agenda} />
              {jumlahBelumPilih ? (
                <View style={styles.jumlahContainer}>
                  <View style={styles.iconContainer}>
                    <AntDesign name="checkcircle" size={24} color="green" />
                    <Text>{jumlahBelumPilih.Ya}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <Entypo name="circle-with-cross" size={24} color="red" />
                    <Text>{jumlahBelumPilih.Tidak}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <AntDesign name="questioncircle" size={24} color="blue" />
                    <Text>{jumlahBelumPilih.Belum}</Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text>Loading...</Text>
                </View>
              )}
            </View>
          ) : (
            <View>
              {detailData.hasil_agenda !== "" ? (
                <TouchableOpacity
                  style={styles.buttonHasil}
                  onPress={() => {
                    Linking.openURL(
                      `https://simleg-dprdsulteng.com/assets/uploads/draft/${detailData.hasil_agenda}`
                    );
                  }}
                >
                  <Text style={{ color: "white" }}>Unduh Hasil Rapat</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.tidakDraft}>Belum Ada Hasil Rapat</Text>
              )}
            </View>
          )}
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
    marginBottom: 50,
    marginTop: 10,
  },
  tidakDraft: {
    alignSelf: "center",
    color: "red",
    marginBottom: 50,
    marginTop: 10,
  },
});

const richTextStyles = StyleSheet.create({
  p: {
    marginTop: -20,
    marginBottom: -20,
  },
});

export default Detail;
