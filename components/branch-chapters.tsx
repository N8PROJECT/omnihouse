"use client";

import { MapPin } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { branchHref, branches } from "./content";

const intro = 0.06;
const chapterSpan = (1 - intro) / branches.length;

export function BranchChapters() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const activeRef = useRef(-1);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = progress < intro ? -1 : Math.min(branches.length - 1, Math.floor((progress - intro) / chapterSpan));
    if (next === activeRef.current) return;

    const previous = branches[activeRef.current];
    if (previous && document.getElementById(`panel-${previous.slug}`)?.contains(document.activeElement)) {
      document.getElementById(`chapter-${previous.slug}`)?.focus({ preventScroll: true });
    }
    activeRef.current = next;
    setActive(next);
  });

  function scrollToChapter(index: number) {
    const element = track.current;
    if (!element) return;
    const progress = index === active ? 0 : intro + (index + 0.23) * chapterSpan;
    const bounds = element.getBoundingClientRect();
    const top = window.scrollY + bounds.top + progress * (bounds.height - window.innerHeight);
    window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <div ref={track} className="chapter-track">
      <ul className="branch-chapters" aria-label="ONNI locations">
        {branches.map((branch, index) => {
          const expanded = active === index;
          return (
            <li key={branch.slug} className="branch-chapter" data-active={expanded} data-theme={branch.style}>
              <h3>
                <button type="button" id={`chapter-${branch.slug}`} className="chapter-heading" aria-expanded={expanded} aria-controls={`panel-${branch.slug}`} onClick={() => scrollToChapter(index)}>
                  {branch.name}
                </button>
              </h3>
              <div className="chapter-body" id={`panel-${branch.slug}`} inert={!expanded} aria-hidden={!expanded}>
                <div className="branch-chapter-panel">
                  <div className="chapter-image">
                    <Image src={`/images/${branch.image}.webp`} alt={branch.alt} fill sizes="(max-width: 760px) 100vw, 65vw" />
                  </div>
                  <div className="chapter-content">
                    <div>
                      <p className="eyebrow"><MapPin size={16} aria-hidden="true" /> {branch.area}</p>
                      <p className="chapter-feature">{branch.feature}</p>
                      <p className="chapter-description">{branch.description}</p>
                      <Link className="button chapter-link" href={branchHref(branch.slug)}>Explore {branch.name}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
