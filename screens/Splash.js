import React, { useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

import Color from "../constants/Color";
import { DataContext } from "../components/DataContext";

const Splash = (props) => {
  const [datas, setDatas, dataUser, setDataUser] = useContext(DataContext);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      if (!jsonValue) {
        props.navigation.replace("Login");
      } else {
        let value = JSON.parse(jsonValue);
        Axios.get(
          `https://api.dirumahki.online/index.php/user?email=${value.email}&password=${value.password}`
        ).then((res) => {
          setDataUser(res.data);
          if (typeof res.data === "string") {
            Alert.alert("Login", "Username atau Password Salah");
          } else {
            props.navigation.replace("Main", {
              screen: "Home",
            });
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  getData();
  return <View style={styles.screem}></View>;
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.backgroundPrimary,
  },
});

export default Splash;
