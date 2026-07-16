import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || '';

  if (!text.trim()) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    const isKhmer = /[\u1780-\u17FF\u19E0-\u19FF]/.test(text);
    const lang = isKhmer ? 'km' : 'en';
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(text)}`;

    const res = await fetch(ttsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://translate.google.com/',
        'Accept': 'audio/webm,audio/ogg,audio/wav,audio/*;q=0.9,application/ogg;q=0.7,video/*;q=0.6,*/*;q=0.5',
      },
    });

    if (!res.ok) {
      console.error(`Google TTS returned ${res.status}`);
      return new NextResponse(null, { status: res.status });
    }

    const audioBuffer = await res.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (e) {
    console.error('TTS proxy error:', e);
    return new NextResponse(null, { status: 500 });
  }
}
