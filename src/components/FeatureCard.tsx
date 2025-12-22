import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: 'teach' | 'learn' | 'study' | 'quiz' | 'mentor' | 'resources';
  onClick?: () => void;
}

const colorClasses = {
  teach: {
    bg: 'bg-feature-teach/10',
    text: 'text-feature-teach',
    border: 'border-feature-teach/20',
    glow: 'hover:shadow-[0_8px_30px_-4px_hsl(var(--feature-teach)/0.3)]',
  },
  learn: {
    bg: 'bg-feature-learn/10',
    text: 'text-feature-learn',
    border: 'border-feature-learn/20',
    glow: 'hover:shadow-[0_8px_30px_-4px_hsl(var(--feature-learn)/0.3)]',
  },
  study: {
    bg: 'bg-feature-study/10',
    text: 'text-feature-study',
    border: 'border-feature-study/20',
    glow: 'hover:shadow-[0_8px_30px_-4px_hsl(var(--feature-study)/0.3)]',
  },
  quiz: {
    bg: 'bg-feature-quiz/10',
    text: 'text-feature-quiz',
    border: 'border-feature-quiz/20',
    glow: 'hover:shadow-[0_8px_30px_-4px_hsl(var(--feature-quiz)/0.3)]',
  },
  mentor: {
    bg: 'bg-feature-mentor/10',
    text: 'text-feature-mentor',
    border: 'border-feature-mentor/20',
    glow: 'hover:shadow-[0_8px_30px_-4px_hsl(var(--feature-mentor)/0.3)]',
  },
  resources: {
    bg: 'bg-feature-resources/10',
    text: 'text-feature-resources',
    border: 'border-feature-resources/20',
    glow: 'hover:shadow-[0_8px_30px_-4px_hsl(var(--feature-resources)/0.3)]',
  },
};

const FeatureCard = ({ title, description, icon, color, onClick }: FeatureCardProps) => {
  const colors = colorClasses[color];
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-5 rounded-2xl border-2 bg-card text-left transition-all duration-300",
        "hover:scale-[1.02] active:scale-[0.98]",
        colors.border,
        colors.glow
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-3",
        colors.bg
      )}>
        <div className={colors.text}>
          {icon}
        </div>
      </div>
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
    </button>
  );
};

export default FeatureCard;
