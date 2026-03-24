import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="relative bg-[#030504] text-white min-h-screen overflow-hidden">

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-600/20 via-emerald-900/10 to-black/50 py-32">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
            Get in Touch
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl">
            We’re here to answer your questions and help your farm thrive.  
            Reach out to us anytime, and we’ll get back to you promptly.
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 -mt-16 relative z-10">
        {[{
          icon: <Phone size={24} />,
          title: "Call Us",
          info: "+91 98765 43210"
        }, {
          icon: <Mail size={24} />,
          title: "Email",
          info: "info@pramayaagro.com"
        }, {
          icon: <MapPin size={24} />,
          title: "Location",
          info: "Maharashtra, India"
        }].map((card, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl hover:scale-105 transition-all duration-300"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-emerald-500/20 rounded-full mb-4 text-emerald-400">
              {card.icon}
            </div>
            <h3 className="font-bold text-xl mb-2">{card.title}</h3>
            <p className="text-gray-400">{card.info}</p>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-emerald-400">
            Send Us a Message
          </h2>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <textarea
              rows="6"
              placeholder="Your Message"
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <button
              type="submit"
              className="w-full py-4 bg-emerald-500 text-black font-bold text-lg rounded-full hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.7)]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

    
    </div>
  );
}