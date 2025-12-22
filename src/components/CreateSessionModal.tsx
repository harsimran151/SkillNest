import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { X, Plus, Calendar, Clock, Tag, FileText, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const availableTags = [
  'Programming', 'Design', 'Music', 'Languages', 'Math', 'Science',
  'Art', 'Writing', 'Business', 'Marketing', 'Photography', 'Cooking'
];

const CreateSessionModal = ({ isOpen, onClose }: CreateSessionModalProps) => {
  const [skillName, setSkillName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [slots, setSlots] = useState<{ date: string; time: string }[]>([{ date: '', time: '' }]);
  const [resources, setResources] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    
    toast.success('Session created! 🎉', {
      description: 'Your teaching session is now visible to other students.',
    });
    
    onClose();
    
    // Reset form
    setSkillName('');
    setDescription('');
    setSelectedTags([]);
    setSlots([{ date: '', time: '' }]);
    setResources('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card rounded-3xl shadow-card animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-feature-teach/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-feature-teach" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Create Session</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Skill Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Skill Name *
            </label>
            <Input
              placeholder="e.g., Python Programming, Guitar Basics"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
            />
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Description *
            </label>
            <Textarea
              placeholder="Describe what you'll teach, your experience level, and what students will learn..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] rounded-xl border-2 resize-none"
            />
          </div>
          
          {/* Tags */}
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
          
          {/* Available Slots */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Calendar className="w-4 h-4" />
              Available Slots *
            </label>
            {slots.map((slot, index) => (
              <div key={index} className="flex gap-2 items-center animate-fade-in">
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
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSlot}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Slot
            </Button>
          </div>
          
          {/* Resources */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <FileText className="w-4 h-4" />
              Add Resources (Optional)
            </label>
            <Textarea
              placeholder="Add links to materials, documents, or any resources that will help students..."
              value={resources}
              onChange={(e) => setResources(e.target.value)}
              className="min-h-[80px] rounded-xl border-2 resize-none"
            />
          </div>
          
          {/* Submit Button */}
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Creating Session...
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
    </div>
  );
};

export default CreateSessionModal;
