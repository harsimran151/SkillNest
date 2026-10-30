import { 
  Twitter, Instagram, Linkedin, Youtube, Github, 
  Mail, Heart, GraduationCap, ArrowRight 
} from 'lucide-react';

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
];

const Footer = () => {
  return (
    <footer className="mt-16 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card rounded-3xl shadow-soft border border-border/50 p-8">

          {/* TOP GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* BRAND */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <GraduationCap className="w-6 h-6 text-feature-teach" />
                <span className="text-xl font-bold bg-gradient-to-r from-feature-teach via-primary to-feature-learn bg-clip-text text-transparent">
                  Skill Nest
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto md:mx-0">
                Where skills meet ambition and students grow together.
              </p>
            </div>

            {/* QUICK EXPLORE */}
            <div className="text-center">
              <h4 className="text-sm font-semibold mb-3">Explore</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary transition">Teach a Skill</a>
                <a href="#" className="hover:text-primary transition">Learn a Skill</a>
                <a href="#" className="hover:text-primary transition">Campus Community</a>
                <a href="#" className="hover:text-primary transition">Rewards</a>
              </div>
            </div>

            {/* STAY CONNECTED */}
            <div className="text-center md:text-right">
              <h4 className="text-sm font-semibold mb-3">Stay Connected</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Updates, features & learning insights.
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-primary cursor-pointer hover:opacity-80 transition">
                Get updates
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* SOCIAL LINKS (CENTER) */}
          <div className="flex items-center justify-center gap-8 mb-8">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-110"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* BOTTOM STRIP (LEFT & RIGHT) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 text-xs text-muted-foreground">

            {/* LEFT */}
            <div className="flex gap-4">
              <span className="flex items-center gap-1">🎓 Student-first</span>
              <span className="flex items-center gap-1">🔒 Secure</span>
              <span className="flex items-center gap-1">🚀 Future-ready</span>
            </div>

            {/* RIGHT */}
            <div className="flex gap-4">
              <span className="flex items-center gap-1">📬 News</span>
              <span className="flex items-center gap-1">✨ Features</span>
              <span className="flex items-center gap-1">🤖 AI tips</span>
            </div>

          </div>

          {/* LEGAL */}
          <div className="border-t border-border/50 pt-4 text-center text-xs text-muted-foreground">
            <p className="flex items-center justify-center gap-1">
              Made with <Heart className="w-3 h-3 text-destructive fill-destructive" /> by Skill Nest Team © 2026
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
