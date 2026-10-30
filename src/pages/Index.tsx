import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen, Users, Trophy, Puzzle, Rocket, Brain, GraduationCap, Lightbulb, Target, Award } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/10 animate-float" />
      <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-accent/10 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-20 h-20 rounded-full bg-feature-learn/10 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-60 right-16 w-12 h-12 rounded-full bg-feature-quiz/10 animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-28 left-80 opacity-[0.08] animate-float">
        <BookOpen className="w-24 h-24 text-primary" />
      </div>
      <div className="absolute top-52 left-10 opacity-[0.08] animate-float" style={{ animationDelay: '2.5s' }}>
        <Puzzle className="w-16 h-16 text-feature-quiz" />
      </div>
      <div className="absolute top-60 right-16 opacity-[0.08] animate-float" style={{ animationDelay: '3s' }}>
        <Rocket className="w-14 h-14 text-accent" />
      </div>
      <div className="absolute top-36 right-80 opacity-[0.08] animate-float" style={{ animationDelay: '0.5s' }}>
        <GraduationCap className="w-20 h-20 text-accent" />
      </div>
      <div className="absolute top-96 left-60 opacity-[0.08] animate-float" style={{ animationDelay: '1s' }}>
        <Lightbulb className="w-16 h-16 text-feature-learn" />
      </div>
      <div className="absolute top-96 right-60 opacity-[0.08] animate-float" style={{ animationDelay: '1.5s' }}>
        <Target className="w-20 h-20 text-feature-teach" />
      </div>
      <div className="absolute top-[600px] left-14 opacity-[0.08] animate-float" style={{ animationDelay: '2s' }}>
        <Brain className="w-14 h-14 text-feature-study" />
      </div>
      <div className="absolute top-[600px] right-16 opacity-[0.08] animate-float">
        <BookOpen className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute top-[850px] right-16 opacity-[0.08] animate-float" style={{ animationDelay: '2.5s' }}>
        <Puzzle className="w-16 h-16 text-feature-quiz" />
      </div>
      <div className="absolute top-[850px] left-16 opacity-[0.08] animate-float" style={{ animationDelay: '3s' }}>
        <Rocket className="w-14 h-14 text-accent" />
      </div>
      <div className="absolute top-[1150px] right-20 opacity-[0.08] animate-float" style={{ animationDelay: '3.5s' }}>
        <Award className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute top-[1100px] left-20 opacity-[0.08] animate-float"
        style={{ animationDelay: '4s' }}
      >
      <Brain className="w-20 h-20 text-feature-study" />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl gradient-primary shadow-glow mb-6 animate-bounce-soft">
          <Sparkles className="w-10 h-10 text-primary-foreground" />
        </div>

        {/* Hero Text */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
          Learn Together,
          <br />
          <span className="text-primary">Grow Together</span>
        </h1>
        <p className="text-muted-foreground text-center text-lg max-w-md mb-10">
          Join our community of learners and share skills with students around the world.
        </p>

        {/* Features */}
        <div className="flex justify-center gap-6 mb-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-feature-teach/10 flex items-center justify-center mb-2">
              <BookOpen className="w-6 h-6 text-feature-teach" />
            </div>
            <span className="text-xs text-muted-foreground">Learn</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-feature-study/10 flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-feature-study" />
            </div>
            <span className="text-xs text-muted-foreground">Connect</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-feature-quiz/10 flex items-center justify-center mb-2">
              <Trophy className="w-6 h-6 text-feature-quiz" />
            </div>
            <span className="text-xs text-muted-foreground">Achieve</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="w-full max-w-sm space-y-3">
          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            onClick={() => navigate('/signup')}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => navigate('/login')}
          >
            I already have an account
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-sm text-muted-foreground">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </footer>
    </div>
  );
};

export default Index;
