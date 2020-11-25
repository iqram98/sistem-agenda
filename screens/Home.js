import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import Color from "../constants/Color";

const Home = (props) => {
  return (
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
    </View>
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
    width: "100%",
    height: 200,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
});

export default Home;
