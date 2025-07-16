// Correct imports for Swiper components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Example Swiper configuration
export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      effect="coverflow"
      autoplay={{ delay: 2500 }}
      coverflowEffect={{ rotate: 30, slideShadows: false }}
    >
      <SwiperSlide>Slide 1 Content</SwiperSlide>
      <SwiperSlide>Slide 2 Content</SwiperSlide>
      <SwiperSlide>Slide 3 Content</SwiperSlide>
    </Swiper>
  );
}
