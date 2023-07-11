import type React from 'react'
import { useEffect, useState } from 'react'

interface IUseCountDownProps {
  initialTime: number
  onFinish: () => void
}

interface ICountDown {
  countdownRunning: boolean
  currentTime: number
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>
  setCountdownRunning: React.Dispatch<React.SetStateAction<boolean>>
}

export const useCountdown = ({ initialTime, onFinish }: IUseCountDownProps): ICountDown => {
  const [countdownRunning, setCountdownRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(initialTime)

  useEffect(() => {
    let countDownInterval: NodeJS.Timeout | undefined
    if (countdownRunning && currentTime > 0) {
      countDownInterval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (countdownRunning && currentTime === 0) {
      setCountdownRunning(false)
      onFinish()
    }
    return () => {
      if (countDownInterval != null) {
        clearInterval(countDownInterval)
      }
    }
  }, [countdownRunning, currentTime, onFinish])
  return { countdownRunning, currentTime, setCurrentTime, setCountdownRunning }
}
