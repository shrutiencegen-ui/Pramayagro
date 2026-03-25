import { Link } from "react-router-dom";
import {
  Sprout,
  Globe,
  User,
  Zap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import CountUp from "react-countup";
import API from "../services/api";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import home from "../assets/home1.png";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.png";
export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await API.get("/products?featured=true");
        setFeaturedProducts(res.data.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch featured products", err);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="relative bg-[#030504] text-white overflow-x-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-emerald-600/20 blur-[160px] md:blur-[220px] rounded-full"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-blue-600/10 blur-[140px] md:blur-[200px] rounded-full"></div>
      </div>

      {/* HERO */}
     <section className="relative h-[100vh] w-full overflow-hidden">

  {/* SLIDER */}
  <Swiper
    modules={[Autoplay, EffectFade, Pagination]}
    effect="fade"
    autoplay={{ delay: 4000 }}
    pagination={{ clickable: true }}
    loop
    className="absolute inset-0 w-full h-full"
  >
    {[
      home,home2,home3
    ].map((img, i) => (
      <SwiperSlide key={i}>
        <div className="relative w-full h-full">

          {/* IMAGE */}
          <img
            src={img}
            alt="Organic Farm"
            className="w-full h-full object-cover scale-125 md:scale-110"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

        </div>
      </SwiperSlide>
    ))}
  </Swiper>

  {/* CONTENT ON IMAGE */}
  <div className="absolute inset-0 z-10 flex items-center justify-center px-4">

    <div className="max-w-3xl text-center space-y-6 md:space-y-10">
     <div className="bg-black/30 backdrop-blur-md px-6 py-6 rounded-2xl border border-white/10">
           {/* TAG */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-emerald-400 text-xs font-bold uppercase">
        <Sprout size={14} /> 100% Organic Technology
      </div>

      {/* HEADING */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight 
drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
        <span className="block text-white/90">PURE SOIL.</span>
        <span className="block bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-700 bg-clip-text text-transparent">
          SMART YIELD.
        </span>
      </h1>

      {/* DESC */}
      <p className="text-sm sm:text-base md:text-lg text-gray-200 
drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
        Premium organic produce powered by intelligent farming.
      </p>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">

        <Link to="/products">
          <button className="px-6 py-3 md:px-8 md:py-4 bg-emerald-500 text-black font-bold text-xs md:text-sm rounded-full uppercase tracking-widest hover:bg-emerald-400 transition flex items-center justify-center gap-2">
            Explore Shop <ArrowRight size={16} />
          </button>
        </Link>

        <Link to="/about">
          <button className="px-6 py-3 md:px-8 md:py-4 border border-white/30 rounded-full text-xs md:text-sm font-bold uppercase hover:bg-white/10 transition">
            Our Story
          </button>
        </Link>

      </div>
      </div>

  

    </div>

  </div>

</section>

      {/* STATS */}
      <section className="py-16 md:py-24 border-y border-white/5 bg-black/40 backdrop-blur">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">

          {[
            { label: "Global Export", value: 24, suffix: "+", icon: <Globe size={20} /> },
            { label: "Happy Farmers", value: 15000, suffix: "+", icon: <User size={20} /> },
            { label: "Smart Tech", value: 100, suffix: "%", icon: <Zap size={20} /> },
            { label: "Certified Grade", value: 100, suffix: "%", icon: <ShieldCheck size={20} /> },
          ].map((stat, i) => (
            <div key={i} className="text-center">

              <div className="w-12 h-12 md:w-14 md:h-14 mx-auto flex items-center justify-center text-emerald-400 bg-white/5 rounded-xl mb-4">
                {stat.icon}
              </div>

              <h3 className="text-2xl md:text-4xl font-extrabold">
                <CountUp end={stat.value} duration={3} suffix={stat.suffix} />
              </h3>

              <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">
                {stat.label}
              </p>

            </div>
          ))}

        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20 md:py-28">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-12 md:space-y-16">

          <h2 className="text-3xl md:text-5xl font-bold">
            Why Choose <span className="text-emerald-500">Pramaya?</span>
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">

            {[
              {
                title: "Sustainable Farming",
                desc: "Eco-friendly practices that nurture soil health.",
              },
              {
                title: "Smart Technology",
                desc: "Modern insights to maximize crop yield.",
              },
              {
                title: "Premium Quality",
                desc: "Organic products meeting global standards.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 md:p-10 bg-white/5 backdrop-blur rounded-2xl border border-white/10 hover:border-emerald-500/40 hover:scale-105 transition"
              >
                <h3 className="text-lg md:text-xl font-bold mb-3 text-emerald-400">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-transparent to-emerald-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 md:mb-16 gap-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              Featured <span className="text-emerald-500">Products</span>
            </h2>

            <Link to="/products" className="text-emerald-400 font-bold flex items-center gap-2">
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-500 transition"
              >
                <img
                  src={product.image || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="h-40 md:h-48 w-full object-cover group-hover:scale-110 transition"
                />
                <div className="p-4 md:p-6">
                  <h3 className="font-semibold text-sm md:text-base">{product.name}</h3>
                  <p className="text-emerald-400 font-bold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 text-center px-4">

        <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
          Start Your Organic Journey
        </h2>

        <p className="text-gray-400 mb-8 md:mb-10 text-sm md:text-base">
          Join thousands choosing sustainable food.
        </p>

        <Link to="/signup">
          <button className="px-8 py-3 md:px-10 md:py-4 bg-emerald-500 text-black rounded-full font-bold hover:bg-emerald-400 transition">
            Get Started
          </button>
        </Link>

      </section>

    </div>
  );
}