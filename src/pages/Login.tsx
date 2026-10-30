import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock, Sparkles,GraduationCap, BookOpen, Lightbulb, Target, Rocket, Brain, Puzzle, Award } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsLoading(true);
    
    const result = await login(email, password);
    
    setIsLoading(false);
    
    if (result.success) {
      toast.success('Welcome back! 🎉', {
        description: 'You have successfully logged in.',
      });
      navigate('/home');
    } else {
      toast.error('Login failed', {
        description: result.error,
      });
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-6">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 animate-float" />
      <div className="absolute bottom-56 right-10 w-16 h-16 rounded-full bg-accent/10 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-20 right-20 w-12 h-12 rounded-full bg-feature-learn/10 animate-float" style={{ animationDelay: '2s' }} />
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
      <div className="w-full max-w-md animate-slide-up">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-glow mb-4">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back!</h1>
          <p className="text-muted-foreground mt-2">Sign in to continue your learning journey</p>
        </div>
        
        {/* Login Form */}
        <div className="bg-card rounded-3xl shadow-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`pl-12 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive animate-fade-in">{errors.email}</p>
              )}
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  className={`pl-12 pr-12 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive animate-fade-in">{errors.password}</p>
              )}
            </div>
            
            {/* Forgot Password */}
            <div className="text-right">
              <button type="button" className="text-sm text-primary hover:underline">
                Forgot password?
              </button>
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
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          
          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
