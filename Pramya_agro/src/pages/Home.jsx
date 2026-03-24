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
import { useState,useEffect } from "react";

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await API.get("/products?featured=true"); // adjust endpoint
        setFeaturedProducts(res.data.slice(0, 4)); // only first 3-4 products
      } catch (err) {
        console.error("Failed to fetch featured products", err);
      }
    };

    fetchFeaturedProducts();
  }, []);
return ( <div className="relative bg-[#030504] text-white overflow-x-hidden">

```
  {/* BACKGROUND GLOW */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-emerald-600/20 blur-[200px] rounded-full"></div>
    <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-blue-600/10 blur-[180px] rounded-full"></div>
  </div>

  {/* ================= HERO SECTION ================= */}

  <section className="relative min-h-screen flex items-center pt-24">

    <Swiper
      modules={[Autoplay, EffectFade, Pagination]}
      effect="fade"
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      loop
      className="absolute inset-0 w-full h-full"
    >
      {[
        "https://images.unsplash.com/photo-1625246333195-58197bd47d26?auto=format&fit=crop&q=80&w=1600",
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1600",
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1600",
      ].map((img, i) => (
        <SwiperSlide key={i}>
          <div className="relative w-full h-full">
            <img
              src={img}
              alt="Organic Farm"
              className="w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    <div className="relative z-10 max-w-7xl mx-auto px-6">
      <div className="max-w-3xl space-y-10">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-emerald-400 text-xs font-bold uppercase">
          <Sprout size={14} /> 100% Organic Technology
        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold leading-[0.9] tracking-tight">
          <span className="block text-white/90">PURE SOIL.</span>
          <span className="block bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-700 bg-clip-text text-transparent">
            SMART YIELD.
          </span>
        </h1>

        <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
          Pramay Agro delivers premium organic produce powered by intelligent
          agricultural insights. Where sustainability meets smart farming.
        </p>

        <div className="flex gap-6 pt-4">

          <Link to="/products">
            <button className="px-8 py-4 bg-emerald-500 text-black font-bold text-sm rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.7)] hover:bg-emerald-400 transition flex items-center gap-2">
              Explore Shop
              <ArrowRight size={16} />
            </button>
          </Link>

          <Link to="/about">
            <button className="px-8 py-4 border border-white/20 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition">
              Our Story
            </button>
          </Link>

        </div>

      </div>
    </div>

  </section>

  {/* ================= STATS ================= */}

  <section className="py-24 border-y border-white/5 bg-black/40 backdrop-blur-xl">

    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-16">

      {[
        { label: "Global Export", value: 24, suffix: "+", icon: <Globe size={22} /> },
        { label: "Happy Farmers", value: 15000, suffix: "+", icon: <User size={22} /> },
        { label: "Smart Tech", value: 100, suffix: "%", icon: <Zap size={22} /> },
        { label: "Certified Grade", value: 100, suffix: "%", icon: <ShieldCheck size={22} /> },
      ].map((stat, i) => (
        <div
          key={i}
          className="flex flex-col items-center text-center group"
        >

          <div className="w-14 h-14 flex items-center justify-center text-emerald-400 bg-white/5 rounded-2xl mb-6 border border-white/10 group-hover:scale-110 transition duration-300">
            {stat.icon}
          </div>

          <h3 className="text-4xl font-extrabold mb-2">
            <CountUp end={stat.value} duration={3} suffix={stat.suffix} />
          </h3>

          <p className="text-xs text-gray-500 uppercase font-bold tracking-[3px]">
            {stat.label}
          </p>

        </div>
      ))}

    </div>

  </section>

  {/* ================= WHY CHOOSE ================= */}

  <section className="py-28">

    <div className="max-w-7xl mx-auto px-6 text-center space-y-16">

      <h2 className="text-4xl md:text-5xl font-bold">
        Why Choose <span className="text-emerald-500">Pramaya?</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-10">

        {[
          {
            title: "Sustainable Farming",
            desc: "Eco-friendly agricultural practices that nurture soil health and biodiversity.",
          },
          {
            title: "Smart Technology",
            desc: "Advanced insights and modern techniques to maximize crop yield.",
          },
          {
            title: "Premium Quality",
            desc: "Carefully cultivated organic products meeting global standards.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:scale-105"
          >

            <h3 className="text-xl font-bold mb-4 text-emerald-400">
              {item.title}
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              {item.desc}
            </p>

          </div>
        ))}

      </div>

    </div>

  </section>

  {/* ================= FEATURED PRODUCTS ================= */}

 <section className="py-28 bg-gradient-to-b from-transparent to-emerald-950/20">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex justify-between items-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold">
        Featured <span className="text-emerald-500">Products</span>
      </h2>

      <Link to="/products" className="flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition">
        View All <ArrowRight size={18} />
      </Link>
    </div>

    <div className="grid md:grid-cols-4 gap-8">
      {featuredProducts.map((product) => (
        <div
          key={product.id}
          className="group bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500 transition hover:-translate-y-2"
        >
          <img
            src={product.image || "https://via.placeholder.com/300"}
            alt={product.name}
            className="h-48 w-full object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="p-6 space-y-2">
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-emerald-400 font-bold">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  {/* ================= CTA ================= */}

  <section className="py-28 text-center">

    <h2 className="text-5xl font-bold mb-6">
      Start Your Organic Journey
    </h2>

    <p className="text-gray-400 mb-10">
      Join thousands of farmers and customers choosing sustainable food.
    </p>

    <Link to="/signup">
      <button className="px-10 py-4 bg-emerald-500 text-black rounded-full font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.7)] hover:bg-emerald-400 transition">
        Get Started
      </button>
    </Link>

  </section>

</div>
);
}

