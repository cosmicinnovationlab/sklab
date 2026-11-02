"use client";

import { useEffect, useRef, useState } from "react";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "800"] });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

/* ------------------------------------------------------------------ */
/*  EDIT THESE: contact details                                        */
/* ------------------------------------------------------------------ */
const PHONE_DISPLAY = "+91 XXXXX XXXXX"; // <- asli number yahan daalein
const PHONE_WA = "91XXXXXXXXXX"; // <- WhatsApp number (country code ke saath, bina +)
const ADDRESS = "Station Road, Chuna Bhatta ke paas, Jakhi Nigha, Dehri, Bihar 821305";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("SK Art Station Road Near Chuna Bhatta Jakhi Nigha Dehri Bihar 821305");

const SERVICES = [
  { n: "01", t: "Flex Printing", d: "Dukaan ke board, hoarding, event ke backdrop aur banner. Tez colour, dhoop-barish mein bhi pakka.", c: "cyan" },
  { n: "02", t: "Visiting / Business Card", d: "Matte, gloss, spot-UV ya textured. Aisa card jo log phenkein nahi, sambhal ke rakhein.", c: "magenta" },
  { n: "03", t: "Creative Design", d: "Logo, branding, poster aur layout. Aapke business ke liye bilkul scratch se.", c: "yellow" },
  { n: "04", t: "Vinyl aur Sticker", d: "Cut sticker, label, glow-sign vinyl aur gaadi ki branding.", c: "key" },
  { n: "05", t: "Shaadi aur Invitation Card", d: "Shaadi, puja ya kisi bhi function ka card, finishing aisi ki dekhte hi pasand aaye.", c: "magenta" },
  { n: "06", t: "Brochure aur Pamphlet", d: "Catalogue, leaflet aur handbill. 50 copy se lekar bulk tak, sab chalta hai.", c: "cyan" },
  { n: "07", t: "Letterhead aur Bill Book", d: "Bill book, challan, envelope, file aur poori office stationery ek hi jagah.", c: "yellow" },
  { n: "08", t: "ID Card aur Standee", d: "Staff aur school ke ID card, roll-up standee aur display stand.", c: "key" },
  { n: "09", t: "Custom Gifts", d: "Mug, T-shirt, cap, photo frame. Apni photo ya naam ke saath, personalised.", c: "cyan" },
];

const CLIENTS = [
  { t: "Sarkari Vibhag", d: "Notice, banner, form aur campaign ka saman, tender ke time par taiyaar." },
  { t: "City Cart", d: "Badhte hue retail brand ke liye branding aur print ka poora kaam." },
  { t: "Premium Clients", d: "Wo brands jinhe colour mein ek-ek shade ki accuracy aur perfect finish chahiye." },
];

const STEPS = [
  { t: "Bataiye", d: "Kya chahiye, kitni size, kitni quantity aur kab tak. Bas itna bata dijiye." },
  { t: "Design", d: "Hamare designer artwork banate hain. Aapki apni file ho to wo bhi chalegi." },
  { t: "Proof", d: "Print se pehle colour aur layout aap dekh kar pass karte hain." },
  { t: "Print", d: "Achhi machine aur achhe material par pakka print." },
  { t: "Delivery", d: "Dehri mein dukaan se utha lein, ya aapki site par pahuncha denge." },
];

const MARQUEE = [
  "Flex Printing", "Visiting Card", "Design", "Vinyl", "Banner", "Shaadi Card",
  "Brochure", "Sticker", "ID Card", "Hoarding", "Letterhead", "Standee",
];

