import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../buttons/PrimaryButton";
import api from "../../utils/api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./hero.css";

export default function HeroBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBanners() {
      try {
        const { data } = await api.get("/banners");
        setBanners(data);
      } catch (err) {
        console.error("Failed to load banners", err);
      } finally {
        setLoading(false);
      }
    }
    loadBanners();
  }, []);

  if (loading) {
    return (
      <section className="hero-banner" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
        <h2>Loading...</h2>
      </section>
    );
  }

  if (banners.length === 0) {
    return null; // Or a default static banner
  }

  return (
    <section className="hero-banner-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <div className="hero-slide">
              <div className="hero-content">
                <h1>{banner.title}</h1>
                <p>{banner.subtitle}</p>
                <Link to={banner.link || "/shop"}>
                  <PrimaryButton>Shop Now</PrimaryButton>
                </Link>
              </div>

              <div className="hero-image">
                <img src={banner.image.url} alt={banner.title} loading="lazy" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
