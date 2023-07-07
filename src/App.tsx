import React, { useEffect, useState } from "react";
import "./App.css";
import { SessionLengthButton, SessionTime } from "./components";

function App() {
  const [sessionLength, setSessionLength] = useState(1);
  const [currentTime, setCurrentTime] = useState(sessionLength * 60);
  const [countdownRunning, setCountdownRunning] = useState(false);

  //format the current time as mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    setCurrentTime(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout | undefined;

    if (countdownRunning && currentTime > 0) {
      countdownInterval = setInterval(() => {
        setCurrentTime((currentTime) => currentTime - 1);
      }, 1000);
    } else if (countdownRunning && currentTime === 0) {
      setCountdownRunning(false);
    }

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [countdownRunning, currentTime]);

  const handlePlay = () => {
    setCountdownRunning(true);
  };
  const handlePause = () => {
    setCountdownRunning(!countdownRunning);
  };

  const handleReset = () => {
    setCurrentTime(sessionLength);
    console.log(sessionLength);
  };

  return (
    <div className="App">
      <SessionLengthButton
        sessionLength={sessionLength}
        onChange={setSessionLength}
      />
      <SessionTime time={formatTime(currentTime)} />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Rest</button>
    </div>
  );
}

export default App;
