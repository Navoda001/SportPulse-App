import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {/* Header Background with Gradient Border */}
      <View style={styles.headerCard}>
        <View style={styles.headerContent}>
          {/* Left Section - User Info */}
          <View style={styles.leftSection}>
            <View style={styles.avatarContainer}>
              {user?.image ? (
                <View style={styles.avatar}>
                  <Image
                    source={{ uri: user.image }}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={["transparent", "rgba(0, 123, 255, 0.3)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.avatarGradientOverlay}
                  />
                </View>
              ) : (
                <LinearGradient
                  colors={["#007BFF", "#00D26A"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.avatar}
                >
                  <Text style={styles.avatarText}>
                    {user?.username
                      ? user.username.charAt(0).toUpperCase()
                      : "S"}
                  </Text>
                </LinearGradient>
              )}
              <View style={styles.statusDot} />
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.greeting}>Welcome back</Text>
              <Text style={styles.username}>
                Hi, {user?.firstName ? user.firstName +"  "+ user.lastName : "User"}
              </Text>
            </View>
          </View>

          {/* Right Section - Actions */}
          <View style={styles.rightSection}>
            {/* Theme Toggle */}
            <TouchableOpacity
              onPress={() => dispatch(toggleTheme())}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={
                  theme === "dark"
                    ? ["rgba(24, 231, 242, 0.2)", "rgba(0, 123, 255, 0.2)"]
                    : ["rgba(0, 123, 255, 0.2)", "rgba(0, 210, 106, 0.2)"]
                }
                style={styles.iconGradient}
              >
                <Feather
                  name={theme === "dark" ? "sun" : "moon"}
                  size={20}
                  color={theme === "dark" ? "#18E7F2" : "#007BFF"}
                />
              </LinearGradient>
            </TouchableOpacity>

            {/* Notification Badge */}
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <LinearGradient
                colors={["rgba(0, 123, 255, 0.2)", "rgba(0, 210, 106, 0.2)"]}
                style={styles.iconGradient}
              >
                <Feather name="bell" size={20} color="#E5E7EB" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationText}>3</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  headerCard: {
    backgroundColor: "rgba(10, 26, 47, 0.5)",
    borderRadius: 20,
    overflow: "hidden",
  },
  gradientBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#007BFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
  },
  avatarGradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  statusDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#22C55E",
    borderWidth: 2,
    borderColor: "rgba(10, 26, 47, 0.5)",
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: "#79818dff",
    marginBottom: 2,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    position: "relative",
  },
  iconGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  notificationBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#22C55E",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(10, 26, 47, 0.5)",
  },
  notificationText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  brandSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  logoWrapper: {
    marginRight: 12,
  },
  logoGradient: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  brandName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  brandTagline: {
    fontSize: 11,
    color: "#4B5563",
    marginTop: -2,
  },
});
