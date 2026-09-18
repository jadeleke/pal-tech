import './about.css';

const photos = [
  { src: 'about-group.webp', alt: 'PAL Tech participants gathered for a group photograph.', caption: 'Our learning community' },
  { src: 'about-garden.webp', alt: 'PAL Tech participants standing together outdoors beneath trees.', caption: 'Growing together' },
  { src: 'about-moment.webp', alt: 'A candid group photograph of PAL Tech participants outdoors.', caption: 'Moments from the program' },
  { src: 'about-together.webp', alt: 'PAL Tech participants posing together for an outdoor group selfie.', caption: 'A shared journey' },
];

export default function AboutPage() {
  return <section className="page content-section about-page">
    <header className="about-intro"><span className="eyebrow">ABOUT US</span><h1>Learning together. Building what comes next.</h1><p>PAL Tech Learning Hub helps children explore technology through lessons, practical projects and play. It carries the Play & Learn Foundation learning journey beyond the classroom.</p></header>
    <section className="about-lead" aria-labelledby="program-lead"><span className="foundation-logo-crop legacy-logo"><img className="foundation-logo" src="/play-learn-foundation-logo.png" alt="Play & Learn Foundation"/></span><div><span className="eyebrow">PROGRAM LEAD</span><h2 id="program-lead">Joseph Adeleke</h2><p>Joseph Adeleke leads the PAL Tech program, a learning journey that encourages young people to explore, practise and create with technology.</p></div></section>
    <section aria-labelledby="community-title"><div className="section-heading"><div><span className="eyebrow">OUR COMMUNITY</span><h2 id="community-title">The people behind the learning</h2><p>Shared moments from the PAL Tech program.</p></div></div><div className="about-gallery">{photos.map(photo=><figure key={photo.src}><img src={`/${photo.src}`} alt={photo.alt} loading="lazy" decoding="async" width={photo.src==='about-garden.webp'?720:1440} height={photo.src==='about-garden.webp'?1280:1080}/><figcaption>{photo.caption}</figcaption></figure>)}</div></section>
    <div className="values"><article><span>01</span><h2>Curiosity first</h2><p>Questions, examples and hands-on challenges make every concept something to explore.</p></article><article><span>02</span><h2>Safe by design</h2><p>No ads or tracking. Learners use nicknames, and progress stays on their device unless a facilitator downloads a backup.</p></article><article><span>03</span><h2>Ready anywhere</h2><p>Core lessons work offline after the first visit, helping learning continue when connectivity is weak.</p></article></div>
  </section>;
}
