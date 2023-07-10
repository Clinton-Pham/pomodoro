import React, { useState } from "react";
import "./App.css";
import {
  SessionLengthButton,
  SessionTime,
  ButtonComponent,
} from "./components";
import { formatTime } from "./utils";
import { Pane, PauseIcon, PlayIcon, ResetIcon } from "evergreen-ui";
import { useCountdown } from "./utils/useCountdown";

function App() {
  const [sessionLength, setSessionLength] = useState(1);
  const [breakLength, setBreakLength] = useState(5);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionCounter, setSessionCounter] = useState(0);
  const { countdownRunning, currentTime, setCurrentTime, setCountdownRunning } =
    useCountdown({
      initialTime: sessionLength * 60,
      onFinish: () => {
        if (isBreak) {
          setIsBreak(false);
          setCurrentTime(sessionLength * 60);
        } else {
          setIsBreak(true);
          setCurrentTime(breakLength * 60);
          setSessionCounter(sessionCounter + 1);
        }
      },
    });

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
      <h5>You've completed {sessionCounter} sessions today!</h5>
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
