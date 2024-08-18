import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./index.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Slider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full h-full"
      >
        <SwiperSlide>
          <img
            className="w-full h-full"
            src="https://im.uniqlo.com/global-cms/spa/res0d1ec3c07108fa4ce1f1a0506b944cb8fr.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full"
            src="https://im.uniqlo.com/global-cms/spa/resa1545c5e22dde91f6b0be4899def258afr.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full"
            src="https://im.uniqlo.com/global-cms/spa/res2d1b6eccf051fb70d7103cebcf3ac287fr.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full"
            src="https://im.uniqlo.com/global-cms/spa/res2d1b6eccf051fb70d7103cebcf3ac287fr.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full"
            src="https://im.uniqlo.com/global-cms/spa/rescae0fa9632f7896e2dba4055b544fef8fr.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
