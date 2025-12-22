import { useNavigate } from 'react-router-dom';
import FloatingNav from '@/components/FloatingNav';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut, ChevronRight, Award, BookOpen, GraduationCap } from 'lucide-react';
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

  const menuItems = [
    { label: 'Edit Profile', icon: User },
    { label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen gradient-hero pb-28">
      <header className="px-6 pt-8 pb-6">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </header>

      <div className="px-6">
        {/* Profile Card */}
        <div className="bg-card rounded-2xl shadow-card p-6 mb-6 text-center">
          <div className="w-24 h-24 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center shadow-glow">
            <span className="text-4xl font-bold text-primary-foreground">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <h2 className="text-xl font-bold text-foreground">{user?.name || 'User'}</h2>
          <p className="text-muted-foreground">{user?.email || 'user@example.com'}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-card rounded-xl shadow-soft p-4 text-center">
                <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Menu Items */}
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden mb-6">
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
