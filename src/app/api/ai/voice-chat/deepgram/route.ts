import { createClient } from "@deepgram/sdk";
import { NextResponse } from "next/server";

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
const deepgram = createClient(DEEPGRAM_API_KEY);
const encoding = "linear16";
const container = "wav";
const DEFAULT_TEXT_TO_SPEECH_MODEL = "aura-asteria-en";
const DEFAULT_SPEECH_TO_TEXT_MODEL = "nova-3";

export async function POST(req: Request) {
  const handleSpeechToText = async (audioData: Buffer): Promise<string> => {
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      audioData,
      {
        model: DEFAULT_SPEECH_TO_TEXT_MODEL,
        smart_format: true,
      }
    );

    if (!result || error) {
      throw new Error(error?.message);
    }

    return result.results.channels[0].alternatives[0].transcript;
  };

  const handleTextToSpeech = async (text: string): Promise<Blob> => {
    const { result } = await deepgram.speak.request(
      { text },
      {
        model: DEFAULT_TEXT_TO_SPEECH_MODEL,
        encoding,
        container,
      }
    );

    if (!result) {
      throw new Error("Failed to get result");
    }

    const reader = result.body?.getReader();
    if (!reader) {
      throw new Error("Failed to get reader");
    }

    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    const audioBuffer = chunks.reduce((acc, chunk) => {
      const combined = new Uint8Array(acc.length + chunk.length);
      combined.set(acc, 0);
      combined.set(chunk, acc.length);
      return combined;
    }, new Uint8Array(0));

    return new Blob([audioBuffer], { type: "audio/wav" });
  };

  try {
    const { action, data } = await req.json();

    if (action === "speechToText") {
      const text = await handleSpeechToText(Buffer.from(data, "base64"));
      return NextResponse.json({
        text,
      });
    }

    if (action === "textToSpeech") {
      const result = await handleTextToSpeech(data);
      return new Response(result, {
        headers: {
          "Content-Type": "audio/wav",
        },
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
