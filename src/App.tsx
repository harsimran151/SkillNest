import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Community from "./pages/Community";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import TeachSkill from "./pages/TeachSkill";
import LearnSkill from "./pages/LearnSkill";
import ExchangeSkills from "./pages/ExchangeSkills";
import TaskMarketplace from "./pages/TaskMarketplace";
import CampusCommunity from "./pages/CampusCommunity";
import AIMentor from "./pages/AIMentor";
import QuizSkills from "./pages/QuizSkills";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/* ✅ Animation-safe routed component */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div className="page" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/community" element={<Community />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/teach-skill" element={<TeachSkill />} />
        <Route path="/learn-skill" element={<LearnSkill />} />
        <Route path="/exchange-skills" element={<ExchangeSkills />} />
        <Route path="/task-marketplace" element={<TaskMarketplace />} />
        <Route path="/campus-community" element={<CampusCommunity />} />
        <Route path="/ai-mentor" element={<AIMentor />} />
        <Route path="/quiz" element={<QuizSkills />} />
        <Route path="/quiz/html" element={<Quiz />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* ✅ Router wraps everything */}
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
