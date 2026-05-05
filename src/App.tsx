/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView, useMotionValue } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Send, 
  MessageSquare, 
  ArrowDown, 
  ArrowUp,
  Cpu, 
  Code, 
  Gamepad2, 
  Monitor, 
  Edit3, 
  MousePointer2,
  ExternalLink,
  Printer,
  BookOpen,
  Mic,
  Menu,
  X,
  Quote
} from 'lucide-react';
import { ParticleBackground } from './components/ParticleBackground';

// Types
interface TimelineItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
  image?: string;
  side: 'left' | 'right';
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

// TYT Logo Component - Geometric / Technical Aesthetic
const TytLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 60" className={className} fill="currentColor">
    {/* Geometric TYT Merged Logo - blocky and sharp */}
    {/* Left T */}
    <path d="M5 10 h32 v10 h-10 v35 h-12 v-35 h-10 z" />
    {/* Right T */}
    <path d="M95 10 h-32 v10 h10 v35 h12 v-35 h10 z" />
    {/* Middle Y - aggressive V-shape with stem */}
    <path d="M36 10 l14 20 l14 -20 h12 l-21 30 v15 h-10 v-15 l-21 -30 z" />
  </svg>
);

const Discord = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 127.14 96.36" className={className} fill="currentColor">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14h0C129.46,51.87,122.95,28.24,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5.12-12.72,11.44-12.72S54,46,53.87,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.12-12.72,11.44-12.72S96.14,46,96,53,90.89,65.69,84.69,65.69Z"/>
  </svg>
);

const timelineData: TimelineItem[] = [
  {
    id: 'digital-media',
    title: 'Content Creator & Editor',
    company: 'Digital Media Production',
    period: 'Ongoing',
    description: [
      'Produced high-quality video content for YouTube and social platforms.',
      'Live-streamed gaming content (Valorant) with professional OBS setup.',
      'Mastered advanced video editing and motion graphics workflows.'
    ],
    tags: ['Adobe Premiere Pro', 'Adobe Photoshop', 'Canva', 'OBS', 'Streaming'],
    side: 'right',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=60&w=1000'
  },
  {
    id: 'tytgear',
    title: 'Founder & Tech Designer',
    company: 'Tytgear.in',
    period: '2023 - Present',
    description: [
      'Founded a boutique brand for custom technical gear and room aesthetics.',
      'Providing high-quality custom gaming mousepads, premium posters, and tapestries.',
      'Developed a full-stack e-commerce platform for seamless workspace customization.',
      'Curating cinematic desktop setups for hardware enthusiasts.'
    ],
    tags: ['Founder', 'Product Design', 'Canva', 'E-commerce', 'Brand Design'],
    side: 'left',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=60&w=1000'
  },
  {
    id: 'mochi',
    title: 'Hardware Replica Creator',
    company: 'ESP32-C3 Mochi Project',
    period: '2023',
    description: [
      'Replicated the Mochi desktop companion using ESP32-C3 microcontroller.',
      'Implemented custom firmware for interactive animations and sensors.',
      'Designed 3D-printable enclosures for technical builds.'
    ],
    tags: ['C++', 'IoT', 'KiCad', 'ESP32', '3D Design'],
    side: 'right',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=60&w=1000'
  },
  {
    id: 'keyboards',
    title: 'Custom Mech & Macropad',
    company: 'Hardware Customization',
    period: '2024',
    description: [
      'Engineered custom mechanical keyboards with high-end specialized switches.',
      'Designed and programmed custom macropads using QMK/KMK firmware.',
      'Integrated OLED displays and rotary encoders for enhanced productivity macro control.'
    ],
    tags: ['QMK', 'KMK', 'ZMK', 'KiCad', 'Soldering'],
    side: 'left',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'eink',
    title: 'DIY Enthusiast',
    company: 'E-Ink Tracker Project',
    period: '2024',
    description: [
      'Developed a low-power E-Ink tracker for daily productivity metrics.',
      'Integrated with various APIs for real-time data sync.',
      'Customized mechanical keyboard switches for a unique tactile experience.'
    ],
    tags: ['IoT', 'Embedded Systems', 'API Integration', 'Custom Switches'],
    side: 'right',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=60&w=800'
  }
];

