'use client'

import { useState, useEffect } from 'react'

interface SleepTimerProps {
  onTimerEnd: () => void
}

export default function SleepTimer({ onTimerEnd }: SleepTimerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [timerMinutes, setTimerMinutes] = useState(15)
  const [timeLeft, setTimeLeft] = useState(0)

  // Handle timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (isActive && timeLeft === 0) {
      setIsActive(false)
      onTimerEnd()
    }

    return () => clearInterval(interval)
  }, [isActive, timeLeft, onTimerEnd])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const startTimer = () => {
    setTimeLeft(timerMinutes * 60)
    setIsActive(true)
    setIsOpen(false)
  }

  const cancelTimer = () => {
    setIsActive(false)
    setTimeLeft(0)
  }

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('.sleep-timer-container')) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const presetTimes = [5, 15, 30, 60, 90]

  return (
    <div className="sleep-timer-container relative z-10">
      {/* Timer Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-300 text-sm hover:text-white px-3 py-1 rounded-full bg-black bg-opacity-70 hover:bg-opacity-90 transition-all shadow-lg"
      >
        <span className="mr-1">⏰</span>
        {isActive ? (
          <span>
            {formatTime(timeLeft)}
          </span>
        ) : (
          <span>Sleep Timer</span>
        )}
      </button>

      {/* Timer Settings Popup */}
      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-20 w-64 p-4">
          <h3 className="text-white font-medium mb-3">Set Sleep Timer</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {presetTimes.map(mins => (
              <button
                key={mins}
                onClick={() => setTimerMinutes(mins)}
                className={`px-3 py-1 rounded ${
                  timerMinutes === mins 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                } transition-colors`}
              >
                {mins} min
              </button>
            ))}
          </div>
          
          <div className="flex mb-3">
            <input
              type="range"
              min="1"
              max="120"
              value={timerMinutes}
              onChange={e => setTimerMinutes(parseInt(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
          
          <div className="text-center mb-4 text-white">
            <span className="text-lg font-bold">{timerMinutes}</span> minutes
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={startTimer}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Start Timer
            </button>
          </div>
        </div>
      )}
      
      {/* Active Timer Indicator */}
      {isActive && !isOpen && (
        <div className="absolute top-full right-0 mt-1">
          <button
            onClick={cancelTimer}
            className="px-3 py-1 bg-red-600 text-white rounded-full text-xs hover:bg-red-700 transition-colors shadow-lg"
          >
            Cancel Timer
          </button>
        </div>
      )}
    </div>
  )
} 