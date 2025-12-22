import FloatingNav from '@/components/FloatingNav';
import { Gift, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Rewards = () => {
  return (
    <div className="min-h-screen gradient-hero pb-28">
      <header className="px-6 pt-8 pb-6">
        <h1 className="text-2xl font-bold text-foreground">Rewards</h1>
        <p className="text-muted-foreground">Earn points and unlock rewards</p>
      </header>

      <div className="px-6">
        {/* Points Card */}
        <div className="bg-card rounded-2xl shadow-card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm">Your Points</p>
              <p className="text-4xl font-bold text-primary">150</p>
            </div>
            <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center shadow-soft">
              <Star className="w-8 h-8 text-accent-foreground" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="gradient" size="sm" className="flex-1">
              <Zap className="w-4 h-4 mr-2" />
              Earn More
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Gift className="w-4 h-4 mr-2" />
              Redeem
            </Button>
          </div>
        </div>

        {/* Rewards Grid Placeholder */}
        <h3 className="font-semibold text-foreground mb-4">Available Rewards</h3>
        <div className="text-center py-8">
          <p className="text-muted-foreground">More rewards coming soon!</p>
        </div>
      </div>

      <FloatingNav />
    </div>
  );
};

export default Rewards;
