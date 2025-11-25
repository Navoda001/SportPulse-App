import React from "react";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import themeConfig from "../redux/themeConfig";

export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const currentTheme = themeConfig[theme];
  const styles = createStyles(currentTheme, theme);

  return (
    <View style={styles.container}>
      {/* Header Background with Gradient Border */}
      <View style={styles.headerCard}>
        <LinearGradient
          colors={theme === "dark" 
            ? ['rgba(0, 123, 255, 0.2)', 'rgba(0, 210, 106, 0.2)']
            : ['rgba(59, 130, 246, 0.3)', 'rgba(255, 159, 64, 0.3)']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBorder}
        />
        
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
                    colors={theme === "dark"
                      ? ["transparent", "rgba(0, 123, 255, 0.3)"]
                      : ["transparent", "rgba(59, 130, 246, 0.2)"]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.avatarGradientOverlay}
                  />
                </View>
              ) : (
                <LinearGradient
                  colors={theme === "dark"
                    ? ["#007BFF", "#00D26A"]
                    : ["#3B82F6", "#FF9F40"]
                  }
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
                Hi, {user?.firstName ? user.firstName + " " + user.lastName : "User"}
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
                colors={theme === "dark"
                  ? ["rgba(24, 231, 242, 0.2)", "rgba(0, 123, 255, 0.2)"]
                  : ["rgba(255, 223, 186, 0.3)", "rgba(255, 159, 64, 0.2)"]
                }
                style={styles.iconGradient}
              >
                <Feather
                  name={theme === "dark" ? "sun" : "moon"}
                  size={20}
                  color={currentTheme.icon}
                />
              </LinearGradient>
            </TouchableOpacity>

            {/* Notification Badge */}
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <LinearGradient
                colors={theme === "dark"
                  ? ["rgba(0, 123, 255, 0.2)", "rgba(0, 210, 106, 0.2)"]
                  : ["rgba(59, 130, 246, 0.2)", "rgba(255, 159, 64, 0.2)"]
                }
                style={styles.iconGradient}
              >
                <Feather name="bell" size={20} color={currentTheme.secondaryIcon} />
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

const createStyles = (theme, mode) => StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  headerCard: {
    backgroundColor: theme.secondaryBackground,
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: 16,
    shadowColor: theme.secondaryIcon,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: mode === "dark" ? 0.2 : 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: mode === "dark" ? 1 : 2,
    borderColor: mode === "dark" 
      ? 'rgba(0, 123, 255, 0.2)'
      : theme.secondaryIcon + '20',
  },
  gradientBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
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
    shadowColor: theme.secondaryIcon,
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
    borderColor: theme.secondaryBackground,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: theme.secondaryText,
    marginBottom: 2,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.text,
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
    borderColor: mode === "dark"
      ? "rgba(75, 85, 99, 0.3)"
      : theme.secondaryText + '30',
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
    borderColor: theme.secondaryBackground,
  },
  notificationText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});