const testimonials: Testimonial[] = [
  {
    quote: "Chirag's talent as a caster during our community Valorant events was exceptional. He's since become an integral part of our management team, bringing that same technical precision to everything he does.",
    author: "Nikhil",
    role: "Owner, Pub of Homies Community",
    avatar: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "I ordered a fully customized mousepad and metal poster from tytgear.in. I got exactly what I wanted at a great price. The quality is exceptional and it's the perfect addition to my gaming setup.",
    author: "Abyss Maze",
    role: "Gamer",
    avatar: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "Chirag completely revamped my stream with custom OBS setups and precision plugins. My production value went from basic to polished overnight, which was a huge factor in my growth as a creator.",
    author: "Tanmay",
    role: "Content Creator",
    avatar: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=150"
  }
];

const skills = [
  'Java', 'Python', 'QMK Firmware', 'KMK Firmware', 'ZMK Firmware', 
  'Embedded C', 'React', 'Tailwind CSS', 'KiCad',
  'Adobe Photoshop', 'Adobe Premiere Pro', 'Canva',
  'Video Editing', 'Content Writing', 'Digital Marketing', 'IoT Prototyping'
];

const hobbies = [
  { 
    name: 'Gaming', 
    icon: <Gamepad2 className="w-6 h-6" />,
    description: 'Former BGMI e-sports player. Dominating as Reyna in Valorant, swinging with Spidey in Marvel Rivals or playing Gambit to heal my team, plus Minecraft and story-driven adventures.'
  },
  { 
    name: 'Live Streaming', 
    icon: <Monitor className="w-6 h-6" />,
    description: 'Engaging with a global community through real-time technical & gaming content.'
  },
  { 
    name: 'IoT DIY', 
    icon: <Cpu className="w-6 h-6" />,
    description: 'Developing custom automation solutions using ESP32 and specialized sensors.'
  },
  { 
    name: 'Karate', 
    icon: <p className="font-bold text-sm">🥋</p>,
    description: 'Training in discipline, focus, and technical precision through martial arts.'
  },
  { 
    name: 'Keyboard Creation', 
    icon: <Edit3 className="w-6 h-6" />,
    description: 'Engineering specialized typing experiences with custom PCBS and switches.'
  },
  { 
    name: '3D Printing', 
    icon: <Printer className="w-6 h-6" />,
    description: 'Translating digital designs into functional hardware prototypes and enclosures.'
  },
  { 
    name: 'Book Reading', 
    icon: <BookOpen className="w-6 h-6" />,
    description: 'Diving into sci-fi universes like Harry Potter alongside deep technical research and design theory.'
  },
  { 
    name: 'E-sports Casting', 
    icon: <Mic className="w-6 h-6" />,
    description: 'Professional play-by-play analysis for competitive gaming tournaments.'
  }
];

