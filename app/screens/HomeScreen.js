import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { getPlayers } from "../api/sportsApi";
import Header from "../components/Header";
import ItemCard from "../components/ItemCard";
import { addFavourite, removeFavourite } from "../redux/slices/favouritesSlice";
import themeConfig from "../redux/themeConfig";

export default function HomeScreen({ navigation }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const favourites = useSelector((s) => s.favourites);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const currentTheme = themeConfig[theme];

  const fetchPlayers = async () => {
    if (!team.trim()) {
      setHasSearched(false);
      setPlayers([]);
      return;
    }
    
    setLoading(true);
    setHasSearched(true);
    const data = await getPlayers(team);
    setPlayers(data);
    setLoading(false);
  };

  useEffect(() => {
    if (team.trim()) {
      const delaySearch = setTimeout(() => {
        fetchPlayers();
      }, 500);

      return () => clearTimeout(delaySearch);
    } else {
      setHasSearched(false);
      setPlayers([]);
    }
  }, [team]);

  const handleQuickSearch = (teamName) => {
    setTeam(teamName);
  };

  const toggleFav = (player) => {
    const exists = favourites.find((p) => p.idPlayer === player.idPlayer);
    if (exists) dispatch(removeFavourite(player));
    else dispatch(addFavourite(player));
  };

  const styles = createStyles(currentTheme, theme);

  return (
    <View style={styles.container}>
      <LinearGradient colors={currentTheme.gradient} style={styles.gradientBg} />

      <Header />

      <View style={styles.searchSection}>
        <View style={styles.searchHeader}>
          <Text style={styles.searchTitle}>Discover Players</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statBadge}>
              <Text style={styles.statNumber}>{players.length}</Text>
              <Text style={styles.statLabel}>Players</Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statNumber}>{favourites.length}</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchInputWrapper,
              searchFocused && styles.searchInputFocused,
            ]}
          >
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search team (e.g., Arsenal, Barcelona)"
              placeholderTextColor={currentTheme.secondaryText}
              value={team}
              onChangeText={setTeam}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {team.length > 0 && (
              <TouchableOpacity
                onPress={() => setTeam("")}
                style={styles.clearButton}
              >
                <Text style={styles.clearText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.chipsContainer}>
          {["Arsenal", "Barcelona", "Real Madrid", "Manchester United"].map(
            (teamName) => (
              <TouchableOpacity
                key={teamName}
                onPress={() => handleQuickSearch(teamName)}
                style={[styles.chip, team === teamName && styles.chipActive]}
              >
                <Text
                  style={[
                    styles.chipText,
                    team === teamName && styles.chipTextActive,
                  ]}
                >
                  {teamName}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={currentTheme.secondaryIcon} />
            <Text style={styles.loadingText}>Loading players...</Text>
          </View>
        </View>
      ) : !hasSearched ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
          <View style={styles.emptyContainer}>
            <View style={styles.emptyBox}>
              <View style={styles.emptyIconWrapper}>
                <View style={styles.emptyIconBg}>
                  <Feather name="search" size={48} color={currentTheme.secondaryIcon} />
                </View>
              </View>
              <Text style={styles.emptyTitle}>Start Your Search</Text>
              <Text style={styles.emptyText}>
                Enter a team name above or select{"\n"}
                from popular teams below to discover players
              </Text>

              <View style={styles.popularTeamsWrapper}>
                <Text style={styles.popularTeamsLabel}>Popular Teams:</Text>
                <View style={styles.popularTeamsGrid}>
                  {["Arsenal", "Barcelona", "Real Madrid", "Manchester United"].map(
                    (teamName) => (
                      <TouchableOpacity
                        key={teamName}
                        onPress={() => handleQuickSearch(teamName)}
                        style={styles.popularTeamButton}
                      >
                        <Text style={styles.popularTeamText}>{teamName}</Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : players.length === 0 ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
          <View style={styles.emptyContainer}>
            <View style={styles.emptyBox}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyTitle}>No Players Found</Text>
              <Text style={styles.emptyText}>
                No players found for "{team}"{"\n"}
                Try searching for a different team
              </Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => handleQuickSearch("Arsenal")}
              >
                <LinearGradient
                  colors={theme === "dark" ? ["#007BFF", "#007BFF"] : ["#3B82F6", "#3B82F6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.emptyButtonGradient}
                >
                  <Text style={styles.emptyButtonText}>Try Arsenal</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.listContainer}>
          <Text style={styles.resultsText}>
            {players.length} player{players.length !== 1 ? "s" : ""} found for {team}
          </Text>

          <FlatList
            data={players}
            keyExtractor={(item) =>
              item.idPlayer || item.idTeam || Math.random().toString()
            }
            renderItem={({ item }) => (
              <ItemCard
                item={item}
                onPress={() => navigation.navigate("Details", { item })}
                onFavourite={() => toggleFav(item)}
                isFav={!!favourites.find((p) => p.idPlayer === item.idPlayer)}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
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
  },
  gradientBg: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  searchHeader: {
    marginBottom: 20,
  },
  searchTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.secondaryIcon,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statBadge: {
    backgroundColor: theme.secondaryIcon + "20",
    borderWidth: 1,
    borderColor: theme.secondaryIcon + "40",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.secondaryIcon,
  },
  statLabel: {
    fontSize: 12,
    color: theme.secondaryText,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.secondaryBackground,
    borderWidth: 2,
    borderColor: theme.secondaryText + "50",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInputFocused: {
    borderColor: theme.secondaryIcon,
    backgroundColor: theme.secondaryIcon + "10",
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.text,
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.secondaryText + "40",
    justifyContent: "center",
    alignItems: "center",
  },
  clearText: {
    color: theme.text,
    fontSize: 14,
    fontWeight: "bold",
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: theme.secondaryBackground,
    borderWidth: 2,
    borderColor: theme.secondaryText + "50",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: "#00D26A" + "20",
    borderColor: "#00D26A",
  },
  chipText: {
    fontSize: 13,
    color: theme.text,
    fontWeight: "500",
  },
  chipTextActive: {
    color: "#00D26A",
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  loadingBox: {
    backgroundColor: theme.secondaryBackground,
    borderWidth: 2,
    borderColor: theme.secondaryIcon + "40",
    borderRadius: 24,
    padding: 40,
    alignItems: "center",
    shadowColor: theme.secondaryIcon,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: theme.text,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop:40,
    
  },
  emptyBox: {
    backgroundColor: theme.secondaryBackground,
    borderWidth: 2,
    borderColor: theme.secondaryIcon + "40",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    maxWidth: 400,
    shadowColor: theme.secondaryIcon,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  emptyIconWrapper: {
    marginBottom: 24,
    alignItems: 'center',
  },
  emptyIconBg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.secondaryIcon + '40',
    backgroundColor: theme.secondaryIcon + '20',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    color: theme.secondaryText,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  popularTeamsWrapper: {
    width: '100%',
    marginTop: 8,
  },
  popularTeamsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  popularTeamsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    width: '100%',
  },
  popularTeamButton: {
    backgroundColor: theme.secondaryIcon,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    minWidth: '42%',
    alignItems: 'center',
    shadowColor: theme.secondaryIcon,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  popularTeamText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  emptyButton: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: theme.secondaryIcon,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyButtonGradient: {
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  emptyButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsText: {
    fontSize: 14,
    color: theme.secondaryText,
    marginBottom: 12,
    fontWeight: "500",
  },
  listContent: {
    paddingBottom: 20,
  },
});