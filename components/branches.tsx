import Link from "next/link";
import Image from "next/image";
import { Camera, MapPin, Phone } from "lucide-react";
import { branchHref, branches } from "./content";
import { BranchChapters } from "./branch-chapters";

export function BranchDirectory({ current }: { current?: string }) {
  if (!current) return <BranchStory />;

  return (
    <section id="visit" className="branch-directory">
      <div className="container">
        <p className="eyebrow"><MapPin size={16} aria-hidden="true" /> JAKARTA &amp; SURABAYA</p>
        <h2>Find another <em>house.</em></h2>
        <div className="branch-grid">
          {branches.filter((branch) => branch.slug !== current).map((branch) => (
            <Link key={branch.slug} href={branchHref(branch.slug)} className="branch-card">
              <div className="image-frame"><Image src={`/images/${branch.image}.webp`} alt="" fill sizes="(max-width: 760px) 90vw, 30vw" /></div>
              <div className="branch-card-copy">
                <p>{branch.area}</p>
                <h3>{branch.name}</h3>
                <span>Explore this house</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function BranchStory() {
  return (
    <section id="visit" className="branch-story" aria-labelledby="branch-story-title">
      <header className="container branch-story-heading">
        <p className="eyebrow"><MapPin size={16} aria-hidden="true" /> JAKARTA &amp; SURABAYA</p>
        <h2 id="branch-story-title">Find your <em>ONNI.</em></h2>
      </header>
      <BranchChapters />
    </section>
  );
}

export function BranchVisit({ branch }: { branch: (typeof branches)[number] }) {
  return (
    <section className="visit-section" id="branch-visit">
      <div className="container visit-grid">
        <div><p className="eyebrow"><MapPin size={16} aria-hidden="true" /> {branch.area}</p><h2>Come on <em>over.</em></h2></div>
        <div className="visit-panel">
          <h3>{branch.name}</h3>
          <address className="branch-address">{branch.address}</address>
          <p>{branch.hours}</p>
          <a className="phone" href={`tel:${branch.tel}`}><Phone size={15} aria-hidden="true" /> {branch.phone}</a>
          <div className="visit-actions">
            <a className="button" href={branch.maps} target="_blank" rel="noreferrer">Get directions</a>
            <a className="button secondary" href={branch.whatsapp ?? `tel:${branch.tel}`} target={branch.whatsapp ? "_blank" : undefined} rel={branch.whatsapp ? "noreferrer" : undefined}>{branch.whatsapp ? "WhatsApp reservations" : "Call to reserve"}</a>
            <a className="text-link" href={branch.menu} target="_blank" rel="noreferrer">Location menu</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ instagram = "https://www.instagram.com/onnihouse.jkt/" }: { instagram?: string }) {
  return (
    <footer>
      <div className="container footer-inner">
        <div><Link className="wordmark" href="/">onni<span>HOUSE</span></Link><p>Happiness in everyday.</p></div>
        <div className="footer-links">
          <a href={instagram} target="_blank" rel="noreferrer"><Camera size={17} aria-hidden="true" /> Instagram</a>
          <a href="mailto:info@onni.co.id">Email ONNI</a>
          <a href="https://onni.co.id/" target="_blank" rel="noreferrer">Flower shop</a>
        </div>
        <p className="footer-note">Atmosphere and food imagery is illustrative.</p>
      </div>
    </footer>
  );
}
