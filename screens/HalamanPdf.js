import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import PDFReader from "rn-pdf-reader-js";
import Constants from "expo-constants";

export default HalamanPdf = (props) => {
  const { url } = props.route.params;
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => props.navigation.navigate("HasilKegiatan")}
          >
            <MaterialCommunityIcons name="arrow-left" color="black" size={25} />
          </TouchableOpacity>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Berkas Kegiatan
          </Text>
        </View>
        <TouchableOpacity
          style={styles.download}
          onPress={() => {
            Linking.openURL(url);
          }}
        >
          <MaterialCommunityIcons
            name="file-download-outline"
            size={25}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <PDFReader
        source={{
          uri: url,
        }}
        webviewProps={{
          startInLoadingState: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
  },
  nav: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  back: {
    marginHorizontal: 20,
  },
  download: {
    marginHorizontal: 20,
  },
});
