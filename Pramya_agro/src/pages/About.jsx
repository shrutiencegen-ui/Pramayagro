"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Users, Leaf, Globe, Target } from "lucide-react";

export default function AboutUs() {
  const team = [
    { name: "Shruti Jadhav", role: "Founder & CEO", image: "https://via.placeholder.com/150" },
    { name: "Pramod Patil", role: "Head of Farming", image: "https://via.placeholder.com/150" },
    { name: "Sneha Kulkarni", role: "Marketing Lead", image: "https://via.placeholder.com/150" },
    { name: "Rohit Deshmukh", role: "Sustainability Officer", image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="bg-[#050707] text-white min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1770&q=80')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <h1 className="relative text-5xl md:text-6xl font-extrabold text-emerald-400 text-center px-6">
          About <span className="text-white">Pramay Agro</span>
        </h1>
      </section>

      {/* Who We Are */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center space-y-10">
        <h2 className="text-4xl font-extrabold text-white">Who We Are</h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          Pramay Agro is a sustainable agriculture company committed to providing premium organic products, empowering farmers, and promoting eco-friendly farming solutions. Our mission is to nurture the earth while nourishing communities.
        </p>

        {/* Mission/Vision/Values Cards */}
        <div className="mt-16 grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-8 rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300">
            <Leaf size={32} className="mx-auto text-white mb-4" />
            <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
            <p className="text-gray-100">
              Deliver high-quality organic produce while promoting sustainable farming and supporting local farmers.
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-8 rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300">
            <Target size={32} className="mx-auto text-white mb-4" />
            <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
            <p className="text-gray-100">
              To be a leader in eco-friendly agriculture, creating a greener planet and healthier communities.
            </p>
          </div>

          <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-8 rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300">
            <Globe size={32} className="mx-auto text-white mb-4" />
            <h3 className="text-2xl font-bold mb-2">Our Values</h3>
            <p className="text-gray-100">
              Integrity, sustainability, community empowerment, and innovation in every step we take.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-black/40 py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-12">Meet Our Team</h2>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl hover:scale-105 transition-transform duration-300 shadow-lg">
                <img src={member.image} alt={member.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-2 border-emerald-400" />
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-emerald-500 text-black text-center rounded-t-3xl">
        <h2 className="text-4xl font-extrabold mb-4">Join Us on Our Journey</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Experience the best organic products and support sustainable agriculture. Let's grow a greener future together.
        </p>
        <a href="/products" className="inline-block px-8 py-4 bg-black text-emerald-500 font-bold rounded-2xl hover:bg-white hover:text-emerald-600 transition-all duration-300 shadow-lg">
          Explore Products
        </a>
      </section>

   
    </div>
  );
}