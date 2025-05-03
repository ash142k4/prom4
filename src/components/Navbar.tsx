'use client'

import Image from 'next/image'
import Link from 'next/link'
import MoodBar from './MoodBar'

interface NavbarProps {
  onGamificationClick: () => void
  onMoodChange: (mood: string | null) => void
}

export default function Navbar({ onGamificationClick, onMoodChange }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-800 rounded-full">
          <Image src="/images/menu.png" alt="Menu" width={24} height={24} />
        </button>
        <Link href="/" className="flex items-center">
          <div className="text-white text-xl font-bold">
            <span className="text-white">You</span>
            <span className="text-red-600">Tube</span>
          </div>
        </Link>
      </div>

      <div className="flex items-center flex-1 max-w-4xl mx-4">
        <div className="flex items-center flex-1">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-l-full focus:outline-none focus:border-blue-500"
          />
          <button className="px-6 py-2 bg-gray-700 border border-gray-700 border-l-0 rounded-r-full hover:bg-gray-600">
            <Image src="/images/search.png" alt="Search" width={20} height={20} />
          </button>
        </div>
        <button className="p-2 ml-4 hover:bg-gray-800 rounded-full">
          <Image src="/images/voice-search.png" alt="Voice Search" width={24} height={24} />
        </button>
        
        <MoodBar onMoodChange={onMoodChange} />
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-800 rounded-full">
          <Image src="/images/upload.png" alt="Upload" width={24} height={24} />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-full">
          <Image src="/images/more.png" alt="More" width={24} height={24} />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-full">
          <Image src="/images/notification.png" alt="Notifications" width={24} height={24} />
        </button>
        <button 
          onClick={onGamificationClick}
          className="px-4 py-2 text-white bg-blue-700 rounded-full hover:bg-blue-800"
        >
          🏆
        </button>
        <Image 
          src="/images/nilava.jpeg" 
          alt="Profile" 
          width={32} 
          height={32}
          className="rounded-full"
        />
      </div>
    </nav>
  )
} 