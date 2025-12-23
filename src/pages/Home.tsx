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

const Home = () => {
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
      icon: <GraduationCap className="w-7 h-7" />,
      color: 'teach' as const,
      action: () => navigate('/teach-skill'),
    },
    {
      title: 'Learn a Skill',
      description: 'Explore curated videos and resources.',
      icon: <BookOpen className="w-7 h-7" />,
      color: 'learn' as const,
      action: () => navigate('/learn-skill'),
    },
    {
      title: 'Exchange Skills',
      description: 'Trade skills with other students.',
      icon: <ArrowRightLeft className="w-7 h-7" />,
      color: 'study' as const,
      action: () => navigate('/exchange-skills'),
    },
    {
      title: 'Task Marketplace',
      description: 'Earn by completing tasks for others.',
      icon: <Briefcase className="w-7 h-7" />,
      color: 'quiz' as const,
      action: () => navigate('/task-marketplace'),
    },
    {
      title: 'Campus Community',
      description: 'Connect with students across campuses.',
      icon: <Building2 className="w-7 h-7" />,
      color: 'mentor' as const,
      action: () => navigate('/campus-community'),
    },
    {
      title: 'Rewards',
      description: 'Earn points and redeem exciting rewards.',
      icon: <Gift className="w-7 h-7" />,
      color: 'resources' as const,
      action: () => navigate('/rewards'),
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
      <div className="absolute top-28 left-4 opacity-[0.08] animate-float">
        <BookOpen className="w-24 h-24 text-primary" />
      </div>
      <div className="absolute top-40 right-6 opacity-[0.08] animate-float" style={{ animationDelay: '0.5s' }}>
        <GraduationCap className="w-20 h-20 text-accent" />
      </div>
      <div className="absolute top-96 left-8 opacity-[0.08] animate-float" style={{ animationDelay: '1s' }}>
        <Lightbulb className="w-16 h-16 text-feature-learn" />
      </div>
      <div className="absolute top-[500px] right-4 opacity-[0.08] animate-float" style={{ animationDelay: '1.5s' }}>
        <Target className="w-18 h-18 text-feature-teach" />
      </div>
      <div className="absolute top-[650px] left-6 opacity-[0.08] animate-float" style={{ animationDelay: '2s' }}>
        <Brain className="w-14 h-14 text-feature-study" />
      </div>
      <div className="absolute top-[750px] right-10 opacity-[0.08] animate-float" style={{ animationDelay: '2.5s' }}>
        <Puzzle className="w-16 h-16 text-feature-quiz" />
      </div>
      <div className="absolute top-[850px] left-4 opacity-[0.08] animate-float" style={{ animationDelay: '3s' }}>
        <Rocket className="w-14 h-14 text-accent" />
      </div>
      <div className="absolute top-[950px] right-6 opacity-[0.08] animate-float" style={{ animationDelay: '3.5s' }}>
        <Award className="w-18 h-18 text-primary" />
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
            <h2 className="relative text-5xl font-extrabold bg-gradient-to-r from-feature-teach via-primary to-feature-learn bg-clip-text text-transparent animate-fade-in drop-shadow-sm">
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
                  <span className="text-lg font-bold text-foreground">5,420</span>
                </div>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
              <div className="hover:scale-105 transition-transform cursor-default">
                <div className="flex items-center justify-center gap-1">
                  <Sparkles className="w-4 h-4 text-feature-learn" />
                  <span className="text-lg font-bold text-foreground">1,250</span>
                </div>
                <p className="text-xs text-muted-foreground">Skills</p>
              </div>
              <div className="hover:scale-105 transition-transform cursor-default">
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="text-lg font-bold text-foreground">890</span>
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
      <div className="px-6 max-w-lg mx-auto">
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

      {/* Footer */}
      <Footer />

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      <FloatingNav />
    </div>
  );
};

export default Home;
