export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  youtubeId?: string;
  channel: string;
  channelImage: string;
  views: string;
  timestamp: string;
  likes?: string;
  dislikes?: string;
  tags?: string[];
  moods?: string[];
}

export const videos: Video[] = [
  {
    id: 'video-1',
    title: 'Indian boy singing "Gulabi Aankhein" on streets of Jaipur!!',
    description: "Here's a video of me performing 'Gulabi Aankhein' at GT Central in Jaipur, Rajasthan.",
    thumbnail: '/images/thumbnail1.png',
    videoUrl: '/images/thumbnail2 video.mp4',
    channel: 'Tron Wilder',
    channelImage: '/images/thumbnail1-owner.jpg',
    views: '355,728',
    timestamp: 'Sep 9, 2019',
    likes: '18K',
    dislikes: '257',
    tags: ['gulabiaankhein', 'busking', 'reactions'],
    moods: ['Happy', 'Chill']
  },
  {
    id: 'video-2',
    title: 'Street Performance in Jaipur - Amazing Crowd Reaction!',
    description: 'Watch this incredible street performance that got everyone talking!',
    thumbnail: '/images/thumbnail2.png',
    channel: 'Ava',
    channelImage: '/images/nilava.jpeg',
    views: '2.5k',
    timestamp: '2 days ago',
    moods: ['Happy', 'Chill']
  },
  {
    id: 'video-3',
    title: 'Top 10 Travel Destinations in India 2024',
    description: 'Explore the most beautiful places in India this year.',
    thumbnail: '/images/thumbnail3.png',
    channel: 'Avalin',
    channelImage: '/images/nilava.jpeg',
    views: '15k',
    timestamp: '1 week ago',
    moods: ['Chill', 'Study']
  },
  {
    id: 'video-9',
    title: 'Elon Musk and TATA - The Future of Innovation',
    description: 'An in-depth look at how these industry giants are shaping our future.',
    thumbnail: '/images/thumbnail9.png',
    channel: 'Tech Insights',
    channelImage: '/images/nilava.jpeg',
    views: '50k',
    timestamp: '3 days ago',
    moods: ['Study', 'Chill']
  },
  {
    id: 'video-12',
    title: 'Morning Routine of Successful Entrepreneurs',
    description: 'Learn the habits that make successful people tick.',
    thumbnail: '/images/thumbnail12.png',
    channel: 'Success Daily',
    channelImage: '/images/nilava.jpeg',
    views: '25k',
    timestamp: '5 days ago',
    moods: ['Study', 'Tired']
  },
  {
    id: 'video-4',
    title: 'Relaxing Music for Stress Relief',
    description: 'Calm your mind with this peaceful melody.',
    thumbnail: '/images/thumbnail4.png',
    channel: 'Meditation Music',
    channelImage: '/images/nilava.jpeg',
    views: '120k',
    timestamp: '2 weeks ago',
    moods: ['Tired', 'Sad', 'Chill']
  },
  {
    id: 'video-5',
    title: 'Comedy Sketch: When Life Gives You Lemons',
    description: 'A hilarious take on everyday situations that will make you laugh!',
    thumbnail: '/images/thumbnail5.png',
    channel: 'Comedy Central',
    channelImage: '/images/nilava.jpeg',
    views: '85k',
    timestamp: '4 days ago',
    moods: ['Happy']
  },
  {
    id: 'video-6',
    title: 'Emotional Piano Music: Journey Through Time',
    description: 'Feel the emotions through these beautiful piano melodies.',
    thumbnail: '/images/thumbnail6.png',
    channel: 'Piano Maestro',
    channelImage: '/images/nilava.jpeg',
    views: '67k',
    timestamp: '1 month ago',
    moods: ['Sad', 'Chill']
  }
]; 