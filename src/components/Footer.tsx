import { 
  Twitter, Instagram, Linkedin, Youtube, Github, 
  Mail, Heart, GraduationCap 
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
    <footer className="mt-12 pb-32 px-6">
      <div className="max-w-md mx-auto">
        <div className="bg-card rounded-3xl shadow-soft border border-border/50 p-6">
          {/* Brand */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <GraduationCap className="w-6 h-6 text-feature-teach" />
              <span className="text-xl font-bold bg-gradient-to-r from-feature-teach via-primary to-feature-learn bg-clip-text text-transparent">
                Skill Nest
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Where Skills Meet, Students Grow
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-3 mb-6">
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

          {/* Quick Links */}
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-6">
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="mailto:hello@skillnest.com" className="hover:text-primary transition-colors flex items-center gap-1">
              <Mail className="w-4 h-4" />
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-muted-foreground border-t border-border/50 pt-4">
            <p className="flex items-center justify-center gap-1">
              Made with <Heart className="w-3 h-3 text-destructive fill-destructive" /> by Skill Nest Team © 2024
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
