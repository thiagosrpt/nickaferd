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
          <div className="container mx-auto px-4 pt-8 flex items-start justify-between">
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
        <section id="content" className="section-c py-12 ">
          <div className="container mx-auto px-4">
            <header className="mb-8 text-center">
              <h2 className="text-3xl font-semibold">Content</h2>
              <p className="mt-2">I create high-retention Disney and theme park content that blends humor, insider knowledge, and cinematic storytelling.
My videos attract highly engaged Disney adults and families who actively plan trips, buy merch, and follow creator recommendations.</p>
            </header>

            <div>
              <div className="flex justify-center mb-5 gap-2">
                <a
                  href="https://www.tiktok.com/@nickaferd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#06b6d4] text-white text-sm hover:bg-[#05a6bf]"
                  aria-label="Open YouTube channel in new tab"
                >
                  <i className="bi-tiktok"></i>
                  @nickaferd on TikTok
                  <i className="bi-arrow-right"></i>
                </a>
                                <a
                  href="https://www.youtube.com/@nickaferd/shorts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#C95353] text-white text-sm hover:bg-[#b04444]"
                  aria-label="Open YouTube channel in new tab"
                >
                  <i className="bi-youtube"></i>
                  nickaferd
                  <i className="bi-arrow-right"></i>
                </a>
              </div>
              <VideoCarousel videos={videos.filter((v) => v.platform === 'youtube')} platform="youtube" />
            </div>
          </div>
        </section>

        {/* NickaFam Community section */}
        <section id="community" className="section-c py-16 bg-[#f8d481]">
          <div className="container mx-auto px-4">
            <header className="mb-8 text-center">
              <h2 className="text-3xl font-semibold">NickaFam Community</h2>
              <p className="mt-2 text-gray-600">Join the community and support the channel!</p>
            </header>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <a
                href="https://discord.gg/vv3e7gxe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#5865F2] text-white text-sm hover:bg-[#4752C4]"
                aria-label="Join Discord Server"
              >
                <i className="bi-discord"></i>
                Join Our Discord
              </a>

              <a
                href="https://venmo.com/u/nickaferd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#008CFF] text-white text-sm hover:bg-[#0074D9]"
                aria-label="Support on Venmo"
              >
                <i className="bi-cash-coin"></i>
                Support on Venmo
              </a>

              <a
                href="https://www.amazon.com/hz/wishlist/ls/3TXHGY69U7UMI?ref_=wl_share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#FF9900] text-white text-sm hover:bg-[#E88B00]"
                aria-label="View Amazon Wishlist"
              >
                <i className="bi-gift"></i>
                Amazon Wishlist
              </a>
            </div>

            {/* Amazon Endorsed Products */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-center mb-6">Recommended Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                
                {/* Product 1 - Black Shark Phone Cooler */}
                <a
                  href="https://www.amazon.com/dp/B0F5GZ98WC/ref=cm_sw_r_as_gl_api_gl_i_Q5C96KGSW1ZZKNV7X3S5?linkCode=ml1&tag=nickashop-20&linkId=82545bddf0db297abecac899deba72ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col items-center"
                >
                  <div className="w-full aspect-square bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src="https://m.media-amazon.com/images/I/71WlBByy+2L._SX522_.jpg"
                      alt="Black Shark Magnetic Phone Cooler 5 Pro"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300.png?text=Black+Shark+Cooler'
                      }}
                    />
                  </div>
                  <h4 className="font-semibold text-center mb-2 text-sm">Black Shark Magnetic Phone Cooler 5 Pro - RGB Gaming Cooler</h4>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#FF9900] text-white text-sm">
                    <i className="bi-amazon"></i>
                    View on Amazon
                  </span>
                </a>

                {/* Product 2 - BEESHOP Portable Charger */}
                <a
                  href="https://www.amazon.com/dp/B0DJ11RG1Q/ref=cm_sw_r_as_gl_api_gl_i_RPR4QE7K2Z8DQVD575PH?linkCode=ml1&tag=nickashop-20&linkId=41105b430fa9ce5750d307f154935f23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col items-center"
                >
                  <div className="w-full aspect-square bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src="https://m.media-amazon.com/images/I/81Esdhjo2NL._AC_SX679_.jpg"
                      alt="BEESHOP Portable Charger Power Bank"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300.png?text=BEESHOP+Charger'
                      }}
                    />
                  </div>
                  <h4 className="font-semibold text-center mb-2 text-sm">BEESHOP 37000mAh Portable Charger - Fast Charging Power Bank</h4>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#FF9900] text-white text-sm">
                    <i className="bi-amazon"></i>
                    View on Amazon
                  </span>
                </a>

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
                href="mailto:nickaferdd@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gray-800 text-white text-sm hover:bg-gray-700"
                aria-label="Send email"
              >
                <i className="bi-envelope"></i>
                nickaferdd@gmail.com
              </a>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-2">Or send mail to:</p>
              <div className="inline-flex items-start gap-2 text-gray-800">
                <i className="bi-mailbox mt-0.5"></i>
                <div className="text-left">
                  <p>P.O. Box 570485</p>
                  <p>Kissimmee, FL 34747</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
