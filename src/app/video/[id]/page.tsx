'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { videos } from '@/data/videos'
import type { Video } from '@/data/videos'
import SleepTimer from '@/components/SleepTimer'

export default function VideoPage({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<Video | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [videoError, setVideoError] = useState<string | null>(null)
  const [forceCount, setForceCount] = useState(3)
  const [forceTooltipVisible, setForceTooltipVisible] = useState(false)
  const [hasUsedForceOnChannel, setHasUsedForceOnChannel] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
    const foundVideo = videos.find(v => v.id === params.id)
    setVideo(foundVideo || null)
    
    setVideoError(null)
    
    try {
      const savedForces = localStorage.getItem('remainingForces')
      setForceCount(savedForces ? parseInt(savedForces) : 3)
      
      if (foundVideo) {
        const forcedChannels = JSON.parse(localStorage.getItem('forcedChannels') || '[]')
        setHasUsedForceOnChannel(forcedChannels.includes(foundVideo.channel))
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error)
    }
    
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Auto-play prevented:', error)
        setVideoError('Auto-play was prevented. Please press play to start the video.')
      })
    }
  }, [params.id])

  const handleTimerEnd = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-50'
      notification.textContent = 'Sleep timer ended - Video paused'
      document.body.appendChild(notification)
      
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 3000)
    }
  }
  
  const handleSuggestedVideoClick = (videoId: string) => {
    router.push(`/video/${videoId}`)
  }
  
  const handleVideoError = (error: any) => {
    console.error('Video playback error:', error)
    setVideoError('Error playing video: The video file might be missing or corrupted.')
  }

  const useForce = () => {
    if (hasUsedForceOnChannel || forceCount <= 0 || !video) return
    
    try {
      const updatedForces = forceCount - 1
      setForceCount(updatedForces)
      localStorage.setItem('remainingForces', updatedForces.toString())
      
      const forcedChannels = JSON.parse(localStorage.getItem('forcedChannels') || '[]')
      localStorage.setItem('forcedChannels', JSON.stringify([...forcedChannels, video.channel]))
      setHasUsedForceOnChannel(true)
      
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50'
      notification.textContent = `Force sent to ${video.channel}! You have ${updatedForces} forces left this week.`
      document.body.appendChild(notification)
      
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 3000)
    } catch (error) {
      console.error('Error updating localStorage:', error)
    }
  }

  if (!isClient || !video) {
    return <div className="p-4 text-gray-200">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4 relative">
            {video.videoUrl ? (
              <>
                <video 
                  ref={videoRef} 
                  controls 
                  autoPlay 
                  className="w-full h-full"
                  onError={handleVideoError}
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {videoError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="text-white text-center p-4">
                      <p className="mb-2">{videoError}</p>
                      <div className="text-xs text-gray-400">
                        Debug info: Attempted to load '{video.videoUrl}'
                      </div>
                      {video.youtubeId && (
                        <button 
                          onClick={() => router.refresh()}
                          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Try YouTube Embed Instead
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : video.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <p className="mb-2">No video source available</p>
                  <Image 
                    src={video.thumbnail}
                    alt={video.title}
                    width={480}
                    height={270}
                    className="mx-auto rounded-lg"
                  />
                </div>
              </div>
            )}
            
            <div className="absolute bottom-16 right-4 z-20 sm:bottom-4">
              <SleepTimer onTimerEnd={handleTimerEnd} />
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2 text-white">{video.title}</h1>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Image
                src={video.channelImage}
                alt={video.channel}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h3 className="font-medium text-white">{video.channel}</h3>
                <p className="text-sm text-gray-400">
                  {video.views} views • {video.timestamp}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-sm text-gray-300">
                <Image src="/images/like.png" alt="Like" width={20} height={20} />
                <span>{video.likes || '0'}</span>
              </button>
              <button className="flex items-center space-x-1 text-sm text-gray-300">
                <Image src="/images/dislike.png" alt="Dislike" width={20} height={20} />
                <span>{video.dislikes || '0'}</span>
              </button>
              
              <div className="relative">
                <button 
                  className={`flex items-center space-x-1 text-sm rounded-lg px-3 py-1 transition-colors ${
                    hasUsedForceOnChannel 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                      : forceCount <= 0
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                  onClick={useForce}
                  onMouseEnter={() => setForceTooltipVisible(true)}
                  onMouseLeave={() => setForceTooltipVisible(false)}
                  disabled={hasUsedForceOnChannel || forceCount <= 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                  <span>Force</span>
                  
                  <span className="ml-1 text-xs bg-yellow-500 text-black font-bold px-1.5 py-0.5 rounded-full">NEW</span>
                </button>
                
                {forceTooltipVisible && (
                  <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-30">
                    <p className="mb-1 font-semibold">Force Creator to Upload</p>
                    <p className="text-xs text-gray-300 mb-2">
                      Send a request to the creator to upload a new video soon!
                    </p>
                    <p className="text-xs text-gray-400">
                      {hasUsedForceOnChannel 
                        ? `Already used on ${video.channel}'s channel` 
                        : `${forceCount}/3 forces left this week`}
                    </p>
                    <div className="absolute bottom-0 left-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                  </div>
                )}
              </div>
              
              <button className="flex items-center space-x-1 text-sm text-gray-300">
                <Image src="/images/share.png" alt="Share" width={20} height={20} />
                <span>Share</span>
              </button>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
            <p className="whitespace-pre-wrap">{video.description}</p>
            {video.tags && (
              <div className="mt-4 flex flex-wrap gap-2">
                {video.tags.map(tag => (
                  <span key={tag} className="text-blue-400 text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium mb-4 text-gray-300">Suggested Videos</h3>
          <div className="bg-gray-800 rounded-lg p-2">
            {videos
              .filter(v => v.id !== video.id)
              .slice(0, 6)
              .map(suggestedVideo => (
                <div
                  key={suggestedVideo.id}
                  onClick={() => handleSuggestedVideoClick(suggestedVideo.id)}
                  className="flex space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors mb-2 cursor-pointer"
                >
                  <div className="relative w-40 h-24 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={suggestedVideo.thumbnail}
                      alt={suggestedVideo.title}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-5 h-5">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-medium text-sm line-clamp-2 text-gray-200">
                      {suggestedVideo.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">{suggestedVideo.channel}</p>
                    <p className="text-xs text-gray-400">
                      {suggestedVideo.views} views • {suggestedVideo.timestamp}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
} 