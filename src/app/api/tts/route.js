import { NextResponse } from 'next/server';

function splitTextIntoChunks(text, maxLength = 150) {
  const chunks = [];
  let currentChunk = "";

  // Split by common sentence terminators or spaces
  // For Khmer, sentence endings might be "។" (Khmer full stop)
  const sentences = text.match(/[^.!?។\s]+[.!?។\s]*/g) || [text];

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxLength) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = "";
      }
      // If a single sentence is longer than maxLength, force chunk it
      if (sentence.length > maxLength) {
        let temp = sentence;
        while (temp.length > maxLength) {
          chunks.push(temp.substring(0, maxLength).trim());
          temp = temp.substring(maxLength);
        }
        currentChunk = temp;
      } else {
        currentChunk = sentence;
      }
    } else {
      currentChunk += sentence;
    }
  }
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  return chunks;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || '';

  if (!text.trim()) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    const chunks = splitTextIntoChunks(text, 150);
    const audioBuffers = [];

    for (const chunk of chunks) {
      const isKhmer = /[\u1780-\u17FF\u19E0-\u19FF]/.test(chunk);
      const lang = isKhmer ? 'km' : 'en';
      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(chunk)}`;

      const res = await fetch(ttsUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://translate.google.com/',
          'Accept': 'audio/webm,audio/ogg,audio/wav,audio/*;q=0.9,application/ogg;q=0.7,video/*;q=0.6,*/*;q=0.5',
        },
      });

      if (!res.ok) {
        console.error(`Google TTS returned ${res.status} for chunk: ${chunk}`);
        continue;
      }

      const arrayBuffer = await res.arrayBuffer();
      audioBuffers.push(Buffer.from(arrayBuffer));
    }

    if (audioBuffers.length === 0) {
      console.error("All Google TTS requests failed.");
      return new NextResponse(null, { status: 500 });
    }

    const combinedBuffer = Buffer.concat(audioBuffers);

    return new NextResponse(combinedBuffer, {
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
