import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail,
  Linkedin,
  Github,
  Calendar,
  Menu,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  { id: "lifecycle", label: "Lifecycle" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "ai", label: "AI Integration" },
  { id: "contact", label: "Contact" },
];

const ROLES = [
  "SAP UI5 / Fiori Developer",
  "RAP & CAP Engineer",
  "BTP Cloud Architect",
  "WorkZone Specialist",
];

const LIFECYCLE = [
  {
    n: "01",
    title: "Client Discovery & Analysis",
    desc: "Deep-dive workshops to understand business requirements, pain points, and technical constraints.",
    tags: ["Business Analysis", "Requirements Gathering", "Workshop Facilitation"],
  },
  {
    n: "02",
    title: "API Design & OData Services",
    desc: "Building robust CAP and RAP-based v2/v4 services with proper data exposure and security protocols.",
    tags: ["SAP CAP", "OData RAP v4", "Authorization"],
  },
  {
    n: "03",
    title: "Frontend Development",
    desc: "Responsive Fiori Elements and freestyle applications with intuitive, considered interfaces.",
    tags: ["SAP Fiori", "UI5", "UX Design"],
  },
  {
    n: "04",
    title: "Cloud & On-Prem Deployment",
    desc: "Deployment across SAP BTP, Cloud Foundry, and on-premises environments with CI/CD pipelines.",
    tags: ["SAP BTP", "Cloud Foundry", "DevOps"],
  },
  {
    n: "05",
    title: "WorkZone & Portal Design",
    desc: "Centralized entry points with SAP Build WorkZone for seamless, unified user experiences.",
    tags: ["WorkZone", "Portal Design", "Information Architecture"],
  },
  {
    n: "06",
    title: "Role Management & Security",
    desc: "Fine-grained role-based access control and authorization frameworks.",
    tags: ["RBAC", "Security Design", "Compliance"],
  },
  {
    n: "07",
    title: "System & Subaccount Migration",
    desc: "Seamless migration across dev, QA, production, and multiple subaccounts with zero downtime.",
    tags: ["System Transport", "Data Migration", "Infrastructure"],
  },
];

const SKILLS = [
  { icon: "🏗️", name: "SAP Architecture", level: "Expert", pct: 95 },
  { icon: "📱", name: "UI/UX Design", level: "Expert", pct: 92 },
  { icon: "💻", name: "Frontend Development", level: "Expert", pct: 95 },
  { icon: "⚙️", name: "Backend Services", level: "Expert", pct: 90 },
  { icon: "☁️", name: "Cloud & BTP", level: "Expert", pct: 90 },
  { icon: "🔐", name: "Security & Auth", level: "Advanced", pct: 78 },
  { icon: "📊", name: "Analytics & Reports", level: "Advanced", pct: 75 },
  { icon: "🤖", name: "AI Integration", level: "Emerging", pct: 45 },
];

const PROJECTS = [
  {
    title: "Intelligent Inventory System",
    category: "Complex Application",
    desc: "Comprehensive inventory management with real-time tracking, automated forecasting, and multi-warehouse support using SAP CAP and Fiori Elements.",
    tech: ["SAP CAP", "Fiori", "OData v4"],
  },
  {
    title: "Supply Chain Dashboard",
    category: "Analytics & Visualization",
    desc: "Interactive real-time dashboard providing supply chain visibility, KPI tracking, and predictive analytics with custom API integrations.",
    tech: ["Analytics", "UI5", "BTP"],
  },
  {
    title: "Employee Portal",
    category: "Enterprise Application",
    desc: "Unified employee hub with leave management, expense tracking, and performance reviews integrated with SuccessFactors and S/4HANA.",
    tech: ["WorkZone", "SAP Fiori", "Integration"],
  },
  {
    title: "Vendor Management Portal",
    category: "B2B Solution",
    desc: "Streamlined vendor collaboration platform with PO management, invoice processing, and performance tracking with role-based workflows.",
    tech: ["RAP v4", "Workflows", "UI5"],
  },
  {
    title: "Financial Consolidation Tool",
    category: "Finance & Controlling",
    desc: "Multi-company financial consolidation with automated allocations, inter-company eliminations, and compliance reporting.",
    tech: ["S/4HANA", "CAP", "Analytics"],
  },
  {
    title: "Quality Assurance Dashboard",
    category: "Manufacturing",
    desc: "Real-time QA monitoring with defect tracking, inspection workflows, and SPC visualization.",
    tech: ["Manufacturing", "Fiori", "Reports"],
  },
];

