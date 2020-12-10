import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { DataContext } from "../components/DataContext";
import Color from "../constants/Color";
import { SafeAreaView } from "react-native-safe-area-context";
import Axios from "axios";

const ListItem = (item) => {
  let data = item.data;
  return (
    <View style={styles.list}>
      <View style={styles.listDesc}>
        <Text style={styles.listNama}>{data.nama_agenda}</Text>
        <Text style={styles.listWaktu}>
          {data.waktu_agenda.slice(8, 10)} - {data.waktu_agenda.slice(5, 7)} -{" "}
          {data.waktu_agenda.slice(0, 4)}
        </Text>
      </View>
    </View>
  );
};

const HasilKegiatan = (props) => {
  const [datas, setDatas, dataUser, setDataUser] = useContext(DataContext);
  const [dataHasil, setDataHasil] = useState(null);

  useEffect(() => {
    if (dataHasil == null) {
      Axios.get(
        `https://api.dirumahki.online/index.php/agenda?status_agenda=terlaksana&user=${dataUser[0].id}`
      ).then((res) => {
        setDataHasil(res.data);
      });
    }
  });

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor="white" />
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => props.navigation.navigate("Home")}
        >
          <MaterialCommunityIcons name="arrow-left" color="black" size={25} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Hasil Kegaiatan
        </Text>
      </View>
      <View style={styles.contentContainer}>
        {dataHasil ? (
          <FlatList
            keyExtractor={(data) => data.id_agenda}
            data={dataHasil}
            renderItem={(data) => (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("DetailHasil", {
                    detailData: data.item,
                  });
                }}
              >
                <ListItem data={data.item} />
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>Loading...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  nav: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "white",
    width: "100%",
  },
  back: {
    marginHorizontal: 20,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  list: {
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingVertical: 10,
  },
  listDesc: {
    width: "90%",
  },
  listNama: {
    color: "black",
    fontSize: 16,
    marginBottom: 5,
  },
  listWaktu: {
    color: "gray",
    fontStyle: "italic",
  },
});

export default HasilKegiatan;
