const testimonials = [
  {
    name: "Aman Verma",
    role: "CS Student",
    text: "Skill Nest helped me learn React faster by connecting me with the right mentors.",
  },
  {
    name: "Simran Kaur",
    role: "Design Enthusiast",
    text: "Exchanging skills here feels natural and rewarding. Love the concept!",
  },
  {
    name: "Rohit Sharma",
    role: "Final Year Student",
    text: "The task marketplace is a great way to earn while learning.",
  },
  {
    name: "Neha Gupta",
    role: "Web Developer",
    text: "Clean UI, useful features, and a strong student community.",
  },
];

const TestimonialsMarquee = () => {
  return (
    <div className="relative overflow-hidden py-8">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex gap-6 animate-marquee">
        {[...testimonials, ...testimonials].map((item, index) => (
          <div
            key={index}
            className="
              w-64 h-64 flex-shrink-0
              bg-card/80 backdrop-blur
              rounded-2xl p-5
              shadow-card border border-border/40
              hover:scale-105 transition
            "
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              “{item.text}”
            </p>

            <div className="mt-6">
              <p className="font-semibold text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsMarquee;
