"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Flower2, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { branches, menu, scenes } from "./content";

const motionPreference = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(callback: () => void) {
  const preference = window.matchMedia(motionPreference);
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(motionPreference).matches,
    () => false,
  );
}

const easing = [0.22, 1, 0.36, 1] as const;
export function Navigation({ isBranch = false, hasMenuShowcase = false }: { isBranch?: boolean; hasMenuShowcase?: boolean }) {
  const nav = isBranch
    ? [{ title: "ONNI Brand", href: "/" }, { title: "The house", href: "#story" }, ...(hasMenuShowcase ? [{ title: "Menu", href: "#menu" }] : []), { title: "Other locations", href: "#visit" }]
    : [{ title: "Our story", href: "#story" }, { title: "Locations", href: "#visit" }, { title: "Atmosphere", href: "#atmosphere" }];
  const visit = isBranch ? "#branch-visit" : "#visit";
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 35 });

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href={isBranch ? "/" : "#top"} onClick={() => setOpen(false)}>onni<span>HOUSE</span></Link>
        <nav aria-label="Main" className="desktop-nav">{nav.map((item) => <Link key={item.href} href={item.href}>{item.title}</Link>)}</nav>
        <MagneticLink className="button header-visit" href={visit}>Plan a visit</MagneticLink>
        <button ref={toggle} className="nav-toggle icon-button" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls={open ? "mobile-nav" : undefined} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {open && <motion.nav id="mobile-nav" aria-label="Mobile" className="mobile-nav" initial={reduced ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .24 }}>
          {[...nav, { title: "Plan a visit", href: visit }].map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.title}</Link>)}
        </motion.nav>}
      </AnimatePresence>
      {!reduced && <motion.div className="progress" aria-hidden="true" style={{ scaleX: progress }} />}
    </header>
  );
}

function MagneticLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, { stiffness: 260, damping: 24 });
  const y = useSpring(offsetY, { stiffness: 260, damping: 24 });

  return <motion.a className={className} href={href} style={reduced ? undefined : { x, y }} whileTap={reduced ? undefined : { scale: .97 }}
    onPointerMove={(event) => {
      if (reduced || event.pointerType !== "mouse") return;
      const box = event.currentTarget.getBoundingClientRect();
      offsetX.set((event.clientX - box.left - box.width / 2) * .14);
      offsetY.set((event.clientY - box.top - box.height / 2) * .19);
    }}
    onPointerLeave={() => { offsetX.set(0); offsetY.set(0); }}>{children}</motion.a>;
}

export function Hero({ branch }: { branch?: (typeof branches)[number] }) {
  const title = branch?.title ?? ["Happiness", "in everyday."];
  const image = branch?.image ?? "florist";
  const alt = branch?.alt ?? "Illustrative flower studio worktable with roses, cosmos and floral shears";
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.01, 1.12]);
  const line = (delay: number) => ({
    initial: reduced ? false as const : { y: "105%" },
    animate: { y: 0 },
    transition: { duration: reduced ? 0 : .82, delay: reduced ? 0 : delay, ease: easing },
  });

  return (
    <section ref={ref} id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><Flower2 size={17} aria-hidden="true" /> {branch?.name ?? "ONNI HOUSE"}</p>
        <h1 id="hero-title"><span className="mask"><motion.span {...line(.04)}>{title[0]}</motion.span></span><span className="mask"><motion.em {...line(.12)}>{title[1]}</motion.em></span></h1>
        <motion.div initial={reduced ? false : { opacity: .4 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : .25, duration: .45 }}>
          <p className="hero-description">{branch?.description ?? "Kitchen, florist and things for the home. Discover our houses in Jakarta and Surabaya."}</p>
          <MagneticLink href={branch ? "#branch-visit" : "#visit"} className="button hero-button">{branch ? "Plan a visit" : "Explore our locations"}</MagneticLink>
        </motion.div>
      </div>
      <motion.figure className="hero-image" initial={reduced ? false : { clipPath: "inset(0 0 0 7%)" }} animate={{ clipPath: "inset(0 0 0 0%)" }} transition={{ duration: reduced ? 0 : .95, ease: easing }}>
        <motion.div className="hero-image-fill" style={reduced ? undefined : { y, scale }}>
          <Image src={`/images/${image}.webp`} alt={alt} fill preload sizes="(max-width: 760px) 100vw, 63vw" />
        </motion.div>
        <figcaption>THE ONNI HOUSE MOOD <span>ILLUSTRATIVE IMAGERY</span></figcaption>
      </motion.figure>
    </section>
  );
}

