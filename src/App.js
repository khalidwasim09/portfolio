import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: "traderx",
    title: "TraderX",
    badge: "Capstone Project",
    badgeColor: "#f59e0b",
    tech: ["React", "FastAPI", "Python", "PostgreSQL", "OpenCV", "AWS", "WebSocket"],
    role: "Full-Stack Developer",
    type: "Capstone",
    status: "In Progress",
    summary:
      "TraderX is an AI-powered trading analytics platform targeting the $26B retail trading software market. It automates technical analysis workflows using computer vision and machine learning — reducing chart pattern identification from minutes to milliseconds.",
    vision:
      "To create an accessible, data-driven trading platform where retail investors can make informed decisions using institutional-grade technical analysis tools without financial exposure.",
    highlights: [
      "Computer vision pipeline (OpenCV + CNN) for automatic chart pattern detection",
      "Configurable backtesting engine with Sharpe ratio, max drawdown, and win rate reporting",
      "Auto support & resistance detection using local extrema clustering",
      "React frontend with live candlestick charts, RSI/MACD/Bollinger Band overlays",
      "Real-time WebSocket data feed deployed on AWS EC2",
    ],
    github: "https://github.com/khalidwasim09/TraderX",
    icon: "📈",
  },
  {
    id: "microservices",
    title: "Microservices Platform",
    badge: "Course Assignment",
    badgeColor: "#6366f1",
    tech: ["Spring Boot", "Docker", "Kafka", "PostgreSQL", "API Gateway", "Eureka"],
    role: "Backend Developer",
    type: "Academic",
    status: "Completed",
    summary:
      "A distributed microservices architecture built with Spring Boot for COMP3095. The system demonstrates enterprise-grade service decomposition using Docker containers, inter-service communication via Kafka, and service discovery through Eureka.",
    vision:
      "To demonstrate modern cloud-native architecture patterns, showing how large applications can be broken into independently deployable, scalable services.",
    highlights: [
      "Multiple independently deployed Spring Boot services",
      "Apache Kafka for asynchronous event-driven communication",
      "Netflix Eureka for service discovery and registration",
      "API Gateway routing with load balancing",
      "Containerized with Docker Compose for easy orchestration",
    ],
    github: "https://gitlab.com/khalidwasim09/khalidwasim09-comp3095-assignment",
    icon: "⚙️",
  },
  {
    id: "orion",
    title: "Orion Dating App",
    badge: "Student Project",
    badgeColor: "#ec4899",
    tech: ["React Native", "Node.js", "MongoDB", "Firebase", "WebSocket"],
    role: "Full-Stack Developer",
    type: "Student Platform",
    status: "Launched",
    summary:
      "Orion is a student-exclusive dating app designed to connect verified college students in a safe and trusted environment. The platform grew to over 200 members and ran a special Valentine's Day matchmaking event.",
    vision:
      "To build a safe, verified community where students can form meaningful connections on campus — removing the anonymity risk common in mainstream dating apps.",
    highlights: [
      "200+ verified student members at launch",
      "Valentine's Day special matchup event with curated pairings",
      "Email verification restricted to student domains",
      "Real-time chat using WebSocket connections",
      "Match algorithm based on interests and compatibility scoring",
    ],
    github: "https://github.com/khalidwasim09/dating_app",
    icon: "💫",
  },
  {
    id: "devconnect",
    title: "DevConnect",
    badge: "Academic Project",
    badgeColor: "#06b6d4",
    tech: ["Node.js", "React", "Socket.io", "MongoDB", "Docker", "AWS", "JWT"],
    role: "Full-Stack Developer",
    type: "Academic",
    status: "Completed",
    summary:
      "DevConnect is a real-time developer collaboration platform supporting concurrent multi-user sessions with live code sharing, project workspace management, and team communication — targeting the $14B developer tools market.",
    vision:
      "To reduce friction in remote developer collaboration by providing a single workspace where teams can code, communicate, and ship together in real time.",
    highlights: [
      "WebSocket-powered live code sharing with multi-user concurrency",
      "JWT authentication with role-based access control for workspace isolation",
      "Docker containerization with GitHub Actions CI/CD pipeline to AWS",
      "Project workspace management with team communication tools",
      "Multi-tenant architecture supporting isolated team environments",
    ],
    github: "https://github.com/khalidwasim09",
    icon: "🔗",
  },
  {
    id: "taurus",
    title: "Taurus",
    badge: "In Development",
    badgeColor: "#10b981",
    tech: ["WebRTC", "Socket.io", "React", "Node.js", "Redis"],
    role: "Full-Stack Developer",
    type: "Student Platform",
    status: "In Progress",
    summary:
      "Taurus is a student-only anonymous video chat platform — like Omegle but built exclusively for verified college students. Currently in active development, Taurus aims to provide spontaneous, safe peer-to-peer connections.",
    vision:
      "To reimagine random peer connection in a safer, student-verified space — bringing the spontaneity of discovery-based socializing to campus communities.",
    highlights: [
      "WebRTC peer-to-peer video/audio streaming",
      "Student verification gate to restrict access",
      "Interest-based matching to pair compatible users",
      "Anonymous by default with opt-in profile visibility",
      "Real-time signaling server with Socket.io and Redis",
    ],
    github: "#",
    icon: "🎯",
  },
];

