import Head from 'next/head'
import { useEffect, useState } from 'react'
import Audience from '../components/Audience'
import VideoCarousel from '../components/VideoCarousel'
import videos from '../data/videos'

export default function Home() {
  const [desktopVideoLoaded, setDesktopVideoLoaded] = useState(false)
  const [mobileVideoLoaded, setMobileVideoLoaded] = useState(false)

  useEffect(() => {
    // Initialize charts when audience section is present
    if (typeof window !== 'undefined' && typeof window.initAudienceCharts === 'function') {
      window.initAudienceCharts()
    }
  }, [])
  return (
    <>
      <Head>
        <title>Nickaferd</title>
        <meta name="description" content="Portfolio of videos from social channels" />
      </Head>

      <main className="min-h-screen scroll-smooth">
        {/* Top intro — section color A */}
        <section id="top" className="section-top py-16">
          <div className="container mx-auto px-4 flex items-start justify-between">
            <div className="flex-1">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-[230px] h-[230px] rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                  <img
                    src="/images/profile_image_transparent.png"
                    alt="Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold">Hi, I’m Nick</h1>
                  <p className="mt-3 text-lg max-w-2xl">
                    I create fun, informative, and sometimes chaotic content all about theme parks — especially Disney. Theme parks have become a recent passion of mine, and I’ve fallen in love with everything from the rides and food to the history, design, and tiny details most people miss.

                    I genuinely love creating content and sharing that excitement with others. Whether I’m breaking down park secrets, geeking out over Imagineering, or just having fun in the parks, everything here comes from curiosity, good vibes, and a real love for the experience.

                    If you love Disney, travel, or theme park culture — welcome to the NickaFam ✨
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video section — autoplay cover videos */}
        <section id="video" className="relative w-full overflow-hidden">
          {/* Desktop video - shows on wider screens (768px+) */}
          <div className="hidden md:block relative">
            {!desktopVideoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-64 h-1 bg-gray-300 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full animate-loading-bar"></div>
                </div>
              </div>
            )}
            <video
              className={`w-full h-auto xl:h-[600px] xl:object-cover transition-opacity duration-500 ${desktopVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/image-cover-video.jpg"
              onPlaying={() => setDesktopVideoLoaded(true)}
              onCanPlay={() => setDesktopVideoLoaded(true)}
            >
              <source src="/images/cover-video-desktop.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Mobile video - shows on narrower screens */}
          <div className="block md:hidden relative">
            {!mobileVideoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-64 h-1 bg-gray-300 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full animate-loading-bar"></div>
                </div>
              </div>
            )}
            <video
              className={`w-full h-auto transition-opacity duration-500 ${mobileVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/image-cover-video.jpg"
              onPlaying={() => setMobileVideoLoaded(true)}
              onCanPlay={() => setMobileVideoLoaded(true)}
            >
              <source src="/images/cover-video-mobile.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        {/* Audience section — section color B moved from pages/audience.js */}

          <Audience/>

        {/* Content section */}
        <section id="content" className="section-c py-12">
          <div className="container mx-auto px-4">
            <header className="mb-8 text-center">
              <h2 className="text-3xl font-semibold">Content</h2>
              <p className="mt-2">Featured videos from my channels — swipe to explore.</p>
            </header>

            <div className="space-y-12">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-semibold">Featured TikToks</h3>
                  <a
                    href="https://www.tiktok.com/@nickaferd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#06b6d4] text-white text-sm hover:bg-[#05a6bf]"
                    aria-label="Open TikTok channel in new tab"
                  >
                    <i className="bi-tiktok"></i>
                    Channel
                    <i className="bi-arrow-right"></i>
                  </a>
                </div>
                <VideoCarousel videos={videos.filter((v) => v.platform === 'tiktok')} platform="tiktok" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-semibold">Featured YouTube Shorts</h3>
                  <a
                    href="https://www.youtube.com/@nickaferd/shorts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#C95353] text-white text-sm hover:bg-[#b04444]"
                    aria-label="Open YouTube channel in new tab"
                  >
                    <i className="bi-youtube"></i>
                    Channel
                    <i className="bi-arrow-right"></i>
                  </a>
                </div>
                <VideoCarousel videos={videos.filter((v) => v.platform === 'youtube')} platform="youtube" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact section — bottom (full-height on small devices, centered) */}
        <section id="contact" className="bg-[var(--header-bg)] min-h-screen flex items-center section-shadow">
          <div className="container mx-auto px-4 text-center h-full flex flex-col items-center justify-center">
            <header className="mb-6">
              <h2 className="text-3xl font-semibold">Contact</h2>
              <p className="mt-3 text-sm text-gray-600">Get in touch via TikTok or email.</p>
            </header>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              
              <a
                href="https://www.tiktok.com/@nickaferd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#06b6d4] text-white text-sm hover:bg-[#05a6bf]"
                aria-label="Direct message on TikTok"
              >
                <i className="bi-tiktok"></i>
                Direct Message on TikTok
              </a>

              <a
                href="mailto:nickaferd@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gray-800 text-white text-sm hover:bg-gray-700"
                aria-label="Send email"
              >
                <i className="bi-envelope"></i>
                nickaferd@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
