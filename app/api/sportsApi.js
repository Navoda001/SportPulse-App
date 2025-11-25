import axios from "axios";

// Search for team by name
export async function searchTeam(teamName) {
  try {
    const res = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(teamName)}`
    );
    return res.data && res.data.teams ? res.data.teams : [];
  } catch (error) {
    console.warn("sportsApi.searchTeam error", error.message);
    return [];
  }
}

// Get players by team ID
export async function getPlayersByTeamId(teamId) {
  try {
    const res = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/3/lookup_all_players.php?id=${teamId}`
    );
    return res.data && res.data.player ? res.data.player : [];
  } catch (error) {
    console.warn("sportsApi.getPlayersByTeamId error", error.message);
    return [];
  }
}

// search team and get players
export async function getPlayers(teamName) {
  try {
    const teams = await searchTeam(teamName);
    
    if (teams.length === 0) {
      console.warn(`No team found for: ${teamName}`);
      return [];
    }
    const teamId = teams[0].idTeam;
    const players = await getPlayersByTeamId(teamId);
    return players;
  } catch (error) {
    console.warn("sportsApi.getPlayers error", error.message);
    return [];
  }
}

export default getPlayers;
