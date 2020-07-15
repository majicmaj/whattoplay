import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [player1, setPlayer1] = useState("76561197960434622");
  const [userData, setUserData] = useState({
    games_count: 0,
    games: [
      {
        appid: 10,
        playtime_forever: 32,
        playtime_windows_forever: 0,
        playtime_mac_forever: 0,
        playtime_linux_forever: 0
      }
    ]
  });
  let key = "";
  if (process.env.NODE_ENV === "development") {
    key = process.env.REACT_APP_STEAM_KEY || "NOKEYDEV";
  } else {
    key = process.env.REACT_APP_STEAM_KEY || "NOKEY";
  }

  useEffect(() => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/" +
          "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=" +
          key +
          "&vanityurl=userVanityUrlName=" +
          "/EnergeticGaming"
      )
      .then(r => console.log(r.data));
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/" +
          "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=" +
          key +
          "&steamid=" +
          player1 +
          "&format=json"
      )
      .then(r => {
        console.log(r.data.response);
        if (r.data.response.games !== undefined) {
          setUserData(r.data.response);
        } else {
          console.error("games data returned undefined");
        }
        console.log("returned!");
      })
      .catch(err => {
        console.error("error: " + err);
      });
  }, [key, player1]);

  return (
    <div className="App">
      <div className="player">
        <h1>player 1:</h1>
        <p>version: 4</p>
        <p>id: {player1}</p>

        <button onClick={() => console.log(userData)}>CONSOLE</button>
        <p>Games Count:{userData.games_count}</p>

        {userData.games.map(game => (
          <p key={game.appid}>ID: {game.appid}</p>
        ))}
      </div>
    </div>
  );
}
