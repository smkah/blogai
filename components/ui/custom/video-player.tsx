import { cn } from "@/lib/utils";
import { PauseIcon, PlayIcon, Volume1, VolumeOff } from "lucide-react";
import React, { useState, useRef } from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Format time in minutes:seconds
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Handle video progress
  const handleTimeUpdate = (): void => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const progressPercent = (video.currentTime / video.duration) * 100;
    setProgress(progressPercent);
    setCurrentTime(formatTime(video.currentTime));
  };

  // Handle video loading
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(formatTime(videoRef.current.duration));
  };

  // Handle progress bar click
  const handleProgressBarClick = (
    e: React.MouseEvent<HTMLDivElement>
  ): void => {
    e.stopPropagation();
    if (!videoRef.current || !progressBarRef.current) return;
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = position * videoRef.current.duration;
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!videoRef.current) return;
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  // Handle mute toggle
  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    videoRef.current.muted = newMutedState;
    if (newMutedState) {
      setVolume(0);
    } else {
      setVolume(1);
      videoRef.current.volume = 1;
    }
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="relative">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full rounded-lg"
        />

        <div
          className={cn(
            `absolute bottom-0 left-0 right-0 flex items-center gap-2 bg-black/50 p-2  rounded-lg transition-opacity duration-300, ${
              showControls ? "opacity-100" : "opacity-0"
            }`
          )}
        >
          <button
            onClick={togglePlay}
            className="p-2 hover:bg-gray-700/50 rounded"
          >
            {isPlaying ? (
              <PauseIcon className="text-white rounded-full w-6 h-6" />
            ) : (
              <PlayIcon className="text-white rounded-full w-6 h-6" />
            )}
          </button>

          <div
            ref={progressBarRef}
            onClick={handleProgressBarClick}
            className="flex-1 h-1 bg-gray-600 cursor-pointer rounded-full"
          >
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-white text-sm min-w-[100px]">
            <span>{currentTime}</span>
            <span> / </span>
            <span>{duration}</span>
          </div>

          <div className="flex items-center gap-2 px-2">
            <button
              onClick={toggleMute}
              className="p-2 hover:bg-gray-700/50 rounded"
            >
              {isMuted ? (
                <VolumeOff className="text-white rounded-full w-6 h-6" />
              ) : (
                <Volume1 className="text-white rounded-full w-6 h-6" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
