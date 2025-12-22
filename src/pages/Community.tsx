import FloatingNav from '@/components/FloatingNav';
import { Users, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Community = () => {
  return (
    <div className="min-h-screen gradient-hero pb-28">
      <header className="px-6 pt-8 pb-6">
        <h1 className="text-2xl font-bold text-foreground">Community</h1>
        <p className="text-muted-foreground">Connect with fellow learners</p>
      </header>

      <div className="px-6">
        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-2xl bg-feature-study/10 flex items-center justify-center mb-4">
            <Users className="w-10 h-10 text-feature-study" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Join the Community</h3>
          <p className="text-muted-foreground mb-6 max-w-xs">
            Connect with other students, join discussions, and share your learning journey.
          </p>
          <Button variant="gradient">
            <MessageCircle className="w-5 h-5 mr-2" />
            Start a Discussion
          </Button>
        </div>
      </div>

      <FloatingNav />
    </div>
  );
};

export default Community;
