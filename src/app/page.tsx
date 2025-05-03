'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import VideoList from '@/components/VideoList'
import GamificationDashboard from '@/components/GamificationDashboard'

export default function Home() {
  const [showGamification, setShowGamification] = useState(false)
  const [currentMood, setCurrentMood] = useState<string | null>(null)

  const handleMoodChange = (mood: string | null) => {
    setCurrentMood(mood)
    
    // If we had localStorage available, we could save user preferences
    // try {
    //   if (mood) {
    //     localStorage.setItem('lastMood', mood)
    //   } else {
    //     localStorage.removeItem('lastMood')
    //   }
    // } catch (error) {
    //   console.error('Error saving mood to localStorage', error)
    // }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar 
        onGamificationClick={() => setShowGamification(true)} 
        onMoodChange={handleMoodChange}
      />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-4 overflow-auto">
          <VideoList currentMood={currentMood} />
        </main>
      </div>

      {showGamification && (
        <GamificationDashboard 
          onClose={() => setShowGamification(false)}
        />
      )}
    </div>
  )
}
