import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Unlock from './pages/Unlock';
import CourseDashboard from './pages/CourseDashboard';
import DayContent from './pages/DayContent';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/unlock/:courseId" element={<Unlock />} />
          <Route path="/course/:courseId" element={<CourseDashboard />} />
          <Route path="/course/:courseId/day/:day" element={<DayContent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}