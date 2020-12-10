import React, { useState, useEffect, useContext } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TextInput,
} from "react-native";

import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Color from "../constants/Color";
import { Picker } from "@react-native-picker/picker";
import { DataContext } from "../components/DataContext";
import Axios from "axios";
import QueryString from "qs";

const EditProfil = (props) => {
  const [datas, setDatas, dataUser, setDataUser] = useContext(DataContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
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
        `https://api.dirumahki.online/index.php/user/dapil`
      ).then((res) => setDapilData(res.data));
      Axios.get(
        `https://api.dirumahki.online/index.php/user/fraksi`
      ).then((res) => setFraksiData(res.data));
    }
  });

  // const _maybeRenderUploadingOverlay = () => {
  //   if (uploading) {
  //     return (
  //       <View style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
  //         <ActivityIndicator color="#fff" size="large" />
  //       </View>
  //     );
  //   }
  // };

  // const _maybeRenderImage = () => {
  //   if (!image) {
  //     return;
  //   }

  //   return (
  //     <View style={styles.maybeRenderContainer}>
  //       <View style={styles.maybeRenderImageContainer}>
  //         <Image source={{ uri: image }} style={styles.maybeRenderImage} />
  //       </View>

  //       <Text
  //         onPress={_copyToClipboard}
  //         onLongPress={_share}
  //         style={styles.maybeRenderImageText}
  //       >
  //         {image}
  //       </Text>
  //     </View>
  //   );
  // };

  // const _share = () => {
  //   Share.share({
  //     message: image,
  //     title: "Check out this photo",
  //     url: image,
  //   });
  // };

  // const _copyToClipboard = () => {
  //   Clipboard.setString(image);
  //   alert("Copied image URL to clipboard");
  // };

  // const _takePhoto = async () => {
  //   const { status: cameraPerm } = await Permissions.askAsync(
  //     Permissions.CAMERA
  //   );

  //   const { status: cameraRollPerm } = await Permissions.askAsync(
  //     Permissions.CAMERA_ROLL
  //   );

  //   // only if user allows permission to camera AND camera roll
  //   if (cameraPerm === "granted" && cameraRollPerm === "granted") {
  //     let pickerResult = await ImagePicker.launchCameraAsync({
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //     });

  //     _handleImagePicked(pickerResult);
  //   }
  // };

  // const _pickImage = async () => {
  //   const { status: cameraRollPerm } = await Permissions.askAsync(
  //     Permissions.CAMERA_ROLL
  //   );

  //   // only if user allows permission to camera roll
  //   if (cameraRollPerm === "granted") {
  //     let pickerResult = await ImagePicker.launchImageLibraryAsync({
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //     });

  //     _handleImagePicked(pickerResult);
  //   }
  // };

  // const _handleImagePicked = async (pickerResult) => {
  //   let uploadResponse, uploadResult;

  //   try {
  //     setUploading(true);

  //     if (!pickerResult.cancelled) {
  //       uploadResponse = await uploadImageAsync(pickerResult.uri);
  //       uploadResult = await uploadResponse.json();

  //       setImage(uploadResult.location);
  //     }
  //   } catch (e) {
  //     console.log({ uploadResponse });
  //     console.log({ uploadResult });
  //     console.log({ e });
  //     alert("Upload failed, sorry :(");
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  const handleSimpan = () => {
    const data = QueryString.stringify(input);
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };
    Axios.put(
      "https://api.dirumahki.online/index.php/user",
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
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {fraksiData && dapilData ? (
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
              Edit Profil
            </Text>
          </View>
          <ScrollView style={styles.formContainer}>
            {/* <Button
              onPress={_pickImage}
              title="Pick an image from camera roll"
            />

            <Button onPress={_takePhoto} title="Take a photo" /> */}

            <View style={styles.formGroup}>
              <Text style={styles.label}>Nama Depan</Text>
              <TextInput
                style={styles.input}
                value={input.first_name}
                onChangeText={(text) =>
                  setInput({ ...input, first_name: text })
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nama Belakang</Text>
              <TextInput
                style={styles.input}
                value={input.last_name}
                onChangeText={(text) => setInput({ ...input, last_name: text })}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={input.email}
                onChangeText={(text) => setInput({ ...input, email: text })}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Alamat</Text>
              <TextInput
                multiline
                numberOfLines={5}
                style={styles.input}
                value={input.alamat}
                onChangeText={(text) => setInput({ ...input, alamat: text })}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Agama</Text>
              <TextInput
                style={styles.input}
                value={input.agama}
                onChangeText={(text) => setInput({ ...input, agama: text })}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Tempat Lahir</Text>
              <TextInput
                style={styles.input}
                value={input.tempat_lahir}
                onChangeText={(text) =>
                  setInput({ ...input, tempat_lahir: text })
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Tanggal Lahir</Text>
              <TextInput
                style={styles.input}
                value={input.tanggal_lahir}
                onChangeText={(text) =>
                  setInput({ ...input, tanggal_lahir: text })
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Fraksi</Text>
              <View style={styles.input}>
                <Picker
                  selectedValue={input.fraksi}
                  style={styles.input}
                  onValueChange={(itemValue, itemIndex) =>
                    setInput({ ...input, fraksi: itemValue })
                  }
                >
                  {fraksiData.map((fraksi) => (
                    <Picker.Item
                      key={fraksi.id_fraksi}
                      label={fraksi.nama_fraksi}
                      value={fraksi.id_fraksi}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Dapil</Text>
              <View style={styles.input}>
                <Picker
                  selectedValue={input.dapil}
                  style={styles.input}
                  onValueChange={(itemValue, itemIndex) =>
                    setInput({ ...input, dapil: itemValue })
                  }
                >
                  {dapilData.map((dapil) => (
                    <Picker.Item
                      key={dapil.id_dapil}
                      label={dapil.nama_dapil}
                      value={dapil.id_dapil}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Jabatan</Text>
              <TextInput
                style={styles.input}
                value={input.jabatan}
                onChangeText={(text) => setInput({ ...input, jabatan: text })}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Riwayat</Text>
              <TextInput
                style={{
                  ...styles.input,
                  height: 100,
                  textAlignVertical: "top",
                }}
                multiline
                value={input.riwayat}
                onChangeText={(text) => setInput({ ...input, riwayat: text })}
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
          {/* {_maybeRenderImage()}
          {_maybeRenderUploadingOverlay()} */}
        </View>
      ) : (
        <View></View>
      )}
    </TouchableWithoutFeedback>
  );
};
// async function uploadImageAsync(uri) {
//   let apiUrl = "https://dirumahki.online/assets/uploads/users/";

//   // Note:
//   // Uncomment this if you want to experiment with local server
//   //
//   // if (Constants.isDevice) {
//   //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
//   // } else {
//   //   apiUrl = `http://localhost:3000/upload`
//   // }

//   let uriParts = uri.split(".");
//   let fileType = uriParts[uriParts.length - 1];

//   let formData = new FormData();
//   formData.append("photo", {
//     uri,
//     name: `photo.${fileType}`,
//     type: `image/${fileType}`,
//   });

//   let options = {
//     method: "POST",
//     body: formData,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "multipart/form-data",
//     },
//   };

//   return fetch(apiUrl, options);
// }

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
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: "center",
  },
  maybeRenderUploading: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: "hidden",
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default EditProfil;