/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${show ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function RegMark({ className = "" }) {
  return (
    <svg className={`regmark ${className}`} viewBox="0 0 60 60" aria-hidden="true">
      <circle cx="30" cy="30" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M30 2v56M2 30h56" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Page() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      setScrolled(h.scrollTop > 30);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Soft parallax of the CMYK blobs following the pointer
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, []);

  return (
    <main className={`${body.className} sk`}>
      <style>{css}</style>

      <div className="progress" style={{ width: `${progress}%` }} />

      {/* NAV */}
      <header className={`nav ${scrolled ? "nav-s" : ""}`}>
        <a href="#top" className="logo">
          <span className={display.className}>SK</span>
          <i className="dot c" /><i className="dot m" /><i className="dot y" />
          <span className={`${display.className} logo-art`}>Art</span>
        </a>
        <nav className={`links ${menu ? "open" : ""}`} onClick={() => setMenu(false)}>
          <a href="#services">Services</a>
          <a href="#clients">Hamare Clients</a>
          <a href="#process">Kaise Kaam Hota Hai</a>
          <a href="#contact" className="btn-sm">Quote lein</a>
        </nav>
        <button className="burger" aria-label="Menu" onClick={() => setMenu(!menu)}>
          <span /><span />
        </button>
      </header>

      {/* HERO */}
      <section id="top" className="hero" ref={heroRef}>
        <div className="halftone" />
        <div className="blob b-c" />
        <div className="blob b-m" />
        <div className="blob b-y" />
        <RegMark className="rm rm1" />
        <RegMark className="rm rm2" />

        <div className="hero-inner">
          <p className="tag">Digital Art &amp; Printing · Dehri, Bihar</p>
          <h1 className={`${display.className} headline`}>
            <span className="line">
              <span className="word" data-t="Aapka idea,">Aapka idea,</span>
            </span>
            <span className="line">
              <span className="word ink" data-t="hum chhapenge.">hum chhapenge.</span>
            </span>
          </h1>
          <p className="lead">
            Ek visiting card se lekar bade hoarding tak, SK Art design bhi karta hai aur print
            bhi, bilkul sahi colour ke saath. Sarkari daftar aur premium brands ka bharosa.
          </p>
          <div className="cta">
            <a href="#contact" className="btn">Apna kaam shuru karein <span>→</span></a>
            <a href="#services" className="btn ghost">Hamari services dekhein</a>
          </div>
        </div>

        <div className="swatches" aria-hidden="true">
          <i className="sw c" /><i className="sw m" /><i className="sw y" /><i className="sw k" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className={display.className}>
              {m}<b>✺</b>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="sec">
        <Reveal>
          <p className="eyebrow">Hum kya karte hain</p>
          <h2 className={`${display.className} h2`}>
            Har tarah ki printing, <em>ek hi chhat ke neeche.</em>
          </h2>
          <p className="sub">
            Jo chahiye wo list mein nahi hai? Poochhiye zaroor. Jo bhi design aur print ho sakta
            hai, wo hum shayad pehle se hi karte hain.
          </p>
        </Reveal>

        <div className="grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={(i % 3) * 90}>
              <article className={`card ${s.c}`}>
                <span className={`num ${display.className}`}>{s.n}</span>
                <h3 className={display.className}>{s.t}</h3>
                <p>{s.d}</p>
                <span className="arrow">↗</span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CLIENTS */}
      <section id="clients" className="sec dark">
        <div className="halftone dim" />
        <Reveal>
          <p className="eyebrow light">Inka bharosa</p>
          <h2 className={`${display.className} h2 light`}>
            Kaam aisa jo <em>pehli baar mein hi sahi ho.</em>
          </h2>
        </Reveal>
        <div className="clients">
          {CLIENTS.map((c, i) => (
            <Reveal key={c.t} delay={i * 120}>
              <div className="client">
                <span className="tick">✓</span>
                <h3 className={display.className}>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="sec">
        <Reveal>
          <p className="eyebrow">Kaise kaam hota hai</p>
          <h2 className={`${display.className} h2`}>
            Idea se <em>aapke haath tak.</em>
          </h2>
        </Reveal>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 100}>
              <li className="step">
                <span className={`bubble ${display.className}`}>{i + 1}</span>
                <div>
                  <h3 className={display.className}>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* CONTACT */}
      <section id="contact" className="sec contact">
        <Reveal>
          <div className="contact-box">
            <div>
              <p className="eyebrow">Milne aayein ya call karein</p>
              <h2 className={`${display.className} h2`}>
                Chaliye kuch banate hain, <em>jo chhapne layak ho.</em>
              </h2>
              <address>
                <strong>SK Art</strong>
                <br />
                {ADDRESS}
              </address>
              <p className="phone">{PHONE_DISPLAY}</p>
              <div className="cta">
                <a
                  className="btn"
                  href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent("Namaste SK Art, mujhe printing ka quote chahiye.")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp karein <span>→</span>
                </a>
                <a className="btn ghost" href={MAPS_URL} target="_blank" rel="noreferrer">
                  Maps mein dekhein
                </a>
              </div>
            </div>
            <div className="stamp" aria-hidden="true">
              <RegMark className="rm-big" />
              <span className={display.className}>SK<br />Art</span>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="foot">
        <span>© {new Date().getFullYear()} SK Art · Digital Art &amp; Printing Services, Dehri</span>
        <span className="mini"><i className="dot c" /><i className="dot m" /><i className="dot y" /><i className="dot k" /></span>
      </footer>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */
const css = `
:root{
  --paper:#fbf8f1; --ink:#14141a; --muted:#5d5d68;
  --c:#00aeef; --m:#ec008c; --y:#ffd800; --k:#14141a;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#fbf8f1}
.sk{background:var(--paper);color:var(--ink);overflow-x:hidden;line-height:1.55}
a{color:inherit;text-decoration:none}
em{font-style:normal;background:linear-gradient(transparent 62%,var(--y) 62%,var(--y) 92%,transparent 92%)}

.progress{position:fixed;top:0;left:0;height:4px;z-index:100;
  background:linear-gradient(90deg,var(--c),var(--m),var(--y),var(--k))}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;
  padding:18px clamp(18px,5vw,56px);transition:.3s}
.nav-s{background:rgba(251,248,241,.88);backdrop-filter:blur(10px);padding-top:12px;padding-bottom:12px;
  box-shadow:0 1px 0 rgba(20,20,26,.08)}
.logo{display:flex;align-items:center;gap:4px;font-size:1.6rem;font-weight:800;letter-spacing:-.03em}
.logo-art{margin-left:2px}
.dot{display:inline-block;width:8px;height:8px;border-radius:50%}
.dot.c{background:var(--c)}.dot.m{background:var(--m);margin-left:-3px;mix-blend-mode:multiply}
.dot.y{background:var(--y);margin-left:-3px;mix-blend-mode:multiply}.dot.k{background:var(--k)}
.links{display:flex;align-items:center;gap:28px;font-weight:500}
.links a:not(.btn-sm){position:relative}
.links a:not(.btn-sm)::after{content:"";position:absolute;left:0;bottom:-4px;height:2px;width:0;background:var(--m);transition:.3s}
.links a:not(.btn-sm):hover::after{width:100%}
.btn-sm{background:var(--ink);color:#fff;padding:9px 18px;border-radius:99px;transition:.25s}
.btn-sm:hover{background:var(--m);transform:translateY(-2px)}
.burger{display:none;background:none;border:0;width:36px;height:36px;position:relative;cursor:pointer}
.burger span{position:absolute;left:6px;right:6px;height:2px;background:var(--ink);transition:.3s}
.burger span:first-child{top:13px}.burger span:last-child{top:21px}

/* HERO */
.hero{position:relative;min-height:100svh;display:flex;align-items:center;padding:120px clamp(18px,5vw,56px) 80px;overflow:hidden;
  --px:0;--py:0}
.halftone{position:absolute;inset:0;pointer-events:none;
  background-image:radial-gradient(circle,rgba(20,20,26,.16) 1.4px,transparent 1.6px);
  background-size:16px 16px;
  -webkit-mask-image:radial-gradient(ellipse at 85% 20%,#000,transparent 65%);
  mask-image:radial-gradient(ellipse at 85% 20%,#000,transparent 65%)}
.blob{position:absolute;border-radius:50%;mix-blend-mode:multiply;opacity:.88;
  transition:transform .4s cubic-bezier(.2,.8,.2,1);animation:float 9s ease-in-out infinite}
.b-c{width:min(46vw,460px);height:min(46vw,460px);background:var(--c);right:14%;top:12%;
  transform:translate(calc(var(--px)*40px),calc(var(--py)*40px))}
.b-m{width:min(38vw,380px);height:min(38vw,380px);background:var(--m);right:4%;top:30%;animation-delay:-3s;
  transform:translate(calc(var(--px)*-30px),calc(var(--py)*30px))}
.b-y{width:min(32vw,320px);height:min(32vw,320px);background:var(--y);right:20%;top:44%;animation-delay:-6s;
  transform:translate(calc(var(--px)*25px),calc(var(--py)*-35px))}
@keyframes float{0%,100%{margin-top:0}50%{margin-top:-18px}}
.regmark{position:absolute;color:var(--ink);opacity:.5;width:60px;height:60px}
.rm1{left:clamp(18px,5vw,56px);bottom:36px;animation:spin 24s linear infinite}
.rm2{right:clamp(18px,5vw,56px);top:100px;animation:spin 30s linear infinite reverse}
@keyframes spin{to{transform:rotate(360deg)}}

.hero-inner{position:relative;z-index:2;max-width:760px}
.tag{display:inline-block;font-size:.85rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
  padding:6px 14px;border:1.5px solid var(--ink);border-radius:99px;margin-bottom:26px;
  animation:rise .8s .1s both}
.headline{font-size:clamp(2.8rem,9vw,7rem);line-height:.98;letter-spacing:-.04em;font-weight:800}
.line{display:block;overflow:visible}
.word{position:relative;display:inline-block;color:var(--ink);animation:rise .9s .25s both}
.line:nth-child(2) .word{animation-delay:.4s}
.word.ink{color:var(--ink)}
/* mis-registered print layers that snap into register */
.word::before,.word::after{content:attr(data-t);position:absolute;left:0;top:0;z-index:-1;mix-blend-mode:multiply;pointer-events:none}
.word::before{color:var(--c);animation:regC 1.6s .9s cubic-bezier(.2,.9,.2,1) both}
.word::after{color:var(--m);animation:regM 1.6s .9s cubic-bezier(.2,.9,.2,1) both}
@keyframes regC{from{transform:translate(-14px,-8px)}to{transform:translate(-3px,-2px)}}
@keyframes regM{from{transform:translate(14px,8px)}to{transform:translate(3px,2px)}}
.lead{margin:28px 0 34px;font-size:clamp(1.05rem,2vw,1.28rem);color:var(--muted);max-width:560px;animation:rise .9s .6s both}
.cta{display:flex;gap:14px;flex-wrap:wrap;animation:rise .9s .75s both}
.btn{display:inline-flex;align-items:center;gap:10px;background:var(--ink);color:#fff;padding:15px 26px;border-radius:99px;
  font-weight:700;border:2px solid var(--ink);transition:.25s}
.btn span{transition:.25s}
.btn:hover{background:var(--m);border-color:var(--m);transform:translateY(-3px);box-shadow:0 10px 0 -4px var(--ink)}
.btn:hover span{transform:translateX(5px)}
.btn.ghost{background:transparent;color:var(--ink)}
.btn.ghost:hover{background:var(--y);border-color:var(--ink);color:var(--ink)}
@keyframes rise{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}

.swatches{position:absolute;left:clamp(18px,5vw,56px);bottom:36px;display:none}

/* MARQUEE */
.marquee{background:var(--ink);color:var(--paper);overflow:hidden;padding:16px 0;transform:rotate(-1.2deg);margin:-14px -2vw 0;position:relative;z-index:3}
.track{display:flex;width:max-content;animation:scroll 32s linear infinite}
.marquee:hover .track{animation-play-state:paused}
.track span{font-size:1.5rem;font-weight:600;padding:0 22px;white-space:nowrap}
.track b{margin-left:44px;color:var(--y)}
.track span:nth-child(3n) b{color:var(--m)}.track span:nth-child(3n+1) b{color:var(--c)}
@keyframes scroll{to{transform:translateX(-50%)}}

/* SECTIONS */
.sec{position:relative;padding:clamp(70px,10vw,130px) clamp(18px,5vw,56px);max-width:1280px;margin:0 auto}
.eyebrow{font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-size:.8rem;color:var(--m);margin-bottom:14px}
.eyebrow.light{color:var(--y)}
.h2{font-size:clamp(2rem,5vw,3.8rem);line-height:1.05;letter-spacing:-.03em;font-weight:800;max-width:820px}
.h2.light{color:var(--paper)}
.sub{margin-top:18px;color:var(--muted);max-width:560px;font-size:1.08rem}

/* reveal */
.reveal{opacity:0;transform:translateY(34px);transition:opacity .8s cubic-bezier(.2,.8,.2,1),transform .8s cubic-bezier(.2,.8,.2,1)}
.reveal.in{opacity:1;transform:none}

/* CARDS */
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:56px}
.card{position:relative;height:100%;background:#fff;border:2px solid var(--ink);border-radius:22px;padding:28px 26px 30px;
  overflow:hidden;transition:transform .3s,box-shadow .3s;isolation:isolate}
.card::before{content:"";position:absolute;inset:0;z-index:-1;transform:translateY(101%);transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.card.cyan::before{background:var(--c)}.card.magenta::before{background:var(--m)}
.card.yellow::before{background:var(--y)}.card.key::before{background:var(--ink)}
.card:hover{transform:translateY(-6px);box-shadow:8px 8px 0 var(--ink)}
.card:hover::before{transform:none}
.card.key:hover h3,.card.key:hover p,.card.key:hover .num,.card.key:hover .arrow{color:var(--paper)}
.card.magenta:hover h3,.card.magenta:hover p,.card.magenta:hover .num,.card.magenta:hover .arrow{color:#fff}
.num{display:block;font-size:.95rem;font-weight:800;color:var(--muted);margin-bottom:34px;transition:.3s}
.card h3{font-size:1.45rem;letter-spacing:-.02em;margin-bottom:10px;transition:.3s}
.card p{color:var(--muted);transition:.3s;font-size:.98rem}
.arrow{position:absolute;right:22px;top:20px;font-size:1.4rem;transition:.3s}
.card:hover .arrow{transform:translate(4px,-4px)}

/* CLIENTS */
.dark{max-width:none;background:var(--ink);color:var(--paper);overflow:hidden}
.dark>*{position:relative;max-width:1168px;margin-left:auto;margin-right:auto}
.dark .halftone.dim{position:absolute;max-width:none;inset:0;opacity:.35;
  background-image:radial-gradient(circle,rgba(255,255,255,.25) 1.4px,transparent 1.6px);
  -webkit-mask-image:radial-gradient(ellipse at 10% 90%,#000,transparent 65%);
  mask-image:radial-gradient(ellipse at 10% 90%,#000,transparent 65%)}
.clients{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:52px}
.client{height:100%;border:1.5px solid rgba(251,248,241,.25);border-radius:22px;padding:30px;transition:.3s;background:rgba(255,255,255,.03)}
.client:hover{border-color:var(--y);transform:translateY(-5px);background:rgba(255,216,0,.06)}
.tick{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:var(--y);color:var(--ink);font-weight:800;margin-bottom:22px}
.client h3{font-size:1.4rem;margin-bottom:8px;letter-spacing:-.02em}
.client p{color:rgba(251,248,241,.7)}

/* PROCESS */
.steps{list-style:none;margin-top:56px;position:relative;display:grid;gap:6px;max-width:720px}
.steps::before{content:"";position:absolute;left:25px;top:20px;bottom:20px;width:2px;
  background:linear-gradient(var(--c),var(--m),var(--y),var(--k))}
.step{display:flex;gap:22px;align-items:flex-start;padding:14px 0;list-style:none}
.bubble{flex:none;position:relative;z-index:1;width:52px;height:52px;border-radius:50%;display:grid;place-items:center;
  background:var(--paper);border:2px solid var(--ink);font-weight:800;font-size:1.2rem;transition:.3s}
.step:hover .bubble{background:var(--y);transform:scale(1.12) rotate(-6deg)}
.step h3{font-size:1.35rem;letter-spacing:-.02em}
.step p{color:var(--muted)}

/* CONTACT */
.contact-box{display:grid;grid-template-columns:1.4fr .8fr;gap:30px;align-items:center;background:#fff;border:2px solid var(--ink);
  border-radius:30px;padding:clamp(26px,5vw,60px);box-shadow:10px 10px 0 var(--ink);position:relative;overflow:hidden}
address{font-style:normal;margin:26px 0 8px;font-size:1.1rem}
.phone{font-weight:700;font-size:1.3rem;margin-bottom:26px}
.stamp{position:relative;display:grid;place-items:center;aspect-ratio:1;max-width:260px;margin:auto;width:100%}
.stamp span{position:relative;font-size:2.6rem;line-height:.95;text-align:center;font-weight:800;letter-spacing:-.04em}
.rm-big{position:absolute;inset:0;width:100%;height:100%;color:var(--m);opacity:.9;animation:spin 20s linear infinite}

.foot{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;
  padding:28px clamp(18px,5vw,56px);border-top:1px solid rgba(20,20,26,.12);color:var(--muted);font-size:.9rem}
.mini{display:flex;gap:6px}

/* RESPONSIVE */
@media (max-width:960px){
  .grid,.clients{grid-template-columns:repeat(2,1fr)}
  .contact-box{grid-template-columns:1fr}
  .stamp{max-width:180px}
}
@media (max-width:680px){
  .burger{display:block}
  .links{position:fixed;top:0;right:0;height:100svh;width:min(78vw,300px);flex-direction:column;align-items:flex-start;
    justify-content:center;gap:26px;padding:40px;background:var(--paper);box-shadow:-10px 0 40px rgba(0,0,0,.15);
    transform:translateX(105%);transition:.4s cubic-bezier(.2,.8,.2,1);font-size:1.4rem}
  .links.open{transform:none}
  .grid,.clients{grid-template-columns:1fr}
  .blob{opacity:.6}
  .b-c{right:-10%}.b-m{right:-14%}.b-y{right:6%}
  .marquee{transform:rotate(-2deg)}
}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation:none!important;transition:none!important}
  .reveal{opacity:1;transform:none}
}
`;