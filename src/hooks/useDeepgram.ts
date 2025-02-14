export const useDeepgram = () => {
  const speechToText = async (audioBlob: Blob): Promise<string> => {
    try {
      const buffer = await audioBlob.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");

      const response = await fetch("/api/ai/voice-chat/deepgram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "speechToText",
          data: base64,
        }),
      });

      if (!response.ok) {
        throw new Error("Speech to text failed");
      }

      const { text } = await response.json();
      return text;
    } catch (error) {
      console.error("Speech to text error:", error);
      return "";
    }
  };

  const textToSpeech = async (text: string): Promise<Blob | null> => {
    try {
      const response = await fetch("/api/ai/voice-chat/deepgram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "textToSpeech",
          data: text,
        }),
      });

      if (!response.ok) {
        throw new Error("Text to speech failed");
      }
      const audioBlob = await response.blob();
      return audioBlob;
    } catch (error) {
      console.error("Text to speech error:", error);
      return null;
    }
  };

  return {
    speechToText,
    textToSpeech,
  };
};
