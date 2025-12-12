import Head from 'next/head'
import { useEffect } from 'react'
import VideoCard from '../components/VideoCard'
import VideoCarousel from '../components/VideoCarousel'
import videos from '../data/videos'

export default function Home() {
  useEffect(() => {
    // Initialize charts when audience section is present
    if (typeof window !== 'undefined' && typeof window.initAudienceCharts === 'function') {
      window.initAudienceCharts()
    }
  }, [])
  return (
    <>
      <Head>
        <title>Portfolio — Videos</title>
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

        {/* Content section — section color B */}
        <section id="content" className="bg-[#f8d481] py-12">
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
                    Channel
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
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
                    Channel
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
                <VideoCarousel videos={videos.filter((v) => v.platform === 'youtube')} platform="youtube" />
              </div>
            </div>
          </div>
        </section>

        {/* Audience section moved from pages/audience.js */}
        <section id="audience" className="section-c py-12">
          <div className="container mx-auto px-4">
            <header className="mb-8 text-center">
              <h2 className="text-3xl font-semibold">Audience</h2>
              <p className="mt-2">Demographics, interests and top metrics.</p>
            </header>

            <section className="grid grid-cols-1 gap-6">
              {/* TikTok block */}
              <article className="bg-white shadow rounded p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-3">
                  <img src="https://upload.wikimedia.org/wikipedia/en/6/69/TikTok_logo.svg" alt="TikTok" className="w-6 h-6" />
                  <span>TikTok</span>
                </h2>

                {/* Top numbers row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-extrabold text-[#06b6d4]"><span id="tiktokFollowers">0</span></div>
                    <div className="text-lg text-gray-600">Followers</div>
                  </div>

                  <div className="text-center">
                    <div className="text-5xl font-extrabold text-[#06b6d4]"><span id="tiktokViews">0</span></div>
                    <div className="text-lg text-gray-600">Views</div>
                  </div>

                  <div className="text-center">
                    <div className="text-5xl font-extrabold text-[#06b6d4]"><span id="tiktokEngagement">0</span>%</div>
                    <div className="text-lg text-gray-600">Engagement</div>
                    <div className="text-xs text-gray-600">Like, Comments, Share, 5-Sec Retention % Rates</div>
                  </div>
                </div>

                {/* Demographics section */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <strong>Age</strong>
                      <div className="mt-2 w-full h-40">
                        <canvas id="tiktokAge" aria-label="TikTok age distribution" />
                      </div>
                    </div>

                    <div>
                      <strong>Gender</strong>
                      <div className="mt-2 w-100 h-40">
                        <canvas id="tiktokGender" aria-label="TikTok gender chart" />
                      </div>
                    </div>

                    <div>
                      <strong>Country</strong>
                      <div className="mt-2 w-100 h-48">
                        <canvas id="tiktokAudience" aria-label="TikTok audience countries chart" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Interests */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-center">Interests</h3>
                  <ul className="list-disc list-inside text-center space-y-1">
                    <li>Disney Merchadising</li>
                    <li>Theme Parks</li>
                    <li>Travel &amp; Hotel Stays</li>
                    <li>Entertainment</li>
                  </ul>
                </div>
              </article>

              {/* YouTube block */}
              <article className="bg-white shadow rounded p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-3">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube" className="w-6 h-6" />
                  <span>YouTube</span>
                </h2>

                {/* Top numbers row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-extrabold text-[#C95353]"><span id="youtubeFollowers">0</span></div>
                    <div className="text-lg text-gray-600">Followers</div>
                  </div>

                  <div className="text-center">
                    <div className="text-5xl font-extrabold text-[#C95353]"><span id="youtubeViews">0</span></div>
                    <div className="text-lg text-gray-600">Views</div>
                  </div>

                  <div className="text-center">
                    <div className="text-5xl font-extrabold text-[#C95353]"><span id="youtubeEngagement">0</span>%</div>
                    <div className="text-lg text-gray-600">Engagement</div>
                    <div className="text-xs text-gray-600">Like, Comments, Share, 5-Sec Retention % Rates</div>
                  </div>
                </div>

                {/* Demographics section */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <strong>Age</strong>
                      <div className="mt-2 w-full h-40">
                        <canvas id="youtubeAge" aria-label="YouTube age distribution" />
                      </div>
                    </div>

                    <div>
                      <strong>Gender</strong>
                      <div className="mt-2 w-100 h-40">
                        <canvas id="youtubeGender" aria-label="YouTube gender chart" />
                      </div>
                    </div>

                    <div>
                      <strong>Country</strong>
                      <div className="mt-2 w-100 h-48">
                        <canvas id="youtubeAudience" aria-label="YouTube audience countries chart" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Interests */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-center">Interests</h3>
                  <ul className="list-disc list-inside text-center space-y-1">
                    <li>Curiosities</li>
                    <li>Entertainment</li>
                  </ul>
                </div>
              </article>
            </section>
          </div>
        </section>
      </main>
    </>
  )
}

// Initialize charts on the client only (copied from pages/audience.js)
if (typeof window !== 'undefined') {
  window.initAudienceCharts = async function initAudienceCharts() {
    console.debug && console.debug('[initAudienceCharts] starting')
    const src = 'https://cdn.jsdelivr.net/npm/chart.js/dist/chart.umd.min.js'
    if (!window.Chart) {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const s = document.createElement('script')
        s.src = src
        s.async = true
        document.head.appendChild(s)
        await new Promise((res) => (s.onload = res))
      } else {
        await new Promise((res) => {
          const existing = document.querySelector(`script[src="${src}"]`)
          if (existing && existing.complete) return res()
          existing && existing.addEventListener('load', res)
        })
      }
    }

    try {
      const Chart = window.Chart
      console.debug && console.debug('[initAudienceCharts] Chart ready?', !!Chart)
      try {
        console.debug && console.debug('[initAudienceCharts] Chart.version', Chart.version)
        console.debug && console.debug('[initAudienceCharts] Chart.defaults.animation', Chart.defaults && Chart.defaults.animation)
      } catch (e) {
        console.debug && console.debug('[initAudienceCharts] Chart debug read failed', e)
      }

      // Animate numeric counters (compact formatting for k/M)
      const formatCompact = (n) => {
        if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1).replace(/\.0$/, '') + 'M'
        if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace(/\.0$/, '') + 'k'
        return String(n)
      }

      const animateNumber = (id, target, duration = 1200, format = 'compact') => {
        const el = document.getElementById(id)
        if (!el) return
        const start = 0
        const startTime = performance.now()
        const tick = (now) => {
          const t = Math.min((now - startTime) / duration, 1)
          const value = Math.round(start + (target - start) * t)
          el.textContent = format === 'compact' ? formatCompact(value) : String(Math.round(value))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }

      // Helpers that create charts with zeroed data and return chart + target
      const createDoughnutPlaceholder = (canvas, labels, data, colors, cutout = '60%') => {
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) return null
        try { const existing = Chart.getChart(canvas); if (existing) existing.destroy() } catch (e) {}
        const initial = data.map(() => 0)
        const cfg = {
          type: 'doughnut',
          data: { labels, datasets: [{ data: initial, backgroundColor: colors, borderWidth: 0 }] },
          options: { responsive: true, maintainAspectRatio: false, cutout, animation: { duration: 900, easing: 'easeInOutCubic' }, plugins: { legend: { position: 'bottom' } } },
        }
        const chart = new Chart(canvas.getContext('2d'), cfg)
        return { chart, target: data }
      }

      const createBarPlaceholder = (canvas, labels, target, color) => {
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) return null
        try { const existing = Chart.getChart(canvas); if (existing) existing.destroy() } catch (e) {}
        const cfg = {
          type: 'bar',
          data: { labels, datasets: [{ label: 'Percent', data: labels.map(() => 0), backgroundColor: color }] },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1000, easing: 'easeInOutCubic' },
            scales: { x: { beginAtZero: true, max: 40, display: false }, y: { grid: { display: false, drawBorder: false }, ticks: { display: true, font: { size: 12 } } } },
            plugins: { legend: { display: false } },
          },
        }
        const chart = new Chart(canvas.getContext('2d'), cfg)
        return { chart, target }
      }

      // Build placeholder charts and keep targets for later animation
      console.debug && console.debug('[initAudienceCharts] creating placeholders')
      window._audienceCharts = window._audienceCharts || {}

      const youtubeGenderCtx = document.getElementById('youtubeGender')
      const yg = createDoughnutPlaceholder(youtubeGenderCtx, ['Male', 'Female'], [45, 55], ['#C95353', '#94a3b8'], '60%')
      if (yg) {
        window._audienceCharts.youtubeGender = yg
        console.debug && console.debug('[initAudienceCharts] created youtubeGender')
      }

      const tiktokGenderCtx = document.getElementById('tiktokGender')
      const tg = createDoughnutPlaceholder(tiktokGenderCtx, ['Male', 'Female'], [34, 66], ['#06b6d4', '#fb7185'], '60%')
      if (tg) {
        window._audienceCharts.tiktokGender = tg
        console.debug && console.debug('[initAudienceCharts] created tiktokGender')
      }

      const tiktokAudienceCtx = document.getElementById('tiktokAudience')
      const ta = createDoughnutPlaceholder(tiktokAudienceCtx, ['USA', 'Canada', 'UK', 'Others'], [80, 10, 5, 5], ['#06b6d4', '#00A0C4', '#fb7185', '#94a3b8'], '50%')
      if (ta) {
        window._audienceCharts.tiktokAudience = ta
        console.debug && console.debug('[initAudienceCharts] created tiktokAudience')
      }

      const youtubeAudienceCtx = document.getElementById('youtubeAudience')
      const ya = createDoughnutPlaceholder(youtubeAudienceCtx, ['United States', 'Others'], [36, 64], ['#1f7ced', '#94a3b8'], '50%')
      if (ya) {
        window._audienceCharts.youtubeAudience = ya
        console.debug && console.debug('[initAudienceCharts] created youtubeAudience')
      }

      const tiktokAgeCtx = document.getElementById('tiktokAge')
      const tiktokAge = createBarPlaceholder(tiktokAgeCtx, ['13–17', '18–24', '25–34', '35–44', '45–54', '55–64', '65+'], [6.1, 18.4, 33.8, 23.5, 11.9, 4.3, 2.1], '#06b6d4')
      if (tiktokAge) {
        window._audienceCharts.tiktokAge = tiktokAge
        console.debug && console.debug('[initAudienceCharts] created tiktokAge')
      }

      const youtubeAgeCtx = document.getElementById('youtubeAge')
      const youtubeAge = createBarPlaceholder(youtubeAgeCtx, ['13–17', '18–24', '25–34', '35–44', '45–54', '55–64', '65+'], [6.1, 18.4, 33.8, 23.5, 11.9, 4.3, 2.1], '#C95353')
      if (youtubeAge) {
        window._audienceCharts.youtubeAge = youtubeAge
        console.debug && console.debug('[initAudienceCharts] created youtubeAge')
      }

      // Animation runner that updates stored charts and numbers
      const runAudienceAnimations = () => {
        if (!window._audienceCharts || window._audienceCharts._ran) return
        console.debug && console.debug('[initAudienceCharts] running animations')
        try {
          Object.keys(window._audienceCharts).forEach((key) => {
            if (key === '_ran') return
            const item = window._audienceCharts[key]
            if (!item || !item.chart) return
            console.debug && console.debug('[initAudienceCharts] animating', key, item.target)
            const chart = item.chart
            chart.data.datasets[0].data = item.target
            chart.update({ duration: 900, easing: 'easeInOutCubic' })
          })

          // Animate numbers
          animateNumber('tiktokFollowers', 40000, 1400, 'compact')
          animateNumber('tiktokViews', 4000000, 1500, 'compact')
          animateNumber('tiktokEngagement', 30, 1000, 'integer')

          animateNumber('youtubeFollowers', 1300, 1200, 'compact')
          animateNumber('youtubeViews', 1500000, 1400, 'compact')
          animateNumber('youtubeEngagement', 20, 1000, 'integer')

          window._audienceCharts._ran = true
        } catch (e) {
          console.warn('Audience animation failed', e)
        }
      }

      // Observe the audience section and trigger animations when it becomes visible
      const audienceEl = document.getElementById('audience')
      if (audienceEl && 'IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runAudienceAnimations()
              observer.disconnect()
            }
          })
        }, { threshold: 0.25 })
        obs.observe(audienceEl)
        // If already in view, run immediately
        const rect = audienceEl.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          runAudienceAnimations()
          obs.disconnect()
        }
      } else {
        // Fallback: run immediately
        runAudienceAnimations()
      }
    } catch (e) {
      console.warn('Chart init failed', e)
    }
  }
}
