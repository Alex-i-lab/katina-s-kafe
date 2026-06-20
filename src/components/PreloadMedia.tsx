import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export const PreloadVideo = ({ src, className, autoPlay = false, loop = true, muted = true, playsInline = true, poster, children }: { src?: string, className?: string, autoPlay?: boolean, loop?: boolean, muted?: boolean, playsInline?: boolean, poster?: string, children?: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Video playback failed:", err);
      });
    }
  };

  return (
    <div 
      className={`relative ${className} bg-zinc-900 overflow-hidden group cursor-pointer`}
      onClick={togglePlay}
    >
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900 animate-pulse">
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        preload="auto"
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        onLoadedData={() => setIsLoaded(true)}
        onLoadedMetadata={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? '' : 'opacity-0'}`}
      >
        {children}
      </video>

      {/* Aesthetic Play/Pause Glassmorphism Controller */}
      {isLoaded && (
        <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-500 ${isPlaying ? 'opacity-0 lg:group-hover:opacity-100' : 'opacity-100 backdrop-blur-[2px]'}`}>
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl transform scale-100 hover:scale-110 active:scale-95 transition-all duration-350">
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-white stroke-white" />
            ) : (
              <Play className="w-6 h-6 fill-white stroke-white ml-1" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const PreloadImage = ({ alt, src, className, referrerPolicy, loading, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Group external class names, and separate our internal classes.
  // We want to apply the rounded corners, borders, etc to the wrapper div.
  return (
    <div className={`relative w-full h-full bg-zinc-900 overflow-hidden ${className?.includes('rounded') ? className.split(' ').filter(c => c.includes('rounded')).join(' ') : ''}`}>
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900 animate-pulse">
        </div>
      )}
      <img
        alt={alt}
        src={src}
        className={`${className} transition-opacity duration-1000 ${isLoaded ? '' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        referrerPolicy={referrerPolicy}
        loading={loading}
        {...props}
      />
    </div>
  );
};
