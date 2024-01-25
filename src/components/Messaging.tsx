import React from "react";

const Messaging: React.FC<string> = (message: string) => {
  const colour: string = message ? "black" : "white";

  return (
    <>
      <div className="message-box">
        <p className="message" style={{ background: colour }}>
          {message}
        </p>
      </div>
    </>
  );
};

export default Messaging;
