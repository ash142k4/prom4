'use client'

import { useState } from 'react'

interface MoodBarProps {
  onMoodChange: (mood: string | null) => void
}

export default function MoodBar({ onMoodChange }: MoodBarProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  
  const moods = [
    { name: 'Happy', emoji: '😊', color: 'bg-yellow-500' },
    { name: 'Sad', emoji: '😢', color: 'bg-blue-500' },
    { name: 'Tired', emoji: '😴', color: 'bg-purple-500' },
    { name: 'Chill', emoji: '😎', color: 'bg-green-500' },
    { name: 'Study', emoji: '📚', color: 'bg-red-500' }
  ]
  
  const handleMoodSelect = (mood: string) => {
    const newMood = selectedMood === mood ? null : mood
    setSelectedMood(newMood)
    onMoodChange(newMood)
  }
  
  return (
    <div className="flex items-center bg-gray-800 rounded-full px-2 py-1 mx-2">
      {moods.map((mood) => (
        <button
          key={mood.name}
          onClick={() => handleMoodSelect(mood.name)}
          className={`flex items-center justify-center mx-1 p-1 rounded-full transition-all ${
            selectedMood === mood.name 
              ? `${mood.color} transform scale-110` 
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          title={`${mood.name} mood`}
        >
          <span className="text-lg">{mood.emoji}</span>
        </button>
      ))}
      {selectedMood && (
        <button 
          onClick={() => handleMoodSelect(selectedMood)}
          className="ml-1 text-xs text-gray-400 hover:text-white"
          title="Clear mood filter"
        >
          ✕
        </button>
      )}
    </div>
  )
} 