const NAV_ITEMS = ["About", "Projects", "Resume", "Cover Letter", "Skills", "Education", "Contact"];

const SKILLS = {
  "Languages": ["Java", "JavaScript", "TypeScript", "Python", "SQL", "Kotlin"],
  "Frontend": ["React", "React Native", "HTML/CSS", "Tailwind CSS", "Streamlit"],
  "Backend": ["Node.js", "Spring Boot", "Express.js", "FastAPI", "REST APIs"],
  "Databases": ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase", "Supabase"],
  "DevOps & Tools": ["Docker", "AWS", "Azure", "Git", "GitHub Actions", "CI/CD", "Kafka", "WebRTC"],
  "Data & ML": ["pandas", "NumPy", "scikit-learn", "XGBoost", "OpenCV", "Keras"],
};

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [activeTab, setActiveTab] = useState("experience");
  const cardRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, entry.target.dataset.id]));
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(cardRefs.current).forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #080b12; --bg2: #0d1220; --bg3: #121828;
      --line: rgba(255,255,255,0.07);
      --accent: #e8c547; --accent2: #4f8ef7; --accent3: #a78bfa;
      --text: #e8eaf0; --muted: #7a8399;
      --card: #0e1523; --card-border: rgba(255,255,255,0.08); --radius: 12px;
    }
    html { scroll-behavior: smooth; }
    body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 16px; line-height: 1.65; overflow-x: hidden; }

    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 clamp(20px, 5vw, 80px); height: 64px;
      transition: background 0.3s, border-bottom 0.3s;
    }
    nav.scrolled { background: rgba(8,11,18,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--line); }
    .nav-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.25rem; color: var(--accent); cursor: pointer; letter-spacing: -0.02em; }
    .nav-links { display: flex; gap: 24px; list-style: none; }
    .nav-links button { background: none; border: none; cursor: pointer; font-family: 'DM Mono', monospace; font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); transition: color 0.2s; padding: 4px 0; }
    .nav-links button:hover { color: var(--text); }

    #about { min-height: 100vh; display: flex; align-items: center; padding: clamp(80px, 10vh, 120px) clamp(20px, 8vw, 120px) 80px; position: relative; overflow: hidden; }
    .hero-grid { position: absolute; inset: 0; opacity: 0.04; background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px); background-size: 60px 60px; }
    .hero-glow { position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(232,197,71,0.08) 0%, transparent 70%); top: -100px; right: -100px; pointer-events: none; }
    .hero-glow2 { position: absolute; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(79,142,247,0.06) 0%, transparent 70%); bottom: 0; left: 0; pointer-events: none; }
    .hero-content { position: relative; max-width: 900px; }
    .hero-tag { display: inline-flex; align-items: center; gap: 8px; font-family: 'DM Mono', monospace; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); border: 1px solid rgba(232,197,71,0.25); padding: 5px 14px; border-radius: 100px; margin-bottom: 28px; animation: fadeUp 0.6s ease both; }
    .hero-name { font-family: 'Syne', sans-serif; font-size: clamp(3rem, 8vw, 6.5rem); font-weight: 800; line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 24px; animation: fadeUp 0.6s 0.1s ease both; }
    .hero-name span { color: var(--accent); }
    .hero-desc { font-size: clamp(1rem, 2vw, 1.2rem); color: var(--muted); max-width: 600px; line-height: 1.7; margin-bottom: 40px; animation: fadeUp 0.6s 0.2s ease both; }
    .hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; animation: fadeUp 0.6s 0.3s ease both; }
    .btn-primary { background: var(--accent); color: #0a0a0a; font-family: 'DM Mono', monospace; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.05em; border: none; padding: 12px 28px; border-radius: 8px; cursor: pointer; transition: opacity 0.2s, transform 0.15s; }
    .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
    .btn-outline { background: transparent; color: var(--text); font-family: 'DM Mono', monospace; font-size: 0.8rem; letter-spacing: 0.05em; border: 1px solid var(--card-border); padding: 12px 28px; border-radius: 8px; cursor: pointer; transition: border-color 0.2s, transform 0.15s; }
    .btn-outline:hover { border-color: rgba(255,255,255,0.3); transform: translateY(-1px); }
    .hero-stats { display: flex; gap: 48px; margin-top: 64px; animation: fadeUp 0.6s 0.4s ease both; }
    .hero-stat-num { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; color: var(--accent); line-height: 1; }
    .hero-stat-label { font-family: 'DM Mono', monospace; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-top: 4px; }

    section:not(#about) { padding: clamp(60px, 8vw, 100px) clamp(20px, 8vw, 120px); }
    .section-label { font-family: 'DM Mono', monospace; font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
    .section-title { font-family: 'Syne', sans-serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 48px; }
    .section-divider { width: 100%; height: 1px; background: var(--line); margin-bottom: 60px; }

    #projects { background: var(--bg2); }
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
    .project-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 28px; cursor: pointer; transition: border-color 0.25s, transform 0.2s, box-shadow 0.25s; opacity: 0; transform: translateY(24px); position: relative; overflow: hidden; }
    .project-card.visible { animation: cardIn 0.5s ease forwards; }
    .project-card:hover { border-color: rgba(232,197,71,0.3); transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.4); }
    .project-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--accent), var(--accent2)); opacity: 0; transition: opacity 0.25s; }
    .project-card:hover::before { opacity: 1; }
    .project-icon { font-size: 2rem; margin-bottom: 16px; display: block; }
    .project-badge { display: inline-block; font-family: 'DM Mono', monospace; font-size: 0.68rem; letter-spacing: 0.07em; text-transform: uppercase; padding: 3px 10px; border-radius: 100px; margin-bottom: 12px; font-weight: 500; }
    .project-title { font-family: 'Syne', sans-serif; font-size: 1.35rem; font-weight: 700; margin-bottom: 10px; }
    .project-summary { color: var(--muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 20px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    .project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
    .project-tag { font-family: 'DM Mono', monospace; font-size: 0.68rem; color: var(--muted); border: 1px solid var(--line); padding: 3px 8px; border-radius: 4px; }
    .project-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 16px; border-top: 1px solid var(--line); }
    .project-status { font-family: 'DM Mono', monospace; font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }
    .project-link { font-family: 'DM Mono', monospace; font-size: 0.72rem; color: var(--accent); text-decoration: none; display: flex; align-items: center; gap: 4px; transition: gap 0.2s; }
    .project-link:hover { gap: 8px; }

    .modal-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.2s ease; }
    .modal { background: var(--bg3); border: 1px solid var(--card-border); border-radius: 16px; padding: clamp(24px, 4vw, 48px); max-width: 680px; width: 100%; max-height: 88vh; overflow-y: auto; animation: slideUp 0.3s ease; position: relative; }
    .modal::-webkit-scrollbar { width: 4px; }
    .modal::-webkit-scrollbar-thumb { background: var(--line); border-radius: 4px; }
    .modal-close { position: absolute; top: 20px; right: 20px; background: var(--card); border: 1px solid var(--card-border); color: var(--muted); border-radius: 8px; width: 32px; height: 32px; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: color 0.2s; }
    .modal-close:hover { color: var(--text); }
    .modal-icon { font-size: 2.5rem; margin-bottom: 12px; display: block; }
    .modal-title { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; margin-bottom: 8px; }
    .modal-role { color: var(--muted); font-size: 0.9rem; margin-bottom: 28px; }
    .modal-section { margin-bottom: 24px; }
    .modal-section-title { font-family: 'DM Mono', monospace; font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }
    .modal-text { color: var(--muted); line-height: 1.7; font-size: 0.95rem; }
    .modal-list { list-style: none; }
    .modal-list li { color: var(--muted); font-size: 0.92rem; line-height: 1.6; padding: 6px 0; border-bottom: 1px solid var(--line); display: flex; gap: 10px; }
    .modal-list li:last-child { border-bottom: none; }
    .modal-list li::before { content: '▹'; color: var(--accent); flex-shrink: 0; }
    .modal-tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .modal-tag { font-family: 'DM Mono', monospace; font-size: 0.72rem; color: var(--accent2); border: 1px solid rgba(79,142,247,0.25); padding: 4px 10px; border-radius: 6px; }
    .modal-cta { margin-top: 28px; padding-top: 24px; border-top: 1px solid var(--line); display: flex; gap: 12px; }

    /* RESUME */
    #resume { background: var(--bg); }
    .resume-tabs { display: flex; gap: 8px; margin-bottom: 36px; flex-wrap: wrap; }
    .resume-tab { font-family: 'DM Mono', monospace; font-size: 0.75rem; letter-spacing: 0.07em; text-transform: uppercase; padding: 8px 20px; border-radius: 8px; border: 1px solid var(--card-border); background: transparent; color: var(--muted); cursor: pointer; transition: all 0.2s; }
    .resume-tab.active { background: var(--accent); color: #0a0a0a; border-color: var(--accent); }
    .resume-tab:hover:not(.active) { border-color: rgba(255,255,255,0.2); color: var(--text); }
    .resume-block { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 28px; margin-bottom: 16px; position: relative; }
    .resume-block::before { content: ''; position: absolute; top: 0; left: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, var(--accent), var(--accent2)); border-radius: 3px 0 0 3px; }
    .resume-block-title { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 700; margin-bottom: 4px; }
    .resume-block-sub { color: var(--accent); font-family: 'DM Mono', monospace; font-size: 0.78rem; letter-spacing: 0.04em; margin-bottom: 4px; }
    .resume-block-date { color: var(--muted); font-family: 'DM Mono', monospace; font-size: 0.72rem; margin-bottom: 14px; }
    .resume-block-list { list-style: none; }
    .resume-block-list li { color: var(--muted); font-size: 0.9rem; line-height: 1.65; padding: 4px 0; display: flex; gap: 10px; }
    .resume-block-list li::before { content: '▹'; color: var(--accent); flex-shrink: 0; margin-top: 2px; }
    .skills-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .skills-row span { font-family: 'DM Mono', monospace; font-size: 0.75rem; color: var(--text); border: 1px solid var(--card-border); background: var(--bg2); padding: 4px 12px; border-radius: 6px; }

    /* COVER LETTER */
    #coverletter { background: var(--bg2); }
    .letter-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--radius); padding: clamp(28px, 5vw, 56px); max-width: 760px; line-height: 1.8; }
    .letter-header { margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid var(--line); }
    .letter-name { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; margin-bottom: 4px; }
    .letter-contact { font-family: 'DM Mono', monospace; font-size: 0.75rem; color: var(--muted); }
    .letter-date { color: var(--muted); font-size: 0.9rem; margin-bottom: 24px; font-family: 'DM Mono', monospace; font-size: 0.8rem; }
    .letter-body p { color: var(--muted); font-size: 0.95rem; line-height: 1.85; margin-bottom: 18px; }
    .letter-body p span { color: var(--text); }
    .letter-sign { margin-top: 28px; color: var(--muted); font-size: 0.95rem; }
    .letter-sign strong { color: var(--text); display: block; margin-top: 16px; font-family: 'Syne', sans-serif; font-size: 1rem; }

    /* SKILLS */
    #skills { background: var(--bg); }
    .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
    .skill-group-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 24px; }
    .skill-group-title { font-family: 'DM Mono', monospace; font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; }
    .skill-chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill-chip { font-family: 'DM Mono', monospace; font-size: 0.78rem; color: var(--text); border: 1px solid var(--card-border); background: var(--bg2); padding: 6px 14px; border-radius: 8px; transition: border-color 0.2s, color 0.2s; }
    .skill-chip:hover { border-color: rgba(232,197,71,0.4); color: var(--accent); }

    /* EDUCATION */
    #education { background: var(--bg2); }
    .edu-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 32px; max-width: 700px; position: relative; overflow: hidden; }
    .edu-card::after { content: ''; position: absolute; top: 0; left: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, var(--accent), var(--accent2)); }
    .edu-school { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 700; margin-bottom: 6px; }
    .edu-degree { color: var(--muted); font-size: 1rem; margin-bottom: 4px; }
    .edu-meta { font-family: 'DM Mono', monospace; font-size: 0.75rem; color: var(--accent); text-transform: uppercase; letter-spacing: 0.07em; }
    .edu-courses { margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--line); }
    .edu-courses-title { font-family: 'DM Mono', monospace; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
    .edu-course-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .edu-course { font-size: 0.82rem; color: var(--muted); border: 1px solid var(--line); padding: 4px 12px; border-radius: 6px; }

    /* LEADERSHIP */
    .leadership-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-top: 40px; }
    .leadership-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 22px; transition: border-color 0.2s; }
    .leadership-card:hover { border-color: rgba(232,197,71,0.25); }
    .leadership-icon { font-size: 1.5rem; margin-bottom: 10px; }
    .leadership-title { font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700; margin-bottom: 4px; }
    .leadership-org { font-family: 'DM Mono', monospace; font-size: 0.72rem; color: var(--accent); margin-bottom: 6px; }
    .leadership-desc { color: var(--muted); font-size: 0.85rem; line-height: 1.6; }

    /* CONTACT */
    #contact { background: var(--bg); text-align: center; }
    .contact-inner { max-width: 600px; margin: 0 auto; }
    .contact-heading { font-family: 'Syne', sans-serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 20px; }
    .contact-heading span { color: var(--accent); }
    .contact-sub { color: var(--muted); font-size: 1rem; line-height: 1.7; margin-bottom: 36px; }
    .contact-links { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
    .contact-link { display: flex; align-items: center; gap: 8px; background: var(--card); border: 1px solid var(--card-border); color: var(--text); text-decoration: none; font-family: 'DM Mono', monospace; font-size: 0.8rem; padding: 12px 24px; border-radius: 10px; transition: border-color 0.2s, color 0.2s, transform 0.15s; }
    .contact-link:hover { border-color: rgba(232,197,71,0.4); color: var(--accent); transform: translateY(-2px); }

    footer { padding: 24px clamp(20px, 8vw, 120px); border-top: 1px solid var(--line); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    .footer-copy { font-family: 'DM Mono', monospace; font-size: 0.72rem; color: var(--muted); }

    @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes cardIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

    @media (max-width: 640px) {
      .nav-links { display: none; }
      .hero-stats { gap: 28px; }
      .projects-grid { grid-template-columns: 1fr; }
      .skills-grid { grid-template-columns: 1fr; }
      .leadership-grid { grid-template-columns: 1fr; }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo" onClick={() => scrollTo("about")}>KW</div>
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <button onClick={() => scrollTo(item.toLowerCase().replace(" ", ""))}>{item}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section id="about">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-content">
          <div className="hero-tag">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            Available for opportunities
          </div>
          <h1 className="hero-name">Khalid<br /><span>Wasim</span></h1>
          <p className="hero-desc">
            Full-Stack Software Developer and George Brown College graduate specializing in scalable web platforms,
            distributed systems, and AI-powered applications. I build real products that reach real users —
            from a trading analytics engine to a student dating app with 200+ members.
            Currently leading a 200-student GTA hackathon as Head of Strategic Partnerships and serving as
            President of the GBC Trading Club.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => scrollTo("projects")}>View Projects</button>
            <button className="btn-outline" onClick={() => scrollTo("resume")}>View Resume</button>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-num">5</div>
              <div className="hero-stat-label">Projects Built</div>
            </div>
            <div>
              <div className="hero-stat-num">200+</div>
              <div className="hero-stat-label">App Users</div>
            </div>
            <div>
              <div className="hero-stat-num">4+</div>
              <div className="hero-stat-label">Leadership Roles</div>
            </div>
          </div>
          <div style={{ marginTop: 64, maxWidth: 640, padding: "28px 32px", background: "var(--card)", border: "1px solid var(--card-border)", borderRadius: "var(--radius)", borderLeft: "3px solid var(--accent)" }}>
            <div className="section-label" style={{ marginBottom: 10 }}>Career Philosophy</div>
            <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: "0.95rem" }}>
              I believe software is most powerful when it solves real problems for real people.
              My motivation is not just to write working code — it's to build systems that connect
              communities, reduce barriers, and create genuine value. From simulating stock markets
              to connecting students, every project I take on is driven by the question:{" "}
              <em style={{ color: "var(--text)" }}>how does this make someone's life meaningfully better?</em>
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: "0.95rem", marginTop: 12 }}>
              Looking ahead, I aspire to work at the intersection of product and engineering —
              where technical decisions are inseparable from user empathy. I want to build things
              that last, lead teams that grow, and architect systems that scale gracefully under pressure.
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-label">Work</div>
        <h2 className="section-title">Projects</h2>
        <div className="section-divider" />
        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              className={`project-card ${visibleCards.has(project.id) ? "visible" : ""}`}
              data-id={project.id}
              ref={(el) => (cardRefs.current[project.id] = el)}
              style={{ animationDelay: `${i * 0.08}s` }}
              onClick={() => setSelectedProject(project)}
            >
              <span className="project-icon">{project.icon}</span>
              <span className="project-badge" style={{ background: `${project.badgeColor}18`, color: project.badgeColor, border: `1px solid ${project.badgeColor}30` }}>
                {project.badge}
              </span>
              <div className="project-title">{project.title}</div>
              <p className="project-summary">{project.summary}</p>
              <div className="project-tags">
                {project.tech.slice(0, 4).map((t) => <span key={t} className="project-tag">{t}</span>)}
                {project.tech.length > 4 && <span className="project-tag">+{project.tech.length - 4}</span>}
              </div>
              <div className="project-footer">
                <span className="project-status">{project.status}</span>
                <span className="project-link">View Details →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESUME */}
      <section id="resume">
        <div className="section-label">Career</div>
        <h2 className="section-title">Resume</h2>
        <div className="section-divider" />

        <div className="resume-tabs">
          {["experience", "projects", "leadership", "skills"].map((tab) => (
            <button key={tab} className={`resume-tab ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "experience" && (
          <div>
            <div className="resume-block">
              <div className="resume-block-title">George Brown College</div>
              <div className="resume-block-sub">Ontario College Advanced Diploma — Computer Programming & Analysis</div>
              <div className="resume-block-date">Toronto, ON · 2023 – Present</div>
              <ul className="resume-block-list">
                <li>Relevant coursework: Software Engineering, Database Systems, Cloud Computing, Machine Learning, Mobile Development</li>
                <li>Maintained strong academic standing while leading multiple student organizations simultaneously</li>
                <li>Completed capstone project (TraderX) targeting real-world market problems with AI/ML integration</li>
              </ul>
            </div>
            <p style={{ color: "var(--muted)", fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", marginTop: 16 }}>
              Currently seeking full-time Junior Software Developer opportunities upon graduation.
            </p>
          </div>
        )}

        {activeTab === "projects" && (
          <div>
            {[
              { title: "TraderX — AI Trading Analytics Platform", tech: "Python · FastAPI · React · OpenCV · AWS", date: "2025 – Present", points: ["Built computer vision pipeline for automatic chart pattern detection (head & shoulders, double tops, flags)", "Engineered backtesting engine with Sharpe ratio, max drawdown, and win rate reporting", "Deployed on AWS EC2 with real-time WebSocket data feed and live candlestick charts"] },
              { title: "Microservices Platform", tech: "Spring Boot · Docker · Kafka · Eureka", date: "2024", points: ["Designed distributed microservices architecture with independent deployments", "Implemented Apache Kafka for async event-driven communication between services", "Containerized full stack with Docker Compose for local and cloud orchestration"] },
              { title: "Orion Dating App", tech: "React Native · Node.js · MongoDB · Firebase", date: "2024", points: ["Launched student-exclusive dating platform with 200+ verified members", "Ran Valentine's Day matchmaking event with curated compatibility pairings", "Implemented student email verification and real-time WebSocket chat"] },
              { title: "DevConnect", tech: "Node.js · React · Socket.io · MongoDB · Docker", date: "2024", points: ["Built real-time developer collaboration platform with live code sharing", "JWT authentication with role-based access control for multi-tenant workspaces", "Automated CI/CD pipeline with GitHub Actions to AWS"] },
            ].map((p) => (
              <div key={p.title} className="resume-block">
                <div className="resume-block-title">{p.title}</div>
                <div className="resume-block-sub">{p.tech}</div>
                <div className="resume-block-date">{p.date}</div>
                <ul className="resume-block-list">
                  {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === "leadership" && (
          <div>
            {[
              { title: "Hackathon Organizer — Strategic Partnerships Lead & Technical Advisor", org: "George Brown College", date: "2025 – Present", points: ["Leading a 200-student GTA-wide hackathon as Head of Strategic Partnerships", "Securing sponsorships, managing client relationships, and driving commercial strategy", "Serving as Technical Advisor to 20+ competing teams across all disciplines"] },
              { title: "President", org: "GBC Trading Club", date: "2024 – Present", points: ["Running weekly workshops on quantitative trading and market analysis", "Growing club membership and facilitating industry speaker sessions"] },
              { title: "AI Event Organizer", org: "GBC School of Computer Technology", date: "Nov 2025", points: ["Organized AI-focused event featuring Microsoft guest speakers", "Coordinated logistics, speakers, and student engagement for the event"] },
              { title: "National Cricket Athlete", org: "Saudi Arabia National Team", date: "2019 – 2023", points: ["Competed at ICC World Cup & Asia Cup Qualifiers representing Saudi Arabia", "Developed discipline, teamwork, and high-performance mindset at national level"] },
              { title: "Executive Member", org: "GBC Esports Club & Muslim Student Association", date: "2024 – Present", points: ["Active executive member contributing to event planning and community engagement"] },
              { title: "Dodgeball Team Captain", org: "George Brown College", date: "2024 – 2025", points: ["Led team strategy and morale as captain of the college dodgeball team"] },
            ].map((l) => (
              <div key={l.title} className="resume-block">
                <div className="resume-block-title">{l.title}</div>
                <div className="resume-block-sub">{l.org}</div>
                <div className="resume-block-date">{l.date}</div>
                <ul className="resume-block-list">
                  {l.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === "skills" && (
          <div>
            {[
              { label: "Programming & Data", skills: "Python · SQL · JavaScript · TypeScript · Java · pandas · NumPy · scikit-learn · Keras · OpenCV" },
              { label: "Web & APIs", skills: "React · React Native · Spring Boot · FastAPI · Node.js · Express.js · REST APIs · WebSockets · Socket.io" },
              { label: "Databases & Cloud", skills: "PostgreSQL · MongoDB · Supabase · Firebase · AWS · Azure · Docker · GitHub Actions · CI/CD · Redis" },
            ].map((s) => (
              <div key={s.label} className="resume-block">
                <div className="resume-block-sub" style={{ marginBottom: 12 }}>{s.label}</div>
                <div className="skills-row">
                  {s.skills.split(" · ").map((sk) => <span key={sk}>{sk}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* COVER LETTER */}
      <section id="coverletter">
        <div className="section-label">Application</div>
        <h2 className="section-title">Cover Letter Template</h2>
        <div className="section-divider" />
        <div className="letter-card">
          <div className="letter-header">
            <div className="letter-name">Khalid Wasim Mushir</div>
            <div className="letter-contact">437-263-7784 · khalidwasimofficial@gmail.com · Toronto, ON · github.com/khalidwasim09</div>
          </div>
          <div className="letter-date">March 2025</div>
          <div className="letter-body">
            <p>Dear Hiring Manager,</p>
            <p>
              I am writing to express my strong interest in the <span>Junior Software Developer</span> position at{" "}
              <span>[Company Name]</span>. As a Computer Programming & Analysis student at George Brown College
              graduating in 2025, I have built a hands-on portfolio of full-stack applications, distributed systems,
              and AI-powered platforms — and I am eager to bring that practical experience to a professional engineering team.
            </p>
            <p>
              My capstone project, <span>TraderX</span>, is an AI-powered trading analytics platform where I engineered
              a computer vision pipeline using OpenCV and CNNs to automate chart pattern detection, built a configurable
              backtesting engine, and deployed a real-time React frontend on AWS EC2 with live WebSocket data feeds.
              This project gave me deep experience across the full stack — from Python/FastAPI backends to cloud
              infrastructure — while working under real product constraints.
            </p>
            <p>
              Beyond technical skills, I bring a demonstrated ability to lead and collaborate. I currently serve as
              Head of Strategic Partnerships for a 200-student GTA-wide hackathon, President of the GBC Trading Club,
              and Technical Advisor to over 20 student teams. These roles have sharpened my communication, stakeholder
              management, and ability to translate complex technical concepts to non-technical audiences.
            </p>
            <p>
              I am particularly drawn to <span>[Company Name]</span> because of <span>[specific reason — e.g., your
              focus on developer tooling / your engineering culture / your work in fintech]</span>. I am confident
              that my project experience, initiative in building real products, and commitment to continuous learning
              make me a strong candidate for this role.
            </p>
            <p>
              I would welcome the opportunity to discuss how I can contribute to your team. Thank you for your time
              and consideration.
            </p>
          </div>
          <div className="letter-sign">
            Sincerely,
            <strong>Khalid Wasim Mushir</strong>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-label">Expertise</div>
        <h2 className="section-title">Technical Skills</h2>
        <div className="section-divider" />
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([group, items]) => (
            <div key={group} className="skill-group-card">
              <div className="skill-group-title">{group}</div>
              <div className="skill-chips">
                {items.map((s) => <span key={s} className="skill-chip">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <div className="section-label">Academic</div>
        <h2 className="section-title">Education & Leadership</h2>
        <div className="section-divider" />
        <div className="edu-card">
          <div className="edu-school">George Brown College</div>
          <div className="edu-degree">Computer Programming & Analysis — Advanced Diploma</div>
          <div className="edu-meta" style={{ marginTop: 8 }}>Toronto, ON · 2023 – 2025</div>
          <div className="edu-courses">
            <div className="edu-courses-title">Relevant Coursework</div>
            <div className="edu-course-list">
              {["Data Structures & Algorithms", "Database Design", "Web Development", "Software Architecture", "Mobile Development", "Agile & Scrum", "Spring Boot / Java EE", "Machine Learning", "Cloud Computing", "Portfolio Development"].map(c => (
                <span key={c} className="edu-course">{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="leadership-grid">
          {[
            { icon: "🏆", title: "Hackathon Organizer", org: "Strategic Partnerships Lead & Technical Advisor · GBC", desc: "Leading a 200-student GTA-wide hackathon — securing sponsors, managing client relationships, and advising 20+ competing teams." },
            { icon: "📊", title: "President", org: "GBC Trading Club · 2024 – Present", desc: "Running weekly workshops on quantitative trading and market analysis for club members." },
            { icon: "🤖", title: "AI Event Organizer", org: "GBC School of Computer Technology · Nov 2025", desc: "Organized a college-wide AI event featuring Microsoft guest speakers." },
            { icon: "🏏", title: "National Cricket Athlete", org: "Saudi Arabia · ICC World Cup & Asia Cup Qualifiers · 2019–2023", desc: "Represented Saudi Arabia at international level, competing in ICC World Cup and Asia Cup qualifiers." },
            { icon: "🎮", title: "Executive Member", org: "GBC Esports Club & Muslim Student Association · 2024 – Present", desc: "Active executive contributing to event planning and student community engagement." },
            { icon: "🏐", title: "Dodgeball Team Captain", org: "George Brown College · 2024–2025", desc: "Led team strategy and morale as captain of the college dodgeball team." },
          ].map((l) => (
            <div key={l.title} className="leadership-card">
              <div className="leadership-icon">{l.icon}</div>
              <div className="leadership-title">{l.title}</div>
              <div className="leadership-org">{l.org}</div>
              <div className="leadership-desc">{l.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-inner">
          <div className="section-label" style={{ textAlign: "center" }}>Get in Touch</div>
          <h2 className="contact-heading">Let's <span>Connect</span></h2>
          <p className="contact-sub">
            Actively looking for full-time Junior Software Developer opportunities.
            Whether you have a question or just want to say hello — my inbox is always open.
          </p>
          <div className="contact-links">
            <a className="contact-link" href="mailto:khalidwasimofficial@gmail.com">✉ Email Me</a>
            <a className="contact-link" href="https://github.com/khalidwasim09" target="_blank" rel="noreferrer">⌥ GitHub</a>
            <a className="contact-link" href="https://linkedin.com/in/khalidwasim" target="_blank" rel="noreferrer">⬡ LinkedIn</a>
          </div>
        </div>
      </section>

      <footer>
        <span className="footer-copy">© 2025 Khalid Wasim Mushir. All rights reserved.</span>
        <span className="footer-copy">COMP3078 · George Brown College</span>
      </footer>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>✕</button>
            <span className="modal-icon">{selectedProject.icon}</span>
            <span className="project-badge" style={{ background: `${selectedProject.badgeColor}18`, color: selectedProject.badgeColor, border: `1px solid ${selectedProject.badgeColor}30`, marginBottom: 10, display: "inline-block" }}>
              {selectedProject.badge}
            </span>
            <div className="modal-title">{selectedProject.title}</div>
            <div className="modal-role">Role: {selectedProject.role}</div>
            <div className="modal-section">
              <div className="modal-section-title">Project Summary</div>
              <p className="modal-text">{selectedProject.summary}</p>
            </div>
            <div className="modal-section">
              <div className="modal-section-title">Project Vision</div>
              <p className="modal-text">{selectedProject.vision}</p>
            </div>
            <div className="modal-section">
              <div className="modal-section-title">Key Features</div>
              <ul className="modal-list">
                {selectedProject.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            </div>
            <div className="modal-section">
              <div className="modal-section-title">Tech Stack</div>
              <div className="modal-tags">
                {selectedProject.tech.map((t) => <span key={t} className="modal-tag">{t}</span>)}
              </div>
            </div>
            <div className="modal-cta">
              {selectedProject.github !== "#" && (
                <a className="btn-primary" href={selectedProject.github} target="_blank" rel="noreferrer" style={{ textDecoration: "none", display: "inline-block" }}>
                  View Repository →
                </a>
              )}
              <button className="btn-outline" onClick={() => setSelectedProject(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}