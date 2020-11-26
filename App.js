import React, { useEffect } from "react";
import { StyleSheet, View, Text, BackHandler } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import Color from "./constants/Color";
import Login from "./screens/Login";
import Splash from "./screens/Splash";
import Home from "./screens/Home";
import History from "./screens/History";
import Profil from "./screens/Profil";
import Main from "./screens/Main";
import NotificationScreen from "./screens/Notifications";
import Detail from "./screens/Detail";
import { DrawerContent } from "./components/DrawerContent";
import { DataProvider } from "./components/DataContext";

const HomeStack = createStackNavigator();
const MainNav = createStackNavigator();

const MainStack = () => (
  <MainNav.Navigator
    initialRouteName="Main"
    screenOptions={{ headerShown: false }}
  >
    <MainNav.Screen name="Main" component={Main} />
  </MainNav.Navigator>
);

const BottomTab = createMaterialBottomTabNavigator();

const Keluar = (props) => {
  useEffect(() => {
    props.navigation.navigate("Home");
    BackHandler.exitApp();
  });
  return <View></View>;
};

const BackHome = (props) => {
  useEffect(() => {
    props.navigation.navigate("Home");
  });
  return <View></View>;
};

const BottomTabStack = () => (
  <BottomTab.Navigator
    initialRouteName="Main"
    activeColor={Color.buttonPrimary}
    inactiveColor={Color.buttonSecondary}
    barStyle={{ backgroundColor: "white" }}
    backBehavior="initialRoute"
  >
    <BottomTab.Screen
      name="BackHome"
      component={BackHome}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <BottomTab.Screen
      name="Main"
      component={MainStack}
      options={{
        tabBarLabel: "Main",
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="clipboard-list" size={24} color={color} />
        ),
      }}
    />
    <BottomTab.Screen
      name="History"
      component={History}
      options={{
        tabBarLabel: "History",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="history" color={color} size={26} />
        ),
      }}
    />
    <BottomTab.Screen
      name="Profil"
      component={Profil}
      options={{
        tabBarLabel: "Profil",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="account-circle"
            color={color}
            size={26}
          />
        ),
      }}
    />
    <BottomTab.Screen
      name="Keluar"
      options={{
        tabBarLabel: "Keluar",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="logout" size={24} color={color} />
        ),
      }}
      component={Keluar}
    />
  </BottomTab.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerStack = () => (
  <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen name="Main" component={BottomTabStack} />
    <HomeStack.Screen name="Home" component={Home} />
  </Drawer.Navigator>
);

export default function App() {
  useEffect(() => {
    this.getPushNotificationPermissions();
  });
  getPushNotificationPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }
    console.log(finalStatus);

    // Get the token that uniquely identifies this device
    console.log(
      "Notification Token: ",
      await Notifications.getExpoPushTokenAsync()
    );
  };
  return (
    <DataProvider>
      <NavigationContainer>
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
          <HomeStack.Screen name="Splash" component={Splash} />
          <HomeStack.Screen name="Login" component={Login} />
          <HomeStack.Screen name="Main" component={DrawerStack} />
          <HomeStack.Screen
            name="Notifications"
            component={NotificationScreen}
          />
          <HomeStack.Screen name="Detail" component={Detail} />
        </HomeStack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
