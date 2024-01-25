import React from "react";

const SuccessfulWordList: React.FC<string[]> = (
  successfulGuesses: string[]
) => {
  return (
    <>
      <ul className="guessList">
        {successfulGuesses.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>
    </>
  );
};

export default SuccessfulWordList;
