import { Camera, Flower2 } from "lucide-react";
import Image from "next/image";
import { Gallery, Hero, MenuShowcase, Navigation, Reveal, Visit } from "../components/experience";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Hero />
        <div className="house-strip" aria-label="Kitchen, flower studio and home living">
          <span>Kitchen</span><Flower2 aria-hidden="true" /><span>Flower Studio</span><Flower2 aria-hidden="true" /><span>Home &amp; Living</span>
        </div>
        <section id="story" className="story container">
          <Reveal className="story-photo">
            <div className="image-frame"><Image src="/images/florist.webp" alt="Illustrative florist worktable with hand-cut flowers" fill sizes="(max-width: 760px) 95vw, 50vw" /></div>
            <figcaption>At the florist’s worktable <span>Illustrative imagery</span></figcaption>
          </Reveal>
          <div className="story-copy">
            <p className="eyebrow"><Flower2 size={16} aria-hidden="true" /> OUR STORY</p>
            <h2>It started<br />with <em>flowers.</em></h2>
            <p>In 2018, we opened the doors of an old house in Tanjung Duren and brought our flower studio, kitchen and favorite things for the home together under one roof.</p>
            <p>ONNI means happiness in Finnish. For us, it’s in the everyday things. Flowers on the table. A meal shared. A little time to slow down.</p>
            <a className="text-link" href="https://onni.co.id/" target="_blank" rel="noreferrer">Explore the flower shop</a>
          </div>
        </section>
        <MenuShowcase />
        <Gallery />
        <Visit />
      </main>
      <footer>
        <div className="container footer-inner">
          <div><a className="wordmark" href="#top">onni<span>HOUSE</span></a><p>Happiness in everyday.</p></div>
          <div className="footer-links"><a href="https://www.instagram.com/onnihouse.jkt/" target="_blank" rel="noreferrer"><Camera size={17} /> Instagram</a><a href="mailto:info@onni.co.id">Email ONNI</a><a href="https://onni.co.id/" target="_blank" rel="noreferrer">Flower shop</a></div>
          <p className="footer-note">Atmosphere and food imagery is illustrative.</p>
        </div>
      </footer>
    </>
  );
}
