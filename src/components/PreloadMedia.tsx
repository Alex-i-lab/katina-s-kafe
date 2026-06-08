import React, { useState } from 'react';

export const PreloadVideo = ({ src, className, autoPlay = true, loop = true, muted = true, playsInline = true, children }: { src?: string, className?: string, autoPlay?: boolean, loop?: boolean, muted?: boolean, playsInline?: boolean, children?: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative ${className} bg-zinc-900 overflow-hidden`}>
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900 animate-pulse">
        </div>
      )}
      <video
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        onLoadedData={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? '' : 'opacity-0'}`}
      >
        {children}
      </video>
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
