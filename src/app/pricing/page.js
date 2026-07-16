"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
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

  function handleBackToHome() {
    router.push('/');
  }

  function handleGetStarted() {
    router.push('/#portal');
  }

  return (
    <>
      {/* Decorative Glow Backdrops */}
      <div className="bg-glow-top"></div>
      <div className="bg-glow-bottom"></div>

      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-container">
          <div className="nav-brand" onClick={handleBackToHome}>
            <span className="brand-icon">⚡</span>
            <span className="brand-text">StreamPortal</span>
          </div>
          <nav className="nav-links">
            <span onClick={handleBackToHome}>Home</span>
            <span onClick={handleGetStarted}>Dashboard</span>
            {currentUser ? (
              <button className="nav-btn" onClick={() => router.push('/dashboard')} style={{ borderColor: 'var(--primary)' }}>
                👤 {currentUser}
              </button>
            ) : (
              <button className="nav-btn" onClick={() => window.location.href = '/api/auth/google'}>Login</button>
            )}
          </nav>
        </div>
      </header>

      {/* PRICING HEADER */}
      <section className="pricing-header-section">
        <div className="header-container">
          <div className="pricing-badge">💎 SIMPLE, TRANSPARENT PRICING</div>
          <h1 className="pricing-title">
            Flexible Plans for <br />
            <span className="gradient-text">Streamers of All Sizes</span>
          </h1>
          <p className="pricing-subtitle">
            Scale your stream with AI-generated text-to-speech voiceovers, bank-sync receipt automation, and custom overlays. Choose the plan that fits your community.
          </p>

          {/* Toggle Switch */}
          <div className="toggle-container">
            <span className={`toggle-label ${!isYearly ? 'active' : ''}`}>Monthly</span>
            <button className="toggle-switch" onClick={() => setIsYearly(!isYearly)}>
              <span className={`toggle-dot ${isYearly ? 'yearly' : ''}`}></span>
            </button>
            <span className={`toggle-label ${isYearly ? 'active' : ''}`}>
              Yearly <span className="discount-badge">Save 20%</span>
            </span>
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="pricing-cards-section">
        <div className="pricing-cards-grid">
          
          {/* Starter (Free) Plan */}
          <div className="pricing-card">
            <div className="plan-name">Starter</div>
            <div className="plan-price">
              <span className="currency">$</span>
              <span className="price-num">0</span>
              <span className="billing-period">/ forever</span>
            </div>
            <p className="plan-description">Essential features for new streamers starting their alert setups.</p>
            
            <div className="features-list">
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span><strong>100 tokens</strong> per day</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Real-time Telegram sync</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Standard Web Speech TTS</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Standard OBS Overlays</span>
              </div>
            </div>

            <button className="plan-btn" onClick={handleGetStarted}>Get Started</button>
          </div>

          {/* Pro Plan */}
          <div className="pricing-card popular">
            <div className="popular-badge">⚡ MOST POPULAR</div>
            <div className="plan-name">Pro</div>
            <div className="plan-price">
              <span className="currency">$</span>
              <span className="price-num">{isYearly ? "3.99" : "4.99"}</span>
              <span className="billing-period">/ month</span>
            </div>
            <p className="plan-description">Neural AI Speech readouts and enhanced token limits for daily streams.</p>
            
            <div className="features-list">
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span><strong>5,000 tokens</strong> refreshed monthly</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Neural AI Khmer & English TTS</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Sequential sound & voice playback</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Custom alert audio uploads</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>No-code theme customizer</span>
              </div>
            </div>

            <button className="plan-btn primary" onClick={() => window.location.href = '/api/auth/google'}>Upgrade to Pro</button>
          </div>

          {/* Streamer Pro Plan */}
          <div className="pricing-card">
            <div className="plan-name">Streamer Pro</div>
            <div className="plan-price">
              <span className="currency">$</span>
              <span className="price-num">{isYearly ? "7.99" : "9.99"}</span>
              <span className="billing-period">/ month</span>
            </div>
            <p className="plan-description">Full access for professional streamers with massive active chat communities.</p>
            
            <div className="features-list">
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span><strong>Unlimited tokens</strong> per month</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Neural AI speech engines</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Dedicated high-performance websocket sync</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Priority custom layout design templates</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>24/7 dedicated local support channel</span>
              </div>
            </div>

            <button className="plan-btn" onClick={() => window.location.href = '/api/auth/google'}>Go Unlimited</button>
          </div>

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
          --glass: rgba(18, 16, 26, 0.65);
          --border: rgba(255, 255, 255, 0.06);
          --text-muted: rgba(255, 255, 255, 0.5);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Outfit', sans-serif;
          background: var(--bg);
          background-image: var(--bg-gradient);
          color: #ffffff;
          overflow-x: hidden;
          line-height: 1.6;
        }

        /* GLOW BACKGROUND EFFECT */
        .bg-glow-top {
          position: absolute;
          width: 900px;
          height: 900px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.07) 0%, transparent 60%);
          top: -250px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 0;
          pointer-events: none;
        }

        .bg-glow-bottom {
          position: absolute;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(255, 184, 77, 0.04) 0%, transparent 60%);
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

        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-links span {
          cursor: pointer;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 15px;
          transition: color 0.3s;
        }

        .nav-links span:hover {
          color: #ffffff;
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

        /* HEADER SECTION */
        .pricing-header-section {
          padding-top: 170px;
          padding-bottom: 50px;
          position: relative;
          z-index: 1;
        }

        .header-container {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          padding: 0 20px;
        }

        .pricing-badge {
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

        .pricing-title {
          font-size: 52px;
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

        .pricing-subtitle {
          color: var(--text-muted);
          font-size: 19px;
          max-width: 680px;
          margin: 0 auto 40px auto;
        }

        /* TOGGLE BILLING SWITCH */
        .toggle-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .toggle-label {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-muted);
          transition: color 0.3s;
        }

        .toggle-label.active {
          color: #ffffff;
        }

        .toggle-switch {
          width: 54px;
          height: 30px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--border);
          border-radius: 50px;
          padding: 3px;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: background 0.3s;
        }

        .toggle-dot {
          width: 22px;
          height: 22px;
          background: #ffffff;
          border-radius: 50%;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .toggle-dot.yearly {
          transform: translateX(24px);
          background: var(--primary);
          box-shadow: 0 0 10px var(--primary-glow);
        }

        .discount-badge {
          font-size: 11px;
          font-weight: 900;
          color: #00e676;
          background: rgba(0, 230, 118, 0.1);
          padding: 2px 8px;
          border-radius: 50px;
          margin-left: 5px;
        }

        /* PRICING CARDS SECTION */
        .pricing-cards-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px 100px 20px;
          position: relative;
          z-index: 1;
        }

        .pricing-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          align-items: stretch;
        }

        .pricing-card {
          background: var(--glass);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 45px 35px;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .pricing-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        }

        .pricing-card.popular {
          border: 2px solid var(--primary);
          box-shadow: 0 25px 50px rgba(139, 92, 246, 0.15);
        }

        .pricing-card.popular:hover {
          box-shadow: 0 35px 70px rgba(139, 92, 246, 0.25);
        }

        .popular-badge {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--primary);
          color: #ffffff;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1px;
          box-shadow: 0 4px 10px var(--primary-glow);
        }

        .plan-name {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 15px;
        }

        .plan-price {
          display: flex;
          align-items: baseline;
          margin-bottom: 20px;
        }

        .currency {
          font-size: 28px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.7);
          margin-right: 2px;
        }

        .price-num {
          font-size: 56px;
          font-weight: 900;
          letter-spacing: -2px;
        }

        .billing-period {
          color: var(--text-muted);
          font-size: 15px;
          margin-left: 8px;
        }

        .plan-description {
          color: var(--text-muted);
          font-size: 14px;
          margin-bottom: 35px;
          line-height: 1.5;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 45px;
          flex-grow: 1;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.85);
        }

        .check-icon {
          color: #00e676;
          font-weight: 900;
          font-size: 16px;
        }

        .plan-btn {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 16px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s;
        }

        .plan-btn:hover {
          background: #ffffff;
          color: #000000;
          box-shadow: 0 4px 15px rgba(255,255,255,0.2);
        }

        .plan-btn.primary {
          background: linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%);
          border: none;
          color: #ffffff;
          box-shadow: 0 4px 15px var(--primary-glow);
        }

        .plan-btn.primary:hover {
          box-shadow: 0 6px 20px var(--primary-glow);
          transform: translateY(-1px);
        }

        /* FOOTER BAR */
        .footer-bar {
          text-align: center;
          padding: 40px 20px;
          border-top: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 13px;
          position: relative;
          z-index: 1;
        }
      `}} />
    </>
  );
}
