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
    if (!window.Chart) {
      const src = 'https://cdn.jsdelivr.net/npm/chart.js/dist/chart.umd.min.js'
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

      // Helper to create doughnut charts with guaranteed entry animation
      const createDoughnut = (canvas, labels, data, colors, cutout = '60%') => {
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) return
        // Destroy existing chart instance on this canvas (if any)
        try {
          const existing = Chart.getChart(canvas)
          if (existing) existing.destroy()
        } catch (e) {}

        const initial = data.map(() => 0)
        const cfg = {
          type: 'doughnut',
          data: { labels, datasets: [{ data: initial, backgroundColor: colors, borderWidth: 0 }] },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout,
            animation: { duration: 900, easing: 'easeInOutCubic' },
            plugins: {
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 },
                callbacks: {
                  label: function (context) {
                    const label = context.label || ''
                    const value = context.raw
                    const sum = context.dataset.data.reduce((a, b) => a + b, 0)
                    const pct = sum ? Math.round((value / sum) * 1000) / 10 : value
                    return `${label}: ${value} (${pct}%)`
                  },
                },
              },
              legend: { position: 'bottom', labels: { padding: 15, font: { size: 13 } } },
            },
          },
        }

        const chart = new Chart(canvas.getContext('2d'), cfg)
        // animate to final values to ensure an entry animation regardless of Chart.js internals
        requestAnimationFrame(() => {
          chart.data.datasets[0].data = data
          chart.update({ duration: 900, easing: 'easeInOutCubic' })
        })
        return chart
      }

      const youtubeGenderCtx = document.getElementById('youtubeGender')
      createDoughnut(youtubeGenderCtx, ['Male', 'Female'], [45, 55], ['#C95353', '#94a3b8'], '60%')

      const tiktokGenderCtx = document.getElementById('tiktokGender')
      createDoughnut(tiktokGenderCtx, ['Male', 'Female'], [34, 66], ['#06b6d4', '#fb7185'], '60%')
      // Audience country pies
      const tiktokAudienceCtx = document.getElementById('tiktokAudience')
      createDoughnut(
        tiktokAudienceCtx,
        ['USA', 'Canada', 'UK', 'Others'],
        [80, 10, 5, 5],
        ['#06b6d4', '#00A0C4', '#fb7185', '#94a3b8'],
        '50%'
      )

      // Age distribution horizontal bar charts
      const tiktokAgeCtx = document.getElementById('tiktokAge')
      if (tiktokAgeCtx && tiktokAgeCtx instanceof HTMLCanvasElement) {
        try { const existing = Chart.getChart(tiktokAgeCtx); if (existing) existing.destroy() } catch (e) {}
        const labels = ['13–17', '18–24', '25–34', '35–44', '45–54', '55–64', '65+']
        const target = [6.1, 18.4, 33.8, 23.5, 11.9, 4.3, 2.1]
        const chart = new Chart(tiktokAgeCtx.getContext('2d'), {
          type: 'bar',
          data: { labels, datasets: [{ label: 'Percent', data: labels.map(() => 0), backgroundColor: '#06b6d4' }] },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1000, easing: 'easeInOutCubic' },
            scales: {
              x: { beginAtZero: true, max: 40, display: false },
              y: { grid: { display: false, drawBorder: false }, ticks: { display: true, font: { size: 12 } } },
            },
            plugins: { legend: { display: false } },
          },
        })
        requestAnimationFrame(() => {
          chart.data.datasets[0].data = target
          chart.update({ duration: 900, easing: 'easeInOutCubic' })
        })
      }

      const youtubeAgeCtx = document.getElementById('youtubeAge')
      if (youtubeAgeCtx && youtubeAgeCtx instanceof HTMLCanvasElement) {
        try { const existing = Chart.getChart(youtubeAgeCtx); if (existing) existing.destroy() } catch (e) {}
        const labelsY = ['13–17', '18–24', '25–34', '35–44', '45–54', '55–64', '65+']
        const targetY = [6.1, 18.4, 33.8, 23.5, 11.9, 4.3, 2.1]
        const chartY = new Chart(youtubeAgeCtx.getContext('2d'), {
          type: 'bar',
          data: { labels: labelsY, datasets: [{ label: 'Percent', data: labelsY.map(() => 0), backgroundColor: '#C95353' }] },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1000, easing: 'easeInOutCubic' },
            scales: { x: { beginAtZero: true, max: 40, display: false }, y: { grid: { display: false, drawBorder: false }, ticks: { display: true, font: { size: 12 } } },
            },
            plugins: { legend: { display: false } },
          },
        })
        requestAnimationFrame(() => {
          chartY.data.datasets[0].data = targetY
          chartY.update({ duration: 900, easing: 'easeInOutCubic' })
        })
      }

      const youtubeAudienceCtx = document.getElementById('youtubeAudience')
      createDoughnut(youtubeAudienceCtx, ['United States', 'Others'], [36, 64], ['#1f7ced', '#94a3b8'], '50%')

      // Animate the top numbers (values chosen as sensible defaults)
      animateNumber('tiktokFollowers', 40000, 1400, 'compact')
      animateNumber('tiktokViews', 4000000, 1500, 'compact')
      animateNumber('tiktokEngagement', 30, 1000, 'integer')

      animateNumber('youtubeFollowers', 1300, 1200, 'compact')
      animateNumber('youtubeViews', 1500000, 1400, 'compact')
      animateNumber('youtubeEngagement', 20, 1000, 'integer')
    } catch (e) {
      // if Chart fails, silently continue — charts are progressive enhancement
      console.warn('Chart init failed', e)
    }
  }
}
