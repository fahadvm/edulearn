import { AcademicCapIcon, SparklesIcon, UsersIcon, GlobeAltIcon } from "@heroicons/react/24/solid";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-6 py-16 relative">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-cyan-500 mix-blend-multiply blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-pink-500 mix-blend-multiply blur-3xl opacity-40 animate-pulse"></div>
      </div>

      <div className="max-w-4xl mx-auto backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-xl text-center">

        <h1 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
          About EduLearn
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          EduLearn is a future-ready learning platform built for passionate learners who want to grow,
          explore, and excel. We provide structured learning paths, daily progress tracking, and an
          engaging gamified experience to keep you motivated every step of the way.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

          <div className="bg-white/10 border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-all text-center">
            <AcademicCapIcon className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Smart Learning Paths</h3>
            <p className="text-gray-300 text-sm">
              Courses are structured step-by-step to help you master concepts smoothly.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-all text-center">
            <SparklesIcon className="w-12 h-12 text-pink-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Gamified Experience</h3>
            <p className="text-gray-300 text-sm">
              Earn XP and certificates as you complete lessons and milestones.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-all text-center">
            <UsersIcon className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Community & Support</h3>
            <p className="text-gray-300 text-sm">
              Join like-minded learners and grow together through shared learning.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-all text-center">
            <GlobeAltIcon className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Learn Anywhere</h3>
            <p className="text-gray-300 text-sm">
              Access courses from any device — continue learning on your schedule.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
