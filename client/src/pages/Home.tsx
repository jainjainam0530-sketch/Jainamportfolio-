/**
 * Obsidian Field Notes — editorial field-notebook layout with restrained brass wayfinding.
 * Content is sourced exclusively from ../data/portfolioData.ts.
 */
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MoveRight,
  X,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

type MagneticLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

function MagneticLink({ href, children, className = "", target, rel }: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches || !linkRef.current) return;
    const bounds = linkRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.14;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.14;
    linkRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const resetPosition = () => {
    if (linkRef.current) linkRef.current.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={linkRef}
      href={href}
      className={`magnetic-link ${className}`}
      target={target}
      rel={rel}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
    >
      {children}
    </a>
  );
}

function SectionIntro({ index, label, title, description }: { index: string; label: string; title: string; description?: string }) {
  return (
    <div className="section-intro">
      <div className="section-number"><span>{index}</span></div>
      <div>
        <p className="eyebrow">{label}</p>
        <h2 className="section-title">{title}</h2>
        {description ? <p className="section-description">{description}</p> : null}
      </div>
    </div>
  );
}

function SocialIcon({ label }: { label: string }) {
  if (label === "LinkedIn") return <Linkedin aria-hidden="true" size={17} />;
  if (label === "GitHub") return <Github aria-hidden="true" size={17} />;
  return <Instagram aria-hidden="true" size={17} />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLab, setActiveLab] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  const reduceMotion = useReducedMotion();
  const { brand, hero, about, status, projects, skills, process, strengths, experience, achievements, exploring, philosophy, journey, lab, resume, contact } = portfolioData;
  const resumeAvailable = !resume.url.startsWith("[");
  const entrance = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 } };

  useEffect(() => {
    const updateScrollDepth = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollDepth(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);
    };
    updateScrollDepth();
    window.addEventListener("scroll", updateScrollDepth, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollDepth);
  }, []);

  return (
    <div className="home-shell">
      <div className="noise-layer" aria-hidden="true" />
      <aside className="page-rail" aria-hidden="true">
        <span className="rail-line" />
        <span className="rail-progress" style={{ height: `${Math.max(2, scrollDepth)}%` }} />
        <span className="rail-dot" style={{ top: `${Math.min(88, 10 + scrollDepth * 0.78)}%` }} />
        <span className="rail-label rail-label-top">Field notes</span>
        <span className="rail-label rail-label-bottom">End / start</span>
        <span className="rail-index">J/26</span>
      </aside>

      <header className="site-header">
        <div className="header-inner">
          <a className="brand-lockup" href="#top" aria-label="Jainam — back to top">
            <img className="brand-mark" src="/manus-storage/jainam-mark_d137763b.png" alt="" />
            <span className="brand-word">{brand.name}</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {portfolioData.navigation.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <a className="header-contact" href={`mailto:${contact.email}`}>
            Let&apos;s connect <ArrowUpRight size={14} aria-hidden="true" />
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen ? (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {portfolioData.navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
            <a href={`mailto:${contact.email}`} onClick={() => setMenuOpen(false)}>Let&apos;s connect</a>
          </nav>
        ) : null}
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-heading">
          <div className="hero-grid">
            <div className="hero-copy">
              <motion.p className="eyebrow hero-eyebrow" {...entrance} transition={{ duration: 0.42, delay: 0.05 }}>
                <span className="live-dot" /> {hero.eyebrow}
              </motion.p>
              <motion.h1 id="hero-heading" className="hero-title" {...entrance} transition={{ duration: 0.62, delay: 0.12 }}>
                {hero.headline}
              </motion.h1>
              <motion.p className="hero-support" {...entrance} transition={{ duration: 0.52, delay: 0.21 }}>
                {hero.support}
              </motion.p>
              <motion.div className="hero-actions" {...entrance} transition={{ duration: 0.44, delay: 0.3 }}>
                <MagneticLink href="#work" className="button button-primary">
                  {hero.primaryCta} <ArrowDownRight size={17} aria-hidden="true" />
                </MagneticLink>
                <a className="text-link" href="#about">{hero.secondaryCta} <MoveRight size={16} aria-hidden="true" /></a>
              </motion.div>
            </div>

            <motion.div className="hero-visual" {...entrance} transition={{ duration: 0.7, delay: 0.14 }}>
              <div className="visual-corner visual-corner-top" />
              <img src={hero.art} alt="Abstract folded graphite pathway with a brass route" />
              <div className="process-card">
                <div className="process-card-top"><span>Method / 01</span><span>Active</span></div>
                <div className="hero-process" aria-label="Process: Idea, Build, Test, Iterate, Launch">
                  {hero.process.map((step, index) => (
                    <span key={step} className={index === hero.process.length - 1 ? "is-final" : ""}>{step}</span>
                  ))}
                </div>
              </div>
              <div className="visual-corner visual-corner-bottom" />
            </motion.div>
          </div>
          <div className="hero-baseline"><span>Scroll to read</span><span>01 / 13</span></div>
        </section>

        <section id="about" className="section-frame about-section" aria-labelledby="about-title">
          <SectionIntro index="01" label="About" title={about.title} />
          <motion.div className="about-layout reveal-surface" initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.24 }} transition={{ duration: 0.45 }}>
            <p className="about-copy">{about.body}</p>
            <div className="interest-panel">
              <p className="eyebrow">Areas of interest</p>
              <div className="interest-tags">
                {about.interests.map((interest) => <span key={interest}>{interest}</span>)}
              </div>
            </div>
          </motion.div>
        </section>

        <section className="section-frame status-section" aria-labelledby="status-title">
          <SectionIntro index="02" label={status.eyebrow} title={status.title} />
          <div className="status-grid">
            {status.items.map((item, index) => (
              <motion.article key={item.label} className="status-card" initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.36, delay: index * 0.05 }}>
                <span className="status-marker">0{index + 1}</span>
                <p className="status-label">{item.label}</p>
                <p>{item.value}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="work" className="section-frame work-section" aria-labelledby="work-title">
          <SectionIntro index="03" label="Selected work" title="The ideas in progress." description="Each record keeps the status of the work visible. No concept is presented as a shipped product." />
          <div className="project-stack">
            {projects.map((project, index) => (
              <motion.article key={project.title} className="project-record" initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: 0.46, delay: index * 0.04 }}>
                <div className="project-topline">
                  <span className="project-index">{project.index}</span>
                  <span className="project-category">{project.categories}</span>
                </div>
                <div className="project-main">
                  <div className="project-copy">
                    <p className="project-role">{project.role}</p>
                    <h3>{project.title}</h3>
                    <p className="project-summary">{project.summary}</p>
                    <p className="project-status"><span>Status</span>{project.status}</p>
                  </div>
                  {"media" in project && project.media ? (
                    <div className="project-art">
                      <img src={project.media} alt={`Abstract editorial artifact for ${project.title}`} />
                    </div>
                  ) : (
                    <div className="project-monogram" aria-hidden="true"><span>C</span><i /></div>
                  )}
                </div>
                {project.contributions.length > 0 ? (
                  <div className="contribution-list">
                    <span>Key contributions</span>
                    <ul>{project.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}</ul>
                  </div>
                ) : null}
                <details className="case-study">
                  <summary>Open case study <ChevronDown size={17} aria-hidden="true" /></summary>
                  <div className="case-study-grid">
                    {Object.entries(project.caseStudy).map(([label, value]) => (
                      <div key={label} className={label === "Problem" || label === "Solution" ? "case-wide" : ""}>
                        <span>{label}</span>
                        <p>{value}</p>
                      </div>
                    ))}
                  </div>
                </details>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-frame capabilities-section" aria-labelledby="capabilities-title">
          <SectionIntro index="04" label="Capabilities" title="Tools for thinking in public." />
          <div className="capability-grid">
            {skills.map((group, index) => (
              <motion.article key={group.title} className="capability-card" initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.35, delay: index * 0.04 }}>
                <span className="capability-index">0{index + 1}</span>
                <h3>{group.title}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-frame process-section" aria-labelledby="process-title">
          <SectionIntro index="05" label="How I build" title="A small loop, repeated seriously." />
          <div className="process-rail-list">
            {process.map((step, index) => (
              <motion.article key={step.number} className="process-step" initial={reduceMotion ? false : { opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.34, delay: index * 0.06 }}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-frame bring-section" aria-labelledby="bring-title">
          <SectionIntro index="06" label="What I bring" title="Strengths connected to the work." />
          <div className="bring-grid">
            {strengths.map((strength) => (
              <article key={strength.title} className="strength-card">
                <h3>{strength.title}</h3>
                <p>{strength.statement}</p>
                <span>Evidence / {strength.evidence}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section-frame experience-section" aria-labelledby="experience-title">
          <SectionIntro index="07" label="Building experience" title="Independent, ongoing." />
          <article className="experience-entry">
            <p>{experience.label}</p>
            <h3>{experience.title}</h3>
            <p>{experience.description}</p>
          </article>
        </section>

        <section className="section-frame achievement-section" aria-labelledby="achievements-title">
          <SectionIntro index="08" label={achievements.title} title={achievements.detail} />
          <div className="achievement-empty"><span className="empty-orbit" aria-hidden="true" /><p>No confirmed achievements or milestones have been added yet.</p></div>
        </section>

        <section className="section-frame exploring-section" aria-labelledby="exploring-title">
          <SectionIntro index="09" label="Currently exploring" title="Questions worth staying with." />
          <div className="exploring-cloud">
            {exploring.map((topic, index) => <span key={topic} className={`topic-${index + 1}`}>{topic}</span>)}
          </div>
        </section>

        <section className="section-frame philosophy-section" aria-labelledby="philosophy-title">
          <div className="philosophy-block">
            <p className="eyebrow">10 / Philosophy</p>
            <blockquote id="philosophy-title">“{philosophy.quote}”</blockquote>
            <p>{philosophy.body}</p>
          </div>
        </section>

        <section className="section-frame journey-section" aria-labelledby="journey-title">
          <SectionIntro index="11" label="Journey" title="A direction, not a timeline." />
          <ol className="journey-track" id="journey-title">
            {journey.map((stage, index) => (
              <li key={stage} className={index === journey.length - 1 ? "journey-current" : ""}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong></li>
            ))}
          </ol>
        </section>

        <section id="lab" className="lab-section" aria-labelledby="lab-title">
          <div className="lab-intro">
            <p className="eyebrow">12 / Signature feature</p>
            <h2 id="lab-title">{lab.title}</h2>
            <p>{lab.body}</p>
          </div>
          <div className="lab-layout">
            <div className="lab-modules" role="tablist" aria-label="Jainam Lab focus modules">
              {lab.modules.map((module, index) => (
                <button key={module} type="button" role="tab" aria-selected={activeLab === index} className={activeLab === index ? "lab-module is-active" : "lab-module"} onClick={() => setActiveLab(index)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>{module}<ArrowUpRight size={16} aria-hidden="true" />
                </button>
              ))}
            </div>
            <motion.div key={lab.modules[activeLab]} className="lab-notebook" role="tabpanel" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
              <span className="notebook-rule" />
              <p className="eyebrow">Focus module / {String(activeLab + 1).padStart(2, "0")}</p>
              <h3>{lab.modules[activeLab]}</h3>
              <p>{lab.note}</p>
              <span className="notebook-foot">Research index · ongoing</span>
            </motion.div>
          </div>
        </section>

        <section className="section-frame resume-section" aria-labelledby="resume-title">
          <SectionIntro index="13" label="Resume" title={resume.title} />
          <div className="resume-card">
            <FileText size={32} aria-hidden="true" />
            <div><p>{resume.body}</p><span>{resume.fileLabel}</span></div>
            <div className="resume-actions">
              {resumeAvailable ? (
                <>
                  <a href={resume.url} target="_blank" rel="noreferrer">View <ExternalLink size={15} aria-hidden="true" /></a>
                  <a href={resume.url} download>Download <Download size={15} aria-hidden="true" /></a>
                </>
              ) : (
                <><button type="button" disabled>View <ExternalLink size={15} aria-hidden="true" /></button><button type="button" disabled>Download <Download size={15} aria-hidden="true" /></button></>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="site-footer" aria-labelledby="contact-title">
        <div className="footer-top">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">{contact.title}</h2>
            <p>{contact.body}</p>
          </div>
          <MagneticLink href={`mailto:${contact.email}`} className="button button-primary footer-email">
            <Mail size={17} aria-hidden="true" /> {contact.email}
          </MagneticLink>
        </div>
        <div className="footer-bottom">
          <div className="social-links" aria-label="Social links">
            {contact.social.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer"><SocialIcon label={social.label} /><span>{social.label}</span><ArrowUpRight size={13} aria-hidden="true" /></a>
            ))}
          </div>
          <div className="footer-meta"><span>Languages / {contact.languages}</span><span>{brand.positioning}</span></div>
        </div>
      </footer>
    </div>
  );
}
