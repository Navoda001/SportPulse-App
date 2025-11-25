import React from "react";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "../redux/slices/favouritesSlice";
import themeConfig from "../redux/themeConfig";

const { width } = Dimensions.get('window');

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const favourites = useSelector(s => s.favourites);
  const dispatch = useDispatch();
  const isFav = !!favourites.find(p => p.idPlayer === item.idPlayer);
  const theme = useSelector((state) => state.theme.mode);
  const currentTheme = themeConfig[theme];
  const styles = createStyles(currentTheme, theme, width);

  const toggleFav = () => {
    if (isFav) dispatch(removeFavourite(item)); 
    else dispatch(addFavourite(item));
  };

  const playerInfo = [
    { label: "Nationality", value: item.strNationality, icon: "globe" },
    { label: "Position", value: item.strPosition, icon: "target" },
    { label: "Team", value: item.strTeam, icon: "users" },
    { label: "Birth Date", value: item.dateBorn, icon: "calendar" },
  ].filter(info => info.value);

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={currentTheme.gradient}
        style={styles.gradientBg}
      />

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image Section */}
        <View style={styles.heroSection}>
          {item.strThumb ? (
            <View style={styles.imageWrapper}>
              <Image 
                source={{ uri: item.strThumb }} 
                style={styles.heroImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={theme === "dark"
                  ? ['transparent', 'rgba(0, 8, 20, 0.9)']
                  : ['transparent', 'rgba(249, 250, 251, 0.95)']
                }
                style={styles.imageGradient}
              />
              
              {/* Floating Action Buttons */}
              <View style={styles.floatingActions}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                  activeOpacity={0.8}
                >
                  <View style={styles.actionButtonBg}>
                    <Feather name="arrow-left" size={20} color={currentTheme.text} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.shareButton}
                  activeOpacity={0.8}
                >
                  <View style={styles.actionButtonBg}>
                    <Feather name="share-2" size={20} color={currentTheme.text} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.noImageContainer}>
              <LinearGradient
                colors={theme === "dark"
                  ? ['#007BFF', '#00D26A']
                  : ['#3B82F6', '#FF9F40']
                }
                style={styles.noImageGradient}
              >
                <Feather name="user" size={64} color="#FFFFFF" />
              </LinearGradient>
            </View>
          )}
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Player Name & Favorite Button */}
          <View style={styles.titleSection}>
            <View style={styles.titleWrapper}>
              <Text style={styles.playerName}>
                {item.strPlayer || item.strTeam}
              </Text>
              {item.strNickname && (
                <Text style={styles.nickname}>"{item.strNickname}"</Text>
              )}
            </View>

            <TouchableOpacity 
              onPress={toggleFav}
              style={styles.favoriteButton}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={isFav 
                  ? ['#22C55E', '#00D26A']
                  : theme === "dark"
                    ? ['rgba(0, 123, 255, 0.2)', 'rgba(0, 210, 106, 0.2)']
                    : ['rgba(59, 130, 246, 0.2)', 'rgba(255, 159, 64, 0.2)']
                }
                style={styles.favoriteGradient}
              >
                <Feather 
                  name={isFav ? "heart" : "heart"} 
                  size={24} 
                  color={isFav ? "#FFFFFF" : currentTheme.text}
                  fill={isFav ? "#FFFFFF" : "transparent"}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Info Cards Grid */}
          {playerInfo.length > 0 && (
            <View style={styles.infoGrid}>
              {playerInfo.map((info, index) => (
                <View key={index} style={styles.infoCard}>
                  <View style={styles.infoIconWrapper}>
                    <Feather name={info.icon} size={18} color={currentTheme.secondaryIcon} />
                  </View>
                  <Text style={styles.infoLabel}>{info.label}</Text>
                  <Text style={styles.infoValue}>{info.value}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Description Section */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About</Text>
            <View style={styles.descriptionCard}>
              {item.strDescriptionEN ? (
                <Text style={styles.descriptionText}>
                  {item.strDescriptionEN}
                </Text>
              ) : (
                <View style={styles.noDescription}>
                  <Feather name="info" size={20} color={currentTheme.secondaryText} />
                  <Text style={styles.noDescriptionText}>
                    No description available for this player
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Additional Stats */}
          {(item.strHeight || item.strWeight) && (
            <View style={styles.statsSection}>
              <Text style={styles.sectionTitle}>Physical Stats</Text>
              <View style={styles.statsRow}>
                {item.strHeight && (
                  <View style={styles.statBox}>
                    <Feather name="trending-up" size={20} color={theme === "dark" ? "#00D26A" : "#FF9F40"} />
                    <Text style={styles.statLabel}>Height</Text>
                    <Text style={styles.statValue}>{item.strHeight}</Text>
                  </View>
                )}
                {item.strWeight && (
                  <View style={styles.statBox}>
                    <Feather name="activity" size={20} color={currentTheme.secondaryIcon} />
                    <Text style={styles.statLabel}>Weight</Text>
                    <Text style={styles.statValue}>{item.strWeight}</Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Social Links */}
          {(item.strFacebook || item.strTwitter || item.strInstagram) && (
            <View style={styles.socialSection}>
              <Text style={styles.sectionTitle}>Connect</Text>
              <View style={styles.socialButtons}>
                {item.strFacebook && (
                  <TouchableOpacity style={styles.socialButton}>
                    <Feather name="facebook" size={20} color={currentTheme.secondaryIcon} />
                  </TouchableOpacity>
                )}
                {item.strTwitter && (
                  <TouchableOpacity style={styles.socialButton}>
                    <Feather name="twitter" size={20} color={currentTheme.icon} />
                  </TouchableOpacity>
                )}
                {item.strInstagram && (
                  <TouchableOpacity style={styles.socialButton}>
                    <Feather name="instagram" size={20} color={theme === "dark" ? "#00D26A" : "#FF9F40"} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (theme, mode, width) => StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: theme.secondaryBackground,
  },
  gradientBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
    height: 400,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
  },
  floatingActions: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  shareButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionButtonBg: {
    backgroundColor: mode === "dark"
      ? 'rgba(10, 26, 47, 0.8)'
      : 'rgba(255, 255, 255, 0.95)',
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: mode === "dark" ? 1 : 2,
    borderColor: theme.secondaryText + '40',
    shadowColor: theme.secondaryIcon,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: mode === "dark" ? 0.2 : 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  noImageContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.secondaryBackground,
  },
  noImageGradient: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  titleWrapper: {
    flex: 1,
    marginRight: 16,
  },
  playerName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 4,
  },
  nickname: {
    fontSize: 16,
    color: theme.secondaryText,
    fontStyle: 'italic',
  },
  favoriteButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  favoriteGradient: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: mode === "dark" ? 1 : 2,
    borderColor: theme.secondaryText + '40',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    minWidth: (width - 52) / 2,
    backgroundColor: theme.secondaryBackground,
    borderWidth: mode === "dark" ? 1 : 2,
    borderColor: theme.secondaryIcon + '30',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: theme.secondaryIcon,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: mode === "dark" ? 0.1 : 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  infoIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.secondaryIcon + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 11,
    color: theme.secondaryText,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.text,
    textAlign: 'center',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 12,
  },
  descriptionCard: {
    backgroundColor: theme.secondaryBackground,
    borderWidth: mode === "dark" ? 1 : 2,
    borderColor: theme.secondaryIcon + '30',
    borderRadius: 16,
    padding: 20,
    shadowColor: theme.secondaryIcon,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: mode === "dark" ? 0.1 : 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  descriptionText: {
    fontSize: 14,
    color: theme.text,
    lineHeight: 22,
  },
  noDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  noDescriptionText: {
    flex: 1,
    fontSize: 14,
    color: theme.secondaryText,
  },
  statsSection: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: theme.secondaryBackground,
    borderWidth: mode === "dark" ? 1 : 2,
    borderColor: theme.secondaryIcon + '30',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: theme.secondaryIcon,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: mode === "dark" ? 0.1 : 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  statLabel: {
    fontSize: 12,
    color: theme.secondaryText,
    marginTop: 8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
  },
  socialSection: {
    marginBottom: 24,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    backgroundColor: theme.secondaryBackground,
    borderWidth: mode === "dark" ? 1 : 2,
    borderColor: theme.secondaryIcon + '30',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: theme.secondaryIcon,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: mode === "dark" ? 0.1 : 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
});