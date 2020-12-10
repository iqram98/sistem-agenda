import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";

import Color from "../constants/Color";
import ListData from "../components/ListData";
import { DataContext } from "../components/DataContext";

const Semua = (props) => {
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
  const [refreshing, setRefreshing] = useState(false);

  const newRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setDatas(null);
    setNotif(null);
    setInvite(null);
    setPribadi(null);
    setVote(null);
    setTerlaksana(null);
    if (!datas) {
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <View style={styles.semua}>
      <FlatList
        keyExtractor={(data) => data.id_agenda}
        data={datas}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={newRefresh} />
        }
        renderItem={(data) => (
          <TouchableOpacity
            onPress={() => {
              setNotif(null);
              props.navigation.navigate(
                data.item.status_agenda == "undangan"
                  ? "DetailUndangan"
                  : data.item.status_agenda == "agenda_pribadi"
                  ? "DetailPribadi"
                  : "Detail",
                {
                  idAgenda: data.item.id_agenda,
                }
              );
            }}
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
