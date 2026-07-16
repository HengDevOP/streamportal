"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Simulated Overlay Alert Config
  const [alertVisible, setAlertVisible] = useState(true);
  const [activeAlert, setActiveAlert] = useState({
    name: "Sok Mean",
    amount: "25.00",
    currency: "$",
    message: "Keep up the amazing work! Love the stream! 💖"
  });

  useEffect(() => {
    document.title = "StreamPortal - Next-Gen Live Stream Alerts & ABA bank receipts Integration";
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setCurrentUser(data.username);
          }
        }
      } catch (e) {
        console.error("Auth check failed:", e);
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    const donors = ["Sok Mean", "Dara Roth", "Chea Vanna", "Roth Dev", "Heng Streamer", "Kosal", "Vibol", "Leakhena", "Bopha", "Seyha"];
    const dollarAmounts = ["5.00", "10.00", "25.00", "50.00", "100.00"];
    const rielAmounts = ["20,000", "40,000", "100,000", "200,000", "400,000"];
    const messages = [
      "Keep up the amazing work! Love the stream! 💖",
      "សួស្ដីបង! ចូលចិត្តទស្សនាវីដេអូបងណាស់! ស៊ូស៊ូ! 👍",
      "Awesome overlay system! Works perfectly on localhost! 🚀",
      "ជូនពរបងជោគជ័យ និងសុខភាពល្អ! 💵✨",
      "Play next song please! 🎵",
      "Love from Phnom Penh! 🇰🇭"
    ];

    const interval = setInterval(() => {
      setAlertVisible(false);

      setTimeout(() => {
        const isDollar = Math.random() > 0.4;
        const randomName = donors[Math.floor(Math.random() * donors.length)];
        const randomCurrency = isDollar ? "$" : "៛";
        const randomAmount = isDollar 
          ? dollarAmounts[Math.floor(Math.random() * dollarAmounts.length)]
          : rielAmounts[Math.floor(Math.random() * rielAmounts.length)];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];

        setActiveAlert({
          name: randomName,
          amount: randomAmount,
          currency: randomCurrency,
          message: randomMsg
        });

        setAlertVisible(true);
      }, 600);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'how-it-works'];
      const scrollPosition = window.scrollY + 200; // Offset for navbar

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim()) {
      setErrorMsg("Username is required.");
      return;
    }

    const cleaned = username.trim().toLowerCase();
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(cleaned)) {
      setErrorMsg("Username must be 3-20 characters (letters, numbers, underscores).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleaned })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/dashboard');
      } else {
        setErrorMsg(data.error || 'Access failed.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to connect to local authentication server.');
    } finally {
      setLoading(false);
    }
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      {/* Decorative Blur Backdrops */}
      <div className="bg-glow-top"></div>
      <div className="bg-glow-bottom"></div>

      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-container">
          <div className="nav-brand" onClick={() => { scrollToSection('hero'); setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-icon-svg" style={{ filter: 'drop-shadow(0 0 8px var(--primary-glow))' }}>
              <rect width="32" height="32" rx="8" fill="url(#logo-grad-home)" />
              <path d="M11 21L19 11M19 11H13M19 11V17" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="16" cy="16" r="13" stroke="url(#stroke-grad-home)" strokeWidth="1.5" />
              <defs>
                <linearGradient id="logo-grad-home" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8b5cf6" />
                  <stop offset="1" stopColor="#ffb84d" />
                </linearGradient>
                <linearGradient id="stroke-grad-home" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
            <span className="brand-text">StreamPortal</span>
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Navigation">
            <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
          </button>

          <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <span className={activeSection === 'hero' ? 'active' : ''} onClick={() => { scrollToSection('hero'); setMenuOpen(false); }}>Home</span>
            <span className={activeSection === 'features' ? 'active' : ''} onClick={() => { scrollToSection('features'); setMenuOpen(false); }}>Features</span>
            <span className={activeSection === 'how-it-works' ? 'active' : ''} onClick={() => { scrollToSection('how-it-works'); setMenuOpen(false); }}>How it Works</span>
            <span onClick={() => { router.push('/pricing'); setMenuOpen(false); }}>Pricing</span>
            {currentUser ? (
              <button className="nav-btn" onClick={() => { router.push('/dashboard'); setMenuOpen(false); }} style={{ borderColor: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="fa-solid fa-gauge"></i> Dashboard
              </button>
            ) : (
              <button className="nav-btn" onClick={() => { window.location.href = '/api/auth/google'; setMenuOpen(false); }}>Login</button>
            )}
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      {/* HERO SECTION */}
      <section className="hero-section" id="hero">
        <div className="hero-container">
          <div className="hero-badge">
            <i className="fa-solid fa-rocket" style={{ marginRight: '6px', color: 'var(--primary)' }}></i> Next-Gen Live Stream Integration
          </div>
          <h1 className="hero-title">
            Automate Alerts & <br />
            <span className="gradient-text">Streamline Donations</span>
          </h1>
          <p className="hero-subtitle">
            The ultimate self-hosted overlay suite for streamers. Link your Telegram bank receipts directly to custom OBS alerts, read comments with high-fidelity Khmer & English AI voiceovers, and engage supporters in real-time.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => scrollToSection('portal')}>Access Streamer Portal</button>
            <button className="btn-secondary" onClick={() => scrollToSection('features')}>Explore Features</button>
          </div>

          {/* Interactive OBS Alert Mockup */}
          <div className="alert-mockup-wrapper">
            <div className={`alert-mockup ${alertVisible ? 'active' : ''}`} style={{ transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
              <div className="mockup-header">
                <span className="dot dot-r"></span>
                <span className="dot dot-y"></span>
                <span className="dot dot-g"></span>
                <span className="mockup-title">OBS overlay live preview</span>
              </div>
              <div className="mockup-body" style={{ padding: '30px', minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div 
                  className="alert-text-line" 
                  style={{
                    fontSize: '20px',
                    fontWeight: '900',
                    lineHeight: '1.4',
                    marginBottom: '12px',
                    color: '#ffffff',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.95)'
                  }}
                  dangerouslySetInnerHTML={{
                    __html: `<strong>${activeAlert.name}</strong> donated <strong style="color: #69f0ae; text-shadow: 0 0 12px rgba(105,240,174,0.6);">${activeAlert.currency}${activeAlert.amount}</strong> through super chat!`
                  }}
                />
                {activeAlert.message && (
                  <div className="message-box" style={{ 
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#ffb84d',
                    padding: '8px 0',
                    lineHeight: '1.4',
                    textAlign: 'center',
                    wordBreak: 'break-word',
                    textShadow: '0 2px 8px rgba(0,0,0,0.95)'
                  }}>
                    💬 <span>{activeAlert.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section" id="features">
        <div className="section-header">
          <h2 className="section-title">Fully Integrated Streaming Toolkit</h2>
          <p className="section-subtitle">Everything you need to configure premium overlay experiences out of the box.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-plug" style={{ color: 'var(--primary)' }}></i>
            </div>
            <h3 className="feature-card-title">Telegram & ABA Link</h3>
            <p className="feature-card-desc">
              Connect your GramJS client securely to monitor chat receipts. Automate verification and parse incoming payments in real-time.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-palette" style={{ color: 'var(--primary)' }}></i>
            </div>
            <h3 className="feature-card-title">No-Code Theme Engine</h3>
            <p className="feature-card-desc">
              Customize colors, presets, and Google Font templates. Upload custom alert notification MP3 sounds and set target timeouts.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-volume-high" style={{ color: 'var(--primary)' }}></i>
            </div>
            <h3 className="feature-card-title">Khmer & English AI TTS</h3>
            <p className="feature-card-desc">
              Automated Khmer Unicode character detection that reads support comments sequentially using Google&apos;s Neural AI voiceovers.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-trophy" style={{ color: 'var(--primary)' }}></i>
            </div>
            <h3 className="feature-card-title">Top Donors Widget</h3>
            <p className="feature-card-desc">
              Generate dynamic top-5 supporter ranking widgets to include on stream layouts and motivate higher community engagement.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <h2 className="section-title">Get Live In Three Easy Steps</h2>
          <p className="section-subtitle">No complicated configurations or complex API keys needed.</p>
        </div>

        <div className="steps-container">
          <div className="step-item">
            <div className="step-num">1</div>
            <h4>Sign In Locally</h4>
            <p>Pick a custom streamer username. If it&apos;s your first time, the platform automatically initializes your profile.</p>
          </div>
          <div className="step-arrow">
            <i className="fa-solid fa-arrow-right" style={{ color: 'var(--primary)', opacity: 0.8 }}></i>
          </div>
          <div className="step-item">
            <div className="step-num">2</div>
            <h4>Sync & Style</h4>
            <p>Connect your Telegram client, select your layout fonts, colors, and configure your preferred speech engine parameters.</p>
          </div>
          <div className="step-arrow">
            <i className="fa-solid fa-arrow-right" style={{ color: 'var(--primary)', opacity: 0.8 }}></i>
          </div>
          <div className="step-item">
            <div className="step-num">3</div>
            <h4>Add to OBS</h4>
            <p>Copy your unique overlay link into a Browser Source in OBS Studio or Streamlabs. You are ready to go live!</p>
          </div>
        </div>
      </section>

      {/* PORTAL ACCESS (LOGIN) */}
      <section className="portal-section" id="portal">
        <div className="portal-container">
          <div className="portal-logo">
            <i className="fa-solid fa-bolt" style={{ color: 'var(--primary)' }}></i>
          </div>
          <h2>Streamer Dashboard Portal</h2>
          <p>Enter your local account credentials or choose a new handle to register.</p>
          
          {errorMsg && <div className="error-alert">{errorMsg}</div>}

          <button 
            type="button" 
            className="btn-google" 
            onClick={() => window.location.href = '/api/auth/google'}
            style={{
              width: '100%',
              background: '#ffffff',
              color: '#000000',
              border: 'none',
              borderRadius: '12px',
              padding: '14px',
              fontWeight: '800',
              fontSize: '15px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '20px',
              boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-muted)', fontSize: '13px', margin: '25px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
            <span>OR DEV BYPASS</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Streamer Username</label>
              <input
                type="text"
                id="username"
                className="input-control"
                placeholder="e.g. ninja_streamer"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Accessing Dashboard..." : "Go to Dashboard"}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-bar">
        <p>© 2026 StreamPortal. Made for streamers on localhost.</p>
      </footer>

      {/* CSS STYLING */}
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --primary: #8b5cf6;
          --primary-glow: rgba(139, 92, 246, 0.4);
          --accent: #ffb84d;
          --accent-glow: rgba(255, 184, 77, 0.4);
          --bg: #07060b;
          --bg-gradient: radial-gradient(circle at center, #130f24 0%, #06050a 100%);
          --glass: rgba(18, 16, 26, 0.6);
          --border: rgba(255, 255, 255, 0.06);
          --text-muted: rgba(255, 255, 255, 0.5);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatMockup {
          0% { transform: translateY(0px) rotateX(8deg); }
          50% { transform: translateY(-12px) rotateX(10deg); }
          100% { transform: translateY(0px) rotateX(8deg); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.08; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.12; transform: translateX(-50%) scale(1.05); }
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Outfit', sans-serif;
          background: var(--bg);
          background-image: var(--bg-gradient);
          color: #ffffff;
          overflow-x: hidden;
          line-height: 1.6;
        }

        /* GLOW EFFECT DECORATIONS */
        .bg-glow-top {
          position: absolute;
          width: 900px;
          height: 900px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%);
          top: -250px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 0;
          pointer-events: none;
          animation: pulseGlow 8s ease-in-out infinite;
        }

        .bg-glow-bottom {
          position: absolute;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(255, 184, 77, 0.05) 0%, transparent 60%);
          bottom: 100px;
          right: -200px;
          z-index: 0;
          pointer-events: none;
        }

        /* NAVBAR */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
          background: rgba(7, 6, 11, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 18px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .brand-icon {
          font-size: 24px;
          color: var(--accent);
          filter: drop-shadow(0 0 10px var(--accent-glow));
        }

        .brand-text {
          font-size: 21px;
          font-weight: 900;
          letter-spacing: -0.5px;
          background: linear-gradient(135deg, #ffffff 40%, var(--primary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Menu Toggle Button */
        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: #ffffff;
          font-size: 22px;
          cursor: pointer;
          transition: color 0.2s;
          z-index: 102;
        }

        .menu-toggle:hover {
          color: var(--primary);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-links span {
          position: relative;
          cursor: pointer;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 15px;
          transition: color 0.3s;
          padding: 4px 0;
        }

        .nav-links span:hover,
        .nav-links span.active {
          color: #ffffff;
        }

        .nav-links span::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: width 0.3s ease;
          box-shadow: 0 0 8px var(--primary-glow);
        }

        .nav-links span:hover::after,
        .nav-links span.active::after {
          width: 100%;
        }

        .nav-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 8px 18px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .nav-btn:hover {
          background: #ffffff;
          color: #000000;
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
        }

        /* HERO SECTION */
        .hero-section {
          padding-top: 170px;
          padding-bottom: 90px;
          position: relative;
          z-index: 1;
        }

        .hero-container {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          padding: 0 20px;
        }

        .hero-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 800;
          color: var(--accent);
          background: rgba(255, 184, 77, 0.08);
          border: 1px solid rgba(255, 184, 77, 0.15);
          padding: 6px 14px;
          border-radius: 50px;
          margin-bottom: 24px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .hero-title {
          font-size: 56px;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -1.5px;
          margin-bottom: 25px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #a78bfa 0%, #ffb84d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          color: var(--text-muted);
          font-size: 19px;
          max-width: 680px;
          margin: 0 auto 40px auto;
          line-height: 1.6;
        }

        .hero-ctas {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 70px;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%);
          color: #ffffff;
          border: none;
          padding: 16px 32px;
          font-weight: 800;
          font-size: 16px;
          border-radius: 14px;
          cursor: pointer;
          box-shadow: 0 10px 25px var(--primary-glow);
          transition: all 0.3s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px var(--primary-glow);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          color: #ffffff;
          padding: 16px 32px;
          font-weight: 800;
          font-size: 16px;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        /* ALERT MOCKUP PREVIEW */
        .alert-mockup-wrapper {
          perspective: 1000px;
          margin-top: 30px;
        }

        .alert-mockup {
          max-width: 500px;
          margin: 0 auto;
          background: rgba(18, 16, 26, 0.85);
          border: 2px solid var(--accent);
          border-radius: 20px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 184, 77, 0.1);
          transform: translateY(20px) rotateX(8deg) scale(0.95);
          opacity: 0;
          overflow: hidden;
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.6s ease;
        }

        .alert-mockup.active {
          opacity: 1;
          transform: translateY(0) rotateX(8deg) scale(1);
          animation: floatMockup 4s ease-in-out infinite;
        }

        .alert-mockup.active:hover {
          transform: translateY(0) rotateX(0deg) scale(1.02);
          animation: none;
        }

        .mockup-header {
          background: rgba(0, 0, 0, 0.3);
          padding: 10px 18px;
          display: flex;
          align-items: center;
          gap: 6px;
          border-bottom: 1px solid var(--border);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot-r { background: #ff5f56; }
        .dot-y { background: #ffbd2e; }
        .dot-g { background: #27c93f; }

        .mockup-title {
          font-size: 11px;
          font-family: monospace;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          margin-left: 10px;
          letter-spacing: 1px;
        }

        .mockup-body {
          padding: 35px;
        }

        .alert-badge-preview {
          display: inline-block;
          font-size: 10px;
          font-weight: 900;
          color: #ffffff;
          background: var(--accent);
          padding: 4px 10px;
          border-radius: 50px;
          margin-bottom: 15px;
          letter-spacing: 1px;
        }

        .alert-preview-title {
          font-size: 16px;
          color: var(--accent);
          margin-bottom: 10px;
        }

        .alert-preview-donor {
          font-size: 26px;
          font-weight: 800;
        }

        .alert-preview-amount {
          font-size: 34px;
          font-weight: 900;
          color: #00e676;
          margin-bottom: 15px;
          text-shadow: 0 0 10px rgba(0, 230, 118, 0.2);
        }

        .alert-preview-msg {
          font-size: 14px;
          background: rgba(0,0,0,0.3);
          padding: 12px;
          border-radius: 10px;
          color: rgba(255,255,255,0.85);
        }

        /* FEATURES SECTION */
        .features-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 20px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 38px;
          font-weight: 900;
          letter-spacing: -0.5px;
          margin-bottom: 15px;
        }

        .section-subtitle {
          color: var(--text-muted);
          font-size: 17px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 25px;
        }

        .feature-card {
          background: var(--glass);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 35px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(139, 92, 246, 0.3);
          box-shadow: 0 15px 40px rgba(139, 92, 246, 0.1);
        }

        .feature-icon {
          font-size: 36px;
          margin-bottom: 20px;
        }

        .feature-card-title {
          font-size: 19px;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .feature-card-desc {
          color: var(--text-muted);
          font-size: 14px;
          line-height: 1.5;
        }

        /* HOW IT WORKS */
        .how-it-works {
          max-width: 1000px;
          margin: 0 auto;
          padding: 80px 20px;
        }

        .steps-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-top: 40px;
        }

        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }

          .nav-links {
            position: fixed;
            top: -100%;
            left: 0;
            width: 100%;
            height: auto;
            max-height: 85vh;
            background: rgba(12, 10, 22, 0.98);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border-bottom: 1px solid var(--border);
            border-left: none;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            gap: 25px;
            padding: 90px 40px 40px 40px;
            opacity: 0;
            visibility: hidden;
            transition: top 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, visibility 0.3s ease;
            z-index: 100;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          }

          .nav-links.active {
            top: 0;
            opacity: 1;
            visibility: visible;
          }

          .nav-links span {
            font-size: 18px;
            width: 100%;
            text-align: center;
            padding: 10px 0;
          }

          .nav-links span::after {
            bottom: 0;
          }

          .nav-btn {
            width: 100%;
            justify-content: center;
            padding: 12px 24px;
            font-size: 16px;
          }

          .hero-section {
            padding-top: 120px;
            padding-bottom: 60px;
          }

          .hero-title {
            font-size: 34px;
            line-height: 1.2;
          }

          .hero-subtitle {
            font-size: 15px;
            margin-bottom: 30px;
          }

          .hero-ctas {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
            padding: 0 10px;
          }

          .btn-primary, .btn-secondary {
            padding: 14px 24px;
            font-size: 15px;
            width: 100%;
          }

          .alert-mockup {
            transform: none !important;
          }

          .section-title {
            font-size: 28px;
          }

          .portal-container {
            padding: 30px 20px;
          }

          .steps-container {
            flex-direction: column;
          }
          .step-arrow {
            transform: rotate(90deg);
            margin: 10px 0;
          }
        }

        .step-item {
          flex: 1;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 30px 20px;
          text-align: center;
        }

        .step-num {
          width: 40px;
          height: 40px;
          background: var(--primary);
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 900;
          font-size: 18px;
          margin: 0 auto 20px auto;
          box-shadow: 0 4px 10px var(--primary-glow);
        }

        .step-item h4 {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .step-item p {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .step-arrow {
          font-size: 24px;
          color: var(--primary);
          font-weight: bold;
        }

        /* ACCESS PORTAL SECTION (LOGIN CARD) */
        .portal-section {
          padding: 100px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .portal-container {
          width: 100%;
          max-width: 450px;
          background: var(--glass);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 50px 40px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          text-align: center;
        }

        .portal-logo {
          font-size: 40px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(139, 92, 246, 0.1);
          border: 2px solid var(--primary);
          box-shadow: 0 0 15px var(--primary-glow);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
        }

        .portal-container h2 {
          font-size: 24px;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .portal-container p {
          color: var(--text-muted);
          font-size: 14px;
          margin-bottom: 35px;
        }

        .form-group {
          margin-bottom: 25px;
          text-align: left;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 8px;
          color: rgba(255,255,255,0.8);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .input-control {
          width: 100%;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 14px 16px;
          color: #ffffff;
          font-family: inherit;
          font-size: 15px;
          transition: all 0.3s;
        }

        .input-control:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 10px var(--primary-glow);
        }

        .btn-submit {
          width: 100%;
          background: linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%);
          border: none;
          border-radius: 12px;
          padding: 15px;
          color: #ffffff;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 15px var(--primary-glow);
          transition: all 0.2s;
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px var(--primary-glow);
        }

        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .error-alert {
          background: rgba(255, 82, 82, 0.12);
          border: 1px solid rgba(255, 82, 82, 0.25);
          color: #ff5252;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 25px;
          text-align: left;
        }

        /* FOOTER BAR */
        .footer-bar {
          text-align: center;
          padding: 40px 20px;
          border-top: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 13px;
        }
      `}} />
    </>
  );
}
