import { Link } from "react-router-dom";
import { User, Home as HomeIcon } from "lucide-react";

export default function Navbar() {
    return (
        <div className=" bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <header className="backdrop-blur-md bg-white/10 shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo / Brand */}
                        <Link
                            to="/"
                            className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent"
                        >
                            EduLearn
                        </Link>

                        {/* Desktop Menu */}
                        <nav className="hidden md:flex space-x-6">
                            <Link
                                to="/"
                                className="text-white hover:text-yellow-400 transition-colors flex items-center gap-1"
                            >
                                <HomeIcon size={18} /> Home
                            </Link>

                            <Link
                                to="/courses"
                                className="text-white hover:text-yellow-400 transition-colors"
                            >
                                Courses
                            </Link>

                            <Link
                                to="/about"
                                className="text-white hover:text-yellow-400 transition-colors"
                            >
                                About
                            </Link>

                            <Link
                                to="/contact"
                                className="text-white hover:text-yellow-400 transition-colors"
                            >
                                Contact
                            </Link>

                            <Link
                                to="/profile"
                                className="text-white hover:text-yellow-400 transition-colors flex items-center gap-1"
                            >
                                <User size={18} /> Profile
                            </Link>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden text-white text-lg font-medium">
                            Menu
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
}
