import { useEffect, useState } from "react";

type Language = "en" | "ar" | "ml";

type Step = {
  number: string;
  title: string;
  description: string;
};

const materialNames: Record<Language, string[]> = {
  en: [
    "Iron",
    "Steel",
    "Aluminium",
    "Copper",
    "Brass",
    "Carton boxes",
    "Batteries",
    "Cables & wires",
    "Car scrap",
    "Plastic",
    "E-waste",
  ],
  ar: [
    "حديد",
    "فولاذ",
    "ألومنيوم",
    "نحاس",
    "نحاس أصفر",
    "كرتون",
    "بطاريات",
    "كابلات وأسلاك",
    "خردة السيارات",
    "بلاستيك",
    "نفايات إلكترونية",
  ],
  ml: [
    "ഇരുമ്പ്",
    "സ്റ്റീൽ",
    "അലുമിനിയം",
    "ചെമ്പ്",
    "പിച്ചള",
    "കാർട്ടൺ ബോക്സുകൾ",
    "ബാറ്ററികൾ",
    "കേബിളുകളും വയറുകളും",
    "വാഹന സ്ക്രാപ്പ്",
    "പ്ലാസ്റ്റിക്",
    "ഇ-മാലിന്യം",
  ],
};

const translations: Record<
  Language,
  {
    navMaterials: string;
    navTyres: string;
    navProcess: string;
    callUs: string;
    menuLabel: string;
    heroKicker: string;
    heroLine: string;
    heroDescription: string;
    heroCta: string;
    heroExplore: string;
    scrollLabel: string;
    materialsEyebrow: string;
    materialsTitle: string;
    materialsDescription: string;
    materialsImageAlt: string;
    materialsImageCaption: string;
    tyresEyebrow: string;
    tyresTitle: string;
    tyresDescription: string;
    tyresDetail: string;
    tyresCta: string;
    tyresImageAlt: string;
    processEyebrow: string;
    processTitle: string;
    steps: Step[];
    contactEyebrow: string;
    contactTitle: string;
    contactDescription: string;
    whatsappCta: string;
    callLabel: string;
    emailLabel: string;
    footerNote: string;
    whatsappMessage: string;
  }
