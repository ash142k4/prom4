import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen overflow-y-auto bg-gray-900 border-r border-gray-800">
      <div className="p-4">
        <div className="space-y-2">
          <Link href="/" className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
            <Image src="/images/home.png" alt="Home" width={24} height={24} />
            <span>Home</span>
          </Link>
          <Link href="/explore" className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
            <Image src="/images/explore.png" alt="Explore" width={24} height={24} />
            <span>Explore</span>
          </Link>
          <Link href="/subscriptions" className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
            <Image src="/images/subscriprion.png" alt="Subscriptions" width={24} height={24} />
            <span>Subscriptions</span>
          </Link>
        </div>

        <hr className="my-4 border-gray-800" />

        <div className="space-y-2">
          <Link href="/library" className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
            <Image src="/images/library.png" alt="Library" width={24} height={24} />
            <span>Library</span>
          </Link>
          <Link href="/history" className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
            <Image src="/images/history.png" alt="History" width={24} height={24} />
            <span>History</span>
          </Link>
          <Link href="/playlists" className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
            <Image src="/images/playlist.png" alt="Playlists" width={24} height={24} />
            <span>Playlists</span>
          </Link>
          <Link href="/messages" className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
            <Image src="/images/messages.png" alt="Messages" width={24} height={24} />
            <span>Messages</span>
          </Link>
          <Link href="/more" className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
            <Image src="/images/show-more.png" alt="Show More" width={24} height={24} />
            <span>Show More</span>
          </Link>
        </div>

        <hr className="my-4 border-gray-800" />

        <div>
          <h3 className="px-2 mb-2 text-sm font-semibold text-gray-400">SUBSCRIPTIONS</h3>
          <div className="space-y-2">
            <Link href="/channel/jack" className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
              <Image src="/images/Jack.png" alt="Jack" width={24} height={24} className="rounded-full" />
              <span>Jack</span>
            </Link>
            <Link href="/channel/simon" className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
              <Image src="/images/simon.png" alt="Simon" width={24} height={24} className="rounded-full" />
              <span>Simon</span>
            </Link>
            <Link href="/channel/tom" className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
              <Image src="/images/tom.png" alt="Tom" width={24} height={24} className="rounded-full" />
              <span>Tom</span>
            </Link>
            <Link href="/channel/megan" className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
              <Image src="/images/megan.png" alt="Megan Fox" width={24} height={24} className="rounded-full" />
              <span>Megan Fox</span>
            </Link>
            <Link href="/channel/cameron" className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
              <Image src="/images/cameron.png" alt="Cameron" width={24} height={24} className="rounded-full" />
              <span>Cameron Green</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
} 