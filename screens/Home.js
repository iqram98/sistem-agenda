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

import Color from "../constants/Color";
import { DataContext } from "../components/DataContext";

const Home = (props) => {
  const [datas, setDatas, dataUser, setDataUser, notif, setNotif] = useContext(
    DataContext
  );

  const [invite, setInvite] = useState(null);
  const [vote, setVote] = useState(null);
  const [dateMark, setDateMark] = useState(null);

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
    if (!dateMark && datas) {
      let mark = {};
      datas.map((data) => {
        mark[data.waktu_agenda.slice(0, 10)] = { marked: true };
      });
      setDateMark(mark);
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
              style={styles.buttonIcon}
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
              style={styles.buttonIcon}
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
              style={styles.buttonIcon}
              name="list-alt"
              size={30}
              color="white"
            />
            <Text style={{ color: Color.buttonSecondary }}>Agenda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <MaterialCommunityIcons
              style={styles.buttonIcon}
              name="image-multiple"
              size={30}
              color="white"
            />
            <Text style={{ color: Color.buttonSecondary }}>Foto-foto</Text>
          </TouchableOpacity>
        </View>
        {dateMark ? (
          <View style={styles.calenderContainer}>
            <Calendar style={styles.calender} markedDates={dateMark} />
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
    backgroundColor: Color.buttonTertiary,
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
