"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const RANK_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];
const RANK_GLOWS = [
  'rgba(255,215,0,0.4)',
  'rgba(192,192,192,0.28)',
  'rgba(205,127,50,0.28)',
];
const RANK_LABELS = ['1ST', '2ND', '3RD'];
const KHR_TO_USD = 4000;

// Font Awesome class per rank
const RANK_FA = ['fa-crown', 'fa-award', 'fa-gem'];

function formatAmount(d) {
  if (!d) return null;
  const original = `${d.currency}${Number(d.amount).toLocaleString()}`;
  const usd = d.amountUSD != null
    ? d.amountUSD
    : (d.currency === '៛' ? d.amount / KHR_TO_USD : d.amount);
  const usdStr = `$${Number(usd).toFixed(2)}`;
  if (d.currency === '៛') {
    return { primary: original, secondary: usdStr };
  }
  return { primary: original, secondary: null };
}

export default function TopDonationPage() {
  const params = useParams();
  const username = params.username;

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const faId = 'fa-cdn';
    if (!document.getElementById(faId)) {
      const link = document.createElement('link');
      link.id = faId;
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    async function fetchTop() {
      try {
        const res = await fetch(`/api/top-donations/${username}`);
        if (res.ok) {
          const data = await res.json();
          setDonations(data);
        }
      } catch (err) {
        console.error('Failed to fetch top donations:', err);
      }
    }
    fetchTop();
    const interval = setInterval(fetchTop, 5000);
    return () => clearInterval(interval);
  }, [username]);

  return (
    <>
      <div className="container">
        <div className="header">
          <i className="fa-solid fa-trophy header-trophy"></i>
          <span className="header-text">TOP DONORS</span>
        </div>

        <div className="list">
          {Array.from({ length: 3 }).map((_, i) => {
            const d = donations[i];
            const fmt = formatAmount(d);
            return (
              <div
                key={i}
                className={`row ${d ? 'filled' : 'empty'}`}
                style={{
                  '--rank-color': RANK_COLORS[i],
                  '--rank-glow': RANK_GLOWS[i],
                  animationDelay: `${i * 0.12}s`,
                }}
              >
                {/* Rank badge */}
                <div className="rank-badge">
                  <i
                    className={`fa-solid ${RANK_FA[i]} rank-icon`}
                    style={{ color: RANK_COLORS[i], filter: `drop-shadow(0 0 7px ${RANK_COLORS[i]})` }}
                  />
                  <span className="rank-label" style={{ color: RANK_COLORS[i] }}>{RANK_LABELS[i]}</span>
                </div>

                {/* Name */}
                <div className="info">
                  {d
                    ? <span className="name">{d.name}</span>
                    : <span className="empty-slot">— —</span>
                  }
                </div>

                {/* Amount */}
                <div className="amount-wrap">
                  {d ? (
                    <>
                      <span className="amount">{fmt.primary}</span>
                      {fmt.secondary && (
                        <span className="amount-usd">{fmt.secondary}</span>
                      )}
                    </>
                  ) : (
                    <span className="empty-slot">—</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: transparent !important;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }

        .container {
          width: 420px;
          padding: 4px 0;
        }

        /* ── Header ── */
        .header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px 12px;
        }

        .header-trophy {
          font-size: 20px;
          color: #FFD700;
          filter: drop-shadow(0 0 8px rgba(255,215,0,0.7));
        }

        .header-text {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 3.5px;
          color: #FFD700;
          text-shadow: 0 0 12px rgba(255,215,0,0.5);
        }

        /* ── Rows ── */
        .list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 0 4px;
        }

        .row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 10px;
          background: rgba(10,10,20,0.55);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(10px);
          animation: slideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
          position: relative;
          overflow: hidden;
        }

        .row.filled {
          box-shadow:
            0 4px 24px rgba(0,0,0,0.5),
            inset 0 0 0 1px var(--rank-color),
            0 0 18px var(--rank-glow);
        }

        .row.empty {
          opacity: 0.4;
        }

        /* left accent bar */
        .row::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--rank-color, transparent);
          box-shadow: 0 0 10px var(--rank-color, transparent);
          border-radius: 10px 0 0 10px;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── Rank icon (FA) ── */
        .rank-icon {
          font-size: 22px;
          line-height: 1;
        }

        .rank-label {
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1.5px;
        }

        /* ── Name ── */
        .info {
          flex: 1;
          min-width: 0;
        }

        .name {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          text-shadow: 0 1px 6px rgba(0,0,0,0.9);
        }

        /* ── Amount ── */
        .amount-wrap {
          text-align: right;
          min-width: 90px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1px;
        }

        .amount {
          font-size: 17px;
          font-weight: 900;
          color: #69f0ae;
          text-shadow: 0 0 10px rgba(105,240,174,0.5);
          white-space: nowrap;
        }

        /* KHR → USD sub-label */
        .amount-usd {
          font-size: 11px;
          font-weight: 700;
          color: rgba(105,240,174,0.55);
          white-space: nowrap;
        }

        .empty-slot {
          color: rgba(255,255,255,0.2);
          font-weight: 400;
          letter-spacing: 2px;
        }
      `}} />
    </>
  );
}
