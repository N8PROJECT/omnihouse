import { Flower2 } from "lucide-react";
import Image from "next/image";
import { BranchDirectory, SiteFooter } from "../components/branches";
import { Gallery, Hero, Navigation, Reveal } from "../components/experience";

export default function Home() {
  return (
    <div className="site-shell" data-theme="brand">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Hero />
        <section id="story" className="story container">
          <Reveal className="story-photo">
            <div className="image-frame"><Image src="/images/entrance.webp" alt="Illustrative heritage house entrance framed with flowers" fill sizes="(max-width: 760px) 95vw, 50vw" /></div>
            <figcaption>At the florist’s worktable <span>Illustrative imagery</span></figcaption>
          </Reveal>
          <div className="story-copy">
            <p className="eyebrow"><Flower2 size={16} aria-hidden="true" /> OUR STORY</p>
            <h2>It started<br />with <em>flowers.</em></h2>
            <p>ONNI began as a flower studio. In 2018 we opened a house in Tanjung Duren that brought our flowers, kitchen and favorite things for the home together under one roof.</p>
            <p>ONNI means happiness in Finnish. For us, it’s in the everyday things. Flowers on the table. A meal shared. A little time to slow down.</p>
            <a className="text-link" href="https://onni.co.id/" target="_blank" rel="noreferrer">Explore the flower shop</a>
          </div>
        </section>
        <BranchDirectory />
        <Gallery />
      </main>
      <SiteFooter />
    </div>
  );
}
