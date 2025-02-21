"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WavesurferPlayer from "@wavesurfer/react";
import TimeFormat from "format-duration";
import { Pause, Play, Trash2 } from "lucide-react";
import { memo, useCallback, useState } from "react";

interface WaveAudioProps {
  audioUrl: string;
  onDelete?: () => void;
}

const SPEED_OPTIONS = [
  { label: "0.5x", value: 0.5 },
  { label: "0.75x", value: 0.75 },
  { label: "1x", value: 1 },
  { label: "1.25x", value: 1.25 },
  { label: "1.5x", value: 1.5 },
  { label: "2x", value: 2 },
];

function WaveAudio({ audioUrl, onDelete }: WaveAudioProps) {
  const [wavesurfer, setWavesurfer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const handleReady = useCallback((ws: any) => {
    setWavesurfer(ws);
    setIsPlaying(false);
    setDuration(ws.getDuration());

    ws.on("timeupdate", (time: number) => {
      setCurrentTime(time);
    });
  }, []);

  const handlePlayPause = useCallback(() => {
    wavesurfer?.playPause();
  }, [wavesurfer]);

  const handleSpeedChange = useCallback(
    (newSpeed: string) => {
      const speed = parseFloat(newSpeed);
      setPlaybackRate(speed);
      if (wavesurfer) {
        wavesurfer.setPlaybackRate(speed);
      }
    },
    [wavesurfer],
  );

  const formatTime = useCallback((time: number) => {
    return TimeFormat(time * 1000, { leading: true });
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 rounded-md p-4 shadow-sm">
        {/* Play/Pause Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        {/* Time Display */}
        <div className="min-w-[100px] pl-2 text-sm text-muted-foreground">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        {/* Waveform */}
        <div className="flex-1 h-10 cursor-pointer">
          <WavesurferPlayer
            height={40}
            // waveColor="rgba(0, 0, 0, 0.2)"
            progressColor="rgba(11, 150, 220, 0.7)"
            url={audioUrl}
            onReady={handleReady}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            barWidth={4}
            barGap={1}
            barRadius={3}
            cursorWidth={3}
          />
        </div>

        {/* Speed Select */}
        <Select
          value={playbackRate.toString()}
          onValueChange={handleSpeedChange}
        >
          <SelectTrigger className="w-[80px] h-8">
            <SelectValue placeholder="Speed" />
          </SelectTrigger>
          <SelectContent>
            {SPEED_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Delete Button */}
        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 flex-shrink-0"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

WaveAudio.displayName = "WaveAudio";
export default memo(WaveAudio);
