import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";

import Color from "../constants/Color";
import ListData from "../components/ListData";
import { DataContext } from "../components/DataContext";

const Semua = (props) => {
  const [datas, setDatas] = useContext(DataContext);

  return (
    <View style={styles.semua}>
      <FlatList
        keyExtractor={(data) => data.id_agenda}
        data={datas}
        renderItem={(data) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Detail", {
                idAgenda: data.item.id_agenda,
              })
            }
          >
            <ListData data={data.item} />
          </TouchableOpacity>
        )}
        style={styles.list}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  semua: {
    flex: 1,
    backgroundColor: Color.backgroundSecondary,
    alignItems: "center",
  },

  list: {
    width: "100%",
  },
});

export default Semua;
