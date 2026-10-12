/**
 * Signal Edition — a black-and-ember editorial portfolio inspired by supplied references.
 * All verified claims, project states, contacts, and links remain in ../data/portfolioData.ts.
 */
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
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
import { trpc } from "@/lib/trpc";

const SignalField = lazy(() => import("@/components/SignalField"));

function SectionKicker({ number, title }: { number: string; title: string }) {
  return <p className="section-kicker"><span>{number}</span>{title}</p>;
}

function SocialIcon({ label }: { label: string }) {
  if (label === "LinkedIn") return <Linkedin size={17} aria-hidden="true" />;
  if (label === "GitHub") return <Github size={17} aria-hidden="true" />;
  return <Instagram size={17} aria-hidden="true" />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLab, setActiveLab] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("");
  const [liveFocusIndex, setLiveFocusIndex] = useState(0);
  const [isImmersiveLoading, setIsImmersiveLoading] = useState(() => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [introReady, setIntroReady] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [loadProgress, setLoadProgress] = useState(0);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "", company: "" });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const heroGlowRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const labTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const heroWordmarkY = useTransform(smoothScroll, [0, 0.32], [0, 105]);
  const heroArtifactY = useTransform(smoothScroll, [0, 0.28], [0, -38]);
  const { brand, navigation, hero, loadingHints, about, status, projects, skills, process, strengths, experience, achievements, exploring, philosophy, journey, lab, resume, contact } = portfolioData;
  const resumeAvailable = Boolean(resume.url && (resume.url.startsWith("/manus-storage/") || /^https?:\/\//.test(resume.url)));
  const activeLoadingHint = loadingHints.find((hint) => loadProgress <= hint.threshold) ?? loadingHints[loadingHints.length - 1];
  const activeLabNote = lab.notes[activeLab];
  const inView = reduceMotion ? {} : { initial: { opacity: 0, y: 48, scale: 0.985 }, whileInView: { opacity: 1, y: 0, scale: 1 }, viewport: { once: true, amount: 0.14 }, transition: { duration: 0.72 } };
  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setContactSubmitted(true);
      setContactForm({ name: "", email: "", subject: "", message: "", company: "" });
    },
  });

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 16);
    const updateCursor = (event: PointerEvent) => {
      if (!cursorRef.current || !window.matchMedia("(pointer: fine)").matches) return;
      cursorRef.current.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursorRef.current.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("pointermove", updateCursor, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("pointermove", updateCursor);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || exploring.length < 2) return;
    const intervalId = window.setInterval(() => setLiveFocusIndex((index) => (index + 1) % exploring.length), 2800);
    return () => window.clearInterval(intervalId);
  }, [reduceMotion, exploring.length]);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.querySelector(item.href))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveNav(`#${entry.target.id}`)),
      { rootMargin: "-28% 0px -58% 0px", threshold: 0.05 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navigation]);

  useEffect(() => {
    if (!menuOpen) return;
    const originalOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };
    const closeOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!mobileNavRef.current?.contains(target) && !mobileMenuButtonRef.current?.contains(target)) setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.setTimeout(() => mobileNavRef.current?.querySelector<HTMLAnchorElement>("a")?.focus(), 0);
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (reduceMotion) {
      setIsImmersiveLoading(false);
      setIntroReady(true);
      return;
    }
    let frameId = 0;
    let finishTimer = 0;
    const startTime = performance.now();
    const duration = 1050;
    const animateLoading = (now: number) => {
      const ratio = Math.min((now - startTime) / duration, 1);
      setLoadProgress(Math.round(ratio * 100));
      if (ratio < 1) {
        frameId = requestAnimationFrame(animateLoading);
      } else {
        finishTimer = window.setTimeout(() => {
          setIsImmersiveLoading(false);
          setIntroReady(true);
        }, 180);
      }
    };
    frameId = requestAnimationFrame(animateLoading);
    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(finishTimer);
    };
  }, [reduceMotion]);

  const updateHeroGlow = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || !heroGlowRef.current || !window.matchMedia("(pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    heroGlowRef.current.style.setProperty("--glow-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    heroGlowRef.current.style.setProperty("--glow-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  };

  const handleLabTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keyToIndex: Record<string, number> = {
      ArrowDown: (index + 1) % lab.modules.length,
      ArrowRight: (index + 1) % lab.modules.length,
      ArrowUp: (index - 1 + lab.modules.length) % lab.modules.length,
      ArrowLeft: (index - 1 + lab.modules.length) % lab.modules.length,
      Home: 0,
      End: lab.modules.length - 1,
    };
    if (!(event.key in keyToIndex)) return;
    event.preventDefault();
    const nextIndex = keyToIndex[event.key];
    setActiveLab(nextIndex);
    labTabRefs.current[nextIndex]?.focus();
  };

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactSubmitted(false);
    contactMutation.mutate(contactForm);
  };

  return (
    <>
      <Suspense fallback={<div className="signal-field-fallback" aria-hidden="true" />}><SignalField /></Suspense>
      <div className={scrolled ? "signal-site is-scrolled" : "signal-site"}>
      <AnimatePresence>
        {isImmersiveLoading ? <motion.div className="immersion-loader" role="status" aria-live="polite" initial={{ opacity: 1 }} exit={{ y: "-105%" }} transition={{ duration: 0.72, ease: [0.77, 0, 0.175, 1] }}>
          <div className="loader-grid" aria-hidden="true" />
          <div className="loader-head"><span className="loader-mark-frame"><img src={brand.mark} alt="" /></span><span>JAINAM / SIGNAL EDITION</span></div>
          <div className="loader-center"><p>Preparing the portfolio</p><strong>{String(loadProgress).padStart(2, "0")}<i>%</i></strong><div className="loader-track"><span className="loader-progress" style={{ transform: `scaleX(${loadProgress / 100})` }} /><span className="loader-robot" style={{ left: `${Math.max(4, Math.min(96, loadProgress))}%` }} aria-hidden="true"><i className="robot-sprite"><i className="robot-antenna" /><i className="robot-head"><i className="robot-eye" /><i className="robot-eye" /></i><i className="robot-body" /><i className="robot-leg robot-leg-left" /><i className="robot-leg robot-leg-right" /></i></span></div><AnimatePresence mode="wait"><motion.p className="loader-hint" key={activeLoadingHint.label} initial={reduceMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: 0.18 }}><span>0{loadingHints.indexOf(activeLoadingHint) + 1} / {activeLoadingHint.label}</span>{activeLoadingHint.message}</motion.p></AnimatePresence></div>
          <p className="loader-foot">Build / Learn / Iterate</p>
        </motion.div> : null}
      </AnimatePresence>
      <motion.div className="scroll-progress" style={{ scaleX: smoothScroll }} aria-hidden="true" />
      <div className="signal-cursor" ref={cursorRef} aria-hidden="true" />
      <header className="signal-header">
        <a className="signal-brand" href="#top" aria-label="Jainam — back to top">
          <span className="signal-brand-mark"><img src={brand.mark} alt="" /></span>
          <span>{brand.name}</span>
        </a>
        <nav className="signal-nav" aria-label="Primary navigation">
          {navigation.map((item) => <a key={item.href} className={activeNav === item.href ? "is-active" : ""} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="header-cta" href="#contact">Let&apos;s connect <ArrowUpRight size={14} aria-hidden="true" /></a>
        <button ref={mobileMenuButtonRef} className="mobile-menu" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {menuOpen ? <nav ref={mobileNavRef} id="mobile-navigation" className="signal-mobile-nav" aria-label="Mobile navigation">{navigation.map((item) => <a key={item.href} className={activeNav === item.href ? "is-active" : ""} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}<a href="#contact" onClick={() => setMenuOpen(false)}>Let&apos;s connect</a></nav> : null}
      </header>

      <main id="top">
        <section className="signal-hero" aria-labelledby="hero-heading" onPointerMove={updateHeroGlow}>
          <div className="hero-responsive-glow" ref={heroGlowRef} aria-hidden="true" />
          <motion.div className="hero-wordmark" initial={reduceMotion ? false : { opacity: 0, scale: 0.92, x: -30 }} animate={reduceMotion || introReady ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.92, x: -30 }} transition={{ duration: 0.94, delay: 0.1, ease: "easeOut" }} style={reduceMotion ? undefined : { y: heroWordmarkY }} aria-hidden="true">JAINAM</motion.div>
          <div className="hero-grid-signal">
            <motion.div className="signal-hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={reduceMotion || introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.56, delay: 0.18, ease: "easeOut" }}>
              <p className="hero-label"><span className="signal-pip" />{brand.identity}</p>
              <div className="portfolio-owner"><span className="portfolio-owner-label">{hero.ownerLabel}</span><strong className="portfolio-owner-name">{hero.ownerName}</strong><span className="portfolio-title">{hero.ownerTitle}</span></div>
              <h1 id="hero-heading"><motion.span className="hero-headline-line" initial={reduceMotion ? false : { opacity: 0, y: 70 }} animate={reduceMotion || introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }} transition={{ duration: 0.72, delay: 0.3, ease: "easeOut" }}>Building ideas</motion.span><motion.span className="hero-headline-line" initial={reduceMotion ? false : { opacity: 0, y: 70 }} animate={reduceMotion || introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }} transition={{ duration: 0.72, delay: 0.42, ease: "easeOut" }}>into <em>intelligent</em></motion.span><motion.span className="hero-headline-line" initial={reduceMotion ? false : { opacity: 0, y: 70 }} animate={reduceMotion || introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }} transition={{ duration: 0.72, delay: 0.54, ease: "easeOut" }}>products.</motion.span></h1>
              <motion.p initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={reduceMotion || introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} transition={{ duration: 0.52, delay: 0.66 }}>{hero.support}</motion.p>
              <motion.div className="hero-profile-strip" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={reduceMotion || introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} transition={{ duration: 0.52, delay: 0.73 }}><div><span>{hero.aboutMeLabel}</span><p>{hero.aboutMe}</p></div><div><span>{hero.expertiseLabel}</span><ul>{hero.expertise.map((item) => <li key={item}>{item}</li>)}</ul></div></motion.div>
              <motion.div className="hero-buttons" initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={reduceMotion || introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} transition={{ duration: 0.52, delay: 0.82 }}><a href="#work" className="signal-button">Explore selected work <ArrowDownRight size={17} aria-hidden="true" /></a>{resumeAvailable ? <a href={resume.url} target="_blank" rel="noopener noreferrer" className="hero-resume-button">View resume <FileText size={15} aria-hidden="true" /></a> : null}<a href="#about" className="underlined-link">Read the notes <MoveRight size={16} aria-hidden="true" /></a></motion.div>
              <motion.div className="hero-live-signal" aria-live="polite" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={reduceMotion || introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} transition={{ duration: 0.45, delay: 0.94 }}><span><i />{hero.liveLabel}</span><AnimatePresence mode="wait"><motion.strong key={exploring[liveFocusIndex]} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>{exploring[liveFocusIndex]}</motion.strong></AnimatePresence></motion.div>
            </motion.div>
            <motion.div className="signal-hero-art" style={reduceMotion ? undefined : { y: heroArtifactY }} initial={reduceMotion ? false : { opacity: 0, scale: 0.93 }} animate={reduceMotion || introReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.93 }} transition={{ duration: 1.06, delay: 0.24, ease: "easeOut" }}>
              <div className="hero-orbit-system" aria-hidden="true"><span className="hero-orbit hero-orbit-one"><i /></span><span className="hero-orbit hero-orbit-two"><i /></span><span className="hero-orbit hero-orbit-three"><i /></span><span className="hero-orbit-core"><i /><b /></span><small>SIGNAL / 001</small></div>
              <motion.img src={hero.art} alt="Anonymous chrome sculpture illuminated by an ember-red ribbon of light" initial={reduceMotion ? false : { clipPath: "inset(12% 0 12% 0)", scale: 1.12 }} animate={reduceMotion || introReady ? { clipPath: "inset(0% 0 0% 0)", scale: 1 } : { clipPath: "inset(12% 0 12% 0)", scale: 1.12 }} transition={{ duration: 1.12, delay: 0.3, ease: "easeOut" }} />
              <motion.span className="art-frame frame-one" initial={reduceMotion ? false : { opacity: 0, x: -28, y: -28 }} animate={reduceMotion || introReady ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -28, y: -28 }} transition={{ duration: 0.6, delay: 0.75 }} /><motion.span className="art-frame frame-two" initial={reduceMotion ? false : { opacity: 0, x: 28, y: 28 }} animate={reduceMotion || introReady ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 28, y: 28 }} transition={{ duration: 0.6, delay: 0.85 }} />
              <motion.div className="hero-stage-card" initial={reduceMotion ? false : { opacity: 0, y: 32 }} animate={reduceMotion || introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }} transition={{ duration: 0.56, delay: 0.94 }}><span>Current state</span><strong>Student / Builder / AI Explorer</strong><small>Ideas in active formation.</small></motion.div>
            </motion.div>
          </div>
          <div className="hero-scroll"><span>Scroll to explore</span><span>01 / 13</span></div>
        </section>

        <div className="signal-ticker" aria-hidden="true"><div className="ticker-track"><span>BUILD · LEARN · ITERATE</span><b>✦</b><span>JAINAM / SIGNAL EDITION</span><b>✦</b><span>IDEAS IN ACTIVE FORMATION</span><b>✦</b><span>BUILD · LEARN · ITERATE</span><b>✦</b><span>JAINAM / SIGNAL EDITION</span><b>✦</b></div></div>

        <section id="about" className="signal-section about-spread" aria-labelledby="about-heading">
          <motion.div {...inView}>
            <SectionKicker number="01" title="About" />
            <div className="about-headline about-profile-grid"><div><h2 id="about-heading">{about.title}</h2><p className="about-lede">{about.lead}</p></div><div className="about-statement"><p>{about.body}</p><p className="about-positioning">{brand.positioning}</p></div></div>
          </motion.div>
          <div className="profile-fact-grid" aria-label="Professional profile details">{about.profileFacts.map((fact, index) => <motion.article {...inView} transition={{ duration: 0.55, delay: index * 0.08 }} key={fact.label}><span>0{index + 1} / {fact.label}</span><p>{fact.value}</p></motion.article>)}</div>
          <div className="interest-magnet" aria-label="Areas of interest">{about.interests.map((interest, index) => <motion.span {...inView} transition={{ duration: 0.52, delay: index * 0.045 }} className={`interest-${index + 1}`} key={interest}>{interest}</motion.span>)}</div>
        </section>

        <section className="signal-section status-spread" aria-labelledby="status-heading">
          <motion.div {...inView} className="status-title-lockup"><SectionKicker number="02" title="Current coordinates" /><h2 id="status-heading">{status.title}</h2></motion.div>
          <div className="status-mosaic">{status.items.map((item, index) => <motion.article {...inView} transition={{ duration: 0.42, delay: index * 0.05 }} key={item.label} className={`status-tile tile-${index + 1}`}><span>{item.label}</span><p>{item.value}</p><i aria-hidden="true">0{index + 1}</i></motion.article>)}</div>
        </section>

        <section id="work" className="signal-section work-spread" aria-labelledby="work-heading">
          <motion.div {...inView} className="work-heading"><div><SectionKicker number="03" title="Selected work" /><h2 id="work-heading">The work,<br /><em>before the proof.</em></h2></div><p>Each record keeps the present state of the work visible. No concept is presented as a shipped product.</p></motion.div>
          <div className="project-gallery">
            {projects.map((project, index) => (
              <motion.article {...inView} whileHover={reduceMotion ? undefined : { y: -9 }} transition={{ duration: index === 0 ? 0.82 : 0.5, delay: index * 0.07 }} key={project.title} className={index === 0 ? "project-feature focuspath-feature" : "project-card"}>
                <motion.div className="project-image-wrap" initial={reduceMotion ? false : { opacity: 0, x: index === 0 ? -42 : -18, scale: 0.97 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: index === 0 ? 0.8 : 0.5, delay: index === 0 ? 0.12 : index * 0.05 }}>
                  {"media" in project && project.media ? <img src={project.media} alt={`Abstract visual for ${project.title}`} /> : <div className="fallback-art"><span>J</span></div>}
                  <span className="project-number">{project.index}</span>
                  <span className="project-stage">{project.status}</span>
                </motion.div>
                <motion.div className="project-info" initial={reduceMotion ? false : { opacity: 0, x: index === 0 ? 42 : 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: index === 0 ? 0.8 : 0.5, delay: index === 0 ? 0.22 : index * 0.06 }}>
                  <p>{project.categories}</p><h3>{project.title}</h3><span>{project.role}</span><span className="project-focus">{project.focusLabel}</span>
                  <div className="project-info-bottom">
                    <p>{project.summary}</p>
                    <details><summary>Case study <ChevronDown size={15} aria-hidden="true" /></summary><div className="case-grid">{Object.entries(project.caseStudy).map(([label, value]) => <div key={label}><b>{label}</b><p>{value}</p></div>)}</div></details>
                    {"externalAction" in project && project.externalAction ? <motion.a className="project-external-action" href={project.externalAction.href} target="_blank" rel="noopener noreferrer" whileHover={reduceMotion ? undefined : { x: 5 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}><span><b>{project.externalAction.label}</b><small>{project.externalAction.detail}</small></span><Download size={17} aria-hidden="true" /></motion.a> : null}
                    {"releaseAsset" in project && project.releaseAsset ? (() => { const releaseAsset = project.releaseAsset as { href: string; label: string; detail: string }; return <a className="project-release-asset" href={releaseAsset.href} download><span>{releaseAsset.label}</span><small>{releaseAsset.detail}</small></a>; })() : null}
                  </div>
                </motion.div>
                {project.contributions.length > 0 ? <div className="project-contributions"><span>Key contributions</span><ul>{project.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}</ul></div> : null}
              </motion.article>
            ))}
          </div>
        </section>

        <div className="signal-ticker ticker-paper" aria-hidden="true"><div className="ticker-track"><span>FOCUS / DIRECTION / SYSTEMS</span><b>✦</b><span>THE WORK BEFORE THE PROOF</span><b>✦</b><span>FOCUS / DIRECTION / SYSTEMS</span><b>✦</b><span>THE WORK BEFORE THE PROOF</span><b>✦</b></div></div>

        <section className="capability-spread" aria-labelledby="capabilities-heading">
          <div className="signal-section"><motion.div {...inView}><SectionKicker number="04" title="Capabilities" /><div className="capability-intro"><h2 id="capabilities-heading">Tools for thinking<br /><em>in public.</em></h2><p>Grouped by the work they support, without invented proficiency levels.</p></div></motion.div><div className="capability-poster-grid">{skills.map((group, index) => <motion.article {...inView} transition={{ duration: 0.5, delay: index * 0.07 }} key={group.title} className={`capability-poster poster-${index + 1}`}><span>0{index + 1}</span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul><i>J</i></motion.article>)}</div></div>
        </section>

        <section className="signal-section process-spread" aria-labelledby="process-heading">
          <motion.div {...inView} className="process-caption"><SectionKicker number="05" title="How I build" /><h2 id="process-heading">A small loop.<br /><em>Repeated seriously.</em></h2></motion.div>
          <div className="process-collage">{process.map((step, index) => <motion.article {...inView} transition={{ duration: 0.4, delay: index * 0.05 }} key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.detail}</p><i aria-hidden="true">{index === process.length - 1 ? "→" : "+"}</i></motion.article>)}</div>
        </section>

        <section className="signal-section bring-spread" aria-labelledby="bring-heading">
          <motion.div {...inView} className="bring-header"><SectionKicker number="06" title="What I bring" /><h2 id="bring-heading">Strengths connected<br />to the work.</h2></motion.div>
          <div className="strength-stories">{strengths.map((strength, index) => <motion.article {...inView} transition={{ duration: 0.42, delay: index * 0.05 }} key={strength.title}><span className="strength-index">0{index + 1}</span><h3>{strength.title}</h3><p>{strength.statement}</p><small>Evidence / {strength.evidence}</small></motion.article>)}</div>
        </section>

        <section className="signal-section experience-spread" aria-labelledby="experience-heading">
          <motion.div {...inView}><SectionKicker number="07" title="Building experience" /></motion.div><motion.article {...inView} transition={{ duration: 0.7, delay: 0.12 }}><span>{experience.label}</span><h2 id="experience-heading">{experience.title}</h2><p>{experience.description}</p><i aria-hidden="true">J</i></motion.article>
        </section>

        <section className="achievement-spread" aria-labelledby="achievements-heading"><div className="signal-section"><motion.div {...inView}><SectionKicker number="08" title={achievements.title} /></motion.div><motion.div {...inView} transition={{ duration: 0.75, delay: 0.12 }} className="achievement-card"><span>Milestone record / not yet documented</span><h2 id="achievements-heading">{achievements.detail}</h2><p>No confirmed achievements or milestones have been added yet.</p><div className="achievement-orbit" aria-hidden="true"><i /><b /></div></motion.div></div></section>

        <section className="signal-section exploring-spread" aria-labelledby="exploring-heading"><motion.div {...inView}><SectionKicker number="09" title="Currently exploring" /><h2 id="exploring-heading">Questions worth<br /><em>staying with.</em></h2></motion.div><div className="exploration-grid">{exploring.map((topic, index) => <motion.span {...inView} transition={{ duration: 0.5, delay: index * 0.06 }} key={topic} className={`explore-${index + 1}`}>{topic}<i>{String(index + 1).padStart(2, "0")}</i></motion.span>)}</div></section>

        <section className="signal-section philosophy-spread" aria-labelledby="philosophy-heading"><motion.div {...inView}><p className="philosophy-small">10 / Philosophy</p><blockquote id="philosophy-heading">“{philosophy.quote}”</blockquote><p>{philosophy.body}</p></motion.div></section>

        <section className="journey-spread" aria-labelledby="journey-heading"><div className="signal-section"><motion.div {...inView}><SectionKicker number="11" title="Journey" /><div className="journey-title"><h2 id="journey-heading">A direction,<br /><em>not a timeline.</em></h2><span>Onward / 2026</span></div></motion.div><ol>{journey.map((stage, index) => <motion.li {...inView} transition={{ duration: 0.48, delay: index * 0.09 }} key={stage} className={index === journey.length - 1 ? "journey-now" : ""}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong></motion.li>)}</ol></div></section>

        <section id="lab" className="lab-spread" aria-labelledby="lab-heading"><div className="lab-inner"><motion.div {...inView} className="lab-title"><SectionKicker number="12" title="Signature feature" /><h2 id="lab-heading">JAINAM /<br /><em>LAB</em></h2><p>{lab.body}</p></motion.div><motion.div {...inView} transition={{ duration: 0.68, delay: 0.14 }} className="lab-interface"><div role="tablist" aria-label="Jainam Lab focus modules" aria-orientation="vertical">{lab.modules.map((module, index) => <button ref={(element) => { labTabRefs.current[index] = element; }} type="button" id={`lab-tab-${index}`} role="tab" aria-selected={activeLab === index} aria-controls={`lab-panel-${index}`} tabIndex={activeLab === index ? 0 : -1} onKeyDown={(event) => handleLabTabKeyDown(event, index)} onClick={() => setActiveLab(index)} className={activeLab === index ? "is-active" : ""} key={module}><span>0{index + 1}</span>{module}<ArrowUpRight size={15} aria-hidden="true" /></button>)}</div><motion.div key={lab.modules[activeLab]} id={`lab-panel-${activeLab}`} role="tabpanel" aria-labelledby={`lab-tab-${activeLab}`} tabIndex={0} className="lab-output" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.34 }}><span>Working note / 0{activeLab + 1} · {activeLabNote.stage}</span><h3>{lab.modules[activeLab]}</h3><p className="lab-question">{activeLabNote.question}</p><p className="lab-summary">{activeLabNote.summary}</p><div className="lab-next"><b>Next experiment</b><p>{activeLabNote.next}</p></div><i>Active direction →</i></motion.div></motion.div></div></section>

        <section className="signal-section resume-spread" aria-labelledby="resume-heading"><motion.div {...inView}><SectionKicker number="13" title="Resume" /></motion.div><motion.div {...inView} transition={{ duration: 0.68, delay: 0.12 }} className="resume-poster"><FileText size={35} aria-hidden="true" /><div><h2 id="resume-heading">{resume.title}</h2><p>{resume.body}</p><small>{resume.fileLabel}</small></div><div className="resume-links">{resumeAvailable ? <><a href={resume.url} target="_blank" rel="noopener noreferrer">View <ExternalLink size={15} aria-hidden="true" /></a><a href={resume.url} download>Download <Download size={15} aria-hidden="true" /></a></> : <><button disabled>View</button><button disabled>Download</button></>}</div></motion.div></section>
      </main>

      <footer id="contact" className="signal-footer" aria-labelledby="contact-heading"><div className="signal-section"><motion.div {...inView}><p className="footer-label">JAINAM / Signal contact</p><div className="footer-layout"><div><h2 id="contact-heading">{contact.title}</h2><p>{contact.body}</p></div><a href={`mailto:${contact.email}`} className="footer-email"><Mail size={18} aria-hidden="true" /> {contact.email}</a></div></motion.div><motion.form {...inView} transition={{ duration: 0.58, delay: 0.18 }} className="contact-form" onSubmit={handleContactSubmit} noValidate><div className="contact-form-intro"><span>Send a message</span><p>Share a project, opportunity, or question. Your message is stored in Jainam’s portfolio inbox.</p></div><div className="contact-form-grid"><label>Name<input value={contactForm.name} onChange={(event) => setContactForm((current) => ({ ...current, name: event.target.value }))} name="name" autoComplete="name" minLength={2} maxLength={120} required /></label><label>Email<input value={contactForm.email} onChange={(event) => setContactForm((current) => ({ ...current, email: event.target.value }))} name="email" type="email" autoComplete="email" maxLength={320} required /></label><label className="contact-form-wide">Subject<input value={contactForm.subject} onChange={(event) => setContactForm((current) => ({ ...current, subject: event.target.value }))} name="subject" minLength={3} maxLength={160} required /></label><label className="contact-form-wide">Message<textarea value={contactForm.message} onChange={(event) => setContactForm((current) => ({ ...current, message: event.target.value }))} name="message" minLength={15} maxLength={5000} rows={5} required /></label><label className="contact-honeypot" aria-hidden="true">Company<input value={contactForm.company} onChange={(event) => setContactForm((current) => ({ ...current, company: event.target.value }))} name="company" tabIndex={-1} autoComplete="off" /></label></div><div className="contact-form-actions"><button type="submit" disabled={contactMutation.isPending}>{contactMutation.isPending ? "Sending message…" : "Send message"} <ArrowUpRight size={16} aria-hidden="true" /></button><div aria-live="polite">{contactSubmitted ? <p className="contact-success">Message sent. Thank you for reaching out.</p> : null}{contactMutation.error ? <p className="contact-error">{contactMutation.error.message}</p> : null}</div></div></motion.form><motion.div {...inView} transition={{ duration: 0.55, delay: 0.28 }} className="footer-bottom"><div className="social-line">{contact.social.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"><SocialIcon label={social.label} />{social.label}<ArrowUpRight size={13} aria-hidden="true" /></a>)}</div><div><span>Languages / {contact.languages}</span><span>{brand.positioning}</span></div></motion.div></div></footer>
      </div>
    </>
  );
}
