import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
