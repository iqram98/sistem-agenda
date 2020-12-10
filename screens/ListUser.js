import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ListUser = (props) => {
  const { idAgenda } = props.route.params;
  const [peserta, setPeserta] = useState(null);

  useEffect(() => {
    if (!peserta) {
      Axios.get(
        `https://api.dirumahki.online/index.php/invite/invite2/${idAgenda}`
      ).then((res) => setPeserta(res.data));
    }
  });

  return (
    <View style={styles.screen}>
      {peserta ? (
        <View>
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
              List Peserta
            </Text>
          </View>
          <FlatList
            keyExtractor={(data) => data.id_invite}
            data={peserta}
            renderItem={(data) => (
              <View style={styles.list}>
                <Text>
                  {data.item.first_name} {data.item.last_name}
                </Text>
                <Text style={{ color: "green" }}>
                  {data.item.presence_invite == ""
                    ? "Belum Memutuskan"
                    : data.item.presence_invite == "1"
                    ? "Akan Hadir"
                    : "Berhalangan Hadir"}
                </Text>
              </View>
            )}
          />
        </View>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    marginTop: 36,
    flex: 1,
    backgroundColor: "white",
  },
  list: {
    marginHorizontal: 50,
    height: 50,
    width: "90%",
  },
  nav: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
  },
  back: {
    marginHorizontal: 20,
  },
});

export default ListUser;
