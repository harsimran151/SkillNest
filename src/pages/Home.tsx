import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import FloatingNav from '@/components/FloatingNav';
import FeatureCard from '@/components/FeatureCard';
import NotificationPanel from '@/components/NotificationPanel';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  GraduationCap, BookOpen, ArrowRightLeft, Briefcase,
  Building2, Gift, Bell, Users, Sparkles, TrendingUp, LogOut,
  Lightbulb, Target, Rocket, Brain, Puzzle, Award
} from 'lucide-react';
import { Phone, MessageCircle } from 'lucide-react';
import { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Aman Verma",
    role: "CSE Student",
    text: "Skill Nest connected me with seniors who actually guided.",
  },
  {
    name: "Simran Kaur",
    role: "UI/UX Designer",
    text: "The skill exchange feature is genuinely unique.",
  },
  {
    name: "Rohit Sharma",
    role: "Final Year Student",
    text: "Task Marketplace helped me earn while improving my skills.",
  },
  {
    name: "Neha Gupta",
    role: "Web Developer",
    text: "The UI feels premium and the community is really supportive.",
  },
];


const useRevealOnScroll = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};



const useCountUp = (end: number, duration = 1500) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      if (ref.current) {
        ref.current.innerText = Math.floor(start).toString();
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return ref;
};



