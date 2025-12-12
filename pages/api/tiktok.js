export default async function handler(req, res) {
  const username = process.env.TIKTOK_USERNAME || 'nickaferd'
  const url = `https://www.tiktok.com/@${username}`

  try {
    const r = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Bot/1.0)'
      }
    })

    if (!r.ok) throw new Error('Failed to fetch TikTok')
    const text = await r.text()

    // Best-effort extraction of video ids from the page JSON.
    const ids = new Set()
    const idRegex = /"id":"(\d{6,20})"/g
    let m
    while ((m = idRegex.exec(text)) && ids.size < 10) {
      ids.add(m[1])
    }

    const arr = Array.from(ids).slice(0, 5).map((id) => ({
      platform: 'tiktok',
      id,
      title: `TikTok ${id}`,
      url: `https://www.tiktok.com/@${username}/video/${id}`
    }))

    return res.status(200).json({ videos: arr })
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
}
