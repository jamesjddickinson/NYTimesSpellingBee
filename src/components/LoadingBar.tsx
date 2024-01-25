import React, { useEffect } from "react";
import { Points } from "../types";

const LoadingBar: React.FC<Points> = (points: Points) => {
  useEffect(() => {
    if (points.userPoints) {
      const percentage: number = (points.userPoints / points.totalPoints) * 100;
      const elem = document.getElementById("myBar");
      if (elem) elem.style.width = percentage + "%";
    }
  }, [points]);

  return (
    <>
      <div className="myProgress">
        <div className="myBar" id="myBar">
          <div className="circle">{points.userPoints}</div>
        </div>
      </div>
    </>
  );
};

export default LoadingBar;
