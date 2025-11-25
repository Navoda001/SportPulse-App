import React from "react";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import themeConfig from "../redux/themeConfig";

export default function ItemCard({ item, onPress, onFavourite, isFav }) {
  const theme = useSelector((state) => state.theme.mode);
  const currentTheme = themeConfig[theme];
  const styles = createStyles(currentTheme, theme);

  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={styles.card}
      activeOpacity={0.9}
    >
      {/* Card Container with Gradient Border */}
      <View style={styles.cardInner}>
        <LinearGradient
          colors={theme === "dark" 
            ? ['rgba(0, 123, 255, 0.3)', 'rgba(0, 210, 106, 0.3)']
            : ['rgba(59, 130, 246, 0.4)', 'rgba(255, 159, 64, 0.4)']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBorder}
        />

        {/* Image Section */}
        <View style={styles.imageContainer}>
          {item.strThumb ? (
            <>
              <Image 
                source={{ uri: item.strThumb }} 
                style={styles.image}
                resizeMode="cover"
              />
              {/* Gradient Overlay */}
              <LinearGradient
                colors={theme === "dark"
                  ? ["transparent", "rgba(10, 26, 47, 0.9)"]
                  : ["transparent", "rgba(249, 250, 251, 0.95)"]
                }
                style={styles.imageGradient}
              />
            </>
          ) : (
            <View style={styles.noImageContainer}>
              <LinearGradient
                colors={theme === "dark" 
                  ? ['#007BFF', '#00D26A']
                  : ['#3B82F6', '#FF9F40']
                }
                style={styles.noImageGradient}
              >
                <Feather name="user" size={32} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.noImageText}>No Image</Text>
            </View>
          )}

          {/* Favorite Button on Image */}
          <TouchableOpacity 
            onPress={onFavourite} 
            style={styles.favoriteButtonTop}
            activeOpacity={0.8}
          >
            <View style={[
              styles.favoriteIconWrapper,
              isFav && styles.favoriteIconWrapperActive
            ]}>
              <Feather 
                name="heart" 
                size={18} 
                color={isFav ? "#FFFFFF" : currentTheme.text} 
                fill={isFav ? "#FFFFFF" : "transparent"}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <View style={styles.contentRow}>
            {/* Text Content */}
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {item.strPlayer || item.strTeam || "Unknown"}
              </Text>
              
              {/* Subtitle with Info */}
              {item.strNationality ? (
                <View style={styles.infoRow}>
                  <View style={styles.infoBadge}>
                    <Feather name="globe" size={12} color={currentTheme.secondaryIcon} />
                    <Text style={styles.infoText}>{item.strNationality}</Text>
                  </View>
                  {item.strPosition && (
                    <View style={styles.infoBadge}>
                      <Feather name="target" size={12} color={currentTheme.secondaryIcon} />
                      <Text style={styles.infoText}>{item.strPosition}</Text>
                    </View>
                  )}
                </View>
              ) : item.strDescriptionEN ? (
                <Text style={styles.description} numberOfLines={2}>
                  {item.strDescriptionEN.slice(0, 80)}...
                </Text>
              ) : null}

              {/* Team Badge if available */}
              {item.strTeam && (
                <View style={styles.teamBadge}>
                  <Feather name="users" size={10} color={currentTheme.secondaryIcon} />
                  <Text style={styles.teamText}>{item.strTeam}</Text>
                </View>
              )}
            </View>

            {/* Action Button */}
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={theme === "dark"
                  ? ['rgba(0, 123, 255, 0.2)', 'rgba(0, 210, 106, 0.2)']
                  : ['rgba(59, 130, 246, 0.15)', 'rgba(255, 159, 64, 0.15)']
                }
                style={styles.actionButtonGradient}
              >
                <Feather name="chevron-right" size={20} color={currentTheme.icon} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (theme, mode) => StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: theme.secondaryIcon,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: mode === "dark" ? 0.1 : 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  cardInner: {
    backgroundColor: mode === "dark" 
      ? 'rgba(10, 26, 47, 0.5)' 
      : theme.background,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: mode === "dark" ? 1 : 2,
    borderColor: mode === "dark"
      ? 'rgba(0, 123, 255, 0.2)'
      : theme.secondaryIcon + '30',
  },
  gradientBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
    backgroundColor: mode === "dark" 
      ? 'rgba(0, 0, 0, 0.3)'
      : 'rgba(107, 114, 128, 0.1)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
  },
  noImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mode === "dark"
      ? 'rgba(10, 26, 47, 0.8)'
      : 'rgba(249, 250, 251, 0.95)',
  },
  noImageGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  noImageText: {
    fontSize: 12,
    color: theme.secondaryText,
    fontWeight: '500',
  },
  favoriteButtonTop: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  favoriteIconWrapper: {
    backgroundColor: mode === "dark"
      ? 'rgba(10, 26, 47, 0.9)'
      : 'rgba(255, 255, 255, 0.95)',
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: mode === "dark"
      ? 'rgba(75, 85, 99, 0.3)'
      : 'rgba(107, 114, 128, 0.3)',
  },
  favoriteIconWrapperActive: {
    backgroundColor: '#22C55E',
    borderColor: '#00D26A',
  },
  content: {
    padding: 16,
    backgroundColor: theme.secondaryBackground,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.secondaryIcon + '15',
    borderWidth: 1,
    borderColor: theme.secondaryIcon + '30',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  infoText: {
    fontSize: 11,
    color: theme.secondaryText,
    fontWeight: '500',
  },
  description: {
    fontSize: 12,
    color: theme.secondaryText,
    lineHeight: 18,
    marginBottom: 8,
  },
  teamBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: theme.secondaryIcon + '15',
    borderWidth: 1,
    borderColor: theme.secondaryIcon + '40',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  teamText: {
    fontSize: 10,
    color: theme.secondaryIcon,
    fontWeight: '600',
  },
  actionButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: mode === "dark"
      ? 'rgba(75, 85, 99, 0.3)'
      : theme.secondaryText + '30',
  },
});