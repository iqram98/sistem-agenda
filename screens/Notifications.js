import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Axios from "axios";
import { DataContext } from "../components/DataContext";

const ItemNotif = (item) => {
  let data = item.data;
  return (
    <View style={styles.box}>
      <Text style={styles.message}>
        {data.status_agenda === "terjadwal"
          ? `Anda diundang untuk menghadiri ${data.nama_agenda}`
          : `Anda diundang untuk melakukan vote ${data.nama_agenda}`}
      </Text>
      <Text style={styles.time}>1 Menit</Text>
    </View>
  );
};

const Notifications = (props) => {
  const [datas, setDatas, dataUser, setDataUser, notif, setNotif] = useContext(
    DataContext
  );

  return (
    <View style={styles.notifications}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Main")}>
          <MaterialCommunityIcons name="arrow-left" color="black" size={30} />
        </TouchableOpacity>
      </View>
      {notif && notif.length > 0 ? (
        <View style={styles.body}>
          {console.log(notif)}
          <FlatList
            keyExtractor={(data) => data.id_agenda}
            data={notif}
            renderItem={(data) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Detail", {
                    idAgenda: data.item.id_agenda,
                  })
                }
              >
                <ItemNotif data={data.item} />
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View style={styles.body}>
          <Text>Kosong ...</Text>
        </View>
      )}

      <TouchableOpacity style={styles.history}>
        <Text style={styles.historyButton}>Lihat Semua Riwayat User</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  notifications: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 80,
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  box: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    padding: 20,
  },
  message: {
    textAlign: "justify",
  },
  time: {
    color: "gray",
  },
  historyButton: {
    color: "gray",
    padding: 20,
  },
  history: {
    alignSelf: "center",
  },
  body: {
    alignSelf: "center",
  },
});

export default Notifications;
