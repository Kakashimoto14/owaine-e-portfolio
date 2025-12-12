import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  Award, 
  Send, 
  Menu, 
  X, 
  ChevronDown, 
  Layout,
  Facebook,
  Globe,
  Briefcase,
  Monitor,
  Smartphone,
  ArrowUp,
  Sparkles,
  CheckCircle,
  Loader2,
  Phone
} from 'lucide-react';

// --- UTILITY COMPONENTS ---

// 1. Mouse Spotlight Effect
const MouseSpotlight = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(139, 92, 246, 0.15), transparent 80%)`
      }}
    />
  );
};

// 2. Scroll Reveal Animation Wrapper
const Reveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// 3. Typewriter Effect
const Typewriter = ({ text, delay = 50 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

// Custom Upwork Icon
const UpworkIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.077.008-.042c.209-1.187.715-1.969 1.547-2.39.539-.271 1.127-.333 1.701-.176.439.12.836.388 1.129.762.296.377.456.887.452 1.436-.002.508-.131 1.05-.386 1.623l-.01.022c-.255.574-.62 1.157-1.071 1.666l-.524-.596zm2.85-5.876c-.662-.849-1.579-1.465-2.613-1.748-1.396-.381-2.821-.225-4.103.425-1.58.8-2.637 2.162-3.21 4.145l-.337 1.594c-.496 2.34-1.523 3.618-3.054 3.799l-.04.002c-.886.061-1.635-.295-2.094-.997-.472-.719-.595-1.764-.346-2.943l1.341-6.32h-2.86l-1.334 6.291c-.37 1.745-.096 3.424.773 4.743.834 1.272 2.188 1.94 3.837 1.88 2.502-.178 3.99-1.932 4.67-4.174l.261-1.229c.174-.818.423-1.551.741-2.185l.628 2.827h2.883l-.782-3.518c.67.755 1.516 1.438 2.457 1.438 1.52 0 2.971-1.168 3.328-3.522.184-1.22-.057-2.433-.679-3.411z"/>
  </svg>
);

// --- DATA ---

const projects = [
  {
    title: "Resume Website",
    category: "Web Design",
    tech: ["HTML", "CSS"],
    description: "A responsive personal resume website showcasing professional history and skills.",
    image: "images/resume.png", 
    link: "Resume%20(HTML,%20CSS)/index.html" 
  },
  {
    title: "Simple Memory Game",
    category: "Game Dev",
    tech: ["JavaScript"],
    description: "Interactive memory tile game with score tracking logic.",
    image: "images/memory.png",
    link: "memory%20ni%20lovey/index.html"
  },
  {
    title: "Student Info Form",
    category: "Data Entry",
    tech: ["jQuery"],
    description: "Aesthetic form for collecting student data efficiently.",
    image: "images/srf.png",
    link: "Student%20Information%20Form%20(JQuery)/index.html"
  },
  {
    title: "Form Validation",
    category: "Functionality",
    tech: ["JavaScript"],
    description: "Robust client-side validation providing real-time user feedback.",
    image: "images/formvalidation.png",
    link: "Student%20Info%20Form%20Validation/index.html"
  },
  {
    title: "Dynamic Quiz App",
    category: "Interactive",
    tech: ["jQuery"],
    description: "Engaging quiz application that calculates results instantly.",
    image: "images/quiz.png",
    link: "Dynamic%20Quiz/index.html"
  }
];

const certificates = [
  { 
    name: "HTML", 
    level: "Intermediate", 
    date: "2023", 
    icon: <Layout />, 
    // Replace with your actual certificate image URL
    image: "images/HTML.png" 
  },
  { 
    name: "CSS", 
    level: "Intermediate", 
    date: "2023", 
    icon: <Monitor />, 
    // Replace with your actual certificate image URL
    image: "images/CSS.png" 
  },
  { 
    name: "JAVASCRIPT", 
    level: "Beginner", 
    date: "2024", 
    icon: <Code />, 
    // Replace with your actual certificate image URL
    image: "images/JS.png" 
  }
];

// --- MAIN COMPONENT ---

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowTopBtn(window.scrollY > 400);

      const sections = ['home', 'projects', 'certificates', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Using FormSubmit.co for real email functionality
      // NOTE: The first time you test this, check your email to "Activate" the endpoint
      const response = await fetch("https://formsubmit.co/ajax/lorrainetarcenio.11@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        setIsSubmitting(false);
        alert("Something went wrong. Please try again or email me directly.");
      }
    } catch (error) {
      setIsSubmitting(false);
      alert("Network error. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-purple-500 selection:text-white cursor-default bg-[#030014] text-white overflow-x-hidden">
      
      {/* 1. Interactive Mouse Spotlight */}
      <MouseSpotlight />

      {/* Enhanced Static Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[0%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-900/20 blur-[100px]"></div>
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-pink-900/10 blur-[80px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#030014]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-lg shadow-purple-900/10' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection('home')}>
            <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/20 group-hover:rotate-12 transition-transform">L</span>
            <span className="group-hover:text-purple-300 transition-colors">Lorraine.dev</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Projects', 'Certificates', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-purple-400 ${activeSection === item.toLowerCase() ? 'text-purple-400' : 'text-slate-300'}`}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-500 rounded-full animate-fade-in-up"></span>
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4 pl-6 border-l border-white/10">
             <a href="https://www.facebook.com/lorraine.tarcenio.5" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-all hover:scale-110"><Facebook size={20} /></a>
             <a href="https://www.upwork.com/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-500 transition-all hover:scale-110"><UpworkIcon className="w-5 h-5" /></a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#030014]/95 backdrop-blur-xl border-b border-white/10 p-4 flex flex-col gap-2 md:hidden animate-fade-in-up">
            {['Home', 'Projects', 'Certificates', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-left px-4 py-3 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          
          <div className="mb-8 relative group cursor-pointer">
             <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
             <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-[3px] bg-black overflow-hidden hover:scale-105 transition-transform duration-500">
               <img src="/images/2x2.jpg" alt="Profile" className="w-full h-full rounded-full bg-[#1a1a2e]" />
             </div>
             <div className="absolute -right-2 top-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full border border-black shadow-lg animate-bounce-slow">
               Hire Me!
             </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Designing the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x">
              Digital Future
            </span>
          </h1>

          <div className="h-8 mb-10">
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
              I am Lorraine. <span className="text-purple-400 font-semibold"><Typewriter text="I build accessible, pixel-perfect web experiences." /></span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={() => scrollToSection('projects')} className="group px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1">
              View Projects <Briefcase size={18} className="group-hover:rotate-12 transition-transform"/>
            </button>
            <button onClick={() => scrollToSection('contact')} className="group px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-md hover:border-purple-500/50">
              Contact Me <Send size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-32">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  <Sparkles className="text-purple-400" /> Featured Projects
                </h2>
                <p className="text-slate-400">A curated collection of my recent work.</p>
              </div>
              <div className="hidden md:block h-px w-32 bg-gradient-to-r from-purple-500 to-transparent"></div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Reveal key={index} delay={index * 100}>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative block bg-[#0f0c29]/50 border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/20 hover:-translate-y-2"
                >
                  {/* Image Container with Overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 text-white shadow-lg">
                      {project.category}
                    </div>
                  </div>
                  
                  <div className="p-6 relative">
                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
                    
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{project.title}</h3>
                      <ExternalLink size={18} className="text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="text-xs font-medium px-2 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="relative z-10 py-32 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Certifications</h2>
              <p className="text-slate-400">Validated skills and continuous learning journey.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <Reveal key={index} delay={index * 100}>
                {/* UPDATED: Added onClick handler and cursor-pointer class */}
                <div 
                  onClick={() => setSelectedCert(cert)}
                  className="cursor-pointer relative p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 hover:border-purple-500/30 transition-all duration-300 group overflow-hidden hover:bg-white/5"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors -mr-10 -mt-10"></div>
                  
                  <div className="w-12 h-12 rounded-xl bg-[#030014] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg group-hover:border-purple-500/50">
                    <div className="text-purple-400">
                      {cert.icon}
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">{cert.name}</h4>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-slate-400">{cert.level}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    <span className="text-slate-500">{cert.date}</span>
                  </div>
                  {/* Added explicit hint */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-purple-400 flex items-center gap-1">
                    View <ExternalLink size={12} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ADDED: Certificate Modal Overlay */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-[fadeIn_0.3s_ease-out]"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-[#0f0c29] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-[scaleIn_0.3s_ease-out]"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors z-10 backdrop-blur-md"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-2/3 bg-black flex items-center justify-center p-2">
                <img 
                  src={selectedCert.image} 
                  alt={`${selectedCert.name} Certificate`} 
                  className="max-w-full max-h-[70vh] object-contain rounded-lg" 
                />
              </div>
              <div className="w-full md:w-1/3 p-8 flex flex-col justify-center border-l border-white/5 bg-[#13112c]">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                  {selectedCert.icon}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{selectedCert.name}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Level</p>
                    <p className="text-slate-300">{selectedCert.level}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Date Issued</p>
                    <p className="text-slate-300">{selectedCert.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-32">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Let's work <span className="text-purple-400">together.</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8 max-w-md">
                  I'm currently available for freelance projects and open to new opportunities.
                </p>
                
                <div className="space-y-4">
                  <a href="mailto:lorrainetarcenio.11@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Email Me</div>
                      <div className="text-white font-medium group-hover:text-purple-300 transition-colors">lorrainetarcenio.11@gmail.com</div>
                    </div>
                  </a>

                  {/* Added Phone Number Section */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Phone</div>
                      <div className="text-white font-medium group-hover:text-purple-300 transition-colors">+63 9481762141</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-[#1877F2]/20 hover:border-[#1877F2]/50 transition-all group">
                      <Facebook size={20} className="text-slate-400 group-hover:text-[#1877F2] transition-colors" />
                      <span className="text-slate-300 group-hover:text-white font-medium">Facebook</span>
                    </a>
                    <a href="https://www.upwork.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-[#14a800]/20 hover:border-[#14a800]/50 transition-all group">
                      <UpworkIcon className="w-5 h-5 text-slate-400 group-hover:text-[#14a800] transition-colors" />
                      <span className="text-slate-300 group-hover:text-white font-medium">Upwork</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#0f0c29]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative">
                {/* Decorative glow behind form */}
                <div className="absolute inset-0 bg-purple-500/5 rounded-3xl blur-xl -z-10"></div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Hidden field to prevent spam bots */}
                  <input type="text" name="_honey" style={{display: 'none'}} />
                  {/* Disable captcha for cleaner UX */}
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-[#030014] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all hover:border-white/20"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-[#030014] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all hover:border-white/20"
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Message</label>
                    <textarea 
                      name="message"
                      rows="4" 
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-[#030014] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all resize-none hover:border-white/20"
                      required
                    ></textarea>
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className={`w-full font-bold py-4 rounded-lg transition-all transform flex justify-center items-center gap-2 
                      ${isSubmitted 
                        ? 'bg-green-600 text-white cursor-default' 
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white hover:scale-[1.02] shadow-lg shadow-purple-900/20 active:scale-95'
                      } ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                  >
                    {isSubmitting ? (
                      <>Sending... <Loader2 className="animate-spin" size={18}/></>
                    ) : isSubmitted ? (
                      <>Message Sent! <CheckCircle size={18} /></>
                    ) : (
                      <>Send Message <Send size={18} /></>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Lorraine P. Tarcenio. All rights reserved.</p>
      </footer>

      {/* Back to Top Button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-purple-600 text-white shadow-lg shadow-purple-900/40 transition-all duration-300 hover:bg-purple-500 hover:-translate-y-1 z-40 ${showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ArrowUp size={24} />
      </button>

    </div>
  );
};

export default Portfolio;
