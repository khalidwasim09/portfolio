import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: "traderx",
    title: "TraderX",
    badge: "Capstone Project",
    badgeColor: "#f59e0b",
    tech: ["React", "Node.js", "PostgreSQL", "WebSocket", "REST API"],
    role: "Full-Stack Developer",
    type: "Capstone",
    status: "Completed",
    summary:
      "TraderX is a full-stack stock trading simulation platform built as my capstone project. It enables users to buy and sell stocks in real-time using live market data, manage a personal portfolio, and track performance over time.",
    vision:
      "To create an accessible, risk-free environment where users can learn investment strategies and simulate real-world trading without financial exposure.",
    highlights: [
      "Real-time stock data integration via WebSocket and market APIs",
      "User authentication with JWT and secure session management",
      "Portfolio tracking with profit/loss analytics and charts",
      "Order execution engine supporting market and limit orders",
      "Responsive dashboard with live ticker and watchlist",
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
      "Email verification restricted to student (.edu) domains",
      "Real-time chat using WebSocket connections",
      "Match algorithm based on interests and compatibility scoring",
    ],
    github: "https://github.com/khalidwasim09/dating_app",
    icon: "💫",
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

const NAV_ITEMS = ["About", "Projects", "Skills", "Education", "Contact"];

const SKILLS = {
  "Languages": ["Java", "JavaScript", "TypeScript", "Python", "SQL", "Kotlin"],
  "Frontend": ["React", "React Native", "HTML/CSS", "Tailwind CSS"],
  "Backend": ["Node.js", "Spring Boot", "Express.js", "REST APIs"],
  "Databases": ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
  "DevOps & Tools": ["Docker", "Git", "GitHub", "GitLab", "Kafka", "WebRTC", "Firebase"],
};

