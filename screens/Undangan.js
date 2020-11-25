import React, { useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Axios from "axios";

import Color from "../constants/Color";
import ListData from "../components/ListData";
import { DataContext } from "../components/DataContext";

const Undangan = (props) => {
  console.log(props.route);
  const [
    datas,
    setDatas,
    dataUser,
    setDataUser,
    date,
    setDate,
    invites,
    setInvites,
  ] = useContext(DataContext);

  useEffect(() => {
    Axios.get(
      "https://api.dirumahki.online/index.php/agenda?status_agenda=terjadwal&user=1"
    ).then((res) => {
      setInvites(res.data);
    });
  });

  return (
    <View style={styles.main}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Image
          source={{
            uri:
              "https://dirumahki.online/assets/uploads/users/d8902-user1.png",
          }}
          style={styles.imageUser}
        />
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Notifications")}
        >
          <MaterialCommunityIcons name="bell-outline" color="black" size={30} />
        </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={(data) => data.id_agenda}
        data={invites}
        renderItem={(data) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Detail", {
                idAgenda: data.item.id_agenda,
              })
            }
          >
            <ListData data={data.item} />
          </TouchableOpacity>
        )}
        style={styles.list}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: Color.backgroundSecondary,
  },
  header: {
    height: 80,
    paddingTop: 50,
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageUser: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  semua: {
    flex: 1,
    backgroundColor: Color.backgroundSecondary,
    alignItems: "center",
  },

  list: {
    width: "100%",
  },
});

export default Undangan;
