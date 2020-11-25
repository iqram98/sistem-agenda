import React, { useEffect, useContext, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Axios from "axios";

import Color from "../constants/Color";
import Semua from "../screens/Semua";
import Usulan from "../screens/Usulan";
import Terlaksana from "../screens/Terlaksana";
import { StatusBar } from "expo-status-bar";
import { DataContext } from "../components/DataContext";

const TopTab = createMaterialTopTabNavigator();

const TopTabStack = (props) => (
  <TopTab.Navigator
    initialRouteName="Agenda"
    tabBarOptions={{ style: { backgroundColor: Color.backgroundSecondary } }}
    backBehavior="initialRoute"
  >
    <TopTab.Screen name="E-Vote" component={Usulan} />
    <TopTab.Screen name="Undangan" component={Terlaksana} />
    <TopTab.Screen refresh={props.refresh} name="Agenda" component={Semua} />
  </TopTab.Navigator>
);

const Main = (props) => {
  const [datas, setDatas, dataUser, setDataUser, notif, setNotif] = useContext(
    DataContext
  );

  const [invite, setInvite] = useState(null);
  const [vote, setVote] = useState(null);

  const [dataInvite, setDataInvite] = useState(null);
  const [dataVote, setDataVote] = useState(null);

  useEffect(() => {
    if (!dataInvite) {
      Axios.get(
        `https://api.dirumahki.online/index.php/invite?user_invite=1&notif=0`
      ).then((res) => {
        setDataInvite(res.data);
      });
      Axios.get(
        `https://api.dirumahki.online/index.php/vote?user_vote=1&notif=0`
      ).then((res) => {
        setDataVote(res.data);
      });
    }
    if (!notif) {
      if (dataVote && dataInvite) {
        setNotif([].concat(dataInvite, dataVote));
      }
    }
  });

  useEffect(() => {
    if (!datas) {
      Axios.get(
        `https://api.dirumahki.online/index.php/invite?user_invite=1`
      ).then((res) => {
        setInvite(res.data);
      });
      Axios.get(`https://api.dirumahki.online/index.php/vote?user_vote=1`).then(
        (res) => {
          setVote(res.data);
        }
      );
    }
    if (!datas && invite && vote) {
      setDatas(
        [].concat(invite, vote).sort((a, b) => a.id_agenda - b.id_agenda)
      );
    }
  });

  return (
    <View style={styles.main}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Image
          source={{
            uri: `https://dirumahki.online/assets/uploads/users/${dataUser[0].photo}`,
          }}
          style={styles.imageUser}
        />
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
      <TopTabStack />
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

export default Main;
