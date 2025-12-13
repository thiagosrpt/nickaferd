import Head from 'next/head'
import { useEffect } from 'react'

export default function Audience() {
  useEffect(() => {
    // Initialize charts when component mounts (works with client-side navigation)
    if (typeof window !== 'undefined' && typeof window.initAudienceCharts === 'function') {
      window.initAudienceCharts()
    }
  }, [])

  return (
    <>
      <Head>
        <title>Audience Analytics</title>
        <meta name="description" content="Audience metrics skeleton for TikTok and YouTube" />
      </Head>

      <main className="min-h-screen py-12 px-4">
        <div className="container mx-auto">
          <header className="mb-8">
            <h1 className="text-5xl font-bold">Audience Data</h1>
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
      </main>
    </>
  )
}

// Client-side chart initialization using Chart.js from CDN
export async function getStaticProps() {
  // no-op: keep page static; charts are rendered client-side
  return { props: {} }
}

// Initialize charts on the client only
if (typeof window !== 'undefined') {
  // Expose initAudienceCharts on window so component can call it on mount
  window.initAudienceCharts = async function initAudienceCharts() {
    console.debug && console.debug('[initAudienceCharts] starting (audience.js)')
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

      // Create placeholders (zeroed charts) and store targets on window._audienceCharts
      window._audienceCharts = window._audienceCharts || {}

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

      // Create placeholders and store them
      const tiktokGenderCtx = document.getElementById('tiktokGender')
      const tg = createDoughnutPlaceholder(tiktokGenderCtx, ['Male', 'Female'], [34, 66], ['#06b6d4', '#fb7185'], '60%')
      if (tg) window._audienceCharts.tiktokGender = tg

      const tiktokAudienceCtx = document.getElementById('tiktokAudience')
      const ta = createDoughnutPlaceholder(tiktokAudienceCtx, ['USA', 'Canada', 'UK', 'Others'], [80, 10, 5, 5], ['#06b6d4', '#00A0C4', '#fb7185', '#94a3b8'], '50%')
      if (ta) window._audienceCharts.tiktokAudience = ta

      const tiktokAgeCtx = document.getElementById('tiktokAge')
      const tA = createBarPlaceholder(tiktokAgeCtx, ['13–17', '18–24', '25–34', '35–44', '45–54', '55–64', '65+'], [6.1, 18.4, 33.8, 23.5, 11.9, 4.3, 2.1], '#06b6d4')
      if (tA) window._audienceCharts.tiktokAge = tA

      const youtubeGenderCtx = document.getElementById('youtubeGender')
      const yg = createDoughnutPlaceholder(youtubeGenderCtx, ['Male', 'Female'], [45, 55], ['#C95353', '#94a3b8'], '60%')
      if (yg) window._audienceCharts.youtubeGender = yg

      const youtubeAudienceCtx = document.getElementById('youtubeAudience')
      const ya = createDoughnutPlaceholder(youtubeAudienceCtx, ['United States', 'Others'], [36, 64], ['#1f7ced', '#94a3b8'], '50%')
      if (ya) window._audienceCharts.youtubeAudience = ya

      const youtubeAgeCtx = document.getElementById('youtubeAge')
      const yA = createBarPlaceholder(youtubeAgeCtx, ['13–17', '18–24', '25–34', '35–44', '45–54', '55–64', '65+'], [6.1, 18.4, 33.8, 23.5, 11.9, 4.3, 2.1], '#C95353')
      if (yA) window._audienceCharts.youtubeAge = yA

      // SECTION map for this page's numbers
      const SECTION_MAP = {
        'tiktok-audience': {
          charts: ['tiktokGender', 'tiktokAudience', 'tiktokAge'],
          numbers: [
            ['tiktokFollowers', 40000, 1400, 'compact'],
            ['tiktokViews', 4000000, 1500, 'compact'],
            ['tiktokEngagement', 30, 1000, 'integer'],
          ],
        },
        'youtube-audience': {
          charts: ['youtubeGender', 'youtubeAudience', 'youtubeAge'],
          numbers: [
            ['youtubeFollowers', 1300, 1200, 'compact'],
            ['youtubeViews', 1500000, 1400, 'compact'],
            ['youtubeEngagement', 20, 1000, 'integer'],
          ],
        },
      }

      // Animation runner that can run per-section
      const runAudienceAnimations = (sectionId) => {
        window._audienceCharts = window._audienceCharts || {}
        window._audienceCharts._ranSections = window._audienceCharts._ranSections || {}
        if (sectionId) {
          if (window._audienceCharts._ranSections[sectionId]) return
          const map = SECTION_MAP[sectionId]
          if (!map) return
          try {
            map.charts.forEach((key) => {
              const item = window._audienceCharts[key]
              if (!item || !item.chart) return
              item.chart.data.datasets[0].data = item.target
              item.chart.update({ duration: 900, easing: 'easeInOutCubic' })
            })
            map.numbers.forEach(([id, val, dur, fmt]) => animateNumber(id, val, dur, fmt))
            window._audienceCharts._ranSections[sectionId] = true
          } catch (e) {
            console.warn('Audience section animation failed', sectionId, e)
          }
          return
        }

        // Fallback: animate everything once
        if (window._audienceCharts._ran) return
        try {
          Object.keys(window._audienceCharts).forEach((key) => {
            if (key === '_ran' || key === '_ranSections') return
            const item = window._audienceCharts[key]
            if (!item || !item.chart) return
            item.chart.data.datasets[0].data = item.target
            item.chart.update({ duration: 900, easing: 'easeInOutCubic' })
          })
          // numbers
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

      const observeBlock = (selector, sectionId) => {
        const el = document.getElementById(selector)
        if (!el) return
        if ('IntersectionObserver' in window) {
          const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                runAudienceAnimations(sectionId)
                observer.disconnect()
              }
            })
          }, { threshold: 0.25 })
          obs.observe(el)
          const rect = el.getBoundingClientRect()
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            runAudienceAnimations(sectionId)
            obs.disconnect()
          }
        } else {
          runAudienceAnimations(sectionId)
        }
      }

      observeBlock('tiktok-audience', 'tiktok-audience')
      observeBlock('youtube-audience', 'youtube-audience')
    } catch (e) {
      console.warn('Chart init failed', e)
    }
  }
}
