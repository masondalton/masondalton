import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ProjectsIndex from './pages/ProjectsIndex';
import ProjectDetail from './pages/ProjectDetail';
import NasaExplorer from './pages/NasaExplorer';
import Resume from './pages/Resume';
import Writing from './pages/Writing';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<ProjectsIndex />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/projects/nasa-explorer/:source?" element={<NasaExplorer />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
