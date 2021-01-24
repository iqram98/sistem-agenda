import React, { useContext, useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Axios from "axios";

import Color from "../constants/Color";
import Semua from "../screens/Semua";
import Usulan from "../screens/Usulan";
import Terjadwal from "../screens/Terjadwal";
import { StatusBar } from "expo-status-bar";
import { DataContext } from "../components/DataContext";

import * as Notifications from "expo-notifications";
import RNRestart from "react-native-restart";

const TopTab = createMaterialTopTabNavigator();

const TopTabStack = (props) => (
  <TopTab.Navigator
    initialRouteName="Agenda"
    tabBarOptions={{ style: { backgroundColor: Color.backgroundSecondary } }}
    backBehavior="initialRoute"
  >
    <TopTab.Screen name="E-Vote" component={Usulan} />
    <TopTab.Screen name="Undangan" component={Terjadwal} />
    <TopTab.Screen refresh={props.refresh} name="Agenda" component={Semua} />
  </TopTab.Navigator>
);

const Main = (props) => {
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

  const [dataInvite, setDataInvite] = useState(null);
  const [dataVote, setDataVote] = useState(null);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  Notifications.setNotificationHandler({
    handleNotification: async (notif) => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
        RNRestart.Restart();
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  useEffect(() => {
    if (!notif) {
      Axios.get(
        `https://api.simleg-dprdsulteng.com/index.php/invite?user_invite=${dataUser[0].id}&notif=0`
      ).then((res) => {
        setDataInvite(res.data);
      });
      Axios.get(
        `https://api.simleg-dprdsulteng.com/index.php/vote?user_vote=${dataUser[0].id}&notif=0`
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
        `https://api.simleg-dprdsulteng.com/index.php/agenda?user=${dataUser[0].id}`
      ).then((res) => {
        setDatas(res.data.reverse());
      });
      // Axios.get(
      //   `https://api.simleg-dprdsulteng.com/index.php/vote?user_vote=${dataUser[0].id}`
      // ).then((res) => {
      //   setVote(res.data);
      // });
      // Axios.get(
      //   `https://api.simleg-dprdsulteng.com/index.php/agenda?status_agenda=terlaksana&user=${dataUser[0].id}`
      // ).then((res) => {
      //   setTerlaksana(res.data);
      // });
      // Axios.get(
      //   `https://api.simleg-dprdsulteng.com/index.php/agenda?status_agenda=agenda_pribadi&user=${dataUser[0].id}`
      // ).then((res) => {
      //   setPribadi(res.data);
      // });
    }

    // if (!datas && invite && vote && terlaksana && pribadi) {
    //   let newData = []
    //     .concat(invite, vote, terlaksana, pribadi)
    //     .sort((a, b) => a.id_agenda - b.id_agenda)
    //     .reverse();
    //   setDatas(newData);
    // }
  });

  return (
    <View style={styles.main}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
          <Image
            source={{
              uri: `https://i.imgur.com/${dataUser[0].photo}`,
            }}
            style={styles.imageUser}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notifContainer}
          onPress={() => {
            props.navigation.navigate("Notifications");
          }}
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
