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
  const [activeTab, setActiveTab] = useState('overview');
  const [isOverlayModalOpen, setIsOverlayModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  const [telegramFlowStep, setTelegramFlowStep] = useState('phone'); // 'phone' | 'code' | 'password' | 'group' | 'success'
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '']);
  const [hasStartedAuth, setHasStartedAuth] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConfirmDisconnectOpen, setIsConfirmDisconnectOpen] = useState(false);

  useEffect(() => {
    if (telStatus === 'NEED_CODE') {
      setTelegramFlowStep('code');
    } else if (telStatus === 'NEED_PASSWORD') {
      setTelegramFlowStep('password');
    } else if (telStatus === 'CONNECTED') {
      if (hasStartedAuth && ['phone', 'code', 'password'].includes(telegramFlowStep)) {
        setTelegramFlowStep('group');
      } else if (!hasStartedAuth && telegramFlowStep !== 'group' && telegramFlowStep !== 'success') {
        setTelegramFlowStep('active');
      }
    } else if (telStatus === 'DISCONNECTED') {
      setTelegramFlowStep('phone');
    }
  }, [telStatus, telegramFlowStep, hasStartedAuth]);

  useEffect(() => {
    setVerifyCode(otpDigits.join(''));
  }, [otpDigits]);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const view = params.get('view');
      if (view === 'overview' || view === 'overlay' || view === 'revenue') {
        setActiveTab(view);
      }
    }
  }, []);

  useEffect(() => {
    document.title = "Overview | StreamPortal Dashboard";
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
        const res = await fetch('/api/telegram/status', { cache: 'no-store' });
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
        const res = await fetch(`/api/all-donations/${myUsername}`, { cache: 'no-store' });
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
    setHasStartedAuth(true);
    setIsConnecting(true);
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
    } finally {
      setIsConnecting(false);
    }
  }

  async function submitCode() {
    setTelError('');
    setIsConnecting(true);
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
    } finally {
      setIsConnecting(false);
    }
  }

  async function submitPassword() {
    setTelError('');
    setIsConnecting(true);
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
    } finally {
      setIsConnecting(false);
    }
  }

  async function saveGroupId(e) {
    if (e) e.preventDefault();
    setTelError('');
    setIsConnecting(true);
    try {
      const res = await fetch('/api/telegram/set-group', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId: groupInput.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        setTelGroupId(data.groupId);
        setTelegramFlowStep('success'); // transition to Step 4
      } else {
        setTelError(data.error || "Failed to save Group ID.");
      }
    } catch (err) {
      console.error(err);
      setTelError("Request error.");
    } finally {
      setIsConnecting(false);
    }
  }

  const handleOtpChange = (index, value) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    const newDigits = [...otpDigits];
    if (cleanValue) {
      newDigits[index] = cleanValue[cleanValue.length - 1];
      setOtpDigits(newDigits);
      if (index < 4) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    } else {
      newDigits[index] = '';
      setOtpDigits(newDigits);
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        const newDigits = [...otpDigits];
        newDigits[index - 1] = '';
        setOtpDigits(newDigits);
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        if (prevInput) prevInput.focus();
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{5}$/.test(pastedData)) {
      setOtpDigits(pastedData.split(''));
      const lastInput = document.getElementById('otp-input-4');
      if (lastInput) lastInput.focus();
    }
  };

  async function confirmDisconnectTelegram() {
    setIsConfirmDisconnectOpen(false);
    setIsConnecting(true);
    try {
      await fetch('/api/telegram/disconnect', { method: 'POST' });
      setTelStatus('DISCONNECTED');
      setTelegramFlowStep('phone');
      setHasStartedAuth(false);
      setIsTelegramModalOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsConnecting(false);
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

  // Mock function to trigger a CSV download of logs
  function exportCSV() {
    if (logs.length === 0) return;
    const headers = ["Timestamp", "Donor Name", "Amount", "Currency", "USD Equivalent", "Message"];
    const rows = logs.map(log => [
      new Date(log.time).toISOString(),
      log.name,
      log.amount,
      log.currency,
      log.amountUSD || (log.currency === '៛' ? log.amount / 4000 : log.amount),
      log.message || ""
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val.toString().replace(/"/g, '""')}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${myUsername}_stream_revenue.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function renderOverlayView() {
    return (
      <>
        <div className="card" style={{ padding: '18px 24px', marginBottom: '16px', flexShrink: 0 }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-layer-group" style={{ color: 'var(--primary)' }}></i> Stream Overlay Customizer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px', lineHeight: '1.5' }}>
            Configure visual styling, colors, and AI voice settings for your live stream widgets. Copy the Browser Source links below and paste them into OBS Studio or Streamlabs.
          </p>
        </div>

        <div className="workspace-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          
          {/* LEFT COLUMN: Links, Connection, Styles, Speech */}
          <div className="workspace-column" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* 1. OBS Source Copy Cards */}
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

            {/* 2. Connection Status */}
            <div className="card" style={{ padding: '24px' }}>
              <div className="widget-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '800' }}>
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
                  <button className="btn btn-secondary" style={{ borderColor: 'rgba(255,82,82,0.3)', color: '#ff5252', padding: '10px' }} onClick={() => setIsConfirmDisconnectOpen(true)}>
                    Disconnect
                  </button>
                )}
              </div>
            </div>

            {/* 3. Voice & Speech Customization */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', marginBottom: '20px' }}>
                <i className="fa-solid fa-sliders" style={{ color: 'var(--primary)' }}></i> Voice & Speech Customizer
              </h3>
              <form onSubmit={saveSettings}>
                <div className="form-group flex-align" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--glass-border)', marginBottom: '20px' }}>
                  <input 
                    type="checkbox" 
                    id="ttsEnabledCheck"
                    className="checkbox-control" 
                    checked={ttsEnabled}
                    onChange={(e) => setTtsEnabled(e.target.checked)}
                  />
                  <label htmlFor="ttsEnabledCheck" style={{ marginBottom: 0, cursor: 'pointer', userSelect: 'none', fontSize: '13.5px', fontWeight: '600' }}>
                    Enable AI Khmer & English Text-to-Speech
                  </label>
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ fontSize: '12.5px', display: 'block', marginBottom: '6px' }}>TTS Read-out Speech Template</label>
                  <input 
                    type="text" 
                    className="input-control" 
                    placeholder="e.g. {donator} donated {amount} through superchat." 
                    value={ttsTemplate}
                    onChange={(e) => setTtsTemplate(e.target.value)}
                  />
                  <div className="input-hint" style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Use <strong>{`{donator}`}</strong> and <strong>{`{amount}`}</strong> as placeholders.</div>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '12.5px', display: 'block', marginBottom: '6px' }}>TTS Reader Voice</label>
                  <select 
                    className="input-control select-control"
                    value={selectedVoiceName || 'female'}
                    onChange={(e) => setSelectedVoiceName(e.target.value)}
                    style={{ background: '#0a0910' }}
                  >
                    <option value="female">Default Female Voice</option>
                    <option value="male">Default Male Voice</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '12.5px', display: 'block', marginBottom: '6px' }}>Speech Speed: <strong>{ttsRate}x</strong></label>
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
                    <label style={{ fontSize: '12.5px', display: 'block', marginBottom: '6px' }}>Voice Pitch: <strong>{ttsPitch}</strong></label>
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

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '13.5px' }}>Save Voice Configurations</button>
              </form>
            </div>

          </div>

          {/* RIGHT COLUMN: Preview, Simulator, Visual Themes */}
          <div className="workspace-column" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* 1. Monitor Preview Frame */}
            <div className="card monitor-widget" style={{ padding: '20px' }}>
              <div className="monitor-badge" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '12px' }}>
                <i className="fa-solid fa-tv" style={{ marginRight: '6px' }}></i> WIDGET PREVIEW
              </div>
              <div className="monitor-frame-container" style={{ height: '220px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)' }}>
                <iframe id="overlayPreviewIframe" className="preview-iframe" src={iframeSrc} allow="autoplay" style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
                💡 Click inside preview screen once to authorize browser media autoplay.
              </div>
            </div>

            {/* 2. Simulation Engine */}
            <div className="card simulator-widget" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '14px' }}>
                <i className="fa-solid fa-flask" style={{ marginRight: '8px', color: '#ea1e63' }}></i> Simulation Engine
              </h3>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="testDonorName" style={{ fontSize: '12px', marginBottom: '6px', display: 'block' }}>Test Donor Name</label>
                <input type="text" id="testDonorName" className="input-control" value={testDonorName} onChange={(e) => setTestDonorName(e.target.value)} style={{ padding: '8px 12px', fontSize: '13.5px' }} />
              </div>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="testDonorMessage" style={{ fontSize: '12px', marginBottom: '6px', display: 'block' }}>Test Supporter Comment</label>
                <input type="text" id="testDonorMessage" className="input-control" value={testDonorMessage} onChange={(e) => setTestDonorMessage(e.target.value)} style={{ padding: '8px 12px', fontSize: '13.5px' }} />
              </div>
              <button className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '13.5px' }} onClick={triggerTestAlert}>
                <i className="fa-solid fa-volume-high" style={{ marginRight: '8px' }}></i> Trigger Preview Alert
              </button>
            </div>

            {/* 3. Visual Theme Style Customizer */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', marginBottom: '20px' }}>
                <i className="fa-solid fa-palette" style={{ color: 'var(--primary)' }}></i> Visual Alert Customizer
              </h3>
              <form onSubmit={saveSettings}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '12.5px', display: 'block', marginBottom: '6px' }}>Primary Alert Color</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="color" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        style={{ width: '40px', height: '36px', border: 'none', borderRadius: '8px', cursor: 'pointer', padding: 0 }}
                      />
                      <input 
                        type="text" 
                        className="input-control" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        style={{ fontSize: '13px', padding: '6px 8px' }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '12.5px', display: 'block', marginBottom: '6px' }}>Secondary Alert Color</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="color" 
                        value={secondaryColor} 
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        style={{ width: '40px', height: '36px', border: 'none', borderRadius: '8px', cursor: 'pointer', padding: 0 }}
                      />
                      <input 
                        type="text" 
                        className="input-control" 
                        value={secondaryColor} 
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        style={{ fontSize: '13px', padding: '6px 8px' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ fontSize: '12.5px', display: 'block', marginBottom: '6px' }}>Alert Text Template</label>
                  <input 
                    type="text" 
                    className="input-control" 
                    placeholder="e.g. {donator} donated {amount} through super chat!" 
                    value={alertTemplate}
                    onChange={(e) => setAlertTemplate(e.target.value)}
                  />
                  <div className="input-hint" style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Placeholders: <strong>{`{donator}`}</strong> and <strong>{`{amount}`}</strong>.</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '12.5px', display: 'block', marginBottom: '6px' }}>Header Template</label>
                    <input 
                      type="text" 
                      className="input-control" 
                      value={titleTemplate}
                      onChange={(e) => setTitleTemplate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '12.5px', display: 'block', marginBottom: '6px' }}>Footer Template</label>
                    <input 
                      type="text" 
                      className="input-control" 
                      value={footerTemplate}
                      onChange={(e) => setFooterTemplate(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '15px', marginBottom: '20px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '12.5px', display: 'block', marginBottom: '6px' }}>Font Family</label>
                    <select 
                      className="input-control select-control" 
                      value={fontFamily} 
                      onChange={(e) => setFontFamily(e.target.value)}
                      style={{ background: '#0a0910' }}
                    >
                      <option value="Outfit">Outfit</option>
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Poppins">Poppins</option>
                      <option value="Montserrat">Montserrat</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '12.5px', display: 'block', marginBottom: '6px' }}>Duration: <strong>{duration}s</strong></label>
                    <input 
                      type="range" 
                      min="3" 
                      max="30" 
                      step="1" 
                      className="slider-control" 
                      value={duration} 
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '13.5px' }}>Save Style Configurations</button>
              </form>
            </div>

          </div>

        </div>
      </>
    );
  }

  function renderRevenueView() {
    const khrTips = logs.filter(l => l.currency === '៛');
    const usdTips = logs.filter(l => l.currency === '$');
    const totalKhrSum = khrTips.reduce((sum, l) => sum + l.amount, 0);
    const totalUsdSum = usdTips.reduce((sum, l) => sum + l.amount, 0);

    const contributorMap = {};
    logs.forEach(log => {
      const name = log.name || 'Unknown';
      const usdVal = log.amountUSD || (log.currency === '៛' ? log.amount / 4000 : log.amount);
      if (!contributorMap[name]) {
        contributorMap[name] = { name, total: 0, count: 0 };
      }
      contributorMap[name].total += usdVal;
      contributorMap[name].count += 1;
    });
    const sortedContributors = Object.values(contributorMap)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    return (
      <>
        {/* HEADER TITLE CARD */}
        <div className="card" style={{ padding: '20px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa-solid fa-sack-dollar" style={{ color: '#69f0ae' }}></i> Stream Revenue Hub
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginTop: '4px' }}>
              Detailed financial metrics, currency breakdowns, and ABA bank synced transaction logs.
            </p>
          </div>
          <button className="btn btn-primary" onClick={exportCSV} disabled={logs.length === 0} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', padding: '10px 16px' }}>
            <i className="fa-solid fa-file-export"></i> Export Financial Ledger (.CSV)
          </button>
        </div>

        {/* REVENUE STATS GRID */}
        <div className="kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '25px' }}>
          
          <div className="card kpi-card" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '15px', top: '15px', opacity: 0.1, fontSize: '32px' }}>
              <i className="fa-solid fa-money-bill-trend-up" style={{ color: '#00e676' }}></i>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Lifetime Earnings</div>
            <div style={{ fontSize: '26px', fontWeight: '900', color: '#00e676', marginTop: '8px', textShadow: '0 0 10px rgba(0,230,118,0.2)' }}>
              ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
              Average tip value: ${(avgDonation || 0).toFixed(2)} USD
            </div>
          </div>

          <div className="card kpi-card" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '15px', top: '15px', opacity: 0.1, fontSize: '32px' }}>
              <i className="fa-solid fa-vault" style={{ color: '#ffb84d' }}></i>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px' }}>ABA Synced Revenue</div>
            <div style={{ fontSize: '26px', fontWeight: '900', color: '#ffffff', marginTop: '8px' }}>
              {logs.length} transactions
            </div>
            <div style={{ fontSize: '11px', color: '#00e676', fontWeight: '700', marginTop: '6px' }}>
              🟢 100% Sync match accuracy
            </div>
          </div>

          <div className="card kpi-card" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '15px', top: '15px', opacity: 0.1, fontSize: '32px' }}>
              <i className="fa-solid fa-coins" style={{ color: '#ffd700' }}></i>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px' }}>USD Total Split</div>
            <div style={{ fontSize: '26px', fontWeight: '900', color: '#ffd700', marginTop: '8px' }}>
              ${totalUsdSum.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
              USD deposits: {usdTips.length} tips
            </div>
          </div>

          <div className="card kpi-card" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '15px', top: '15px', opacity: 0.1, fontSize: '32px' }}>
              <i className="fa-solid fa-wallet" style={{ color: '#a78bfa' }}></i>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px' }}>KHR Total Split</div>
            <div style={{ fontSize: '26px', fontWeight: '900', color: '#a78bfa', marginTop: '8px' }}>
              {totalKhrSum.toLocaleString()} ៛
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
              KHR deposits: {khrTips.length} tips
            </div>
          </div>

        </div>

        {/* TWO COLUMN REVENUE ANALYTICS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', minHeight: 0 }}>
          
          {/* COLUMN 1: Payout Console, Contributor tier widgets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Payout & Settlement Console */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-credit-card" style={{ color: 'var(--primary)' }}></i> Bank Settlement & Payouts
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '12.5px', marginBottom: '20px', lineHeight: '1.4' }}>
                Since StreamPortal operates in self-hosted listener mode, tips are deposited directly into your linked ABA/local bank accounts in real-time. No intermediary holdings or transaction payout delays exist.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Self-Custody Payout Speed</span>
                  <strong style={{ color: '#00e676' }}>⚡ INSTANT</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderTop: '1px dashed var(--glass-border)', paddingTop: '10px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Commission Platform Fees</span>
                  <strong style={{ color: '#00e676' }}>0.00% (FREE)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderTop: '1px dashed var(--glass-border)', paddingTop: '10px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Linked ABA Bank Account</span>
                  <strong style={{ color: '#ffffff' }}>{myUsername ? `Synced (Group @${myUsername})` : '—'}</strong>
                </div>
              </div>
            </div>

            {/* Top Supporter Leaderboard Card */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-ranking-star" style={{ color: '#ffd700' }}></i> Top Financial Supporters
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {sortedContributors.length === 0 ? (
                  <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px', fontSize: '13px' }}>Waiting for supporters...</div>
                ) : (
                  sortedContributors.map((contrib, i) => {
                    const medals = ['🥇', '🥈', '🥉', '✨', '✨'];
                    const badgeColors = ['#ffd700', '#c0c0c0', '#cd7f32', '#90caf9', '#90caf9'];
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '16px', filter: `drop-shadow(0 0 5px ${badgeColors[i]})` }}>{medals[i]}</span>
                          <div>
                            <div style={{ fontSize: '13.5px', fontWeight: 'bold', color: '#fff' }}>{contrib.name}</div>
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{contrib.count} donation receipts</div>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '14.5px', fontWeight: '900', color: '#00e676' }}>${contrib.total.toFixed(2)}</div>
                          <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Support</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

          {/* COLUMN 2: Sync bank logs */}
          <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-list-check" style={{ color: 'var(--primary)' }}></i> Synced Bank Receipts
            </h3>
            
            <div style={{ flexGrow: 1, overflowY: 'auto', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
              {logs.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', padding: '40px 20px', textAlign: 'center', fontSize: '13px' }}>
                  No payment ledger logs synchronized yet.
                </div>
              ) : (
                logs.map((log, index) => (
                  <div key={log.time || index} style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff' }}>{log.name}</span>
                      <span style={{ fontSize: '13.5px', color: '#00e676', fontWeight: '900' }}>
                        {log.currency}{Number(log.amount).toLocaleString()}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                      <span>{new Date(log.time).toLocaleString()}</span>
                      <span>Equiv. ${Number(log.amountUSD || (log.currency === '៛' ? log.amount / 4000 : log.amount)).toFixed(2)}</span>
                    </div>
                    {log.message && (
                      <div style={{ fontSize: '12px', fontStyle: 'italic', color: 'var(--primary)', background: 'rgba(255,184,77,0.03)', padding: '6px 8px', borderRadius: '4px', borderLeft: '2px solid var(--primary)', marginTop: '3px' }}>
                        💬 &ldquo;{log.message}&rdquo;
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </>
    );
  }

  return (
    <div className="dashboard-wrapper">
      
      {/* Mobile Top Header Navigation */}
      <div className="mobile-top-bar">
        <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open Menu">
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="app-branding" onClick={() => router.push('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))' }}>
            <rect width="32" height="32" rx="8" fill="url(#logo-grad-dashboard-mob)" />
            <path d="M11 21L19 11M19 11H13M19 11V17" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="16" cy="16" r="13" stroke="url(#stroke-grad-dashboard-mob)" strokeWidth="1.5" />
            <defs>
              <linearGradient id="logo-grad-dashboard-mob" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8b5cf6" />
                <stop offset="1" stopColor="#ffb84d" />
              </linearGradient>
              <linearGradient id="stroke-grad-dashboard-mob" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
          <h1 className="branding-title" style={{ fontSize: '18px', margin: 0 }}>StreamPortal</h1>
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
            <div className="app-branding" onClick={() => router.push('/')} style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))' }}>
                <rect width="32" height="32" rx="8" fill="url(#logo-grad-dashboard-sidebar)" />
                <path d="M11 21L19 11M19 11H13M19 11V17" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="16" cy="16" r="13" stroke="url(#stroke-grad-dashboard-sidebar)" strokeWidth="1.5" />
                <defs>
                  <linearGradient id="logo-grad-dashboard-sidebar" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8b5cf6" />
                    <stop offset="1" stopColor="#ffb84d" />
                  </linearGradient>
                  <linearGradient id="stroke-grad-dashboard-sidebar" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <h1 className="branding-title" style={{ margin: 0 }}>StreamPortal</h1>
                <span className="branding-subtitle">Dashboard Console</span>
              </div>
            </div>
            <button className="drawer-close-btn" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close Menu">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <nav className="nav-menu">
            <div className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}>
              <i className="fa-solid fa-chart-simple nav-icon"></i> <span className="nav-text">Overview</span>
            </div>

            <div className={`nav-item ${activeTab === 'overlay' ? 'active' : ''}`} onClick={() => { setActiveTab('overlay'); setIsMobileMenuOpen(false); }}>
              <i className="fa-solid fa-layer-group nav-icon"></i> <span className="nav-text">Stream Overlay</span>
            </div>

            <div className={`nav-item ${activeTab === 'revenue' ? 'active' : ''}`} onClick={() => { setActiveTab('revenue'); setIsMobileMenuOpen(false); }}>
              <i className="fa-solid fa-wallet nav-icon"></i> <span className="nav-text">Revenue</span>
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
          
          {activeTab === 'overview' && (
            <>
        
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
                  filteredLogs.map((log, idx) => (
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
        
            </>
          )}

          {activeTab === 'overlay' && renderOverlayView()}

          {activeTab === 'revenue' && renderRevenueView()}

        </div>
      </main>

      {/* LUXURY MODAL POPUPS */}

      {/* MODAL 2: CONFIRM DISCONNECT */}
      <div className={`modal-overlay ${isConfirmDisconnectOpen ? 'active' : ''}`} onClick={() => setIsConfirmDisconnectOpen(false)} style={{ zIndex: 1100 }}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', border: '1px solid rgba(255, 82, 82, 0.15)' }}>
          <div className="modal-header" style={{ borderBottom: '1px solid rgba(255, 82, 82, 0.05)' }}>
            <h3 style={{ color: '#ff5252', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-triangle-exclamation"></i>
              Disconnect Client?
            </h3>
            <button className="modal-close" onClick={() => setIsConfirmDisconnectOpen(false)}>✕</button>
          </div>
          <div className="modal-body" style={{ padding: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '24px' }}>
              Are you sure you want to disconnect the Telegram client? This will clear all active session keys and disable real-time bank receipt alert parsing.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn btn-primary" 
                onClick={confirmDisconnectTelegram}
                style={{ flex: 1, background: '#ff5252', borderColor: '#ff5252', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <div className="spinner-ring" style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.2)', borderLeftColor: '#fff', animation: 'spin-loader 1s linear infinite' }}></div>
                    Disconnecting...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-circle-xmark"></i>
                    Yes, Disconnect
                  </>
                )}
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => setIsConfirmDisconnectOpen(false)}
                style={{ flex: 1 }}
                disabled={isConnecting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: TELEGRAM SETUP */}
      <div className={`modal-overlay ${isTelegramModalOpen ? 'active' : ''}`} onClick={() => setIsTelegramModalOpen(false)}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>
              <i className="fa-solid fa-circle-nodes" style={{ marginRight: '8px', color: 'var(--primary)' }}></i>
              Telegram Client Connection
            </h3>
            <button className="modal-close" onClick={() => setIsTelegramModalOpen(false)}>✕</button>
          </div>
          <div className="modal-body">
            
            {/* Progress Step Indicator Bar */}
            <div className="status-indicator-box" style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.5px' }}>Connection Progress</span>
                <span 
                  className={`status-indicator-tag ${
                    telStatus === 'CONNECTED' ? 'status-active' : 
                    (telStatus === 'CONNECTING' ? 'status-waiting' : 'status-inactive')
                  }`}
                  style={{
                    fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: '850',
                    background: telStatus === 'CONNECTED' ? 'rgba(0,230,118,0.1)' : (telStatus === 'CONNECTING' ? 'rgba(255,235,59,0.1)' : 'rgba(255,82,82,0.1)'),
                    color: telStatus === 'CONNECTED' ? '#00e676' : (telStatus === 'CONNECTING' ? '#ffeb3b' : '#ff5252')
                  }}
                >
                  {telStatus === 'CONNECTED' ? 'CONNECTED' : (telStatus === 'CONNECTING' ? 'SYNCING' : (telStatus?.startsWith?.('NEED') ? 'ACTION REQUIRED' : 'DISCONNECTED'))}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px', alignItems: 'center' }}>
                <span className={`step-badge ${telegramFlowStep === 'phone' ? 'active' : ''}`} style={{ flex: 1, textAlign: 'center', fontSize: '11px', padding: '6px 4px', borderRadius: '8px', background: telegramFlowStep === 'phone' ? 'rgba(255,184,77,0.12)' : 'rgba(255,255,255,0.02)', border: telegramFlowStep === 'phone' ? '1px solid var(--primary)' : '1px solid var(--glass-border)', color: telegramFlowStep === 'phone' ? 'var(--primary)' : 'var(--text-muted)' }}>1. Phone</span>
                <span style={{ color: 'var(--glass-border)', fontSize: '10px' }}>→</span>
                <span className={`step-badge ${['code', 'password'].includes(telegramFlowStep) ? 'active' : ''}`} style={{ flex: 1, textAlign: 'center', fontSize: '11px', padding: '6px 4px', borderRadius: '8px', background: ['code', 'password'].includes(telegramFlowStep) ? 'rgba(255,184,77,0.12)' : 'rgba(255,255,255,0.02)', border: ['code', 'password'].includes(telegramFlowStep) ? '1px solid var(--primary)' : '1px solid var(--glass-border)', color: ['code', 'password'].includes(telegramFlowStep) ? 'var(--primary)' : 'var(--text-muted)' }}>2. OTP</span>
                <span style={{ color: 'var(--glass-border)', fontSize: '10px' }}>→</span>
                <span className={`step-badge ${telegramFlowStep === 'group' ? 'active' : ''}`} style={{ flex: 1, textAlign: 'center', fontSize: '11px', padding: '6px 4px', borderRadius: '8px', background: telegramFlowStep === 'group' ? 'rgba(255,184,77,0.12)' : 'rgba(255,255,255,0.02)', border: telegramFlowStep === 'group' ? '1px solid var(--primary)' : '1px solid var(--glass-border)', color: telegramFlowStep === 'group' ? 'var(--primary)' : 'var(--text-muted)' }}>3. Group</span>
                <span style={{ color: 'var(--glass-border)', fontSize: '10px' }}>→</span>
                <span className={`step-badge ${telegramFlowStep === 'success' ? 'active' : ''}`} style={{ flex: 1, textAlign: 'center', fontSize: '11px', padding: '6px 4px', borderRadius: '8px', background: telegramFlowStep === 'success' ? 'rgba(0,230,118,0.1)' : 'rgba(255,255,255,0.02)', border: telegramFlowStep === 'success' ? '1px solid #00e676' : '1px solid var(--glass-border)', color: telegramFlowStep === 'success' ? '#00e676' : 'var(--text-muted)' }}>4. Done</span>
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
                    disabled={isConnecting}
                  />
                  <div className="input-hint">Include country code prefix (e.g. +855 for Cambodia).</div>
                </div>
                {telError && <div className="error-msg" style={{ marginBottom: '15px' }}>{telError}</div>}
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} disabled={isConnecting}>
                  {isConnecting ? (
                    <>
                      <div className="spinner-ring" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.2)', borderLeftColor: '#fff', animation: 'spin-loader 1s linear infinite' }}></div>
                      Initiating Connection...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-arrow-right-to-bracket"></i>
                      Verify Phone Number
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Connecting Spinner State */}
            {telStatus === 'CONNECTING' && (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <div className="spinner-ring" style={{ margin: '0 auto 20px auto' }}></div>
                <h4 style={{ fontWeight: '700' }}>Establishing Secure Session...</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>Generating verification parameters. Please monitor your Telegram App.</p>
              </div>
            )}

            {/* Step 2: Verification Code */}
            {telStatus === 'NEED_CODE' && (
              <div className="action-panel">
                <h4>
                  <i className="fa-solid fa-envelope-open-text" style={{ marginRight: '8px', color: 'var(--primary)' }}></i>
                  Step 2: Enter Verification OTP
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '15px' }}>
                  Please enter the **5-digit code** sent to your official Telegram app.
                </p>
                
                {/* 5 digit OTP inputs columns */}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '24px 0' }}>
                  {[0, 1, 2, 3, 4].map(idx => (
                    <input 
                      key={idx}
                      type="text" 
                      id={`otp-input-${idx}`}
                      className="otp-digit-field"
                      maxLength={1}
                      value={otpDigits[idx]}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      onPaste={idx === 0 ? handleOtpPaste : undefined}
                      style={{
                        width: '46px', height: '54px', borderRadius: '10px',
                        border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)',
                        color: '#fff', fontSize: '20px', fontWeight: 'bold', textAlign: 'center', outline: 'none'
                      }}
                      disabled={isConnecting}
                    />
                  ))}
                </div>

                {telError && <div className="error-msg" style={{ marginBottom: '15px' }}>{telError}</div>}
                <button className="btn btn-primary" style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={submitCode} disabled={isConnecting}>
                  {isConnecting ? (
                    <>
                      <div className="spinner-ring" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.2)', borderLeftColor: '#fff', animation: 'spin-loader 1s linear infinite' }}></div>
                      Verifying OTP...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-shield-halved"></i>
                      Connect & Verify Process
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Step 2.5: 2FA Password */}
            {telStatus === 'NEED_PASSWORD' && (
              <div className="action-panel">
                <h4>
                  <i className="fa-solid fa-key" style={{ marginRight: '8px', color: 'var(--primary)' }}></i>
                  Two-Factor (2FA) Password
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '15px' }}>Your Telegram account has 2-Step Verification enabled. Enter your password below.</p>
                <div className="form-group">
                  <input 
                    type="password" 
                    className="input-control" 
                    placeholder="Enter 2FA password" 
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    disabled={isConnecting}
                  />
                </div>
                {telError && <div className="error-msg" style={{ marginBottom: '15px' }}>{telError}</div>}
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={submitPassword} disabled={isConnecting}>
                  {isConnecting ? (
                    <>
                      <div className="spinner-ring" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.2)', borderLeftColor: '#fff', animation: 'spin-loader 1s linear infinite' }}></div>
                      Verifying 2FA Password...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-lock"></i>
                      Verify 2FA Password
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Step 3: Group ID Config */}
            {telStatus === 'CONNECTED' && telegramFlowStep !== 'success' && (
              <div className="action-panel">
                {telegramFlowStep === 'group' ? (
                  <form onSubmit={saveGroupId}>
                    <h4>
                      <i className="fa-solid fa-bullhorn" style={{ marginRight: '8px', color: 'var(--primary)' }}></i>
                      Step 3: Set Listening Group ID
                    </h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '15px' }}>
                      Client connected successfully! Enter the Telegram Chat Group ID containing the bank receipt alerts.
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
                        disabled={isConnecting}
                      />
                    </div>
                    {telError && <div className="error-msg" style={{ marginBottom: '15px' }}>{telError}</div>}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                      <button type="submit" className="btn btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} disabled={isConnecting}>
                        {isConnecting ? (
                          <>
                            <div className="spinner-ring" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.2)', borderLeftColor: '#fff', animation: 'spin-loader 1s linear infinite' }}></div>
                            Finalizing...
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-floppy-disk"></i>
                            Save Group ID & Finalize
                          </>
                        )}
                      </button>
                      <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setTelegramFlowStep('active')} disabled={isConnecting}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div style={{ marginBottom: '24px', padding: '15px', background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.15)', borderRadius: '12px', fontSize: '14px' }}>
                      <i className="fa-solid fa-circle-check" style={{ color: '#00e676', marginRight: '6px' }}></i> Active and listening to Telegram Group ID: <strong>{telGroupId}</strong>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setTelegramFlowStep('group')}>Update Group ID</button>
                      <button className="btn btn-disconnect" style={{ flex: 1 }} onClick={() => setIsConfirmDisconnectOpen(true)}>Disconnect Client</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Success confirmation screen */}
            {telegramFlowStep === 'success' && (
              <div className="action-panel" style={{ textAlign: 'center', padding: '15px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                  <i className="fa-solid fa-circle-check animate-pulse" style={{ fontSize: '54px', color: '#00e676' }}></i>
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#00e676' }}>Connection Successful!</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px', marginBottom: '24px', lineHeight: '1.4' }}>
                  Your Telegram Listener client has been authenticated successfully and synced to match ABA bot transactions.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', padding: '16px', borderRadius: '12px', textAlign: 'left', marginBottom: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Connection Status</span>
                    <strong style={{ color: '#00e676' }}>CONNECTED 🟢</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', borderTop: '1px dashed var(--glass-border)', paddingTop: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Listening Group ID</span>
                    <strong style={{ color: '#fff' }}>{groupInput || telGroupId}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', borderTop: '1px dashed var(--glass-border)', paddingTop: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Verification Speed</span>
                    <strong style={{ color: 'var(--primary)' }}>Real-Time ⚡</strong>
                  </div>
                </div>

                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    setHasStartedAuth(false);
                    setTelegramFlowStep('active');
                    setIsTelegramModalOpen(false);
                  }} 
                  style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <i className="fa-solid fa-circle-check"></i>
                  Done & Close Console
                </button>
              </div>
            )}

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
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .card:hover {
          border-color: rgba(255, 184, 77, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        .kpi-grid > div:nth-child(1) { animation-delay: 0.05s; }
        .kpi-grid > div:nth-child(2) { animation-delay: 0.1s; }
        .kpi-grid > div:nth-child(3) { animation-delay: 0.15s; }
        .kpi-grid > div:nth-child(4) { animation-delay: 0.2s; }
        
        .analytics-charts-row > div:nth-child(1) { animation-delay: 0.25s; }
        .analytics-charts-row > div:nth-child(2) { animation-delay: 0.3s; }
        
        .workspace-grid > div:nth-child(1) { animation-delay: 0.35s; }
        .workspace-grid > div:nth-child(2) { animation-delay: 0.4s; }

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

        .spinner-ring {
          width: 48px;
          height: 48px;
          border: 4px solid rgba(255, 184, 77, 0.1);
          border-left-color: var(--primary);
          border-radius: 50%;
          animation: spin-loader 1s linear infinite;
        }

        @keyframes spin-loader {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .otp-digit-field {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .otp-digit-field:focus {
          border-color: var(--primary) !important;
          background: rgba(255, 184, 77, 0.08) !important;
          box-shadow: 0 0 12px var(--primary-glow) !important;
        }
      `}} />
    </div>
  );
}
