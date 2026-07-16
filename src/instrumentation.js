export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { initTelegramClients } = await import('./lib/telegramManager');
      await initTelegramClients();
    } catch (err) {
      console.error("Failed to auto-connect Telegram clients on boot:", err);
    }
  }
}
