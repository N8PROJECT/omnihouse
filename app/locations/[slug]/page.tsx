import type { Metadata } from "next";
import { Flower2 } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BranchDirectory, BranchVisit, SiteFooter } from "../../../components/branches";
import { branches } from "../../../components/content";
import { Hero, MenuShowcase, Navigation, Reveal } from "../../../components/experience";

type Props = { params: Promise<{ slug: string }> };

async function getBranch(params: Props["params"]) {
  const { slug } = await params;
  return branches.find((branch) => branch.slug === slug) ?? notFound();
}

export function generateStaticParams() {
  return branches.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const branch = await getBranch(params);
  return {
    title: `${branch.name} | ONNI House`,
    description: branch.description,
    openGraph: { title: branch.name, description: branch.description, type: "website" },
  };
}

export default async function BranchPage({ params }: Props) {
  const branch = await getBranch(params);
  const hasMenuShowcase = branch.slug === "tanjung-duren";

  return (
    <div className="site-shell" data-theme={branch.style}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation isBranch hasMenuShowcase={hasMenuShowcase} />
      <main id="main" tabIndex={-1}>
        <Hero branch={branch} />
        <section id="story" className="story container">
          <Reveal className="story-photo">
            <div className="image-frame"><Image src={`/images/${branch.detailImage}.webp`} alt={branch.detailAlt} fill sizes="(max-width: 760px) 95vw, 55vw" /></div>
            <figcaption>{branch.name} <span>Illustrative imagery</span></figcaption>
          </Reveal>
          <div className="story-copy">
            <p className="eyebrow"><Flower2 size={16} aria-hidden="true" /> AT THE HOUSE</p>
            <h2>{branch.feature}</h2>
            <p>{branch.story}</p>
            <a className="text-link" href={branch.menu} target="_blank" rel="noreferrer">Explore the menu</a>
          </div>
        </section>
        {hasMenuShowcase && <MenuShowcase menuUrl={branch.menu} />}
        <BranchVisit branch={branch} />
        <BranchDirectory current={branch.slug} />
      </main>
      <SiteFooter instagram={branch.instagram} />
    </div>
  );
}
