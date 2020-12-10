import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
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

const DetailUndangan = (props) => {
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
  const [jumlahBelumPilih, setJumlahBelumPilih] = useState(null);

  useEffect(() => {
    if (detailData === null) {
      let newData = datas.find((data) => data.id_agenda === idAgenda);
      setDetailData(newData);
    }

    if (
      !jumlahBelumPilih &&
      detailData &&
      detailData.status_agenda === "undangan"
    ) {
      Axios.get(
        `https://api.dirumahki.online/index.php/invite/jumlah/${idAgenda}`
      ).then((res) => setJumlahBelumPilih(res.data));
    }

    if (detailData && detailData.status_agenda === "undangan") {
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
  });

  return (
    <ScrollView style={styles.screen}>
      {detailData !== null ? (
        <View>
          <View style={styles.nav}>
            <TouchableOpacity
              style={styles.back}
              onPress={() => props.navigation.navigate("Main")}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                color="black"
                size={25}
              />
            </TouchableOpacity>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Detail Undangan
            </Text>
          </View>
          <Image
            style={styles.image}
            source={{
              uri: `https://dirumahki.online/assets/uploads/img_rapat/${detailData.img_agenda}`,
            }}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Nama Kegiatan</Text>
            <Text style={styles.dateTime}>{detailData.nama_agenda}</Text>
            <Text style={styles.title}>Waktu</Text>
            <Text style={styles.dateTime}>{detailData.waktu_agenda}</Text>
            <Text style={styles.title}>Status Kegiatan</Text>
            <Text style={styles.status}>{detailData.status_agenda}</Text>
          </View>
          <View style={styles.isiContainer}>
            <Text style={styles.title}>Isi</Text>
            <View style={styles.descContainer}>
              <HTMLView
                value={detailData.deskripsi_agenda}
                addLineBreaks={false}
                stylesheet={richTextStyles}
              />
            </View>
          </View>
          {detailData.draft_agenda !== "" ? (
            <TouchableOpacity
              style={styles.buttonDraft}
              onPress={() => {
                Linking.openURL(
                  `https://dirumahki.online/assets/uploads/draft/${detailData.draft_agenda}`
                );
              }}
            >
              <Text style={{ color: "white" }}>Unduh Lampiran Rapat</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.tidakDraft}>Belum Ada Lampiran Rapat</Text>
          )}
          <View>
            <HadirButton
              resetHadir={() => setJumlahBelumPilih(null)}
              agenda={detailData.id_agenda}
            />
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
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>Loading...</Text>
              </View>
            )}
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
  image: {
    width: "100%",
    height: 300,
  },
  back: {
    marginHorizontal: 20,
  },
  titleContainer: {
    width: "80%",
    backgroundColor: Color.backgroundSecondary,
    marginTop: 20,
    padding: 25,
    borderRadius: 10,
    alignSelf: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
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
    marginVertical: 10,
  },
  tidakDraft: {
    alignSelf: "center",
    color: "red",
    marginVertical: 10,
  },
  nav: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
  },
  isiContainer: {
    width: "90%",

    marginTop: 20,
    borderRadius: 10,
    alignSelf: "center",
  },
});

const richTextStyles = StyleSheet.create({
  p: {
    marginTop: -15,
    marginBottom: -15,
    textAlign: "justify",
  },
});

export default DetailUndangan;
