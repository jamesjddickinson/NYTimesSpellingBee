export interface gameValues {
  centreLetter: string;
  wordList: string[];
  letters: string[];
  totalPoints: number;
}

export const defaultValues: gameValues = {
  centreLetter: "f",
  wordList: [
    "flung",
    "flux",
    "gulf",
    "flinging",
    "fluffing",
    "fluff",
    "filling",
  ],
  letters: ["g", "l", "u", "x", "i", "n"],
  totalPoints: 182,
};
