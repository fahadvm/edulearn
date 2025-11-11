import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LockClosedIcon, CheckIcon } from "@heroicons/react/24/solid";

export default function Unlock() {
  const { courseId } = useParams();
  const id = Number(courseId);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useLocalStorage<number[]>("unlockedCourses", []);
  const [courses, setCourses] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("courses");
    if (stored) setCourses(JSON.parse(stored));
    else
      fetch("/data/courses.json")
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("courses", JSON.stringify(data));
          setCourses(data);
        });
  }, []);

  const course = courses.find((c) => c.id === id);

  const handleUnlock = () => {
    if (course?.password === password) {
      setUnlocked([...unlocked, id]);
      navigate(`/course/${id}`);
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative">

      {/* Soft Glowing BG Lights */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500 mix-blend-multiply blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500 mix-blend-multiply blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 max-w-md w-full text-center">
        
        <div className="flex justify-center mb  -4">
          <LockClosedIcon className="w-16 h-16 text-pink-400 drop-shadow-lg" />
        </div>

        <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
          Unlock Course
        </h1>

        <p className="text-gray-300 mb-6">
          Enter the secret key to access:
          <br />
          <span className="font-semibold text-white">{course?.name}</span>
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter course password"
          className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
        />

        {error && (
          <p className="text-red-400 text-sm mb-3 animate-pulse">{error}</p>
        )}

        <button
          onClick={handleUnlock}
          className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          Unlock Now
        </button>

        {unlocked.includes(id) && (
          <p className="flex items-center justify-center gap-2 text-green-400 font-semibold mt-4">
            <CheckIcon className="w-5 h-5" /> Already Unlocked
          </p>
        )}
      </div>
    </div>
  );
}
