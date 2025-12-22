import FloatingNav from '@/components/FloatingNav';
import { CheckSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Tasks = () => {
  return (
    <div className="min-h-screen gradient-hero pb-28">
      <header className="px-6 pt-8 pb-6">
        <h1 className="text-2xl font-bold text-foreground">My Tasks</h1>
        <p className="text-muted-foreground">Track your learning progress</p>
      </header>

      <div className="px-6">
        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-2xl bg-feature-learn/10 flex items-center justify-center mb-4">
            <CheckSquare className="w-10 h-10 text-feature-learn" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No tasks yet</h3>
          <p className="text-muted-foreground mb-6 max-w-xs">
            Start learning or teaching to create tasks and track your progress.
          </p>
          <Button variant="gradient">
            <Plus className="w-5 h-5 mr-2" />
            Create Task
          </Button>
        </div>
      </div>

      <FloatingNav />
    </div>
  );
};

export default Tasks;