const Home = () => {
  useRevealOnScroll();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const features = [
    {
      title: 'Teach a Skill',
      description: 'Share your expertise and help others learn.',
      icon: <GraduationCap className="w- h-7" />,
      color: 'teach' as const,
      action: () => {
      window.scrollTo(0, 0);
      navigate('/teach-skill');
    },

    },
    {
      title: 'Learn a Skill',
      description: 'Explore curated videos and resources.',
      icon: <BookOpen className="w-7 h-7" />,
      color: 'learn' as const,
      action: () => {
      window.scrollTo(0, 0);
      navigate('/learn-skill');
    },

    },
    {
      title: 'Exchange Skills',
      description: 'Trade skills with other students.',
      icon: <ArrowRightLeft className="w-7 h-7" />,
      color: 'study' as const,
      action: () => {
      window.scrollTo(0, 0);
      navigate('/exchange-skills');
    },

    },
    {
      title: 'Task Marketplace',
      description: 'Earn by completing tasks for others.',
      icon: <Briefcase className="w-7 h-7" />,
      color: 'quiz' as const,
      action: () => {
      window.scrollTo(0, 0);
      navigate('/task-marketplace');
    },

    },
    {
      title: 'Campus Community',
      description: 'Connect with students across campuses.',
      icon: <Building2 className="w-7 h-7" />,
      color: 'mentor' as const,
      action: () => {
      window.scrollTo(0, 0);
      navigate('/campus-community');
    },

    },
    
    {
      title: 'Rewards',
      description: 'Earn points and redeem exciting rewards.',
      icon: <Gift className="w-7 h-7" />,
      color: 'resources' as const,
      action: () => {
      window.scrollTo(0, 0);
      navigate('/rewards');
    },
    
    
    },


    {
    title: "Take a Quiz",
    description: "Test your skills and unlock your potential.",
    icon: <Brain className="w-7 h-7" />,
    color: "study" as const,
    action: () => {
      window.scrollTo(0, 0);
      navigate('/quiz');
    },
  },




  ];

  return (
    <div className="min-h-screen gradient-hero pb-28 relative overflow-hidden">
      {/* Enhanced Background Decorations */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-gradient-to-br from-primary/10 to-feature-learn/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-60 left-0 w-72 h-72 bg-gradient-to-tr from-accent/10 to-feature-teach/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-5 w-48 h-48 bg-gradient-to-bl from-feature-study/10 to-primary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-2/3 left-10 w-40 h-40 bg-gradient-to-r from-feature-quiz/10 to-accent/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      {/* Decorative Education Icons - More illustrations */}
      <div className="absolute top-28 left-80 opacity-[0.08] animate-float">
        <BookOpen className="w-24 h-24 text-primary" />
      </div>
      <div className="absolute top-52 left-10 opacity-[0.08] animate-float" style={{ animationDelay: '2.5s' }}>
        <Puzzle className="w-16 h-16 text-feature-quiz" />
      </div>
      <div className="absolute top-60 right-16 opacity-[0.08] animate-float" style={{ animationDelay: '3s' }}>
        <Rocket className="w-14 h-14 text-accent" />
      </div>
      <div className="absolute top-36 right-80 opacity-[0.08] animate-float" style={{ animationDelay: '0.5s' }}>
        <GraduationCap className="w-20 h-20 text-accent" />
      </div>
      <div className="absolute top-96 left-60 opacity-[0.08] animate-float" style={{ animationDelay: '1s' }}>
        <Lightbulb className="w-16 h-16 text-feature-learn" />
      </div>
      <div className="absolute top-96 right-60 opacity-[0.08] animate-float" style={{ animationDelay: '1.5s' }}>
        <Target className="w-20 h-20 text-feature-teach" />
      </div>
      <div className="absolute top-[600px] left-14 opacity-[0.08] animate-float" style={{ animationDelay: '2s' }}>
        <Brain className="w-14 h-14 text-feature-study" />
      </div>
      <div className="absolute top-[600px] right-16 opacity-[0.08] animate-float">
        <BookOpen className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute top-[850px] right-16 opacity-[0.08] animate-float" style={{ animationDelay: '2.5s' }}>
        <Puzzle className="w-16 h-16 text-feature-quiz" />
      </div>
      <div className="absolute top-[850px] left-16 opacity-[0.08] animate-float" style={{ animationDelay: '3s' }}>
        <Rocket className="w-14 h-14 text-accent" />
      </div>
      <div className="absolute top-[1150px] right-20 opacity-[0.08] animate-float" style={{ animationDelay: '3.5s' }}>
        <Award className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute top-[1100px] left-20 opacity-[0.08] animate-float"
        style={{ animationDelay: '4s' }}
      >
      <Brain className="w-20 h-20 text-feature-study" />
      </div>


      {/* Header */}
      <header className="px-6 pt-8 pb-4 relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Welcome back,</p>
            <h1 className="text-2xl font-bold text-foreground">
              {user?.name?.split(' ')[0] || 'Learner'} 👋
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowNotifications(true)}
              className="relative p-3 rounded-xl bg-card shadow-soft hover:shadow-card transition-all duration-200 hover:scale-105"
            >
              <Bell className="w-6 h-6 text-foreground" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-accent rounded-full animate-pulse" />
            </button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleLogout}
              className="p-3 rounded-xl bg-card shadow-soft hover:shadow-card hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Enhanced Branding & Tagline */}
      <div className="px-6 mb-6 relative">
        <div className="text-center mb-6">
          {/* Main Heading with enhanced styling */}
          <div className="relative inline-block mb-3">
            <div className="absolute -inset-2 bg-gradient-to-r from-feature-teach via-primary to-feature-learn opacity-20 blur-xl rounded-full" />
            <h2 className="relative text-7xl font-extrabold bg-gradient-to-r from-feature-teach via-primary to-feature-learn bg-clip-text text-transparent animate-fade-in drop-shadow-sm">
              Skill Nest
            </h2>
          </div>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          
          <p className="text-muted-foreground text-lg font-medium animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Where Skills Meet, Students Grow 🚀
          </p>
          <p className="text-muted-foreground/70 text-sm mt-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Learn • Teach • Connect • Earn
          </p>
        </div>

        {/* Stats Card - Centered & Compact */}
        <div className="max-w-xs mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-card p-4 animate-scale-in border border-border/30" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="hover:scale-105 transition-transform cursor-default">
                <div className="flex items-center justify-center gap-1">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-lg font-bold">
  <span ref={useCountUp(5420)} />+
</span>

                </div>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
              <div className="hover:scale-105 transition-transform cursor-default">
                <div className="flex items-center justify-center gap-1">
                  <Sparkles className="w-4 h-4 text-feature-learn" />
                  <span className="text-lg font-bold">
  <span ref={useCountUp(1250)} />+
</span>

                </div>
                <p className="text-xs text-muted-foreground">Skills</p>
              </div>
              <div className="hover:scale-105 transition-transform cursor-default">
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="text-lg font-bold">
  <span ref={useCountUp(890)} />+
</span>

                </div>
                <p className="text-xs text-muted-foreground">Exchanges</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Points */}
      <div className="px-6 mb-6 max-w-lg mx-auto">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-soft p-4 hover:shadow-card transition-all border border-border/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Keep Learning!</h3>
              <p className="text-sm text-muted-foreground">3 pending sessions</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">150</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
          </div>
        </div>
      </div>



      {/* Features Grid - Larger boxes */}
      <div className="px-100 max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-foreground mb-4 text-center">What would you like to do?</h2>
        <div className="grid grid-cols-2 gap-5">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                color={feature.color}
                onClick={feature.action}
              />
            </div>
          ))}
        </div>
      </div>


      {/* 🤖 AI MENTOR PREVIEW */}
      <div className="mt-24 px-6 max-w-6xl mx-auto reveal">
        <div className="bg-gradient-to-br from-[#20E3B2]/10 via-[#2CCCFF]/10 to-[#6A5AF9]/10 rounded-3xl p-10 relative overflow-hidden">

          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 blur-3xl rounded-full" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* LEFT */}
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Meet Your <span className="text-primary">AI Mentor</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Get instant guidance on skills, learning paths, and growth decisions.
              </p>

              <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-soft text-sm">
                <p className="font-medium">You:</p>
                <p className="text-muted-foreground mb-3">
                  What skills should I learn as a CS student?
                </p>

                <p className="font-medium">AI Mentor 🤖:</p>
                <p className="text-muted-foreground">
                  Focus on DSA, system design, and one practical tech stack like MERN or AI.
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#20E3B2] via-[#2CCCFF] to-[#6A5AF9] flex items-center justify-center text-4xl shadow-glow">
                🤖
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 🔁 HOW SKILL NEST WORKS */}
      <div className="mt-24 px-6 max-w-6xl mx-auto reveal">
        <h2 className="text-2xl font-bold text-center mb-14">
          How{" "}
          <span className="bg-gradient-to-r from-feature-teach via-primary to-feature-learn bg-clip-text text-transparent">
            Skill Nest
          </span>{" "}
          Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-6">

          {[
            { icon: "🧭", title: "Choose a Skill", desc: "Pick what you want to learn or teach" },
            { icon: "🎓", title: "Learn or Teach", desc: "Share knowledge or gain new skills" },
            { icon: "🤝", title: "Connect", desc: "Collaborate with students like you" },
            { icon: "💰", title: "Earn & Grow", desc: "Get rewards, points, and recognition" },
          ].map((step, i) => (
            <div key={i} className="flex items-center justify-center">

              {/* CARD */}
              <div className="bg-card/80 backdrop-blur rounded-2xl p-6 shadow-soft text-center w-full">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{step.desc}</p>
              </div>

              {/* ARROW (desktop only, except last card) */}
              {i !== 3 && (
                <div className="hidden md:flex mx-2 text-muted-foreground">
                <ChevronRight className="w-7 h-7" />
                </div>    
              )}
            </div>
          ))}
        </div>
      </div>



      
      {/* ⭐ WHY CHOOSE SKILL NEST */}
      <div className="mt-28 px-6 max-w-6xl mx-auto reveal">
        <h2 className="text-2xl font-bold text-center mb-12">
          Why Students Choose <span className="text-primary">Skill Nest?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {[
            {
              title: "Student-First Platform",
              desc: "Built exclusively for students to learn, teach, and grow together.",
              icon: "🎯",
            },
            {
              title: "Earn While Learning",
              desc: "Teach skills, complete tasks, and earn points & rewards.",
              icon: "💸",
            },
            {
              title: "Community-Driven",
              desc: "Exchange skills and collaborate across campuses.",
              icon: "🌍",
            },
            {
              title: "Practical Learning",
              desc: "Real skills, real use-cases, real outcomes.",
              icon: "🛠",
            },
            {
              title: "AI-Powered Guidance",
              desc: "Get instant help with learning & decisions via AI Mentor.",
              icon: "🤖",
            },
            {
              title: "Future-Ready",
              desc: "Designed to evolve with industry and student needs.",
              icon: "🚀",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative bg-card/80 backdrop-blur rounded-2xl p-6 shadow-soft hover:shadow-card transition"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>




      {/* ⭐ TESTIMONIALS SECTION */}
      <div className="mt-20 px-6 relative reveal">
        
        {/* Heading */}
        <h2 className="text-lg font-semibold text-center mb-6">
          What Students Think About Skill Nest
        </h2>

        {/* Fade edges (LEFT & RIGHT) */}
        <div className="pointer-events-none absolute left-0 top-[60px] h-[280px] w-24 bg-gradient-to-r from-white/100 to-transparent z-30 blur-sm" />
        <div className="pointer-events-none absolute right-0 top-[60px] h-[280px] w-24 bg-gradient-to-l from-white/100 to-transparent z-30 blur-sm" />

        {/* Marquee */}
        <div className="testimonial-viewport overflow-hidden">
          <div className="testimonial-track">
            {[...testimonials, ...testimonials].map((item, index) => (
              <div key={index} className="testimonial-card-wrapper">
                <div className="testimonial-card-inner">

                  {/* Avatar */}
                  <div className="flex justify-center">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        item.name
                      )}&background=20E3B2&color=ffffff&size=96`}
                      alt={item.name}
                      className="w-20 h-20 rounded-full shadow-md"
                    />
                  </div>

                  {/* Divider */}
                  <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                  {/* Text */}
                  <p className="text-sm text-muted-foreground leading-relaxed text-center">
                    “{item.text}”
                  </p>

                  {/* Name & Role */}
                  <div className="mt-4 text-center">
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 🌍 IMPACT SECTION */}
      <div className="mt-24 px-6 max-w-7xl mx-auto reveal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-[#20E3B2] via-[#2CCCFF] to-[#6A5AF9] flex items-center justify-center text-white">
                🌍
              </div>
              <h2 className="text-3xl font-bold">
                Impact at <span className="text-primary">SCALE</span>
              </h2>
            </div>

            <p className="text-muted-foreground mb-10 max-w-md">
              Bring a new revolution to the EdTech industry by empowering students to learn, teach, and grow togeher like never before.
            </p>

            {/* STATS GRID */}
            <div className="grid grid-cols-2 gap-10">
              <div>
                <h3 className="text-3xl font-extrabold">5400+</h3>
                <p className="text-sm text-muted-foreground">students in our community</p>
              </div>

              <div>
                <h3 className="text-3xl font-extrabold">800+</h3>
                <p className="text-sm text-muted-foreground">monthly exchanges made</p>
              </div>

              <div>
                <h3 className="text-3xl font-extrabold">1250+</h3>
                <p className="text-sm text-muted-foreground">skills shared by students</p>
              </div>

              <div>
                <h3 className="text-3xl font-extrabold">57+</h3>
                <p className="text-sm text-muted-foreground">countries reached</p>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative flex justify-center">

            {/* MAP BACKDROP */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
              alt="World map"
              className="opacity-20 max-w-full"
            />

            {/* FLOATING TAGS */}
            <div className="absolute top-[15%] left-[35%] bg-white/300 backdrop-blur px-4 py-2 rounded-full shadow text-sm">
              🎥 Short videos
            </div>

            <div className="absolute top-[50%] right-[2%] bg-white/300 backdrop-blur px-4 py-2 rounded-full shadow text-sm">
              🔴 Daily LIVE classes
            </div>

            <div className="absolute bottom-[20%] left-[15%] bg-white/300 backdrop-blur px-4 py-2 rounded-full shadow text-sm">
              💬 Unlimited doubt solving
            </div>
          </div>

        </div>
      </div>

      
      


      {/* Footer */}
      <Footer />

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      {/* 📞 CONTACT FLOATING BUTTONS (UI ONLY) */}
      <div className="fixed left-8 bottom-10 z-50 flex flex-col gap-3">

        {/* Call Button */}
        <div
          className="
            w-12 h-12 rounded-full
            bg-white/90 backdrop-blur
            flex items-center justify-center
            shadow-lg border border-border/50
            hover:scale-110 transition
            cursor-pointer
          "
          title="Call Us"
        >
          <Phone className="w-5 h-5 text-primary" />
        </div>

        {/* WhatsApp Button */}
        <div
          className="
            w-12 h-12 rounded-full
            bg-white/90 backdrop-blur
            flex items-center justify-center
            shadow-lg border border-border/50
            hover:scale-110 transition
            cursor-pointer
          "
          title="WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-green-500" />
        </div>

      </div>


      <FloatingNav />
    </div>
  );
};

export default Home;
