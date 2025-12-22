import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import FloatingNav from '@/components/FloatingNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  ArrowLeft, Plus, ArrowRightLeft, Video, Check, X, 
  Clock, User, Calendar, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillSwap {
  id: string;
  userId: string;
  userName: string;
  teachSkill: string;
  learnSkill: string;
  description: string;
  status: 'pending' | 'approved' | 'scheduled';
  scheduledDate?: string;
  scheduledTime?: string;
  createdAt: Date;
}

const ExchangeSkills = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [teachSkill, setTeachSkill] = useState('');
  const [learnSkill, setLearnSkill] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [swaps, setSwaps] = useState<SkillSwap[]>([
    {
      id: '1',
      userId: 'user2',
      userName: 'Alice Johnson',
      teachSkill: 'Python Programming',
      learnSkill: 'Guitar',
      description: 'I can help you with Python basics, data structures, and web development. Looking to learn guitar chords and basic songs.',
      status: 'pending',
      createdAt: new Date(),
    },
    {
      id: '2',
      userId: 'user3',
      userName: 'Bob Smith',
      teachSkill: 'Graphic Design',
      learnSkill: 'JavaScript',
      description: 'Expert in Photoshop and Illustrator. Want to learn modern JavaScript and React.',
      status: 'scheduled',
      scheduledDate: '2024-01-25',
      scheduledTime: '15:00',
      createdAt: new Date(),
    },
    {
      id: '3',
      userId: 'user4',
      userName: 'Carol Davis',
      teachSkill: 'Spanish',
      learnSkill: 'Digital Marketing',
      description: 'Native Spanish speaker, can teach conversational Spanish. Interested in learning SEO and social media marketing.',
      status: 'pending',
      createdAt: new Date(),
    },
  ]);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!teachSkill.trim() || !learnSkill.trim()) {
      toast.error('Please fill in both skills');
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newSwap: SkillSwap = {
      id: Date.now().toString(),
      userId: 'currentUser',
      userName: user?.name || 'You',
      teachSkill,
      learnSkill,
      description,
      status: 'pending',
      createdAt: new Date(),
    };
    
    setSwaps([newSwap, ...swaps]);
    setIsLoading(false);
    setShowCreateForm(false);
    setTeachSkill('');
    setLearnSkill('');
    setDescription('');
    
    toast.success('Skill swap posted! 🎉', {
      description: 'Other students can now see your swap request.',
    });
  };

  const approveSwap = (id: string) => {
    setSwaps(swaps.map(swap => 
      swap.id === id 
        ? { ...swap, status: 'scheduled', scheduledDate: '2024-01-30', scheduledTime: '14:00' }
        : swap
    ));
    toast.success('Swap approved! Session scheduled.');
  };

  const deleteSwap = (id: string) => {
    setSwaps(swaps.filter(s => s.id !== id));
    toast.success('Swap removed');
  };

  const startVideoSession = () => {
    window.open('https://meet.google.com/new', '_blank');
    toast.success('Starting Google Meet session...');
  };

  return (
    <div className="min-h-screen gradient-hero pb-28">
      <header className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-xl bg-card shadow-soft hover:shadow-card transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Exchange Skills</h1>
            <p className="text-sm text-muted-foreground">Trade skills with other students</p>
          </div>
        </div>
      </header>

      <div className="px-6">
        {/* Create New Button */}
        {!showCreateForm && (
          <Button
            onClick={() => setShowCreateForm(true)}
            variant="gradient"
            size="lg"
            className="w-full mb-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Skill Swap
          </Button>
        )}

        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-card rounded-3xl shadow-card p-6 mb-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-feature-study/10 flex items-center justify-center">
                  <ArrowRightLeft className="w-5 h-5 text-feature-study" />
                </div>
                <h2 className="text-lg font-bold text-foreground">New Skill Swap</h2>
              </div>
              <button
                onClick={() => setShowCreateForm(false)}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">I Can Teach *</label>
                  <Input
                    placeholder="e.g., Python"
                    value={teachSkill}
                    onChange={(e) => setTeachSkill(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">I Want to Learn *</label>
                  <Input
                    placeholder="e.g., Guitar"
                    value={learnSkill}
                    onChange={(e) => setLearnSkill(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRightLeft className="w-6 h-6 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description (Optional)</label>
                <Textarea
                  placeholder="Describe your experience and what you're looking to learn..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Posting...
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Post Skill Swap
                  </>
                )}
              </Button>
            </form>
          </div>
        )}

        {/* Available Swaps */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Available Skill Swaps</h2>
          {swaps.map((swap) => (
            <div
              key={swap.id}
              className="bg-card rounded-2xl shadow-soft p-5 border border-border/50 hover:shadow-card transition-all animate-fade-in"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{swap.userName}</h3>
                    <p className="text-xs text-muted-foreground">
                      {swap.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  swap.status === 'pending' && "bg-warning/10 text-warning",
                  swap.status === 'approved' && "bg-success/10 text-success",
                  swap.status === 'scheduled' && "bg-primary/10 text-primary"
                )}>
                  {swap.status}
                </span>
              </div>

              <div className="bg-muted/50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Teaches</p>
                    <p className="font-semibold text-foreground">{swap.teachSkill}</p>
                  </div>
                  <ArrowRightLeft className="w-5 h-5 text-muted-foreground mx-4" />
                  <div className="text-center flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Wants</p>
                    <p className="font-semibold text-foreground">{swap.learnSkill}</p>
                  </div>
                </div>
              </div>

              {swap.description && (
                <p className="text-sm text-muted-foreground mb-4">{swap.description}</p>
              )}

              {swap.status === 'scheduled' && swap.scheduledDate && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 bg-primary/5 rounded-lg p-3">
                  <Calendar className="w-4 h-4" />
                  Scheduled: {swap.scheduledDate} at {swap.scheduledTime}
                </div>
              )}

              <div className="flex gap-2">
                {swap.status === 'pending' && swap.userId !== 'currentUser' && (
                  <>
                    <Button
                      onClick={() => approveSwap(swap.id)}
                      variant="gradient"
                      size="sm"
                      className="flex-1"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => deleteSwap(swap.id)}
                      variant="outline"
                      size="sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                )}
                {swap.status === 'scheduled' && (
                  <Button
                    onClick={startVideoSession}
                    variant="gradient"
                    size="sm"
                    className="flex-1"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Start Video Session
                  </Button>
                )}
                {swap.userId === 'currentUser' && swap.status === 'pending' && (
                  <Button
                    onClick={() => deleteSwap(swap.id)}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-destructive hover:bg-destructive/10"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <FloatingNav />
    </div>
  );
};

export default ExchangeSkills;
