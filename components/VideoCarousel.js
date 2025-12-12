import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import VideoCard from './VideoCard'

export default function VideoCarousel({ videos = [], platform = '' }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={20}
      slidesPerView={1}
      navigation={{ prevEl: '.swiper-button-prev-custom', nextEl: '.swiper-button-next-custom' }}
      pagination={{ clickable: true }}
      touchEventsTarget="wrapper"
      touchStartPreventDefault={false}
      touchStartForcePreventDefault={false}
      simulateTouch={true}
      allowTouchMove={true}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {videos.map((v) => (
        <SwiperSlide key={`${v.platform}-${v.id}`}>
          <div className="px-2">
            <VideoCard video={v} />
          </div>
        </SwiperSlide>
      ))}

      {/* Custom navigation buttons: keep default swiper classes for existing styles, plus custom selectors used by Swiper */}
      <button className="swiper-button-prev swiper-button-prev-custom" aria-label="Previous">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <g data-name="Circle kiri">
            <path d="M12 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1-10 10zm0-18a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8z" style={{ fill: '#1c1b1e' }} />
            <path d="M13 16a1 1 0 0 1-.707-.293l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L11.414 12l2.293 2.293A1 1 0 0 1 13 16z" style={{ fill: '#1c1b1e' }} />
          </g>
        </svg>
      </button>

      <button className="swiper-button-next swiper-button-next-custom" aria-label="Next">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <g data-name="Circle kanan">
            <path d="M12 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1-10 10zm0-18a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8z" style={{ fill: '#1c1b1e' }} />
            <path d="M11 16a1 1 0 0 1-.707-1.707L12.586 12l-2.293-2.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3A1 1 0 0 1 11 16z" style={{ fill: '#1c1b1e' }} />
          </g>
        </svg>
      </button>
    </Swiper>
  )
}
