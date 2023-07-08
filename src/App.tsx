import React, { useEffect, useState } from "react";
import "./App.css";
import {
  SessionLengthButton,
  SessionTime,
  ButtonComponent,
} from "./components";
import { formatTime } from "./utils";
import { Pane, PauseIcon, PlayIcon, ResetIcon } from "evergreen-ui";

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [currentTime, setCurrentTime] = useState(sessionLength * 60);
  const [countdownRunning, setCountdownRunning] = useState(false);

  const [breakLength, setBreakLength] = useState(5);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout | undefined;
    if (countdownRunning && currentTime > 0) {
      countdownInterval = setInterval(() => {
        setCurrentTime((currentTime) => currentTime - 1);
      }, 1000);
    } else if (countdownRunning && currentTime === 0) {
      if (isBreak) {
        if (currentTime === 0) {
          setCountdownRunning(false);
          setIsBreak(false);
          setCurrentTime(sessionLength * 60);
        } else {
          setCurrentTime(sessionLength * 60);
        }
      } else {
        setIsBreak((isBreak: boolean) => !isBreak);
        setCurrentTime(breakLength * 60);
      }
    }
    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [countdownRunning, currentTime, sessionLength, breakLength, isBreak]);

  const handlePause = (): void => {
    setCountdownRunning(!countdownRunning);
  };

  const handleReset = (): void => {
    setIsBreak(false);
    setCurrentTime(sessionLength * 60);
  };

  const title: string = isBreak ? "Time for a break!" : "Session Time";

  return (
    <div className="App">
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={300}
      >
        <SessionLengthButton
          title="Session Length"
          disabled={countdownRunning}
          sessionLength={sessionLength}
          onChange={(newTime: number) => {
            setSessionLength(newTime);
            setCurrentTime(newTime * 60);
          }}
        />

        <SessionLengthButton
          title="Break Length"
          sessionLength={breakLength}
          onChange={setBreakLength}
          disabled={countdownRunning}
        />
      </Pane>
      <SessionTime title={title} time={formatTime(currentTime)} />
      <Pane display="flex" justifyContent="center">
        <ButtonComponent onClick={handlePause}>
          {countdownRunning ? <PauseIcon /> : <PlayIcon />}
        </ButtonComponent>
        <ButtonComponent onClick={handleReset} disabled={countdownRunning}>
          <ResetIcon />
        </ButtonComponent>
      </Pane>
    </div>
  );
}

export default App;
