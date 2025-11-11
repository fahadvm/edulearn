import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import jsPDF from "jspdf";
import {
  LockClosedIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";

export default function CourseDashboard() {
  const { courseId } = useParams();
  const id = Number(courseId);

  const [course, setCourse] = useState<any>(null);
  const [unlocked] = useLocalStorage<number[]>("unlockedCourses", []);
  const [progress] = useLocalStorage<Record<number, number[]>>(
    "progress",
    {}
  );
  const [completedList, setCompletedList] = useLocalStorage<any[]>(
    "completedCourses",
    []
  );
  const [user, setUser] = useLocalStorage<{ name: string; xp: number }>("user", {
    name: "User",
    xp: 0,
  });

  useEffect(() => {
    fetch("/data/courses.json")
      .then((res) => res.json())
      .then((data) => setCourse(data.find((c: any) => c.id === id)));
  }, [id]);

  if (!unlocked.includes(id)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center  bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <LockClosedIcon className="w-16 h-16 text-pink-400 mb-4" />
        <p className="text-lg mb-2">This course is locked.</p>
        <Link
          to={`/unlock/${id}`}
          className="text-cyan-400 hover:text-cyan-300 underline text-lg"
        >
          Unlock Here
        </Link>
      </div>
    );
  }

  const completedDays = progress[id] || [];
  const isComplete = completedDays.length === 7;

  const generateCertificate = () => {
    const doc = new jsPDF();
    doc.text(`Certificate of Completion`, 105, 50, { align: "center" });
    doc.text(`Course: ${course.name}`, 105, 70, { align: "center" });
    doc.text(`Completed by: ${user.name}`, 105, 90, { align: "center" });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 110, {
      align: "center",
    });
    doc.save(`${course.name}-certificate.pdf`);

    setCompletedList([...completedList, { id, date: new Date().toISOString() }]);
    setUser({ ...user, xp: user.xp + (7 - completedDays.length) * 10 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-6 py-16">

      {/* Course Header Card */}
      <div className="max-w-4xl mx-auto backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl mb-12 text-center">
        <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          {course?.name}
        </h1>

        <div className="w-full bg-gray-700 rounded-full h-5 overflow-hidden shadow-inner mb-4">
          <div
            className="h-5 bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-700"
            style={{ width: `${(completedDays.length / 7) * 100}%` }}
          ></div>
        </div>

        <p className="text-gray-300 text-sm">
          {completedDays.length} / 7 Lessons Completed
        </p>
      </div>

      {/* Lessons Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {course?.days.map((day: any) => {
          const done = completedDays.includes(day.day);

          return (
            <div
              key={day.day}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:bg-white/20 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-2">Day {day.day}</h3>

              <p
                className={`text-sm mb-4 ${
                  done ? "text-green-400" : "text-gray-300"
                }`}
              >
                {done ? "Completed " : "Not Completed"}
              </p>

              <Link
                to={`/course/${id}/day/${day.day}`}
                className="block w-full text-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-2 rounded-xl font-semibold transition transform hover:scale-105"
              >
                Continue Lesson
              </Link>
            </div>
          );
        })}
      </div>

      {/* Certificate Button */}
      {isComplete && (
        <div className="text-center mt-12">
          <button
            onClick={generateCertificate}
            className="inline-flex items-center gap-2 text-lg bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 px-6 py-3 rounded-xl shadow-xl font-bold transition transform hover:scale-105"
          >
            <TrophyIcon className="w-6 h-6" /> Download Certificate
          </button>
        </div>
      )}
    </div>
  );
}
