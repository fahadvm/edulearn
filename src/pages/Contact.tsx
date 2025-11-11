import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Contact() {
  const [message, setMessage] = useState("");

  const submitForm = (e: any) => {
    e.preventDefault();
    alert("Message Sent Successfully ✨");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-6 py-16 relative">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500 blur-3xl mix-blend-multiply opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-pink-500 blur-3xl mix-blend-multiply opacity-40 animate-pulse"></div>
      </div>

      <div className="max-w-3xl mx-auto backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-xl">

        <h1 className="text-4xl sm:text-5xl font-black text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Contact Us
        </h1>

        <p className="text-gray-300 text-center mb-10">
          Have questions or feedback? We’d love to hear from you!
        </p>

        <form onSubmit={submitForm} className="space-y-5">

          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400"
          />

          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full px-4 py-3 h-32 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400"
          />

          <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 rounded-xl font-bold shadow-xl transition">
            Send Message
          </button>
        </form>

        <div className="mt-12 text-center space-y-3 text-gray-300">
          <p className="flex justify-center items-center gap-2"><PhoneIcon className="w-5 h-5 text-cyan-400" /> +91 98765 43210</p>
          <p className="flex justify-center items-center gap-2"><EnvelopeIcon className="w-5 h-5 text-pink-400" /> support@edulearn.com</p>
          <p className="flex justify-center items-center gap-2"><MapPinIcon className="w-5 h-5 text-yellow-400" /> India • Online Learning Platform</p>
        </div>

      </div>
    </div>
  );
}
