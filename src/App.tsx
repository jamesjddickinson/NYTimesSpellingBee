import React, { useEffect, useState } from "react";
import LoadingBar from "./components/LoadingBar";
import WordHive from "./components/WordHive";
import Messaging from "./components/Messaging";
import SuccessfulWordList from "./components/SuccessfulWordList";
import Rank from "./components/Rank";
import "./App.css";
import { Points, Hive } from "./types";
import { defaultValues } from "./config/defaultValues";

const App: React.FC = () => {
  const [messaging, setMessaging] = useState<string>("");
  const [centre, setCentre] = useState<string>("");
  const [letters, setLetters] = useState<string[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [wordList, setWordList] = useState<string[]>([
    "You have found 0 words",
  ]);
  const [input, setInput] = useState<string>("");
  const [successfulGuesses, setSuccessfulGuesses] = useState<string[]>([]);
  const [userPoints, setUserPoints] = useState<number>(0);

  useEffect(() => {
    getSpellingBee();
    getLocalStorage();
  }, []);

  function getSpellingBee() {
    fetch("https://freebee.fun/cgi-bin/today", { mode: "no-cors" })
      .then((res) => res.json())
      .then((res) => {
        setCentre(res.center);
        setWordList(res.wordlist);
        setLetters([...res.letters]);
        setTotalPoints(res.total);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        setCentre(defaultValues.centreLetter);
        setWordList(defaultValues.wordList);
        setLetters([...defaultValues.letters]);
        setTotalPoints(defaultValues.totalPoints);
      });
  }

  function getLocalStorage() {
    const successfulGuessesLS = localStorage.getItem("successfulGuesses");
    const totalPointsLS = localStorage.getItem("totalPoints");
    const userPointsLS = localStorage.getItem("userPoints");
    if (!successfulGuessesLS || !totalPointsLS || !userPointsLS) return;
    // if (totalPoints === parseInt(totalPointsLS!)) {
    setSuccessfulGuesses(JSON.parse(successfulGuessesLS!));
    setUserPoints(parseInt(userPointsLS!));
    // }
  }

  useEffect(() => {
    const setLocalStorage = () => {
      localStorage.setItem("userPoints", String(userPoints));
      localStorage.setItem(
        "successfulGuesses",
        JSON.stringify(successfulGuesses)
      );
      localStorage.setItem("totalPoints", JSON.stringify(totalPoints));
    };

    if (successfulGuesses.length > 0) {
      setLocalStorage();
    }
  }, [successfulGuesses, totalPoints, userPoints]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === "backspace") deleteLetter();
      if (key === "enter" && input.length > 0) checkGuess();
      if (key.length === 1 && key >= "a" && key <= "z") pressTile(key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      /*removes event listener on cleanup*/
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value.toUpperCase());
    setMessaging("");
  };

  function checkGuess() {
    const lowerInput = input.toLowerCase();
    setInput("");
    setTimeout(() => {
      setMessaging("");
    }, 2000);
    if (!isValidGuess(lowerInput)) return;
    const newSuccessfulGuesses = [...successfulGuesses, lowerInput].sort();
    setSuccessfulGuesses(newSuccessfulGuesses);
    const successMessage: string = containsEveryLetter()
      ? "Pangram!"
      : "Success!";
    setMessaging(successMessage);
    calculatePoints(lowerInput);
  }

  function isValidGuess(input: string) {
    if (input.length < 4) {
      setMessaging("Too short");
      return;
    }
    if (!input.includes(centre)) {
      setMessaging("Missing centre letter");
      return;
    }
    if (!wordList.includes(input)) {
      setMessaging("Not in word list");
      return;
    }
    if (successfulGuesses.includes(input)) {
      setMessaging("You've already guessed that");
      return;
    }
    return true;
  }

  function calculatePoints(input: string) {
    if (input.length === 4) {
      setUserPoints(userPoints + 1);
      return;
    }
    if (containsEveryLetter()) {
      setUserPoints(userPoints + input.length + 7);
      return;
    }
    setUserPoints(userPoints + input.length);
  }

  function containsEveryLetter() {
    const totalLettersArray = [...letters, centre];
    const inputArray = [...input.toLowerCase()];
    return (
      totalLettersArray.filter(function (each) {
        return inputArray.indexOf(each) === -1;
      }).length === 0
    );
  }

  function shuffle() {
    const shuffle = [...letters].sort(() => Math.random() - 0.5);
    setLetters(shuffle);
  }

  function deleteLetter() {
    setInput(input.slice(0, -1));
  }

  function pressTile(letter: String) {
    setInput(input + letter.toUpperCase());
  }

  let points: Points = {
    totalPoints: totalPoints,
    userPoints: userPoints,
  };

  let hive: Hive = {
    centre: centre,
    letters: letters,
  };

  return (
    <>
      <div className="App">
        <div className="progressArea">
          {Rank(points)}
          {LoadingBar(points)}
        </div>
        {SuccessfulWordList(successfulGuesses)}
        {Messaging(messaging)}
        <input placeholder="Enter word" value={input} />
        {WordHive(hive, pressTile)}
        <div className="hive-actions">
          <button
            className="hive-action"
            onClick={() => {
              deleteLetter();
            }}
          >
            Delete
          </button>
          <button
            className="hive-action"
            onClick={() => {
              shuffle();
            }}
          >
            Shuffle
          </button>
          <button
            className="hive-action"
            onClick={() => {
              checkGuess();
            }}
          >
            Enter
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
