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
  console.log(process.env.NODE_ENV);
  let key = "";
  if (process.env.NODE_ENV === "development") {
    key = "NOKEY";
  } else {
    key = process.env.REACT_APP_STEAM_KEY || "NOKEY";
  }

  useEffect(() => {
    console.log("here");
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/" +
          "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" +
          key +
          "&steamid=" +
          player1 +
          "&format=json"
      )
      .then(r => {
        console.log(r);
        setUserData(r.data.response);
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
        <button onClick={() => setPlayer1("76561197960434622")}>
          NO CLICKY
        </button>
        <button onClick={() => console.log(userData)}>CONSOLE</button>
        <button
          onClick={() =>
            setUserData({
              games_count: 2,
              games: [
                {
                  appid: 10,
                  playtime_forever: 32,
                  playtime_windows_forever: 0,
                  playtime_mac_forever: 0,
                  playtime_linux_forever: 0
                },
                {
                  appid: 11,
                  playtime_forever: 32,
                  playtime_windows_forever: 0,
                  playtime_mac_forever: 0,
                  playtime_linux_forever: 0
                }
              ]
            })
          }
        >
          Change data
        </button>
        <p>Games Count:{userData.games_count}</p>

        {userData.games.map(game => (
          <p key={game.appid}>ID: {game.appid}</p>
        ))}
      </div>
    </div>
  );
}