const AI_FEATURES = [
  "AI-powered process automation with SAP Intelligent RPA",
  "Predictive analytics & machine learning models",
  "Natural language processing for business intelligence",
  "Generative AI for report generation & insights",
  "Intelligent document processing & classification",
  "AI-driven user experience personalization",
];

const AI_BOXES = [
  { icon: "📊", title: "Data Intelligence", desc: "Extracting insights from enterprise data" },
  { icon: "🤖", title: "Process Automation", desc: "Intelligent workflow automation" },
  { icon: "🧠", title: "Predictive Models", desc: "Forecasting & decision support" },
  { icon: "✨", title: "Smart UX", desc: "Personalized user experiences" },
];

// ---------------------------------------------------------------------------
// Hook: reveal-on-scroll
// ---------------------------------------------------------------------------

function useReveal(count) {
  const refs = useRef([]);
  const [visible, setVisible] = useState(() => new Array(count).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            setVisible((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -80px 0px" }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = useCallback((idx) => (el) => {
    refs.current[idx] = el;
  }, []);

  return { setRef, visible };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);

  const lifecycleReveal = useReveal(LIFECYCLE.length);
  const skillsReveal = useReveal(SKILLS.length);
  const projectsReveal = useReveal(PROJECTS.length);

  // Role rotator
  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  // Header background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy for nav
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .pf-fade { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
        .pf-fade.pf-visible { opacity: 1; transform: translateY(0); }
        .pf-tilt { transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease; }
        .pf-tilt:hover { transform: translateY(-8px); box-shadow: 0 24px 60px rgba(0,164,239,0.18); border-color: rgba(0,164,239,0.5); }
        .pf-nav-link { position: relative; }
        .pf-nav-link::after { content:''; position:absolute; left:0; bottom:-6px; height:2px; width:0; background: linear-gradient(90deg,#00a4ef,#ff6b35); transition: width .25s ease; }
        .pf-nav-link:hover::after, .pf-nav-link.active::after { width:100%; }
        .pf-btn { transition: transform .25s ease, box-shadow .25s ease, background .25s ease; }
        .pf-btn:hover { transform: translateY(-2px); }
        .pf-contact:hover { background:#00a4ef !important; color:#080b10 !important; transform: translateY(-2px); }
        @keyframes pf-spin { to { transform: rotate(360deg); } }
        @keyframes pf-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(0,164,239,.35);} 50% { box-shadow: 0 0 0 10px rgba(0,164,239,0);} }
        ::selection { background: rgba(0,164,239,0.35); }
        .pf-ai-item::before { content: '✓'; position: absolute; left: 0; color: #ff6b35; font-weight: 700; }
        @media (max-width: 860px) {
          .pf-nav-desktop { display: none !important; }
          .pf-mobile-toggle { display: block !important; }
          .pf-ai-content { grid-template-columns: 1fr !important; }
          .pf-timeline-row { flex-direction: column !important; align-items: flex-start !important; }
          .pf-timeline-line { left: 8px !important; }
          .pf-timeline-dot { margin: 0.5rem 0 0.5rem 1px !important; }
          .pf-timeline-card { text-align: left !important; width: 100%; }
          .pf-timeline-card .pf-tagrow, .pf-timeline-card .pf-cardnum { justify-content: flex-start !important; margin-left: 0 !important; }
        }
      `}</style>

      {/* Background ambience */}
      <div style={styles.bg} />

      {/* Header */}
      <header style={{ ...styles.header, background: scrolled ? "rgba(8,11,16,0.85)" : "rgba(8,11,16,0.4)" }}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>Nupur — SAP &amp; UI/UX</div>
          <nav style={styles.navDesktop} className="pf-nav-desktop">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={scrollTo(l.id)}
                className={`pf-nav-link${activeSection === l.id ? " active" : ""}`}
                style={{ ...styles.navLink, color: activeSection === l.id ? "#00a4ef" : "#b0b8c1" }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
            style={styles.menuBtn}
            className="pf-mobile-toggle-btn pf-mobile-toggle"
          >
            {menuOpen ? <X size={22} color="#fff" /> : <Menu size={22} color="#fff" />}
          </button>
        </div>
        {menuOpen && (
          <div style={styles.navMobile}>
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={scrollTo(l.id)} style={styles.navMobileLink}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.eyebrow}>
            <Sparkles size={14} color="#ff6b35" /> 4+ years building enterprise SAP experiences
          </div>
          <h1 style={styles.h1}>
            Crafting Enterprise Solutions with{" "}
            <span style={styles.gradientText}>SAP &amp; Modern UX</span>
          </h1>
          <div style={styles.roleRotator}>
            {ROLES.map((r, i) => (
              <span
                key={r}
                style={{
                  ...styles.roleText,
                  opacity: roleIndex === i ? 1 : 0,
                  transform: roleIndex === i ? "translateY(0)" : "translateY(6px)",
                }}
              >
                {r}
              </span>
            ))}
          </div>
          <div style={styles.ctaRow}>
            <a href="#lifecycle" onClick={scrollTo("lifecycle")} className="pf-btn" style={styles.btnPrimary}>
              Explore My Work <ArrowRight size={16} style={{ marginLeft: 6, verticalAlign: "-2px" }} />
            </a>
            <a href="#contact" onClick={scrollTo("contact")} className="pf-btn" style={styles.btnSecondary}>
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* Lifecycle */}
      <section id="lifecycle" style={styles.section}>
        <h2 style={styles.sectionTitle}>Application Lifecycle Expertise</h2>
        <p style={styles.sectionSubtitle}>
          A complete journey from concept to deployment — how a project moves through my hands, end to end.
        </p>

        <div style={styles.timelineWrap}>
          <div style={styles.timelineLine} className="pf-timeline-line" />
          {LIFECYCLE.map((phase, i) => (
            <div
              key={phase.n}
              ref={lifecycleReveal.setRef(i)}
              data-idx={i}
              className={`pf-fade pf-timeline-row${lifecycleReveal.visible[i] ? " pf-visible" : ""}`}
              style={{
                ...styles.timelineRow,
                flexDirection: i % 2 === 0 ? "row" : "row-reverse",
              }}
            >
              <div className="pf-timeline-card" style={{ ...styles.timelineCard, textAlign: i % 2 === 0 ? "right" : "left" }}>
                <div className="pf-cardnum" style={{ ...styles.cardNumber, marginLeft: i % 2 === 0 ? "auto" : 0 }}>{phase.n}</div>
                <h3 style={styles.cardTitle}>{phase.title}</h3>
                <p style={styles.cardDesc}>{phase.desc}</p>
                <div className="pf-tagrow" style={{ ...styles.tagRow, justifyContent: i % 2 === 0 ? "flex-end" : "flex-start" }}>
                  {phase.tags.map((t) => (
                    <span key={t} style={styles.skillTag}>{t}</span>
                  ))}
                </div>
              </div>
              <div
                className="pf-timeline-dot"
                style={{
                  ...styles.timelineDot,
                  background: lifecycleReveal.visible[i] ? "linear-gradient(135deg,#00a4ef,#ff6b35)" : "#1a1f2e",
                  boxShadow: lifecycleReveal.visible[i] ? "0 0 0 6px rgba(0,164,239,0.15)" : "none",
                }}
              />
              <div style={styles.timelineSpacer} />
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={styles.section}>
        <h2 style={styles.sectionTitle}>Technical Skills &amp; Expertise</h2>
        <div style={styles.skillsGrid}>
          {SKILLS.map((s, i) => (
            <div
              key={s.name}
              ref={skillsReveal.setRef(i)}
              data-idx={i}
              className="pf-tilt"
              style={styles.skillItem}
            >
              <SkillRing pct={s.pct} active={skillsReveal.visible[i]} icon={s.icon} />
              <div style={styles.skillName}>{s.name}</div>
              <div style={styles.skillLevel}>{s.level}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={styles.section}>
        <h2 style={styles.sectionTitle}>Featured Custom Applications</h2>
        <div style={styles.projectsGrid}>
          {PROJECTS.map((p, i) => (
            <div
              key={p.title}
              ref={projectsReveal.setRef(i)}
              data-idx={i}
              className={`pf-tilt pf-fade${projectsReveal.visible[i] ? " pf-visible" : ""}`}
              style={styles.projectCard}
            >
              <div style={styles.projectHeader}>
                <div style={styles.projectTitle}>{p.title}</div>
                <div style={styles.projectCategory}>{p.category}</div>
              </div>
              <div style={styles.projectBody}>
                <p style={styles.projectDesc}>{p.desc}</p>
                <div style={styles.tagRow}>
                  {p.tech.map((t) => (
                    <span key={t} style={styles.techTag}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Integration */}
      <section id="ai" style={styles.aiSection}>
        <h2 style={styles.sectionTitle}>AI Integration &amp; Future-Ready Solutions</h2>
        <div style={styles.aiContent} className="pf-ai-content">
          <div>
            <h3 style={styles.aiHeading}>Emerging AI Capabilities</h3>
            <p style={{ color: "#8b96a5", marginBottom: "1.5rem" }}>
              Expanding my expertise in AI integration with SAP to deliver intelligent, data-driven solutions.
            </p>
            <ul style={styles.aiList}>
              {AI_FEATURES.map((f) => (
                <li key={f} className="pf-ai-item" style={styles.aiListItem}>{f}</li>
              ))}
            </ul>
          </div>
          <div style={styles.aiVisual}>
            {AI_BOXES.map((b) => (
              <div key={b.title} style={styles.aiBox}>
                <strong style={{ color: "#ff6b35" }}>{b.icon} {b.title}</strong>
                <p style={{ marginTop: "0.5rem", color: "#8b96a5", fontSize: "0.9rem" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ ...styles.section, textAlign: "center" }}>
        <h2 style={styles.sectionTitle}>Let&apos;s Build Something Amazing</h2>
        <p style={{ ...styles.sectionSubtitle, marginBottom: "1rem" }}>
          Ready to discuss your next project or explore collaboration opportunities?
        </p>
        <div style={styles.contactRow}>
          <a href="mailto:your.email@example.com" className="pf-contact" style={styles.contactLink}>
            <Mail size={16} /> Send Email
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="pf-contact" style={styles.contactLink}>
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href="https://github.com/yourprofile" target="_blank" rel="noreferrer" className="pf-contact" style={styles.contactLink}>
            <Github size={16} /> GitHub
          </a>
          <a href="https://calendly.com/yourprofile" target="_blank" rel="noreferrer" className="pf-contact" style={styles.contactLink}>
            <Calendar size={16} /> Schedule Call
          </a>
        </div>
      </section>

      <footer style={styles.footer}>
        <p>© 2026 SAP &amp; UI/UX Professional Portfolio. Built with React. Hosted with ❤️</p>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Animated skill ring
// ---------------------------------------------------------------------------

function SkillRing({ pct, active, icon }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (active ? pct : 0) / 100 * circumference;

  return (
    <div style={{ position: "relative", width: 76, height: 76, margin: "0 auto 0.75rem" }}>
      <svg width="76" height="76" viewBox="0 0 76 76">
        <circle cx="38" cy="38" r={radius} fill="none" stroke="rgba(0,164,239,0.15)" strokeWidth="6" />
        <circle
          cx="38"
          cy="38"
          r={radius}
          fill="none"
          stroke="url(#pf-ring-grad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 38 38)"
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.2,.8,.2,1)" }}
        />
        <defs>
          <linearGradient id="pf-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00a4ef" />
            <stop offset="100%" stopColor="#ff6b35" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
        {icon}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const font = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const displayFont = "'Space Grotesk', 'Inter', sans-serif";
const monoFont = "'JetBrains Mono', monospace";

const styles = {
  page: {
    background: "#080b10",
    color: "#ffffff",
    fontFamily: font,
    lineHeight: 1.6,
    position: "relative",
    minHeight: "100vh",
  },
  bg: {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(circle at 15% 40%, rgba(0,164,239,0.10) 0%, transparent 50%), radial-gradient(circle at 85% 75%, rgba(255,107,53,0.06) 0%, transparent 50%), #080b10",
    pointerEvents: "none",
    zIndex: 0,
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(0,164,239,0.15)",
    padding: "0.9rem 1.5rem",
    transition: "background .3s ease",
  },
  headerInner: {
    maxWidth: 1300,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontFamily: displayFont,
    fontWeight: 700,
    fontSize: "1.15rem",
    letterSpacing: "-0.5px",
  },
  navDesktop: { display: "flex", gap: "1.75rem" },
  navLink: { textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 },
  menuBtn: { display: "none", background: "none", border: "none", cursor: "pointer" },
  navMobile: { display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem", paddingBottom: "0.5rem" },
  navMobileLink: { color: "#b0b8c1", textDecoration: "none", fontSize: "0.95rem" },

  hero: {
    minHeight: "88vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1.5rem",
    position: "relative",
    zIndex: 1,
  },
  heroContent: { textAlign: "center", maxWidth: 780 },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    fontFamily: monoFont,
    fontSize: "0.78rem",
    color: "#8b96a5",
    border: "1px solid rgba(255,107,53,0.3)",
    borderRadius: 20,
    padding: "0.35rem 0.9rem",
    marginBottom: "1.5rem",
  },
  h1: {
    fontFamily: displayFont,
    fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
    fontWeight: 700,
    lineHeight: 1.12,
    letterSpacing: "-1.5px",
    marginBottom: "1.25rem",
  },
  gradientText: {
    background: "linear-gradient(135deg,#00a4ef,#ff6b35)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  roleRotator: { position: "relative", height: "1.6rem", marginBottom: "2.25rem" },
  roleText: {
    position: "absolute",
    left: 0,
    right: 0,
    fontFamily: monoFont,
    fontSize: "1.05rem",
    color: "#00a4ef",
    transition: "opacity .5s ease, transform .5s ease",
  },
  ctaRow: { display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" },
  btnPrimary: {
    background: "#00a4ef",
    color: "#080b10",
    padding: "0.75rem 1.75rem",
    borderRadius: 8,
    fontWeight: 600,
    textDecoration: "none",
    fontSize: "0.95rem",
  },
  btnSecondary: {
    border: "2px solid #00a4ef",
    color: "#00a4ef",
    padding: "0.7rem 1.75rem",
    borderRadius: 8,
    fontWeight: 600,
    textDecoration: "none",
    fontSize: "0.95rem",
  },

  section: { maxWidth: 1200, margin: "5rem auto", padding: "0 1.5rem", position: "relative", zIndex: 1 },
  sectionTitle: {
    fontFamily: displayFont,
    textAlign: "center",
    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
    fontWeight: 700,
    letterSpacing: "-1px",
    marginBottom: "0.75rem",
  },
  sectionSubtitle: { textAlign: "center", color: "#8b96a5", marginBottom: "3rem", fontSize: "1.05rem" },

  timelineWrap: { position: "relative", marginTop: "2rem" },
  timelineLine: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: 2,
    background: "linear-gradient(180deg, rgba(0,164,239,0.35), rgba(255,107,53,0.15))",
    transform: "translateX(-50%)",
  },
  timelineRow: { display: "flex", alignItems: "center", position: "relative", marginBottom: "2.5rem" },
  timelineCard: {
    flex: 1,
    background: "linear-gradient(135deg, rgba(0,164,239,0.08), rgba(255,107,53,0.05))",
    border: "1px solid rgba(0,164,239,0.2)",
    borderRadius: 12,
    padding: "1.5rem 1.75rem",
  },
  cardNumber: {
    display: "inline-flex",
    fontFamily: monoFont,
    fontSize: "0.85rem",
    color: "#ff6b35",
    marginBottom: "0.5rem",
  },
  cardTitle: { fontFamily: displayFont, fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.5rem" },
  cardDesc: { color: "#8b96a5", fontSize: "0.92rem", marginBottom: "0.9rem" },
  tagRow: { display: "flex", flexWrap: "wrap", gap: "0.5rem" },
  skillTag: {
    background: "rgba(0,164,239,0.15)",
    color: "#00a4ef",
    padding: "0.25rem 0.7rem",
    borderRadius: 20,
    fontSize: "0.75rem",
    fontWeight: 600,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    margin: "0 1.25rem",
    transition: "all .4s ease",
    flexShrink: 0,
  },
  timelineSpacer: { flex: 1 },

  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "1.25rem",
  },
  skillItem: {
    background: "rgba(0,164,239,0.07)",
    border: "1px solid rgba(0,164,239,0.18)",
    borderRadius: 10,
    padding: "1.5rem 1rem",
    textAlign: "center",
    cursor: "default",
  },
  skillName: { fontWeight: 600, fontSize: "0.92rem", marginBottom: "0.25rem" },
  skillLevel: { color: "#8b96a5", fontSize: "0.8rem", fontFamily: monoFont },

  projectsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.75rem" },
  projectCard: {
    background: "linear-gradient(135deg, rgba(0,164,239,0.06), rgba(255,107,53,0.04))",
    border: "1px solid rgba(0,164,239,0.18)",
    borderRadius: 12,
    overflow: "hidden",
    cursor: "default",
  },
  projectHeader: { background: "linear-gradient(135deg,#00a4ef,#ff6b35)", padding: "1.5rem 1.75rem" },
  projectTitle: { fontFamily: displayFont, fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.3rem" },
  projectCategory: { fontSize: "0.8rem", opacity: 0.9, fontFamily: monoFont },
  projectBody: { padding: "1.4rem 1.75rem" },
  projectDesc: { color: "#8b96a5", marginBottom: "1rem", fontSize: "0.92rem" },
  techTag: { background: "rgba(255,107,53,0.18)", color: "#ff6b35", padding: "0.25rem 0.7rem", borderRadius: 20, fontSize: "0.75rem" },

  aiSection: {
    maxWidth: 1200,
    margin: "5rem auto",
    padding: "3rem 2rem",
    background: "linear-gradient(135deg, rgba(0,164,239,0.08), rgba(255,107,53,0.05))",
    borderRadius: 16,
    border: "1px solid rgba(0,164,239,0.18)",
    position: "relative",
    zIndex: 1,
  },
  aiContent: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center", marginTop: "2rem" },
  aiHeading: { fontFamily: displayFont, fontSize: "1.6rem", marginBottom: "0.75rem" },
  aiList: { listStyle: "none", padding: 0, margin: 0 },
  aiListItem: { marginBottom: "0.9rem", paddingLeft: "1.75rem", position: "relative", color: "#8b96a5" },
  aiVisual: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" },
  aiBox: { background: "rgba(0,164,239,0.12)", border: "2px dashed #00a4ef", borderRadius: 8, padding: "1.4rem", textAlign: "center" },

  contactRow: { display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" },
  contactLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.7rem 1.4rem",
    background: "rgba(0,164,239,0.12)",
    border: "1px solid #00a4ef",
    borderRadius: 8,
    color: "#00a4ef",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.9rem",
  },
  footer: {
    maxWidth: 1200,
    margin: "3rem auto 2rem",
    padding: "2rem 1.5rem 0",
    borderTop: "1px solid rgba(0,164,239,0.15)",
    textAlign: "center",
    color: "#8b96a5",
    fontSize: "0.85rem",
    position: "relative",
    zIndex: 1,
  },
};
