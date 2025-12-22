import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import FloatingNav from '@/components/FloatingNav';
import FeatureCard from '@/components/FeatureCard';
import { 
  GraduationCap, BookOpen, ArrowRightLeft, Briefcase,
  Building2, Gift, Bell, Users, Sparkles, TrendingUp
} from 'lucide-react';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const features = [
    {
      title: 'Teach a Skill',
      description: 'Share your expertise and help others learn.',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'teach' as const,
      action: () => navigate('/teach-skill'),
    },
    {
      title: 'Learn a Skill',
      description: 'Explore curated videos and resources.',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'learn' as const,
      action: () => navigate('/learn-skill'),
    },
    {
      title: 'Exchange Skills',
      description: 'Trade skills with other students.',
      icon: <ArrowRightLeft className="w-6 h-6" />,
      color: 'study' as const,
      action: () => navigate('/exchange-skills'),
    },
    {
      title: 'Task Marketplace',
      description: 'Earn by completing tasks for others.',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'quiz' as const,
      action: () => navigate('/task-marketplace'),
    },
    {
      title: 'Campus Community',
      description: 'Connect with students across campuses.',
      icon: <Building2 className="w-6 h-6" />,
      color: 'mentor' as const,
      action: () => navigate('/campus-community'),
    },
    {
      title: 'Rewards',
      description: 'Earn points and redeem exciting rewards.',
      icon: <Gift className="w-6 h-6" />,
      color: 'resources' as const,
      action: () => navigate('/rewards'),
    },
  ];

  return (
    <div className="min-h-screen gradient-hero pb-28 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-10 w-32 h-32 bg-feature-learn/5 rounded-full blur-2xl" />

      {/* Header */}
      <header className="px-6 pt-8 pb-4 relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Welcome back,</p>
            <h1 className="text-2xl font-bold text-foreground">
              {user?.name?.split(' ')[0] || 'Learner'} 👋
            </h1>
          </div>
          <button className="relative p-3 rounded-xl bg-card shadow-soft hover:shadow-card transition-all duration-200">
            <Bell className="w-6 h-6 text-foreground" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-accent rounded-full" />
          </button>
        </div>
      </header>

      {/* Branding & Tagline */}
      <div className="px-6 mb-6 relative">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-primary via-feature-learn to-accent bg-clip-text text-transparent">
            SkillNest
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Where Skills Meet, Students Grow 🚀
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-card rounded-2xl shadow-card p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xl font-bold text-foreground">5,420</span>
              </div>
              <p className="text-xs text-muted-foreground">Students</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 text-feature-learn" />
                <span className="text-xl font-bold text-foreground">1,250</span>
              </div>
              <p className="text-xs text-muted-foreground">Skills</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-xl font-bold text-foreground">890</span>
              </div>
              <p className="text-xs text-muted-foreground">Exchanges</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Points */}
      <div className="px-6 mb-6">
        <div className="bg-card rounded-2xl shadow-soft p-4">
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

      {/* Features Grid */}
      <div className="px-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">What would you like to do?</h2>
        <div className="grid grid-cols-2 gap-4">
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

      <FloatingNav />
    </div>
  );
};

export default Home;
