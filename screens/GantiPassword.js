import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Color from "../constants/Color";
import { Picker } from "@react-native-picker/picker";
import { DataContext } from "../components/DataContext";
import Axios from "axios";
import QueryString from "qs";

const GantiPassword = (props) => {
  const [datas, setDatas, dataUser, setDataUser] = useContext(DataContext);
  const [input, setInput] = useState({
    email: dataUser[0].email,
    oldpassword: "",
    newpassword: "",
  });
  const handleSimpan = () => {
    const data = QueryString.stringify(input);
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };
    Axios.put(
      "https://api.simleg-dprdsulteng.com/index.php/user/changepassword",
      data,
      headers
    ).then((res) => {
      if (res.data.email) {
        Alert.alert(
          "Berhasil!",
          "Password Berhasil Diubah! Silahkan Login Kembali.",
          [{ text: "Ok", onPress: () => props.navigation.replace("Login") }]
        );
      } else {
        Alert.alert("Gagal!", "Email atau Password Lama Salah!");
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {dataUser ? (
        <View style={styles.screen}>
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
              Ganti Password
            </Text>
          </View>
          <ScrollView style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={input.email}
                onChangeText={(text) => setInput({ ...input, email: text })}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Password Lama</Text>
              <TextInput
                style={styles.input}
                value={input.oldpassword}
                onChangeText={(text) =>
                  setInput({ ...input, oldpassword: text })
                }
                secureTextEntry
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Password Baru</Text>
              <TextInput
                style={styles.input}
                value={input.newpassword}
                onChangeText={(text) =>
                  setInput({ ...input, newpassword: text })
                }
                secureTextEntry
              />
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={{
                  ...styles.btn,
                  backgroundColor: Color.buttonPrimary,
                }}
                onPress={handleSimpan}
              >
                <Text style={{ color: "white" }}>Simpan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.btn,
                  backgroundColor: Color.buttonSecondary,
                }}
                onPress={() => props.navigation.navigate("Main")}
              >
                <Text style={{ color: "white" }}>Kembali</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View></View>
      )}
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  },
  nav: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  back: {
    marginHorizontal: 20,
  },
  formContainer: {
    width: "80%",
  },
  formGroup: {
    marginVertical: 5,
    width: "100%",
  },
  label: {
    color: "gray",
    fontStyle: "italic",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: Color.buttonSecondary,
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 50,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
  },
  btn: {
    height: 40,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default GantiPassword;
