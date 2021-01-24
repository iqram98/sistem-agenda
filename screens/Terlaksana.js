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

const Terlaksana = (props) => {
  const [datas, setDatas, dataUser, setDataUser] = useContext(DataContext);
  const [terjadwalDatas, setTerjadwalDatas] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (datas && terjadwalDatas == null) {
      let newData = datas.filter((data) => data.status_agenda == "terjadwal");
      setTerjadwalDatas(newData);
    }
  });

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (terjadwalDatas) {
      console.log("refresh");
      try {
        Axios.get(
          `https://api.simleg-dprdsulteng.com/index.php/invite?user_invite=${dataUser[0].id}`
        ).then((res) => {
          setTerjadwalDatas(res.data);
          setRefreshing(false);
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <View style={styles.terlaksana}>
      {terjadwalDatas !== null ? (
        <FlatList
          keyExtractor={(data) => data.id_agenda}
          data={terjadwalDatas}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
      ) : (
        <View></View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  terlaksana: {
    flex: 1,
    backgroundColor: Color.backgroundSecondary,
  },
});

export default Terlaksana;
