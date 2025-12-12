import { useEffect, useState } from 'react'

export default function VideoCard({ video }) {
  const [interactive, setInteractive] = useState(false)

  useEffect(() => {
    if (video.platform === 'tiktok') {
      // Load TikTok embed script to parse blockquote embeds.
      try {
        const src = 'https://www.tiktok.com/embed.js'
        const existing = Array.from(document.querySelectorAll('script')).find((s) => s.src === src)
        if (!existing) {
          const script = document.createElement('script')
          script.src = src
          script.async = true
          document.body.appendChild(script)
        }

        // After the embed script runs it replaces the blockquote with the player iframe
        // and keeps the <section> (caption) element. We hide the caption/username and
        // attempt to disable autoplay on the generated iframe by adding `autoplay=0`.
        const attemptCleanup = () => {
          const wrapper = document.querySelector(`.tiktok-embed-wrapper[data-video-id="${video.id}"]`)
          if (!wrapper) return

          // Hide the caption/section that includes username and caption text
          const sections = wrapper.querySelectorAll('blockquote.tiktok-embed > section')
          sections.forEach((s) => {
            s.style.display = 'none'
          })

          // Also hide any remaining text anchors that may render below the player
          const anchors = wrapper.querySelectorAll('blockquote.tiktok-embed a')
          anchors.forEach((a) => {
            a.style.display = 'none'
          })

          // Find the generated iframe and disable autoplay by setting a query param
          const iframe = wrapper.querySelector('iframe')
          if (iframe && iframe.src) {
            try {
              const url = new URL(iframe.src)
              // set autoplay=0 to request paused playback
              url.searchParams.set('autoplay', '0')
              // reload iframe with modified url
              if (url.toString() !== iframe.src) iframe.src = url.toString()
            } catch (e) {
              // ignore URL parse errors
            }
          }
        }

        // Try cleanup a few times to account for script load timing
        const tries = [500, 1200, 2200]
        const timers = tries.map((t) => setTimeout(attemptCleanup, t))

        return () => timers.forEach(clearTimeout)
      } catch (e) {
        // ignore
      }
    }

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
                  {!interactive && (
                    <button
                      aria-label="Enable video interaction"
                      onClick={() => setInteractive(true)}
                      className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full flex items-center justify-center"
                      style={{ width: 56, height: 56, border: 'none' }}
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5v14l11-7z" fill="currentColor" />
                      </svg>
                    </button>
                  )}
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={`absolute top-0 left-0 w-full h-full ${interactive ? '' : 'pointer-events-none'}`}
                  />
                </div>
          ) : video.platform === 'tiktok' && video.embedHtml ? (
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                {!interactive && (
                  <button
                    aria-label="Enable video interaction"
                    onClick={() => setInteractive(true)}
                    className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full flex items-center justify-center"
                    style={{ width: 56, height: 56, border: 'none' }}
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5v14l11-7z" fill="currentColor" />
                    </svg>
                  </button>
                )}
                <div
                  className="tiktok-embed-wrapper"
                  data-video-id={video.id}
                  style={{ pointerEvents: interactive ? 'auto' : 'none' }}
                  dangerouslySetInnerHTML={{ __html: video.embedHtml }}
                />
              </div>
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
      </div>
    </article>
  )
}
