import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
    UserIcon,
    TrophyIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/solid";

export default function Profile() {
    const [user, setUser] = useLocalStorage<{ name: string; xp: number }>(
        "Enter your name",
        { name: "Enter your name", xp: 0 }
    );
    const [completed] = useLocalStorage<any[]>("completedCourses", []);
    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState(user.name);

    const xpToNextLevel = 1000; // adjustable logic
    const xpPercent = (user.xp / xpToNextLevel) * 100;

    const saveName = () => {
        setUser({ ...user, name: newName });
        setEditing(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white  overflow-hidden relative">

            {/* Background Glows */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
            </div>

            <div className="relative max-w-4xl mx-auto px-6 py-16">

                {/* Profile Card */}
                <section className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <div className="flex flex-col items-center text-center space-y-6">

                        {/* Avatar */}
                        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 p-1 shadow-xl">
                            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                                <UserIcon className="w-16 h-16 text-white/80" />
                            </div>
                        </div>

                        {/* Name + Edit */}
                        {editing ? (
                            <div className="space-y-3">
                                <input
                                    className="px-3 py-2 w-full rounded-lg text-black"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                                <button
                                    onClick={saveName}
                                    className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg font-semibold"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent cursor-pointer"
                                onClick={() => setEditing(true)}>
                                {user.name}
                            </h2>
                        )}

                        {/* XP Section */}
                        <div>
                            <div className="text-center">
                                <TrophyIcon className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
                                <p className="text-xl font-semibold">{user.xp} XP Earned</p>
                            </div>

                            <div className="mt-4 w-full bg-gray-700 h-4 rounded-full overflow-hidden">
                                <div
                                    className="h-4 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
                                    style={{ width: `${xpPercent}%` }}
                                ></div>
                            </div>
                            <p className="text-gray-300 mt-1 text-sm">
                                {xpToNextLevel - user.xp} XP to next level
                            </p>
                        </div>
                    </div>
                </section>

                {/* Completed Courses */}
                <section className="mt-16">
                    <h3 className="text-3xl font-black bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent flex items-center mb-8">
                        <CheckCircleIcon className="w-9 h-9 mr-3" />
                        Completed Courses ({completed.length})
                    </h3>

                    {completed.length ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {completed.map((c:any, i:any) => (
                                <div
                                    key={i}
                                    className="p-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 transition"
                                >
                                    <p className="text-xl font-semibold">Course {c.id}</p>
                                    <p className="text-gray-300 text-sm mt-1">
                                        Completed on {new Date(c.date).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No courses completed yet.</p>
                    )}
                </section>

                
            </div>
        </div>
    );
}
