import React from "react";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import themeConfig from "../redux/themeConfig";

export default function ProfileScreen({ navigation }) {
  const user = useSelector((s) => s.auth.user);
  const favourites = useSelector((s) => s.favourites);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const currentTheme = themeConfig[theme];
  const styles = createStyles(currentTheme, theme);

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace("Login");
  };

  const profileStats = [
    { label: "Favorites", value: favourites.length, icon: "heart" },
    { label: "Teams", value: "5", icon: "users" },
    { label: "Days Active", value: "24", icon: "calendar" },
  ];

  const settingsOptions = [
    { label: "Edit Profile", icon: "edit-2" },
    { label: "Notifications", icon: "bell" },
    { label: "Privacy", icon: "shield" },
    { label: "Help & Support", icon: "help-circle" },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={currentTheme.gradient} style={styles.gradientBg} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <LinearGradient
            colors={theme === "dark"
              ? ["rgba(0, 123, 255, 0.2)", "rgba(0, 210, 106, 0.2)"]
              : ["rgba(59, 130, 246, 0.3)", "rgba(255, 159, 64, 0.3)"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cardGradientBorder}
          />

          <View style={styles.profileHeader}>
            <View style={styles.avatarWrapper}>
              {user?.image ? (
                <View style={styles.profileAvatar}>
                  <Image
                    source={{ uri: user.image }}
                    style={styles.profileAvatarImage}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={theme === "dark"
                      ? ["transparent", "rgba(0, 123, 255, 0.3)"]
                      : ["transparent", "rgba(59, 130, 246, 0.2)"]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.profileAvatarGradientOverlay}
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
                  style={styles.profileAvatar}
                >
                  <Text style={styles.avatarText}>
                    {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
                  </Text>
                </LinearGradient>
              )}
              <View style={styles.editBadge}>
                <Feather name="camera" size={14} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {user?.firstName + " " + user?.lastName || "Guest User"}
              </Text>
              <Text style={styles.profileEmail}>
                {user?.email || "No email provided"}
              </Text>
              <View style={styles.idBadge}>
                <Feather name="hash" size={12} color={currentTheme.secondaryText} />
                <Text style={styles.idText}>{user?.username || "Guest User"}</Text>
              </View>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            {profileStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={styles.statIconWrapper}>
                  <Feather name={stat.icon} size={18} color={currentTheme.secondaryIcon} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <View style={styles.settingsCard}>
            {settingsOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.settingItem,
                  index !== settingsOptions.length - 1 && styles.settingItemBorder,
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.settingLeft}>
                  <View style={styles.settingIcon}>
                    <Feather name={option.icon} size={18} color={currentTheme.secondaryIcon} />
                  </View>
                  <Text style={styles.settingLabel}>{option.label}</Text>
                </View>
                <Feather name="chevron-right" size={20} color={currentTheme.secondaryText} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIconPremium}>
                  <Feather name="star" size={18} color="#FFC107" />
                </View>
                <Text style={styles.settingLabel}>Upgrade to Premium</Text>
              </View>
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>PRO</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logoutButton}
          activeOpacity={0.8}
        >
          <View style={styles.logoutContent}>
            <Feather name="log-out" size={20} color="#FFFFFF" />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>SportPulse v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2025 All rights reserved</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (theme, mode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.secondaryBackground,
    paddingTop: 50,
  },
  gradientBg: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: theme.secondaryBackground,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: mode === "dark" ? 1 : 2,
    borderColor: theme.secondaryIcon + '30',
    overflow: "hidden",
    shadowColor: theme.secondaryIcon,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: mode === "dark" ? 0.2 : 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  cardGradientBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.secondaryIcon,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  profileAvatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  profileAvatarGradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.secondaryIcon,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: theme.secondaryBackground,
  },
  profileInfo: {
    alignItems: "center",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: theme.secondaryText,
    marginBottom: 8,
  },
  idBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.secondaryText + '30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  idText: {
    fontSize: 12,
    color: theme.secondaryText,
    fontWeight: "600",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.secondaryIcon + '10',
    borderWidth: mode === "dark" ? 1 : 2,
    borderColor: theme.secondaryIcon + '30',
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  statIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.secondaryIcon + '20',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: theme.secondaryText,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  settingsCard: {
    backgroundColor: theme.secondaryBackground,
    borderRadius: 20,
    borderWidth: mode === "dark" ? 1 : 2,
    borderColor: theme.secondaryIcon + '30',
    overflow: "hidden",
    shadowColor: theme.secondaryIcon,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: mode === "dark" ? 0.15 : 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.secondaryText + '20',
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.secondaryIcon + '20',
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingIconPremium: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 193, 7, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 15,
    color: theme.text,
    fontWeight: "500",
  },
  premiumBadge: {
    backgroundColor: "#FFC107",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  premiumText: {
    fontSize: 11,
    fontWeight: "bold",
    color: mode === "dark" ? "#000814" : "#1F2937",
  },
  logoutButton: {
    backgroundColor: "rgba(239, 68, 68, 0.5)",
    borderWidth: mode === "dark" ? 1 : 2,
    borderColor: "rgba(239, 68, 68, 0.5)",
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
  },
  logoutContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  appInfo: {
    alignItems: "center",
    paddingVertical: 20,
  },
  appVersion: {
    fontSize: 12,
    color: theme.secondaryText,
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 11,
    color: theme.secondaryText,
  },
});