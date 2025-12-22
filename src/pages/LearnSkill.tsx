import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import FloatingNav from '@/components/FloatingNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, Search, Play, BookOpen, ExternalLink, 
  Star, Clock, FileText, Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  youtubeVideos: { title: string; url: string; duration: string }[];
  resources: { title: string; url: string; type: string }[];
  rating: number;
  learners: number;
}

const skills: Skill[] = [
  {
    id: '1',
    name: 'Python Programming',
    category: 'Programming',
    description: 'Learn Python from basics to advanced concepts including data structures, OOP, and libraries.',
    youtubeVideos: [
      { title: 'Python Full Course for Beginners', url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc', duration: '6:14:07' },
      { title: 'Python Crash Course', url: 'https://www.youtube.com/watch?v=JJmcL1N2KQs', duration: '1:30:45' },
      { title: 'Python OOP Tutorial', url: 'https://www.youtube.com/watch?v=ZDa-Z5JzLYM', duration: '45:00' },
    ],
    resources: [
      { title: 'Python Official Docs', url: 'https://python.org/doc', type: 'Documentation' },
      { title: 'Real Python Tutorials', url: 'https://realpython.com', type: 'Tutorials' },
      { title: 'Python Cheat Sheet', url: 'https://pythoncheatsheet.org', type: 'Cheat Sheet' },
    ],
    rating: 4.8,
    learners: 15420,
  },
  {
    id: '2',
    name: 'Web Development',
    category: 'Programming',
    description: 'Master HTML, CSS, JavaScript, and modern frameworks like React and Node.js.',
    youtubeVideos: [
      { title: 'Web Development Full Course', url: 'https://www.youtube.com/watch?v=nu_pCVPKzTk', duration: '9:00:00' },
      { title: 'React Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', duration: '4:24:00' },
      { title: 'CSS Complete Guide', url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc', duration: '6:18:37' },
    ],
    resources: [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', type: 'Documentation' },
      { title: 'freeCodeCamp', url: 'https://freecodecamp.org', type: 'Interactive' },
    ],
    rating: 4.9,
    learners: 23150,
  },
  {
    id: '3',
    name: 'Guitar Basics',
    category: 'Music',
    description: 'Learn guitar fundamentals including chords, strumming patterns, and basic music theory.',
    youtubeVideos: [
      { title: 'Guitar Lessons for Beginners', url: 'https://www.youtube.com/watch?v=BBz-Jyr23M4', duration: '1:04:00' },
      { title: 'Learn 10 Easy Songs', url: 'https://www.youtube.com/watch?v=4xmV5dBEGgQ', duration: '35:00' },
    ],
    resources: [
      { title: 'JustinGuitar', url: 'https://justinguitar.com', type: 'Free Lessons' },
      { title: 'Ultimate Guitar Tabs', url: 'https://ultimate-guitar.com', type: 'Tabs & Chords' },
    ],
    rating: 4.7,
    learners: 8920,
  },
  {
    id: '4',
    name: 'UI/UX Design',
    category: 'Design',
    description: 'Master user interface and user experience design principles with Figma and design thinking.',
    youtubeVideos: [
      { title: 'Figma UI Design Tutorial', url: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8', duration: '3:45:00' },
      { title: 'UX Design Fundamentals', url: 'https://www.youtube.com/watch?v=wIuVvCuiJhU', duration: '25:00' },
    ],
    resources: [
      { title: 'Figma Learn', url: 'https://figma.com/resources/learn-design', type: 'Official Guide' },
      { title: 'Laws of UX', url: 'https://lawsofux.com', type: 'Principles' },
    ],
    rating: 4.6,
    learners: 12340,
  },
  {
    id: '5',
    name: 'Digital Marketing',
    category: 'Marketing',
    description: 'Learn SEO, social media marketing, content strategy, and analytics.',
    youtubeVideos: [
      { title: 'Digital Marketing Full Course', url: 'https://www.youtube.com/watch?v=bixR-KIJKYM', duration: '5:00:00' },
      { title: 'SEO Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=OYRkIGaP80M', duration: '2:15:00' },
    ],
    resources: [
      { title: 'Google Digital Garage', url: 'https://learndigital.withgoogle.com', type: 'Free Course' },
      { title: 'HubSpot Academy', url: 'https://academy.hubspot.com', type: 'Certification' },
    ],
    rating: 4.5,
    learners: 9870,
  },
  {
    id: '6',
    name: 'Photography',
    category: 'Art',
    description: 'Master camera settings, composition, lighting, and photo editing techniques.',
    youtubeVideos: [
      { title: 'Photography Basics', url: 'https://www.youtube.com/watch?v=LxO-6rlihSg', duration: '15:00' },
      { title: 'Photo Editing with Lightroom', url: 'https://www.youtube.com/watch?v=6lPKLQKk97M', duration: '1:30:00' },
    ],
    resources: [
      { title: 'Cambridge in Colour', url: 'https://cambridgeincolour.com', type: 'Tutorials' },
      { title: 'Unsplash Learn', url: 'https://unsplash.com/learn', type: 'Inspiration' },
    ],
    rating: 4.7,
    learners: 7650,
  },
];

const categories = ['All', 'Programming', 'Design', 'Music', 'Marketing', 'Art'];

const LearnSkill = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedSkill) {
    return (
      <div className="min-h-screen gradient-hero pb-28">
        <header className="px-6 pt-8 pb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedSkill(null)}
              className="p-2 rounded-xl bg-card shadow-soft hover:shadow-card transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{selectedSkill.name}</h1>
              <p className="text-sm text-muted-foreground">{selectedSkill.category}</p>
            </div>
          </div>
        </header>

        <div className="px-6 space-y-6">
          {/* Description */}
          <div className="bg-card rounded-2xl p-5 shadow-soft">
            <p className="text-muted-foreground">{selectedSkill.description}</p>
            <div className="flex items-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-1 text-warning">
                <Star className="w-4 h-4 fill-current" />
                {selectedSkill.rating}
              </div>
              <div className="text-muted-foreground">
                {selectedSkill.learners.toLocaleString()} learners
              </div>
            </div>
          </div>

          {/* YouTube Videos */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-destructive" />
              Video Tutorials
            </h2>
            <div className="space-y-3">
              {selectedSkill.youtubeVideos.map((video, index) => (
                <a
                  key={index}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-card rounded-2xl p-4 shadow-soft hover:shadow-card transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                      <Play className="w-6 h-6 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Learning Resources
            </h2>
            <div className="space-y-3">
              {selectedSkill.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-card rounded-2xl p-4 shadow-soft hover:shadow-card transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{resource.type}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </a>
              ))}
            </div>
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
            <h1 className="text-2xl font-bold text-foreground">Learn a Skill</h1>
            <p className="text-sm text-muted-foreground">Explore curated learning paths</p>
          </div>
        </div>
      </header>

      <div className="px-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid gap-4">
          {filteredSkills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => setSelectedSkill(skill)}
              className="bg-card rounded-2xl p-5 shadow-soft hover:shadow-card transition-all text-left group animate-fade-in"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-feature-learn/10 flex items-center justify-center group-hover:bg-feature-learn/20 transition-colors">
                  <BookOpen className="w-7 h-7 text-feature-learn" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {skill.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span className="px-2 py-1 bg-muted rounded-full text-muted-foreground text-xs">
                      {skill.category}
                    </span>
                    <div className="flex items-center gap-1 text-warning">
                      <Star className="w-3 h-3 fill-current" />
                      {skill.rating}
                    </div>
                    <span className="text-muted-foreground">
                      {skill.youtubeVideos.length} videos
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <FloatingNav />
    </div>
  );
};

export default LearnSkill;
