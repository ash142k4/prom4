'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { videos } from '@/data/videos'
import { useMemo } from 'react'

interface VideoListProps {
  currentMood: string | null
}

export default function VideoList({ currentMood }: VideoListProps) {
  const router = useRouter()
  
  const filteredVideos = useMemo(() => {
    if (!currentMood) return videos
    
    return videos.filter(video => 
      video.moods?.includes(currentMood)
    )
  }, [currentMood])
  
  if (filteredVideos.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-400">No videos match the selected mood</p>
        <p className="text-gray-500 mt-2">Try selecting a different mood</p>
      </div>
    )
  }
  
  const handleVideoClick = (videoId: string) => {
    router.push(`/video/${videoId}`)
  }
  
  return (
    <>
      {currentMood && (
        <div className="mb-6 px-2">
          <h2 className="text-xl font-semibold text-white mb-2">
            {currentMood} Mood
          </h2>
          <p className="text-gray-400">
            Showing {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} for {currentMood} mood
          </p>
        </div>
      )}
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <div 
            key={video.id} 
            className="flex flex-col bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer" 
            onClick={() => handleVideoClick(video.id)}
          >
            <div className="relative aspect-video">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover"
                priority={video.id === 'video-1'}
              />
              {video.moods && (
                <div className="absolute bottom-2 right-2 flex space-x-1">
                  {video.moods.map(mood => {
                    let emoji = "😊"
                    switch(mood) {
                      case "Happy": emoji = "😊"; break;
                      case "Sad": emoji = "😢"; break;
                      case "Tired": emoji = "😴"; break;
                      case "Chill": emoji = "😎"; break;
                      case "Study": emoji = "📚"; break;
                    }
                    return (
                      <span 
                        key={mood} 
                        className="text-sm bg-black bg-opacity-60 rounded-full w-6 h-6 flex items-center justify-center"
                        title={`${mood} mood`}
                      >
                        {emoji}
                      </span>
                    )
                  })}
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-8 h-8">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <Image
                    src={video.channelImage}
                    alt={video.channel}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <div className="font-medium line-clamp-2 text-gray-200">
                    {video.title}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{video.channel}</p>
                  <p className="text-sm text-gray-400">
                    {video.views} views • {video.timestamp}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
} 