import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlayIcon, CheckCircleIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface Course {
  id: number;
  name: string;
  days: any[];
  description?: string;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [unlocked] = useLocalStorage<number[]>("unlockedCourses", []);
  const [progress] = useLocalStorage<Record<number, number[]>>("progress", {});

  useEffect(() => {
    fetch("/data/courses.json")
      .then((res) => res.json())
      .then(setCourses);
  }, []);

  const getProgress = (courseId: number) => {
    const completed = progress[courseId]?.length || 0;
    return (completed / 7) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">

       {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Elevate Your Learning Journey
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Discover cutting-edge courses designed for the future. Unlock your potential with interactive, modern education.
          </p>
          <button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
            <h3 className="text-4xl font-bold text-cyan-400">100+</h3>
            <p className="text-gray-300">Students Enrolled</p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20">
            <h3 className="text-4xl font-bold text-green-400">50+</h3>
            <p className="text-gray-300">Expert Instructors</p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-pink-500/20 to-orange-500/20">
            <h3 className="text-4xl font-bold text-pink-400">20+</h3>
            <p className="text-gray-300">Courses Available</p>
          </div>
        </div>
      </section>


      {/* Courses Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Your Courses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {courses.map((course) => {
              const progressValue = getProgress(course.id);
              const isUnlocked = unlocked.includes(course.id);

              return (
                <div
                  key={course.id}
                  className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-white/20"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-cyan-400 mr-3">
                      {progressValue === 100 ? (
                        <CheckCircleIcon className="w-8 h-8" />
                      ) : isUnlocked ? (
                        <PlayIcon className="w-8 h-8" />
                      ) : (
                        <LockClosedIcon className="w-8 h-8" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {course.name}
                    </h3>
                  </div>

                  <p className="text-gray-300 text-sm mb-4">
                    {course.description || "Start your learning journey."}
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Progress</span>
                      <span>{progressValue.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progressValue}%` }}
                      ></div>
                    </div>
                  </div>

                  <Link
                    to={isUnlocked ? `/course/${course.id}` : `/unlock/${course.id}`}
                    className={`block w-full text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      isUnlocked
                        ? "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    }`}
                  >
                    {isUnlocked ? "Continue Learning" : "Unlock Course"}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
       {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            What Our Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <p className="text-gray-300 mb-4">"This platform transformed my career. The courses are top-notch!"</p>
              <p className="font-semibold text-cyan-400">- Risvana</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <p className="text-gray-300 mb-4">"Interactive and engaging. I learned so much in such a short time."</p>
              <p className="font-semibold text-cyan-400">- Ajsal</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <p className="text-gray-300 mb-4">"Highly recommend for anyone looking to upskill."</p>
              <p className="font-semibold text-cyan-400">- Sanju</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">&copy; 2025 EduLearn. All rights reserved. | <a href="#" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</a></p>
        </div>
      </footer>
    </div>
  );
};


