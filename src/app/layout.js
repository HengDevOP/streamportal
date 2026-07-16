export const metadata = {
  title: 'StreamPortal - Next-Gen Live Stream Alerts & ABA bank receipts Integration',
  description: 'Synchronize your ABA bank transactions and Telegram receipts directly with OBS stream overlays in real-time. Setup live alert widgets, AI Khmer/English voiceovers, and customized supporter leaderboards.',
  keywords: 'ABA payment integration, Stream overlays, OBS alerts, live streaming donations, Telegram transaction parser, Khmer text-to-speech, donor widgets, stream automation',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'StreamPortal - Live Stream Alerts & ABA Sync',
    description: 'Synchronize your ABA bank transactions and Telegram receipts directly with OBS stream overlays in real-time. Setup live alert widgets, AI Khmer/English voiceovers, and customized supporter leaderboards.',
    type: 'website',
    url: 'http://localhost:3000',
    siteName: 'StreamPortal',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
