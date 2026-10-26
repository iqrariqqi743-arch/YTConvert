"use client";

import { useEffect, useState } from "react";
import {
  Music2,
  Link2,
  Download,
  LoaderCircle,
  Headphones,
  ShieldCheck,
  Zap,
  CheckCircle2,
  FileAudio,
  ArrowRight,
  Menu,
  X,
  ClipboardPaste,
  AudioLines,
  Smartphone,
  Monitor,
  ChevronDown,
  Sparkles,
  Clock3,
  Globe2,
  Heart,
  Info,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title:
      "Easy Conversion bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    description:
      "Convert supported YouTube videos into MP3 audio with a simple and intuitive process.",
  },
  {
    icon: Headphones,
    title: "Audio Quality Options",
    description:
      "Choose from 128, 192 or 320 kbps MP3 output settings to suit your needs.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description:
      "Enjoy a clean, responsive experience across desktop, tablet and mobile devices.",
  },
  {
    icon: ShieldCheck,
    title: "No Account Required",
    description:
      "Use the converter without creating an account or completing a registration form.",
  },
  {
    icon: AudioLines,
    title: "Audio Preview",
    description:
      "Listen to your converted MP3 in the browser before downloading it.",
  },
  {
    icon: Globe2,
    title: "Simple Interface",
    description:
      "A straightforward interface designed to make audio conversion easy.",
  },
];

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Paste Video URL",
    description:
      "Copy the link of a YouTube video or Short you own or have permission to use.",
  },
  {
    number: "02",
    icon: AudioLines,
    title: "Choose Quality",
    description:
      "Select your preferred MP3 output quality and start the conversion.",
  },
  {
    number: "03",
    icon: Download,
    title: "Download MP3",
    description:
      "Preview your converted audio and download the MP3 file to your device.",
  },
];

