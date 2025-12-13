import React, { useEffect } from 'react'

export default function AudienceSection() {
  useEffect(() => {
    // Define init function on client only
    const initAudienceCharts = async () => {
      try {
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
          target = Number(target) || 0
          const start = 0
          const startTime = performance.now()
          const tick = (now) => {
            const t = Math.min((now - startTime) / duration, 1)
            const value = Math.round(start + (target - start) * t)
            el.textContent = format === 'compact' ? formatCompact(value) : String(Math.round(value))
            if (t < 1) {
              requestAnimationFrame(tick)
            } else {
              el.textContent = format === 'compact' ? formatCompact(target) : String(Math.round(target))
            }
          }
          requestAnimationFrame(tick)
        }

        // Helper chart creators
        const createDoughnut = (canvas, labels, data, colors, cutout = '60%') => {
          if (!canvas || !(canvas instanceof HTMLCanvasElement)) return
          try { const existing = Chart.getChart(canvas); if (existing) existing.destroy() } catch (e) {}
          const initial = data.map(() => 0)
          const cfg = {
            type: 'doughnut',
            data: { labels, datasets: [{ data: initial, backgroundColor: colors, borderWidth: 0 }] },
            options: { responsive: true, maintainAspectRatio: false, cutout, animation: { duration: 900, easing: 'easeInOutCubic' }, plugins: { legend: { position: 'bottom' } } },
          }
          const chart = new Chart(canvas.getContext('2d'), cfg)
          requestAnimationFrame(() => {
            chart.data.datasets[0].data = data
            chart.update({ duration: 900, easing: 'easeInOutCubic' })
          })
          return chart
        }

        const createBar = (canvas, labels, target, color) => {
          if (!canvas || !(canvas instanceof HTMLCanvasElement)) return
          try { const existing = Chart.getChart(canvas); if (existing) existing.destroy() } catch (e) {}
          const cfg = {
            type: 'bar',
            data: { labels, datasets: [{ label: 'Percent', data: labels.map(() => 0), backgroundColor: color }] },
            options: {
              indexAxis: 'y', responsive: true, maintainAspectRatio: false,
              animation: { duration: 1000, easing: 'easeInOutCubic' },
              scales: { x: { beginAtZero: true, max: 40, display: false }, y: { grid: { display: false, drawBorder: false }, ticks: { display: true, font: { size: 12 } } } },
              plugins: { legend: { display: false } },
            },
          }
          const chart = new Chart(canvas.getContext('2d'), cfg)
          requestAnimationFrame(() => {
            chart.data.datasets[0].data = target
            chart.update({ duration: 900, easing: 'easeInOutCubic' })
          })
          return chart
        }

        // Build charts
        const youtubeGenderCtx = document.getElementById('youtubeGender')
        createDoughnut(youtubeGenderCtx, ['Male', 'Female'], [45, 55], ['#C95353', '#94a3b8'], '60%')

        const tiktokGenderCtx = document.getElementById('tiktokGender')
        createDoughnut(tiktokGenderCtx, ['Male', 'Female'], [34, 66], ['#06b6d4', '#fb7185'], '60%')

        const tiktokAudienceCtx = document.getElementById('tiktokAudience')
        createDoughnut(tiktokAudienceCtx, ['USA', 'Canada', 'UK', 'Others'], [80, 10, 5, 5], ['#06b6d4', '#00A0C4', '#fb7185', '#94a3b8'], '50%')

        const youtubeAudienceCtx = document.getElementById('youtubeAudience')
        createDoughnut(youtubeAudienceCtx, ['United States', 'Others'], [36, 64], ['#1f7ced', '#94a3b8'], '50%')

        const tiktokAgeCtx = document.getElementById('tiktokAge')
        createBar(tiktokAgeCtx, ['13–17', '18–24', '25–34', '35–44', '45–54', '55–64', '65+'], [6.1, 18.4, 33.8, 23.5, 11.9, 4.3, 2.1], '#06b6d4')

        const youtubeAgeCtx = document.getElementById('youtubeAge')
        createBar(youtubeAgeCtx, ['13–17', '18–24', '25–34', '35–44', '45–54', '55–64', '65+'], [6.1, 18.4, 33.8, 23.5, 11.9, 4.3, 2.1], '#C95353')

        // Animate top numbers
        animateNumber('tiktokFollowers', 40, 1400, 'compact')
        animateNumber('tiktokViews', 7000000, 1500, 'compact')
        animateNumber('tiktokEngagement', 40, 1000, 'integer')

        // Live events
        animateNumber('tiktokLiveDaily', 300, 1300, 'compact')
        animateNumber('tiktokLiveMonthly', 25000, 1400, 'compact')
        animateNumber('tiktokLivePeak', 7200, 1200, 'compact')

        animateNumber('youtubeFollowers', 1300, 1200, 'compact')
        animateNumber('youtubeViews', 1500000, 1400, 'compact')
        animateNumber('youtubeEngagement', 20, 1000, 'integer')
      } catch (e) {
        console.warn('Chart init failed', e)
      }
    }

    // expose for external calls and run on mount if audience present
    window.initAudienceCharts = initAudienceCharts
    const el = document.getElementById('audience')
    if (el) initAudienceCharts()

    return () => {
      try { if (window && window.initAudienceCharts) delete window.initAudienceCharts } catch (e) {}
    }
  }, [])

  return (
    <section id="audience" className="section-c py-12">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-semibold">Audience</h2>
          <p className="mt-2">Demographics, interests and top metrics.</p>
        </header>

        <section className="grid grid-cols-1 gap-6">
          {/* TikTok block */}
          <article className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-3">
              <i className="bi-tiktok text-[#06b6d4]"></i>
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
                <div className="text-lg text-gray-600">Engaged Views</div>
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

            {/* Live events metrics */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-center">Live Events</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <div className="text-2xl font-bold text-[#06b6d4]"><span id="tiktokLiveDaily">0</span>+</div>
                  <div className="text-sm text-gray-600">Daily Live Watchers</div>
                </div>

                <div>
                  <div className="text-2xl font-bold text-[#06b6d4]"><span id="tiktokLiveMonthly">0</span></div>
                  <div className="text-sm text-gray-600">Active Viewers / month</div>
                </div>

                <div>
                  <div className="text-2xl font-bold text-[#06b6d4]"><span id="tiktokLivePeak">0</span></div>
                  <div className="text-sm text-gray-600">Peak Concurrent Viewers</div>
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
          <article className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-3">
              <i className="bi-youtube text-red-600"></i>
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
                <div className="text-lg text-gray-600">Engaged Views</div>
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
  )
}
