"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function TopDonorsPage() {
  const params = useParams();
  const username = params.username;
  const [topList, setTopList] = useState([]);

  useEffect(() => {
    async function fetchTop() {
      try {
        const res = await fetch(`/api/top-donations/${username}`);
        if (res.ok) {
          const data = await res.json();
          setTopList(data || []);
        }
      } catch (err) {
        console.error("Error fetching top donations:", err);
      }
    }
    fetchTop();
    const interval = setInterval(fetchTop, 3000);
    return () => clearInterval(interval);
  }, [username]);

  return (
    <>
      <div className="top-donors-container">
        <h2 className="title">🏆 Top Donors</h2>
        <div className="list">
          {topList.length === 0 ? (
            <div className="empty-msg">Waiting for donations...</div>
          ) : (
            topList.map((donor, idx) => (
              <div className="entry" key={donor.time || idx}>
                <div className="rank-badge">{idx + 1}</div>
                <div className="donor-name">{donor.name}</div>
                <div className="amount">{donor.currency}{donor.amount}</div>
              </div>
            ))
          )}
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
          font-family: 'Outfit', sans-serif;
          color: #ffffff;
          overflow: hidden;
          width: 400px;
          height: 500px;
          padding: 20px;
        }

        .top-donors-container {
          background: rgba(15, 15, 25, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        }

        .title {
          font-size: 20px;
          font-weight: 800;
          text-align: center;
          margin-bottom: 20px;
          letter-spacing: 0.5px;
          background: linear-gradient(135deg, #ffffff 40%, #ffb84d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .entry {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 10px 14px;
          transition: all 0.3s ease;
        }

        .rank-badge {
          width: 26px;
          height: 26px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 13px;
          font-weight: 800;
          margin-right: 12px;
          color: #ffb84d;
          border: 1px solid rgba(255, 184, 77, 0.3);
        }

        .entry:nth-child(1) .rank-badge {
          background: #ffb84d;
          color: #0c0c12;
          border-color: #ffb84d;
          box-shadow: 0 0 10px rgba(255, 184, 77, 0.4);
        }

        .entry:nth-child(2) .rank-badge {
          background: #e6e6e6;
          color: #0c0c12;
          border-color: #e6e6e6;
        }

        .entry:nth-child(3) .rank-badge {
          background: #cd7f32;
          color: #ffffff;
          border-color: #cd7f32;
        }

        .donor-name {
          flex-grow: 1;
          font-size: 15px;
          font-weight: 700;
        }

        .amount {
          font-size: 16px;
          font-weight: 900;
          color: #00e676;
          text-shadow: 0 0 10px rgba(0, 230, 118, 0.2);
        }

        .empty-msg {
          text-align: center;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.3);
          padding: 30px 0;
        }
      `}} />
    </>
  );
}
