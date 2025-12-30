import { useEffect, useState } from 'react'

export default function VideoCard({ video }) {
  const [enableVideo, setEnableVideo] = useState(false)

  const handleOverlayClick = () => {
    setEnableVideo(true)
    
    // Play the video when overlay is clicked
    setTimeout(() => {
      const iframe = Array.from(document.querySelectorAll('iframe')).find((f) => f.src && f.src.includes(video.id))
      if (iframe) {
        try {
          iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*')
        } catch (e) {
          // ignore cross-origin errors
        }
      }
    }, 100)
  }

  useEffect(() => {
    // Ensure YouTube embeds explicitly request paused start
    if (video.platform === 'youtube') {
      const attemptYouTubePause = () => {
        // Find the iframe for this video id
        const iframe = Array.from(document.querySelectorAll('iframe')).find((f) => f.src && f.src.includes(video.id))
        if (!iframe) return

        try {
          const url = new URL(iframe.src)
          url.searchParams.set('autoplay', '0')
          url.searchParams.set('enablejsapi', '1')
          url.searchParams.set('rel', '0')
          const newSrc = url.toString()
          if (newSrc !== iframe.src) iframe.src = newSrc

          // Ask the player to pause via postMessage (YouTube JS API)
          setTimeout(() => {
            try {
              iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*')
            } catch (e) {
              // ignore cross-origin errors; the src update helps prevent autoplay in many cases
            }
          }, 300)
        } catch (e) {
          // ignore
        }
      }

      const timers = [200, 800, 1600].map((t) => setTimeout(attemptYouTubePause, t))
      return () => timers.forEach(clearTimeout)
    }
  }, [video.platform, video.id])

  return (
    <article className="bg-white rounded overflow-hidden">
      <div className="p-3">
        <h3 className="font-semibold text-lg mb-2 h-12 overflow-hidden leading-tight">{video.title}</h3>
        <div className="w-full">
            {video.platform === 'youtube' ? (
                <div className="relative w-full" style={{ paddingTop: '177.78%' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                  {!enableVideo && (
                    <div
                      onClick={handleOverlayClick}
                      className="absolute inset-0 z-10 cursor-pointer"
                      style={{ background: 'transparent' }}
                      aria-label="Click to play video"
                    />
                  )}
                </div>
          ) : (
            <a
              href={video.url}
              target="_blank"
              rel="noreferrer"
              className="block bg-gray-100 rounded p-6 text-center hover:bg-gray-200"
            >
              Open on {video.platform}
            </a>
          )}
        </div>

        {/* Stats section */}
        <div className="mt-4 space-y-2 text-sm">
          {/* TikTok stats */}
          <div className="flex items-center justify-between py-2 border-b">
            <a 
              href={video.tiktokLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#06b6d4] hover:underline"
            >
              <i className="bi-tiktok"></i>
              <span>TikTok</span>
            </a>
            <div className="flex gap-4 text-gray-600">
              <span>{video.tiktokViews} views</span>
            </div>
          </div>

          {/* YouTube stats */}
          <div className="flex items-center justify-between py-2">
            <a 
              href={video.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#C95353] hover:underline"
            >
              <i className="bi-youtube"></i>
              <span>YouTube</span>
            </a>
            <div className="flex gap-4 text-gray-600">
              <span>{video.youtubeViews} views</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
