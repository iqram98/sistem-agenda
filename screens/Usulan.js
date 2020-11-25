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

const Usulan = (props) => {
  const [datas, setDatas, dataUser, setDataUser] = useContext(DataContext);
  const [usulanDatas, setUsulanDatas] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (datas && usulanDatas == null) {
      let newData = datas.filter((data) => data.status_agenda == "usulan");
      setUsulanDatas(newData);
    }
  });

  const onRefresh = React.useCallback(async () => {
    console.log("terrefresh");
    setRefreshing(true);
    if (usulanDatas && usulanDatas.length < 10) {
      try {
        Axios.get(
          `https://api.dirumahki.online/index.php/vote?user_vote=${dataUser[0].id}`
        ).then((res) => {
          setUsulanDatas(res.data);
          console.log(res.data);
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
    <View style={styles.usulan}>
      {usulanDatas !== null ? (
        <FlatList
          keyExtractor={(data) => data.id_agenda}
          data={usulanDatas}
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
  usulan: {
    flex: 1,
    backgroundColor: Color.backgroundSecondary,
  },
});

export default Usulan;