> = {
  en: {
    navMaterials: "What we buy",
    navTyres: "Used tyres",
    navProcess: "How it works",
    callUs: "Call us",
    menuLabel: "Toggle navigation",
    heroKicker: "Scrap trading company · UAE",
    heroLine: "Scrap, sorted. Pickup, handled.",
    heroDescription:
      "All types of scrap. Best prices. Right at your doorstep.",
    heroCta: "Get a pickup",
    heroExplore: "Explore materials",
    scrollLabel: "Scroll to explore",
    materialsEyebrow: "What we take",
    materialsTitle: "Old stuff.\nNew value.",
    materialsDescription:
      "From a single battery to a full load, we buy it all.",
    materialsImageAlt: "Sorted scrap metal ready to be recycled",
    materialsImageCaption: "Collected with care. Ready for a new life.",
    tyresEyebrow: "The tyre shop",
    tyresTitle: "Good tyres still have miles to go.",
    tyresDescription:
      "Find quality used tyres in all sizes, with or without rims.",
    tyresDetail: "ALL SIZES · WITH OR WITHOUT RIM",
    tyresCta: "Ask about tyres",
    tyresImageAlt: "A stack of carefully selected used car tyres",
    processEyebrow: "No fuss, just fair value",
    processTitle: "Three steps.\nSpace cleared.",
    steps: [
      {
        number: "01",
        title: "Get in touch",
        description: "Tell us what you have.",
      },
      {
        number: "02",
        title: "We come to you",
        description: "Doorstep pickup, on your time.",
      },
      {
        number: "03",
        title: "Get a fair price",
        description: "Quick weighing. Clear value.",
      },
    ],
    contactEyebrow: "Ready when you are",
    contactTitle: "Got scrap?\nLet's move it.",
    contactDescription:
      "Call or message us for a quick pickup and a fair price.",
    whatsappCta: "Chat on WhatsApp",
    callLabel: "Call / WhatsApp",
    emailLabel: "Email us",
    footerNote: "Scrap trading company · UAE",
    whatsappMessage: "Hi Kanzscrap, I would like a scrap pickup.",
  },
  ar: {
    navMaterials: "ما نشتريه",
    navTyres: "إطارات مستعملة",
    navProcess: "كيف نعمل",
    callUs: "اتصل بنا",
    menuLabel: "فتح قائمة التنقل",
    heroKicker: "شركة تجارة خردة · الإمارات",
    heroLine: "خردتك علينا. والاستلام عند بابك.",
    heroDescription: "نشتري جميع أنواع الخردة بأفضل الأسعار.",
    heroCta: "اطلب الاستلام",
    heroExplore: "اكتشف ما نشتريه",
    scrollLabel: "اكتشف المزيد",
    materialsEyebrow: "ما نشتريه",
    materialsTitle: "أشياء قديمة.\nقيمة جديدة.",
    materialsDescription: "من بطارية واحدة إلى حمولة كاملة، نشتريها كلها.",
    materialsImageAlt: "خردة معدنية مفروزة وجاهزة لإعادة التدوير",
    materialsImageCaption: "نجمعها بعناية لتبدأ حياة جديدة.",
    tyresEyebrow: "إطارات مستعملة",
    tyresTitle: "إطارات جيدة لم تنتهِ رحلتها بعد.",
    tyresDescription: "إطارات مستعملة بحالة جيدة، بكل المقاسات ومع الجنط أو بدونه.",
    tyresDetail: "جميع المقاسات · مع الجنط أو بدونه",
    tyresCta: "استفسر عن الإطارات",
    tyresImageAlt: "مجموعة من إطارات السيارات المستعملة المختارة بعناية",
    processEyebrow: "بكل سهولة وبسعر عادل",
    processTitle: "ثلاث خطوات.\nومساحة أوسع.",
    steps: [
      { number: "01", title: "تواصل معنا", description: "أخبرنا بما لديك." },
      {
        number: "02",
        title: "نصل إليك",
        description: "استلام من باب المنزل في الوقت المناسب لك.",
      },
      {
        number: "03",
        title: "سعر عادل",
        description: "وزن سريع وقيمة واضحة.",
      },
    ],
    contactEyebrow: "نحن جاهزون",
    contactTitle: "لديك خردة؟\nدعنا نبدأ.",
    contactDescription: "اتصل أو راسلنا لاستلام سريع وسعر عادل.",
    whatsappCta: "راسلنا عبر واتساب",
    callLabel: "اتصال / واتساب",
    emailLabel: "راسلنا بالبريد",
    footerNote: "شركة تجارة خردة · الإمارات",
    whatsappMessage: "مرحباً كنز سكراب، أود طلب استلام خردة.",
  },
  ml: {
    navMaterials: "ഞങ്ങൾ വാങ്ങുന്നത്",
    navTyres: "ഉപയോഗിച്ച ടയറുകൾ",
    navProcess: "എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    callUs: "വിളിക്കൂ",
    menuLabel: "നാവിഗേഷൻ തുറക്കുക",
    heroKicker: "സ്ക്രാപ്പ് ട്രേഡിംഗ് കമ്പനി · യു.എ.ഇ.",
    heroLine: "സ്ക്രാപ്പ് വിൽക്കൂ. പിക്കപ്പ് ഞങ്ങൾ നോക്കാം.",
    heroDescription:
      "എല്ലാത്തരം സ്ക്രാപ്പിനും മികച്ച വില, വീട്ടുപടിക്കൽ പിക്കപ്പ്.",
    heroCta: "പിക്കപ്പ് ബുക്ക് ചെയ്യൂ",
    heroExplore: "ഞങ്ങൾ വാങ്ങുന്നത് കാണൂ",
    scrollLabel: "കൂടുതൽ അറിയൂ",
    materialsEyebrow: "ഞങ്ങൾ വാങ്ങുന്നത്",
    materialsTitle: "പഴയതിന്\nപുതിയ മൂല്യം.",
    materialsDescription:
      "ഒരു ബാറ്ററിയായാലും വലിയ ലോഡായാലും, ഞങ്ങൾ വാങ്ങും.",
    materialsImageAlt: "റീസൈക്കിൾ ചെയ്യാൻ തയ്യാറാക്കിയ സ്ക്രാപ്പ് ലോഹങ്ങൾ",
    materialsImageCaption: "ശ്രദ്ധയോടെ ശേഖരിച്ച് പുതിയ ജീവിതത്തിലേക്ക്.",
    tyresEyebrow: "ഉപയോഗിച്ച ടയറുകൾ",
    tyresTitle: "നല്ല ടയറുകൾക്ക് ഇനിയും ദൂരം പോകാനുണ്ട്.",
    tyresDescription:
      "എല്ലാ സൈസിലും, റിമ്മോടെയും ഇല്ലാതെയും ഗുണമേന്മയുള്ള ടയറുകൾ.",
    tyresDetail: "എല്ലാ സൈസും · റിമ്മോടെയും ഇല്ലാതെയും",
    tyresCta: "ടയറുകളെക്കുറിച്ച് ചോദിക്കൂ",
    tyresImageAlt: "തിരഞ്ഞെടുത്ത ഉപയോഗിച്ച കാർ ടയറുകളുടെ ശേഖരം",
    processEyebrow: "ലളിതം, ന്യായമായ വില",
    processTitle: "മൂന്ന് ഘട്ടം.\nസ്ഥലം ഒഴിഞ്ഞു.",
    steps: [
      {
        number: "01",
        title: "ബന്ധപ്പെടൂ",
        description: "നിങ്ങളുടെ കൈവശമുള്ളത് പറയൂ.",
      },
      {
        number: "02",
        title: "ഞങ്ങൾ എത്താം",
        description: "നിങ്ങളുടെ സൗകര്യത്തിന് പിക്കപ്പ്.",
      },
      {
        number: "03",
        title: "ന്യായമായ വില",
        description: "വേഗത്തിലുള്ള തൂക്കം. വ്യക്തമായ വില.",
      },
    ],
    contactEyebrow: "നിങ്ങൾ വിളിക്കുമ്പോൾ ഞങ്ങൾ തയ്യാർ",
    contactTitle: "സ്ക്രാപ്പുണ്ടോ?\nനമുക്ക് നീക്കാം.",
    contactDescription:
      "വേഗത്തിലുള്ള പിക്കപ്പിനും ന്യായമായ വിലയ്ക്കും വിളിക്കൂ അല്ലെങ്കിൽ സന്ദേശമയക്കൂ.",
    whatsappCta: "വാട്ട്‌സ്ആപ്പിൽ സംസാരിക്കൂ",
    callLabel: "വിളി / വാട്ട്‌സ്ആപ്പ്",
    emailLabel: "ഇമെയിൽ അയക്കൂ",
    footerNote: "സ്ക്രാപ്പ് ട്രേഡിംഗ് കമ്പനി · യു.എ.ഇ.",
    whatsappMessage: "ഹായ് Kanzscrap, എനിക്ക് സ്ക്രാപ്പ് പിക്കപ്പ് വേണം.",
  },
};

