import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import FloatingNav from '@/components/FloatingNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  ArrowLeft, Plus, Calendar, Clock, Tag, FileText, 
  Sparkles, X, Video, Users, Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const availableTags = [
  'Programming', 'Design', 'Music', 'Languages', 'Math', 'Science',
  'Art', 'Writing', 'Business', 'Marketing', 'Photography', 'Cooking'
];

interface Session {
  id: string;
  skillName: string;
  description: string;
  tags: string[];
  slots: { date: string; time: string }[];
  resources: string;
  createdAt: Date;
  enrolledCount: number;
}

const TeachSkill = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [slots, setSlots] = useState<{ date: string; time: string }[]>([{ date: '', time: '' }]);
  const [resources, setResources] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock sessions data
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      skillName: 'Python for Beginners',
      description: 'Learn Python basics from scratch with hands-on projects.',
      tags: ['Programming', 'Science'],
      slots: [{ date: '2024-01-20', time: '14:00' }, { date: '2024-01-22', time: '16:00' }],
      resources: 'https://python.org/docs',
      createdAt: new Date(),
      enrolledCount: 5,
    },
    {
      id: '2',
      skillName: 'Guitar Fundamentals',
      description: 'Master guitar chords and strumming patterns.',
      tags: ['Music', 'Art'],
      slots: [{ date: '2024-01-21', time: '10:00' }],
      resources: '',
      createdAt: new Date(),
      enrolledCount: 3,
    },
  ]);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const addSlot = () => {
    setSlots([...slots, { date: '', time: '' }]);
  };

  const removeSlot = (index: number) => {
    if (slots.length > 1) {
      setSlots(slots.filter((_, i) => i !== index));
    }
  };

  const updateSlot = (index: number, field: 'date' | 'time', value: string) => {
    const newSlots = [...slots];
    newSlots[index][field] = value;
    setSlots(newSlots);
  };

  const resetForm = () => {
    setSkillName('');
    setDescription('');
    setSelectedTags([]);
    setSlots([{ date: '', time: '' }]);
    setResources('');
    setShowCreateForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!skillName.trim()) {
      toast.error('Please enter a skill name');
      return;
    }
    
    if (!description.trim()) {
      toast.error('Please enter a description');
      return;
    }
    
    if (selectedTags.length === 0) {
      toast.error('Please select at least one tag');
      return;
    }
    
    const validSlots = slots.filter(slot => slot.date && slot.time);
    if (validSlots.length === 0) {
      toast.error('Please add at least one available slot');
      return;
    }
    
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newSession: Session = {
      id: Date.now().toString(),
      skillName,
      description,
      tags: selectedTags,
      slots: validSlots,
      resources,
      createdAt: new Date(),
      enrolledCount: 0,
    };
    
    setSessions([newSession, ...sessions]);
    setIsLoading(false);
    
    toast.success('Session created! 🎉', {
      description: 'Your teaching session is now visible to other students.',
    });
    
    resetForm();
  };

  const deleteSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
    toast.success('Session deleted');
  };

  const startVideoSession = () => {
    // Generate a random Google Meet link
    const meetId = Math.random().toString(36).substring(2, 12);
    window.open(`https://meet.google.com/new`, '_blank');
    toast.success('Starting Google Meet session...');
  };

  return (
    <div className="min-h-screen gradient-hero pb-28">
      {/* Header */}
      <header className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-xl bg-card shadow-soft hover:shadow-card transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Teach a Skill</h1>
            <p className="text-sm text-muted-foreground">Share your expertise with others</p>
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
            Create New Session
          </Button>
        )}

        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-card rounded-3xl shadow-card p-6 mb-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-feature-teach/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-feature-teach" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Create Session</h2>
              </div>
              <button
                onClick={resetForm}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Skill Name *</label>
                <Input
                  placeholder="e.g., Python Programming, Guitar Basics"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description *</label>
                <Textarea
                  placeholder="Describe what you'll teach..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Tag className="w-4 h-4" />
                  Select Tags *
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                        selectedTags.includes(tag)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Calendar className="w-4 h-4" />
                  Available Slots *
                </label>
                {slots.map((slot, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      type="date"
                      value={slot.date}
                      onChange={(e) => updateSlot(index, 'date', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="time"
                      value={slot.time}
                      onChange={(e) => updateSlot(index, 'time', e.target.value)}
                      className="flex-1"
                    />
                    {slots.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSlot(index)}
                        className="p-2 rounded-xl hover:bg-destructive/10 text-destructive transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addSlot} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Slot
                </Button>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <FileText className="w-4 h-4" />
                  Add Resources (Optional)
                </label>
                <Textarea
                  placeholder="Add links to materials..."
                  value={resources}
                  onChange={(e) => setResources(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Creating...
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create Session
                  </>
                )}
              </Button>
            </form>
          </div>
        )}

        {/* Scheduled Sessions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Your Scheduled Sessions</h2>
          {sessions.length === 0 ? (
            <div className="bg-card rounded-2xl p-8 text-center">
              <p className="text-muted-foreground">No sessions created yet</p>
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className="bg-card rounded-2xl shadow-soft p-5 border border-border/50 hover:shadow-card transition-all animate-fade-in"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-foreground">{session.skillName}</h3>
                  <button
                    onClick={() => deleteSession(session.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{session.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {session.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {session.enrolledCount} enrolled
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {session.slots.length} slots
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={startVideoSession}
                    variant="gradient"
                    size="sm"
                    className="flex-1"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Start Video Session
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <FloatingNav />
    </div>
  );
};

export default TeachSkill;
