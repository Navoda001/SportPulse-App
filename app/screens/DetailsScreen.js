import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "../redux/slices/favouritesSlice";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const favourites = useSelector(s => s.favourites);
  const dispatch = useDispatch();
  const isFav = !!favourites.find(p => p.idPlayer === item.idPlayer);

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
        colors={['#0A1A2F', '#000814']}
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
                colors={['transparent', 'rgba(0, 8, 20, 0.9)']}
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
                    <Feather name="arrow-left" size={20} color="#E5E7EB" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.shareButton}
                  activeOpacity={0.8}
                >
                  <View style={styles.actionButtonBg}>
                    <Feather name="share-2" size={20} color="#E5E7EB" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.noImageContainer}>
              <LinearGradient
                colors={['#007BFF', '#00D26A']}
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
                  : ['rgba(0, 123, 255, 0.2)', 'rgba(0, 210, 106, 0.2)']
                }
                style={styles.favoriteGradient}
              >
                <Feather 
                  name={isFav ? "heart" : "heart"} 
                  size={24} 
                  color={isFav ? "#FFFFFF" : "#E5E7EB"}
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
                    <Feather name={info.icon} size={18} color="#007BFF" />
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
                  <Feather name="info" size={20} color="#79818dff" />
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
                    <Feather name="trending-up" size={20} color="#00D26A" />
                    <Text style={styles.statLabel}>Height</Text>
                    <Text style={styles.statValue}>{item.strHeight}</Text>
                  </View>
                )}
                {item.strWeight && (
                  <View style={styles.statBox}>
                    <Feather name="activity" size={20} color="#007BFF" />
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
                    <Feather name="facebook" size={20} color="#007BFF" />
                  </TouchableOpacity>
                )}
                {item.strTwitter && (
                  <TouchableOpacity style={styles.socialButton}>
                    <Feather name="twitter" size={20} color="#18E7F2" />
                  </TouchableOpacity>
                )}
                {item.strInstagram && (
                  <TouchableOpacity style={styles.socialButton}>
                    <Feather name="instagram" size={20} color="#00D26A" />
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#000814',
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
    backgroundColor: 'rgba(10, 26, 47, 0.8)',
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(75, 85, 99, 0.3)',
  },
  noImageContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 26, 47, 0.5)',
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
    color: '#FFFFFF',
    marginBottom: 4,
  },
  nickname: {
    fontSize: 16,
    color: '#79818dff',
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
    borderWidth: 1,
    borderColor: 'rgba(75, 85, 99, 0.3)',
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
    backgroundColor: 'rgba(10, 26, 47, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(0, 123, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  infoIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 11,
    color: '#79818dff',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E5E7EB',
    textAlign: 'center',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  descriptionCard: {
    backgroundColor: 'rgba(10, 26, 47, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(0, 123, 255, 0.2)',
    borderRadius: 16,
    padding: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: '#E5E7EB',
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
    color: '#79818dff',
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
    backgroundColor: 'rgba(10, 26, 47, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(0, 123, 255, 0.2)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#79818dff',
    marginTop: 8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    backgroundColor: 'rgba(10, 26, 47, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(0, 123, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
});