// Components
const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.onclick || 
        target.closest('a') || 
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', checkMobile);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Stage 1: Central Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2 : 1,
        }}
      />
      
      {/* Stage 2: Outer Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.8 : 0.5,
          borderWidth: isHovering ? '1px' : '1px',
        }}
        transition={{ 
          type: 'spring', 
          damping: 20, 
          stiffness: 150,
          scale: { duration: 0.3 }
        }}
      />
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 150) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
        setIsOpen(false);
      }
    });
    return () => unsubscribe();
  }, [scrollY]);

  const navItems = ['About me', 'Services', 'Works', 'Testimonials', 'Contacts'];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 md:py-4 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/5 transition-all duration-500">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 md:gap-4 cursor-pointer group"
        >
          <TytLogo className="w-6 h-6 md:w-8 md:h-8 text-accent group-hover:scale-110 transition-transform" />
        </button>

        {/* Centered Portfolio Text - Hidden on mobile to prevent overlap */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none h-full hidden md:flex items-center">
          <span className="text-xl lg:text-2xl font-display font-black tracking-[0.3em] lg:tracking-[0.6em] text-white uppercase leading-none opacity-80">Portfolio</span>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 p-2 text-white hover:text-accent transition-all duration-300 group z-50 relative"
          >
            <AnimatePresence mode="wait">
              {!isCollapsed ? (
                <motion.div
                  key="menu-text"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.3em] font-display">Menu</span>
                  <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-accent transition-all duration-300" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu-icon"
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                >
                  {isOpen ? <X className="w-6 h-6 text-accent" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, idx) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-black uppercase tracking-tighter hover:text-accent transition-colors"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
              >
                {item}
              </motion.a>
            ))}
            
            {/* Background Decorative Text */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden opacity-5 pointer-events-none select-none">
              <span className="text-[20vw] font-black uppercase leading-none">MENU</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-4xl md:text-6xl font-display font-bold mb-16 text-center uppercase tracking-tighter"
  >
    {children}
  </motion.h2>
);

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsVisible(latest > 400);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.5, x: -20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-[60] w-14 h-14 bg-black/80 backdrop-blur-md border border-accent/30 text-accent flex items-center justify-center rounded-sm shadow-[0_0_30px_rgba(255,215,0,0.1)] hover:border-accent hover:text-white hover:bg-accent/10 transition-all duration-300 group"
          title="BACK TO TOP"
        >
          <div className="absolute inset-0 border border-accent/10 m-1 group-hover:border-accent/40" />
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform relative z-10" />
          <div className="absolute -bottom-8 left-0 font-mono text-[8px] tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">TOP_LNK</div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const TimelineNode = ({ active }: { active: boolean }) => (
  <div className="absolute left-[20px] md:left-1/2 -ml-2 top-0 z-10 hidden sm:block">
    <motion.div
      animate={{
        scale: active ? 1.5 : 1,
        backgroundColor: active ? '#FFD700' : '#333'
      }}
      className="w-4 h-4 rounded-full border-2 border-black"
    />
  </div>
);

interface TimelineItemProps {
  item: TimelineItem;
  index: number;
}

