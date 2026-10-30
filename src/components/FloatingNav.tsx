import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Briefcase, Users, Gift, User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/home', label: 'Home', icon: Home, color: 'text-feature-teach' },
  { path: '/task-marketplace', label: 'Tasks', icon: Briefcase, color: 'text-feature-learn' },
  { path: '/campus-community', label: 'Community', icon: Users, color: 'text-feature-study' },
  { path: '/rewards', label: 'Rewards', icon: Gift, color: 'text-feature-quiz' },
  { path: '/profile', label: 'Profile', icon: User, color: 'text-feature-mentor' },
];

const FloatingNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* MAIN NAV */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-md">
        <div className="bg-card/95 backdrop-blur-xl rounded-3xl shadow-nav border border-border/50 p-2">
          <ul className="flex items-center justify-around">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={cn(
                      "flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300",
                      isActive
                        ? "bg-primary/10 scale-105"
                        : "hover:bg-muted"
                    )}
                  >
                    <div
                      className={cn(
                        "p-2 rounded-xl transition-all duration-300",
                        isActive
                          ? `${item.color} bg-current/10`
                          : "text-muted-foreground"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-6 h-6 transition-transform duration-300",
                          isActive && "scale-110"
                        )}
                      />
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium transition-colors duration-300",
                        isActive ? item.color : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* 🔥 AI MENTOR FLOATING BUTTON */}
      <button
        onClick={() => navigate('/ai-mentor')}
        className="fixed bottom-10 right-[calc(50%-700px)] z-50 group"
        aria-label="AI Mentor"
      >
        {/* Gradient Glow */}
        <div className="
          absolute inset-0 rounded-full
          bg-gradient-to-br from-[#20E3B2] via-[#2CCCFF] to-[#6A5AF9]
          blur-xl opacity-70
          group-hover:opacity-100
          transition
        " />

        {/* Button */}
        <div className="
          relative w-16 h-16 rounded-full
          bg-gradient-to-br from-[#20E3B2] via-[#2CCCFF] to-[#6A5AF9]
          flex items-center justify-center
          shadow-xl
          hover:scale-110 transition
        ">
          <Bot className="w-6 h-6 text-white" />
        </div>

        {/* Tooltip */}
        <span className="
          absolute right-20 top-1/2 -translate-y-1/2
          bg-white text-black text-xs px-5 py-2 rounded-md border 2px solid black
          opacity-0 group-hover:opacity-100
          transition whitespace-nowrap
        ">
          AI Mentor
        </span>
      </button>
    </>
  );
};

export default FloatingNav;
