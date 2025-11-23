import axios from "axios";

export async function getPlayers(team) {
  try {
    const res = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=${encodeURIComponent(team)}`
    );
    return res.data && res.data.player ? res.data.player : [];
  } catch (error) {
    console.warn("sportsApi.getPlayers error", error.message);
    return [];
  }
}

export default getPlayers;