const languageOptions: { id: Language; label: string; name: string }[] = [
  { id: "en", label: "EN", name: "English" },
  { id: "ar", label: "العربية", name: "Arabic" },
  { id: "ml", label: "മലയാളം", name: "Malayalam" },
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span>K</span>
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 19 18 6M8 6h10v10" />
      </svg>
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 12h14M12 5.5l6.5 6.5-6.5 6.5" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.1 11.8a8 8 0 0 1-11.9 7L4 20l1.3-4a8 8 0 1 1 14.8-4.2Z" />
      <path d="M8.9 8.3c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2 .2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.3.3.6-.1.7-.5 1.3-1.1 1.6-.6.4-1.3.5-2 .3-1.1-.3-2.3-.9-3.4-2-1.1-1-1.9-2.3-2.2-3.4-.2-.7-.1-1.4.2-2.2.2-.3.6-.7 1-.9Z" />
    </svg>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = translations[language];
  const isArabic = language === "ar";
  const whatsappHref = `https://wa.me/971556974283?text=${encodeURIComponent(
    copy.whatsappMessage,
  )}`;

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, language]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { label: copy.navMaterials, href: "#materials" },
    { label: copy.navTyres, href: "#tyres" },
    { label: copy.navProcess, href: "#how-it-works" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={`site-shell language-${language}`} dir={isArabic ? "rtl" : "ltr"}>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand-lockup" href="#top" onClick={closeMenu} aria-label="Kanzscrap home">
            <BrandMark />
            <span className="brand-lockup-copy" dir="ltr">
              <span className="brand-wordmark">
                <span>KANZ</span>
                <span className="brand-orange">SCRAP</span>
              </span>
              <span className="brand-descriptor">SCRAP TRADING COMPANY</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <div className="language-switcher" role="group" aria-label="Choose language">
              {languageOptions.map((option) => (
                <button
                  className={language === option.id ? "active" : ""}
                  key={option.id}
                  type="button"
                  aria-label={option.name}
                  aria-pressed={language === option.id}
                  onClick={() => setLanguage(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <a className="header-call" href="tel:+971556974283">
              <span>{copy.callUs}</span>
              <ArrowIcon />
            </a>
            <button
              className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
              type="button"
              aria-label={copy.menuLabel}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <nav className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
              <ArrowIcon />
            </a>
          ))}
          <a href="#contact" onClick={closeMenu}>
            {copy.callUs}
            <ArrowIcon />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-image" aria-hidden="true">
            <img src="/images/scrap-yard-hero.jpg" alt="" fetchPriority="high" />
          </div>
          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow hero-kicker">{copy.heroKicker}</p>
              <h1 className="hero-brand" dir="ltr">
                <span>KANZ</span>
                <span className="brand-orange">SCRAP</span>
              </h1>
              <p className="hero-line">{copy.heroLine}</p>
              <p className="hero-description">{copy.heroDescription}</p>
              <div className="hero-actions">
                <a className="button button-orange" href={whatsappHref} target="_blank" rel="noreferrer">
                  <WhatsAppIcon />
                  <span>{copy.heroCta}</span>
                </a>
                <a className="text-link" href="#materials">
                  <span>{copy.heroExplore}</span>
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
          <a className="scroll-cue" href="#materials">
            <span>{copy.scrollLabel}</span>
            <span className="scroll-line" aria-hidden="true" />
          </a>
        </section>

        <section className="materials-section section-pad" id="materials">
          <div className="materials-layout page-width">
            <div className="materials-copy reveal">
              <p className="eyebrow section-eyebrow">{copy.materialsEyebrow}</p>
              <h2 className="section-title preserve-lines">{copy.materialsTitle}</h2>
              <p className="section-description">{copy.materialsDescription}</p>
              <ul className="materials-list">
                {materialNames[language].map((material, index) => (
                  <li key={material}>
                    <span className="material-number" dir="ltr">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{material}</span>
                    <ArrowIcon />
                  </li>
                ))}
              </ul>
            </div>
            <figure className="materials-visual reveal">
              <img
                src="/images/scrap-metals.jpg"
                alt={copy.materialsImageAlt}
                loading="lazy"
              />
              <figcaption>{copy.materialsImageCaption}</figcaption>
              <span className="visual-corner" aria-hidden="true" />
            </figure>
          </div>
        </section>

        <section className="tyres-section" id="tyres">
          <div className="tyres-copy reveal">
            <div className="tyres-copy-inner">
              <p className="eyebrow section-eyebrow">{copy.tyresEyebrow}</p>
              <h2 className="section-title">{copy.tyresTitle}</h2>
              <p className="section-description">{copy.tyresDescription}</p>
              <p className="tyre-detail">{copy.tyresDetail}</p>
              <a className="button button-outline" href={whatsappHref} target="_blank" rel="noreferrer">
                <span>{copy.tyresCta}</span>
                <ArrowIcon />
              </a>
            </div>
          </div>
          <figure className="tyres-visual reveal">
            <img src="/images/used-tyres.jpg" alt={copy.tyresImageAlt} loading="lazy" />
            <span className="tyre-image-index" dir="ltr">KANZSCRAP / 02</span>
          </figure>
        </section>

        <section className="process-section section-pad" id="how-it-works">
          <div className="process-inner page-width">
            <div className="process-heading reveal">
              <p className="eyebrow section-eyebrow">{copy.processEyebrow}</p>
              <h2 className="section-title preserve-lines">{copy.processTitle}</h2>
            </div>
            <div className="process-steps">
              {copy.steps.map((step, index) => (
                <article className="process-step reveal" key={step.number} style={{ transitionDelay: `${index * 100}ms` }}>
                  <span className="step-number" dir="ltr">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-inner page-width">
            <div className="contact-intro reveal">
              <div>
                <p className="eyebrow section-eyebrow">{copy.contactEyebrow}</p>
                <h2 className="section-title preserve-lines">{copy.contactTitle}</h2>
                <p className="section-description">{copy.contactDescription}</p>
              </div>
              <a className="button button-orange contact-button" href={whatsappHref} target="_blank" rel="noreferrer">
                <WhatsAppIcon />
                <span>{copy.whatsappCta}</span>
                <ArrowIcon />
              </a>
            </div>

            <div className="contact-details reveal">
              <div className="contact-label">{copy.callLabel}</div>
              <div className="phone-list" dir="ltr">
                <a href="tel:+971556974283">055 697 4283</a>
                <a href="tel:+971502658030">050 265 8030</a>
                <a href="tel:+971557469932">055 746 9932</a>
              </div>
              <div className="contact-label email-label">{copy.emailLabel}</div>
              <a className="email-address" href="mailto:kanzscrap@gmail.com" dir="ltr">
                kanzscrap@gmail.com
              </a>
            </div>
          </div>
          <footer className="site-footer page-width">
            <a className="footer-brand" href="#top" dir="ltr">
              KANZ<span>SCRAP</span>
            </a>
            <span className="footer-note">{copy.footerNote}</span>
            <a className="back-to-top" href="#top">
              <span>TOP</span>
              <ArrowIcon />
            </a>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;