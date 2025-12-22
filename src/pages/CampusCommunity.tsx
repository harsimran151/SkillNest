import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import FloatingNav from '@/components/FloatingNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, Search, MapPin, Users, MessageCircle, 
  UserPlus, Building2, GraduationCap, Globe, Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface College {
  id: string;
  name: string;
  location: string;
  studentsCount: number;
  image?: string;
}

interface Student {
  id: string;
  name: string;
  college: string;
  skills: string[];
  isConnected: boolean;
}

const colleges: College[] = [
  { id: '1', name: 'IIT Delhi', location: 'New Delhi', studentsCount: 1250 },
  { id: '2', name: 'IIT Bombay', location: 'Mumbai', studentsCount: 980 },
  { id: '3', name: 'IIT Madras', location: 'Chennai', studentsCount: 1120 },
  { id: '4', name: 'BITS Pilani', location: 'Pilani', studentsCount: 850 },
  { id: '5', name: 'Delhi University', location: 'New Delhi', studentsCount: 2340 },
  { id: '6', name: 'VIT Vellore', location: 'Vellore', studentsCount: 1560 },
  { id: '7', name: 'NIT Trichy', location: 'Tiruchirappalli', studentsCount: 720 },
  { id: '8', name: 'IIIT Hyderabad', location: 'Hyderabad', studentsCount: 640 },
];

const allStudents: Student[] = [
  { id: '1', name: 'Rahul Kumar', college: 'IIT Delhi', skills: ['Python', 'Machine Learning'], isConnected: false },
  { id: '2', name: 'Priya Sharma', college: 'IIT Delhi', skills: ['Web Development', 'React'], isConnected: true },
  { id: '3', name: 'Amit Patel', college: 'IIT Bombay', skills: ['Data Science', 'SQL'], isConnected: false },
  { id: '4', name: 'Sneha Gupta', college: 'IIT Bombay', skills: ['UI/UX Design', 'Figma'], isConnected: false },
  { id: '5', name: 'Vikram Singh', college: 'BITS Pilani', skills: ['Java', 'Android'], isConnected: true },
  { id: '6', name: 'Ananya Reddy', college: 'IIT Madras', skills: ['C++', 'Competitive Programming'], isConnected: false },
  { id: '7', name: 'Karthik Nair', college: 'VIT Vellore', skills: ['JavaScript', 'Node.js'], isConnected: false },
  { id: '8', name: 'Divya Menon', college: 'NIT Trichy', skills: ['Python', 'Data Analytics'], isConnected: false },
];

const CampusCommunity = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [students, setStudents] = useState<Student[]>(allStudents);
  const [viewMode, setViewMode] = useState<'colleges' | 'all'>('colleges');

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStudents = students.filter(student => {
    if (selectedCollege) {
      return student.college === selectedCollege.name;
    }
    return student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const toggleConnection = (studentId: string) => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, isConnected: !s.isConnected } : s
    ));
    const student = students.find(s => s.id === studentId);
    if (student) {
      toast.success(student.isConnected ? 'Disconnected' : `Connected with ${student.name}!`);
    }
  };

  const sendMessage = (studentName: string) => {
    toast.success(`Opening chat with ${studentName}...`);
  };

  if (selectedCollege) {
    return (
      <div className="min-h-screen gradient-hero pb-28">
        <header className="px-6 pt-8 pb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedCollege(null)}
              className="p-2 rounded-xl bg-card shadow-soft hover:shadow-card transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">{selectedCollege.name}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {selectedCollege.location}
              </p>
            </div>
          </div>
        </header>

        <div className="px-6">
          <div className="bg-card rounded-2xl p-4 mb-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{selectedCollege.studentsCount}</p>
                <p className="text-sm text-muted-foreground">Students on SkillNest</p>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4">Students</h2>
          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="bg-card rounded-2xl p-4 shadow-soft hover:shadow-card transition-all animate-fade-in"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-feature-mentor/10 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-feature-mentor" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{student.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {student.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => sendMessage(student.name)}
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => toggleConnection(student.id)}
                      variant={student.isConnected ? "outline" : "gradient"}
                      size="icon"
                      className="h-9 w-9"
                    >
                      {student.isConnected ? <Check className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <FloatingNav />
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-foreground">Campus Community</h1>
            <p className="text-sm text-muted-foreground">Connect with students across campuses</p>
          </div>
        </div>
      </header>

      <div className="px-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search colleges or students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('colleges')}
            className={cn(
              "flex-1 py-3 rounded-xl font-medium transition-all",
              viewMode === 'colleges'
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:bg-muted"
            )}
          >
            <Building2 className="w-4 h-4 inline-block mr-2" />
            Colleges
          </button>
          <button
            onClick={() => setViewMode('all')}
            className={cn(
              "flex-1 py-3 rounded-xl font-medium transition-all",
              viewMode === 'all'
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:bg-muted"
            )}
          >
            <Globe className="w-4 h-4 inline-block mr-2" />
            All Students
          </button>
        </div>

        {viewMode === 'colleges' ? (
          <div className="grid gap-4">
            {filteredColleges.map((college) => (
              <button
                key={college.id}
                onClick={() => setSelectedCollege(college)}
                className="bg-card rounded-2xl p-5 shadow-soft hover:shadow-card transition-all text-left group animate-fade-in"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-feature-mentor/10 flex items-center justify-center group-hover:bg-feature-mentor/20 transition-colors">
                    <Building2 className="w-7 h-7 text-feature-mentor" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {college.name}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {college.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{college.studentsCount}</p>
                    <p className="text-xs text-muted-foreground">students</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="bg-card rounded-2xl p-4 shadow-soft hover:shadow-card transition-all animate-fade-in"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-feature-mentor/10 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-feature-mentor" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{student.name}</h3>
                    <p className="text-xs text-muted-foreground">{student.college}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {student.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => sendMessage(student.name)}
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => toggleConnection(student.id)}
                      variant={student.isConnected ? "outline" : "gradient"}
                      size="icon"
                      className="h-9 w-9"
                    >
                      {student.isConnected ? <Check className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FloatingNav />
    </div>
  );
};

export default CampusCommunity;
