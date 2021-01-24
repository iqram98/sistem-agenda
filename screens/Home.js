import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler,
  Alert,
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

  const [calendarData, setCalendarData] = useState(null);
  const [invite, setInvite] = useState(null);
  const [vote, setVote] = useState(null);
  const [dateMark, setDateMark] = useState(null);
  const [idDate, setidDate] = useState(null);

  useEffect(() => {
    if (!calendarData) {
      Axios.get(
        `https://api.simleg-dprdsulteng.com/index.php/invite?user_invite=${dataUser[0].id}`
      ).then((res) => {
        setInvite(res.data);
      });
      Axios.get(
        `https://api.simleg-dprdsulteng.com/index.php/vote?user_vote=${dataUser[0].id}`
      ).then((res) => {
        setVote(res.data);
      });
    }

    if (!calendarData && invite && vote) {
      let newData = []
        .concat(invite, vote)
        .sort((a, b) => a.id_agenda - b.id_agenda);
      setCalendarData(newData);
    }
    if (!idDate && !dateMark && calendarData) {
      let mark = {};
      let dateAndId = [];
      calendarData.map((data) => {
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
    <ScrollView style={{ flex: 1, backgroundColor: Color.backgroundPrimary }}>
      <View style={styles.home}>
        <StatusBar style="light" />
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <Image
                source={{
                  uri: `https://i.imgur.com/${dataUser[0].photo}`,
                }}
                style={styles.imageUser}
              />
            </TouchableOpacity>
            <Image
              source={{
                uri: "https://simleg-dprdsulteng.com/assets/images/logo-sm.png",
              }}
              style={styles.logo}
            />
          </View>
          <View style={styles.textContainer}>
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
                    reset: "reset",
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
                    reset: "reset",
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
                    reset: "reset",
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
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => props.navigation.navigate("HasilKegiatan")}
          >
            <MaterialCommunityIcons
              style={[styles.buttonIcon, { backgroundColor: "#cadc98" }]}
              name="image-multiple"
              size={30}
              color="white"
            />
            <Text style={{ color: Color.buttonSecondary, textAlign: "center" }}>
              Hasil Kegiatan
            </Text>
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
                    navigation.push("Main");
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
    marginBottom: 100,
    marginTop: 50,
  },
  title1: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  title2: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  dashboardContainer: {
    backgroundColor: "white",
    width: "90%",
    height: 150,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 20,
    paddingTop: 30,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    width: "20%",
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
  imageUser: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Home;
