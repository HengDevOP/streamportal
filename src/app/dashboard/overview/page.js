"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [myUsername, setMyUsername] = useState('Loading...');
  
  // Telegram status
  const [telStatus, setTelStatus] = useState('DISCONNECTED');
  const [telError, setTelError] = useState('');
  const [telGroupId, setTelGroupId] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [groupInput, setGroupInput] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Styles states
  const [primaryColor, setPrimaryColor] = useState('#ffb84d');
  const [secondaryColor, setSecondaryColor] = useState('#00e676');
  const [titleTemplate, setTitleTemplate] = useState('✨ New Donation ✨');
  const [footerTemplate, setFooterTemplate] = useState('Thank You So Much! 💖');
  const [duration, setDuration] = useState(10);
  const [fontFamily, setFontFamily] = useState('Outfit');
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [ttsRate, setTtsRate] = useState(0.95);
  const [ttsPitch, setTtsPitch] = useState(1.0);
  const [currentSoundUrl, setCurrentSoundUrl] = useState('');
  const [selectedVoiceName, setSelectedVoiceName] = useState('');
  const [ttsTemplate, setTtsTemplate] = useState('{donator} donated {amount} through superchat.');
  const [alertTemplate, setAlertTemplate] = useState('{donator} donated {amount} through super chat!');


  // Scoped Links
  const [obsLink, setObsLink] = useState('');
  const [donationLink, setDonationLink] = useState('');
  const [topDonationLink, setTopDonationLink] = useState('');
  const [iframeSrc, setIframeSrc] = useState('about:blank');

  // Logs
  const [logs, setLogs] = useState([]);
  const [testDonorName, setTestDonorName] = useState('Ninja Donor');
  const [testDonorMessage, setTestDonorMessage] = useState('This is a test donation alert preview!');

  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [isTtsModalOpen, setIsTtsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeframe, setTimeframe] = useState('7d');
  const [isOverlayModalOpen, setIsOverlayModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  const [telegramFlowStep, setTelegramFlowStep] = useState('phone'); // 'phone' | 'code' | 'password' | 'group'

  useEffect(() => {
    if (telStatus === 'NEED_CODE') {
      setTelegramFlowStep('code');
    } else if (telStatus === 'NEED_PASSWORD') {
      setTelegramFlowStep('password');
    } else if (telStatus === 'CONNECTED' && telegramFlowStep !== 'group') {
      setTelegramFlowStep('group');
    } else if (telStatus === 'DISCONNECTED') {
      setTelegramFlowStep('phone');
    }
  }, [telStatus]);


  useEffect(() => {
    async function loadData() {
      try {
        const meRes = await fetch('/api/auth/me');
        const meData = await meRes.json();
        if (meRes.ok && meData.authenticated) {
          setMyUsername(meData.username);
        } else {
          router.push('/');
          return;
        }
      } catch (e) {
        console.error(e);
        router.push('/');
        return;
      }

      try {
        const res = await fetch('/api/user/settings');
        const data = await res.json();
        if (res.ok) {
          const baseUri = `${window.location.protocol}//${window.location.host}`;
          setObsLink(`${baseUri}/overlay/${data.username}`);
          setDonationLink(`${baseUri}/donate/${data.username}`);
          setTopDonationLink(`${baseUri}/topdonation/${data.username}`);
          setIframeSrc(`${baseUri}/overlay/${data.username}`);

          const config = data.alertConfig || {};
          setPrimaryColor(config.primaryColor || '#ffb84d');
          setSecondaryColor(config.secondaryColor || '#00e676');
          setTitleTemplate(config.titleTemplate || '✨ New Donation ✨');
          setFooterTemplate(config.footerTemplate || 'Thank You So Much! 💖');
          setDuration(config.duration || 10);
          setFontFamily(config.fontFamily || 'Outfit');
          setTtsEnabled(config.ttsEnabled ?? true);
          setTtsRate(config.ttsRate || 0.95);
          setTtsPitch(config.ttsPitch || 1.0);
          setCurrentSoundUrl(config.soundUrl || '');
          setSelectedVoiceName(config.ttsVoiceName || '');
          setTtsTemplate(config.ttsTemplate || '{donator} donated {amount} through superchat.');
          setAlertTemplate(config.alertTemplate || '{donator} donated {amount} through super chat!');
        }
      } catch (e) {
        console.error("Error loading user settings:", e);
      }
    }

    loadData();
  }, [router]);

  useEffect(() => {
    if (!myUsername || myUsername === 'Loading...') return;

    async function poll() {
      try {
        const res = await fetch('/api/telegram/status');
        const data = await res.json();
        setTelStatus(data.status);
        setTelError(data.error || '');
        setTelGroupId(data.groupId || '');
      } catch (e) {
        console.error("Status poll error:", e);
      }
    }

    async function fetchLogs() {
      try {
        const res = await fetch(`/api/all-donations/${myUsername}`);
        const data = await res.json();
        setLogs(data || []);
      } catch (e) {
        console.error("Error fetching logs:", e);
      }
    }

    poll();
    fetchLogs();

    const interval = setInterval(() => {
      poll();
      fetchLogs();
    }, 2000);

    return () => clearInterval(interval);
  }, [myUsername]);

  async function connectTelegram(e) {
    if (e) e.preventDefault();
    setTelError('');
    try {
      const res = await fetch('/api/telegram/start-connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phoneInput.trim(), groupId: "" })
      });
      const data = await res.json();
      if (res.ok) {
        setTelStatus(data.status);
      } else {
        setTelError(data.error || "Failed to connect.");
      }
    } catch (err) {
      console.error(err);
      setTelError("Failed to make request.");
    }
  }

  async function submitCode() {
    setTelError('');
    try {
      const res = await fetch('/api/telegram/submit-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verifyCode.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        setTelStatus(data.status);
      } else {
        setTelError(data.error || "Failed to submit code.");
      }
    } catch (err) {
      console.error(err);
      setTelError("Request error.");
    }
  }

  async function submitPassword() {
    setTelError('');
    try {
      const res = await fetch('/api/telegram/submit-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        setTelStatus(data.status);
      } else {
        setTelError(data.error || "Failed to submit 2FA password.");
      }
    } catch (err) {
      console.error(err);
      setTelError("Request error.");
    }
  }

  async function saveGroupId(e) {
    if (e) e.preventDefault();
    setTelError('');
    try {
      const res = await fetch('/api/telegram/set-group', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId: groupInput.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        setTelGroupId(data.groupId);
        setIsTelegramModalOpen(false);
        alert('✅ Connection finalized and listening to Group ID receipts!');
      } else {
        setTelError(data.error || "Failed to save Group ID.");
      }
    } catch (err) {
      console.error(err);
      setTelError("Request error.");
    }
  }

  async function disconnectTelegram() {
    if (!confirm("Are you sure you want to disconnect the Telegram Client? This clears active connection links.")) return;
    try {
      await fetch('/api/telegram/disconnect', { method: 'POST' });
      setTelStatus('DISCONNECTED');
    } catch (e) {
      console.error(e);
    }
  }

  async function saveSettings(e) {
    if (e) e.preventDefault();
    
    const alertConfig = {
      primaryColor,
      secondaryColor,
      titleTemplate,
      footerTemplate,
      duration: parseInt(duration),
      ttsEnabled,
      ttsRate: parseFloat(ttsRate),
      ttsPitch: parseFloat(ttsPitch),
      fontFamily,
      ttsVoiceName: selectedVoiceName,
      ttsTemplate,
      alertTemplate
    };

    try {
      const res = await fetch('/api/user/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertConfig })
      });
      const data = await res.json();
      if (res.ok) {
        alert('🎉 Customizer settings saved successfully!');
        setIsTtsModalOpen(false);
        const frame = document.getElementById('overlayPreviewIframe');
        if (frame) frame.src = frame.src;
      } else {
        alert(data.error || 'Failed to save settings.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error saving settings.');
    }
  }

  async function triggerTestAlert() {
    if (!myUsername) return;

    const alertConfig = {
      primaryColor,
      secondaryColor,
      titleTemplate,
      footerTemplate,
      duration: parseInt(duration),
      ttsEnabled,
      ttsRate: parseFloat(ttsRate),
      ttsPitch: parseFloat(ttsPitch),
      fontFamily,
      ttsVoiceName: selectedVoiceName,
      ttsTemplate,
      alertTemplate
    };

    try {
      // Silently save styling/TTS configurations first
      await fetch('/api/user/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertConfig })
      });
      
      // Wait 500ms for overlay preview iframe polling sync
      await new Promise(r => setTimeout(r, 500));

      const res = await fetch(`/api/overlay/preview/${myUsername}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: testDonorName,
          message: testDonorMessage,
          amount: 10,
          currency: "$"
        })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to trigger preview alert.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error triggering preview.");
    }
  }

  async function logout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (err) {
      console.error("Logout failed:", err);
      router.push('/');
    }
  }

  function copyToClipboard(text, id) {
    navigator.clipboard.writeText(text);
    const btn = document.getElementById(id);
    if (btn) {
      const orig = btn.innerText;
      btn.innerText = "Copied! ✓";
      btn.style.background = "#00e676";
      setTimeout(() => {
        btn.innerText = orig;
        btn.style.background = "";
      }, 2000);
    }
  }

  // Filter logs by selected timeframe
  const filteredByTimeframe = logs.filter(log => {
    if (!log.time) return false;
    const ageMs = Date.now() - log.time;
    if (timeframe === '1h') return ageMs <= 60 * 60 * 1000;
    if (timeframe === '24h') return ageMs <= 24 * 60 * 60 * 1000;
    if (timeframe === '7d') return ageMs <= 7 * 24 * 60 * 60 * 1000;
    if (timeframe === '30d') return ageMs <= 30 * 24 * 60 * 60 * 1000;
    if (timeframe === '6m') return ageMs <= 180 * 24 * 60 * 60 * 1000;
    return true; // 'all'
  });

  // Analytics calculations based on selected timeframe
  const totalRevenue = filteredByTimeframe.reduce((sum, item) => sum + (item.amountUSD || 0), 0);
  const avgDonation = filteredByTimeframe.length > 0 ? (totalRevenue / filteredByTimeframe.length) : 0;
  const maxDonationItem = filteredByTimeframe.reduce((max, item) => (item.amountUSD || 0) > (max.amountUSD || 0) ? item : max, { name: '—', amount: 0, currency: '$', amountUSD: 0 });

  const usdCount = filteredByTimeframe.filter(l => l.currency === '$').length;
  const khrCount = filteredByTimeframe.filter(l => l.currency === '៛').length;
  const totalCount = filteredByTimeframe.length || 1;
  const usdPercent = Math.round((usdCount / totalCount) * 100);
  const khrPercent = Math.round((khrCount / totalCount) * 100);

  // Line chart path calculation (last 10 active points within timeframe)
  const chartTx = filteredByTimeframe.slice(-10);
  let cum = 0;
  const points = chartTx.map(t => {
    cum += (t.amountUSD || 0);
    return cum;
  });
  const maxCum = Math.max(...points, 10);
  const linePoints = points.map((val, i) => {
    const x = 50 + (i * (500 / Math.max(chartTx.length - 1, 1)));
    const y = 175 - (val / maxCum) * 135;
    return { x, y, val };
  });

  // Calculate smooth Bezier spline path
  let dPath = '';
  if (linePoints.length > 0) {
    dPath = `M ${linePoints[0].x} ${linePoints[0].y}`;
    for (let i = 0; i < linePoints.length - 1; i++) {
      const p0 = linePoints[i];
      const p1 = linePoints[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      dPath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
  }

  const fillPath = linePoints.length > 0
    ? `${dPath} L ${linePoints[linePoints.length - 1].x} 175 L ${linePoints[0].x} 175 Z`
    : '';

  // Filter logs for real-time transactions search
  const filteredLogs = logs.filter(log => 
    log.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (log.message && log.message.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="dashboard-wrapper">
      
      {/* Mobile Top Header Navigation */}
      <div className="mobile-top-bar">
        <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open Menu">
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="app-branding" onClick={() => router.push('/')}>
          <i className="fa-solid fa-bolt branding-icon" style={{ fontSize: '20px' }}></i>
          <h1 className="branding-title" style={{ fontSize: '18px' }}>StreamPortal</h1>
        </div>
      </div>

      {/* Slide-out Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div className="sidebar-backdrop" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar Navigation Drawer */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'menu-open' : ''}`}>
        <div style={{ width: '100%' }}>
          <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', width: '100%' }}>
            <div className="app-branding" onClick={() => router.push('/')} style={{ marginBottom: 0 }}>
              <i className="fa-solid fa-bolt branding-icon" style={{ fontSize: '24px', marginRight: '4px' }}></i>
              <div>
                <h1 className="branding-title">StreamPortal</h1>
                <span className="branding-subtitle">Dashboard Console</span>
              </div>
            </div>
            <button className="drawer-close-btn" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close Menu">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <nav className="nav-menu">
            <div className="nav-item active" onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); router.push('/dashboard/overview'); }}>
              <i className="fa-solid fa-chart-simple nav-icon"></i> <span className="nav-text">Dashboard</span>
            </div>

            <div className="nav-item" onClick={() => { setIsMobileMenuOpen(false); router.push('/dashboard/overlay'); }}>
              <i className="fa-solid fa-layer-group nav-icon"></i> <span className="nav-text">Stream Overlay</span>
            </div>

            <div className="nav-item" onClick={() => { setIsMobileMenuOpen(false); setIsTtsModalOpen(true); }}>
              <i className="fa-solid fa-sliders nav-icon"></i> <span className="nav-text">Voice & TTS Customizer</span>
            </div>
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar-placeholder" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <i className="fa-solid fa-circle-user" style={{ fontSize: '20px', color: '#ffb84d' }}></i>
            </div>
            <div className="user-info">
              <h2 id="profile-name">Streamer Active</h2>
              <p id="profile-email">@{myUsername}</p>
            </div>
          </div>
          <button className="btn-logout" onClick={logout}>Logout</button>
        </div>
      </aside>

      {/* MAIN WORKSPACE GRID */}
      <main className="main-content">
        <div className="dashboard-container">
        
        {/* TIME RANGE SELECTOR ROW */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '15px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#fff' }}>Analytics Dashboard</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '12.5px', marginTop: '3px' }}>Monitor stream donations and supporter metrics.</p>
          </div>
          <div className="timeframe-selector">
            <button className={`time-pill ${timeframe === '1h' ? 'active' : ''}`} onClick={() => setTimeframe('1h')}>1 Hour</button>
            <button className={`time-pill ${timeframe === '24h' ? 'active' : ''}`} onClick={() => setTimeframe('24h')}>Yesterday</button>
            <button className={`time-pill ${timeframe === '7d' ? 'active' : ''}`} onClick={() => setTimeframe('7d')}>7 Days</button>
            <button className={`time-pill ${timeframe === '30d' ? 'active' : ''}`} onClick={() => setTimeframe('30d')}>30 Days</button>
            <button className={`time-pill ${timeframe === '6m' ? 'active' : ''}`} onClick={() => setTimeframe('6m')}>6 Months</button>
            <button className={`time-pill ${timeframe === 'all' ? 'active' : ''}`} onClick={() => setTimeframe('all')}>All Time</button>
          </div>
        </div>

        {/* KPI METRIC CARDS ROW */}
        <div className="kpi-row kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          
          <div className="card kpi-card" style={{ padding: '20px', background: 'rgba(20, 18, 32, 0.45)', border: '1px solid var(--glass-border)', borderRadius: '14px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div className="kpi-icon-wrap" style={{ position: 'absolute', right: '15px', top: '15px', opacity: 0.12, fontSize: '36px' }}>
              <i className="fa-solid fa-sack-dollar" style={{ color: '#69f0ae' }}></i>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Revenue</div>
              <div style={{ fontSize: '26px', fontWeight: '900', color: '#69f0ae', marginTop: '6px', textShadow: '0 0 12px rgba(105,240,174,0.3)' }}>
                ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            {/* Embedded Target progress bar */}
            <div style={{ marginTop: '8px', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                <span>Goal: $1k</span>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{Math.min(Math.round((totalRevenue / 1000) * 100), 100)}%</span>
              </div>
              <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(Math.round((totalRevenue / 1000) * 100), 100)}%`, height: '100%', background: 'linear-gradient(90deg, #ffd700, #ffb84d)', borderRadius: '3px' }}></div>
              </div>
            </div>
          </div>

          <div className="card kpi-card" style={{ padding: '20px', background: 'rgba(20, 18, 32, 0.45)', border: '1px solid var(--glass-border)', borderRadius: '14px', position: 'relative', overflow: 'hidden' }}>
            <div className="kpi-icon-wrap" style={{ position: 'absolute', right: '15px', bottom: '15px', opacity: 0.12, fontSize: '42px' }}>
              <i className="fa-solid fa-heart" style={{ color: '#ff5252' }}></i>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Supporters</div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#fff', marginTop: '8px' }}>
              {filteredByTimeframe.length}
            </div>
          </div>

          <div className="card kpi-card" style={{ padding: '20px', background: 'rgba(20, 18, 32, 0.45)', border: '1px solid var(--glass-border)', borderRadius: '14px', position: 'relative', overflow: 'hidden' }}>
            <div className="kpi-icon-wrap" style={{ position: 'absolute', right: '15px', bottom: '15px', opacity: 0.12, fontSize: '42px' }}>
              <i className="fa-solid fa-chart-line" style={{ color: '#ffb84d' }}></i>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Average Donation</div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#ffb84d', marginTop: '8px', textShadow: '0 0 12px rgba(255,184,77,0.3)' }}>
              ${avgDonation.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="card kpi-card" style={{ padding: '20px', background: 'rgba(20, 18, 32, 0.45)', border: '1px solid var(--glass-border)', borderRadius: '14px', position: 'relative', overflow: 'hidden' }}>
            <div className="kpi-icon-wrap" style={{ position: 'absolute', right: '15px', bottom: '15px', opacity: 0.12, fontSize: '42px' }}>
              <i className="fa-solid fa-trophy" style={{ color: '#ffd700' }}></i>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Top Contributor</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#fff', marginTop: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {maxDonationItem.name}
            </div>
            <div style={{ fontSize: '13px', color: '#69f0ae', fontWeight: '700', marginTop: '2px' }}>
              {maxDonationItem.currency}{Number(maxDonationItem.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>

        </div>

        {/* CHARTS ROW (SIDE-BY-SIDE GRAPH AND DONUT CHART) */}
        <div className="analytics-charts-row" style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: '20px', marginBottom: '20px' }}>
          
          {/* Cumulative Revenue Chart (SVG) */}
          <div className="card" style={{ padding: '20px', height: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '14px', color: '#FFD700', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}>
              <i className="fa-solid fa-chart-line"></i> Cumulative Revenue Trend
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px', width: '100%' }}>
              {filteredByTimeframe.length < 2 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Need at least 2 tips inside this timeframe to compile trend history.</div>
              ) : (
                <svg width="100%" height="100%" viewBox="0 0 600 200" style={{ display: 'block', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffb84d" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#ffb84d" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ffb84d" />
                      <stop offset="50%" stopColor="#ffd700" />
                      <stop offset="100%" stopColor="#ffb84d" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Horizontal reference grid lines */}
                  <line x1="50" y1="20" x2="550" y2="20" stroke="rgba(255,255,255,0.02)" strokeDasharray="3,3" />
                  <line x1="50" y1="71" x2="550" y2="71" stroke="rgba(255,255,255,0.02)" strokeDasharray="3,3" />
                  <line x1="50" y1="123" x2="550" y2="123" stroke="rgba(255,255,255,0.02)" strokeDasharray="3,3" />
                  <line x1="50" y1="175" x2="550" y2="175" stroke="rgba(255,255,255,0.06)" />
                  
                  {/* Left reference axis numbers */}
                  <text x="40" y="24" fontSize="8" fill="#757288" textAnchor="end" dominantBaseline="central">${maxCum.toFixed(0)}</text>
                  <text x="40" y="75" fontSize="8" fill="#757288" textAnchor="end" dominantBaseline="central">${(maxCum * 0.66).toFixed(0)}</text>
                  <text x="40" y="127" fontSize="8" fill="#757288" textAnchor="end" dominantBaseline="central">${(maxCum * 0.33).toFixed(0)}</text>
                  <text x="40" y="179" fontSize="8" fill="#757288" textAnchor="end" dominantBaseline="central">$0</text>

                  {/* Area fill */}
                  {fillPath && <path d={fillPath} fill="url(#chartGrad)" />}
                  
                  {/* Vertical grounding line anchors */}
                  {linePoints.map((pt, i) => (
                    <line key={i} x1={pt.x} y1={pt.y} x2={pt.x} y2="175" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="3,3" />
                  ))}

                  {/* Curve Path */}
                  {dPath && (
                    <path 
                      d={dPath} 
                      fill="none" 
                      stroke="url(#lineGrad)" 
                      strokeWidth="4" 
                      strokeLinecap="round"
                      filter="url(#glow)"
                    />
                  )}
                  
                  {/* Data Point Circles and floating price card nodes */}
                  {linePoints.map((pt, i) => (
                    <g key={i}>
                      <circle cx={pt.x} cy={pt.y} r="7" fill="#ffb84d" fillOpacity="0.15" />
                      <circle cx={pt.x} cy={pt.y} r="3" fill="#fff" stroke="#ffb84d" strokeWidth="2" />
                      
                      {/* Floating label box */}
                      <g transform={`translate(${pt.x}, ${pt.y - 15})`}>
                        <rect x="-20" y="-10" width="40" height="13" rx="3" fill="#12101a" stroke="rgba(255,184,77,0.4)" strokeWidth="0.75" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
                        <text y="-3.5" fontSize="8" fill="#ffffff" fontWeight="800" textAnchor="middle" dominantBaseline="central">
                          {"$"}{pt.val.toFixed(0)}
                        </text>
                      </g>
                    </g>
                  ))}
                </svg>
              )}
            </div>
          </div>

          {/* Payment Split Donut (SVG) */}
          <div className="card" style={{ padding: '20px', height: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '14px', color: '#00e676', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}>
              <i className="fa-solid fa-chart-pie"></i> Currency Split
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px', gap: '20px', flexWrap: 'wrap' }}>
              {filteredByTimeframe.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No payment receipts.</div>
              ) : (
                <>
                  <svg width="120" height="120" viewBox="0 0 36 36" style={{ overflow: 'visible' }}>
                    {/* Background track circle */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3.5" />
                    {/* USD segment (Green) */}
                    <circle 
                      cx="18" cy="18" r="15.915" 
                      fill="none" 
                      stroke="#00e676" 
                      strokeWidth="3.5" 
                      strokeDasharray={usdPercent + " " + (100 - usdPercent)} 
                      strokeDashoffset="25"
                    />
                    {/* KHR segment (Orange) */}
                    <circle 
                      cx="18" cy="18" r="15.915" 
                      fill="none" 
                      stroke="#ffb84d" 
                      strokeWidth="3.5" 
                      strokeDasharray={khrPercent + " " + (100 - khrPercent)} 
                      strokeDashoffset={25 - usdPercent}
                    />
                    {/* Center stats text */}
                    <g transform="translate(18, 18)">
                      <text y="-2" fontSize="4.5" fontWeight="bold" fill="#a0aec0" textAnchor="middle" dominantBaseline="central">Tips</text>
                      <text y="4" fontSize="6.5" fontWeight="900" fill="#ffffff" textAnchor="middle" dominantBaseline="central">{filteredByTimeframe.length}</text>
                    </g>
                  </svg>
                  
                  {/* Legends */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '130px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#00e676', boxShadow: '0 0 5px rgba(0,230,118,0.4)' }} />
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>USD ({usdPercent}%)</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{usdCount} txs</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#ffb84d', boxShadow: '0 0 5px rgba(255,184,77,0.4)' }} />
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>KHR ({khrPercent}%)</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{khrCount} txs</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

        {/* TRANSACTIONS LOGS TABLE CARD */}
        <div className="card" id="logs-card" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '15px', flexShrink: 0 }}>
            <div>
              <h3 style={{ fontSize: '17px', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-list-check" style={{ color: 'var(--primary)' }}></i> Live Transaction Records
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px' }}>Real-time listener database synced with bank alerts.</p>
            </div>
            
            {/* Search Input Bar */}
            <div style={{ position: 'relative', width: '260px' }}>
              <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '13px' }}></i>
              <input 
                type="text" 
                placeholder="Search donors or comments..." 
                className="input-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: '8px 12px 8px 36px', fontSize: '13px', borderRadius: '10px' }}
              />
            </div>
          </div>

          <div className="table-responsive-wrapper" style={{ flexGrow: 1, overflowY: 'auto', minHeight: 0, borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(12, 10, 20, 0.4)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '14px 16px', color: 'var(--text-muted)', fontWeight: '700' }}>Timestamp</th>
                  <th style={{ padding: '14px 16px', color: 'var(--text-muted)', fontWeight: '700' }}>Donor Payer</th>
                  <th style={{ padding: '14px 16px', color: 'var(--text-muted)', fontWeight: '700' }}>Original Amount</th>
                  <th style={{ padding: '14px 16px', color: 'var(--text-muted)', fontWeight: '700' }}>USD Value</th>
                  <th style={{ padding: '14px 16px', color: 'var(--text-muted)', fontWeight: '700' }}>Supporter Comment</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No matching transaction receipts found.
                    </td>
                  </tr>
                ) : (
                  [...filteredLogs].reverse().map((log, idx) => (
                    <tr 
                      key={log.time || idx} 
                      style={{ 
                        borderBottom: '1px solid rgba(255,255,255,0.03)',
                        background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                        transition: 'background 0.2s'
                      }}
                      className="table-row-hover"
                    >
                      <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontSize: '13px' }}>
                        {new Date(log.time).toLocaleString()}
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#fff' }}>
                        {log.name}
                      </td>
                      <td style={{ padding: '14px 16px', color: log.currency === '$' ? '#69f0ae' : '#ffb84d', fontWeight: '800' }}>
                        {log.currency}{Number(log.amount).toLocaleString()}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#69f0ae', fontWeight: '800' }}>
                        ${Number(log.amountUSD || (log.currency === '៛' ? log.amount / 4000 : log.amount)).toFixed(2)}
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontStyle: log.message ? 'italic' : 'normal' }}>
                        {log.message ? `💬 "${log.message}"` : '—'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        </div>

      </main>

      {/* LUXURY MODAL POPUPS */}

      {/* MODAL 1: TELEGRAM SETUP */}
      <div className={`modal-overlay ${isTelegramModalOpen ? 'active' : ''}`} onClick={() => setIsTelegramModalOpen(false)}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>📱 Telegram Client Connection</h3>
            <button className="modal-close" onClick={() => setIsTelegramModalOpen(false)}>✕</button>
          </div>
          <div className="modal-body">
            
            <div className="status-indicator-box" style={{ marginBottom: '25px' }}>
              <div 
                className="status-dot" 
                style={{ 
                  backgroundColor: 
                    telStatus === 'CONNECTED' ? 'var(--status-connected)' : 
                    (telStatus === 'CONNECTING' ? 'var(--status-connecting)' : 
                    (telStatus.startsWith('NEED') ? 'var(--status-action)' : 'var(--status-disconnected)')) 
                }}
              ></div>
              <div>
                <div className="status-label">Telegram Status</div>
                <div className="status-value">{telStatus}</div>
              </div>
            </div>

            {/* Step 1: Input Phone */}
            {telStatus === 'DISCONNECTED' && (
              <form onSubmit={connectTelegram}>
                <div className="form-group">
                  <label>Phone Number (International format)</label>
                  <input 
                    type="text" 
                    className="input-control" 
                    placeholder="e.g. +85512345678" 
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    required
                  />
                  <div className="input-hint">Include country code prefix (e.g. +855 for Cambodia).</div>
                </div>
                {telError && <div className="error-msg" style={{ marginBottom: '15px' }}>{telError}</div>}
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                  Connect Client
                </button>
              </form>
            )}

            {/* Connecting Spinner State */}
            {telStatus === 'CONNECTING' && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div className="branding-icon animate-pulse" style={{ fontSize: '40px', marginBottom: '15px' }}>⚡</div>
                <h4>Establishing Telegram Connection...</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '5px' }}>Checking session credentials and generating secure keys.</p>
              </div>
            )}

            {/* Step 2: Verification Code */}
            {telStatus === 'NEED_CODE' && (
              <div className="action-panel">
                <h4>📩 Step 2: Verification Code Required</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '15px' }}>Check your official Telegram App messages on other active devices for a 6-digit verification code.</p>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="input-control" 
                    placeholder="Enter code sent via Telegram" 
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                  />
                </div>
                {telError && <div className="error-msg" style={{ marginBottom: '15px' }}>{telError}</div>}
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '15px' }} onClick={submitCode}>Verify Code</button>
              </div>
            )}

            {/* Step 2.5: 2FA Password */}
            {telStatus === 'NEED_PASSWORD' && (
              <div className="action-panel">
                <h4>🔐 Two-Factor (2FA) Password</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '15px' }}>Your Telegram account has 2-Step Verification enabled. Enter your password below.</p>
                <div className="form-group">
                  <input 
                    type="password" 
                    className="input-control" 
                    placeholder="Enter 2FA password" 
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                  />
                </div>
                {telError && <div className="error-msg" style={{ marginBottom: '15px' }}>{telError}</div>}
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '15px' }} onClick={submitPassword}>Verify 2FA Password</button>
              </div>
            )}

            {/* Step 3: Group ID Config */}
            {telStatus === 'CONNECTED' && (
              <div className="action-panel">
                {telegramFlowStep === 'group' ? (
                  <form onSubmit={saveGroupId}>
                    <h4>📢 Step 3: Set Group ID</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '15px' }}>
                      Your Telegram client is connected! Now, enter the target Telegram Group ID containing the ABA transaction bot receipt messages.
                    </p>
                    <div className="form-group">
                      <label>Telegram Group ID</label>
                      <input 
                        type="text" 
                        className="input-control" 
                        placeholder="e.g. -5105279786" 
                        value={groupInput}
                        onChange={(e) => setGroupInput(e.target.value)}
                        required
                      />
                    </div>
                    {telError && <div className="error-msg" style={{ marginBottom: '15px' }}>{telError}</div>}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                      <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                        Save Group ID & Finalize
                      </button>
                      <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setTelegramFlowStep('active')}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div style={{ marginBottom: '24px', padding: '15px', background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.15)', borderRadius: '12px', fontSize: '14px' }}>
                      ✅ Active and listening to Telegram Group ID: <strong>{telGroupId}</strong>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setTelegramFlowStep('group')}>Update Group ID</button>
                      <button className="btn btn-disconnect" style={{ flex: 1 }} onClick={disconnectTelegram}>Disconnect Client</button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* MODAL 3: TTS CUSTOMIZER */}
      <div className={`modal-overlay ${isTtsModalOpen ? 'active' : ''}`} onClick={() => setIsTtsModalOpen(false)}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>🗣️ Voice & Text-to-Speech Customizer</h3>
            <button className="modal-close" onClick={() => setIsTtsModalOpen(false)}>✕</button>
          </div>
          <div className="modal-body">
            <form onSubmit={saveSettings}>
              
              <div className="form-group flex-align" style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--glass-border)', marginBottom: '20px' }}>
                <input 
                  type="checkbox" 
                  id="ttsEnabledCheck"
                  className="checkbox-control" 
                  checked={ttsEnabled}
                  onChange={(e) => setTtsEnabled(e.target.checked)}
                />
                <label htmlFor="ttsEnabledCheck" style={{ marginBottom: 0, cursor: 'pointer', userSelect: 'none' }}>
                  Enable AI Neural Text-to-Speech (Khmer & English)
                </label>
              </div>

              <div className="form-group">
                <label>TTS Read-out Speech Template</label>
                <input 
                  type="text" 
                  className="input-control" 
                  placeholder="e.g. {donator} donated {amount} through superchat." 
                  value={ttsTemplate}
                  onChange={(e) => setTtsTemplate(e.target.value)}
                />
                <div className="input-hint">Use <strong>{`{donator}`}</strong> and <strong>{`{amount}`}</strong> as placeholders.</div>
              </div>

              <div className="form-group">
                <label>TTS Reader Voice</label>
                <select 
                  className="input-control select-control"
                  value={selectedVoiceName || 'female'}
                  onChange={(e) => setSelectedVoiceName(e.target.value)}
                >
                  <option value="female">Default Female Voice</option>
                  <option value="male">Default Male Voice</option>
                </select>
              </div>

              <div className="settings-row" style={{ marginTop: '20px' }}>
                <div className="form-group">
                  <label>Speech Speed: <strong>{ttsRate}x</strong></label>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="2.0" 
                    step="0.05" 
                    className="slider-control" 
                    value={ttsRate}
                    onChange={(e) => setTtsRate(parseFloat(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <label>Voice Pitch: <strong>{ttsPitch}</strong></label>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="2.0" 
                    step="0.05" 
                    className="slider-control" 
                    value={ttsPitch}
                    onChange={(e) => setTtsPitch(parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '25px' }}>Save Voice Configurations</button>
            </form>
          </div>
        </div>
      </div>




      {/* CSS STYLING */}
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --primary: #ffb84d;
          --primary-glow: rgba(255, 184, 77, 0.3);
          --bg-gradient: radial-gradient(circle at top, #141424 0%, #07070d 100%);
          --glass-bg: rgba(20, 18, 32, 0.7);
          --glass-border: rgba(255, 255, 255, 0.05);
          --text-muted: rgba(255, 255, 255, 0.45);

          --status-disconnected: #ff5252;
          --status-connecting: #ffeb3b;
          --status-action: #2196f3;
          --status-connected: #00e676;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Outfit', sans-serif;
          background: var(--bg-gradient);
          color: #ffffff;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .dashboard-wrapper {
          display: flex;
          min-height: 100vh;
          background: transparent;
        }

        /* SIDEBAR STYLES */
        .sidebar {
          width: 290px;
          background: linear-gradient(180deg, rgba(12, 10, 24, 0.98) 0%, rgba(7, 7, 13, 0.99) 100%);
          box-shadow: 1px 0 0 0 var(--glass-border);
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 10;
        }

        .app-branding {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 50px;
          cursor: pointer;
        }

        .branding-icon {
          font-size: 26px;
          color: var(--primary);
          filter: drop-shadow(0 0 10px var(--primary-glow));
        }

        .branding-title {
          font-size: 20px;
          font-weight: 900;
          letter-spacing: -0.5px;
        }

        .branding-subtitle {
          font-size: 11px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 700;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 14px 20px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-left: 3px solid transparent;
        }

        .nav-item:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.02);
          transform: translateX(3px);
        }

        .nav-item.active {
          color: #ffffff;
          background: rgba(255, 184, 77, 0.08);
          border-left-color: var(--primary);
          box-shadow: inset 4px 0 15px rgba(255, 184, 77, 0.08);
        }

        .nav-icon {
          font-size: 17px;
          filter: drop-shadow(0 2px 5px rgba(0,0,0,0.3));
        }

        .sidebar-footer {
          border-top: 1px solid var(--glass-border);
          padding-top: 25px;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .avatar-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 184, 77, 0.1);
          border: 1px solid rgba(255, 184, 77, 0.25);
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .user-info h2 {
          font-size: 13.5px;
          font-weight: 700;
          color: #ffffff !important;
          margin: 0;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-info p {
          font-size: 11px;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .btn-logout {
          width: 100%;
          background: rgba(255, 82, 82, 0.08);
          border: 1px solid rgba(255, 82, 82, 0.15);
          color: #ff5252;
          padding: 12px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-logout:hover {
          background: #ff5252;
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(255, 82, 82, 0.3);
        }

        /* MAIN CONTENT */
        .main-content {
          margin-left: 290px;
          flex-grow: 1;
          padding: 24px;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: transparent;
        }

        .dashboard-container {
          max-width: 100%;
          margin: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          position: relative;
          transition: border-color 0.3s;
        }

        .card:hover {
          border-color: rgba(255, 184, 77, 0.15);
        }

        /* WORKSPACE LAYOUT */
        .workspace-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 24px;
          align-items: start;
        }

        .mobile-menu-toggle {
          display: none;
        }

        .drawer-close-btn {
          display: none;
        }

        .dashboard-container .timeframe-selector {
          display: flex;
          background: rgba(20, 18, 30, 0.6) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          padding: 4px;
          border-radius: 12px;
          gap: 4px;
          align-items: center;
          overflow-x: auto;
          scrollbar-width: none;
          max-width: 100%;
        }

        .dashboard-container .timeframe-selector::-webkit-scrollbar {
          display: none;
        }

        .dashboard-container .time-pill {
          background: transparent !important;
          border: 0 !important;
          outline: none !important;
          margin: 0 !important;
          font-family: inherit !important;
          color: #a0aec0 !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          padding: 8px 16px !important;
          border-radius: 8px !important;
          cursor: pointer !important;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
          white-space: nowrap !important;
        }

        .dashboard-container .time-pill:hover {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.05) !important;
        }

        .dashboard-container .time-pill:focus {
          outline: none !important;
        }

        .dashboard-container .time-pill.active {
          background: linear-gradient(135deg, #ffd700 0%, #ffb84d 100%) !important;
          color: #0c0a12 !important;
          font-weight: 700 !important;
          box-shadow: 0 4px 12px rgba(255, 184, 77, 0.2) !important;
        }

        /* RESPONSIVE LAYOUT MEDIA QUERIES */
        @media (max-width: 991px) {
          .mobile-top-bar {
            display: flex;
            align-items: center;
            gap: 12px;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 60px;
            padding: 0 20px;
            background: rgba(10, 8, 18, 0.95);
            border-bottom: 1px solid var(--glass-border);
            z-index: 998;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }

          .mobile-top-bar .app-branding {
            margin-bottom: 0 !important;
            gap: 8px;
          }

          .mobile-menu-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            border: none;
            color: #ffffff;
            font-size: 20px;
            cursor: pointer;
            padding: 6px;
            border-radius: 6px;
            transition: background 0.2s;
          }

          .mobile-menu-toggle:hover {
            background: rgba(255,255,255,0.05);
            color: var(--primary);
          }

          .sidebar-backdrop {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(4, 3, 6, 0.65);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 999;
            animation: drawerFadeIn 0.25s ease-out;
          }

          @keyframes drawerFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .sidebar {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            width: 280px;
            height: 100vh;
            z-index: 1000;
            padding: 24px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: #0d0b16;
            border-right: 1px solid var(--glass-border);
            border-bottom: none;
            transform: translateX(-105%);
            visibility: hidden;
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s;
            box-shadow: none;
          }

          .sidebar.menu-open {
            transform: translateX(0);
            visibility: visible;
            box-shadow: 15px 0 45px rgba(0,0,0,0.65);
          }

          .drawer-close-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            border: none;
            color: var(--text-muted);
            font-size: 20px;
            cursor: pointer;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            transition: all 0.2s;
          }

          .drawer-close-btn:hover {
            color: #ffffff;
            background: rgba(255,255,255,0.08);
          }

          .nav-menu {
            display: flex;
            flex-direction: column !important;
            width: 100%;
            gap: 8px !important;
          }

          .nav-item {
            width: 100% !important;
            height: auto !important;
            padding: 14px 20px !important;
            border-radius: 10px !important;
            display: flex !important;
            justify-content: flex-start !important;
            align-items: center !important;
            border-left: 3px solid transparent !important;
            border-bottom: none !important;
          }

          .nav-item.active {
            border-left-color: var(--primary) !important;
            background: rgba(255, 184, 77, 0.08) !important;
          }

          .nav-text {
            display: inline !important;
            font-size: 15px;
          }

          .nav-icon {
            margin-right: 0 !important;
          }

          .sidebar-footer {
            display: flex;
            width: 100%;
            border-top: 1px solid var(--glass-border);
            padding-top: 20px;
            margin-top: 20px;
            flex-direction: column;
          }

          .user-profile {
            display: flex !important;
            margin-bottom: 15px;
          }

          .btn-logout {
            padding: 12px !important;
            font-size: 14px !important;
            width: 100%;
          }

          .main-content {
            margin-left: 0 !important;
            padding: 20px !important;
            padding-top: 85px !important;
            max-width: 100% !important;
            height: auto !important;
            overflow: visible !important;
          }

          .dashboard-container {
            height: auto !important;
          }

          .workspace-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .nav-menu {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 576px) {
          .sidebar {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          .sidebar > div {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
            width: 100%;
          }
          .nav-menu {
            width: 100%;
          }
          .sidebar-footer {
            width: 100%;
            justify-content: flex-end;
          }
        }

        .workspace-column {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        /* CARDS AND PLATES */
        .card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 35px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25);
          position: relative;
        }

        .card h3 {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 10px;
        }

        .card-desc {
          font-size: 14px;
          color: var(--text-muted);
        }

        /* LIVE STATUS WIDGET */
        .status-widget .widget-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .status-indicator-tag {
          font-size: 12px;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 50px;
        }

        .status-active {
          color: var(--status-connected);
          background: rgba(0, 230, 118, 0.08);
          border: 1px solid rgba(0, 230, 118, 0.15);
        }

        .status-waiting {
          color: var(--status-connecting);
          background: rgba(255, 235, 59, 0.08);
          border: 1px solid rgba(255, 235, 59, 0.15);
        }

        .status-inactive {
          color: var(--status-disconnected);
          background: rgba(255, 82, 82, 0.08);
          border: 1px solid rgba(255, 82, 82, 0.15);
        }

        .status-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 25px;
        }

        .status-metric {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 16px;
        }

        .metric-label {
          font-size: 12px;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .metric-val {
          font-size: 16px;
          font-weight: 800;
          margin-top: 5px;
        }

        .btn-action-primary {
          width: 100%;
          background: linear-gradient(135deg, #ffb84d 0%, #ff9800 100%);
          color: #000000;
          border: none;
          border-radius: 14px;
          padding: 16px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(255, 184, 77, 0.2);
          transition: all 0.3s;
        }

        .btn-action-primary:hover {
          box-shadow: 0 6px 20px rgba(255, 184, 77, 0.35);
          transform: translateY(-1px);
        }

        /* CUSTOMIZATION WIDGET */
        .custom-summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 20px;
          margin-bottom: 30px;
        }

        .summary-stat {
          background: rgba(255,255,255,0.015);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 15px 18px;
        }

        .stat-label {
          font-size: 12px;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }

        .stat-val {
          font-size: 15px;
          font-weight: 800;
        }

        .color-swatch {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          display: inline-block;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .btn-action-secondary {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--glass-border);
          color: #ffffff;
          border-radius: 12px;
          padding: 12px 18px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-action-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .grid-gap-10 {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .gap-10 { gap: 10px; }
        .flex-center { display: flex; align-items: center; }

        /* INTEGRATION WIDGET */
        .integration-row {
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 20px;
          margin-bottom: 20px;
        }

        .integration-title {
          font-size: 14px;
          font-weight: 800;
          color: var(--primary);
        }

        .integration-desc {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 4px;
          margin-bottom: 12px;
        }

        .copy-action-row {
          display: flex;
          gap: 12px;
        }

        .text-read {
          background: rgba(0,0,0,0.3) !important;
          border-color: rgba(255,255,255,0.04) !important;
          color: var(--text-muted) !important;
          cursor: not-allowed;
          font-family: monospace;
          font-size: 12px !important;
        }

        /* LIVE PREVIEW MONITOR */
        .monitor-widget {
          padding: 25px;
        }

        .monitor-badge {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin-bottom: 15px;
        }

        .monitor-frame-container {
          background: #000000;
          border: 2px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          aspect-ratio: 4 / 3;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
        }

        .preview-iframe {
          width: 800px;
          height: 600px;
          border: none;
          transform: scale(0.5);
          transform-origin: top left;
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 200%;
        }

        @media (max-width: 1400px) {
          .preview-iframe {
            transform: scale(0.42);
            width: 238%;
            height: 238%;
          }
        }

        .monitor-tip {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 15px;
          text-align: center;
        }

        /* INPUT CONTROLS */
        .form-group {
          margin-bottom: 20px;
          text-align: left;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 8px;
          color: rgba(255, 255, 255, 0.85);
        }

        .input-control {
          width: 100%;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          padding: 12px 16px;
          color: #ffffff;
          font-family: inherit;
          font-size: 14px;
          transition: all 0.3s;
        }

        .input-control:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 10px var(--primary-glow);
        }

        .select-control {
          cursor: pointer;
          background: rgba(0,0,0,0.5);
        }

        .checkbox-control {
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: var(--primary);
        }

        .slider-control {
          width: 100%;
          cursor: pointer;
          accent-color: var(--primary);
          height: 6px;
          border-radius: 10px;
          background: rgba(0,0,0,0.35);
        }

        .input-hint {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 5px;
        }

        .settings-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        /* BUTTONS */
        .btn {
          border-radius: 12px;
          padding: 14px 24px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--primary) 0%, #ffa726 100%);
          color: #000000;
          border: none;
          box-shadow: 0 4px 15px rgba(255, 184, 77, 0.2);
        }

        .btn-primary:hover {
          box-shadow: 0 6px 20px rgba(255, 184, 77, 0.4);
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: #ffffff;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .btn-disconnect {
          background: rgba(255, 82, 82, 0.08);
          border: 1px solid rgba(255, 82, 82, 0.2);
          color: #ff5252;
          border-radius: 12px;
          padding: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-disconnect:hover {
          background: #ff5252;
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(255, 82, 82, 0.3);
        }

        .error-msg {
          background: rgba(255, 82, 82, 0.08);
          border: 1px solid rgba(255, 82, 82, 0.2);
          color: #ff5252;
          padding: 12px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
        }

        .text-truncate {
          white-space: nowrap;
          overflow: hidden;
          text-referrer: ellipsis;
        }

        /* STATUS DOT */
        .status-indicator-box {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 18px 22px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
        }

        .status-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          box-shadow: 0 0 10px currentColor;
        }

        .status-label {
          font-size: 12px;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .status-value {
          font-size: 16px;
          font-weight: 800;
          margin-top: 2px;
        }

        /* TRANSACTION LOGS */
        .logs-container {
          max-height: 380px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-right: 5px;
        }

        .log-entry {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 14px;
          padding: 16px 20px;
          font-size: 14px;
          line-height: 1.5;
        }

        .log-entry.payment {
          border-left: 4px solid var(--status-connected);
        }

        .log-time {
          font-size: 11px;
          color: var(--text-muted);
          margin-bottom: 5px;
          font-family: monospace;
        }

        .log-message {
          font-size: 13px;
          color: rgba(255,255,255,0.7);
          margin-top: 8px;
          background: rgba(0,0,0,0.15);
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.02);
        }

        .no-logs {
          color: var(--text-muted);
          text-align: center;
          padding: 40px;
          font-size: 14px;
        }

        /* MODAL OVERLAY STYLES */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(5, 4, 8, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 100;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          pointer-events: none;
          transition: all 0.4s ease;
        }

        .modal-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }

        .modal-card {
          background: rgba(22, 20, 36, 0.85);
          border: 1px solid var(--glass-border);
          border-radius: 28px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.05);
          transform: translateY(40px) scale(0.95);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.15);
          overflow: hidden;
        }

        .modal-overlay.active .modal-card {
          transform: translateY(0) scale(1);
        }

        .modal-header {
          padding: 30px 35px 20px 35px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--glass-border);
        }

        .modal-header h3 {
          font-size: 19px;
          font-weight: 800;
        }

        .modal-close {
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: var(--text-muted);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          transition: all 0.3s;
        }

        .modal-close:hover {
          color: #ffffff;
          background: rgba(255,255,255,0.1);
        }

        .modal-body {
          padding: 35px;
          max-height: 75vh;
          overflow-y: auto;
        }

        .flex-align {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .color-picker {
          height: 50px;
          padding: 5px !important;
          cursor: pointer;
        }

        .kpi-card {
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .kpi-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.12) !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .table-row-hover:hover {
          background: rgba(255, 255, 255, 0.03) !important;
        }

        /* SCROLLBAR CUSTOMIZATION */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        /* ANIMATIONS */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease forwards;
        }
      `}} />
    </div>
  );
}
