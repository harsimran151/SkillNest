import { useNavigate } from 'react-router-dom';
import FloatingNav from '@/components/FloatingNav';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  User, Settings, LogOut, ChevronRight, Award, BookOpen, 
  GraduationCap, ArrowLeft, MapPin, Calendar, Star, Code,
  Music, Camera, Palette, MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const stats = [
    { label: 'Sessions Taught', value: 5, icon: GraduationCap, color: 'text-feature-teach' },
    { label: 'Sessions Attended', value: 12, icon: BookOpen, color: 'text-feature-learn' },
    { label: 'Badges Earned', value: 3, icon: Award, color: 'text-feature-quiz' },
  ];

  const skills = [
    { name: 'Python', icon: Code, level: 'Advanced' },
    { name: 'Guitar', icon: Music, level: 'Intermediate' },
    { name: 'Photography', icon: Camera, level: 'Beginner' },
    { name: 'UI/UX Design', icon: Palette, level: 'Intermediate' },
  ];

  const menuItems = [
    { label: 'Edit Profile', icon: User },
    { label: 'Settings', icon: Settings },
    { label: 'Messages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen gradient-hero pb-28 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-0 w-48 h-48 bg-gradient-to-tr from-feature-learn/10 to-primary/10 rounded-full blur-3xl" />

      <header className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-xl bg-card shadow-soft hover:shadow-card transition-all hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        </div>
      </header>

      <div className="px-6 space-y-5">
        {/* Profile Card */}
        <div className="bg-card rounded-3xl shadow-card p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
          <div className="relative">
            <div className="w-24 h-24 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center shadow-glow ring-4 ring-primary/20">
              <span className="text-4xl font-bold text-primary-foreground">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-foreground">{user?.name || 'User'}</h2>
            <p className="text-muted-foreground text-sm">{user?.email || 'user@example.com'}</p>
            
            {/* Extra Info */}
            <div className="flex items-center justify-center gap-4 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                IIT Delhi
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined 2024
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center gap-1 mt-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-muted'}`} />
              ))}
              <span className="text-sm text-muted-foreground ml-2">4.8 rating</span>
            </div>
          </div>
        </div>

        {/* About Me */}
        <div className="bg-card rounded-2xl shadow-soft p-5 border border-border/30">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            About Me
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Passionate learner and educator exploring the intersection of technology and creativity. 
            I love sharing knowledge and helping others grow. Currently pursuing Computer Science 
            and always excited to learn new skills!
          </p>
        </div>

        {/* Skills */}
        <div className="bg-card rounded-2xl shadow-soft p-5 border border-border/30">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-feature-learn" />
            My Skills
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div key={skill.name} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{skill.name}</p>
                    <p className="text-xs text-muted-foreground">{skill.level}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-card rounded-xl shadow-soft p-4 text-center hover:shadow-card transition-all hover:scale-105">
                <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Interests */}
        <div className="bg-card rounded-2xl shadow-soft p-5 border border-border/30">
          <h3 className="font-semibold text-foreground mb-3">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {['Machine Learning', 'Web Development', 'Music', 'Photography', 'Design', 'Teaching'].map((interest) => (
              <span key={interest} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden border border-border/30">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`w-full flex items-center justify-between p-4 hover:bg-muted transition-colors ${
                  index < menuItems.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            );
          })}
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          size="lg"
          className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>
      </div>

      <FloatingNav />
    </div>
  );
};

export default Profile;
