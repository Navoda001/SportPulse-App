import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Platform } from "react-native";
import DetailsScreen from "../screens/DetailsScreen";
import FavouritesScreen from "../screens/FavouriteScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#00D26A",
        tabBarInactiveTintColor: "#79818dff",
        tabBarStyle: {
          backgroundColor: "#0A1A2F",
          borderTopWidth: 1,
          borderTopColor: "rgba(0, 123, 255, 0.2)",
          height: Platform.OS === "ios" ? 88 : 65,
          paddingBottom: Platform.OS === "ios" ? 28 : 10,
          paddingTop: 10,
          elevation: 0,
          shadowColor: "#007BFF",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          letterSpacing: 0.3,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = "home";
          if (route.name === "Home") iconName = "home";
          if (route.name === "Favourites") iconName = "heart";
          if (route.name === "Profile") iconName = "user";

          return (
            <View style={[
              styles.iconContainer,
              focused && styles.iconContainerActive
            ]}>
              <Feather 
                name={iconName} 
                size={focused ? 24 : 22} 
                color={color}
              />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          );
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen 
        name="Favourites" 
        component={FavouritesScreen}
        options={{
          tabBarLabel: "Favorites",
          tabBarBadge: undefined, // You can add badge count here dynamically
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const theme = useSelector(state => state.theme.mode);
  const isAuthenticated = useSelector(state => state.auth.user);

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        contentStyle: {
          backgroundColor: "#000814"
        },
        animation: "fade_from_bottom",
      }}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{
              animation: "fade",
            }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{
              animation: "slide_from_right",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen 
            name="Home" 
            component={Tabs}
            options={{
              animation: "fade",
            }}
          />
          <Stack.Screen 
            name="Details" 
            component={DetailsScreen}
            options={{
              animation: "slide_from_right",
              presentation: "card",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 36,
    borderRadius: 12,
  },
  iconContainerActive: {
    backgroundColor: "rgba(0, 210, 106, 0.1)",
  },
  activeIndicator: {
    position: "absolute",
    borderRadius: 2,
    backgroundColor: "#00D26A",
  },
});