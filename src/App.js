import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [player1, setPlayer1] = useState("282795444");
  const key = process.env.KEY || "NOKEY";

  useEffect(
    () => () => {
      console.log(player1);
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/" +
            "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" +
            key +
            "&steamid=" +
            player1 +
            "&format=json",
          { mode: "no-cors" }
        )
        .then(r => console.log(r))
        .catch(err => {
          console.error("error: " + err);
        });
    },
    [key, player1]
  );

  return (
    <div className="App">
      <div className="player">
        <h1>player 1:</h1>
        <p>id: {player1}</p>
        <button onClick={() => setPlayer1("282795444")} />
      </div>
    </div>
  );
}
