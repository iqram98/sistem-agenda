import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Color from "../constants/Color";
import { DataContext } from "../components/DataContext";

const Login = (props) => {
  const [datas, setDatas, dataUser, setDataUser] = useContext(DataContext);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
      console.log(jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = () => {
    if ((input.email === "") | (input.password === "")) {
      Alert.alert("Login", "Harap Mengisi Email & Password");
    } else {
      Axios.get(
        `https://api.dirumahki.online/index.php/user?email=${input.email}&password=${input.password}`
      ).then((res) => {
        setDataUser(res.data);
        if (typeof res.data === "string") {
          Alert.alert("Login", "Username atau Password Salah");
        } else {
          storeData({ ...input });
          props.navigation.replace("Main", {
            screen: "Home",
          });
          Keyboard.dismiss();
        }
      });
    }
  };

  return (
    <View style={styles.login}>
      <StatusBar style="dark" />
      <View style={styles.titleBox}>
        <Text style={styles.title1}>SISTEM INFORMASI</Text>
        <Text style={styles.title2}>MANAJEMIN</Text>
        <Text style={styles.title2}>LEGISLATIF</Text>
      </View>
      <View style={styles.loginBox}>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Email Anda"
          value={input.email}
          onChangeText={(text) => setInput({ ...input, email: text })}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Masukkan Password Anda"
          secureTextEntry={true}
          value={input.password}
          onChangeText={(text) => setInput({ ...input, password: text })}
        />
        <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
          <Text style={styles.textLogin}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: Color.backgroundSecondary,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title1: {
    color: Color.buttonSecondary,
    fontSize: 14,
  },
  title2: {
    color: Color.buttonSecondary,
    fontSize: 24,
    fontWeight: "bold",
  },
  loginBox: {
    width: "100%",
    height: 250,
    backgroundColor: Color.backgroundPrimary,
    marginVertical: 100,
    justifyContent: "center",
  },
  input: {
    padding: 10,
    backgroundColor: "#ccc",
    width: "85%",
    marginVertical: 5,
    marginHorizontal: 25,
  },
  buttonLogin: {
    backgroundColor: Color.buttonTertiary,
    width: "60%",
    marginVertical: 10,
    padding: 10,
    marginHorizontal: 25,
    alignItems: "center",
  },
  textLogin: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Login;
