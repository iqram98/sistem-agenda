import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Axios from "axios";
import { DataContext } from "../components/DataContext";

const ItemHistory = (item) => {
  let data = item.data;
  let d = Date.now();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let dagenda = new Date(
    `${
      monthNames[data.waktu_history.slice(5, 7) - 1]
    } ${data.waktu_history.slice(8, 10)}, ${data.waktu_history.slice(0, 4)} ${
      parseInt(data.waktu_history.slice(11, 13)) + 1
    }:${data.waktu_history.slice(14, 16)}`
  );

  function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours == 0 ? "" : hours + " jam ";
    minutes =
      minutes < 10
        ? "0" + minutes + " menit yang lalu"
        : minutes + " menit yang lalu";

    return hours + minutes;
  }

  return (
    <View style={styles.box}>
      <Text style={styles.message}>
        Anda {data.nama_history} pada {data.nama_agenda}
      </Text>
      <Text style={styles.time}>
        {msToTime(Date.now() - dagenda.getTime())}
      </Text>
    </View>
  );
};

const History = (props) => {
  const [datas, setDatas, dataUser, setDataUser] = useContext(DataContext);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    if (!history) {
      Axios.get(
        `https://api.dirumahki.online/index.php/history?user_history=${dataUser[0].id}`
      ).then((res) => setHistory(res.data.reverse()));
    }
  });

  return (
    <View style={styles.history}>
      {history ? (
        <FlatList
          keyExtractor={(data) => data.id_history}
          data={history}
          renderItem={(data) => <ItemHistory data={data.item} />}
          style={styles.list}
        />
      ) : (
        <View></View>
      )}
      <View style={styles.body}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  history: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
  },
  header: {
    height: 80,
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    flex: 1,
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
});

export default History;
