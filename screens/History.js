import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";

const History = (props) => {
  return (
    <View style={styles.history}>
      <View style={styles.body}>
        <View style={styles.box}>
          <Text style={styles.message}>
            Anda Memvote Yes Agenda Rapat Kerja IV
          </Text>
          <Text style={styles.time}>1 Menit</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.message}>
            Anda Memvote Yes Agenda Rapat Kerja IV
          </Text>
          <Text style={styles.time}>1 Menit</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.message}>
            Anda Memvote Yes Agenda Rapat Kerja IV
          </Text>
          <Text style={styles.time}>1 Menit</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  history: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
  },
  header: {
    height: 80,
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    flex: 1,
  },
  box: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    padding: 20,
  },
  message: {
    textAlign: "justify",
  },
  time: {
    color: "gray",
  },
});

export default History;
