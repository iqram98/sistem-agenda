import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DataContext } from "./DataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DrawerContent = (props) => {
  const [datas, setDatas, dataUser, setDataUser] = useContext(DataContext);

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("@storage_Key");
      props.navigation.replace("Login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: `https://i.imgur.com/${dataUser[0].photo}`,
                }}
                size={50}
                style={{ backgroundColor: "white" }}
              />
              <View style={{ marginLeft: 15 }}>
                <Title style={styles.title}>
                  {dataUser[0].first_name} {dataUser[0].last_name}
                </Title>
                <Caption style={styles.caption}>{dataUser[0].email}</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              )}
              label="Home"
              onPress={() => props.navigation.navigate("Home")}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="calendar"
                  color={color}
                  size={size}
                />
              )}
              label="Agenda"
              onPress={() =>
                props.navigation.navigate("Main", {
                  screen: "Main",
                  params: {
                    screen: "Main",
                    params: {
                      screen: "Agenda",
                    },
                  },
                })
              }
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-group"
                  color={color}
                  size={size}
                />
              )}
              label="Undangan"
              onPress={() =>
                props.navigation.navigate("Main", {
                  screen: "Main",
                  params: {
                    screen: "Main",
                    params: {
                      screen: "Undangan",
                    },
                  },
                })
              }
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="vote-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Vote"
              onPress={() =>
                props.navigation.navigate("Main", {
                  screen: "Main",
                  params: {
                    screen: "Main",
                    params: {
                      screen: "E-Vote",
                    },
                  },
                })
              }
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label="Sign Out"
          onPress={removeValue}
        />
      </Drawer.Section>
    </View>
  );
};
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderColor: "#f4f4f4",
    borderWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
