'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface GamificationDashboardProps {
  onClose: () => void
}

interface Achievement {
  id: string
  title: string
  description: string
  points: number
  isUnlocked: boolean
}

interface Challenge {
  id: string
  title: string
  description: string
  points: number
  isActive: boolean
  isCompleted: boolean
  timeLimit?: number
}

export default function GamificationDashboard({ onClose }: GamificationDashboardProps) {
  const [activeTab, setActiveTab] = useState<'achievements' | 'challenges' | 'codes' | 'rewards'>('achievements')
  const [points, setPoints] = useState(0)
  const [level, setLevel] = useState(1)
  const [secretCode, setSecretCode] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const [debugClicks, setDebugClicks] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_video',
      title: 'First Steps',
      description: 'Watch your first video',
      points: 10,
      isUnlocked: false
    },
    {
      id: 'mood_master',
      title: 'Mood Master',
      description: 'Try all mood settings',
      points: 30,
      isUnlocked: false
    },
    {
      id: 'brainrot_30',
      title: 'Brain Melted',
      description: 'Spend 30 minutes in BrainRot mode',
      points: 50,
      isUnlocked: false
    }
  ])

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'binge_watch',
      title: 'Binge Watcher',
      description: 'Watch 3 videos in 15 minutes',
      points: 30,
      isActive: false,
      isCompleted: false,
      timeLimit: 900 // 15 minutes in seconds
    },
    {
      id: 'brainrot_challenge',
      title: 'BrainRot Champion',
      description: 'Watch in BrainRot mode for 10 minutes',
      points: 40,
      isActive: false,
      isCompleted: false,
      timeLimit: 600 // 10 minutes in seconds
    }
  ])

  // Load data from localStorage on mount
  useEffect(() => {
    const loadedPoints = localStorage.getItem('points')
    if (loadedPoints) {
      setPoints(parseInt(loadedPoints))
    }

    const loadedAchievements = localStorage.getItem('achievements')
    if (loadedAchievements) {
      setAchievements(JSON.parse(loadedAchievements))
    }

    const loadedChallenges = localStorage.getItem('challenges')
    if (loadedChallenges) {
      setChallenges(JSON.parse(loadedChallenges))
    }
  }, [])

  // Calculate level based on points
  useEffect(() => {
    setLevel(Math.floor(points / 100) + 1)
    localStorage.setItem('points', points.toString())
  }, [points])

  // Save achievements and challenges when they change
  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements))
  }, [achievements])

  useEffect(() => {
    localStorage.setItem('challenges', JSON.stringify(challenges))
  }, [challenges])

  const handleStartChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId
        ? { ...challenge, isActive: true }
        : challenge
    ))
  }

  const handleCompleteChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === challengeId && challenge.isActive) {
        setPoints(p => p + challenge.points)
        return { ...challenge, isActive: false, isCompleted: true }
      }
      return challenge
    }))
  }

  const handleRedeemCode = () => {
    const validCodes: Record<string, { points: number, description: string }> = {
      'BRAINROT2025': { points: 50, description: 'You discovered the BrainRot code!' },
      'MOODMASTER': { points: 30, description: 'You mastered all moods!' },
      'SECRETVIDEO': { points: 40, description: 'You found the secret video!' }
    }

    const code = secretCode.toUpperCase()
    const redeemedCodes = JSON.parse(localStorage.getItem('redeemedCodes') || '[]')

    if (validCodes[code]) {
      if (redeemedCodes.includes(code)) {
        setMessage('You have already redeemed this code')
        setMessageType('error')
      } else {
        setPoints(p => p + validCodes[code].points)
        setMessage(`${validCodes[code].description} +${validCodes[code].points} points!`)
        setMessageType('success')
        localStorage.setItem('redeemedCodes', JSON.stringify([...redeemedCodes, code]))
      }
    } else {
      setMessage('Invalid code')
      setMessageType('error')
    }

    setSecretCode('')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleDebugClick = () => {
    const now = Date.now()
    if (now - lastClickTime < 500) {
      // Only count rapid clicks
      const newClicks = debugClicks + 1
      setDebugClicks(newClicks)
      
      if (newClicks >= 10) {
        setPoints(points + 100)
        setDebugClicks(0)
        setMessage('Debug: Added 100 points!')
        setMessageType('success')
        setTimeout(() => setMessage(''), 3000)
      }
    } else {
      // Reset click counter if too slow
      setDebugClicks(1)
    }
    setLastClickTime(now)
  }

  const renderPremiumRewardStatus = () => {
    if (level >= 10) {
      return (
        <div className="bg-gradient-to-r from-yellow-600 to-red-600 p-4 rounded-lg text-white">
          <h3 className="font-bold text-xl mb-2">🎉 Congratulations!</h3>
          <p className="mb-3">You've reached Level 10 and unlocked one month of YouTube Premium for free!</p>
          <button className="bg-white text-red-600 font-bold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">
            Claim Your Premium
          </button>
        </div>
      )
    } else {
      const progressPercent = (level / 10) * 100
      return (
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold text-xl mb-2">🏆 YouTube Premium Reward</h3>
          <p className="mb-3">Reach Level 10 to unlock one month of YouTube Premium for free!</p>
          <div className="w-full h-4 bg-gray-600 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-yellow-500 transition-all duration-300" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-300 text-right">Progress: Level {level}/10</p>
        </div>
      )
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 
              className="text-2xl font-bold" 
              onClick={handleDebugClick}
              style={{ userSelect: 'none' }}
            >
              Your Gaming Progress
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Points and Level */}
          <div className="bg-gray-700 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-300">Level {level}</p>
                <p className="text-2xl font-bold">{points} points</p>
                {debugClicks > 0 && debugClicks < 10 && (
                  <p className="text-xs text-gray-400 mt-1">Debug: {debugClicks}/10</p>
                )}
              </div>
              <div className="w-32 h-2 bg-gray-600 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${(points % 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Premium Reward Banner */}
          <div className="mb-6">
            {renderPremiumRewardStatus()}
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'achievements'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab('achievements')}
            >
              Achievements
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'challenges'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab('challenges')}
            >
              Challenges
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'codes'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab('codes')}
            >
              Secret Codes
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'rewards'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab('rewards')}
            >
              Rewards
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            {activeTab === 'achievements' && (
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      achievement.isUnlocked
                        ? 'border-green-500 bg-gray-700'
                        : 'border-gray-600 bg-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-gray-300">
                          {achievement.description}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-blue-400">
                        +{achievement.points} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'challenges' && (
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      challenge.isCompleted
                        ? 'border-green-500 bg-gray-700'
                        : challenge.isActive
                        ? 'border-blue-500 bg-gray-700'
                        : 'border-gray-600 bg-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{challenge.title}</h3>
                        <p className="text-sm text-gray-300">
                          {challenge.description}
                        </p>
                      </div>
                      {!challenge.isCompleted && (
                        <button
                          onClick={() => 
                            challenge.isActive 
                              ? handleCompleteChallenge(challenge.id)
                              : handleStartChallenge(challenge.id)
                          }
                          className={`px-4 py-2 rounded-lg text-white transition-colors ${
                            challenge.isActive
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          {challenge.isActive ? 'Complete' : 'Start'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'codes' && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-gray-600 bg-gray-700">
                  <h3 className="font-medium mb-2">Redeem Secret Code</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={secretCode}
                      onChange={(e) => setSecretCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button 
                      onClick={handleRedeemCode}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Redeem
                    </button>
                  </div>
                  {message && (
                    <p className={`mt-2 text-sm ${
                      messageType === 'success' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'rewards' && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-red-600 bg-gray-700">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xl">🏆</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">YouTube Premium - 1 Month Free</h3>
                      <p className="text-sm text-gray-300">Reach Level 10 to unlock</p>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <h4 className="text-sm font-medium mb-1">Premium Benefits:</h4>
                    <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                      <li>Ad-free videos</li>
                      <li>Background play</li>
                      <li>Download videos for offline viewing</li>
                      <li>Access to YouTube Music Premium</li>
                    </ul>
                  </div>
                  <div className="mt-3">
                    <button 
                      className={`w-full py-2 rounded-lg transition-colors ${
                        level >= 10 
                          ? 'bg-red-600 hover:bg-red-700 text-white' 
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={level < 10}
                    >
                      {level >= 10 ? 'Claim Now' : `Unlock at Level 10 (Current: ${level})`}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 