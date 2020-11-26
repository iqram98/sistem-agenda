import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import Axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

import Color from "../constants/Color";
import { DataContext } from "../components/DataContext";

const Home = (props) => {
  const [datas, setDatas, dataUser, setDataUser, notif, setNotif] = useContext(
    DataContext
  );

  const navigation = useNavigation();

  const [invite, setInvite] = useState(null);
  const [vote, setVote] = useState(null);
  const [dateMark, setDateMark] = useState(null);
  const [idDate, setidDate] = useState(null);

  useEffect(() => {
    if (!datas) {
      Axios.get(
        `https://api.dirumahki.online/index.php/invite?user_invite=1`
      ).then((res) => {
        setInvite(res.data);
      });
      Axios.get(`https://api.dirumahki.online/index.php/vote?user_vote=1`).then(
        (res) => {
          setVote(res.data);
        }
      );
    }

    if (!datas && invite && vote) {
      let newData = []
        .concat(invite, vote)
        .sort((a, b) => a.id_agenda - b.id_agenda);
      setDatas(newData);
    }
    if (!idDate && !dateMark && datas) {
      let mark = {};
      let dateAndId = [];
      datas.map((data) => {
        mark[data.waktu_agenda.slice(0, 10)] = { marked: true };
        dateAndId.push({
          date: data.waktu_agenda.slice(0, 10),
          id: data.id_agenda,
        });
      });
      setDateMark(mark);
      setidDate(dateAndId);
    }
  });

  return (
    <ScrollView>
      <StatusBar style="light" />
      <View style={styles.home}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Image
              source={{
                uri: "https://dirumahki.online/assets/images/logo-sm.png",
              }}
              style={styles.logo}
            />
            <Text style={styles.title1}>SISTEM INFORMASI</Text>
            <Text style={styles.title2}>MANAJEMEN</Text>
            <Text style={styles.title2}>LEGISLATIF</Text>
          </View>
        </View>
        <View style={styles.dashboardContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() =>
              props.navigation.push("Main", {
                screen: "Main",
                params: {
                  screen: "Main",
                  params: {
                    screen: "Main",
                    params: {
                      screen: "E-Vote",
                    },
                  },
                },
              })
            }
          >
            <MaterialCommunityIcons
              style={[
                styles.buttonIcon,
                { backgroundColor: Color.buttonTertiary },
              ]}
              name="vote-outline"
              size={30}
              color="white"
            />
            <Text style={{ color: Color.buttonSecondary }}>E-Vote</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() =>
              props.navigation.push("Main", {
                screen: "Main",
                params: {
                  screen: "Main",
                  params: {
                    screen: "Main",
                    params: {
                      screen: "Undangan",
                    },
                  },
                },
              })
            }
          >
            <MaterialCommunityIcons
              style={[styles.buttonIcon, { backgroundColor: "#b298dc" }]}
              name="calendar"
              size={30}
              color="white"
            />
            <Text style={{ color: Color.buttonSecondary }}>Undangan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() =>
              props.navigation.push("Main", {
                screen: "Main",
                params: {
                  screen: "Main",
                  params: {
                    screen: "Main",
                    params: {
                      screen: "Agenda",
                    },
                  },
                },
              })
            }
          >
            <FontAwesome5
              style={[styles.buttonIcon, { backgroundColor: "#dc98b0" }]}
              name="list-alt"
              size={30}
              color="white"
            />
            <Text style={{ color: Color.buttonSecondary }}>Agenda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <MaterialCommunityIcons
              style={[styles.buttonIcon, { backgroundColor: "#cadc98" }]}
              name="image-multiple"
              size={30}
              color="white"
            />
            <Text style={{ color: Color.buttonSecondary }}>Foto-foto</Text>
          </TouchableOpacity>
        </View>
        {dateMark && idDate ? (
          <View style={styles.calenderContainer}>
            <Calendar
              style={styles.calender}
              markedDates={dateMark}
              onDayPress={(day) => {
                idDate.map((agenda) => {
                  if (day.dateString === agenda.date) {
                    navigation.push("Detail", {
                      idAgenda: agenda.id,
                    });
                  }
                });
              }}
            />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: Color.backgroundPrimary,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: 100,
    width: "80%",
    justifyContent: "space-between",
    marginBottom: 300,
    marginTop: 150,
  },
  title1: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  title2: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
  },
  dashboardContainer: {
    backgroundColor: "white",
    width: "90%",
    height: 200,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  buttonIcon: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 5,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  calenderContainer: {
    marginVertical: 20,
  },
  calender: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    width: 320,
  },
});

export default Home;