export default function Portfolio() {
  // const [activeSection, setActiveSection] = useState("about");
  const [selectedProject, setSelectedProject] = useState(null);
  // const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
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
    // setNavOpen(false);
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #080b12;
      --bg2: #0d1220;
      --bg3: #121828;
      --line: rgba(255,255,255,0.07);
      --accent: #e8c547;
      --accent2: #4f8ef7;
      --accent3: #a78bfa;
      --text: #e8eaf0;
      --muted: #7a8399;
      --card: #0e1523;
      --card-border: rgba(255,255,255,0.08);
      --radius: 12px;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      font-size: 16px;
      line-height: 1.65;
      overflow-x: hidden;
    }

    /* ── NAV ── */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 clamp(20px, 5vw, 80px);
      height: 64px;
      transition: background 0.3s, border-bottom 0.3s;
    }
    nav.scrolled {
      background: rgba(8,11,18,0.92);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--line);
    }
    .nav-logo {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.25rem;
      color: var(--accent);
      cursor: pointer;
      letter-spacing: -0.02em;
    }
    .nav-links { display: flex; gap: 32px; list-style: none; }
    .nav-links button {
      background: none; border: none; cursor: pointer;
      font-family: 'DM Mono', monospace;
      font-size: 0.78rem; letter-spacing: 0.06em; text-transform: uppercase;
      color: var(--muted);
      transition: color 0.2s;
      padding: 4px 0;
    }
    .nav-links button:hover { color: var(--text); }

    /* ── HERO ── */
    #about {
      min-height: 100vh;
      display: flex; align-items: center;
      padding: clamp(80px, 10vh, 120px) clamp(20px, 8vw, 120px) 80px;
      position: relative;
      overflow: hidden;
    }
    .hero-grid {
      position: absolute; inset: 0; opacity: 0.04;
      background-image:
        linear-gradient(var(--line) 1px, transparent 1px),
        linear-gradient(90deg, var(--line) 1px, transparent 1px);
      background-size: 60px 60px;
    }
    .hero-glow {
      position: absolute;
      width: 600px; height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(232,197,71,0.08) 0%, transparent 70%);
      top: -100px; right: -100px;
      pointer-events: none;
    }
    .hero-glow2 {
      position: absolute;
      width: 400px; height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(79,142,247,0.06) 0%, transparent 70%);
      bottom: 0; left: 0;
      pointer-events: none;
    }
    .hero-content { position: relative; max-width: 900px; }
    .hero-tag {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: 'DM Mono', monospace;
      font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--accent);
      border: 1px solid rgba(232,197,71,0.25);
      padding: 5px 14px; border-radius: 100px;
      margin-bottom: 28px;
      animation: fadeUp 0.6s ease both;
    }
    .hero-name {
      font-family: 'Syne', sans-serif;
      font-size: clamp(3rem, 8vw, 6.5rem);
      font-weight: 800;
      line-height: 0.95;
      letter-spacing: -0.03em;
      margin-bottom: 24px;
      animation: fadeUp 0.6s 0.1s ease both;
    }
    .hero-name span { color: var(--accent); }
    .hero-desc {
      font-size: clamp(1rem, 2vw, 1.2rem);
      color: var(--muted);
      max-width: 560px;
      line-height: 1.7;
      margin-bottom: 40px;
      animation: fadeUp 0.6s 0.2s ease both;
    }
    .hero-ctas {
      display: flex; gap: 14px; flex-wrap: wrap;
      animation: fadeUp 0.6s 0.3s ease both;
    }
    .btn-primary {
      background: var(--accent); color: #0a0a0a;
      font-family: 'DM Mono', monospace; font-size: 0.8rem;
      font-weight: 500; letter-spacing: 0.05em;
      border: none; padding: 12px 28px; border-radius: 8px;
      cursor: pointer; transition: opacity 0.2s, transform 0.15s;
    }
    .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
    .btn-outline {
      background: transparent; color: var(--text);
      font-family: 'DM Mono', monospace; font-size: 0.8rem;
      letter-spacing: 0.05em;
      border: 1px solid var(--card-border); padding: 12px 28px; border-radius: 8px;
      cursor: pointer; transition: border-color 0.2s, transform 0.15s;
    }
    .btn-outline:hover { border-color: rgba(255,255,255,0.3); transform: translateY(-1px); }

    .hero-stats {
      display: flex; gap: 48px; margin-top: 64px;
      animation: fadeUp 0.6s 0.4s ease both;
    }
    .hero-stat-num {
      font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800;
      color: var(--accent); line-height: 1;
    }
    .hero-stat-label {
      font-family: 'DM Mono', monospace; font-size: 0.7rem;
      text-transform: uppercase; letter-spacing: 0.08em;
      color: var(--muted); margin-top: 4px;
    }

    /* ── SECTION ── */
    section:not(#about) {
      padding: clamp(60px, 8vw, 100px) clamp(20px, 8vw, 120px);
    }
    .section-label {
      font-family: 'DM Mono', monospace;
      font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--accent); margin-bottom: 12px;
    }
    .section-title {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800; line-height: 1.1; letter-spacing: -0.02em;
      margin-bottom: 48px;
    }
    .section-divider {
      width: 100%; height: 1px;
      background: var(--line);
      margin-bottom: 60px;
    }

    /* ── PROJECTS ── */
    #projects { background: var(--bg2); }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 20px;
    }
    .project-card {
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: var(--radius);
      padding: 28px;
      cursor: pointer;
      transition: border-color 0.25s, transform 0.2s, box-shadow 0.25s;
      opacity: 0; transform: translateY(24px);
      position: relative; overflow: hidden;
    }
    .project-card.visible {
      animation: cardIn 0.5s ease forwards;
    }
    .project-card:hover {
      border-color: rgba(232,197,71,0.3);
      transform: translateY(-4px);
      box-shadow: 0 16px 48px rgba(0,0,0,0.4);
    }
    .project-card::before {
      content: ''; position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, var(--accent), var(--accent2));
      opacity: 0; transition: opacity 0.25s;
    }
    .project-card:hover::before { opacity: 1; }

    .project-icon { font-size: 2rem; margin-bottom: 16px; display: block; }
    .project-badge {
      display: inline-block;
      font-family: 'DM Mono', monospace;
      font-size: 0.68rem; letter-spacing: 0.07em; text-transform: uppercase;
      padding: 3px 10px; border-radius: 100px;
      margin-bottom: 12px; font-weight: 500;
    }
    .project-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.35rem; font-weight: 700; margin-bottom: 10px;
    }
    .project-summary {
      color: var(--muted); font-size: 0.9rem; line-height: 1.6;
      margin-bottom: 20px;
      display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .project-tags {
      display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px;
    }
    .project-tag {
      font-family: 'DM Mono', monospace; font-size: 0.68rem;
      color: var(--muted); border: 1px solid var(--line);
      padding: 3px 8px; border-radius: 4px;
    }
    .project-footer {
      display: flex; align-items: center; justify-content: space-between;
      padding-top: 16px; border-top: 1px solid var(--line);
    }
    .project-status {
      font-family: 'DM Mono', monospace; font-size: 0.7rem;
      color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em;
    }
    .project-link {
      font-family: 'DM Mono', monospace; font-size: 0.72rem;
      color: var(--accent); text-decoration: none;
      display: flex; align-items: center; gap: 4px;
      transition: gap 0.2s;
    }
    .project-link:hover { gap: 8px; }

    /* ── PROJECT MODAL ── */
    .modal-overlay {
      position: fixed; inset: 0; z-index: 200;
      background: rgba(0,0,0,0.75);
      backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
      animation: fadeIn 0.2s ease;
    }
    .modal {
      background: var(--bg3);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: clamp(24px, 4vw, 48px);
      max-width: 680px; width: 100%;
      max-height: 88vh; overflow-y: auto;
      animation: slideUp 0.3s ease;
      position: relative;
    }
    .modal::-webkit-scrollbar { width: 4px; }
    .modal::-webkit-scrollbar-track { background: transparent; }
    .modal::-webkit-scrollbar-thumb { background: var(--line); border-radius: 4px; }
    .modal-close {
      position: absolute; top: 20px; right: 20px;
      background: var(--card); border: 1px solid var(--card-border);
      color: var(--muted); border-radius: 8px;
      width: 32px; height: 32px;
      font-size: 1rem; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: color 0.2s;
    }
    .modal-close:hover { color: var(--text); }
    .modal-header { margin-bottom: 28px; }
    .modal-icon { font-size: 2.5rem; margin-bottom: 12px; display: block; }
    .modal-title {
      font-family: 'Syne', sans-serif;
      font-size: 2rem; font-weight: 800; margin-bottom: 8px;
    }
    .modal-role { color: var(--muted); font-size: 0.9rem; }
    .modal-section { margin-bottom: 24px; }
    .modal-section-title {
      font-family: 'DM Mono', monospace;
      font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--accent); margin-bottom: 10px;
    }
    .modal-text { color: var(--muted); line-height: 1.7; font-size: 0.95rem; }
    .modal-list { list-style: none; }
    .modal-list li {
      color: var(--muted); font-size: 0.92rem; line-height: 1.6;
      padding: 6px 0; border-bottom: 1px solid var(--line);
      display: flex; gap: 10px;
    }
    .modal-list li:last-child { border-bottom: none; }
    .modal-list li::before { content: '▹'; color: var(--accent); flex-shrink: 0; }
    .modal-tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .modal-tag {
      font-family: 'DM Mono', monospace; font-size: 0.72rem;
      color: var(--accent2); border: 1px solid rgba(79,142,247,0.25);
      padding: 4px 10px; border-radius: 6px;
    }
    .modal-cta {
      margin-top: 28px; padding-top: 24px; border-top: 1px solid var(--line);
      display: flex; gap: 12px;
    }

    /* ── SKILLS ── */
    #skills { background: var(--bg); }
    .skills-container { display: flex; flex-direction: column; gap: 32px; }
    .skill-group-title {
      font-family: 'DM Mono', monospace;
      font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--muted); margin-bottom: 14px;
    }
    .skill-chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill-chip {
      font-family: 'DM Mono', monospace; font-size: 0.8rem;
      color: var(--text);
      border: 1px solid var(--card-border);
      background: var(--card);
      padding: 7px 16px; border-radius: 8px;
      transition: border-color 0.2s, color 0.2s;
    }
    .skill-chip:hover { border-color: rgba(232,197,71,0.4); color: var(--accent); }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 28px;
    }
    .skill-group-card {
      background: var(--card); border: 1px solid var(--card-border);
      border-radius: var(--radius); padding: 24px;
    }

    /* ── EDUCATION ── */
    #education { background: var(--bg2); }
    .edu-card {
      background: var(--card); border: 1px solid var(--card-border);
      border-radius: var(--radius); padding: 32px;
      max-width: 700px;
      position: relative; overflow: hidden;
    }
    .edu-card::after {
      content: ''; position: absolute;
      top: 0; left: 0; bottom: 0; width: 3px;
      background: linear-gradient(180deg, var(--accent), var(--accent2));
    }
    .edu-school {
      font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 700;
      margin-bottom: 6px;
    }
    .edu-degree { color: var(--muted); font-size: 1rem; margin-bottom: 4px; }
    .edu-meta {
      font-family: 'DM Mono', monospace; font-size: 0.75rem;
      color: var(--accent); text-transform: uppercase; letter-spacing: 0.07em;
    }
    .edu-courses {
      margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--line);
    }
    .edu-courses-title {
      font-family: 'DM Mono', monospace; font-size: 0.7rem;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--muted); margin-bottom: 12px;
    }
    .edu-course-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .edu-course {
      font-size: 0.82rem; color: var(--muted);
      border: 1px solid var(--line); padding: 4px 12px; border-radius: 6px;
    }

    /* ── CONTACT ── */
    #contact { background: var(--bg); text-align: center; }
    .contact-inner { max-width: 600px; margin: 0 auto; }
    .contact-heading {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800;
      letter-spacing: -0.02em; margin-bottom: 20px;
    }
    .contact-heading span { color: var(--accent); }
    .contact-sub {
      color: var(--muted); font-size: 1rem; line-height: 1.7;
      margin-bottom: 36px;
    }
    .contact-links { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
    .contact-link {
      display: flex; align-items: center; gap: 8px;
      background: var(--card); border: 1px solid var(--card-border);
      color: var(--text); text-decoration: none;
      font-family: 'DM Mono', monospace; font-size: 0.8rem;
      padding: 12px 24px; border-radius: 10px;
      transition: border-color 0.2s, color 0.2s, transform 0.15s;
    }
    .contact-link:hover {
      border-color: rgba(232,197,71,0.4); color: var(--accent);
      transform: translateY(-2px);
    }

    /* ── FOOTER ── */
    footer {
      padding: 24px clamp(20px, 8vw, 120px);
      border-top: 1px solid var(--line);
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 12px;
    }
    .footer-copy {
      font-family: 'DM Mono', monospace; font-size: 0.72rem;
      color: var(--muted);
    }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(32px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes cardIn {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 640px) {
      .nav-links { display: none; }
      .hero-stats { gap: 28px; }
      .projects-grid { grid-template-columns: 1fr; }
      .skills-grid { grid-template-columns: 1fr; }
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
              <button onClick={() => scrollTo(item.toLowerCase())}>{item}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO / ABOUT */}
      <section id="about">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-content">
          <div className="hero-tag">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            Available for opportunities
          </div>
          <h1 className="hero-name">
            Khalid<br /><span>Wasim</span>
          </h1>
          <p className="hero-desc">
            Full-Stack Software Developer graduating from George Brown College. I build
            real-world platforms — from trading simulators to student social apps — with a
            focus on clean architecture, scalable backends, and meaningful user experiences.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => scrollTo("projects")}>
              View Projects
            </button>
            <button className="btn-outline" onClick={() => scrollTo("contact")}>
              Get in Touch
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <div className="hero-stat-num">4</div>
              <div className="hero-stat-label">Projects Built</div>
            </div>
            <div>
              <div className="hero-stat-num">200+</div>
              <div className="hero-stat-label">App Users</div>
            </div>
            <div>
              <div className="hero-stat-num">3yr</div>
              <div className="hero-stat-label">of Study</div>
            </div>
          </div>

          {/* Philosophy */}
          <div style={{ marginTop: 64, maxWidth: 640, padding: "28px 32px", background: "var(--card)", border: "1px solid var(--card-border)", borderRadius: "var(--radius)", borderLeft: "3px solid var(--accent)" }}>
            <div className="section-label" style={{ marginBottom: 10 }}>Career Philosophy</div>
            <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: "0.95rem" }}>
              I believe software is most powerful when it solves real problems for real people.
              My motivation is not just to write working code — it's to build systems that connect
              communities, reduce barriers, and create genuine value. From simulating stock markets
              to connecting students, every project I take on is driven by the question: <em style={{ color: "var(--text)" }}>how does
              this make someone's life meaningfully better?</em>
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: "0.95rem", marginTop: 12 }}>
              Looking ahead, I aspire to work at the intersection of product and engineering —
              where technical decisions are inseparable from user empathy. I want to build things
              that last, teams that grow, and systems that scale gracefully under pressure.
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
              <span
                className="project-badge"
                style={{ background: `${project.badgeColor}18`, color: project.badgeColor, border: `1px solid ${project.badgeColor}30` }}
              >
                {project.badge}
              </span>
              <div className="project-title">{project.title}</div>
              <p className="project-summary">{project.summary}</p>
              <div className="project-tags">
                {project.tech.slice(0, 4).map((t) => (
                  <span key={t} className="project-tag">{t}</span>
                ))}
                {project.tech.length > 4 && (
                  <span className="project-tag">+{project.tech.length - 4}</span>
                )}
              </div>
              <div className="project-footer">
                <span className="project-status">{project.status}</span>
                <span className="project-link">View Details →</span>
              </div>
            </div>
          ))}
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
                {items.map((s) => (
                  <span key={s} className="skill-chip">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <div className="section-label">Academic</div>
        <h2 className="section-title">Education</h2>
        <div className="section-divider" />
        <div className="edu-card">
          <div className="edu-school">George Brown College</div>
          <div className="edu-degree">Computer Programming & Analysis — Advanced Diploma</div>
          <div className="edu-meta" style={{ marginTop: 8 }}>Toronto, ON · 2022 – 2025</div>
          <div className="edu-courses">
            <div className="edu-courses-title">Relevant Coursework</div>
            <div className="edu-course-list">
              {["Data Structures & Algorithms", "Database Design", "Web Development", "Software Architecture", "Mobile Development", "Agile & Scrum", "Spring Boot / Java EE", "Portfolio Development"].map(c => (
                <span key={c} className="edu-course">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-inner">
          <div className="section-label" style={{ textAlign: "center" }}>Get in Touch</div>
          <h2 className="contact-heading">Let's <span>Connect</span></h2>
          <p className="contact-sub">
            I'm actively looking for full-time opportunities and freelance projects.
            Whether you have a question or just want to say hello — my inbox is always open.
          </p>
          <div className="contact-links">
            <a className="contact-link" href="mailto:khalidwasim09@gmail.com">
              ✉ Email Me
            </a>
            <a className="contact-link" href="https://github.com/khalidwasim09" target="_blank" rel="noreferrer">
              ⌥ GitHub
            </a>
            <a className="contact-link" href="https://linkedin.com/in/khalidwasim" target="_blank" rel="noreferrer">
              ⬡ LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span className="footer-copy">© 2025 Khalid Wasim. All rights reserved.</span>
        <span className="footer-copy">COMP3078 · George Brown College</span>
      </footer>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>✕</button>
            <div className="modal-header">
              <span className="modal-icon">{selectedProject.icon}</span>
              <span
                className="project-badge"
                style={{
                  background: `${selectedProject.badgeColor}18`,
                  color: selectedProject.badgeColor,
                  border: `1px solid ${selectedProject.badgeColor}30`,
                  marginBottom: 10, display: "inline-block"
                }}
              >
                {selectedProject.badge}
              </span>
              <div className="modal-title">{selectedProject.title}</div>
              <div className="modal-role">Role: {selectedProject.role}</div>
            </div>

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
                {selectedProject.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>

            <div className="modal-section">
              <div className="modal-section-title">Tech Stack</div>
              <div className="modal-tags">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="modal-tag">{t}</span>
                ))}
              </div>
            </div>

            <div className="modal-cta">
              {selectedProject.github !== "#" && (
                <a className="btn-primary" href={selectedProject.github} target="_blank" rel="noreferrer"
                   style={{ textDecoration: "none", display: "inline-block" }}>
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