const faqs = [
  {
    question: "What is YTConvert?",
    answer:
      "YTConvert is a browser-based tool that converts supported YouTube video audio into downloadable MP3 files.",
  },
  {
    question: "Is YTConvert free to use?",
    answer:
      "The current version of YTConvert is designed as a free tool without account registration. Service availability may depend on hosting resources.",
  },
  {
    question: "Which audio qualities are available?",
    answer:
      "You can select 128 kbps, 192 kbps or 320 kbps output. Actual audio fidelity depends on the quality of the original source.",
  },
  {
    question: "Can I convert YouTube Shorts?",
    answer:
      "Yes, supported YouTube Shorts URLs can be processed, although conversion may occasionally fail because of source restrictions.",
  },
  {
    question: "Can I use YTConvert on my phone?",
    answer:
      "The website is responsive and designed to work in modern mobile browsers.",
  },
  {
    question: "Can I convert any YouTube video?",
    answer:
      "Only convert content that you own or have permission to download and use. Some videos may be unavailable due to technical or access restrictions.",
  },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "#about" },
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("192");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [convertedQuality, setConvertedQuality] = useState("192");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // NAVBAR STATES
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "YTConvert",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    description:
      "YTConvert converts audio from supported YouTube videos and Shorts into downloadable MP3 files.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  // CLEAN UP AUDIO URL
  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  // FIXED NAVBAR + ACTIVE SECTION
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ["home", "how-it-works", "features", "about", "faq"];

      const scrollPosition = window.scrollY + 160;
      let currentSection = "home";

      sections.forEach((id) => {
        const section = document.getElementById(id);

        if (section && section.offsetTop <= scrollPosition) {
          currentSection = id;
        }
      });

      // Keep the last section active when reaching page bottom
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 15;

      if (isAtBottom) {
        currentSection = "faq";
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // LOCK BACKGROUND SCROLL WHEN MOBILE MENU IS OPEN
  useEffect(() => {
    if (!mobileMenu) return;

    const onEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenu(false);
      }
    };

    window.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("keydown", onEscape);
    };
  }, [mobileMenu]);

  const scrollToSection = (id) => {
    setMobileMenu(false);
    setActiveSection(id);

    const element = document.getElementById(id);

    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const headerOffset = 105;

    const top =
      element.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    window.history.replaceState(null, "", `#${id}`);
  };

  const resetDownload = () => {
    setDownloadUrl("");
    setFileSize("");
  };

  const handleConvert = async (e) => {
    e.preventDefault();
    setError("");
    resetDownload();

    if (!url.trim()) {
      setError("Please enter a YouTube video URL.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url.trim(),
          quality,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));

        throw new Error(data.message || "Unable to convert this video.");
      }

      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("audio/")) {
        throw new Error("The server did not return an audio file.");
      }

      const blob = await response.blob();

      if (!blob.size) {
        throw new Error("The converted audio file is empty.");
      }

      const mp3Url = URL.createObjectURL(blob);

      setDownloadUrl(mp3Url);
      setFileSize((blob.size / (1024 * 1024)).toFixed(2));
      setConvertedQuality(quality);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // CLEAR URL AND ALL CONVERSION RESULTS
  const handleClear = () => {
    if (loading) return;

    setUrl("");
    setQuality("192");
    setError("");
    setDownloadUrl("");
    setFileSize("");
    setConvertedQuality("192");
  };
  const handleDownload = () => {
    if (!downloadUrl) return;

    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = "ytconvert.mp3";

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handlePaste = async () => {
    setError("");

    try {
      const text = await navigator.clipboard.readText();

      setUrl(text.trim());
      resetDownload();
    } catch {
      setError("Clipboard access denied. Please paste the URL manually.");
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080b16] pt-[84px] text-white">
      {/* SEO STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      {/* FIXED ANIMATED NAVBAR */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          isScrolled
            ? "border-white/10 bg-[#080b16]/95 shadow-2xl shadow-black/30 backdrop-blur-2xl"
            : "border-white/5 bg-[#080b16]/80 backdrop-blur-xl"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 lg:px-8 ${
            isScrolled ? "py-3" : "py-5"
          }`}
        >
          {/* LOGO */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 shadow-lg shadow-rose-500/20 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
              <Music2 size={25} />
            </div>

            <span className="text-2xl font-black tracking-tight">
              YT
              <span className="text-rose-400">Convert</span>
            </span>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = activeSection === id;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(id);
                  }}
                  aria-current={isActive ? "location" : undefined}
                  className={`group relative py-3 text-sm font-semibold transition-colors duration-300 ${
                    isActive
                      ? "text-rose-400"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-rose-500 to-purple-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* DESKTOP CTA */}
          <a
            href="#converter"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("converter");
            }}
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-3 text-sm font-bold shadow-lg shadow-rose-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-rose-500/30 lg:inline-flex"
          >
            Start Converting
            <ArrowRight size={16} />
          </a>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={
              mobileMenu ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenu}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenu((previous) => !previous)}
            className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10 lg:hidden"
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* MOBILE NAV ANIMATION */}
        <div
          id="mobile-navigation"
          aria-hidden={!mobileMenu}
          className={`grid overflow-hidden bg-[#101527]/95 backdrop-blur-xl transition-all duration-300 ease-in-out lg:hidden ${
            mobileMenu
              ? "grid-rows-[1fr] border-t border-white/10 opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <nav className="min-h-0 overflow-hidden">
            <div className="space-y-1 px-5 py-5">
              {navLinks.map((link) => {
                const id = link.href.slice(1);
                const isActive = activeSection === id;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    tabIndex={mobileMenu ? 0 : -1}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                    className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-rose-500/10 text-rose-400"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}

              <a
                href="#converter"
                tabIndex={mobileMenu ? 0 : -1}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("converter");
                }}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-5 py-3 font-bold text-white transition hover:bg-rose-600"
              >
                Start Converting
                <ArrowRight size={17} />
              </a>
            </div>
          </nav>
        </div>

        {/* SCROLL PROGRESS BAR */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5">
          <div
            className={`h-full bg-gradient-to-r from-rose-500 to-purple-500 transition-all duration-500 ${
              isScrolled ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative scroll-mt-24 overflow-hidden px-5 pb-24 pt-24 lg:pt-32"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-purple-700/15 blur-[130px]" />

        <div className="pointer-events-none absolute right-0 top-32 h-72 w-72 rounded-full bg-rose-600/10 blur-[100px]" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/10 px-5 py-2.5 text-sm font-medium text-rose-300">
            <Sparkles size={16} />
            Your Simple Online Audio Converter
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-7xl">
            Convert YouTube
            <span className="block bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Videos to MP3
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
            Turn audio from supported YouTube videos and Shorts into
            downloadable MP3 files. Choose your quality, preview your audio and
            download in a few simple steps.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-emerald-400" />
              No Registration
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-emerald-400" />
              MP3 Audio
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-emerald-400" />
              Mobile Friendly
            </span>
          </div>

          {/* CONVERTER CARD */}
          <div
            id="converter"
            className="relative mx-auto mt-14 max-w-3xl scroll-mt-28 rounded-[28px] border border-white/10 bg-[#12182a] p-5 text-left shadow-2xl shadow-black/30 sm:p-8"
          >
            <div className="mb-7 flex items-center gap-3">
              <div className="rounded-xl bg-rose-500/10 p-3 text-rose-400">
                <AudioLines size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold sm:text-2xl">
                  YouTube to MP3 Converter
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Paste your video link to get started
                </p>
              </div>
            </div>

            <form onSubmit={handleConvert}>
              <label
                htmlFor="youtube-url"
                className="mb-3 block text-sm font-semibold text-slate-200"
              >
                YouTube Video URL
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#090e1b] px-4 py-3 focus-within:border-rose-400/60">
                <Link2 size={20} className="shrink-0 text-rose-400" />

                <input
                  id="youtube-url"
                  type="url"
                  required
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError("");
                    resetDownload();
                  }}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-slate-600 sm:text-base"
                />

                {/* CLEAR BUTTON - ONLY NEW FEATURE */}
                {(url || downloadUrl || error || quality !== "192") && (
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={loading}
                    title="Clear everything"
                    aria-label="Clear URL and conversion results"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X size={18} />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handlePaste}
                  disabled={loading}
                  className="flex shrink-0 items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 text-sm font-semibold transition hover:bg-white/20 disabled:opacity-50"
                >
                  <ClipboardPaste size={16} />
                  Paste
                </button>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="quality"
                  className="mb-3 block text-sm font-semibold text-slate-200"
                >
                  Audio Quality
                </label>

                <select
                  id="quality"
                  value={quality}
                  disabled={loading}
                  onChange={(e) => {
                    setQuality(e.target.value);
                    resetDownload();
                  }}
                  className="w-full rounded-xl border border-white/10 bg-[#090e1b] px-4 py-4 text-sm text-white outline-none focus:border-rose-400"
                >
                  <option value="128">128 kbps — Standard</option>

                  <option value="192">192 kbps — Recommended</option>

                  <option value="320">320 kbps — High Output Bitrate</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-4 text-base font-bold shadow-lg shadow-rose-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={21} className="animate-spin" />
                    Converting Your Audio...
                  </>
                ) : (
                  <>
                    <AudioLines size={21} />
                    Convert to MP3
                    <ArrowRight size={19} />
                  </>
                )}
              </button>

              {loading && (
                <div
                  role="status"
                  className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-400"
                >
                  <Clock3 size={17} className="animate-pulse" />
                  Processing your request. Please keep this page open.
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
                >
                  {error}
                </div>
              )}

              {/* DOWNLOAD RESULT */}
              {downloadUrl && !loading && (
                <div className="mt-7 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      size={30}
                      className="shrink-0 text-emerald-400"
                    />

                    <div>
                      <h3 className="text-lg font-bold text-emerald-400">
                        Your MP3 is Ready!
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        Conversion completed successfully.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-4 rounded-xl border border-white/10 bg-[#090e1b] p-4">
                    <div className="rounded-xl bg-rose-500/10 p-3">
                      <FileAudio size={25} className="text-rose-400" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">ytconvert.mp3</p>

                      <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                        MP3 · {convertedQuality} kbps selected · {fileSize} MB
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="mb-3 text-sm font-semibold text-slate-200">
                      Preview Audio
                    </p>

                    <audio
                      key={downloadUrl}
                      controls
                      preload="metadata"
                      src={downloadUrl}
                      className="w-full"
                    >
                      Your browser does not support audio playback.
                    </audio>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-500 px-6 py-4 font-bold text-white transition hover:bg-emerald-600"
                  >
                    <Download size={21} />
                    Download MP3
                  </button>
                </div>
              )}
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
              <Info size={15} />
              Only convert content you own or have permission to use.
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="scroll-mt-24 border-t border-white/5 bg-[#0d1221] px-5 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-rose-400">
              Simple Process
            </span>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              How It Works
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Convert permitted video audio into MP3 in three simple steps.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-3xl border border-white/10 bg-[#151b2d] p-8 transition hover:border-rose-500/30"
                >
                  <span className="absolute right-7 top-5 text-5xl font-black text-white/5">
                    {step.number}
                  </span>

                  <div className="mb-6 inline-flex rounded-2xl bg-rose-500/10 p-4 text-rose-400">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-bold">{step.title}</h3>

                  <p className="mt-3 leading-7 text-slate-400">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="scroll-mt-24 px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-rose-400">
              Why Choose YTConvert
            </span>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Everything You Need for
              <span className="block text-rose-400">Simple MP3 Conversion</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              A clean, convenient experience focused on audio conversion.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-3xl border border-white/10 bg-[#111728] p-8 transition hover:-translate-y-1 hover:border-rose-500/30"
                >
                  <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-rose-500/15 to-purple-500/15 p-4 text-rose-400">
                    <Icon size={27} />
                  </div>

                  <h3 className="text-xl font-bold">{feature.title}</h3>

                  <p className="mt-3 leading-7 text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="scroll-mt-24 border-y border-white/5 bg-[#0d1221] px-5 py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-rose-400">
              About Our Tool
            </span>

            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              A Better Way to
              <span className="block text-rose-400">Manage Your Audio</span>
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              YTConvert is built to simplify the process of converting supported
              online video audio into MP3 format. Our goal is to provide an
              accessible interface with clear controls and a straightforward
              download experience.
            </p>

            <p className="mt-5 leading-8 text-slate-400">
              Whether you are working with your own tutorials, recordings or
              other authorized content, YTConvert makes it easy to select an
              output setting, preview your audio and save an MP3 file.
            </p>

            <a
              href="#converter"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("converter");
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-rose-500 px-6 py-3 font-bold transition hover:bg-rose-600"
            >
              Try the Converter
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#20213d] to-[#12182a] p-7 sm:p-10">
            <div className="rounded-3xl border border-white/10 bg-[#0a1020] p-7">
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-xl bg-rose-500/15 p-3">
                  <Music2 size={26} className="text-rose-400" />
                </div>

                <div>
                  <p className="font-bold">YTConvert</p>

                  <p className="text-sm text-slate-400">
                    Audio Conversion Tool
                  </p>
                </div>
              </div>

              <div className="flex h-32 items-center justify-center gap-1.5">
                {[
                  25, 45, 70, 40, 85, 55, 95, 65, 45, 80, 55, 100, 60, 35, 75,
                  50, 90, 55, 35, 65,
                ].map((height, index) => (
                  <div
                    key={index}
                    className="w-2 flex-1 rounded-full bg-gradient-to-t from-purple-500 to-rose-400"
                    style={{
                      height: `${height}%`,
                    }}
                  />
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                <span className="text-sm text-slate-400">
                  Your audio, your format
                </span>

                <AudioLines size={22} className="text-rose-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 px-5 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-rose-400">
              Need Help?
            </span>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-slate-400">
              Answers to common questions about using YTConvert.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#12182a]"
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                  aria-expanded={activeFaq === index}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold"
                >
                  {faq.question}

                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-rose-400 transition-transform duration-300 ${
                      activeFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeFaq === index && (
                  <div className="border-t border-white/10 px-6 py-5 leading-7 text-slate-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-rose-400/20 bg-gradient-to-r from-[#31172d] via-[#281735] to-[#191c3e] px-6 py-16 text-center sm:px-12">
          <Sparkles size={34} className="mx-auto mb-5 text-rose-300" />

          <h2 className="text-3xl font-black sm:text-4xl">
            Ready to Convert Your Audio?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-8 text-slate-300">
            Paste your video URL, choose your audio quality and get started with
            YTConvert.
          </p>

          <a
            href="#converter"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("converter");
            }}
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-rose-500 px-7 py-4 font-bold transition hover:bg-rose-600"
          >
            Start Converting
            <ArrowRight size={19} />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#0d1221] px-5 pt-16">
        <div className="mx-auto grid max-w-7xl gap-12 pb-14 md:grid-cols-3">
          <div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className="flex items-center gap-3"
            >
              <div className="rounded-xl bg-rose-500 p-3">
                <Music2 size={23} />
              </div>

              <span className="text-2xl font-black">
                YT
                <span className="text-rose-400">Convert</span>
              </span>
            </a>

            <p className="mt-5 max-w-sm leading-7 text-slate-400">
              A simple online audio conversion experience, designed to help you
              turn authorized video content into MP3 files.
            </p>
          </div>

          <div>
            <h3 className="mb-5 font-bold">Quick Links</h3>

            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href.slice(1));
                  }}
                  className="text-sm text-slate-400 transition hover:text-rose-400"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-bold">About YTConvert</h3>

            <p className="leading-7 text-slate-400">
              Built with a focus on usability, responsive design and a
              straightforward MP3 conversion workflow.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
              <Monitor size={17} />
              Desktop & Mobile Browsers
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-center text-sm text-slate-500 sm:flex-row">
          <p>© YTConvert. All rights reserved.</p>

          <p className="flex items-center gap-2">
            Made for a simpler audio experience
            <Heart size={15} className="text-rose-400" />
          </p>
        </div>
      </footer>
    </main>
  );
}
