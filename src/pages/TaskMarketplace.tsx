import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import FloatingNav from '@/components/FloatingNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  ArrowLeft, Plus, DollarSign, MessageCircle, Star, 
  X, User, Clock, Send, CreditCard, Users, Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Applicant {
  id: string;
  name: string;
  message: string;
  appliedAt: Date;
}

interface Task {
  id: string;
  title: string;
  description: string;
  amount: number;
  postedBy: string;
  postedById: string;
  status: 'open' | 'in_progress' | 'completed';
  applicants: Applicant[];
  assignedTo?: string;
  createdAt: Date;
}

const TaskMarketplace = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState<Task | null>(null);
  const [showChatModal, setShowChatModal] = useState<{task: Task, applicant: Applicant} | null>(null);
  const [showApplicants, setShowApplicants] = useState<Task | null>(null);
  
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskAmount, setTaskAmount] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [applicantMessage, setApplicantMessage] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Create a React Portfolio Website',
      description: 'Need someone to build a modern portfolio website using React and Tailwind CSS. Should be responsive and have good animations.',
      amount: 50,
      postedBy: 'John Doe',
      postedById: 'user1',
      status: 'open',
      applicants: [
        { id: 'a1', name: 'Sarah Wilson', message: 'I have 3 years of React experience and would love to help!', appliedAt: new Date() }
      ],
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Write Technical Blog Posts',
      description: 'Looking for someone to write 5 technical blog posts about JavaScript best practices. Each post should be 1000+ words.',
      amount: 30,
      postedBy: 'Alice Chen',
      postedById: 'user2',
      status: 'open',
      applicants: [],
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Design App UI Mockups',
      description: 'Need UI/UX mockups for a fitness tracking mobile app. Must be delivered in Figma.',
      amount: 75,
      postedBy: 'Bob Miller',
      postedById: 'user3',
      status: 'open',
      applicants: [
        { id: 'a2', name: 'Mike Johnson', message: 'Professional designer with 5+ years experience.', appliedAt: new Date() },
        { id: 'a3', name: 'Emily Davis', message: 'I specialize in fitness app designs!', appliedAt: new Date() }
      ],
      createdAt: new Date(),
    },
  ]);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskTitle.trim() || !taskDescription.trim() || !taskAmount) {
      toast.error('Please fill all fields');
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle,
      description: taskDescription,
      amount: parseFloat(taskAmount),
      postedBy: user?.name || 'You',
      postedById: 'currentUser',
      status: 'open',
      applicants: [],
      createdAt: new Date(),
    };
    
    setTasks([newTask, ...tasks]);
    setIsLoading(false);
    setShowCreateForm(false);
    setTaskTitle('');
    setTaskDescription('');
    setTaskAmount('');
    
    toast.success('Task posted! 🎉');
  };

  const handleApply = async (task: Task) => {
    if (!applicantName.trim() || !applicantMessage.trim()) {
      toast.error('Please fill all fields');
      return;
    }
    
    const newApplicant: Applicant = {
      id: Date.now().toString(),
      name: applicantName,
      message: applicantMessage,
      appliedAt: new Date(),
    };
    
    setTasks(tasks.map(t => 
      t.id === task.id 
        ? { ...t, applicants: [...t.applicants, newApplicant] }
        : t
    ));
    
    setShowApplyModal(null);
    setApplicantName('');
    setApplicantMessage('');
    toast.success('Application submitted!');
  };

  const handlePayment = () => {
    toast.success('Opening payment gateway...', {
      description: 'Razorpay integration would be implemented here.',
    });
  };

  const handleRate = (taskId: string) => {
    toast.success('Thank you for your rating! ⭐');
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.success('Task deleted');
  };

  const acceptApplicant = (taskId: string, applicantName: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId 
        ? { ...t, status: 'in_progress', assignedTo: applicantName }
        : t
    ));
    setShowApplicants(null);
    toast.success(`Assigned to ${applicantName}!`);
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
            <h1 className="text-2xl font-bold text-foreground">Task Marketplace</h1>
            <p className="text-sm text-muted-foreground">Earn by completing tasks</p>
          </div>
        </div>
      </header>

      <div className="px-6">
        {/* Create Task Button */}
        {!showCreateForm && (
          <Button
            onClick={() => setShowCreateForm(true)}
            variant="gradient"
            size="lg"
            className="w-full mb-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            Post a Task
          </Button>
        )}

        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-card rounded-3xl shadow-card p-6 mb-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Post New Task</h2>
              <button onClick={() => setShowCreateForm(false)} className="p-2 rounded-xl hover:bg-muted">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Task Title *</label>
                <Input
                  placeholder="e.g., Create a logo design"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description *</label>
                <Textarea
                  placeholder="Describe the task in detail..."
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Amount (₹) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={taskAmount}
                    onChange={(e) => setTaskAmount(e.target.value)}
                    className="pl-12"
                  />
                </div>
              </div>

              <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? 'Posting...' : 'Post Task'}
              </Button>
            </form>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Available Tasks</h2>
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-card rounded-2xl shadow-soft p-5 border border-border/50 hover:shadow-card transition-all animate-fade-in"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{task.title}</h3>
                  <p className="text-xs text-muted-foreground">Posted by {task.postedBy}</p>
                </div>
                <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-bold">
                  ₹{task.amount}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{task.description}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {task.applicants.length} applicants
                </div>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs",
                  task.status === 'open' && "bg-primary/10 text-primary",
                  task.status === 'in_progress' && "bg-warning/10 text-warning",
                  task.status === 'completed' && "bg-success/10 text-success"
                )}>
                  {task.status.replace('_', ' ')}
                </span>
              </div>

              <div className="flex gap-2 flex-wrap">
                {task.postedById !== 'currentUser' && task.status === 'open' && (
                  <Button
                    onClick={() => setShowApplyModal(task)}
                    variant="gradient"
                    size="sm"
                  >
                    Apply
                  </Button>
                )}
                
                {task.postedById === 'currentUser' && task.applicants.length > 0 && (
                  <Button
                    onClick={() => setShowApplicants(task)}
                    variant="outline"
                    size="sm"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    View Applicants ({task.applicants.length})
                  </Button>
                )}

                {task.status === 'in_progress' && task.postedById === 'currentUser' && (
                  <>
                    <Button onClick={handlePayment} variant="gradient" size="sm">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay
                    </Button>
                    <Button onClick={() => handleRate(task.id)} variant="outline" size="sm">
                      <Star className="w-4 h-4 mr-2" />
                      Rate
                    </Button>
                  </>
                )}

                {task.postedById === 'currentUser' && (
                  <Button
                    onClick={() => deleteTask(task.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => setShowApplyModal(null)} />
          <div className="relative w-full max-w-md bg-card rounded-3xl shadow-card p-6 animate-scale-in">
            <h2 className="text-lg font-bold text-foreground mb-4">Apply for Task</h2>
            <p className="text-sm text-muted-foreground mb-4">{showApplyModal.title}</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Your Name</label>
                <Input
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message</label>
                <Textarea
                  value={applicantMessage}
                  onChange={(e) => setApplicantMessage(e.target.value)}
                  placeholder="Why are you the right person for this task?"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowApplyModal(null)} className="flex-1">
                  Cancel
                </Button>
                <Button variant="gradient" onClick={() => handleApply(showApplyModal)} className="flex-1">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Applicants Modal */}
      {showApplicants && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => setShowApplicants(null)} />
          <div className="relative w-full max-w-md bg-card rounded-3xl shadow-card p-6 animate-scale-in max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-foreground mb-4">Applicants</h2>
            
            <div className="space-y-4">
              {showApplicants.applicants.map((applicant) => (
                <div key={applicant.id} className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{applicant.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {applicant.appliedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{applicant.message}</p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowChatModal({ task: showApplicants, applicant })}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                    <Button
                      onClick={() => acceptApplicant(showApplicants.id, applicant.name)}
                      variant="gradient"
                      size="sm"
                      className="flex-1"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Accept
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" onClick={() => setShowApplicants(null)} className="w-full mt-4">
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => setShowChatModal(null)} />
          <div className="relative w-full max-w-md bg-card rounded-3xl shadow-card p-6 animate-scale-in">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Chat with {showChatModal.applicant.name}
            </h2>
            
            <div className="h-48 bg-muted/50 rounded-xl p-4 mb-4 overflow-y-auto">
              <p className="text-sm text-muted-foreground text-center">No messages yet</p>
            </div>
            
            <div className="flex gap-2">
              <Input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button
                variant="gradient"
                size="icon"
                onClick={() => {
                  if (chatMessage.trim()) {
                    toast.success('Message sent!');
                    setChatMessage('');
                  }
                }}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            
            <Button variant="outline" onClick={() => setShowChatModal(null)} className="w-full mt-4">
              Close
            </Button>
          </div>
        </div>
      )}

      <FloatingNav />
    </div>
  );
};

export default TaskMarketplace;
