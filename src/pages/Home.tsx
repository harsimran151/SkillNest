import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import FloatingNav from '@/components/FloatingNav';
import FeatureCard from '@/components/FeatureCard';
import CreateSessionModal from '@/components/CreateSessionModal';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Trophy,
  Compass,
  FolderOpen,
  Bell,
  Sparkles
} from 'lucide-react';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isCreateSessionOpen, setIsCreateSessionOpen] = useState(false);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const features = [
    {
      title: 'Teach a Skill',
      description: 'Share your expertise with other students and help them learn something new.',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'teach' as const,
      action: () => setIsCreateSessionOpen(true),
    },
    {
      title: 'Learn a Skill',
      description: 'Browse sessions from peers and pick up new skills that interest you.',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'learn' as const,
      action: () => {},
    },
    {
      title: 'Study Groups',
      description: 'Join or create study groups to collaborate with like-minded learners.',
      icon: <Users className="w-6 h-6" />,
      color: 'study' as const,
      action: () => {},
    },
    {
      title: 'Take a Quiz',
      description: 'Test your knowledge with fun quizzes and track your progress.',
      icon: <Trophy className="w-6 h-6" />,
      color: 'quiz' as const,
      action: () => {},
    },
    {
      title: 'Find a Mentor',
      description: 'Connect with experienced mentors who can guide your learning journey.',
      icon: <Compass className="w-6 h-6" />,
      color: 'mentor' as const,
      action: () => {},
    },
    {
      title: 'Resources',
      description: 'Access curated learning materials, notes, and study guides.',
      icon: <FolderOpen className="w-6 h-6" />,
      color: 'resources' as const,
      action: () => {},
    },
  ];

  return (
    <div className="min-h-screen gradient-hero pb-28">
      {/* Header */}
      <header className="px-6 pt-8 pb-6">
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

      {/* Quick Stats */}
      <div className="px-6 mb-6">
        <div className="bg-card rounded-2xl shadow-card p-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Keep Learning!</h3>
              <p className="text-sm text-muted-foreground">You have 3 pending sessions</p>
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

      {/* Floating Navigation */}
      <FloatingNav />

      {/* Create Session Modal */}
      <CreateSessionModal
        isOpen={isCreateSessionOpen}
        onClose={() => setIsCreateSessionOpen(false)}
      />
    </div>
  );
};

export default Home;
