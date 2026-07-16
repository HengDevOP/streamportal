"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function DonatePage() {
  const params = useParams();
  const username = params.username;
  
  const [bankName, setBankName] = useState('');
  const [message, setMessage] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState('input'); // 'input' | 'pay'
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    async function loadStreamerConfig() {
      try {
        const res = await fetch(`/api/overlay/config/${username}`);
        if (res.ok) {
          const data = await res.json();
          if (data.alertConfig && data.alertConfig.qrUrl) {
            setQrUrl(data.alertConfig.qrUrl);
          }
        }
      } catch (err) {
        console.error("Failed to load streamer QR code configuration:", err);
      }
    }
    loadStreamerConfig();
  }, [username]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatusMsg('');
    setErrorMsg('');

    if (!bankName.trim()) {
      setErrorMsg("Bank name is required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          bankName: bankName.trim(),
          message: message.trim()
        })
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMsg("🎉 Notification registered! Please complete the transfer below.");
        setStep('pay');
      } else {
        setErrorMsg(data.error || "Failed to submit donation.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error submitting donation.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setBankName('');
    setMessage('');
    setStatusMsg('');
    setErrorMsg('');
    setStep('input');
  }

  return (
    <>
      <div className="bg-glow"></div>
      <div className="container">
        <div className="logo-icon">💸</div>
        
        {step === 'input' ? (
          <>
            <div className="header">
              <h1>Support {username}</h1>
              <p>Please enter your exact bank name from your mobile bank application transaction receipt to match your donation.</p>
            </div>

            {errorMsg && <div className="error-alert">{errorMsg}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="bankName">Your Bank Name (Exact Match Required)</label>
                <input
                  type="text"
                  id="bankName"
                  className="input-control"
                  placeholder="e.g. Sok Mean"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  required
                />
                <div className="input-hint">Make sure this matches the sender name on your bank account receipt exactly!</div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Donation Message</label>
                <textarea
                  id="message"
                  className="input-control"
                  style={{ minHeight: '100px', resize: 'vertical' }}
                  placeholder="Say something nice..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Registering..." : "Submit & Proceed to KHQR"}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div className="header">
              <h1>Scan & Pay</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', marginBottom: '20px' }}>
                Scan the KHQR code below to transfer your donation. Once matched with the account name <strong>{bankName}</strong>, your custom message alert will trigger live!
              </p>
            </div>

            {statusMsg && <div className="status-alert">{statusMsg}</div>}

            {qrUrl ? (
              <div style={{ margin: '30px auto', padding: '15px', background: '#ffffff', borderRadius: '20px', width: '220px', height: '220px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={qrUrl} alt="Streamer KHQR Code" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
            ) : (
              <div style={{ margin: '30px auto', padding: '25px', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px', color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.4' }}>
                ⚠️ Streamer has not uploaded their custom KHQR Code yet. Please check back later or notify the streamer.
              </div>
            )}

            <div style={{ margin: '20px 0', padding: '15px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '12px', fontSize: '13.5px', color: 'var(--text-muted)' }}>
              🏦 Matched Account Holder Name: <strong style={{ color: '#ffffff' }}>{bankName}</strong>
            </div>

            <button type="button" className="btn-submit" onClick={handleReset} style={{ marginTop: '10px' }}>
              Done & Return
            </button>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --primary: #ffb84d;
          --primary-glow: rgba(255, 184, 77, 0.4);
          --bg-gradient: radial-gradient(circle at top, #181824 0%, #0a0a0f 100%);
          --glass-bg: rgba(20, 20, 30, 0.6);
          --glass-border: rgba(255, 255, 255, 0.08);
          --text-muted: rgba(255, 255, 255, 0.6);
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
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          overflow-x: hidden;
        }

        .bg-glow {
          position: absolute;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(255, 184, 77, 0.06) 0%, transparent 70%);
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 0;
          pointer-events: none;
        }

        .container {
          width: 100%;
          max-width: 460px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 50px 30px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          z-index: 1;
          position: relative;
        }

        .logo-icon {
          font-size: 48px;
          margin-bottom: 20px;
          text-align: center;
          filter: drop-shadow(0 0 15px var(--primary-glow));
        }

        .header h1 {
          font-size: 34px;
          font-weight: 900;
          letter-spacing: -0.5px;
          margin-bottom: 10px;
          text-align: center;
          background: linear-gradient(135deg, #ffffff 40%, #ffb84d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .header p {
          color: var(--text-muted);
          font-size: 15px;
          margin-bottom: 40px;
          line-height: 1.5;
          text-align: center;
        }

        .form-group {
          margin-bottom: 25px;
          text-align: left;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .input-control {
          width: 100%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 14px;
          color: #ffffff;
          font-family: inherit;
          font-size: 15px;
          transition: all 0.3s;
        }

        .input-control:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 8px var(--primary-glow);
        }

        .input-hint {
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 6px;
        }

        .btn-submit {
          width: 100%;
          background: linear-gradient(135deg, #ffb84d 0%, #ff9800 100%);
          border: none;
          border-radius: 12px;
          padding: 16px;
          color: #0c0c12;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
          transition: all 0.2s;
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(255, 152, 0, 0.4);
        }

        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .status-alert {
          background: rgba(0, 230, 118, 0.15);
          border: 1px solid rgba(0, 230, 118, 0.3);
          color: #00e676;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 25px;
          line-height: 1.4;
        }

        .error-alert {
          background: rgba(255, 82, 82, 0.15);
          border: 1px solid rgba(255, 82, 82, 0.3);
          color: #ff5252;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 25px;
          line-height: 1.4;
        }
      `}} />
    </>
  );
}
