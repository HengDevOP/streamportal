"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';

// Tiny silent WAV to unlock browser autoplay policy
const SILENT_WAV = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';

export default function OverlayPage() {
  const params = useParams();
  const username = params.username;

  const [config, setConfig] = useState(null);
  const [activeAlert, setActiveAlert] = useState(null);
  const [visible, setVisible] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  const [isPreview, setIsPreview] = useState(false);

  const lastAlertTimeRef = useRef(0);
  const activeTimeoutRef = useRef(null);
  const audioUnlockedRef = useRef(false);
  const isFirstPollRef = useRef(true);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isPreview) {
        document.body.classList.add('preview-mode');
      } else {
        document.body.classList.remove('preview-mode');
      }
    }
  }, [isPreview]);

  // Try to auto-unlock on mount using AudioContext (works in OBS without user gesture)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('preview') === 'true' || window.self !== window.top) {
        setIsPreview(true);
      }
    }

    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      ctx.resume().then(() => {
        // Play a 0-length silent buffer to register audio intent
        const buf = ctx.createBuffer(1, 1, 22050);
        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.connect(ctx.destination);
        src.start(0);
        audioUnlockedRef.current = true;
        setAudioUnlocked(true);
      }).catch(() => {});
    } catch (e) {
      // AudioContext blocked — user must click the unlock button
    }
  }, []);

  function unlockAudio() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      ctx.resume().then(() => {
        audioUnlockedRef.current = true;
        setAudioUnlocked(true);
      }).catch(() => {
        audioUnlockedRef.current = true;
        setAudioUnlocked(true);
      });
    } catch (e) {
      audioUnlockedRef.current = true;
      setAudioUnlocked(true);
    }
  }

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch(`/api/overlay/config/${username}`);
        if (res.ok) {
          const data = await res.json();
          setConfig(data.alertConfig);
        }
      } catch (err) {
        console.error("Failed to load overlay config:", err);
      }
    }
    loadConfig();
    const interval = setInterval(loadConfig, 2000);
    return () => clearInterval(interval);
  }, [username]);

  useEffect(() => {
    if (!config || !config.fontFamily) return;
    
    const fontId = 'dynamic-google-font';
    let link = document.getElementById(fontId);
    if (!link) {
      link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(config.fontFamily)}:wght@400;700;900&display=swap`;
  }, [config]);

  // Stable triggerAlert always has fresh config via useCallback
  const triggerAlert = useCallback((donation) => {
    if (!config) return;

    if (activeTimeoutRef.current) {
      clearTimeout(activeTimeoutRef.current);
    }

    setVisible(false);

    setTimeout(() => {
      setActiveAlert(donation);
      setVisible(true);

      const hasCustomMessage = !!(donation.message && donation.message.trim());

      // Dynamic AudioContext resume to unlock background stream audio engines inside OBS
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const actx = new AudioCtx();
          if (actx.state === 'suspended') actx.resume();
        }
      } catch (e) {}

      // Try to play chime if configured or default to /uploads/sounds/sound.mp3
      let alertAudio = null;
      const soundPath = (!config.soundUrl || config.soundUrl === '/sound.mp3') ? '/uploads/sounds/sound.mp3' : config.soundUrl;
      try {
        const rawSoundUrl = soundPath.split('?')[0];
        const absoluteSoundUrl = new URL(rawSoundUrl, window.location.origin).toString();
        alertAudio = new Audio(`${absoluteSoundUrl}?cb=${Date.now()}`);
        alertAudio.volume = 1.0;
      } catch (e) {
        console.error('Chime init error:', e);
        alertAudio = null;
      }

      const speak = () => {
        if (!config.ttsEnabled) return;

        const messageText = hasCustomMessage ? donation.message.trim() : '';
        const ttsTemplate = config.ttsTemplate || '{donator} donated {amount} through superchat.';
        const amountStr = `${donation.amount} ${donation.currency === '$' ? 'dollars' : 'riel'}`;

        let ttsText = ttsTemplate
          .replace(/{donator}/g, donation.name)
          .replace(/{name}/g, donation.name)
          .replace(/{amount}/g, amountStr);

        if (messageText) {
          ttsText = `${ttsText}. ${messageText}`;
        }

        const voicePref = config.ttsVoiceName || 'female';

        // Helper to speak using browser's speechSynthesis (primarily for male voice option)
        const speakSpeechSynthesis = (preferMale = false) => {
          if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(ttsText);
            const voices = window.speechSynthesis.getVoices();
            
            if (preferMale) {
              const maleVoice = voices.find(v => 
                v.lang.startsWith('en') && 
                (v.name.toLowerCase().includes('male') || 
                 v.name.toLowerCase().includes('david') || 
                 v.name.toLowerCase().includes('guy') || 
                 v.name.toLowerCase().includes('microsoft') || 
                 v.name.toLowerCase().includes('google us english'))
              );
              if (maleVoice) {
                utterance.voice = maleVoice;
              } else {
                return false; // No male voice found, use fallback
              }
            } else {
              // Female voice
              const femaleVoice = voices.find(v => 
                v.lang.startsWith('en') && 
                (v.name.toLowerCase().includes('female') || 
                 v.name.toLowerCase().includes('zira') || 
                 v.name.toLowerCase().includes('google us english'))
              );
              if (femaleVoice) {
                utterance.voice = femaleVoice;
              }
            }
            
            utterance.rate = config.ttsRate || 0.95;
            utterance.pitch = config.ttsPitch || 1.0;
            
            utterance.onstart = () => {
              audioUnlockedRef.current = true;
              setAudioUnlocked(true);
            };
            
            window.speechSynthesis.speak(utterance);
            return true;
          }
          return false;
        };

        // If user wants male voice, try speech synthesis first
        if (voicePref === 'male') {
          const success = speakSpeechSynthesis(true);
          if (success) return;
        }

        // Default or Fallback to Proxy Google TTS (Absolute path resolution)
        try {
          const absoluteTtsUrl = new URL(`/api/tts?text=${encodeURIComponent(ttsText)}`, window.location.origin).toString();
          const ttsAudio = new Audio(absoluteTtsUrl);
          ttsAudio.volume = 1.0;
          ttsAudio.play()
            .then(() => {
              audioUnlockedRef.current = true;
              setAudioUnlocked(true);
            })
            .catch(e => {
              console.warn('TTS proxy play failed, trying speechSynthesis fallback:', e);
              speakSpeechSynthesis(false);
            });
        } catch (e) {
          console.error('TTS proxy error:', e);
          speakSpeechSynthesis(false);
        }
      };

      if (alertAudio) {
        alertAudio.onerror = () => {
          // Chime file missing or format unsupported — skip straight to TTS
          speak();
        };
        alertAudio.onended = speak;
        alertAudio.play()
          .then(() => {
            audioUnlockedRef.current = true;
            setAudioUnlocked(true);
          })
          .catch(() => {
            // Chime blocked — try to speak directly
            speak();
          });
      } else {
        speak();
      }

      const durationMs = (config.duration || 10) * 1000;
      activeTimeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, durationMs);

    }, 300);
  }, [config]);

  useEffect(() => {
    if (!config) return;

    async function pollPayment() {
      try {
        const res = await fetch(`/api/payment/${username}`);
        if (!res.ok) return;

        const donation = await res.json();
        
        if (isFirstPollRef.current) {
          isFirstPollRef.current = false;
          if (donation && donation.time) {
            lastAlertTimeRef.current = donation.time;
          } else {
            lastAlertTimeRef.current = Date.now();
          }
          return;
        }

        if (!donation || !donation.time) return;

        if (donation.time > lastAlertTimeRef.current) {
          lastAlertTimeRef.current = donation.time;
          triggerAlert(donation);
        }
      } catch (err) {
        console.error("Overlay payment poll error:", err);
      }
    }

    const interval = setInterval(pollPayment, 1500);
    return () => clearInterval(interval);
  }, [config, username, triggerAlert]);

  if (!config) {
    return (
      <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '14px', fontFamily: 'monospace', padding: '20px' }}>
        Loading overlay...
      </div>
    );
  }

  return (
    <>
      {/* Audio unlock button — shown only in browser, hidden in OBS */}
      {!audioUnlocked && (
        <button
          id="audio-unlock-btn"
          onClick={unlockAudio}
          style={{
            position: 'fixed', bottom: '12px', right: '12px',
            background: 'rgba(0,0,0,0.7)', color: '#fff',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px', padding: '8px 14px',
            fontSize: '13px', cursor: 'pointer',
            fontFamily: 'sans-serif', zIndex: 9999,
            backdropFilter: 'blur(6px)'
          }}
        >
          🔊 Click to enable audio alerts
        </button>
      )}

      <div
        id="alert-card"
        className={`alert-card notranslate ${visible ? 'active' : ''}`}
        translate="no"
        style={{
          fontFamily: config.fontFamily || 'Outfit',
          '--primary-color': config.primaryColor || '#ffb84d',
          '--secondary-color': config.secondaryColor || '#00e676'
        }}
      >
        <div className="alert-content">

          <div
            className="alert-text-line"
            id="alert-text-line"
            dangerouslySetInnerHTML={{
              __html: activeAlert ? (
                (config.alertTemplate || "{donator} donated {amount} through super chat!")
                  .replace(/{donator}|{name}/g, `<span style="color:#4fc3f7;text-shadow:0 0 12px rgba(79,195,247,0.6)">${activeAlert.name}</span>`)
                  .replace(/{amount}/g, `<span style="color:#69f0ae;text-shadow:0 0 12px rgba(105,240,174,0.6)">${activeAlert.currency}${activeAlert.amount}</span>`)
              ) : ''
            }}
          />
          <div className="message-box" id="alert-message" style={{ display: activeAlert && activeAlert.message ? 'block' : 'none' }}>
            💬 <span>{activeAlert ? activeAlert.message : ''}</span>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background-color: transparent !important;
          overflow: hidden;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Default alert layout sizes */
        .alert-card {
          width: 580px;
          background: transparent;
          border: none;
          padding: 20px;
          text-align: center;
          color: #ffffff;
          
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          pointer-events: none;
        }

        .alert-card.active {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        /* Preview Mode overrides to fit smaller dashboard iframe viewports */
        body.preview-mode {
          width: 100% !important;
          height: 100% !important;
        }

        body.preview-mode .alert-card {
          width: 90% !important;
          max-width: 500px !important;
          transform: translateY(15px) scale(0.48) !important;
        }

        body.preview-mode .alert-card.active {
          transform: translateY(0) scale(0.48) !important;
          opacity: 1 !important;
        }

        .alert-badge {
          display: inline-block;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 2.5px;
          color: var(--primary-color);
          margin-bottom: 16px;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
          text-transform: uppercase;
        }

        .title {
          font-size: 20px;
          font-weight: 700;
          color: var(--primary-color);
          letter-spacing: 1px;
          margin-bottom: 12px;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
        }

        .alert-text-line {
          font-size: 28px;
          font-weight: 900;
          line-height: 1.4;
          margin-bottom: 20px;
          color: #ffffff;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95), 0 1px 2px rgba(0,0,0,0.95);
        }

        .message-box {
          font-size: 19px;
          font-weight: 700;
          background: transparent;
          border: none;
          padding: 8px 0;
          margin-bottom: 20px;
          line-height: 1.4;
          color: var(--secondary-color);
          word-wrap: break-word;
          text-align: center;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
        }

        .footer {
          font-size: 14px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
      `}} />
    </>
  );
}
