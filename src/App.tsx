import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import {
  SessionLengthControl,
  SessionTime,
  ButtonComponent
} from './components'
import { formatTime } from './utils'
import { Pane, PauseIcon, PlayIcon, ResetIcon } from 'evergreen-ui'
import { useCountdown } from './hooks/useCountdown'
import soundFile from './audio/alarm-clock-short-6402.mp3'

const App = () => {
  const [sessionLength, setSessionLength] = useState(0)
  const [breakLength, setBreakLength] = useState(5)
  const [isBreak, setIsBreak] = useState(false)
  const [sessionCounter, setSessionCounter] = useState(0)
  const [playAlarm, setPlayAlarm] = useState(false)
  const audioRef = useRef(new Audio(soundFile))

  useEffect(() => {
    if (playAlarm) {
      void audioRef.current.play()
    } else {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [playAlarm])

  const { countdownRunning, currentTime, setCurrentTime, setCountdownRunning } =
    useCountdown({
      initialTime: sessionLength * 60,
      onFinish: () => {
        if (isBreak) {
          setIsBreak(false)
          setCurrentTime(sessionLength * 60)
          setSessionCounter(sessionCounter + 1)
        } else {
          setIsBreak(true)
          setCurrentTime(breakLength * 60)
        }
        setPlayAlarm(true)
      }
    })

  const handlePause = (): void => {
    setCountdownRunning(!countdownRunning)
    setPlayAlarm(false)
  }

  const handleReset = (): void => {
    setIsBreak(false)
    setPlayAlarm(false)
    setCurrentTime(sessionLength * 60)
  }

  const title: string = isBreak ? 'Time for a break!' : 'Session Time'

  return (
    <div className="App">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h5>You've completed {sessionCounter} sessions today!</h5>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={300}
      >
        <SessionLengthControl
          title="Session Length"
          disabled={countdownRunning}
          sessionLength={sessionLength}
          onChange={(newTime: number) => {
            setSessionLength(newTime)
            if (!isBreak) {
              setCurrentTime(newTime * 60)
            }
          }}
        />

        <SessionLengthControl
          title="Break Length"
          sessionLength={breakLength}
          onChange={(newTime: number) => {
            setBreakLength(newTime)
            if (isBreak) {
              setCurrentTime(newTime * 60)
            }
          }}
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
  )
}

export default App
