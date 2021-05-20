import React, { useContext } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { WebView } from "react-native-webview";
import { DataContext } from "../components/DataContext";

const ListFoto = (props) => {
  const { idAgenda } = props.route.params;
  const [datas, setDatas, dataUser, setDataUser] = useContext(DataContext);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <WebView
        source={{
          uri: `https://simleg-dprdsulteng.com/file/agenda/${idAgenda}/${dataUser[0].id}`,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 36,
  },
});

export default ListFoto;
