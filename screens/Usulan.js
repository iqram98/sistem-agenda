import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import Color from "../constants/Color";
import ListData from "../components/ListData";
import { DataContext } from "../components/DataContext";

const Usulan = (props) => {
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
  const [usulanDatas, setUsulanDatas] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (datas && usulanDatas == null) {
      let newData = datas.filter((data) => data.status_agenda == "vote");
      setUsulanDatas(newData);
    }
  });

  const newRefresh = React.useCallback(() => {
    setRefreshing(true);
    setDatas(null);
    setUsulanDatas(null);
    setInvite(null);
    setVote(null);
    setPribadi(null);
    setTerlaksana(null);
    setNotif(null);
    if (!datas) {
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <View style={styles.usulan}>
      {datas && usulanDatas ? (
        <FlatList
          keyExtractor={(data) => data.id_agenda}
          data={usulanDatas}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={newRefresh} />
          }
          renderItem={(data) => (
            <TouchableOpacity
              onPress={() => {
                setNotif(null);
                props.navigation.navigate("Detail", {
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
  usulan: {
    flex: 1,
    backgroundColor: Color.backgroundSecondary,
  },
});

export default Usulan;
