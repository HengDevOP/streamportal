export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    if (process.env.VERCEL === '1') {
      console.log("⚠️ Serverless environment (Vercel) detected. Skipping persistent Telegram listener auto-connect on boot.");
      return;
    }
    try {
      const { initTelegramClients } = await import('./lib/telegramManager');
      // Execute asynchronously to avoid blocking Next.js server boot or build phase
      initTelegramClients().catch(err => {
        console.error("Delayed error auto-connecting Telegram clients:", err);
      });
    } catch (err) {
      console.error("Failed to import/initialize Telegram clients on boot:", err);
    }
  }
}
