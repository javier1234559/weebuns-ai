import { useState } from 'react';

interface UseRecordingProps {
  onRecordingComplete: (blob: Blob) => void;
}

export const useRecording = ({ onRecordingComplete }: UseRecordingProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState('');

  const startRecording = async () => {
    try {
      const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      if (permission.state === 'denied') {
        alert('Vui lòng cho phép truy cập microphone để sử dụng tính năng ghi âm');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onRecordingComplete(blob);
      };

      recorder.start(1000);
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error('Lỗi truy cập microphone:', err);
      alert('Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập và thử lại.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return {
    isRecording,
    audioUrl,
    startRecording,
    stopRecording
  };
};
