import React from "react";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "../components/ItemCard";
import { removeFavourite } from "../redux/slices/favouritesSlice";
import themeConfig from "../redux/themeConfig";

export default function FavouritesScreen({ navigation }) {
  const favourites = useSelector(s => s.favourites);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const currentTheme = themeConfig[theme];
  const styles = createStyles(currentTheme, theme);

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={currentTheme.gradient}
        style={styles.gradientBg}
      />

      {favourites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyBox}>
            {/* Empty State Illustration */}
            <View style={styles.emptyIconWrapper}>
              <LinearGradient
                colors={theme === "dark"
                  ? ['rgba(0, 123, 255, 0.2)', 'rgba(0, 210, 106, 0.2)']
                  : ['rgba(59, 130, 246, 0.2)', 'rgba(255, 159, 64, 0.2)']
                }
                style={styles.emptyIconBg}
              >
                <Feather name="heart" size={48} color={currentTheme.secondaryText} />
              </LinearGradient>
            </View>

            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptyText}>
              Start adding your favorite players{'\n'}
              to see them here
            </Text>

            {/* Action Button */}
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => navigation.navigate("Home")}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={theme === "dark"
                  ? ['#007BFF', '#00D26A']
                  : ['#3B82F6', '#FF9F40']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.emptyButtonGradient}
              >
                <Feather name="search" size={18} color="#FFFFFF" />
                <Text style={styles.emptyButtonText}>Browse Players</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.titleRow}>
              <View>
                <Text style={styles.title}>My Favorites</Text>
                <Text style={styles.subtitle}>
                  {favourites.length} player{favourites.length !== 1 ? 's' : ''} saved
                </Text>
              </View>
              
              {/* Stats Badge */}
              <View style={styles.statsBadge}>
                <LinearGradient
                  colors={theme === "dark"
                    ? ['#007BFF', '#00D26A']
                    : ['#3B82F6', '#FF9F40']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.statsBadgeGradient}
                >
                  <Feather name="heart" size={16} color="#FFFFFF" />
                  <Text style={styles.statsBadgeText}>{favourites.length}</Text>
                </LinearGradient>
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Feather name="grid" size={16} color={currentTheme.secondaryIcon} />
                </View>
                <Text style={styles.actionText}>Grid View</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Feather name="filter" size={16} color={currentTheme.icon} />
                </View>
                <Text style={styles.actionText}>Filter</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Feather name="share-2" size={16} color={currentTheme.secondaryIcon} />
                </View>
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Favorites List */}
          <FlatList
            data={favourites}
            keyExtractor={(item) => item.idPlayer || Math.random().toString()}
            renderItem={({ item }) => (
              <ItemCard
                item={item}
                onPress={() => navigation.navigate("Details", { item })}
                onFavourite={() => dispatch(removeFavourite(item))}
                isFav={true}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      )}
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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyBox: {
    alignItems: 'center',
    backgroundColor: theme.secondaryBackground,
    borderWidth: mode === "dark" ? 1 : 2,
    borderColor: mode === "dark"
      ? 'rgba(0, 123, 255, 0.2)'
      : theme.secondaryIcon + '40',
    borderRadius: 32,
    padding: 40,
    maxWidth: 360,
    shadowColor: theme.secondaryIcon,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: mode === "dark" ? 0.2 : 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  emptyIconWrapper: {
    marginBottom: 24,
  },
  emptyIconBg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.secondaryText + '40',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    color: theme.secondaryText,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  emptyButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: theme.secondaryIcon,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 14,
    gap: 10,
  },
  emptyButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerSection: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: theme.secondaryText,
  },
  statsBadge: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: theme.secondaryIcon,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  statsBadgeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  statsBadgeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.secondaryBackground,
    borderWidth: mode === "dark" ? 1 : 2,
    borderColor: theme.secondaryText + '40',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 8,
  },
  actionIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: theme.secondaryIcon + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 13,
    color: theme.text,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 20,
  },
  separator: {
    height: 12,
  },
});