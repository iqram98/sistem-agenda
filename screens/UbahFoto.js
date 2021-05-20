import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import { DataContext } from "../components/DataContext";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Axios from "axios";
import QueryString from "qs";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const UbahFoto = (props) => {
  const [datas, setDatas, dataUser, setDataUser] = useContext(DataContext);
  const [photo, setPhoto] = useState(dataUser[0].photo);
  const [simpanBool, setSimpanBool] = useState(null);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    email: dataUser[0].email,
    first_name: dataUser[0].first_name,
    last_name: dataUser[0].last_name,
    tempat_lahir: dataUser[0].tempat_lahir,
    tanggal_lahir: dataUser[0].tanggal_lahir,
    fraksi: dataUser[0].fraksi,
    dapil: dataUser[0].dapil,
    alamat: dataUser[0].alamat,
    photo: dataUser[0].photo,
    agama: dataUser[0].agama,
    jabatan: dataUser[0].jabatan,
    riwayat: dataUser[0].riwayat,
  });
  const [fraksiData, setFraksiData] = useState(null);
  const [dapilData, setDapilData] = useState(null);

  useEffect(() => {
    if (!fraksiData && !dapilData) {
      Axios.get(
        `https://api.simleg-dprdsulteng.com/index.php/user/dapil`
      ).then((res) => setDapilData(res.data));
      Axios.get(
        `https://api.simleg-dprdsulteng.com/index.php/user/fraksi`
      ).then((res) => setFraksiData(res.data));
    }
    if (simpanBool) {
      const data = QueryString.stringify(input);
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      };
      Axios.put(
        "https://api.simleg-dprdsulteng.com/index.php/user",
        data,
        headers
      ).then((res) =>
        setDataUser([
          {
            ...res.data,
            nama_fraksi: fraksiData.find(
              (fraksi) => fraksi.id_fraksi == res.data.fraksi
            ).nama_fraksi,
            nama_dapil: dapilData.find(
              (dapil) => dapil.id_dapil == res.data.dapil
            ).nama_dapil,
          },
        ])
      );
      props.navigation.navigate("Main");
    }
  });

  handleChoosePhoto = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera roll
    if (cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
      });
      setPhoto(pickerResult);
      console.log(pickerResult);
    }
  };

  handleUploadPhoto = () => {
    setLoading(true);
    fetch("https://api.imgur.com/3/image", {
      method: "POST",
      body: createFormData(photo, { userId: "123" }),
      headers: {
        Authorization: "Client-ID 65ba60ae682e3fd",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("upload succes", response);
        setInput({ ...input, photo: response.data.link.split("/")[3] });
        alert("Upload success!");
        setPhoto({ photo: response.data.link.split("/")[3] });
        setSimpanBool(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };
  return (
    <View style={styles.screen}>
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => props.navigation.navigate("Main")}
        >
          <MaterialCommunityIcons name="arrow-left" color="black" size={25} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Edit Profil</Text>
      </View>
      <Image
        source={{
          uri: photo.uri ? photo.uri : `https://i.imgur.com/${photo}`,
        }}
        style={{ width: 300, height: 300 }}
      />
      {loading ? (
        <Text>Mengupload...</Text>
      ) : (
        <View>
          <Button title="Choose Photo" onPress={handleChoosePhoto} />
          {!photo.cancelled ? (
            <Button title="Upload Photo" onPress={handleUploadPhoto} />
          ) : (
            <React.Fragment />
          )}
        </View>
      )}
    </View>
  );
};
const createFormData = (photo, body) => {
  const data = new FormData();
  data.append("image", photo.base64);
  return data;
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
});

export default UbahFoto;
