import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, BackHandler, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

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

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
