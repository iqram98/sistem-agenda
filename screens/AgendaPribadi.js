import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Color from "../constants/Color";
import ListData from "../components/ListDataPribadi";
import { DataContext } from "../components/DataContext";
import { StatusBar } from "expo-status-bar";

const AgendaPribadi = (props) => {
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
  const [refreshing, setRefreshing] = useState(false);

  const newRefresh = React.useCallback(() => {
    setRefreshing(true);
    setPribadi(null);
    if (!dataPribadi) {
      setRefreshing(false);
    }
  }, [refreshing]);

  useEffect(() => {
    if (!pribadi) {
      Axios.get(
        `https://api.simleg-dprdsulteng.com/index.php/agendapribadi/${dataUser[0].id}`
      ).then((res) => setPribadi(res.data));
    }
  });
  return (
    <View style={styles.pribadi}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
          <Image
            source={{
              uri: `https://simleg-dprdsulteng.com/assets/uploads/users/${dataUser[0].photo}`,
            }}
            style={styles.imageUser}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notifContainer}
          onPress={() => props.navigation.navigate("Notifications")}
        >
          <MaterialCommunityIcons name="bell-outline" color="black" size={30} />

          {notif && notif.length > 0 ? (
            <View style={styles.notifNum}>
              <Text style={{ color: "white" }}>{notif.length}</Text>
            </View>
          ) : (
            <View></View>
          )}
        </TouchableOpacity>
      </View>
      {pribadi ? (
        <FlatList
          keyExtractor={(data) => data.id_kegiatan}
          data={pribadi}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={newRefresh} />
          }
          renderItem={(data) => (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("DetailPribadi", {
                  idAgenda: data.item.id_kegiatan,
                })
              }
            >
              <ListData data={data.item} />
            </TouchableOpacity>
          )}
          style={styles.list}
        />
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>Loading...</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.back}
        onPress={() => props.navigation.navigate("Home")}
      >
        <Text>Kembali Ke Home</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  pribadi: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  back: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
    backgroundColor: Color.buttonTertiary,
    width: "60%",
    height: 50,
    borderRadius: 10,
  },
  header: {
    height: 90,
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: Color.buttonSecondary,
    borderBottomWidth: 1,
  },
  imageUser: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  notifContainer: {
    flexDirection: "row",
  },
  notifNum: {
    backgroundColor: "#f76d6d",
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default AgendaPribadi;
