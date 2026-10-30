import { useState } from "react";
import { CheckCircle, Sparkles, Award, Brain } from "lucide-react";

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
    ],
    answer: 0,
  },
  {
    question: "Which tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1,
  },
  {
    question: "Which element represents the largest heading?",
    options: ["<h6>", "<heading>", "<h1>", "<head>"],
    answer: 2,
  },
];

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = questions[current];

  const nextQuestion = () => {
    if (selected === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }

    setSelected(null);

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const percentage = Math.round((score / questions.length) * 100);
  const pointsEarned = percentage >= 70 ? 50 : 20;

  const aiFeedback =
    percentage >= 80
      ? "Excellent understanding! You’re ready to apply and even teach HTML basics."
      : percentage >= 60
      ? "Good foundation. Revise semantic tags and structure for mastery."
      : "You should revisit HTML fundamentals before moving ahead.";

  return (
    <div className="min-h-screen px-6 py-16 bg-gradient-to-br from-feature-teach/10 via-primary/10 to-feature-learn/10 flex items-center justify-center">

      <div className="w-full max-w-3xl">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="
            text-4xl font-extrabold tracking-tight
            bg-gradient-to-r from-feature-teach via-primary to-feature-learn
            bg-clip-text text-transparent
          ">
            HTML Skill Check
          </h1>

          <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
            Validate your understanding of HTML fundamentals.
          </p>
        </div>

        {/* PROGRESS */}
        {!completed && (
          <div className="mb-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>
                Question {current + 1} of {questions.length}
              </span>
              <span>
                {Math.round(((current + 1) / questions.length) * 100)}%
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-feature-teach via-primary to-feature-learn transition-all"
                style={{
                  width: `${((current + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* QUIZ BODY */}
        {!completed ? (
          <div className="bg-card/90 backdrop-blur rounded-3xl p-8 shadow-card border border-border/50">

            <h2 className="text-xl font-semibold mb-6">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelected(index)}
                  className={`
                    w-full text-left px-5 py-4 rounded-xl border
                    transition-all duration-200
                    ${
                      selected === index
                        ? "border-primary bg-primary/10"
                        : "border-border/60 hover:bg-muted/60"
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={nextQuestion}
                disabled={selected === null}
                className="
                  px-6 py-2.5 rounded-xl text-sm font-medium
                  bg-primary text-primary-foreground
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition
                "
              >
                {current + 1 === questions.length ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        ) : (
          /* RESULT */
          <div className="bg-card/90 backdrop-blur rounded-3xl p-10 shadow-card border border-border/50 space-y-8">

            {/* SCORE */}
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
              <h2 className="text-2xl font-semibold">
                Skill Check Completed
              </h2>
              <p className="text-muted-foreground mt-1">
                You scored {score} out of {questions.length} ({percentage}%)
              </p>
            </div>

            {/* AI FEEDBACK */}
            <div className="bg-muted/50 rounded-2xl p-5 flex gap-4">
              <Brain className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-sm mb-1">
                  AI Mentor Feedback
                </h4>
                <p className="text-sm text-muted-foreground">
                  {aiFeedback}
                </p>
              </div>
            </div>

            {/* REWARDS */}
            <div className="bg-gradient-to-r from-feature-teach/10 via-primary/10 to-feature-learn/10 rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm font-medium">Points Earned</p>
                  <p className="text-xs text-muted-foreground">
                    Added to your Skill Nest wallet
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-lg font-bold text-primary">
                <Sparkles className="w-4 h-4" />
                {pointsEarned}
              </div>
            </div>

            {/* ACTION */}
            <div className="text-center">
              <button
                onClick={() => window.history.back()}
                className="
                  px-6 py-2.5 rounded-xl text-sm font-medium
                  bg-primary text-primary-foreground
                  hover:opacity-90 transition
                "
              >
                Back to Skill Check
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
