import { useNavigate } from 'react-router-dom';
import FloatingNav from '@/components/FloatingNav';
import { Gift, Star, Zap, ArrowLeft, Trophy, Crown, Medal, TrendingUp, BookOpen, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const leaderboardData = [
  { rank: 1, name: 'Arjun Mehta', points: 2450, college: 'IIT Delhi', avatar: 'A' },
  { rank: 2, name: 'Priya Singh', points: 2180, college: 'IIT Bombay', avatar: 'P' },
  { rank: 3, name: 'Rahul Sharma', points: 1920, college: 'BITS Pilani', avatar: 'R' },
  { rank: 4, name: 'Sneha Gupta', points: 1750, college: 'IIT Madras', avatar: 'S' },
  { rank: 5, name: 'Vikram Patel', points: 1680, college: 'NIT Trichy', avatar: 'V' },
];

const earnMethods = [
  { action: 'Complete a teaching session', points: 50, icon: BookOpen },
  { action: 'Complete a skill swap', points: 40, icon: Users },
  { action: 'Complete marketplace task', points: 30, icon: Award },
  { action: 'Daily login streak', points: 10, icon: Zap },
];

const Rewards = () => {
  const navigate = useNavigate();

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800';
    if (rank === 3) return 'bg-gradient-to-r from-amber-600 to-orange-600 text-white';
    return 'bg-muted text-muted-foreground';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5" />;
    if (rank === 2) return <Medal className="w-5 h-5" />;
    if (rank === 3) return <Medal className="w-5 h-5" />;
    return <span className="text-sm font-bold">#{rank}</span>;
  };

  return (
    <div className="min-h-screen gradient-hero pb-28 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-br from-yellow-400/10 to-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-0 w-48 h-48 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-full blur-3xl" />
      
      {/* Decorative Icons */}
      <div className="absolute top-32 right-6 opacity-[0.08]">
        <Trophy className="w-20 h-20 text-yellow-500" />
      </div>
      <div className="absolute top-96 left-4 opacity-[0.08]">
        <Star className="w-16 h-16 text-primary" />
      </div>

      <header className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-xl bg-card shadow-soft hover:shadow-card transition-all hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Rewards</h1>
            <p className="text-muted-foreground text-sm">Earn points and unlock rewards</p>
          </div>
        </div>
      </header>

      <div className="px-6 space-y-6">
        {/* Points Card */}
        <div className="bg-gradient-to-br from-primary via-feature-learn to-accent rounded-3xl shadow-card p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/80 text-sm">Your Points</p>
                <p className="text-5xl font-bold">150</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Star className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0">
                <Zap className="w-4 h-4 mr-2" />
                Earn More
              </Button>
              <Button variant="secondary" size="sm" className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0">
                <Gift className="w-4 h-4 mr-2" />
                Redeem
              </Button>
            </div>
          </div>
        </div>

        {/* How to Earn */}
        <div className="bg-card rounded-2xl shadow-soft p-5 border border-border/30">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            How to Earn Points
          </h3>
          <div className="space-y-3">
            {earnMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="flex-1 text-sm text-foreground">{method.action}</span>
                  <span className="text-sm font-bold text-primary">+{method.points}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-card rounded-2xl shadow-soft p-5 border border-border/30">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Top Contributors
          </h3>
          <div className="space-y-3">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]",
                  user.rank <= 3 ? "bg-gradient-to-r from-yellow-50/50 to-amber-50/50 dark:from-yellow-900/10 dark:to-amber-900/10 border border-yellow-200/50 dark:border-yellow-800/30" : "bg-muted/30"
                )}
              >
                {/* Rank Badge */}
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  getRankStyle(user.rank)
                )}>
                  {getRankIcon(user.rank)}
                </div>
                
                {/* Avatar */}
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                  user.rank === 1 ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-white" :
                  user.rank === 2 ? "bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800" :
                  user.rank === 3 ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white" :
                  "bg-primary/10 text-primary"
                )}>
                  {user.avatar}
                </div>
                
                {/* Info */}
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground text-sm">{user.name}</h4>
                  <p className="text-xs text-muted-foreground">{user.college}</p>
                </div>
                
                {/* Points */}
                <div className="text-right">
                  <p className={cn(
                    "font-bold",
                    user.rank <= 3 ? "text-yellow-600 dark:text-yellow-400" : "text-primary"
                  )}>
                    {user.points}
                  </p>
                  <p className="text-xs text-muted-foreground">pts</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Rewards */}
        <div className="bg-card rounded-2xl shadow-soft p-5 border border-border/30">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-accent" />
            Available Rewards
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'T-Shirt', points: 500, icon: '👕' },
              { name: 'Hoodie', points: 1000, icon: '🧥' },
              { name: 'Coffee Mug', points: 200, icon: '☕' },
              { name: 'Notebook', points: 150, icon: '📓' },
            ].map((reward) => (
              <div key={reward.name} className="p-4 bg-muted/30 rounded-xl text-center hover:bg-muted/50 transition-all hover:scale-105 cursor-pointer">
                <span className="text-3xl mb-2 block">{reward.icon}</span>
                <p className="font-medium text-sm text-foreground">{reward.name}</p>
                <p className="text-xs text-primary font-bold">{reward.points} pts</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FloatingNav />
    </div>
  );
};

export default Rewards;
