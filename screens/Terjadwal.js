import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import Axios from "axios";

import Color from "../constants/Color";
import ListData from "../components/ListData";
import { DataContext } from "../components/DataContext";

const Terjadwal = (props) => {
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
  const [terjadwalDatas, setTerjadwalDatas] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (datas && terjadwalDatas == null) {
      let newData = datas.filter((data) => data.status_agenda == "undangan");
      setTerjadwalDatas(newData);
    }
  });

  const newRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setTerjadwalDatas(null);
    setDatas(null);
    setNotif(null);
    setInvite(null);
    setPribadi(null);
    setVote(null);
    setTerlaksana(null);
    if (!terjadwalDatas && !datas) {
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <View style={styles.terjadwal}>
      {terjadwalDatas && datas ? (
        <FlatList
          keyExtractor={(data) => data.id_agenda}
          data={terjadwalDatas}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={newRefresh} />
          }
          renderItem={(data) => (
            <TouchableOpacity
              onPress={() => {
                setNotif(null);
                props.navigation.navigate("DetailUndangan", {
                  idAgenda: data.item.id_agenda,
                });
              }}
            >
              <ListData data={data.item} />
            </TouchableOpacity>
          )}
          style={styles.list}
        />
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  terjadwal: {
    flex: 1,
    backgroundColor: Color.backgroundSecondary,
  },
});

export default Terjadwal;
