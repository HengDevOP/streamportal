"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StreamOverlayPage() {
  const router = useRouter();
  
  // Scoped User
  const [myUsername, setMyUsername] = useState('');
  
  // Telegram status
  const [telStatus, setTelStatus] = useState('DISCONNECTED');
  const [telError, setTelError] = useState('');
  const [telGroupId, setTelGroupId] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [groupInput, setGroupInput] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  
  // Scoped Links
  const [obsLink, setObsLink] = useState('');
  const [donationLink, setDonationLink] = useState('');
  const [topDonationLink, setTopDonationLink] = useState('');
  const [iframeSrc, setIframeSrc] = useState('about:blank');

  // Preview Simulator
  const [testDonorName, setTestDonorName] = useState('Ninja Donor');
  const [testDonorMessage, setTestDonorMessage] = useState('This is a test donation alert preview!');

  // Modals
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [isTtsModalOpen, setIsTtsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Voice Settings
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

    poll();
    const interval = setInterval(poll, 2000);
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
      if (res.ok) {
        setIsTtsModalOpen(false);
        alert("✅ TTS Reader configurations saved successfully!");
      } else {
        alert("Failed to save settings.");
      }
    } catch (err) {
      console.error(err);
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
      await fetch('/api/user/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertConfig })
      });
      
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
    }
  }

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
            <div className="nav-item" onClick={() => { setIsMobileMenuOpen(false); router.push('/dashboard/overview'); }}>
              <i className="fa-solid fa-chart-simple nav-icon"></i> <span className="nav-text">Dashboard</span>
            </div>

            <div className="nav-item active" onClick={() => { setIsMobileMenuOpen(false); router.push('/dashboard/overlay'); }}>
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

      <main className="main-content">
        <div className="dashboard-container">
        <div className="card" style={{ padding: '18px 24px', marginBottom: '16px', flexShrink: 0 }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-layer-group" style={{ color: 'var(--primary)' }}></i> Stream Overlay Integrations
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px', lineHeight: '1.5' }}>
            Add these customizable dynamic overlay URLs as Browser Sources inside OBS Studio or Streamlabs. This lets your stream display automated real-time donation cards, text-to-speech audio, and top contributor tables.
          </p>
        </div>

        <div className="workspace-grid">
          
          <div className="workspace-column">
            
            {/* OBS Sources Copy Cards */}
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px', marginBottom: '22px' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <h3 style={{ fontSize: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}>
                    <i className="fa-solid fa-bell" style={{ color: 'var(--primary)', fontSize: '14px' }}></i> OBS Browser Source Alert URL
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12.5px', marginTop: '4px' }}>
                    Displays real-time donation alerts with sound notifications and triggers the Khmer & English speech reader.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '5px' }}>
                  <input type="text" className="input-control text-read" value={obsLink} readOnly style={{ padding: '8px 12px', fontSize: '13px' }} />
                  <button className="btn btn-secondary" id="btn-copy-obs" onClick={() => copyToClipboard(obsLink, 'btn-copy-obs')} style={{ padding: '8px 16px', fontSize: '13px' }}>Copy</button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px', marginBottom: '22px', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <h3 style={{ fontSize: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}>
                    <i className="fa-solid fa-trophy" style={{ color: '#ffd700', fontSize: '14px' }}></i> OBS Top Donation Overlay URL
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12.5px', marginTop: '4px' }}>
                    Displays a clean list of top stream financial contributors directly on your live broadcast layouts.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '5px' }}>
                  <input type="text" className="input-control text-read" value={topDonationLink} readOnly style={{ padding: '8px 12px', fontSize: '13px' }} />
                  <button className="btn btn-secondary" id="btn-copy-top" onClick={() => copyToClipboard(topDonationLink, 'btn-copy-top')} style={{ padding: '8px 16px', fontSize: '13px' }}>Copy</button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <h3 style={{ fontSize: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}>
                    <i className="fa-solid fa-heart" style={{ color: '#ff5252', fontSize: '14px' }}></i> Supporter Tip Page URL
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12.5px', marginTop: '4px' }}>
                    Provide this page link to your viewers to display your payment QR receipt to let viewers send customized tips.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '5px' }}>
                  <input type="text" className="input-control text-read" value={donationLink} readOnly style={{ padding: '8px 12px', fontSize: '13px' }} />
                  <button className="btn btn-secondary" id="btn-copy-donate" onClick={() => copyToClipboard(donationLink, 'btn-copy-donate')} style={{ padding: '8px 16px', fontSize: '13px' }}>Copy</button>
                </div>
              </div>
            </div>

            {/* Connection Status Setup */}
            <div className="card" style={{ padding: '24px' }}>
              <div className="widget-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '15px' }}>
                  <i className="fa-solid fa-circle-nodes" style={{ marginRight: '8px', color: 'var(--primary)' }}></i> Connection Status
                </h3>
                <div 
                  className={`status-indicator-tag ${
                    telStatus === 'CONNECTED' ? 'status-active' : 
                    (telStatus === 'CONNECTING' ? 'status-waiting' : 'status-inactive')
                  }`}
                  style={{
                    fontSize: '11px', padding: '3px 8px', borderRadius: '20px', fontWeight: '700',
                    background: telStatus === 'CONNECTED' ? 'rgba(0,230,118,0.15)' : (telStatus === 'CONNECTING' ? 'rgba(255,235,59,0.15)' : 'rgba(255,82,82,0.15)'),
                    color: telStatus === 'CONNECTED' ? '#00e676' : (telStatus === 'CONNECTING' ? '#ffeb3b' : '#ff5252')
                  }}
                >
                  {telStatus === 'CONNECTED' ? 'CONNECTED' : (telStatus === 'CONNECTING' ? 'SYNCING' : 'DISCONNECTED')}
                </div>
              </div>
              
              <div className="status-grid" style={{ display: 'flex', gap: '15px', marginBottom: '14px' }}>
                <div className="status-metric" style={{ flex: 1 }}>
                  <div className="metric-label" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Telegram Client</div>
                  <div className="metric-val" style={{ fontSize: '13.5px', fontWeight: 'bold' }}>{telStatus === 'CONNECTED' ? 'Active Listener' : 'Idle'}</div>
                </div>
                <div className="status-metric" style={{ flex: 1 }}>
                  <div className="metric-label" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Listening Group ID</div>
                  <div className="metric-val" style={{ fontSize: '13.5px', fontWeight: 'bold', wordBreak: 'break-all' }}>{telGroupId || 'None'}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button className="btn btn-primary" style={{ flex: 1, padding: '10px', fontSize: '13px' }} onClick={() => setIsTelegramModalOpen(true)}>
                  Configure Connection
                </button>
                {telStatus === 'CONNECTED' && (
                  <button className="btn btn-secondary" style={{ borderColor: 'rgba(255,82,82,0.3)', color: '#ff5252', padding: '10px' }} onClick={disconnectTelegram}>
                    Disconnect
                  </button>
                )}
              </div>
            </div>

          </div>

          <div className="workspace-column">
            
            {/* Monitor Preview Frame */}
            <div className="card monitor-widget" style={{ padding: '20px' }}>
              <div className="monitor-badge" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '12px' }}>
                <i className="fa-solid fa-tv" style={{ marginRight: '6px' }}></i> WIDGET PREVIEW
              </div>
              <div className="monitor-frame-container" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)' }}>
                <iframe id="overlayPreviewIframe" className="preview-iframe" src={iframeSrc} allow="autoplay" style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
                💡 Click inside preview screen once to authorize browser media autoplay.
              </div>
            </div>

            {/* Simulated Alerts Trigger */}
            <div className="card simulator-widget" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>
                <i className="fa-solid fa-flask" style={{ marginRight: '8px', color: '#ea1e63' }}></i> Simulation Engine
              </h3>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="testDonorName" style={{ fontSize: '11.5px', marginBottom: '6px' }}>Test Donor Name</label>
                <input type="text" id="testDonorName" className="input-control" value={testDonorName} onChange={(e) => setTestDonorName(e.target.value)} style={{ padding: '8px 12px', fontSize: '13.5px' }} />
              </div>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="testDonorMessage" style={{ fontSize: '11.5px', marginBottom: '6px' }}>Test Supporter Comment</label>
                <input type="text" id="testDonorMessage" className="input-control" value={testDonorMessage} onChange={(e) => setTestDonorMessage(e.target.value)} style={{ padding: '8px 12px', fontSize: '13.5px' }} />
              </div>
              <button className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '13.5px' }} onClick={triggerTestAlert}>
                <i className="fa-solid fa-volume-high" style={{ marginRight: '8px' }}></i> Trigger Preview Alert
              </button>
            </div>

          </div>

        </div>
        </div>
      </main>

      {/* TELEGRAM SETUP MODAL */}
      <div className={`modal-overlay ${isTelegramModalOpen ? 'active' : ''}`} onClick={() => setIsTelegramModalOpen(false)}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3><i className="fa-solid fa-circle-nodes" style={{ marginRight: '8px', color: 'var(--primary)' }}></i> Telegram Client Setup</h3>
            <button className="modal-close" onClick={() => setIsTelegramModalOpen(false)}>✕</button>
          </div>
          <div className="modal-body">
            
            <div className="status-indicator-box" style={{ marginBottom: '25px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Status Step flow</div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <span className={`step-badge ${telegramFlowStep === 'phone' ? 'active' : ''}`}>Phone</span>
                <span className="step-arrow">→</span>
                <span className={`step-badge ${telegramFlowStep === 'code' ? 'active' : ''}`}>Code</span>
                <span className="step-arrow">→</span>
                <span className={`step-badge ${telegramFlowStep === 'password' ? 'active' : ''}`}>Password</span>
                <span className="step-arrow">→</span>
                <span className={`step-badge ${telegramFlowStep === 'group' ? 'active' : ''}`}>Group</span>
              </div>
            </div>

            {telError && <div className="error-alert" style={{ background: 'rgba(255,82,82,0.1)', color: '#ff5252', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', border: '1px solid rgba(255,82,82,0.15)' }}>⚠️ {telError}</div>}

            {telegramFlowStep === 'phone' && (
              <form onSubmit={connectTelegram}>
                <div className="form-group">
                  <label htmlFor="phoneInput">Telegram Phone Number</label>
                  <input 
                    type="text" 
                    id="phoneInput" 
                    className="input-control" 
                    placeholder="e.g. +85512345678" 
                    value={phoneInput} 
                    onChange={(e) => setPhoneInput(e.target.value)}
                  />
                  <div className="input-hint" style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '6px' }}>Include international code (e.g. +855 for Cambodia)</div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Request Verification Code</button>
              </form>
            )}

            {telegramFlowStep === 'code' && (
              <div>
                <div className="form-group">
                  <label htmlFor="codeVal">Enter Verification Code</label>
                  <input 
                    type="text" 
                    id="codeVal" 
                    className="input-control" 
                    placeholder="Code sent to Telegram..." 
                    value={verifyCode} 
                    onChange={(e) => setVerifyCode(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} onClick={submitCode}>Submit Verification Code</button>
              </div>
            )}

            {telegramFlowStep === 'password' && (
              <div>
                <div className="form-group">
                  <label htmlFor="passwordVal">Two-Step Verification Password</label>
                  <input 
                    type="password" 
                    id="passwordVal" 
                    className="input-control" 
                    placeholder="Enter Telegram 2FA Password..." 
                    value={passwordInput} 
                    onChange={(e) => setPasswordInput(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} onClick={submitPassword}>Unlock Client Session</button>
              </div>
            )}

            {telegramFlowStep === 'group' && (
              <form onSubmit={saveGroupId}>
                <div className="form-group">
                  <label htmlFor="groupId">Listening Telegram Group ID</label>
                  <input 
                    type="text" 
                    id="groupId" 
                    className="input-control" 
                    placeholder="e.g. -10023456789 or 5105279786" 
                    value={groupInput} 
                    onChange={(e) => setGroupInput(e.target.value)}
                  />
                  <div className="input-hint" style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '6px' }}>Receipt logs will only process from this chat group identifier.</div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Finalize Sync Details</button>
              </form>
            )}

          </div>
        </div>
      </div>

      {/* TTS MODAL POPUP */}
      <div className={`modal-overlay ${isTtsModalOpen ? 'active' : ''}`} onClick={() => setIsTtsModalOpen(false)}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3><i className="fa-solid fa-sliders" style={{ marginRight: '8px', color: 'var(--primary)' }}></i> Voice & Speech Customization</h3>
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

      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --primary: #ffb84d;
          --primary-glow: rgba(255, 184, 77, 0.35);
          --secondary: #00e676;
          --bg-gradient: radial-gradient(circle at 10% 20%, #171520 0%, #0d0c12 100%);
          --card-bg: rgba(18, 16, 28, 0.6);
          --glass-bg: rgba(255, 255, 255, 0.02);
          --glass-border: rgba(255, 255, 255, 0.05);
          --text-muted: #a0aec0;
          --accent: #5e35b1;
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

        .workspace-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 20px;
          flex-grow: 1;
          min-height: 0;
        }

        .workspace-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
          overflow-y: auto;
          height: 100%;
          min-height: 0;
          padding-right: 4px;
          scrollbar-width: thin;
        }

        .monitor-frame-container {
          height: 250px;
          border-radius: 10px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--glass-border);
        }

        .input-control {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: #ffffff;
          font-size: 14px;
          outline: none;
          transition: all 0.3s;
          width: 100%;
        }

        .input-control:focus {
          border-color: var(--primary);
          box-shadow: 0 0 10px var(--primary-glow);
          background: rgba(255, 255, 255, 0.04);
        }

        .text-read {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255,255,255,0.06);
          color: #ffb84d;
          font-weight: 500;
          font-family: monospace;
          cursor: default;
        }

        .btn {
          padding: 12px 28px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 14.5px;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-primary {
          background: var(--primary);
          color: #0b0914;
        }

        .btn-primary:hover {
          background: #ffa726;
          box-shadow: 0 0 20px var(--primary-glow);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--glass-border);
          color: #ffffff;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* MODALS */
        .modal-overlay {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(5, 4, 8, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .modal-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }

        .modal-card {
          background: #0f0d16;
          border: 1px solid var(--glass-border);
          border-radius: 28px;
          width: 90%;
          max-width: 500px;
          overflow: hidden;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.5);
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }

        .modal-overlay.active .modal-card {
          transform: translateY(0);
        }

        .modal-header {
          padding: 25px 35px;
          border-bottom: 1px solid var(--glass-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          font-size: 17px;
          font-weight: 900;
        }

        .modal-close {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 18px;
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
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

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 8px;
          display: block;
        }

        .select-control {
          appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 18px;
          padding-right: 40px;
        }

        .slider-control {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.08);
          outline: none;
          margin-top: 10px;
        }

        .slider-control::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--primary);
          cursor: pointer;
          box-shadow: 0 0 8px var(--primary-glow);
          transition: transform 0.1s;
        }

        .slider-control::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .settings-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .checkbox-control {
          width: 18px;
          height: 18px;
          accent-color: var(--primary);
          cursor: pointer;
        }

        .flex-align {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* WIZARD BADGES */
        .step-badge {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          color: var(--text-muted);
          font-weight: bold;
        }
        .step-badge.active {
          background: var(--primary);
          color: #0c0a12;
        }
        .step-arrow {
          font-size: 12px;
          color: rgba(255,255,255,0.15);
        }
        
        .mobile-menu-toggle {
          display: none;
        }

        .drawer-close-btn {
          display: none;
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

          .workspace-column {
            height: auto !important;
            overflow: visible !important;
          }

          .workspace-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}} />
    </div>
  );
}
