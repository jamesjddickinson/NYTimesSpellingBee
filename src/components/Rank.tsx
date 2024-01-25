import React, { useState, useEffect } from "react";
import { Points } from "../types";

const Rank: React.FC<Points> = (points: Points) => {
  const [userRank, setUserRank] = useState<string>("");

  useEffect(() => {
    if (points.userPoints) {
      const percentage = (points.userPoints / points.totalPoints) * 100;
      getUserRank(percentage);
    } else {
      getUserRank(0);
    }
  }, [points]);

  function getUserRank(percentage: number) {
    if (percentage >= 0) setUserRank("Beginner");
    if (percentage > 10) setUserRank("Moving Up");
    if (percentage > 20) setUserRank("Good");
    if (percentage > 30) setUserRank("Solid");
    if (percentage > 40) setUserRank("Nice");
    if (percentage > 50) setUserRank("Great");
    if (percentage > 60) setUserRank("Amazing");
    if (percentage > 70) setUserRank("Genius");
  }

  return (
    <>
      <span className="rank">{userRank}</span>
    </>
  );
};

export default Rank;