const TimelineItemComponent: React.FC<TimelineItemProps> = ({ item, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });

  return (
    <div
      ref={ref}
      className={`relative mb-32 md:flex items-center w-full ${
        item.side === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      <TimelineNode active={isInView} />
      
      <div className="w-full md:w-1/2 px-8 pt-4 sm:pt-0">
        <motion.div
          initial={{ opacity: 0, x: item.side === 'left' ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className={`${item.side === 'left' ? 'md:text-right' : 'md:text-left'}`}
        >
          <div className={`flex items-center gap-4 mb-4 ${item.side === 'left' ? 'md:flex-row-reverse' : ''}`}>
             <span className="text-accent font-mono text-[10px] uppercase tracking-tight px-2 py-1 bg-accent/10 border border-accent/20 rounded">
                SEC_ID: {item.id}
             </span>
             <span className="text-space-gray font-mono text-[10px] uppercase tracking-widest">{item.period}</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-display font-bold mb-2 tracking-tighter leading-none">{item.title}</h3>
          <p className="text-white text-lg mb-6 font-medium opacity-80 uppercase tracking-widest">{item.company}</p>
          <div className={`flex flex-wrap gap-2 mb-8 ${item.side === 'left' ? 'md:justify-end' : 'md:justify-start'}`}>
            {item.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-sm border border-white/5 bg-white/[0.02] text-[11px] uppercase font-mono tracking-tighter text-space-gray">
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group relative"
        >
          {item.image && (
            <div className="relative group/frame">
              {/* Main Image Frame */}
              <div className="relative overflow-hidden rounded-sm aspect-video mb-8 bg-white/5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  loading="lazy"
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-in-out" 
                />
                
                {/* Logo Overlay for Tytgear */}
                {item.id === 'tytgear' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-10 transition-opacity duration-500">
                    <TytLogo className="w-1/2 h-1/2 text-white" />
                  </div>
                )}
                
                {/* Interface Overlay */}
                <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 m-2" />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                
                <div className="absolute top-4 right-4 flex gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                   <div className="font-mono text-[8px] text-accent tracking-widest uppercase">system_ready</div>
                </div>

                <div className="absolute bottom-4 left-4 font-mono text-[8px] text-white/20 uppercase tracking-widest">
                  id_{item.id}_ref_001
                </div>
              </div>

              {/* Floating Code/Technical Detail for Hardware/DIY/Startup */}
              {(item.id === 'keyboards' || item.id === 'eink' || item.id === 'tytgear') && (
                <div className="absolute -bottom-4 -right-4 w-1/2 p-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded font-mono text-[10px] text-accent/60 hidden md:block shadow-2xl z-20 group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex gap-1 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                  </div>
                  {item.id === 'keyboards' ? (
                    <code className="block">
                      #include "qmk.h"<br/>
                      #define KEY_MACRO_01<br/>
                      void matrix_scan() &#123;<br/>
                      &nbsp;&nbsp;process_enc(A1, B1);<br/>
                      &#125;
                    </code>
                  ) : item.id === 'tytgear' ? (
                    <code className="block text-accent/80">
                      // config/brand.ts<br/>
                      const TYT_GEAR = &#123;<br/>
                      &nbsp;&nbsp;niche: "Technical aesthetics",<br/>
                      &nbsp;&nbsp;products: ["Desk Mats", "Posters"],<br/>
                      &nbsp;&nbsp;vibe: "Cinematic workspace"<br/>
                      &#125;;
                    </code>
                  ) : (
                    <code className="block">
                      void setup() &#123;<br/>
                      &nbsp;&nbsp;esp_sleep_enable();<br/>
                      &nbsp;&nbsp;display.init();<br/>
                      &nbsp;&nbsp;sync_api(ENV_KEY);<br/>
                      &#125;
                    </code>
                  )}
                </div>
              )}
            </div>
          )}
          <ul className="space-y-4 text-space-gray text-base leading-relaxed font-light">
            {item.description.map((line, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-accent/40 font-mono text-xs mt-1">0{i+1}</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-black cursor-none">
      <CustomCursor />
      <ParticleBackground />
      <Navbar />
      <BackToTop />
      
      {/* Scroll Progress Indicator */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[60]" style={{ scaleX }} />

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-radial-gradient from-accent/5 to-transparent opacity-30" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "circOut" }}
          >
            <h1 className="sr-only">Chirag Baheti - Developer & Hardware Enthusiast</h1>
            <div aria-hidden="true" className="text-6xl md:text-[11vw] font-display font-bold tracking-tighter mb-4 leading-[0.8] opacity-100 flex flex-col items-center">
              <span className="text-white">CHIRAG</span>
              <span className="text-transparent font-outline hover:text-accent transition-colors duration-500 cursor-default" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>BAHETI</span>
            </div>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6, duration: 1 }}
          >
            <p className="text-space-gray text-[10px] md:text-sm uppercase tracking-[0.4em] font-medium opacity-80 mt-4">
              BCA STUDENT • DEVELOPER • HARDWARE ENTHUSIAST
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-4 group cursor-pointer"
          onClick={() => document.getElementById('about-me')?.scrollIntoView()}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-space-gray group-hover:text-accent transition-colors">[ SCROLL DOWN ]</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <MousePointer2 className="w-4 h-4 text-accent rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-6 overflow-hidden">
        {/* About Me Section */}
        <section id="about-me" className="py-32">
          <SectionTitle>About Me</SectionTitle>
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-space-gray leading-relaxed mb-8"
            >
              Currently pursuing a BCA at Amity University, I am a responsibility-driven developer eager for work experience. 
              I bridge the gap between software and hardware, crafting everything from clean web interfaces to custom embedded systems.
            </motion.p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="services" className="py-32 border-t border-white/5">
          <SectionTitle>Skills & Expertise</SectionTitle>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 font-medium tracking-tight cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </section>

        {/* Works / Experience Timeline */}
        <section id="works" className="py-32 border-t border-white/5 relative">
          <SectionTitle>Works & Projects</SectionTitle>
          <div className="relative">
            <div className="timeline-line" />
            {timelineData.map((item, index) => (
              <TimelineItemComponent key={item.id} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* Hobbies Section */}
        <section className="py-32 border-t border-white/5">
          <SectionTitle>Beyond The Code</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hobbies.map((hobby, index) => (
              <motion.div
                key={hobby.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative group h-48 sm:h-56 cursor-default"
              >
                {/* Background Card */}
                <div className="absolute inset-0 bg-white/[0.02] border border-white/10 rounded-2xl transition-all duration-500 group-hover:bg-accent/[0.03] group-hover:border-accent/40 group-hover:shadow-[0_0_50px_rgba(255,215,0,0.05)]" />
                
                {/* Initial State (Icon + Name) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 group-hover:blur-sm">
                  <div className="text-space-gray transition-colors mb-4 group-hover:text-accent">
                    {hobby.icon}
                  </div>
                  <span className="text-sm font-display font-medium tracking-widest text-space-gray uppercase text-center">{hobby.name}</span>
                </div>

                {/* Hover State (Description) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                  <div className="text-accent mb-4 scale-75">
                    {hobby.icon}
                  </div>
                  <p className="text-sm text-center text-white/80 font-light leading-relaxed mb-4">
                    {hobby.description}
                  </p>
                  <div className="w-8 h-[1px] bg-accent/40" />
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-accent/0 group-hover:border-accent/50 transition-colors duration-500" />
                </div>
                <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none overflow-hidden">
                  <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-accent/0 group-hover:border-accent/50 transition-colors duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TYT Gear Section */}
        <section id="tyt-gear" className="py-32 border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-32 -mt-32 opacity-[0.02] pointer-events-none">
            <TytLogo className="w-[500px] h-[500px]" />
          </div>
          
          <div className="flex flex-col items-center mb-20 text-center">
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="mb-6 p-4 bg-accent/5 border border-accent/10 rounded-xl"
            >
              <TytLogo className="w-12 h-12 text-accent" />
            </motion.div>
            <SectionTitle>TYT GEAR</SectionTitle>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-space-gray max-w-xl -mt-10 uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold"
            >
              Curated premium aesthetics for technical workspaces
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {[
              {
                title: 'High-quality custom mouse pad',
                desc: 'Specialized custom mouse pad to match your vibe and set up the way u want',
                img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=1000',
                id: '01'
              },
              {
                title: 'Premium Posters',
                desc: 'Cinematic, heavy-stock wall art focused on hardware architecture and cyber-tech aesthetics.',
                img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1000',
                id: '02'
              },
              {
                title: 'Technical Tapestries',
                desc: 'Seamless textile backgrounds and Large-scale visuals designed to enhance room depth and studio vibe.',
                img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000',
                id: '03'
              },
              {
                title: 'Hardware Accessories',
                desc: 'Specialized split keyboard kits, macropads, and boutique hardware to smart work and upgrade your setup',
                img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1000',
                id: '04'
              }
            ].map((cat, idx) => (
              <motion.a
                key={cat.title}
                href="https://tytgear.in"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: "circOut" }}
                className="group relative h-[350px] md:h-[450px] overflow-hidden rounded-sm border border-white/5 bg-white/[0.02] block cursor-pointer"
              >
                <img 
                  src={cat.img} 
                  alt={cat.title} 
                  className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 md:p-10 flex flex-col justify-end">
                  <div className="mb-4">
                    <span className="font-mono text-accent text-xs mb-2 block tracking-widest group-hover:translate-x-1 transition-transform duration-500">TYPE_{cat.id}</span>
                    <h3 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter mb-3">{cat.title}</h3>
                    <p className="text-space-gray text-sm md:text-base font-light max-w-sm line-clamp-2 md:line-clamp-none opacity-80 group-hover:opacity-100 transition-opacity">
                      {cat.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-accent/60 group-hover:text-accent transition-colors">
                    <div className="w-12 h-[1px] bg-white/10 group-hover:bg-accent transition-all duration-700" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em]">check tytgear.in</span>
                  </div>
                </div>

                {/* Technical Corner Accents */}
                <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-white/10 group-hover:border-accent/40 transition-colors" />
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  <TytLogo className="w-5 h-5 text-accent/40" />
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-32 border-t border-white/5 relative">
          <SectionTitle>Client Stories</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-sm bg-white/[0.02] border border-white/5 relative group hover:border-accent/30 transition-colors"
              >
                <Quote className="absolute top-6 right-8 w-8 h-8 text-white/5 group-hover:text-accent/20 transition-colors" />
                <p className="text-space-gray italic mb-8 relative z-10 leading-relaxed group-hover:text-white transition-colors">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all border border-white/10" />
                  <div>
                    <h4 className="font-display font-bold uppercase tracking-widest text-white text-sm">{testimonial.author}</h4>
                    <p className="text-accent text-[10px] font-mono tracking-tighter uppercase">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer / Contact */}
      <footer id="contacts" className="pt-32 pb-16 bg-black border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 relative">
            <motion.h2 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="text-7xl md:text-[12rem] font-display font-bold tracking-tighter leading-none mb-12 opacity-90"
            >
              LET'S CONNECT
            </motion.h2>

            <div className="flex justify-center mb-16 h-32 md:h-48">
              <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-accent/20 bg-accent/5"
                >
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                    <text className="text-[8px] uppercase tracking-[0.2em] fill-accent font-medium">
                      <textPath xlinkHref="#circlePath">
                        Let's talk about the project • Let's talk about the project •
                      </textPath>
                    </text>
                  </svg>
                </motion.div>
                <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full bg-accent flex items-center justify-center text-black shadow-[0_0_30px_rgba(255,215,0,0.2)] z-10">
                  <TytLogo className="w-10 h-10 md:w-16 h-16" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-24">
            {[
              { name: 'LinkedIn', icon: <Linkedin className="w-6 h-6" />, href: 'https://www.linkedin.com/in/chirag-baheti-892a3a242?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', color: 'group-hover:bg-[#0077b5]/20 group-hover:border-[#0077b5]/50 group-hover:shadow-[#0077b5]/20', iconColor: 'text-[#0077b5]' },
              { name: 'Instagram', icon: <Instagram className="w-6 h-6" />, href: 'https://www.instagram.com/chirag_baheti_?igsh=MXRhcnZsNmlidHpnbQ==', color: 'group-hover:bg-[#e4405f]/20 group-hover:border-[#e4405f]/50 group-hover:shadow-[#e4405f]/20', iconColor: 'text-[#e4405f]' },
              { name: 'YouTube', icon: <Youtube className="w-6 h-6" />, href: 'https://youtube.com/@terrestrial_yt?si=JaymFu8tpD_MXJzA', color: 'group-hover:bg-[#ff0000]/20 group-hover:border-[#ff0000]/50 group-hover:shadow-[#ff0000]/20', iconColor: 'text-[#ff0000]' },
              { name: 'Github', icon: <Github className="w-6 h-6" />, href: 'https://github.com/TerrestrialYT', color: 'group-hover:bg-white/10 group-hover:border-white/30 group-hover:shadow-white/10', iconColor: 'text-white' },
              { name: 'Discord', icon: <Discord className="w-6 h-6" />, href: 'https://discord.gg/9SYTjta8Bd', color: 'group-hover:bg-[#5865f2]/20 group-hover:border-[#5865f2]/50 group-hover:shadow-[#5865f2]/20', iconColor: 'text-[#5865f2]' }
            ].map((social, i) => (
              <motion.a 
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative flex flex-col items-center justify-center gap-4 p-8 border border-white/5 bg-white/[0.02] rounded-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${social.color}`}
              >
                <div className={`p-4 rounded-full bg-white/5 transition-colors duration-500 ${social.iconColor}`}>
                  {social.icon}
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-50 group-hover:opacity-100 group-hover:text-white transition-all">Connect on</span>
                  <span className="text-lg font-display font-black tracking-wider uppercase text-white">{social.name}</span>
                </div>
                
                {/* Brand Accent Line */}
                <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-lg opacity-50 ${social.iconColor.replace('text-', 'bg-')}`} />
                
                <ExternalLink className="absolute top-4 right-4 w-3 h-3 opacity-20 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-black/10 dark:border-white/10 text-space-gray text-xs uppercase tracking-widest font-mono">
            <div className="flex gap-12">
              <div>
                <p className="mb-1 opacity-50">Email</p>
                <a href="mailto:chiragbelda@gmail.com" className="hover:text-black dark:hover:text-white transition-colors">chiragbelda@gmail.com</a>
              </div>
              <div>
                <p className="mb-1 opacity-50">Location</p>
                <p>Kolkata / Paschim Medinipur, India</p>
              </div>
            </div>
            <p>© 2024 Chirag Baheti. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
