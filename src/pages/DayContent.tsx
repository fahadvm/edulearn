import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  CheckCircleIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";

export default function DayContent() {
  const { courseId, day } = useParams();
  const id = Number(courseId);
  const dayNum = Number(day);

  const [course, setCourse] = useState<any>(null);
  const [progress, setProgress] = useLocalStorage<Record<number, number[]>>(
    "progress",
    {}
  );
  const [user, setUser] = useLocalStorage<{ name: string; xp: number }>("user", {
    name: "User",
    xp: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/courses.json")
      .then((res) => res.json())
      .then((data) => setCourse(data.find((c: any) => c.id === id)));
  }, [id]);

  const dayData = course?.days.find((d: any) => d.day === dayNum);
  const completedDays = progress[id] || [];
  const isCompleted = completedDays.includes(dayNum);

  const markComplete = () => {
    const updated = [...new Set([...completedDays, dayNum])];
    setProgress({ ...progress, [id]: updated });
    setUser({ ...user, xp: user.xp + 10 });
    navigate(`/course/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-4 sm:px-6 py-10 sm:py-16 overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-cyan-500 mix-blend-multiply blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-pink-500 mix-blend-multiply blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-3xl mx-auto backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">

        <button
          onClick={() => navigate(`/course/${id}`)}
          className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition mb-4 sm:mb-6"
        >
          <ArrowLeftIcon className="w-5 h-5" /> Back to Course
        </button>

        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            Day {dayNum}: {course?.name}
          </h1>
          <p className="text-gray-300 mt-2 flex justify-center items-center gap-2">
            <BookOpenIcon className="w-6 h-6 text-cyan-400" />
            Learning Progress Session
          </p>
        </div>

        {/* Topics */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-cyan-400 mb-3">Topics Covered</h2>

          <ul className="space-y-4">
            {dayData?.topics.map((topic: any, i: number) => (
              <li
                key={i}
                className="bg-white/10 border border-white/20 p-4 rounded-xl hover:bg-white/20 transition-all"
              >
                <p className="text-lg font-semibold text-white">{topic.title}</p>
                <p className="text-gray-300 text-sm mt-1">{topic.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Task */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">Daily Task</h2>
          <p className="text-gray-200 bg-white/10 border border-white/20 rounded-xl p-4 leading-relaxed">
            {dayData?.task}
          </p>
        </section>

        {/* Complete Button */}
        <div className="text-center">
          {!isCompleted ? (
            <button
              onClick={markComplete}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg transition transform hover:scale-105"
            >
              <CheckCircleIcon className="w-6 h-6" />
              Mark as Completed (+10 XP)
            </button>
          ) : (
            <p className="text-green-400 text-lg font-semibold flex items-center justify-center gap-2">
              <TrophyIcon className="w-6 h-6" /> Completed!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
