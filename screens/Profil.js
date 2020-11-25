import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { DataContext } from "../components/DataContext";

import Color from "../constants/Color";

const Profil = (props) => {
  const [datas, setDatas, dataUser, setDataUser] = useContext(DataContext);

  return (
    <View style={styles.profil}>
      {dataUser ? (
        <View>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: `https://dirumahki.online/assets/uploads/users/${dataUser[0].photo}`,
              }}
              style={styles.imageUser}
            />
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
              <Text style={styles.col3}>{dataUser[0].fraksi}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.col1}>Dapil</Text>
              <Text style={styles.col2}>:</Text>
              <Text style={styles.col3}>{dataUser[0].dapil}</Text>
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
    marginVertical: 20,
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
});

export default Profil;