export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.figure className={className} initial={reduced ? false : { clipPath: "inset(0 0 9% 0)" }} whileInView={{ clipPath: "inset(0 0 0 0)" }} viewport={{ once: true, amount: .22 }} transition={{ duration: reduced ? 0 : .8, ease: easing }}>{children}</motion.figure>;
}

export function MenuShowcase({ menuUrl }: { menuUrl: string }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const item = menu[active];

  return (
    <section id="menu" className="menu-section">
      <div className="container menu-grid">
        <div>
          <p className="eyebrow"><Flower2 size={16} aria-hidden="true" /> THE KITCHEN</p>
          <h2>Pull up <em>a chair.</em></h2>
          <p className="section-description">Indonesian comfort food, Asian flavors and Western favorites, with coffee and cake for the afternoon.</p>
          <div className="menu-options" aria-label="Menu highlights">
            {menu.map((entry, index) => <motion.button key={entry.title} type="button" aria-pressed={index === active} onClick={() => setActive(index)} whileTap={reduced ? undefined : { scale: .985 }}>
              {index === active && <motion.span className="menu-highlight" layoutId="menu-highlight" transition={{ duration: reduced ? 0 : .35, ease: easing }} />}
              <span>{entry.label}</span><ChevronRight size={18} aria-hidden="true" />
            </motion.button>)}
          </div>
          <a className="text-link" href={menuUrl} target="_blank" rel="noreferrer">View the full Jakarta menu</a>
        </div>
        <div className="menu-feature" aria-live="polite">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.figure key={item.title} initial={reduced ? false : { opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .36, ease: easing }}>
              <div className="image-frame"><Image src={`/images/${item.image}.webp`} alt={item.alt} fill sizes="(max-width: 760px) 95vw, 52vw" /></div>
              <figcaption><div><h3>{item.title}</h3><p>{item.description}</p></div>{item.price && <div className="price">{item.price}<small>Before tax &amp; service</small></div>}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();
  const scene = scenes[active];
  const select = (index: number, step: number) => {
    setDirection(step);
    setActive((index + scenes.length) % scenes.length);
  };

  return (
    <section className="gallery container" id="atmosphere" aria-labelledby="gallery-title">
      <div className="gallery-head">
        <div><p className="eyebrow"><Flower2 size={16} aria-hidden="true" /> THE ATMOSPHERE</p><h2 id="gallery-title">Room to <em>slow down.</em></h2></div>
        <p>Flowers, sunlit corners, and seasonal installations that give the house a different look with each visit.</p>
      </div>
      <div className="gallery-stage" onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          const step = event.key === "ArrowLeft" ? -1 : 1;
          select(active + step, step);
        }
      }}>
        <AnimatePresence initial={false}>
          <motion.div className="gallery-image" key={scene.image} initial={reduced ? false : { opacity: 0, x: direction * 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .45, ease: easing }} drag={reduced ? false : "x"} dragConstraints={{ left: 0, right: 0 }} dragElastic={.14} onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 35) {
              const step = info.offset.x < 0 ? 1 : -1;
              select(active + step, step);
            }
          }}>
            <Image src={`/images/${scene.image}.webp`} alt={scene.alt} fill draggable={false} sizes="(max-width: 760px) 95vw, 88vw" />
          </motion.div>
        </AnimatePresence>
        <div className="gallery-controls">
          <button type="button" className="icon-button" aria-label="Previous image" onClick={() => select(active - 1, -1)}><ChevronLeft /></button>
          <button type="button" className="icon-button" aria-label="Next image" onClick={() => select(active + 1, 1)}><ChevronRight /></button>
        </div>
      </div>
      <div className="gallery-caption"><p aria-live="polite">{scene.title} <span>· Illustrative imagery</span></p><div className="gallery-dots">{scenes.map((entry, index) => <button key={entry.image} type="button" aria-label={entry.title} aria-pressed={index === active} onClick={() => select(index, index > active ? 1 : -1)} />)}</div></div>
    </section>
  );
}
