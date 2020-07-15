import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [player1, setPlayer1] = useState("282795444");
  const key = process.env.KEY || "NOKEY";
  getUser = id => {
    console.log(id);
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/" +
          "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" +
          key +
          "&steamid=" +
          id +
          "&format=json",
        { mode: "no-cors" }
      )
      .then(r => console.log(r))
      .catch(err => {
        console.error("error: " + err);
      });
  };
  useEffect(() => getUser(player1), [player1]);

  return (
    <div className="App">
      <div className="player">
        <h1>player 1:</h1>
        <p>id: {player1}</p>
      </div>
    </div>
  );
}
