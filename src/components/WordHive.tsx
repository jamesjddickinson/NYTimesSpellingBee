import React from "react";
import { Hive } from "../types";
import hexagonYellow from "../assets/hexagonYellow.svg";
import hexagonGrey from "../assets/hexagonGrey.svg";

const WordHive: React.FC<Hive> = (hive: Hive, pressTile) => {
  function letterTiles() {
    return hive.letters.map((letter, index) => (
      <div className="hive-cell" key={letter} id={"cell" + index}>
        <div
          className="hive-cell-content"
          onClick={() => {
            pressTile(letter);
          }}
        >
          <img src={hexagonGrey} alt="hexagon" className="hexagon" />
          <span className="cell-letter">{letter}</span>
        </div>
      </div>
    ));
  }

  function centreLetterTile() {
    return (
      <div className="hive-cell" id="cell6">
        <div
          className="hive-cell-content"
          onClick={() => {
            pressTile(hive.centre);
          }}
        >
          <img src={hexagonYellow} alt="hexagon" className="hexagon" />
          <span className="cell-letter">{hive.centre}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="hive">
      {centreLetterTile()}
      {letterTiles()}
    </div>
  );
};

export default WordHive;
