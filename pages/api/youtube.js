export default async function handler(req, res) {
  const API_KEY = process.env.YOUTUBE_API_KEY
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID

  if (!API_KEY || !CHANNEL_ID) {
    return res.status(500).json({ error: 'Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID in environment' })
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=5&type=video`
    const r = await fetch(url)
    if (!r.ok) throw new Error('YouTube API error')
    const data = await r.json()

    const videos = data.items.map((it) => ({
      platform: 'youtube',
      id: it.id.videoId,
      title: it.snippet.title,
      url: `https://www.youtube.com/watch?v=${it.id.videoId}` ,
      thumbnail: it.snippet.thumbnails?.medium?.url || null,
    }))

    return res.status(200).json({ videos })
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
}
