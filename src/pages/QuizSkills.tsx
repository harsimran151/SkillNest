import { useNavigate } from "react-router-dom";
import {
  Code,
  Palette,
  Brain,
  Database,
  GitBranch,
  Lock,
  Sparkles,
} from "lucide-react";

const skills = [
  {
    id: "html",
    title: "HTML Basics",
    level: "Beginner",
    description: "Structure the web with semantic HTML.",
    icon: Code,
    active: true,
  },
  {
    title: "CSS Basics",
    level: "Beginner",
    description: "Style layouts and components beautifully.",
    icon: Palette,
    active: false,
  },
  {
    title: "JavaScript",
    level: "Intermediate",
    description: "Add logic and interactivity to the web.",
    icon: Brain,
    active: false,
  },
  {
    title: "Python",
    level: "Beginner",
    description: "Write clean and powerful scripts.",
    icon: Database,
    active: false,
  },
  {
    title: "DSA",
    level: "Advanced",
    description: "Sharpen problem-solving skills.",
    icon: Brain,
    active: false,
  },
  {
    title: "UI / UX",
    level: "Beginner",
    description: "Design user-friendly experiences.",
    icon: Palette,
    active: false,
  },
  {
    title: "Git & GitHub",
    level: "Beginner",
    description: "Version control and collaboration.",
    icon: GitBranch,
    active: false,
  },
];

const QuizSkills = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-6 py-14 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="
          text-5xl font-extrabold tracking-tight
          bg-gradient-to-r from-feature-teach via-primary to-feature-learn
          bg-clip-text text-transparent
        ">
          Skill Check
        </h1>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          Test your understanding, validate your skills, and unlock the next level of learning.
        </p>
      </div>

      {/* SKILLS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {skills.map((skill, index) => {
          const Icon = skill.icon;

          return (
            <div
              key={index}
              className={`
                relative rounded-2xl p-6 bg-card border border-border/50
                shadow-soft transition-all duration-300
                hover:shadow-card hover:-translate-y-1
              `}
            >
              {/* ICON */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`
                    w-11 h-11 rounded-xl flex items-center justify-center
                    ${skill.active
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"}
                  `}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">{skill.title}</h3>
                  <p className="text-xs text-muted-foreground">{skill.level}</p>
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-muted-foreground mb-6">
                {skill.description}
              </p>

              {/* ACTION */}
              {skill.active ? (
                <button
                  onClick={() => navigate("/quiz/html")}
                  className="
                    w-full py-2.5 rounded-xl text-sm font-medium
                    bg-primary text-primary-foreground
                    hover:opacity-90 transition
                  "
                >
                  Start Quiz
                </button>
              ) : (
                <div
                  className="
                    w-full py-2.5 rounded-xl text-sm
                    border border-border/60
                    text-muted-foreground
                    flex items-center justify-center gap-2
                    cursor-not-allowed
                  "
                >
                  <Lock className="w-4 h-4" />
                  Coming Soon
                </div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default QuizSkills;
