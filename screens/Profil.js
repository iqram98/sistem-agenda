import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { DataContext } from "../components/DataContext";

import Color from "../constants/Color";

const Profil = (props) => {
  const [datas, setDatas, dataUser, setDataUser] = useContext(DataContext);

  return (
    <View style={styles.profil}>
      {dataUser ? (
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("UbahFoto")}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: `https://i.imgur.com/${dataUser[0].photo}`,
                }}
                style={styles.imageUser}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => props.navigation.navigate("EditProfil")}
            >
              <Text style={{ color: "white" }}>Edit Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => props.navigation.navigate("GantiPassword")}
            >
              <Text style={{ color: "white" }}>Ubah Password</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{dataUser[0].first_name}</Text>
            <Text style={styles.position}>{dataUser[0].jabatan}</Text>
          </View>
          <View style={styles.bioContainer}>
            <View style={styles.row}>
              <Text style={styles.col1}>Alamat</Text>
              <Text style={styles.col2}>:</Text>
              <Text style={styles.col3}>{dataUser[0].alamat}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.col1}>Agama</Text>
              <Text style={styles.col2}>:</Text>
              <Text style={styles.col3}>{dataUser[0].agama}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.col1}>TTL</Text>
              <Text style={styles.col2}>:</Text>
              <Text style={styles.col3}>
                {dataUser[0].tempat_lahir},{dataUser[0].tanggal_lahir}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.col1}>Fraksi</Text>
              <Text style={styles.col2}>:</Text>
              <Text style={styles.col3}>{dataUser[0].nama_fraksi}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.col1}>Dapil</Text>
              <Text style={styles.col2}>:</Text>
              <Text style={styles.col3}>{dataUser[0].nama_dapil}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.col1}>Jabatan</Text>
              <Text style={styles.col2}>:</Text>
              <Text style={styles.col3}>{dataUser[0].jabatan}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.col1}>Riwayat</Text>
              <Text style={styles.col2}>:</Text>
              <Text style={styles.col3}>{dataUser[0].riwayat}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  profil: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderColor: Color.cardSecondary,
    borderWidth: 1,
    borderRadius: 100,
    width: 150,
    height: 150,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  imageUser: {
    width: "90%",
    height: "90%",
    borderRadius: 100,
  },
  nameContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
  },
  position: {
    color: "gray",
    fontSize: 26,
  },
  bioContainer: {
    width: "80%",
    backgroundColor: Color.cardTertiary,
    padding: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
  },
  col1: {
    width: "20%",
  },
  col2: {
    width: "20%",
    textAlign: "center",
  },
  col3: {
    width: "60%",
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  btn: {
    width: "35%",
    height: 30,
    backgroundColor: Color.buttonPrimary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default Profil;
