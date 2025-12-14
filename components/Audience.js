import React, { useEffect } from "react";

export default function Audience() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let observers = [];

    const loadChartJs = async () => {
      const src = "https://cdn.jsdelivr.net/npm/chart.js/dist/chart.umd.min.js";
      if (window.Chart) return window.Chart;
      if (!document.querySelector(`script[src="${src}"]`)) {
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        document.head.appendChild(s);
        await new Promise((res) => (s.onload = res));
      } else {
        await new Promise((res) => {
          const existing = document.querySelector(`script[src="${src}"]`);
          if (existing && existing.complete) return res();
          existing && existing.addEventListener("load", res);
        });
      }
      return window.Chart;
    };

    const formatCompact = (n) => {
      if (n >= 1000000)
        return (
          (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1).replace(/\.0$/, "") +
          "M"
        );
      if (n >= 1000)
        return (
          (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace(/\.0$/, "") + "k"
        );
      return String(n);
    };

    const animateNumber = (id, target, duration = 1200, format = "compact") => {
      const el = document.getElementById(id);
      if (!el) return;
      const start = Number(el.getAttribute("data-start") || 0) || 0;
      const startTime = performance.now();
      const raf = window.requestAnimationFrame.bind(window);
      const caf = window.cancelAnimationFrame.bind(window);
      let rafId = null;

      const tick = (now) => {
        const t = Math.min((now - startTime) / duration, 1);
        const value = Math.round(start + (target - start) * t);
        el.textContent =
          format === "compact"
            ? formatCompact(value)
            : String(Math.round(value));
        if (t < 1) rafId = raf(tick);
      };

      rafId = raf(tick);

      // Ensure we always finish (iOS may throttle RAF). Force final value after duration+100ms
      const finTimeout = setTimeout(() => {
        try {
          const final =
            format === "compact"
              ? formatCompact(target)
              : String(Math.round(target));
          if (el.textContent !== final) el.textContent = final;
        } catch (e) {}
        try {
          if (rafId) caf(rafId);
        } catch (e) {}
      }, duration + 120);

      // Return a canceler in case caller wants to stop it (not used currently)
      return () => {
        try {
          clearTimeout(finTimeout);
          if (rafId) caf(rafId);
        } catch (e) {}
      };
    };

    // Create zeroed placeholder charts and store them on window._audienceCharts
    const createDoughnutPlaceholder = (
      Chart,
      canvas,
      labels,
      data,
      colors,
      cutout = "60%"
    ) => {
      if (!canvas || !(canvas instanceof HTMLCanvasElement)) return null;
      try {
        const existing = Chart.getChart(canvas);
        if (existing) existing.destroy();
      } catch (e) {}
      const initial = data.map(() => 0);
      const cfg = {
        type: "doughnut",
        data: {
          labels,
          datasets: [
            { data: initial, backgroundColor: colors, borderWidth: 0 },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout,
          animation: { duration: 900, easing: "easeInOutCubic" },
          plugins: { legend: { position: "bottom" } },
        },
      };
      const chart = new Chart(canvas.getContext("2d"), cfg);
      return { chart, target: data };
    };

    const createBarPlaceholder = (Chart, canvas, labels, target, color) => {
      if (!canvas || !(canvas instanceof HTMLCanvasElement)) return null;
      try {
        const existing = Chart.getChart(canvas);
        if (existing) existing.destroy();
      } catch (e) {}
      const cfg = {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Percent",
              data: labels.map(() => 0),
              backgroundColor: color,
            },
          ],
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 1000, easing: "easeInOutCubic" },
          scales: {
            x: { beginAtZero: true, max: 40, display: false },
            y: {
              grid: { display: false, drawBorder: false },
              ticks: { display: true, font: { size: 12 } },
            },
          },
          plugins: { legend: { display: false } },
        },
      };
      const chart = new Chart(canvas.getContext("2d"), cfg);
      return { chart, target };
    };

    const setupCharts = async () => {
      const Chart = await loadChartJs();
      if (!Chart) return;

      window._audienceCharts = window._audienceCharts || {};

      // build placeholders
      const setIf = (key, v) => {
        if (v) window._audienceCharts[key] = v;
      };
      setIf(
        "tiktokGender",
        createDoughnutPlaceholder(
          Chart,
          document.getElementById("tiktokGender"),
          ["Male", "Female"],
          [42, 58],
          ["#06b6d4", "#fb7185", "#94a3b8"],
          "60%"
        )
      );
      setIf(
        "tiktokAudience",
        createDoughnutPlaceholder(
          Chart,
          document.getElementById("tiktokAudience"),
          ["USA", "Canada", "Australia", "Others"],
          [81, 6, 3, 10],
          ["#06b6d4", "#00A0C4", "#fb7185", "#94a3b8"],
          "50%"
        )
      );
      setIf(
        "tiktokAge",
        createBarPlaceholder(
          Chart,
          document.getElementById("tiktokAge"),
          ["18–24", "25–34", "35–44", "45–54", "55+"],
          [24.9, 32.4, 23.9, 11.4, 7.4],
          "#06b6d4"
        )
      );

      setIf(
        "youtubeGender",
        createDoughnutPlaceholder(
          Chart,
          document.getElementById("youtubeGender"),
          ["Male", "Female"],
          [45, 55],
          ["#C95353", "#94a3b8"],
          "60%"
        )
      );
      setIf(
        "youtubeAudience",
        createDoughnutPlaceholder(
          Chart,
          document.getElementById("youtubeAudience"),
          ["United States", "Others"],
          [36, 64],
          ["#1f7ced", "#94a3b8"],
          "50%"
        )
      );
      setIf(
        "youtubeAge",
        createBarPlaceholder(
          Chart,
          document.getElementById("youtubeAge"),
          ["13–17", "18–24", "25–34", "35–44", "45–54", "55–64", "65+"],
          [6.1, 18.4, 33.8, 23.5, 11.9, 4.3, 2.1],
          "#C95353"
        )
      );

      // Animation runner
      const SECTION_MAP = {
        "tiktok-audience": {
          charts: ["tiktokGender", "tiktokAudience", "tiktokAge"],
          numbers: [
            ['tiktokFollowers', 40000, 1400, 'compact'],
            ['tiktokViews', 7000000, 1500, 'compact'],
            ['tiktokEngagement', 40, 1000, 'integer'],
            ['tiktokDailyLiveWatchers', 300, 1000, 'compact'],
            ['tiktokActiveViewers', 25000, 1500, 'compact'],
            ['tiktokPeakConcurrentViewers', 7200, 1000, 'compact'],
          ],
        },
        "youtube-audience": {
          charts: ["youtubeGender", "youtubeAudience", "youtubeAge"],
          numbers: [
            ["youtubeFollowers", 1300, 1200, "compact"],
            ["youtubeViews", 2300000, 1400, "compact"],
            ["youtubeEngagement", 50, 1000, "integer"],
          ],
        },
      };

      const runAudienceAnimations = (sectionId) => {
        window._audienceCharts = window._audienceCharts || {};
        window._audienceCharts._ranSections =
          window._audienceCharts._ranSections || {};
        if (sectionId) {
          if (window._audienceCharts._ranSections[sectionId]) return;
          const map = SECTION_MAP[sectionId];
          if (!map) return;
          try {
            map.charts.forEach((key) => {
              const item = window._audienceCharts[key];
              if (!item || !item.chart) return;
              item.chart.data.datasets[0].data = item.target;
              item.chart.update({ duration: 900, easing: "easeInOutCubic" });
            });
            map.numbers.forEach(([id, val, dur, fmt]) =>
              animateNumber(id, val, dur, fmt)
            );
            window._audienceCharts._ranSections[sectionId] = true;
          } catch (e) {
            console.warn("Audience section animation failed", sectionId, e);
          }
          return;
        }
        if (window._audienceCharts._ran) return;
        try {
          Object.keys(window._audienceCharts).forEach((key) => {
            if (key === "_ran" || key === "_ranSections") return;
            const item = window._audienceCharts[key];
            if (!item || !item.chart) return;
            item.chart.data.datasets[0].data = item.target;
            item.chart.update({ duration: 900, easing: "easeInOutCubic" });
          });
          // fallback numbers
          animateNumber("tiktokDailyLiveWatchers", 300, 1000, "compact");
          animateNumber("tiktokActiveViewers", 25000, 1500, "compact");
          animateNumber("tiktokPeakConcurrentViewers", 7200, 1000, "compact");

          animateNumber("tiktokFollowers", 40000, 1400, "compact");
          animateNumber("tiktokViews", 4000000, 1500, "compact");
          animateNumber("tiktokEngagement", 30, 1000, "integer");

          animateNumber("youtubeFollowers", 1300, 1200, "compact");
          animateNumber("youtubeViews", 2300000, 1400, "compact");
          animateNumber("youtubeEngagement", 50, 1000, "integer");
          window._audienceCharts._ran = true;
        } catch (e) {
          console.warn("Audience animation failed", e);
        }
      };

      // Observe blocks
      const observeBlock = (selector, sectionId) => {
        const el = document.getElementById(selector);
        if (!el) return;
        if ("IntersectionObserver" in window) {
          const obs = new IntersectionObserver(
            (entries, observer) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  console.debug &&
                    console.debug(
                      "[initAudienceCharts] observed intersect",
                      sectionId
                    );
                  runAudienceAnimations(sectionId);
                  observer.disconnect();
                }
              });
            },
            { threshold: 0.25 }
          );
          obs.observe(el);
          observers.push(obs);
          // Defer the initial bounding rect check to the next frame so layout has settled
          requestAnimationFrame(() => {
            try {
              const rect = el.getBoundingClientRect();
              if (rect.top < window.innerHeight && rect.bottom > 0) {
                console.debug &&
                  console.debug(
                    "[initAudienceCharts] element already in view",
                    sectionId
                  );
                runAudienceAnimations(sectionId);
                obs.disconnect();
              }
            } catch (e) {
              /* ignore */
            }
          });
        } else {
          runAudienceAnimations(sectionId);
        }
      };

      observeBlock("tiktok-audience", "tiktok-audience");
      observeBlock("youtube-audience", "youtube-audience");

      // expose for manual triggers
      window.initAudienceCharts = setupCharts;
    };

    setupCharts();

    return () => {
      // cleanup observers
      observers.forEach((o) => {
        try {
          o.disconnect();
        } catch (e) {}
      });
      // destroy charts we created
      try {
        if (window._audienceCharts) {
          Object.keys(window._audienceCharts).forEach((k) => {
            const item = window._audienceCharts[k];
            if (
              item &&
              item.chart &&
              typeof item.chart.destroy === "function"
            ) {
              try {
                item.chart.destroy();
              } catch (e) {}
            }
          });
        }
        if (window && window.initAudienceCharts)
          delete window.initAudienceCharts;
      } catch (e) {}
    };
  }, []);

  return (
    <section id="audience" className="bg-[#f8d481] py-12 section-shadow relative z-10 w-full">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-semibold">Audience</h2>
          <p className="mt-2">Demographics, interests and top metrics.</p>
        </header>

        <section className="grid grid-cols-1 gap-6">
          {/* TikTok block */}
          <article
            id="tiktok-audience"
            className="bg-white shadow rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-3">
              <i className="bi-tiktok text-[#06b6d4]"></i>
              <span>TikTok</span>
            </h2>

            {/* Top Live Metrics row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-5xl font-extrabold text-[#06b6d4]">
                  <span id="tiktokDailyLiveWatchers">0</span>+
                </div>
                <div className="text-md text-gray-600">
                  Avg Daily Live Viewers
                </div>
              </div>

              <div className="text-center">
                <div className="text-5xl font-extrabold text-[#06b6d4]">
                  <span id="tiktokActiveViewers">0</span>
                </div>
                <div className="text-md text-gray-600">
                  Monthly Live Viewers
                </div>
              </div>

              <div className="text-center">
                <div className="text-5xl font-extrabold text-[#06b6d4]">
                  <span id="tiktokPeakConcurrentViewers">0</span>
                </div>
                <div className="text-md text-gray-600">
                  Peak Concurrent Live Viewers
                </div>
              </div>
            </div>

            {/* Top Short-Form Videos Metrics row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-5xl font-extrabold text-[#06b6d4]">
                  <span id="tiktokFollowers">0</span>
                </div>
                <div className="text-md text-gray-600">Followers</div>
              </div>

              <div className="text-center">
                <div className="text-5xl font-extrabold text-[#06b6d4]">
                  <span id="tiktokViews">0</span>
                </div>
                <div className="text-md text-gray-600">Views</div>
              </div>

              <div className="text-center">
                <div className="text-5xl font-extrabold text-[#06b6d4]">
                  <span id="tiktokEngagement">0</span>%
                </div>
                <div className="text-md text-gray-600">Engaged Views</div>
              </div>
            </div>

            {/* Demographics section */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <strong>Age</strong>
                  <div className="mt-2 w-full h-40">
                    <canvas
                      id="tiktokAge"
                      aria-label="TikTok age distribution"
                    />
                  </div>
                </div>

                <div>
                  <strong>Gender</strong>
                  <div className="mt-2 w-100 h-40">
                    <canvas
                      id="tiktokGender"
                      aria-label="TikTok gender chart"
                    />
                  </div>
                </div>

                <div>
                  <strong>Country</strong>
                  <div className="mt-2 w-100 h-48">
                    <canvas
                      id="tiktokAudience"
                      aria-label="TikTok audience countries chart"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Interests */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-center">
                Interests
              </h3>
              <ul className="badge-list">
                <li className="badge badge--tiktok">Merchandising</li>
                <li className="badge badge--tiktok">Theme Parks</li>
                <li className="badge badge--tiktok">
                  Travel &amp; Hotel Stays
                </li>
                <li className="badge badge--tiktok">Entertainment</li>
              </ul>
            </div>
          </article>

          {/* YouTube block */}
          <article
            id="youtube-audience"
            className="bg-white shadow rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-3">
              <i className="bi-youtube text-red-600"></i>
              <span>YouTube</span>
            </h2>

            {/* Top numbers row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-5xl font-extrabold text-[#C95353]">
                  <span id="youtubeFollowers">0</span>
                </div>
                <div className="text-lg text-gray-600">Followers</div>
              </div>

              <div className="text-center">
                <div className="text-5xl font-extrabold text-[#C95353]">
                  <span id="youtubeViews">0</span>
                </div>
                <div className="text-lg text-gray-600">Views</div>
              </div>

              <div className="text-center">
                <div className="text-5xl font-extrabold text-[#C95353]">
                  <span id="youtubeEngagement">0</span>%
                </div>
                <div className="text-lg text-gray-600">Engaged Views</div>
              </div>
            </div>

            {/* Demographics section */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <strong>Age</strong>
                  <div className="mt-2 w-full h-40">
                    <canvas
                      id="youtubeAge"
                      aria-label="YouTube age distribution"
                    />
                  </div>
                </div>

                <div>
                  <strong>Gender</strong>
                  <div className="mt-2 w-100 h-40">
                    <canvas
                      id="youtubeGender"
                      aria-label="YouTube gender chart"
                    />
                  </div>
                </div>

                <div>
                  <strong>Country</strong>
                  <div className="mt-2 w-100 h-48">
                    <canvas
                      id="youtubeAudience"
                      aria-label="YouTube audience countries chart"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Interests */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-center">
                Interests
              </h3>
              <ul className="badge-list">
                <li className="badge badge--youtube">Curiosities</li>
                <li className="badge badge--youtube">Entertainment</li>
              </ul>
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}
