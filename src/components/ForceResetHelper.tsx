'use client'

import { useState, useEffect } from 'react'

/**
 * Development helper to reset force allocations for testing
 * In production, this would be managed by a backend cron job
 */
export default function ForceResetHelper() {
  // Tracks if tooltip should be shown
  const [showTip, setShowTip] = useState(false)
  
  // Keeps track of when forces were last reset
  const [lastResetTime, setLastResetTime] = useState<string | null>(null)
  
  // Load last reset time on component mount
  useEffect(() => {
    // Try to get the stored timestamp
    try {
      const timestamp = localStorage.getItem('lastForceReset')
      if (timestamp) {
        setLastResetTime(timestamp)
      }
    } catch (err) {
      // Just log and continue if there's an error
      console.log('Could not load reset time:', err)
    }
  }, [])
  
  // Handle reset button click
  function resetForces() {
    try {
      // Give user 3 fresh forces
      localStorage.setItem('remainingForces', '3')
      
      // Clear list of channels that have been forced
      localStorage.setItem('forcedChannels', '[]')
      
      // Record when we did the reset
      const currentTime = new Date().toLocaleString()
      localStorage.setItem('lastForceReset', currentTime)
      setLastResetTime(currentTime)
      
      // Show confirmation message
      const message = document.createElement('div')
      message.className = 'fixed top-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50'
      message.textContent = 'Your forces have been reset! You now have 3 forces for the week.'
      document.body.appendChild(message)
      
      // Remove message after a delay
      setTimeout(() => {
        document.body.removeChild(message)
      }, 3000)
    } catch (err) {
      console.log('Reset failed:', err)
    }
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {/* Reset button */}
        <button
          className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs px-3 py-2 rounded-full shadow-lg transition-colors flex items-center space-x-1"
          onClick={resetForces}
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
          </svg>
          <span>Reset Weekly Forces</span>
        </button>
        
        {/* Info tooltip */}
        {showTip && (
          <div className="absolute bottom-full right-0 mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg w-48">
            <p>Reset your 3 weekly forces for testing purposes.</p>
            {lastResetTime && (
              <p className="text-gray-400 mt-1">Last reset: {lastResetTime}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 